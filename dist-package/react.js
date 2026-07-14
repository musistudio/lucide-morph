import { c as e, d as t, i as n, l as r, n as i, o as a, r as o, s, t as c, u as l } from "./chunks/morph-DqGr4NxU.js";
import { useEffect as u, useMemo as d, useState as f } from "react";
import { jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/react.tsx
function h(e) {
	return 1 - (1 - e) ** 3;
}
function g() {
	return typeof performance > "u" ? Date.now() : performance.now();
}
function _() {
	return typeof requestAnimationFrame < "u" && typeof cancelAnimationFrame < "u";
}
function v({ active: t = !1, asset: r, color: l = "currentColor", duration: v = 420, preset: y, progress: b, size: x = 24, state: S, strokeWidth: C = 2, style: w, title: T, ...E }) {
	let D = d(() => a(y, r), [r, y]), O = s(D, S, t), k = b === void 0 ? e(D, O) : n(D, b), [A, j] = f(k), M = O === "loading" && o(D), N = c(D, A), P = i(D.viewBox);
	return u(() => {
		if (b !== void 0 || !_()) {
			j(k);
			return;
		}
		let e = A, t = k, n = g(), r = Math.max(1, v), i = 0, a = (o) => {
			let s = Math.min(1, (o - n) / r);
			j(e + (t - e) * h(s)), s < 1 && (i = requestAnimationFrame(a));
		};
		return i = requestAnimationFrame(a), () => cancelAnimationFrame(i);
	}, [
		v,
		b,
		D.id,
		k
	]), /* @__PURE__ */ p("span", {
		...E,
		role: T ? "img" : "presentation",
		"aria-hidden": T ? void 0 : !0,
		"aria-label": T,
		"aria-busy": M || void 0,
		style: {
			color: l,
			display: "inline-grid",
			height: x,
			lineHeight: 0,
			placeItems: "center",
			width: x,
			...w
		},
		children: /* @__PURE__ */ p("svg", {
			"aria-hidden": "true",
			viewBox: D.viewBox,
			width: x,
			height: x,
			style: {
				display: "block",
				gridArea: "1 / 1",
				overflow: "visible"
			},
			children: /* @__PURE__ */ m("g", { children: [M && D.loading && /* @__PURE__ */ p("animateTransform", {
				attributeName: "transform",
				type: "rotate",
				from: `0 ${P.x} ${P.y}`,
				to: `${D.loading.rotationDirection === "counterclockwise" ? -360 : 360} ${P.x} ${P.y}`,
				dur: `${D.loading.rotationDuration}ms`,
				repeatCount: "indefinite"
			}), N.map((e) => e.mode === "fill" && !D.strokeLocked ? /* @__PURE__ */ p("path", {
				d: e.d,
				opacity: e.opacity,
				fill: "currentColor"
			}, e.id) : /* @__PURE__ */ p("path", {
				d: e.d,
				opacity: e.opacity,
				fill: "none",
				stroke: "currentColor",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				strokeWidth: C
			}, e.id))] })
		})
	});
}
function y(e) {
	return l(e);
}
//#endregion
export { v as MorphIcon, r as cloneAsset, y as getMorphIconPreset, l as getPresetById, t as morphPresets };

//# sourceMappingURL=react.js.map