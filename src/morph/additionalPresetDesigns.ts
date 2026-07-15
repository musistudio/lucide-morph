export type ManualLoadingDesign =
  | {
      kind: "arc"
      start: number
      end: number
      radius: number
    }
  | {
      kind: "collapse"
      x: number
      y: number
    }

export type ManualLayerDesign = {
  id: string
  from: number | null
  to: number | null
  loading: ManualLoadingDesign
}

export type AdditionalPresetDesign = {
  rotationDirection: "clockwise" | "counterclockwise"
  rotationDuration: number
  layers: ManualLayerDesign[]
}

const arc = (start: number, end: number, radius = 9): ManualLoadingDesign => ({
  kind: "arc",
  start,
  end,
  radius,
})

const collapse = (x = 12, y = 12): ManualLoadingDesign => ({
  kind: "collapse",
  x,
  y,
})

const layer = (
  id: string,
  from: number | null,
  to: number | null,
  loading: ManualLoadingDesign,
): ManualLayerDesign => ({ id, from, to, loading })

const design = (
  rotationDuration: number,
  rotationDirection: AdditionalPresetDesign["rotationDirection"],
  layers: ManualLayerDesign[],
): AdditionalPresetDesign => ({ rotationDuration, rotationDirection, layers })

// Every entry below is deliberately mapped layer by layer. `from` and `to`
// refer to flattened Lucide source paths; null means that the layer explicitly
// appears or retires. The loading geometry is also assigned per layer instead
// of being inferred from path order.
export const additionalPresetDesigns: Record<string, AdditionalPresetDesign> = {
  // Communication
  "email-rejected-approved": design(860, "clockwise", [
    layer("envelope-frame", 0, 0, arc(0, 176)),
    layer("envelope-flap", 1, 1, arc(176, 288)),
    layer("x-to-check", 2, 2, collapse(18, 19)),
    layer("retiring-x-arm", 3, null, collapse(18, 19)),
  ]),
  "email-warning-delivered": design(900, "clockwise", [
    layer("envelope-frame", 0, 0, arc(0, 176)),
    layer("envelope-flap", 1, 1, arc(176, 288)),
    layer("warning-to-check", 2, 2, collapse(18, 18)),
    layer("warning-dot", 3, null, collapse(20, 20)),
  ]),
  "email-question-verified": design(920, "counterclockwise", [
    layer("envelope-frame", 0, 0, arc(0, 176)),
    layer("envelope-flap", 1, 1, arc(176, 288)),
    layer("question-to-check", 2, 2, collapse(18, 18)),
    layer("question-dot", 3, null, collapse(20, 20)),
  ]),
  "email-search-read": design(940, "clockwise", [
    layer("envelope-to-open-envelope", 0, 0, arc(0, 180)),
    layer("flap-to-open-flap", 1, 1, arc(180, 288)),
    layer("search-ring-outline", 2, null, collapse(18, 18)),
    layer("search-ring-core", 3, null, collapse(18, 18)),
    layer("search-handle", 4, null, collapse(20.5, 20.5)),
  ]),
  "chat-question-answered": design(820, "counterclockwise", [
    layer("chat-bubble", 0, 0, arc(0, 288)),
    layer("question-curve", 1, null, collapse(12, 12)),
    layer("question-dot", 2, null, collapse(12, 16)),
  ]),
  "chat-warning-resolved": design(800, "clockwise", [
    layer("chat-bubble", 0, 0, arc(0, 288)),
    layer("warning-stem", 1, null, collapse(12, 12)),
    layer("warning-dot", 2, null, collapse(12, 16)),
  ]),
  "chat-disabled-enabled": design(900, "counterclockwise", [
    layer("bubble-upper", 0, null, arc(0, 108)),
    layer("disabled-slash", 1, null, collapse(12, 12)),
    layer("bubble-lower-to-complete", 2, 0, arc(108, 288)),
  ]),
  "conversation-unread-read": design(840, "clockwise", [
    layer("conversation-frame", 0, 0, arc(0, 288)),
    layer("unread-dot", 1, null, collapse(18, 6)),
  ]),
  "comment-flagged-resolved": design(820, "counterclockwise", [
    layer("comment-frame", 0, 0, arc(0, 288)),
    layer("flag-stem", 1, null, collapse(12, 11)),
    layer("flag-dot", 2, null, collapse(12, 13)),
  ]),
  "conversation-active-complete": design(920, "clockwise", [
    layer("primary-conversation-to-single", 0, 0, arc(0, 188)),
    layer("secondary-conversation", 1, null, arc(188, 288)),
  ]),

  // Files
  "file-warning-approved": design(860, "clockwise", [
    layer("file-frame", 0, 0, arc(0, 232)),
    layer("warning-to-check", 1, 2, collapse(12, 14)),
    layer("warning-dot", 2, null, collapse(12, 17)),
    layer("file-fold", null, 1, arc(232, 288)),
  ]),
  "file-question-approved": design(900, "counterclockwise", [
    layer("question-dot", 0, null, collapse(12, 17)),
    layer("file-frame", 1, 0, arc(0, 232)),
    layer("question-to-check", 2, 2, collapse(12, 14)),
    layer("file-fold", null, 1, arc(232, 288)),
  ]),
  "file-rejected-approved": design(820, "clockwise", [
    layer("file-frame", 0, 0, arc(0, 232)),
    layer("file-fold", 1, 1, arc(232, 288)),
    layer("x-to-check", 2, 2, collapse(12, 15)),
    layer("retiring-x-arm", 3, null, collapse(12, 15)),
  ]),
  "file-pending-approved": design(920, "clockwise", [
    layer("file-frame", 0, 0, arc(0, 202)),
    layer("file-fold", 1, 1, arc(202, 250)),
    layer("clock-ring-to-check", 2, 2, arc(250, 288, 6)),
    layer("clock-hand", 3, null, collapse(8, 16)),
  ]),
  "file-editing-saved": design(880, "counterclockwise", [
    layer("file-frame", 0, 0, arc(0, 224)),
    layer("pen-to-check", 1, 2, collapse(14, 15)),
    layer("editing-baseline", 2, null, collapse(8.5, 18)),
    layer("file-fold", null, 1, arc(224, 288)),
  ]),
  "file-search-found": design(900, "clockwise", [
    layer("file-fold", 0, 1, arc(220, 288)),
    layer("file-frame", 1, 0, arc(0, 220)),
    layer("search-handle", 2, null, collapse(7.5, 16.5)),
    layer("search-ring-to-check", 3, 2, collapse(8, 15)),
  ]),
  "file-download-complete": design(840, "clockwise", [
    layer("file-frame", 0, 0, arc(0, 224)),
    layer("file-fold", 1, 1, arc(224, 288)),
    layer("download-shaft-to-check", 2, 2, collapse(12, 15)),
    layer("download-arrowhead", 3, null, collapse(12, 17)),
  ]),
  "file-upload-complete": design(840, "counterclockwise", [
    layer("file-frame", 0, 0, arc(0, 224)),
    layer("file-fold", 1, 1, arc(224, 288)),
    layer("upload-shaft-to-check", 2, 2, collapse(12, 15)),
    layer("upload-arrowhead", 3, null, collapse(12, 13)),
  ]),
  "file-import-export": design(900, "clockwise", [
    layer("file-frame", 0, 2, arc(0, 210)),
    layer("file-fold", 1, 0, arc(210, 260)),
    layer("transfer-rail", 2, 4, collapse(7, 15)),
    layer("input-to-output-arrow", 3, 3, collapse(4, 14)),
    layer("output-file-edge", null, 1, arc(260, 288)),
  ]),
  "file-protected-approved": design(920, "counterclockwise", [
    layer("file-frame", 0, 0, arc(0, 220)),
    layer("file-fold", 1, 1, arc(220, 288)),
    layer("lock-body-to-check", 2, 2, collapse(8, 15)),
    layer("lock-shackle", 3, null, collapse(6, 13)),
  ]),

  // Folders
  "folder-settings-ready": design(960, "clockwise", [
    layer("settings-ring-to-check", 0, 1, arc(188, 288, 6)),
    layer("folder-frame", 1, 0, arc(0, 188)),
    layer("cog-east-upper", 2, null, collapse(18, 18)),
    layer("cog-west-upper", 3, null, collapse(18, 18)),
    layer("cog-south-west", 4, null, collapse(18, 18)),
    layer("cog-north-east", 5, null, collapse(18, 18)),
    layer("cog-south-east", 6, null, collapse(18, 18)),
    layer("cog-north-west", 7, null, collapse(18, 18)),
    layer("cog-west-lower", 8, null, collapse(18, 18)),
    layer("cog-east-lower", 9, null, collapse(18, 18)),
  ]),
  "folder-sync-ready": design(940, "counterclockwise", [
    layer("folder-frame", 0, 0, arc(0, 206)),
    layer("sync-corner-to-check", 1, 1, collapse(14, 14)),
    layer("sync-upper-arc", 2, null, arc(206, 247, 6)),
    layer("sync-lower-corner", 3, null, collapse(19, 20)),
    layer("sync-lower-arc", 4, null, arc(247, 288, 6)),
  ]),
  "folder-rejected-ready": design(820, "clockwise", [
    layer("folder-frame", 0, 0, arc(0, 288)),
    layer("x-to-check", 1, 1, collapse(12, 13)),
    layer("retiring-x-arm", 2, null, collapse(12, 13)),
  ]),
  "folder-pending-ready": design(920, "clockwise", [
    layer("clock-ring-to-check", 0, 1, arc(210, 288, 6)),
    layer("folder-frame", 1, 0, arc(0, 210)),
    layer("clock-hand", 2, null, collapse(16, 16)),
  ]),
  "folder-search-found": design(880, "counterclockwise", [
    layer("folder-frame", 0, 0, arc(0, 210)),
    layer("search-handle", 1, null, collapse(19, 19)),
    layer("search-ring-to-check", 2, 1, arc(210, 288, 6)),
  ]),
  "folder-download-complete": design(840, "clockwise", [
    layer("folder-frame", 0, 0, arc(0, 288)),
    layer("download-shaft-to-check", 1, 1, collapse(12, 13)),
    layer("download-arrowhead", 2, null, collapse(12, 16)),
  ]),
  "folder-upload-complete": design(840, "counterclockwise", [
    layer("folder-frame", 0, 0, arc(0, 288)),
    layer("upload-shaft-to-check", 1, 1, collapse(12, 13)),
    layer("upload-arrowhead", 2, null, collapse(12, 10)),
  ]),
  "folder-import-export": design(860, "clockwise", [
    layer("folder-frame", 0, 0, arc(0, 288)),
    layer("transfer-rail", 1, 1, collapse(7, 13)),
    layer("input-to-output-arrow", 2, 2, collapse(4, 13)),
  ]),
  "folder-locked-ready": design(920, "counterclockwise", [
    layer("lock-body-to-check", 0, 1, arc(210, 288, 6)),
    layer("folder-frame", 1, 0, arc(0, 210)),
    layer("lock-shackle", 2, null, collapse(18, 17)),
  ]),
  "folder-editing-ready": design(880, "clockwise", [
    layer("folder-frame", 0, 0, arc(0, 224)),
    layer("pen-to-check", 1, 1, arc(224, 288, 6)),
  ]),

  // Calendar and tasks
  "schedule-pending-confirmed": design(940, "clockwise", [
    layer("calendar-frame", 0, 2, arc(0, 174)),
    layer("right-binding", 1, 1, arc(174, 204)),
    layer("left-binding", 2, 0, arc(204, 234)),
    layer("week-divider", 3, 3, arc(234, 288)),
    layer("clock-hand-to-check", 4, 4, collapse(14, 16)),
    layer("clock-ring", 5, null, collapse(16, 16)),
  ]),
  "schedule-conflict-resolved": design(860, "counterclockwise", [
    layer("left-binding", 0, 0, arc(204, 234)),
    layer("right-binding", 1, 1, arc(174, 204)),
    layer("calendar-frame", 2, 2, arc(0, 174)),
    layer("week-divider", 3, 3, arc(234, 288)),
    layer("x-to-check", 4, 4, collapse(12, 16)),
    layer("retiring-x-arm", 5, null, collapse(12, 16)),
  ]),
  "schedule-search-confirmed": design(920, "clockwise", [
    layer("right-binding", 0, 1, arc(174, 204)),
    layer("calendar-frame", 1, 2, arc(0, 174)),
    layer("search-handle", 2, null, collapse(20, 20)),
    layer("week-divider", 3, 3, arc(234, 288)),
    layer("left-binding", 4, 0, arc(204, 234)),
    layer("search-ring-to-check", 5, 4, collapse(17, 17)),
  ]),
  "schedule-settings-confirmed": design(980, "counterclockwise", [
    layer("cog-west-upper", 0, null, collapse(18, 18)),
    layer("cog-west-lower", 1, null, collapse(18, 18)),
    layer("right-binding", 2, 1, arc(174, 204)),
    layer("cog-north-west", 3, null, collapse(18, 18)),
    layer("cog-south-west", 4, null, collapse(18, 18)),
    layer("cog-north-east", 5, null, collapse(18, 18)),
    layer("cog-south-east", 6, null, collapse(18, 18)),
    layer("calendar-frame", 7, 2, arc(0, 174)),
    layer("cog-east-upper", 8, null, collapse(18, 18)),
    layer("cog-east-lower", 9, null, collapse(18, 18)),
    layer("week-divider", 10, 3, arc(234, 288)),
    layer("left-binding", 11, 0, arc(204, 234)),
    layer("cog-ring-to-check", 12, 4, collapse(18, 18)),
  ]),
  "schedule-sync-confirmed": design(960, "clockwise", [
    layer("sync-corner-to-check", 0, 4, collapse(14, 14)),
    layer("sync-upper-arc", 1, null, arc(0, 46, 6)),
    layer("right-binding", 2, 1, arc(174, 204)),
    layer("sync-lower-arc", 3, null, arc(46, 92, 6)),
    layer("sync-lower-corner", 4, null, collapse(19, 20)),
    layer("calendar-frame", 5, 2, arc(92, 174)),
    layer("week-divider", 6, 3, arc(234, 288)),
    layer("left-binding", 7, 0, arc(204, 234)),
  ]),
  "calendar-days-range": design(900, "counterclockwise", [
    layer("left-binding", 0, 3, arc(204, 234)),
    layer("right-binding", 1, 1, arc(174, 204)),
    layer("calendar-frame", 2, 0, arc(0, 174)),
    layer("week-divider", 3, 2, arc(234, 288)),
    layer("first-day-dot", 4, 6, collapse(8, 14)),
    layer("top-middle-dot-to-range", 5, 4, collapse(13, 14)),
    layer("last-top-dot", 6, null, collapse(16, 14)),
    layer("first-lower-dot", 7, 7, collapse(8, 18)),
    layer("lower-middle-dot-to-range", 8, 5, collapse(12, 18)),
    layer("last-lower-dot", 9, null, collapse(16, 18)),
  ]),
  "task-draft-done": design(960, "clockwise", [
    layer("frame-corner-nw", 0, 0, arc(0, 24)),
    layer("frame-corner-ne", 1, null, arc(24, 48)),
    layer("frame-corner-se", 2, null, arc(48, 72)),
    layer("frame-corner-sw", 3, null, arc(72, 96)),
    layer("frame-top-left", 4, null, arc(96, 120)),
    layer("frame-bottom-left", 5, null, arc(120, 144)),
    layer("frame-top-right", 6, null, arc(144, 168)),
    layer("frame-bottom-right", 7, null, arc(168, 192)),
    layer("frame-left-upper", 8, null, arc(192, 216)),
    layer("frame-right-upper", 9, null, arc(216, 240)),
    layer("frame-left-lower", 10, null, arc(240, 264)),
    layer("frame-right-lower", 11, null, arc(264, 288)),
    layer("completion-check", null, 1, collapse(12, 12)),
  ]),
  "task-blocked-done": design(820, "counterclockwise", [
    layer("task-frame", 0, 0, arc(0, 288)),
    layer("x-to-check", 1, 1, collapse(12, 12)),
    layer("retiring-x-arm", 2, null, collapse(12, 12)),
  ]),
  "task-progress-done": design(800, "clockwise", [
    layer("task-frame", 0, 0, arc(0, 288)),
    layer("progress-dot-to-check", 1, 1, collapse(12, 12)),
  ]),
  "task-editing-done": design(880, "counterclockwise", [
    layer("task-frame", 0, 0, arc(0, 224)),
    layer("pen-to-check", 1, 1, arc(224, 288, 6)),
  ]),
  "task-review-done": design(840, "clockwise", [
    layer("task-frame", 0, 0, arc(0, 288)),
    layer("review-top-line", 1, null, collapse(12, 8)),
    layer("review-middle-to-check", 2, 1, collapse(12, 12)),
    layer("review-bottom-line", 3, null, collapse(12, 16)),
  ]),
  "task-required-done": design(860, "counterclockwise", [
    layer("task-frame", 0, 0, arc(0, 288)),
    layer("asterisk-stem-to-check", 1, 1, collapse(12, 12)),
    layer("asterisk-rising-arm", 2, null, collapse(12, 12)),
    layer("asterisk-falling-arm", 3, null, collapse(12, 12)),
  ]),
  "todo-checklist-complete": design(900, "clockwise", [
    layer("pending-box-to-first-check", 0, 1, arc(0, 72, 5)),
    layer("existing-check", 1, 0, arc(72, 128, 5)),
    layer("first-task-line", 2, 2, arc(128, 184)),
    layer("second-task-line", 3, 3, arc(184, 236)),
    layer("third-task-line", 4, 4, arc(236, 288)),
  ]),
  "clipboard-list-approved": design(920, "counterclockwise", [
    layer("clipboard-cap", 0, 0, arc(222, 288)),
    layer("clipboard-frame", 1, 1, arc(0, 222)),
    layer("first-list-line-to-check", 2, 2, collapse(13, 12)),
    layer("second-list-line", 3, null, collapse(14, 16)),
    layer("first-list-dot", 4, null, collapse(8, 11)),
    layer("second-list-dot", 5, null, collapse(8, 16)),
  ]),
  "goal-progress-achieved": design(980, "clockwise", [
    layer("goal-arc-north", 0, 0, arc(0, 36, 10)),
    layer("goal-arc-north-east", 1, null, arc(36, 72, 10)),
    layer("goal-arc-east", 2, null, arc(72, 108, 10)),
    layer("goal-arc-south-east", 3, null, arc(108, 144, 10)),
    layer("goal-arc-south", 4, null, arc(144, 180, 10)),
    layer("goal-arc-south-west", 5, null, arc(180, 216, 10)),
    layer("goal-arc-west", 6, null, arc(216, 252, 10)),
    layer("goal-arc-north-west", 7, null, arc(252, 288, 10)),
    layer("progress-dot-to-check", 8, 1, collapse(12, 12)),
  ]),

  // People, access, and security
  "member-rejected-approved": design(840, "clockwise", [
    layer("member-shoulders", 0, 0, arc(0, 174)),
    layer("member-head", 1, 1, arc(174, 288, 5)),
    layer("x-to-check", 2, 2, collapse(19, 11)),
    layer("retiring-x-arm", 3, null, collapse(19, 11)),
  ]),
  "member-search-selected": design(900, "counterclockwise", [
    layer("member-head", 0, 1, arc(174, 288, 5)),
    layer("member-shoulders", 1, 0, arc(0, 174)),
    layer("search-ring-to-check", 2, 2, collapse(18, 17)),
    layer("search-handle", 3, null, collapse(20, 20)),
  ]),
  "member-settings-approved": design(960, "clockwise", [
    layer("settings-ring-to-check", 0, 2, arc(204, 288, 5)),
    layer("member-head", 1, 1, arc(146, 204, 5)),
    layer("member-shoulders", 2, 0, arc(0, 146)),
    layer("cog-east-upper", 3, null, collapse(18, 15)),
    layer("cog-west-upper", 4, null, collapse(18, 15)),
    layer("cog-south-west", 5, null, collapse(18, 15)),
    layer("cog-north-east", 6, null, collapse(18, 15)),
    layer("cog-south-east", 7, null, collapse(18, 15)),
    layer("cog-north-west", 8, null, collapse(18, 15)),
    layer("cog-west-lower", 9, null, collapse(18, 15)),
    layer("cog-east-lower", 10, null, collapse(18, 15)),
  ]),
  "member-editing-approved": design(880, "counterclockwise", [
    layer("member-shoulders", 0, 0, arc(0, 174)),
    layer("pen-to-check", 1, 2, collapse(18, 18)),
    layer("member-head", 2, 1, arc(174, 288, 5)),
  ]),
  "profile-invite-approved": design(840, "clockwise", [
    layer("profile-shoulders", 0, 0, arc(0, 168)),
    layer("profile-head", 1, 1, arc(168, 288, 5)),
    layer("plus-stem-to-check", 2, 2, collapse(19, 19)),
    layer("plus-crossbar", 3, null, collapse(19, 19)),
  ]),
  "profile-rejected-approved": design(840, "counterclockwise", [
    layer("profile-shoulders", 0, 0, arc(0, 168)),
    layer("profile-head", 1, 1, arc(168, 288, 5)),
    layer("x-to-check", 2, 2, collapse(19, 19)),
    layer("retiring-x-arm", 3, null, collapse(19, 19)),
  ]),
  "profile-search-selected": design(900, "clockwise", [
    layer("profile-head", 0, 1, arc(168, 288, 5)),
    layer("profile-shoulders", 1, 0, arc(0, 168)),
    layer("search-ring-to-check", 2, 2, collapse(18, 18)),
    layer("search-handle", 3, null, collapse(20, 20)),
  ]),
  "profile-settings-approved": design(960, "counterclockwise", [
    layer("profile-shoulders", 0, 0, arc(0, 148)),
    layer("profile-head", 1, 1, arc(148, 218, 5)),
    layer("settings-ring-to-check", 2, 2, arc(218, 288, 5)),
    layer("cog-north-east", 3, null, collapse(18, 18)),
    layer("cog-south-west", 4, null, collapse(18, 18)),
    layer("cog-east-lower", 5, null, collapse(18, 18)),
    layer("cog-west-upper", 6, null, collapse(18, 18)),
    layer("cog-east-upper", 7, null, collapse(18, 18)),
    layer("cog-west-lower", 8, null, collapse(18, 18)),
    layer("cog-south-east", 9, null, collapse(18, 18)),
    layer("cog-north-west", 10, null, collapse(18, 18)),
  ]),
  "security-alert-safe": design(860, "clockwise", [
    layer("shield-frame", 0, 0, arc(0, 288)),
    layer("warning-to-check", 1, 1, collapse(12, 12)),
    layer("warning-dot", 2, null, collapse(12, 16)),
  ]),
  "security-rejected-safe": design(820, "counterclockwise", [
    layer("shield-frame", 0, 0, arc(0, 288)),
    layer("x-to-check", 1, 1, collapse(12, 12)),
    layer("retiring-x-arm", 2, null, collapse(12, 12)),
  ]),
  "security-question-safe": design(900, "clockwise", [
    layer("shield-frame", 0, 0, arc(0, 288)),
    layer("question-to-check", 1, 1, collapse(12, 12)),
    layer("question-dot", 2, null, collapse(12, 17)),
  ]),
  "security-blocked-safe": design(840, "counterclockwise", [
    layer("shield-frame", 0, 0, arc(0, 288)),
    layer("ban-slash-to-check", 1, 1, collapse(12, 12)),
  ]),
  "security-pending-safe": design(860, "clockwise", [
    layer("shield-frame", 0, 0, arc(0, 288)),
    layer("left-progress-dot", 1, null, collapse(8, 12)),
    layer("middle-progress-dot-to-check", 2, 1, collapse(12, 12)),
    layer("right-progress-dot", 3, null, collapse(16, 12)),
  ]),
  "security-off-safe": design(920, "counterclockwise", [
    layer("disabled-slash", 0, null, collapse(12, 12)),
    layer("shield-lower-to-complete", 1, 0, arc(0, 188)),
    layer("shield-upper", 2, null, arc(188, 288)),
    layer("verification-check", null, 1, collapse(12, 12)),
  ]),
  "security-partial-verified": design(840, "clockwise", [
    layer("shield-frame", 0, 0, arc(0, 288)),
    layer("half-divider-to-check", 1, 1, collapse(12, 12)),
  ]),
  "keyhole-locked-unlocked": design(880, "counterclockwise", [
    layer("keyhole", 0, 0, collapse(12, 16)),
    layer("lock-body", 1, 1, arc(116, 288, 7)),
    layer("shackle-opening", 2, 2, arc(0, 116, 5)),
  ]),
  "face-scan-verified": design(940, "clockwise", [
    layer("scan-corner-nw-to-badge", 0, 0, arc(0, 72)),
    layer("scan-corner-ne", 1, null, arc(72, 144)),
    layer("scan-corner-se", 2, null, arc(144, 216)),
    layer("scan-corner-sw", 3, null, arc(216, 288)),
    layer("face-smile-to-check", 4, 1, collapse(12, 14)),
    layer("left-eye", 5, null, collapse(9, 9)),
    layer("right-eye", 6, null, collapse(15, 9)),
  ]),
  "fingerprint-verified": design(1020, "counterclockwise", [
    layer("fingerprint-core-to-check", 0, 1, arc(0, 32)),
    layer("fingerprint-inner-right", 1, null, arc(32, 64)),
    layer("fingerprint-outer-right", 2, null, arc(64, 96)),
    layer("fingerprint-outer-to-badge", 3, 0, arc(96, 128)),
    layer("fingerprint-left-dot", 4, null, arc(128, 160)),
    layer("fingerprint-right-edge", 5, null, arc(160, 192)),
    layer("fingerprint-left-ridge", 6, null, arc(192, 224)),
    layer("fingerprint-lower-ridge", 7, null, arc(224, 256)),
    layer("fingerprint-upper-ridge", 8, null, arc(256, 288)),
  ]),
  "access-key-granted": design(900, "clockwise", [
    layer("key-body-to-badge", 0, 0, arc(0, 288)),
    layer("keyhole-to-check", 1, 1, collapse(16.5, 7.5)),
  ]),
  "approval-question-verified": design(860, "counterclockwise", [
    layer("approval-badge", 0, 0, arc(0, 288)),
    layer("question-to-check", 1, 1, collapse(12, 12)),
    layer("question-dot", 2, null, collapse(12, 17)),
  ]),

  // Connectivity and devices
  "wifi-none-connected": design(920, "clockwise", [
    layer("wifi-origin", 0, 0, collapse(12, 20)),
    layer("outer-signal-emerging", null, 1, arc(0, 112)),
    layer("middle-signal-emerging", null, 2, arc(112, 208)),
    layer("inner-signal-emerging", null, 3, arc(208, 288)),
  ]),
  "wifi-weak-connected": design(880, "counterclockwise", [
    layer("wifi-origin", 0, 0, collapse(12, 20)),
    layer("existing-inner-signal", 1, 3, arc(208, 288)),
    layer("outer-signal-emerging", null, 1, arc(0, 112)),
    layer("middle-signal-emerging", null, 2, arc(112, 208)),
  ]),
  "signal-none-strong": design(900, "clockwise", [
    layer("signal-origin", 0, 0, collapse(2, 20)),
    layer("short-bar-emerging", null, 1, arc(216, 288)),
    layer("medium-bar-emerging", null, 2, arc(112, 216)),
    layer("tall-bar-emerging", null, 3, arc(0, 112)),
  ]),
  "cloud-alert-online": design(860, "counterclockwise", [
    layer("alert-stem", 0, null, collapse(12, 14)),
    layer("alert-dot", 1, null, collapse(12, 20)),
    layer("cloud-frame", 2, 0, arc(0, 288)),
  ]),
  "cloud-settings-online": design(980, "clockwise", [
    layer("settings-ring", 0, null, arc(190, 288, 5)),
    layer("cloud-frame", 1, 0, arc(0, 190)),
    layer("cog-east-upper", 2, null, collapse(12, 17)),
    layer("cog-west-upper", 3, null, collapse(12, 17)),
    layer("cog-south-west", 4, null, collapse(12, 17)),
    layer("cog-north-east", 5, null, collapse(12, 17)),
    layer("cog-south-east", 6, null, collapse(12, 17)),
    layer("cog-north-west", 7, null, collapse(12, 17)),
    layer("cog-west-lower", 8, null, collapse(12, 17)),
    layer("cog-east-lower", 9, null, collapse(12, 17)),
  ]),
  "cloud-download-online": design(860, "counterclockwise", [
    layer("download-shaft", 0, null, collapse(12, 17)),
    layer("download-arrowhead", 1, null, collapse(12, 20)),
    layer("cloud-frame", 2, 0, arc(0, 288)),
  ]),
  "cloud-upload-online": design(860, "clockwise", [
    layer("upload-shaft", 0, null, collapse(12, 17)),
    layer("cloud-frame", 1, 0, arc(0, 288)),
    layer("upload-arrowhead", 2, null, collapse(12, 13)),
  ]),
  "route-off-active": design(960, "counterclockwise", [
    layer("route-start", 0, 0, arc(0, 64, 5)),
    layer("route-lower-fragment", 1, null, arc(64, 108)),
    layer("route-main-to-complete", 2, 1, arc(108, 224)),
    layer("route-disabled-slash", 3, null, collapse(12, 12)),
    layer("route-right-fragment", 4, null, arc(224, 248)),
    layer("route-upper-fragment", 5, null, arc(248, 264)),
    layer("route-end", 6, 2, arc(264, 288, 5)),
  ]),
  "location-off-found": design(940, "clockwise", [
    layer("sight-top", 0, 0, arc(0, 36)),
    layer("sight-right", 1, 1, arc(72, 108)),
    layer("sight-bottom", 2, 2, arc(180, 216)),
    layer("sight-left", 3, 3, arc(216, 252)),
    layer("locator-lower-to-ring", 4, 4, arc(108, 180)),
    layer("locator-upper", 5, null, arc(36, 72, 7)),
    layer("disabled-slash-to-focus", 6, 5, arc(252, 288, 3)),
  ]),
  "screen-share-on-off": design(820, "counterclockwise", [
    layer("screen-frame", 0, 0, arc(0, 214)),
    layer("screen-base", 1, 1, arc(250, 288)),
    layer("screen-stand", 2, 2, arc(214, 250)),
    layer("share-arrow-to-off-slash", 3, 3, collapse(19.5, 5.5)),
    layer("share-corner-to-off-slash", 4, 4, collapse(19.5, 5.5)),
  ]),
  "unplugged-powered": design(920, "clockwise", [
    layer("retiring-disconnect-ray", 0, null, collapse(20.5, 3.5)),
    layer("power-cord", 1, 1, arc(238, 288)),
    layer("lower-plug", 2, 0, arc(0, 112)),
    layer("left-prong", 3, 2, arc(112, 154)),
    layer("right-prong", 4, 3, arc(154, 196)),
    layer("upper-plug-to-bolt", 5, 4, arc(196, 238)),
  ]),
  "bluetooth-search-connected": design(860, "counterclockwise", [
    layer("bluetooth-mark", 0, 0, arc(0, 220)),
    layer("search-wave-to-check-arm", 1, 1, arc(220, 264, 5)),
    layer("search-dot-to-check-arm", 2, 2, arc(264, 288, 5)),
  ]),
  "monitor-off-ready": design(900, "clockwise", [
    layer("screen-lower-to-frame", 0, 1, arc(0, 190)),
    layer("screen-upper-fragment", 1, null, arc(190, 214)),
    layer("monitor-base", 2, 3, arc(250, 288)),
    layer("monitor-stand", 3, 2, arc(214, 250)),
    layer("disabled-slash-to-check", 4, 0, collapse(12, 10)),
  ]),
  "drive-download-complete": design(880, "counterclockwise", [
    layer("download-shaft-to-drive-top", 0, 0, arc(0, 54)),
    layer("download-arrowhead-to-drive-bottom", 1, 2, arc(234, 288)),
    layer("drive-body", 2, 1, arc(54, 234)),
    layer("drive-first-light", 3, 3, collapse(6, 18)),
    layer("drive-second-light", 4, null, collapse(10, 18)),
  ]),
  "drive-upload-complete": design(880, "clockwise", [
    layer("upload-arrowhead-to-drive-top", 0, 0, arc(0, 54)),
    layer("upload-shaft-to-drive-bottom", 1, 2, arc(234, 288)),
    layer("drive-body", 2, 1, arc(54, 234)),
    layer("drive-first-light", 3, 3, collapse(6, 18)),
    layer("drive-second-light", 4, null, collapse(10, 18)),
  ]),

  // Checkout, fulfillment, and resolution. Each transition has an explicit
  // layer story instead of converging on one generic completed-state icon.
  "cart-checkout-payment": design(940, "counterclockwise", [
    layer("cart-body-to-card-frame", 2, 0, arc(0, 228)),
    layer("cart-left-wheel-to-card-stripe", 0, 1, arc(228, 288)),
    layer("cart-right-wheel-retires", 1, null, collapse(19, 21)),
  ]),
  "shipment-search-located": design(1020, "clockwise", [
    layer("package-body-to-map", 0, 2, arc(0, 160)),
    layer("package-seam-retires", 1, null, collapse(12, 12)),
    layer("package-fold-retires", 2, null, collapse(12, 12)),
    layer("package-spine-retires", 3, null, collapse(12, 16)),
    layer("search-ring-to-location-pin", 4, 0, arc(160, 248)),
    layer("search-handle-to-location-dot", 5, 1, arc(248, 288, 3)),
  ]),
  "issue-question-triaged": design(840, "counterclockwise", [
    layer("issue-circle", 0, 0, arc(0, 288, 10)),
    layer("question-curve-to-alert-stem", 1, 1, collapse(12, 11)),
    layer("question-dot-to-alert-dot", 2, 2, collapse(12, 16)),
  ]),
  "basket-order-packed": design(980, "clockwise", [
    layer("basket-left-rib-retires", 0, null, collapse(10, 15)),
    layer("basket-right-handle-retires", 1, null, collapse(18, 8)),
    layer("basket-rim-to-package-fold", 2, 2, arc(170, 215)),
    layer("basket-body-to-package-body", 3, 0, arc(0, 170)),
    layer("basket-divider-to-package-seam", 4, 3, arc(215, 252)),
    layer("basket-left-handle-retires", 5, null, collapse(6, 8)),
    layer("basket-right-rib-to-package-spine", 6, 1, arc(252, 288)),
  ]),
  "incident-alert-contained": design(900, "clockwise", [
    layer("alert-dot-retires", 0, null, collapse(12, 16)),
    layer("alert-stem-to-stop-core", 1, 1, collapse(12, 12)),
    layer("octagon-to-containment-ring", 2, 0, arc(0, 288, 10)),
  ]),
  "payment-receipt-issued": design(920, "counterclockwise", [
    layer("card-frame-to-receipt-paper", 0, 0, arc(0, 210)),
    layer("card-stripe-to-receipt-total", 1, 1, arc(210, 260)),
    layer("receipt-ledger-emerges", null, 2, arc(260, 288)),
  ]),
  "shipment-failed-returned": design(980, "clockwise", [
    layer("package-body-to-warehouse", 0, 0, arc(0, 168)),
    layer("package-seam-to-upper-shelf", 1, 1, arc(168, 210)),
    layer("package-fold-to-lower-shelf", 2, 2, arc(210, 250)),
    layer("package-spine-to-warehouse-door", 3, 3, arc(250, 288)),
    layer("delivery-failure-first-arm-retires", 4, null, collapse(19, 16)),
    layer("delivery-failure-second-arm-retires", 5, null, collapse(19, 16)),
  ]),
  "issue-rejected-reopened": design(860, "counterclockwise", [
    layer("issue-circle", 0, 0, arc(0, 288, 10)),
    layer("rejection-arm-to-play", 1, 1, collapse(12, 12)),
    layer("second-rejection-arm-retires", 2, null, collapse(12, 12)),
  ]),
  "discount-added-cart": design(920, "clockwise", [
    layer("discount-badge-to-cart-body", 0, 2, arc(0, 210)),
    layer("percent-slash-to-left-wheel", 1, 0, arc(210, 250, 4)),
    layer("percent-upper-dot-to-right-wheel", 2, 1, arc(250, 288, 4)),
    layer("percent-lower-dot-retires", 3, null, collapse(15, 15)),
  ]),
  "shipment-created-dispatched": design(1060, "counterclockwise", [
    layer("creation-crossbar-to-right-wheel", 0, 3, arc(264, 288, 4)),
    layer("creation-stem-retires", 1, null, collapse(19, 16)),
    layer("package-body-to-truck-cargo", 2, 0, arc(0, 150)),
    layer("package-seam-to-truck-chassis", 3, 1, arc(150, 185)),
    layer("package-fold-to-truck-cab", 4, 2, arc(185, 240)),
    layer("package-spine-to-left-wheel", 5, 4, arc(240, 264, 4)),
  ]),
  "issue-pending-scheduled": design(860, "clockwise", [
    layer("issue-circle-to-clock-face", 0, 0, arc(0, 288, 10)),
    layer("right-progress-dot-retires", 1, null, collapse(17, 12)),
    layer("middle-progress-dot-to-clock-hand", 2, 1, collapse(12, 12)),
    layer("left-progress-dot-retires", 3, null, collapse(7, 12)),
  ]),
  "payment-alert-refund": design(880, "counterclockwise", [
    layer("payment-badge-to-refund-ring", 0, 0, arc(0, 288, 10)),
    layer("alert-stem-to-dollar-curve", 1, 1, collapse(12, 12)),
    layer("alert-dot-to-dollar-stem", 2, 2, collapse(12, 16)),
  ]),
  "shipment-open-resealed": design(1020, "clockwise", [
    layer("open-spine-to-sealed-spine", 0, 1, arc(244, 288)),
    layer("open-top-to-sealed-body", 1, 0, arc(0, 130)),
    layer("open-lower-shell-to-package-fold", 2, 2, arc(130, 200)),
    layer("open-flap-to-package-seam", 3, 3, arc(200, 244)),
  ]),
  "issue-draft-active": design(980, "counterclockwise", [
    layer("draft-arc-north-to-active-ring", 0, 0, arc(0, 36, 10)),
    layer("draft-arc-south-retires", 1, null, arc(144, 180, 10)),
    layer("draft-arc-north-east-retires", 2, null, arc(36, 72, 10)),
    layer("draft-arc-west-retires", 3, null, arc(216, 252, 10)),
    layer("draft-arc-south-east-retires", 4, null, arc(108, 144, 10)),
    layer("draft-arc-east-retires", 5, null, arc(72, 108, 10)),
    layer("draft-arc-north-west-retires", 6, null, arc(252, 288, 10)),
    layer("draft-arc-south-west-retires", 7, null, arc(180, 216, 10)),
    layer("active-dot-emerges", null, 1, collapse(12, 12)),
  ]),
  "refund-issued-wallet": design(900, "clockwise", [
    layer("refund-ring-to-wallet-body", 0, 1, arc(0, 180)),
    layer("dollar-curve-to-wallet-clasp", 1, 0, arc(180, 288)),
    layer("dollar-stem-retires", 2, null, collapse(12, 12)),
  ]),
  "cash-deposited-bank": design(1040, "counterclockwise", [
    layer("banknote-frame-to-bank-roof", 0, 5, arc(0, 100)),
    layer("banknote-coin-to-bank-base", 1, 0, arc(100, 150)),
    layer("left-banknote-dot-to-left-column", 2, 1, arc(150, 180)),
    layer("right-banknote-dot-to-right-column", 3, 4, arc(180, 210)),
    layer("inner-left-column-emerges", null, 2, arc(210, 249)),
    layer("inner-right-column-emerges", null, 3, arc(249, 288)),
  ]),
  "incident-rejected-escalated": design(920, "clockwise", [
    layer("rejection-arm-to-alert-stem", 0, 1, collapse(12, 12)),
    layer("octagon-to-alert-shield", 1, 0, arc(0, 288)),
    layer("second-rejection-arm-to-alert-dot", 2, 2, collapse(12, 16)),
  ]),
  "wallet-purchase-complete": design(960, "counterclockwise", [
    layer("wallet-frame-to-shopping-bag", 0, 0, arc(0, 210)),
    layer("wallet-opening-to-bag-rim", 1, 1, arc(210, 250)),
    layer("wallet-cards-to-bag-handle", 2, 2, arc(250, 288)),
  ]),
  "payment-rejected-cash": design(900, "clockwise", [
    layer("rejected-badge-to-banknote-frame", 0, 0, arc(0, 210)),
    layer("first-rejection-arm-to-banknote-coin", 1, 1, arc(210, 255, 4)),
    layer("second-rejection-arm-to-left-cash-mark", 2, 2, arc(255, 288, 3)),
    layer("right-cash-mark-emerges", null, 3, collapse(18, 12)),
  ]),
  "bug-open-fixed": design(1040, "clockwise", [
    layer("bug-left-antenna", 0, 0, arc(0, 24)),
    layer("bug-right-antenna", 1, 1, arc(24, 48)),
    layer("bug-upper-shell", 2, null, arc(48, 72)),
    layer("bug-body-to-lower-shell", 3, 5, arc(72, 152)),
    layer("bug-center-line", 4, 6, arc(152, 176)),
    layer("bug-left-upper-leg", 5, null, arc(176, 192)),
    layer("bug-left-middle-leg", 6, 7, arc(192, 208)),
    layer("bug-left-lower-leg", 7, 8, arc(208, 224)),
    layer("bug-right-upper-leg", 8, 3, arc(224, 240)),
    layer("bug-right-middle-leg", 9, 2, arc(240, 256)),
    layer("bug-right-lower-leg", 10, null, arc(256, 272)),
    layer("fix-slash-emerging", null, 4, arc(272, 288)),
  ]),
}
