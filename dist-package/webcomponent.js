import { a as e, c as t, d as n, i as r, l as i, o as a, r as o, s, u as c } from "./chunks/morph-DqGr4NxU.js";
//#region src/webcomponent.ts
function l(e) {
	return 1 - (1 - e) ** 3;
}
function u(e, t, n) {
	let r = Number(e.getAttribute(t));
	return Number.isFinite(r) ? r : n;
}
function d() {
	return typeof requestAnimationFrame < "u" && typeof cancelAnimationFrame < "u";
}
var f = typeof HTMLElement > "u" ? class {} : HTMLElement, p = class extends f {
	static observedAttributes = [
		"active",
		"color",
		"duration",
		"preset",
		"progress",
		"size",
		"state",
		"stroke-width",
		"title"
	];
	animationFrame = 0;
	position = 0;
	connectedCallback() {
		this.shadowRoot || this.attachShadow({ mode: "open" }), this.position = this.targetPosition(), this.render();
	}
	attributeChangedCallback() {
		this.animateToTarget();
	}
	disconnectedCallback() {
		this.animationFrame && cancelAnimationFrame(this.animationFrame);
	}
	get preset() {
		return this.getAttribute("preset") ?? n[0].id;
	}
	set preset(e) {
		this.setAttribute("preset", e);
	}
	get active() {
		return this.hasAttribute("active");
	}
	set active(e) {
		e ? this.setAttribute("active", "") : this.removeAttribute("active");
	}
	asset() {
		return a(this.preset);
	}
	resolvedState(e) {
		return s(e, this.getAttribute("state") ?? void 0, this.active);
	}
	targetPosition() {
		let e = this.asset(), n = this.getAttribute("progress");
		return n === null ? t(e, this.resolvedState(e)) : r(e, Number(n));
	}
	animateToTarget() {
		if (!this.isConnected) return;
		this.animationFrame && cancelAnimationFrame(this.animationFrame);
		let e = this.targetPosition();
		if (this.hasAttribute("progress") || !d()) {
			this.position = e, this.render();
			return;
		}
		let t = this.position, n = typeof performance > "u" ? Date.now() : performance.now(), r = Math.max(1, u(this, "duration", 420)), i = (a) => {
			let o = Math.min(1, (a - n) / r);
			this.position = t + (e - t) * l(o), this.render(), o < 1 && (this.animationFrame = requestAnimationFrame(i));
		};
		this.animationFrame = requestAnimationFrame(i);
	}
	render() {
		let t = this.shadowRoot;
		if (!t) return;
		let n = this.asset(), r = this.resolvedState(n) === "loading" && o(n), i = this.getAttribute("color") ?? "currentColor", a = u(this, "size", 24), s = u(this, "stroke-width", 2), c = this.getAttribute("title") ?? void 0;
		c ? (this.setAttribute("role", "img"), this.setAttribute("aria-label", c), this.removeAttribute("aria-hidden")) : (this.setAttribute("aria-hidden", "true"), this.removeAttribute("aria-label"), this.removeAttribute("role")), r ? this.setAttribute("aria-busy", "true") : this.removeAttribute("aria-busy"), t.innerHTML = `<style>:host{display:inline-grid;height:${a}px;line-height:0;place-items:center;width:${a}px}</style>${e(n, this.position, {
			color: i,
			loading: r,
			size: a,
			strokeWidth: s,
			title: c
		})}`;
	}
};
function m(e = "lucide-morph") {
	if (typeof customElements > "u") throw Error("MorphIconElement can only be registered in a browser.");
	return customElements.get(e) || customElements.define(e, p), e;
}
function h(e) {
	return c(e);
}
//#endregion
export { p as MorphIconElement, i as cloneAsset, m as defineMorphIconElement, h as getMorphIconPreset, c as getPresetById, n as morphPresets };

//# sourceMappingURL=webcomponent.js.map