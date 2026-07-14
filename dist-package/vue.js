import { c as e, d as t, i as n, l as r, n as i, o as a, r as o, s, t as c, u as l } from "./chunks/morph-BfPb7t8e.js";
import { computed as u, defineComponent as d, h as f, onBeforeUnmount as p, ref as m, watch as h } from "vue";
//#region src/vue.ts
function g(e) {
	return 1 - (1 - e) ** 3;
}
function _() {
	return typeof performance > "u" ? Date.now() : performance.now();
}
function v() {
	return typeof requestAnimationFrame < "u" && typeof cancelAnimationFrame < "u";
}
var y = d({
	name: "MorphIcon",
	props: {
		active: {
			type: Boolean,
			default: !1
		},
		asset: {
			type: Object,
			default: void 0
		},
		color: {
			type: String,
			default: "currentColor"
		},
		duration: {
			type: Number,
			default: 420
		},
		preset: {
			type: [String, Object],
			default: void 0
		},
		progress: {
			type: Number,
			default: void 0
		},
		size: {
			type: Number,
			default: 24
		},
		state: {
			type: String,
			default: void 0
		},
		strokeWidth: {
			type: Number,
			default: 2
		},
		title: {
			type: String,
			default: void 0
		}
	},
	setup(t) {
		let r = u(() => a(t.preset, t.asset)), l = u(() => s(r.value, t.state, t.active)), d = u(() => t.progress === void 0 ? e(r.value, l.value) : n(r.value, t.progress)), y = m(d.value), b = 0;
		function x() {
			if (b && cancelAnimationFrame(b), t.progress !== void 0 || !v()) {
				y.value = d.value;
				return;
			}
			let e = y.value, n = d.value, r = _(), i = Math.max(1, t.duration ?? 420), a = (t) => {
				let o = Math.min(1, (t - r) / i);
				y.value = e + (n - e) * g(o), o < 1 && (b = requestAnimationFrame(a));
			};
			b = requestAnimationFrame(a);
		}
		return h(() => [
			r.value.id,
			l.value,
			t.progress,
			t.duration
		], x, { immediate: !0 }), p(() => {
			b && cancelAnimationFrame(b);
		}), () => {
			let e = r.value, n = l.value === "loading" && o(e), a = e.loading?.rotationCenter ?? i(e.viewBox), s = c(e, y.value).map((n) => n.mode === "fill" && !e.strokeLocked ? f("path", {
				d: n.d,
				fill: "currentColor",
				key: n.id,
				opacity: n.opacity
			}) : f("path", {
				d: n.d,
				fill: "none",
				key: n.id,
				opacity: n.opacity,
				stroke: "currentColor",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				strokeWidth: t.strokeWidth ?? 2
			}));
			return f("span", {
				"aria-busy": n || void 0,
				"aria-hidden": t.title ? void 0 : !0,
				"aria-label": t.title,
				role: t.title ? "img" : "presentation",
				style: {
					color: t.color ?? "currentColor",
					display: "inline-grid",
					height: `${t.size ?? 24}px`,
					lineHeight: 0,
					placeItems: "center",
					width: `${t.size ?? 24}px`
				}
			}, [f("svg", {
				"aria-hidden": "true",
				height: t.size ?? 24,
				style: {
					display: "block",
					gridArea: "1 / 1",
					overflow: "visible"
				},
				viewBox: e.viewBox,
				width: t.size ?? 24
			}, [f("g", null, [n && e.loading ? f("animateTransform", {
				attributeName: "transform",
				dur: `${e.loading.rotationDuration}ms`,
				from: `0 ${a.x} ${a.y}`,
				repeatCount: "indefinite",
				to: `${e.loading.rotationDirection === "counterclockwise" ? -360 : 360} ${a.x} ${a.y}`,
				type: "rotate"
			}) : void 0, ...s].filter(Boolean))])]);
		};
	}
});
function b(e) {
	return l(e);
}
//#endregion
export { y as MorphIcon, y as default, r as cloneAsset, b as getMorphIconPreset, l as getPresetById, t as morphPresets };

//# sourceMappingURL=vue.js.map