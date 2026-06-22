import { validatePathPair } from "./path"
import type { MorphLayer } from "./types"

export type AgentMorphRequest = {
  apiKey: string
  baseUrl: string
  model: string
  stream?: boolean
  fromIcon: string
  toIcon: string
  fromLabel: string
  toLabel: string
  fromSvg: string
  toSvg: string
}

export type AgentMorphResult = {
  id: string
  name: string
  viewBox: string
  rationale: string
  layers: MorphLayer[]
}

const outputSchema = {
  type: "object",
  additionalProperties: false,
  required: ["id", "name", "viewBox", "rationale", "layers"],
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    viewBox: { type: "string" },
    rationale: { type: "string" },
    layers: {
      type: "array",
      minItems: 1,
      maxItems: 8,
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "id",
          "name",
          "from",
          "to",
          "fromOpacity",
          "toOpacity",
          "mode",
        ],
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          from: { type: "string" },
          to: { type: "string" },
          fromOpacity: { type: "number", minimum: 0, maximum: 1 },
          toOpacity: { type: "number", minimum: 0, maximum: 1 },
          mode: { type: "string", enum: ["stroke", "fill"] },
        },
      },
    },
  },
}

const agentInstructions = `You are a senior motion designer generating SVG morph layers for a React icon editor.

The editor interpolates numbers inside SVG path strings. It cannot interpolate arbitrary SVG element trees.

Return a designed MorphAsset JSON object with layers that visually morph the FROM source SVG into the TO source SVG.

Hard requirements:
- Use viewBox "0 0 24 24".
- Every layer.from and layer.to must have exactly the same SVG command template after replacing numbers with {}.
- Every layer.from and layer.to must have the same number of numeric values.
- Use absolute path commands only. Prefer simple M and L commands. C, Q, and Z are allowed only when both sides share the same template.
- Use mode "stroke" unless both sides are intentionally closed filled shapes.
- Keep coordinates inside or near the 0-24 viewBox.
- For disappearing strokes, collapse the target path to a point or short segment and set toOpacity to 0.
- For appearing strokes, collapse the source path to a point or short segment and set fromOpacity to 0.
- Make progress 0 recognizable as the FROM icon and progress 1 recognizable as the TO icon.
- Use 2 to 7 layers for most icons. Avoid unnecessary detail.
- Return only the JSON object. Do not wrap it in Markdown fences or add prose.

This is a design task, not a geometry-conversion task: infer a clean stroke mapping from the supplied source SVG.`

function asObject(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined
  }

  return value as Record<string, unknown>
}

function readContentParts(content: unknown) {
  if (typeof content === "string") return [content]
  if (!Array.isArray(content)) return []

  return content.flatMap((part) => {
    const object = asObject(part)
    if (!object) return []
    if (typeof object.text === "string") return [object.text]
    if (typeof object.content === "string") return [object.content]
    return []
  })
}

function getOutputText(response: unknown) {
  const object = asObject(response)
  const choices = object?.choices
  if (!Array.isArray(choices)) return ""

  return choices
    .flatMap((choice) => {
      const choiceObject = asObject(choice)
      const message = asObject(choiceObject?.message)
      return readContentParts(message?.content)
    })
    .join("\n")
}

function getStreamDeltaText(event: unknown) {
  const object = asObject(event)
  const choices = object?.choices
  if (!Array.isArray(choices)) return ""

  return choices
    .flatMap((choice) => {
      const choiceObject = asObject(choice)
      const delta = asObject(choiceObject?.delta)
      const message = asObject(choiceObject?.message)

      return [
        ...readContentParts(delta?.content),
        ...readContentParts(message?.content),
      ]
    })
    .join("")
}

function tryParseJsonObject(text: string) {
  try {
    const parsed = JSON.parse(text)
    return asObject(parsed)
  } catch {
    return undefined
  }
}

function collectJsonTextCandidates(text: string) {
  const trimmed = text.trim()
  const candidates = [trimmed]

  for (const match of trimmed.matchAll(/```(?:json)?\s*([\s\S]*?)```/gi)) {
    const fenced = match[1]?.trim()
    if (fenced) candidates.push(fenced)
  }

  return candidates
}

function findJsonObjectInText(text: string) {
  for (const candidate of collectJsonTextCandidates(text)) {
    const parsed = tryParseJsonObject(candidate)
    if (parsed) return parsed
  }

  for (const source of collectJsonTextCandidates(text)) {
    for (
      let start = source.indexOf("{");
      start !== -1;
      start = source.indexOf("{", start + 1)
    ) {
      let depth = 0
      let inString = false
      let escaped = false

      for (let index = start; index < source.length; index += 1) {
        const character = source[index]

        if (inString) {
          if (escaped) {
            escaped = false
          } else if (character === "\\") {
            escaped = true
          } else if (character === "\"") {
            inString = false
          }
          continue
        }

        if (character === "\"") {
          inString = true
          continue
        }

        if (character === "{") depth += 1
        if (character === "}") depth -= 1

        if (depth === 0) {
          const parsed = tryParseJsonObject(source.slice(start, index + 1))
          if (parsed) return parsed
          break
        }
      }
    }
  }

  throw new Error("Agent response did not contain a valid JSON object.")
}

function parseAgentResult(text: string) {
  return findJsonObjectInText(text) as AgentMorphResult
}

function validateResult(result: AgentMorphResult) {
  const errors: string[] = []
  const ids = new Set<string>()

  if (!result || typeof result !== "object") {
    return ["Agent result must be a JSON object."]
  }

  if (result.viewBox !== "0 0 24 24") {
    errors.push('viewBox must be "0 0 24 24".')
  }

  if (!Array.isArray(result.layers) || result.layers.length === 0) {
    errors.push("layers must contain at least one layer.")
  }

  result.layers?.forEach((layer, index) => {
    const prefix = `layers[${index}]`

    if (!layer.id) errors.push(`${prefix}.id is required.`)
    if (ids.has(layer.id)) errors.push(`${prefix}.id must be unique.`)
    ids.add(layer.id)

    if (!layer.name) errors.push(`${prefix}.name is required.`)
    if (layer.mode !== "stroke" && layer.mode !== "fill") {
      errors.push(`${prefix}.mode must be stroke or fill.`)
    }
    if (layer.fromOpacity < 0 || layer.fromOpacity > 1) {
      errors.push(`${prefix}.fromOpacity must be between 0 and 1.`)
    }
    if (layer.toOpacity < 0 || layer.toOpacity > 1) {
      errors.push(`${prefix}.toOpacity must be between 0 and 1.`)
    }

    const pathError = validatePathPair(layer.from, layer.to)
    if (!pathError.ok) errors.push(`${prefix}: ${pathError.reason}`)
  })

  return errors
}

function buildChatCompletionsUrl(baseUrl: string) {
  const normalized = (baseUrl || "https://api.openai.com/v1").trim().replace(/\/+$/, "")

  if (normalized.endsWith("/chat/completions")) {
    return normalized
  }

  return `${normalized}/chat/completions`
}

function buildChatRequestBody(
  request: AgentMorphRequest,
  input: string,
  useResponseFormat: boolean,
) {
  const body: Record<string, unknown> = {
    model: request.model || "gpt-5.4",
    messages: [
      {
        role: "system",
        content: agentInstructions,
      },
      {
        role: "user",
        content: input,
      },
    ],
    stream: request.stream ?? true,
  }

  if (useResponseFormat) {
    body.response_format = {
      type: "json_schema",
      json_schema: {
        name: "morph_layers",
        strict: true,
        schema: outputSchema,
      },
    }
  }

  return body
}

function shouldRetryWithoutResponseFormat(status: number, body: string) {
  if (status < 400) return false

  const lower = body.toLowerCase()
  return (
    lower.includes("response_format") ||
    lower.includes("json_schema") ||
    lower.includes("json schema") ||
    lower.includes("structured output") ||
    lower.includes("unsupported parameter")
  )
}

async function postChatCompletion(
  request: AgentMorphRequest,
  input: string,
  useResponseFormat: boolean,
) {
  return fetch(buildChatCompletionsUrl(request.baseUrl), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${request.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildChatRequestBody(request, input, useResponseFormat)),
  })
}

function parseSseDataLine(line: string) {
  const trimmed = line.trim()
  if (!trimmed.startsWith("data:")) return ""

  const data = trimmed.slice(5).trim()
  if (!data || data === "[DONE]") return ""

  try {
    return getStreamDeltaText(JSON.parse(data))
  } catch {
    throw new Error("Streaming chat completion returned an invalid SSE JSON chunk.")
  }
}

async function readStreamingOutputText(response: Response) {
  if (!response.body) {
    throw new Error("Streaming chat completion response did not include a body.")
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ""
  let outputText = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split(/\r?\n/)
    buffer = lines.pop() ?? ""

    for (const line of lines) {
      outputText += parseSseDataLine(line)
    }
  }

  buffer += decoder.decode()

  if (buffer.trim()) {
    for (const line of buffer.split(/\r?\n/)) {
      outputText += parseSseDataLine(line)
    }
  }

  return outputText
}

async function readBufferedOutputText(response: Response) {
  const body = await response.text()

  try {
    const parsed = JSON.parse(body)
    const outputText = getOutputText(parsed)
    if (outputText) return outputText

    if (asObject(parsed)?.layers) return body
  } catch {
    return body
  }

  throw new Error("Chat completion response did not include message content.")
}

async function readOutputText(response: Response, stream: boolean) {
  const outputText = stream
    ? await readStreamingOutputText(response)
    : await readBufferedOutputText(response)

  if (!outputText.trim()) {
    throw new Error("Chat completion response did not include message content.")
  }

  return outputText
}

async function callOpenAI(request: AgentMorphRequest, repairNote: string) {
  const input = [
    `Generate morph layers for ${request.fromLabel || request.fromIcon} -> ${
      request.toLabel || request.toIcon
    }.`,
    "FROM source SVG:",
    request.fromSvg,
    "TO source SVG:",
    request.toSvg,
    repairNote,
  ]
    .filter(Boolean)
    .join("\n\n")

  const stream = request.stream ?? true
  let response = await postChatCompletion(request, input, true)

  if (!response.ok) {
    const body = await response.text()

    if (shouldRetryWithoutResponseFormat(response.status, body)) {
      response = await postChatCompletion(request, input, false)
    } else {
      throw new Error(`OpenAI API ${response.status}: ${body}`)
    }
  }

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`OpenAI API ${response.status}: ${body}`)
  }

  return parseAgentResult(await readOutputText(response, stream))
}

export async function generateMorphLayersWithAgent(request: AgentMorphRequest) {
  if (!request.apiKey.trim()) {
    throw new Error("OpenAI API key is required.")
  }

  if (!request.baseUrl.trim()) {
    throw new Error("Base URL is required.")
  }

  if (!request.fromSvg || !request.toSvg) {
    throw new Error("Source SVG is missing.")
  }

  let repairNote = ""

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const result = await callOpenAI(request, repairNote)
    const errors = validateResult(result)

    if (errors.length === 0) {
      return result
    }

    repairNote = `Previous attempt failed local validation. Fix these issues and return a corrected full JSON object:\n${errors
      .slice(0, 12)
      .map((error) => `- ${error}`)
      .join("\n")}`
  }

  throw new Error("Agent returned invalid morph layers after 3 attempts.")
}
