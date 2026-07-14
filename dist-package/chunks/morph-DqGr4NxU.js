//#region src/morph/lucideGeometry.ts
var e = /[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/gi, t = /^[a-zA-Z]$/;
function n(e) {
	let t = Number(e.toFixed(6));
	return Object.is(t, -0) ? "0" : t.toString();
}
function r(e, t) {
	return Math.abs(e.x - t.x) < 1e-9 && Math.abs(e.y - t.y) < 1e-9;
}
function i(e, t, n) {
	return {
		x: e.x + (t.x - e.x) * n,
		y: e.y + (t.y - e.y) * n
	};
}
function a(e, t) {
	return {
		p0: e,
		p1: i(e, t, 1 / 3),
		p2: i(e, t, 2 / 3),
		p3: t
	};
}
function o(e, t, n, r) {
	return Math.atan2(e * r - t * n, e * n + t * r);
}
function s(e, t, n, i, s, c, l) {
	if (r(e, l)) return [];
	let u = Math.abs(t), d = Math.abs(n);
	if (u === 0 || d === 0) return [a(e, l)];
	let f = i * Math.PI / 180, p = Math.cos(f), m = Math.sin(f), h = (e.x - l.x) / 2, g = (e.y - l.y) / 2, _ = p * h + m * g, v = -m * h + p * g, y = _ * _ / (u * u) + v * v / (d * d);
	if (y > 1) {
		let e = Math.sqrt(y);
		u *= e, d *= e;
	}
	let b = u * u * d * d - u * u * v * v - d * d * _ * _, x = u * u * v * v + d * d * _ * _, S = x === 0 ? 0 : (!!s == !!c ? -1 : 1) * Math.sqrt(Math.max(0, b / x)), C = S * u * v / d, w = -S * d * _ / u, T = {
		x: p * C - m * w + (e.x + l.x) / 2,
		y: m * C + p * w + (e.y + l.y) / 2
	}, E = {
		x: (_ - C) / u,
		y: (v - w) / d
	}, ee = {
		x: (-_ - C) / u,
		y: (-v - w) / d
	}, te = o(1, 0, E.x, E.y), D = o(E.x, E.y, ee.x, ee.y);
	!c && D > 0 && (D -= Math.PI * 2), c && D < 0 && (D += Math.PI * 2);
	let O = Math.max(1, Math.ceil(Math.abs(D) / (Math.PI / 2))), k = D / O, A = (e) => ({
		x: T.x + u * p * Math.cos(e) - d * m * Math.sin(e),
		y: T.y + u * m * Math.cos(e) + d * p * Math.sin(e)
	}), j = (e) => ({
		x: -u * p * Math.sin(e) - d * m * Math.cos(e),
		y: -u * m * Math.sin(e) + d * p * Math.cos(e)
	});
	return Array.from({ length: O }, (t, n) => {
		let r = te + k * n, i = r + k, a = n === 0 ? e : A(r), o = n === O - 1 ? l : A(i), s = j(r), c = j(i), u = 4 / 3 * Math.tan(k / 4);
		return {
			p0: a,
			p1: {
				x: a.x + u * s.x,
				y: a.y + u * s.y
			},
			p2: {
				x: o.x - u * c.x,
				y: o.y - u * c.y
			},
			p3: o
		};
	});
}
function c(e) {
	return e.map((e) => {
		let t = e.segments.map((e) => `C${n(e.p1.x)} ${n(e.p1.y)} ${n(e.p2.x)} ${n(e.p2.y)} ${n(e.p3.x)} ${n(e.p3.y)}`).join(" ");
		return `M${n(e.start.x)} ${n(e.start.y)} ${t}`;
	}).join(" ");
}
function l(n) {
	let i = n.match(e) ?? [], o = [], l = 0, u = "", d = {
		x: 0,
		y: 0
	}, f, p = () => l < i.length && !t.test(i[l] ?? ""), m = () => {
		let e = i[l];
		if (e === void 0 || t.test(e)) throw Error(`Invalid Lucide path near ${e ?? "the end"}.`);
		return l += 1, Number(e);
	}, h = (e) => {
		let t = {
			x: m(),
			y: m()
		};
		return e ? {
			x: d.x + t.x,
			y: d.y + t.y
		} : t;
	}, g = (e) => {
		if (!f) throw Error("Lucide path must begin with M.");
		f.segments.push(e), d = e.p3;
	};
	for (; l < i.length;) {
		if (t.test(i[l] ?? "")) u = i[l], l += 1;
		else if (!u) throw Error("Lucide path is missing a command.");
		let e = u.toUpperCase(), n = u !== e;
		if (e === "M") {
			for (d = h(n), f = {
				start: d,
				segments: []
			}, o.push(f); p();) {
				let e = h(n);
				g(a(d, e));
			}
			u = n ? "l" : "L";
			continue;
		}
		if (!f) throw Error("Lucide path must begin with M.");
		if (e === "L") {
			for (; p();) {
				let e = h(n);
				g(a(d, e));
			}
			continue;
		}
		if (e === "H") {
			for (; p();) {
				let e = m(), t = {
					x: n ? d.x + e : e,
					y: d.y
				};
				g(a(d, t));
			}
			continue;
		}
		if (e === "V") {
			for (; p();) {
				let e = m(), t = {
					x: d.x,
					y: n ? d.y + e : e
				};
				g(a(d, t));
			}
			continue;
		}
		if (e === "C") {
			for (; p();) {
				let e = h(n), t = h(n), r = h(n);
				g({
					p0: d,
					p1: e,
					p2: t,
					p3: r
				});
			}
			continue;
		}
		if (e === "A") {
			for (; p();) {
				let e = m(), t = m(), r = m(), i = m(), a = m(), o = h(n);
				s(d, e, t, r, i, a, o).forEach(g);
			}
			continue;
		}
		if (e === "Z") {
			r(d, f.start) || g(a(d, f.start)), d = f.start, u = "";
			continue;
		}
		throw Error(`Unsupported Lucide path command: ${u}`);
	}
	if (o.length === 0 || o.some((e) => e.segments.length === 0)) throw Error("Lucide paths must contain drawable segments.");
	return c(o);
}
function u(e, t, n, r) {
	return l(`M${e} ${t} L${n} ${r}`);
}
function d(e, t, n) {
	return l(`M${e + n} ${t} A${n} ${n} 0 1 1 ${e - n} ${t} A${n} ${n} 0 1 1 ${e + n} ${t}`);
}
function f(e, t, n, r, i, a = i) {
	return l(i === 0 && a === 0 ? `M${e} ${t} H${e + n} V${t + r} H${e} Z` : `M${e + i} ${t} H${e + n - i} A${i} ${a} 0 0 1 ${e + n} ${t + a} V${t + r - a} A${i} ${a} 0 0 1 ${e + n - i} ${t + r} H${e + i} A${i} ${a} 0 0 1 ${e} ${t + r - a} V${t + a} A${i} ${a} 0 0 1 ${e + i} ${t} Z`);
}
function p(e) {
	let t = e.trim().split(/[\s,]+/).map(Number);
	if (t.length < 4 || t.length % 2 != 0) throw Error("Lucide polygons require coordinate pairs.");
	let n = [`M${t[0]} ${t[1]}`];
	for (let e = 2; e < t.length; e += 2) n.push(`L${t[e]} ${t[e + 1]}`);
	return n.push("Z"), l(n.join(" "));
}
function m(...e) {
	return e.join(" ");
}
function h(e = 12, t = 12) {
	return u(e, t, e, t);
}
//#endregion
//#region src/morph/presetEndpoints.ts
function g(e, t, n, r, i = 1, a = 1) {
	return {
		id: e,
		name: t,
		from: n,
		to: r,
		fromOpacity: i,
		toOpacity: a,
		mode: "stroke"
	};
}
var _ = h(), v = m(_, _), y = l("M20 6 9 17l-5-5"), b = l("m6 6 12 12"), x = l("M18 6 6 18"), S = l("M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"), C = l("M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"), w = l("M14.084 14.158a3 3 0 0 1-4.242-4.242"), T = l("M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"), E = l("M10.268 21a2 2 0 0 0 3.464 0"), ee = l("M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"), te = l("M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742"), D = l("M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05"), O = l("M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"), k = l("M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"), A = l("M19 10v2a7 7 0 0 1-14 0v-2"), j = l("M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"), ne = l("M16.5 16.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5a5.5 5.5 0 0 1 2.14-4.35"), re = l("M8.76 3.1c1.15.22 2.13.78 3.24 1.9 1.5-1.5 2.74-2 4.5-2A5.5 5.5 0 0 1 22 8.5c0 2.12-1.3 3.78-2.67 5.17"), ie = l("M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"), ae = l("M8.34 8.34 2 9.27l5 4.87L5.82 21 12 17.77 18.18 21l-.59-3.43"), oe = l("M18.42 12.76 22 9.27l-6.91-1L12 2l-1.44 2.91"), se = l("m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"), ce = l("m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"), le = l("M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"), ue = d(12, 12, 4), de = l("M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"), M = l("M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"), fe = l("m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"), N = l("M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"), P = l("M14 2v4a2 2 0 0 0 2 2h4"), pe = {
	"menu-x": [
		g("menu-top", "Top rail", u(4, 6, 20, 6), b),
		g("menu-middle", "Middle rail", u(4, 12, 20, 12), _, 1, 0),
		g("menu-bottom", "Bottom rail", u(4, 18, 20, 18), x)
	],
	"play-pause": [g("play-left", "Play outline to left bar", p("6 3 20 12 6 21 6 3"), f(6, 4, 4, 16, 1)), g("play-right", "Right pause bar", h(14, 4), f(14, 4, 4, 16, 1), 0, 1)],
	"plus-check": [g("plus-horizontal", "Plus to check", l("M5 12h14"), y), g("plus-vertical", "Retracting arm", l("M12 5v14"), h(9, 17), 1, 0)],
	"arrow-down-up": [
		g("arrow-shaft", "Shaft", l("M12 5v14"), l("M12 19V5")),
		g("arrow-left", "Arrow head", l("m19 12-7 7-7-7"), l("m5 12 7-7 7 7")),
		g("arrow-right", "Loading sweep", _, _, 0, 0)
	],
	"search-x": [g("search-ring", "Lens to slash", d(11, 11, 8), b), g("search-handle", "Handle to second slash", l("m21 21-4.3-4.3"), x)],
	"eye-eye-off": [
		g("eye-outline", "Eye upper outline", S, C),
		g("eye-pupil", "Pupil", d(12, 12, 3), w),
		g("eye-lower-outline", "Eye lower outline", h(17.479, 17.499), T, 0, 1),
		g("eye-slash", "Slash", h(2, 2), u(2, 2, 22, 22), 0, 1)
	],
	"bell-bell-off": [
		g("bell-body", "Bell body", ee, te),
		g("bell-clapper", "Clapper", E, E),
		g("bell-upper", "Bell upper outline", h(8.668, 3.01), D, 0, 1),
		g("bell-slash", "Slash", h(2, 2), u(2, 2, 22, 22), 0, 1)
	],
	"volume-volume-x": [
		g("volume-speaker", "Speaker", O, O),
		g("volume-wave-upper", "Inner wave to slash", l("M16 9a5 5 0 0 1 0 6"), u(22, 9, 16, 15)),
		g("volume-wave-lower", "Outer wave to slash", l("M19.364 18.364a9 9 0 0 0 0-12.728"), u(16, 9, 22, 15))
	],
	"mic-mic-off": [
		g("mic-capsule", "Capsule upper", k, l("M15 9.34V5a3 3 0 0 0-5.68-1.33")),
		g("mic-capsule-lower", "Capsule lower", h(9, 9), l("M9 9v3a3 3 0 0 0 5.12 2.12"), 0, 1),
		g("mic-stand", "Stand lower", A, l("M5 10v2a7 7 0 0 0 12 5")),
		g("mic-stand-upper", "Stand upper", h(18.89, 13.23), l("M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"), 0, 1),
		g("mic-base", "Base", u(12, 19, 12, 22), u(12, 19, 12, 22)),
		g("mic-slash", "Slash", h(2, 2), u(2, 2, 22, 22), 0, 1)
	],
	"lock-lock-open": [g("lock-body", "Lock body", f(3, 11, 18, 11, 2), f(3, 11, 18, 11, 2)), g("lock-shackle", "Shackle", l("M7 11V7a5 5 0 0 1 10 0v4"), l("M7 11V7a5 5 0 0 1 9.9-1"))],
	"heart-heart-off": [
		g("heart-body", "Heart lower", j, ne),
		g("heart-upper", "Heart upper", h(8.76, 3.1), re, 0, 1),
		g("heart-slash", "Slash", h(2, 2), u(2, 2, 22, 22), 0, 1)
	],
	"star-star-off": [
		g("star-body", "Star lower", ie, ae),
		g("star-upper", "Star upper", h(18.42, 12.76), oe, 0, 1),
		g("star-slash", "Slash", h(2, 2), u(2, 2, 22, 22), 0, 1)
	],
	"bookmark-bookmark-check": [
		g("bookmark-ribbon", "Bookmark", se, ce),
		g("bookmark-check-short", "Check", h(9, 10), l("m9 10 2 2 4-4"), 0, 1),
		g("bookmark-check-long", "Loading sweep", _, _, 0, 0)
	],
	"calendar-calendar-check": [
		g("calendar-frame", "Calendar frame", f(3, 4, 18, 18, 2), f(3, 4, 18, 18, 2)),
		g("calendar-top-rule", "Top rule", l("M3 10h18"), l("M3 10h18")),
		g("calendar-rings", "Binding rings", m(l("M8 2v4"), l("M16 2v4")), m(l("M8 2v4"), l("M16 2v4"))),
		g("calendar-check-short", "Check", h(9, 16), l("m9 16 2 2 4-4"), 0, 1),
		g("calendar-check-long", "Loading sweep", _, _, 0, 0)
	],
	"send-check": [g("send-short-check", "Plane diagonal to check", l("m21.854 2.147-10.94 10.939"), y), g("send-long-check", "Plane outline", le, h(9, 17), 1, 0)],
	"filter-list-filter": [
		g("filter-top", "Filter to top bar", p("22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"), l("M3 6h18")),
		g("filter-middle", "Middle bar", h(7, 12), l("M7 12h10"), 0, 1),
		g("filter-bottom", "Bottom bar", h(10, 18), l("M10 18h4"), 0, 1)
	],
	"chevron-down-up": [g("chevron-left", "Chevron", l("m6 9 6 6 6-6"), l("m18 15-6-6-6 6")), g("chevron-right", "Loading sweep", _, _, 0, 0)],
	"sun-moon": [
		g("sun-core", "Sun core to moon", ue, de),
		g("sun-ray-vertical", "Vertical rays", m(l("M12 2v2"), l("M12 20v2")), v, 1, 0),
		g("sun-ray-horizontal", "Horizontal rays", m(l("M2 12h2"), l("M20 12h2")), v, 1, 0),
		g("sun-ray-diagonal-a", "Diagonal rays A", m(l("m4.93 4.93 1.41 1.41"), l("m17.66 17.66 1.41 1.41")), v, 1, 0),
		g("sun-ray-diagonal-b", "Diagonal rays B", m(l("m6.34 17.66-1.41 1.41"), l("m19.07 4.93-1.41 1.41")), v, 1, 0)
	],
	"folder-folder-open": [g("folder-tab", "Loading sweep", _, _, 0, 0), g("folder-body", "Folder", M, fe)],
	"file-file-check": [
		g("file-outline", "File outline", N, N),
		g("file-fold", "File fold", P, P),
		g("file-check-short", "Check", h(9, 15), l("m9 15 2 2 4-4"), 0, 1),
		g("file-check-long", "Loading sweep", _, _, 0, 0)
	],
	"collapse-sidebar-to-expand-inspector": [
		g("workspace-frame", "Workspace frame", f(3, 3, 18, 18, 2), f(3, 3, 18, 18, 2)),
		g("workspace-divider", "Panel divider", u(9, 3, 9, 21), u(15, 3, 15, 21)),
		g("workspace-arrow", "Panel direction", l("m16 15-3-3 3-3"), l("m8 9 3 3-3 3"))
	],
	"maximize-minimize": [
		g("fullscreen-corner-a", "First corner", l("M15 3h6v6"), l("M4 14h6v6")),
		g("fullscreen-corner-b", "Second corner", l("M9 21H3v-6"), l("M20 10h-6V4")),
		g("fullscreen-diagonal-a", "First diagonal", u(21, 3, 14, 10), u(14, 10, 21, 3)),
		g("fullscreen-diagonal-b", "Second diagonal", u(3, 21, 10, 14), u(3, 21, 10, 14))
	],
	"layout-grid-list": [
		g("view-item-a", "Top marker", f(3, 3, 7, 7, 1), l("M3 6h.01")),
		g("view-item-b", "Top row", f(14, 3, 7, 7, 1), u(8, 6, 21, 6)),
		g("view-item-c", "Middle marker", f(3, 14, 7, 7, 1), l("M3 12h.01")),
		g("view-item-d", "Middle row", f(14, 14, 7, 7, 1), u(8, 12, 21, 12)),
		g("view-item-e", "Bottom marker", h(3, 18), l("M3 18h.01"), 0, 1),
		g("view-item-f", "Bottom row", h(8, 18), u(8, 18, 21, 18), 0, 1)
	],
	"columns-rows": [g("layout-frame", "Layout frame", f(3, 3, 18, 18, 2), f(3, 3, 18, 18, 2)), g("layout-divider", "Layout divider", u(12, 3, 12, 21), u(3, 12, 21, 12))],
	"undo-redo": [g("history-arrow", "History arrow", l("M9 14 4 9l5-5"), l("m15 14 5-5-5-5")), g("history-curve", "History curve", l("M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5 5.5 5.5 0 0 1-5.5 5.5H11"), l("M20 9H9.5A5.5 5.5 0 0 0 4 14.5 5.5 5.5 0 0 0 9.5 20H13"))],
	"rotate-ccw-cw": [g("rotate-orbit", "Rotation orbit", l("M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"), l("M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8")), g("rotate-corner", "Rotation arrow", l("M3 3v5h5"), l("M21 3v5h-5"))],
	"zoom-in-out": [
		g("zoom-ring", "Lens", d(11, 11, 8), d(11, 11, 8)),
		g("zoom-handle", "Lens handle", u(21, 21, 16.65, 16.65), u(21, 21, 16.65, 16.65)),
		g("zoom-horizontal", "Horizontal control", u(8, 11, 14, 11), u(8, 11, 14, 11)),
		g("zoom-vertical", "Vertical control", u(11, 8, 11, 14), h(11, 11), 1, 0)
	],
	"pin-pin-off": [
		g("pin-stem", "Pin stem", u(12, 17, 12, 22), u(12, 17, 12, 22)),
		g("pin-body", "Pin body", l("M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"), l("M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11")),
		g("pin-upper", "Pin upper", h(15, 9.34), l("M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89"), 0, 1),
		g("pin-slash", "Unpin slash", h(2, 2), u(2, 2, 22, 22), 0, 1)
	],
	"link-unlink": [
		g("link-upper", "Upper link", l("M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"), l("m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71")),
		g("link-lower", "Lower link", l("M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"), l("m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71")),
		g("unlink-mark-a", "Upper mark", h(8, 2), u(8, 2, 8, 5), 0, 1),
		g("unlink-mark-b", "Left mark", h(2, 8), u(2, 8, 5, 8), 0, 1),
		g("unlink-mark-c", "Lower mark", h(16, 19), u(16, 19, 16, 22), 0, 1),
		g("unlink-mark-d", "Right mark", h(19, 16), u(19, 16, 22, 16), 0, 1)
	],
	"cloud-download-upload": [
		g("cloud-body", "Cloud", l("M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"), l("M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242")),
		g("cloud-arrow-primary", "Transfer arrow", l("M12 13v8l-4-4"), l("m8 17 4-4 4 4")),
		g("cloud-arrow-secondary", "Transfer shaft", l("m12 21 4-4"), l("M12 13v8"))
	],
	"mail-mail-open": [g("mail-frame", "Envelope frame", f(2, 4, 20, 16, 2), l("M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z")), g("mail-flap", "Envelope flap", l("m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"), l("m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"))],
	"user-plus-check": [
		g("user-body", "User body", l("M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"), l("M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2")),
		g("user-head", "User head", d(9, 7, 4), d(9, 7, 4)),
		g("user-action-horizontal", "User action", u(22, 11, 16, 11), l("M16 11l2 2 4-4")),
		g("user-action-vertical", "Retracting action", u(19, 8, 19, 14), h(18, 13), 1, 0)
	],
	"toggle-left-right": [g("toggle-track", "Toggle track", f(2, 6, 20, 12, 6), f(2, 6, 20, 12, 6)), g("toggle-thumb", "Toggle thumb", d(8, 12, 2), d(16, 12, 2))],
	"align-left-right": [
		g("align-middle", "Middle rule", u(15, 12, 3, 12), u(21, 12, 9, 12)),
		g("align-bottom", "Bottom rule", u(17, 18, 3, 18), u(21, 18, 7, 18)),
		g("align-top", "Top rule", u(21, 6, 3, 6), u(21, 6, 3, 6))
	],
	"image-image-off": [
		g("image-frame-lower", "Image lower frame", f(3, 3, 18, 18, 2), l("M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59")),
		g("image-sun", "Image point", d(9, 9, 2), l("M10.41 10.41a2 2 0 1 1-2.83-2.83")),
		g("image-mountain", "Image mountain", l("m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"), u(13.5, 13.5, 6, 21)),
		g("image-ridge", "Image ridge", h(18, 12), u(18, 12, 21, 15), 0, 1),
		g("image-frame-upper", "Image upper frame", h(21, 15), l("M21 15V5a2 2 0 0 0-2-2H9"), 0, 1),
		g("image-slash", "Image slash", h(2, 2), u(2, 2, 22, 22), 0, 1)
	],
	"wifi-wifi-off": [
		g("wifi-dot", "Wi-Fi point", l("M12 20h.01"), l("M12 20h.01")),
		g("wifi-inner", "Inner signal", l("M8.5 16.429a5 5 0 0 1 7 0"), l("M8.5 16.429a5 5 0 0 1 7 0")),
		g("wifi-middle-left", "Middle signal", l("M5 12.859a10 10 0 0 1 14 0"), l("M5 12.859a10 10 0 0 1 5.17-2.69")),
		g("wifi-outer-left", "Outer signal", l("M2 8.82a15 15 0 0 1 20 0"), l("M2 8.82a15 15 0 0 1 4.177-2.643")),
		g("wifi-middle-right", "Middle signal end", h(19, 12.859), l("M19 12.859a10 10 0 0 0-2.007-1.523"), 0, 1),
		g("wifi-outer-right", "Outer signal end", h(22, 8.82), l("M22 8.82a15 15 0 0 0-11.288-3.764"), 0, 1),
		g("wifi-slash", "Wi-Fi slash", h(2, 2), u(2, 2, 22, 22), 0, 1)
	],
	"circle-play-stop": [g("media-circle", "Media circle", d(12, 12, 10), d(12, 12, 10)), g("media-control", "Media control", p("10 8 16 12 10 16 10 8"), f(9, 9, 6, 6, 1))],
	"archive-restore": [
		g("archive-lid", "Archive lid", f(2, 3, 20, 5, 1), f(2, 3, 20, 5, 1)),
		g("archive-body-left", "Archive body", l("M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"), l("M4 8v11a2 2 0 0 0 2 2h2")),
		g("archive-body-right", "Archive body end", h(20, 8), l("M20 8v11a2 2 0 0 1-2 2h-2"), 0, 1),
		g("archive-action", "Archive action", u(10, 12, 14, 12), l("m9 15 3-3 3 3")),
		g("archive-shaft", "Restore shaft", h(12, 12), u(12, 12, 12, 21), 0, 1)
	],
	"log-in-out": [
		g("session-door", "Session door", l("M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"), l("M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4")),
		g("session-arrow", "Session arrow", l("M10 17l5-5-5-5"), l("M16 17l5-5-5-5")),
		g("session-shaft", "Session shaft", u(15, 12, 3, 12), u(21, 12, 9, 12))
	],
	"copy-clipboard-check": [
		g("copy-front", "Copy surface", f(8, 8, 14, 14, 2), l("M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2")),
		g("copy-back", "Copy backing", l("M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"), f(8, 2, 8, 4, 1)),
		g("copy-check", "Copied check", h(9, 14), l("m9 14 2 2 4-4"), 0, 1)
	],
	"message-message-off": [
		g("message-lower", "Message bubble", l("M7.9 20A9 9 0 1 0 4 16.1L2 22Z"), l("M5.6 5.6C3 8.3 2.2 12.5 4 16l-2 6 6-2c3.4 1.8 7.6 1.1 10.3-1.7")),
		g("message-upper", "Message bubble end", h(20.5, 14.9), l("M20.5 14.9A9 9 0 0 0 9.1 3.5"), 0, 1),
		g("message-slash", "Message slash", h(2, 2), u(2, 2, 22, 22), 0, 1)
	],
	"battery-low-full": [
		g("battery-shell", "Battery shell", f(2, 7, 16, 10, 2), f(2, 7, 16, 10, 2)),
		g("battery-terminal", "Battery terminal", u(22, 11, 22, 13), u(22, 11, 22, 13)),
		g("battery-cell-low", "Low charge cell", u(6, 11, 6, 13), u(6, 11, 6, 13)),
		g("battery-cell-middle", "Middle charge cell", h(10, 12), u(10, 11, 10, 13), 0, 1),
		g("battery-cell-full", "Full charge cell", h(14, 12), u(14, 11, 14, 13), 0, 1)
	],
	"signal-low-high": [
		g("signal-origin", "Signal origin", l("M2 20h.01"), l("M2 20h.01")),
		g("signal-low-bar", "Low signal bar", l("M7 20v-4"), l("M7 20v-4")),
		g("signal-middle-bar", "Middle signal bar", h(12, 20), l("M12 20v-8"), 0, 1),
		g("signal-high-bar", "High signal bar", h(17, 20), l("M17 20V8"), 0, 1)
	],
	"volume-low-high": [
		g("volume-level-speaker", "Speaker", O, O),
		g("volume-level-inner", "Inner sound wave", l("M16 9a5 5 0 0 1 0 6"), l("M16 9a5 5 0 0 1 0 6")),
		g("volume-level-outer", "Outer sound wave", h(19.364, 18.364), l("M19.364 18.364a9 9 0 0 0 0-12.728"), 0, 1)
	],
	"shield-shield-check": [g("shield-outline", "Shield outline", l("M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"), l("M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z")), g("shield-check", "Verification check", h(9, 12), l("m9 12 2 2 4-4"), 0, 1)],
	"camera-camera-off": [
		g("camera-frame-lower", "Camera body", l("M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"), l("M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16")),
		g("camera-frame-upper", "Camera body end", h(9.5, 4), l("M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5"), 0, 1),
		g("camera-lens", "Camera lens", d(12, 13, 3), l("M14.121 15.121A3 3 0 1 1 9.88 10.88")),
		g("camera-slash", "Camera off slash", h(2, 2), u(2, 2, 22, 22), 0, 1)
	],
	"video-video-off": [
		g("video-lens", "Video lens", l("m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"), l("M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196")),
		g("video-body", "Video body", f(2, 6, 14, 12, 2), l("M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2")),
		g("video-slash", "Video off slash", h(2, 2), u(2, 2, 22, 22), 0, 1)
	],
	"bluetooth-bluetooth-off": [
		g("bluetooth-lower", "Bluetooth symbol", l("m7 7 10 10-5 5V2l5 5L7 17"), l("m17 17-5 5V12l-5 5")),
		g("bluetooth-upper", "Bluetooth upper symbol", h(14.5, 9.5), l("M14.5 9.5 17 7l-5-5v4.5"), 0, 1),
		g("bluetooth-slash", "Bluetooth off slash", h(2, 2), u(2, 2, 22, 22), 0, 1)
	],
	"navigation-navigation-off": [
		g("navigation-lower", "Navigation pointer", p("3 11 22 2 13 21 11 13 3 11"), l("M8.43 8.43 3 11l8 2 2 8 2.57-5.43")),
		g("navigation-upper", "Navigation pointer end", h(17.39, 11.73), l("M17.39 11.73 22 2l-9.73 4.61"), 0, 1),
		g("navigation-slash", "Navigation off slash", h(2, 2), u(2, 2, 22, 22), 0, 1)
	],
	"map-pin-map-pin-check": [
		g("location-pin", "Location pin", l("M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"), l("M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728")),
		g("location-dot", "Location dot", d(12, 10, 3), d(12, 10, 3)),
		g("location-check", "Location confirmation", h(16, 18), l("m16 18 2 2 4-4"), 0, 1)
	],
	"package-package-open": [
		g("package-spine", "Package spine", l("M12 22V12"), l("M12 22v-9")),
		g("package-shell", "Package shell", l("M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"), l("M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z")),
		g("package-fold", "Package lower fold", l("m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"), l("M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13")),
		g("package-flap", "Package upper flap", l("m7.5 4.27 9 5.15"), l("M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z"))
	],
	"door-closed-open": [
		g("door-frame", "Door frame", l("M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"), l("M13 4h3a2 2 0 0 1 2 2v14")),
		g("door-threshold-left", "Door threshold left", l("M2 20h20"), l("M2 20h3")),
		g("door-threshold-right", "Door threshold right", h(13, 20), l("M13 20h9"), 0, 1),
		g("door-handle", "Door handle", l("M14 12v.01"), l("M10 12v.01")),
		g("door-panel", "Open door panel", h(13, 4.562), l("M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"), 0, 1)
	],
	"panel-bottom-close-open": [
		g("bottom-panel-frame", "Bottom panel frame", f(3, 3, 18, 18, 2), f(3, 3, 18, 18, 2)),
		g("bottom-panel-divider", "Bottom panel divider", l("M3 15h18"), l("M3 15h18")),
		g("bottom-panel-arrow", "Bottom panel arrow", l("m15 8-3 3-3-3"), l("m9 10 3-3 3 3"))
	],
	"circle-plus-check": [
		g("circle-action-frame", "Action circle", d(12, 12, 10), d(12, 12, 10)),
		g("circle-action-primary", "Add to complete", l("M8 12h8"), l("m9 12 2 2 4-4")),
		g("circle-action-secondary", "Retracting add arm", l("M12 8v8"), h(11, 14), 1, 0)
	],
	"circle-alert-check": [
		g("circle-status-frame", "Status circle", d(12, 12, 10), d(12, 12, 10)),
		g("circle-status-primary", "Alert to check", u(12, 8, 12, 12), l("m9 12 2 2 4-4")),
		g("circle-status-dot", "Alert dot", u(12, 16, 12.01, 16), h(11, 14), 1, 0)
	],
	"clipboard-clipboard-check": [
		g("clipboard-clip", "Clipboard clip", f(8, 2, 8, 4, 1), f(8, 2, 8, 4, 1)),
		g("clipboard-frame", "Clipboard frame", l("M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"), l("M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2")),
		g("clipboard-check", "Clipboard check", h(9, 14), l("m9 14 2 2 4-4"), 0, 1)
	],
	"calendar-plus-check": [
		g("event-calendar-left-ring", "Left calendar ring", l("M8 2v4"), l("M8 2v4")),
		g("event-calendar-right-ring", "Right calendar ring", l("M16 2v4"), l("M16 2v4")),
		g("event-calendar-frame", "Calendar frame", l("M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"), f(3, 4, 18, 18, 2)),
		g("event-calendar-divider", "Calendar divider", l("M3 10h18"), l("M3 10h18")),
		g("event-calendar-action", "Add to confirm", l("M16 19h6"), l("m9 16 2 2 4-4")),
		g("event-calendar-add-arm", "Retracting add arm", l("M19 16v6"), h(11, 18), 1, 0)
	],
	"user-plus-minus": [
		g("membership-body", "User body", l("M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"), l("M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2")),
		g("membership-head", "User head", d(9, 7, 4), d(9, 7, 4)),
		g("membership-horizontal", "Membership action", u(22, 11, 16, 11), u(22, 11, 16, 11)),
		g("membership-vertical", "Retracting add arm", u(19, 8, 19, 14), h(19, 11), 1, 0)
	],
	"bookmark-plus-check": [
		g("bookmark-action-ribbon", "Bookmark ribbon", l("m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"), ce),
		g("bookmark-action-primary", "Add to save", u(15, 10, 9, 10), l("m9 10 2 2 4-4")),
		g("bookmark-action-secondary", "Retracting add arm", u(12, 7, 12, 13), h(11, 12), 1, 0)
	],
	"folder-plus-check": [
		g("folder-action-frame", "Folder frame", M, M),
		g("folder-action-primary", "Add to ready", l("M9 13h6"), l("m9 13 2 2 4-4")),
		g("folder-action-secondary", "Retracting add arm", l("M12 10v6"), h(11, 15), 1, 0)
	],
	"file-plus-check": [
		g("file-action-outline", "File outline", N, N),
		g("file-action-fold", "File fold", P, P),
		g("file-action-primary", "Add to ready", l("M9 15h6"), l("m9 15 2 2 4-4")),
		g("file-action-secondary", "Retracting add arm", l("M12 18v-6"), h(11, 17), 1, 0)
	],
	"cloud-cloud-off": [
		g("cloud-status-lower", "Cloud body", l("M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"), l("M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193")),
		g("cloud-status-upper", "Cloud body end", h(21.532, 16.5), l("M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07"), 0, 1),
		g("cloud-status-slash", "Cloud offline slash", h(2, 2), u(2, 2, 22, 22), 0, 1)
	],
	"monitor-play-stop": [
		g("screen-control", "Screen playback control", l("M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z"), f(9, 7, 6, 6, 1)),
		g("screen-stand", "Monitor stand", l("M12 17v4"), l("M12 17v4")),
		g("screen-base", "Monitor base", l("M8 21h8"), l("M8 21h8")),
		g("screen-frame", "Monitor frame", f(2, 3, 20, 14, 2), f(2, 3, 20, 14, 2))
	],
	"mouse-pointer-click": [
		g("pointer-body", "Pointer body", l("M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z"), l("M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z")),
		g("pointer-ray-top-right", "Click ray top right", l("M12.586 12.586 19 19"), l("M14 4.1 12 6")),
		g("pointer-ray-left", "Click ray left", h(5.1, 8), l("m5.1 8-2.9-.8"), 0, 1),
		g("pointer-ray-bottom-left", "Click ray bottom left", h(6, 12), l("m6 12-1.9 2"), 0, 1),
		g("pointer-ray-top-left", "Click ray top left", h(7.2, 2.2), l("M7.2 2.2 8 5.1"), 0, 1)
	],
	"scan-scan-line": [
		g("scanner-top-left", "Scanner top left corner", l("M3 7V5a2 2 0 0 1 2-2h2"), l("M3 7V5a2 2 0 0 1 2-2h2")),
		g("scanner-top-right", "Scanner top right corner", l("M17 3h2a2 2 0 0 1 2 2v2"), l("M17 3h2a2 2 0 0 1 2 2v2")),
		g("scanner-bottom-right", "Scanner bottom right corner", l("M21 17v2a2 2 0 0 1-2 2h-2"), l("M21 17v2a2 2 0 0 1-2 2h-2")),
		g("scanner-bottom-left", "Scanner bottom left corner", l("M7 21H5a2 2 0 0 1-2-2v-2"), l("M7 21H5a2 2 0 0 1-2-2v-2")),
		g("scanner-line", "Scanning line", h(7, 12), l("M7 12h10"), 0, 1)
	],
	"printer-printer-check": [
		g("print-body", "Printer body", l("M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"), l("M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2")),
		g("print-paper", "Printer paper", l("M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"), l("M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6")),
		g("print-output", "Printed page", f(6, 14, 12, 8, 1), l("M13.5 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5")),
		g("print-check", "Printed check", h(16, 19), l("m16 19 2 2 4-4"), 0, 1)
	],
	"laptop-laptop-check": [
		g("device-frame", "Laptop frame", f(3, 4, 18, 12, 2), f(3, 4, 18, 12, 2)),
		g("device-base", "Laptop base", u(2, 20, 22, 20), l("M2 20h20")),
		g("device-check", "Device check", h(9, 10), l("m9 10 2 2 4-4"), 0, 1)
	],
	"receipt-receipt-text": [
		g("receipt-outline", "Receipt outline", l("M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"), l("M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z")),
		g("receipt-content-primary", "Receipt amount to text", l("M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"), l("M14 8H8")),
		g("receipt-content-secondary", "Receipt currency stem to text", l("M12 17.5v-11"), l("M16 12H8")),
		g("receipt-content-tertiary", "Receipt detail line", h(13, 16), l("M13 16H8"), 0, 1)
	],
	"list-list-checks": [
		g("checklist-bottom-marker", "Bottom list marker", l("M3 18h.01"), l("m3 17 2 2 4-4")),
		g("checklist-top-marker", "Top list marker", l("M3 6h.01"), l("m3 7 2 2 4-4")),
		g("checklist-middle-marker", "Retracting middle marker", l("M3 12h.01"), h(13, 12), 1, 0),
		g("checklist-top-rail", "Top list rail", l("M8 6h13"), l("M13 6h8")),
		g("checklist-middle-rail", "Middle list rail", l("M8 12h13"), l("M13 12h8")),
		g("checklist-bottom-rail", "Bottom list rail", l("M8 18h13"), l("M13 18h8"))
	],
	"table-cells-merge-split": [
		g("table-action-frame", "Table frame", f(3, 3, 18, 18, 2), f(3, 3, 18, 18, 2)),
		g("table-action-top-divider", "Top row divider", l("M3 9h18"), l("M3 9h18")),
		g("table-action-bottom-divider", "Bottom row divider", l("M3 15h18"), l("M3 15h18")),
		g("table-action-lower-split", "Lower cell split", l("M12 21v-6"), l("M12 15V9")),
		g("table-action-upper-split", "Retracting upper split", l("M12 9V3"), h(12, 9), 1, 0)
	],
	"chart-bar-decrease-increase": [
		g("trend-frame", "Chart frame", l("M3 3v16a2 2 0 0 0 2 2h16"), l("M3 3v16a2 2 0 0 0 2 2h16")),
		g("trend-middle-bar", "Middle trend bar", l("M7 11h8"), l("M7 11h8")),
		g("trend-top-bar", "Top trend bar", l("M7 6h12"), l("M7 6h3")),
		g("trend-bottom-bar", "Bottom trend bar", l("M7 16h3"), l("M7 16h12"))
	],
	"battery-charging-full": [
		g("charge-shell-primary", "Charging shell to battery shell", l("M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"), f(2, 7, 16, 10, 2)),
		g("charge-shell-secondary", "Charging shell to first cell", l("M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"), u(6, 11, 6, 13)),
		g("charge-bolt", "Charge bolt to middle cell", l("m11 7-3 5h4l-3 5"), u(10, 11, 10, 13)),
		g("charge-terminal", "Battery terminal", u(22, 11, 22, 13), u(22, 11, 22, 13)),
		g("charge-final-cell", "Final charge cell", h(14, 12), u(14, 11, 14, 13), 0, 1)
	],
	"square-plus-check": [
		g("square-action-frame", "Action square", f(3, 3, 18, 18, 2), f(3, 3, 18, 18, 2)),
		g("square-action-primary", "Add to complete", l("M8 12h8"), l("m9 12 2 2 4-4")),
		g("square-action-secondary", "Retracting add arm", l("M12 8v8"), h(11, 14), 1, 0)
	],
	"mail-plus-check": [
		g("mail-action-frame", "Mail frame", l("M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"), l("M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8")),
		g("mail-action-flap", "Mail flap", l("m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"), l("m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7")),
		g("mail-action-primary", "Add to confirm", l("M16 19h6"), l("m16 19 2 2 4-4")),
		g("mail-action-secondary", "Retracting add arm", l("M19 16v6"), h(18, 21), 1, 0)
	],
	"alarm-clock-plus-check": [
		g("alarm-action-face", "Alarm face", d(12, 13, 8), d(12, 13, 8)),
		g("alarm-action-left-bell", "Left alarm bell", l("M5 3 2 6"), l("M5 3 2 6")),
		g("alarm-action-right-bell", "Right alarm bell", l("m22 6-3-3"), l("m22 6-3-3")),
		g("alarm-action-left-foot", "Left alarm foot", l("M6.38 18.7 4 21"), l("M6.38 18.7 4 21")),
		g("alarm-action-right-foot", "Right alarm foot", l("M17.64 18.67 20 21"), l("M17.64 18.67 20 21")),
		g("alarm-action-primary", "Add to confirm", l("M9 13h6"), l("m9 13 2 2 4-4")),
		g("alarm-action-secondary", "Retracting add arm", l("M12 10v6"), h(11, 15), 1, 0)
	],
	"timer-timer-reset": [
		g("timer-reset-cap", "Timer cap", u(10, 2, 14, 2), l("M10 2h4")),
		g("timer-reset-hand", "Timer hand", u(12, 14, 15, 11), l("M12 14v-4")),
		g("timer-reset-face", "Timer face to reset arc", d(12, 14, 8), l("M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6")),
		g("timer-reset-arrow", "Reset arrow", h(9, 17), l("M9 17H4v5"), 0, 1)
	],
	"power-power-off": [
		g("power-off-stem", "Power stem", l("M12 2v10"), l("M12 2v4")),
		g("power-off-lower", "Power ring", l("M18.4 6.6a9 9 0 1 1-12.77.04"), l("M6.16 6.16a9 9 0 1 0 12.68 12.68")),
		g("power-off-upper", "Power ring end", h(18.36, 6.64), l("M18.36 6.64A9 9 0 0 1 20.77 15"), 0, 1),
		g("power-off-slash", "Power off slash", h(2, 2), u(2, 2, 22, 22), 0, 1)
	],
	"circle-pause-play": [
		g("circle-media-frame", "Media circle", d(12, 12, 10), d(12, 12, 10)),
		g("circle-media-primary", "Pause bar to play symbol", u(10, 15, 10, 9), p("10 8 16 12 10 16 10 8")),
		g("circle-media-secondary", "Retracting pause bar", u(14, 15, 14, 9), h(10, 12), 1, 0)
	]
};
function me(e) {
	let t = pe[e.id];
	if (!t) throw Error(`Missing Lucide endpoint design for ${e.id}.`);
	return {
		...e,
		layers: t.map((e) => ({ ...e }))
	};
}
//#endregion
//#region src/morph/presetScenes.ts
var he = /[MLCZ]|-?\d*\.?\d+(?:e[-+]?\d+)?/g, ge = /^[MLCZ]$/, _e = 12, F = 9;
function I(e, t, n) {
	return {
		x: e.x + (t.x - e.x) * n,
		y: e.y + (t.y - e.y) * n
	};
}
function ve(e, t) {
	return {
		p0: e,
		p1: I(e, t, 1 / 3),
		p2: I(e, t, 2 / 3),
		p3: t
	};
}
function ye(e, t) {
	let n = I(e.p0, e.p1, t), r = I(e.p1, e.p2, t), i = I(e.p2, e.p3, t), a = I(n, r, t), o = I(r, i, t), s = I(a, o, t);
	return [{
		p0: e.p0,
		p1: n,
		p2: a,
		p3: s
	}, {
		p0: s,
		p1: o,
		p2: i,
		p3: e.p3
	}];
}
function be(e, t) {
	let n = [], r = e;
	for (let e = t; e > 1; --e) {
		let [t, i] = ye(r, 1 / e);
		n.push(t), r = i;
	}
	return n.push(r), n;
}
function L(e) {
	let t = e.replace(he, "").replace(/[\s,]+/g, "");
	if (t) throw Error(`Unsupported SVG path syntax: ${t}`);
	let n = e.match(he) ?? [], r = [], i = 0, a, o, s = () => {
		let e = n[i];
		if (e === void 0 || ge.test(e)) throw Error("Invalid SVG path number sequence.");
		return i += 1, Number(e);
	}, c = () => ({
		x: s(),
		y: s()
	});
	for (; i < n.length;) {
		let e = n[i];
		if (i += 1, !ge.test(e)) throw Error(`Expected an SVG path command, received ${e}.`);
		if (e === "M") {
			a = c(), o = {
				start: a,
				segments: []
			}, r.push(o);
			continue;
		}
		if (!a || !o) throw Error("SVG path must begin with M.");
		if (e === "L") {
			let e = c();
			o.segments.push(ve(a, e)), a = e;
			continue;
		}
		if (e === "C") {
			let e = c(), t = c(), n = c();
			o.segments.push({
				p0: a,
				p1: e,
				p2: t,
				p3: n
			}), a = n;
			continue;
		}
		let t = o.start;
		o.segments.push(ve(a, t)), a = t;
	}
	if (r.length === 0 || r.some((e) => e.segments.length === 0)) throw Error("Every SVG subpath must contain at least one segment.");
	return r;
}
function xe(e, t) {
	if (t < e.segments.length) throw Error("Scene paths cannot discard cubic segments.");
	let n = Math.floor(t / e.segments.length), r = t % e.segments.length;
	return {
		start: e.start,
		segments: e.segments.flatMap((e, t) => be(e, n + +(t < r)))
	};
}
function Se(e, t, n) {
	let r = [
		L(e),
		L(t),
		L(n)
	], i = r[0].length;
	if (r.some((e) => e.length !== i)) throw Error(`Scene states must use the same number of subpaths (${r.map((e) => e.length).join("/")}).`);
	let a = r.map((e) => e.map((e, t) => xe(e, Math.max(...r.map((e) => e[t].segments.length)))));
	return {
		from: z(a[0]),
		loading: z(a[1]),
		to: z(a[2])
	};
}
function R(e) {
	let t = Number(e.toFixed(4));
	return Object.is(t, -0) ? "0" : t.toString();
}
function z(e) {
	return e.map((e) => {
		let t = e.segments.map((e) => `C${R(e.p1.x)} ${R(e.p1.y)} ${R(e.p2.x)} ${R(e.p2.y)} ${R(e.p3.x)} ${R(e.p3.y)}`);
		return `M${R(e.start.x)} ${R(e.start.y)} ${t.join(" ")}`;
	}).join(" ");
}
function B(e, t = F) {
	return {
		x: _e + Math.cos(e) * t,
		y: _e + Math.sin(e) * t
	};
}
function Ce(e, t, n = F) {
	let r = B(e, n), i = B(t, n), a = 4 / 3 * n * Math.tan((t - e) / 4);
	return {
		p0: r,
		p1: {
			x: r.x - Math.sin(e) * a,
			y: r.y + Math.cos(e) * a
		},
		p2: {
			x: i.x + Math.sin(t) * a,
			y: i.y - Math.cos(t) * a
		},
		p3: i
	};
}
function V(e) {
	return e * Math.PI / 180;
}
function we(e, t, n, r = F) {
	let i = V(e), a = (V(t) - i) / n;
	return Array.from({ length: n }, (e, t) => Ce(i + a * t, i + a * (t + 1), r));
}
function H(e, t, n) {
	let r = we(e, t, n);
	return z([{
		start: r[0].p0,
		segments: r
	}]);
}
function U(e) {
	return z(e.map(({ point: e, segmentCount: t }) => ({
		start: e,
		segments: Array.from({ length: t }, () => ({
			p0: e,
			p1: e,
			p2: e,
			p3: e
		}))
	})));
}
function W(e, t) {
	return U([{
		point: e,
		segmentCount: t
	}]);
}
var G = B(V(288));
function K(e, t, n = "clockwise", r = 900) {
	let i = 288 / t.length;
	return {
		label: e,
		rotationDirection: n,
		rotationDuration: r,
		layers: Object.fromEntries(t.map((e, t) => {
			let n = i * t, r = i * (t + 1);
			return [e, {
				loading: H(n, r, Math.max(1, Math.ceil((r - n) / 90))),
				loadingOpacity: 1
			}];
		}))
	};
}
var Te = {
	"menu-x": {
		label: "Loading",
		rotationDirection: "clockwise",
		rotationDuration: 820,
		layers: {
			"menu-top": {
				loading: H(0, 96, 2),
				loadingOpacity: 1
			},
			"menu-middle": {
				loading: H(96, 192, 2),
				loadingOpacity: 1
			},
			"menu-bottom": {
				loading: H(192, 288, 2),
				loadingOpacity: 1
			}
		}
	},
	"play-pause": {
		label: "Buffering",
		rotationDirection: "clockwise",
		rotationDuration: 900,
		layers: {
			"play-left": {
				loading: H(0, 180, 3),
				loadingOpacity: 1
			},
			"play-right": {
				loading: H(180, 288, 2),
				loadingOpacity: 1
			}
		}
	},
	"plus-check": {
		label: "Saving",
		rotationDirection: "clockwise",
		rotationDuration: 860,
		layers: {
			"plus-horizontal": {
				loading: H(0, 144, 2),
				loadingOpacity: 1
			},
			"plus-vertical": {
				loading: H(144, 288, 2),
				loadingOpacity: 1
			}
		}
	},
	"arrow-down-up": {
		label: "Transferring",
		rotationDirection: "counterclockwise",
		rotationDuration: 760,
		layers: {
			"arrow-shaft": {
				loading: H(0, 144, 2),
				loadingOpacity: 1
			},
			"arrow-left": {
				loading: H(144, 216, 1),
				loadingOpacity: 1
			},
			"arrow-right": {
				loading: H(216, 288, 1),
				loadingOpacity: 1
			}
		}
	},
	"search-x": {
		label: "Searching",
		rotationDirection: "clockwise",
		rotationDuration: 900,
		layers: {
			"search-ring": {
				loading: H(0, 288, 4),
				loadingOpacity: 1
			},
			"search-handle": {
				loading: W(G, 1),
				loadingOpacity: 0
			}
		}
	},
	"eye-eye-off": {
		label: "Updating visibility",
		rotationDirection: "clockwise",
		rotationDuration: 1080,
		layers: {
			"eye-outline": {
				loading: H(0, 288, 4),
				loadingOpacity: 1
			},
			"eye-pupil": {
				loading: W({
					x: 12,
					y: 12
				}, 4),
				loadingOpacity: 0
			},
			"eye-lower-outline": {
				loading: W(G, 1),
				loadingOpacity: 0
			},
			"eye-slash": {
				loading: W(G, 1),
				loadingOpacity: 0
			}
		}
	},
	"bell-bell-off": {
		label: "Updating notifications",
		rotationDirection: "counterclockwise",
		rotationDuration: 960,
		layers: {
			"bell-body": {
				loading: H(0, 288, 5),
				loadingOpacity: 1
			},
			"bell-clapper": {
				loading: W({
					x: 12,
					y: 21
				}, 1),
				loadingOpacity: 0
			},
			"bell-upper": {
				loading: W(G, 1),
				loadingOpacity: 0
			},
			"bell-slash": {
				loading: W(G, 1),
				loadingOpacity: 0
			}
		}
	},
	"volume-volume-x": {
		label: "Updating audio",
		rotationDirection: "clockwise",
		rotationDuration: 780,
		layers: {
			"volume-speaker": {
				loading: H(144, 288, 6),
				loadingOpacity: 1
			},
			"volume-wave-upper": {
				loading: H(0, 72, 2),
				loadingOpacity: 1
			},
			"volume-wave-lower": {
				loading: H(72, 144, 2),
				loadingOpacity: 1
			}
		}
	},
	"mic-mic-off": {
		label: "Updating microphone",
		rotationDirection: "clockwise",
		rotationDuration: 880,
		layers: {
			"mic-capsule": {
				loading: H(0, 150, 6),
				loadingOpacity: 1
			},
			"mic-capsule-lower": {
				loading: W(G, 1),
				loadingOpacity: 0
			},
			"mic-stand": {
				loading: H(150, 240, 2),
				loadingOpacity: 1
			},
			"mic-stand-upper": {
				loading: W(G, 1),
				loadingOpacity: 0
			},
			"mic-base": {
				loading: H(240, 288, 2),
				loadingOpacity: 1
			},
			"mic-slash": {
				loading: W(G, 1),
				loadingOpacity: 0
			}
		}
	},
	"lock-lock-open": {
		label: "Updating access",
		rotationDirection: "counterclockwise",
		rotationDuration: 980,
		layers: {
			"lock-body": {
				loading: H(120, 288, 4),
				loadingOpacity: 1
			},
			"lock-shackle": {
				loading: H(0, 120, 4),
				loadingOpacity: 1
			}
		}
	},
	"heart-heart-off": {
		label: "Updating favorite",
		rotationDirection: "clockwise",
		rotationDuration: 1040,
		layers: {
			"heart-body": {
				loading: H(0, 288, 6),
				loadingOpacity: 1
			},
			"heart-upper": {
				loading: W(G, 1),
				loadingOpacity: 0
			},
			"heart-slash": {
				loading: W(G, 1),
				loadingOpacity: 0
			}
		}
	},
	"star-star-off": {
		label: "Updating star",
		rotationDirection: "clockwise",
		rotationDuration: 900,
		layers: {
			"star-body": {
				loading: H(0, 288, 10),
				loadingOpacity: 1
			},
			"star-upper": {
				loading: W(G, 1),
				loadingOpacity: 0
			},
			"star-slash": {
				loading: W(G, 1),
				loadingOpacity: 0
			}
		}
	},
	"bookmark-bookmark-check": {
		label: "Saving bookmark",
		rotationDirection: "clockwise",
		rotationDuration: 940,
		layers: {
			"bookmark-ribbon": {
				loading: H(0, 288, 5),
				loadingOpacity: 1
			},
			"bookmark-check-short": {
				loading: W(G, 1),
				loadingOpacity: 0
			},
			"bookmark-check-long": {
				loading: W(G, 1),
				loadingOpacity: 0
			}
		}
	},
	"calendar-calendar-check": {
		label: "Scheduling",
		rotationDirection: "clockwise",
		rotationDuration: 840,
		layers: {
			"calendar-frame": {
				loading: H(0, 288, 4),
				loadingOpacity: 1
			},
			"calendar-top-rule": {
				loading: W({
					x: 12,
					y: 3
				}, 1),
				loadingOpacity: 0
			},
			"calendar-rings": {
				loading: U([{
					point: {
						x: 21,
						y: 12
					},
					segmentCount: 1
				}, {
					point: G,
					segmentCount: 1
				}]),
				loadingOpacity: 0
			},
			"calendar-check-short": {
				loading: W(G, 1),
				loadingOpacity: 0
			},
			"calendar-check-long": {
				loading: W(G, 1),
				loadingOpacity: 0
			}
		}
	},
	"send-check": {
		label: "Sending",
		rotationDirection: "clockwise",
		rotationDuration: 720,
		layers: {
			"send-short-check": {
				loading: H(0, 96, 2),
				loadingOpacity: 1
			},
			"send-long-check": {
				loading: H(96, 288, 3),
				loadingOpacity: 1
			}
		}
	},
	"filter-list-filter": {
		label: "Applying filters",
		rotationDirection: "counterclockwise",
		rotationDuration: 820,
		layers: {
			"filter-top": {
				loading: H(0, 96, 2),
				loadingOpacity: 1
			},
			"filter-middle": {
				loading: H(96, 192, 2),
				loadingOpacity: 1
			},
			"filter-bottom": {
				loading: H(192, 288, 2),
				loadingOpacity: 1
			}
		}
	},
	"chevron-down-up": {
		label: "Loading",
		rotationDirection: "counterclockwise",
		rotationDuration: 800,
		layers: {
			"chevron-left": {
				loading: H(0, 144, 2),
				loadingOpacity: 1
			},
			"chevron-right": {
				loading: H(144, 288, 2),
				loadingOpacity: 1
			}
		}
	},
	"sun-moon": {
		label: "Switching theme",
		rotationDirection: "clockwise",
		rotationDuration: 1100,
		layers: {
			"sun-core": {
				loading: H(0, 288, 5),
				loadingOpacity: 1
			},
			"sun-ray-vertical": {
				loading: U([{
					point: {
						x: 12,
						y: 12
					},
					segmentCount: 1
				}, {
					point: {
						x: 12,
						y: 12
					},
					segmentCount: 1
				}]),
				loadingOpacity: 0
			},
			"sun-ray-horizontal": {
				loading: U([{
					point: {
						x: 12,
						y: 12
					},
					segmentCount: 1
				}, {
					point: {
						x: 12,
						y: 12
					},
					segmentCount: 1
				}]),
				loadingOpacity: 0
			},
			"sun-ray-diagonal-a": {
				loading: U([{
					point: {
						x: 12,
						y: 12
					},
					segmentCount: 1
				}, {
					point: {
						x: 12,
						y: 12
					},
					segmentCount: 1
				}]),
				loadingOpacity: 0
			},
			"sun-ray-diagonal-b": {
				loading: U([{
					point: {
						x: 12,
						y: 12
					},
					segmentCount: 1
				}, {
					point: {
						x: 12,
						y: 12
					},
					segmentCount: 1
				}]),
				loadingOpacity: 0
			}
		}
	},
	"folder-folder-open": {
		label: "Opening folder",
		rotationDirection: "clockwise",
		rotationDuration: 920,
		layers: {
			"folder-tab": {
				loading: H(0, 120, 3),
				loadingOpacity: 1
			},
			"folder-body": {
				loading: H(120, 288, 3),
				loadingOpacity: 1
			}
		}
	},
	"file-file-check": {
		label: "Checking file",
		rotationDirection: "clockwise",
		rotationDuration: 900,
		layers: {
			"file-outline": {
				loading: H(0, 288, 5),
				loadingOpacity: 1
			},
			"file-fold": {
				loading: W(G, 2),
				loadingOpacity: 0
			},
			"file-check-short": {
				loading: W(G, 1),
				loadingOpacity: 0
			},
			"file-check-long": {
				loading: W(G, 1),
				loadingOpacity: 0
			}
		}
	},
	"collapse-sidebar-to-expand-inspector": K("Switching panel", [
		"workspace-frame",
		"workspace-divider",
		"workspace-arrow"
	], "clockwise", 840),
	"maximize-minimize": K("Resizing view", [
		"fullscreen-corner-a",
		"fullscreen-corner-b",
		"fullscreen-diagonal-a",
		"fullscreen-diagonal-b"
	], "clockwise", 780),
	"layout-grid-list": K("Changing view", [
		"view-item-a",
		"view-item-b",
		"view-item-c",
		"view-item-d",
		"view-item-e",
		"view-item-f"
	], "clockwise", 860),
	"columns-rows": K("Rotating layout", ["layout-frame", "layout-divider"], "counterclockwise", 880),
	"undo-redo": K("Updating history", ["history-arrow", "history-curve"], "counterclockwise", 760),
	"rotate-ccw-cw": K("Changing direction", ["rotate-orbit", "rotate-corner"], "clockwise", 780),
	"zoom-in-out": K("Updating zoom", [
		"zoom-ring",
		"zoom-handle",
		"zoom-horizontal",
		"zoom-vertical"
	], "clockwise", 820),
	"pin-pin-off": K("Updating pin", [
		"pin-stem",
		"pin-body",
		"pin-upper",
		"pin-slash"
	], "counterclockwise", 900),
	"link-unlink": K("Updating link", [
		"link-upper",
		"link-lower",
		"unlink-mark-a",
		"unlink-mark-b",
		"unlink-mark-c",
		"unlink-mark-d"
	], "clockwise", 860),
	"cloud-download-upload": K("Transferring", [
		"cloud-body",
		"cloud-arrow-primary",
		"cloud-arrow-secondary"
	], "clockwise", 800),
	"mail-mail-open": K("Opening mail", ["mail-frame", "mail-flap"], "clockwise", 900),
	"user-plus-check": K("Adding user", [
		"user-body",
		"user-head",
		"user-action-horizontal",
		"user-action-vertical"
	], "clockwise", 840),
	"toggle-left-right": K("Updating toggle", ["toggle-track", "toggle-thumb"], "clockwise", 740),
	"align-left-right": K("Aligning content", [
		"align-middle",
		"align-bottom",
		"align-top"
	], "counterclockwise", 760),
	"image-image-off": K("Updating image", [
		"image-frame-lower",
		"image-sun",
		"image-mountain",
		"image-ridge",
		"image-frame-upper",
		"image-slash"
	], "clockwise", 940),
	"wifi-wifi-off": K("Updating connection", [
		"wifi-dot",
		"wifi-inner",
		"wifi-middle-left",
		"wifi-outer-left",
		"wifi-middle-right",
		"wifi-outer-right",
		"wifi-slash"
	], "counterclockwise", 880),
	"circle-play-stop": K("Updating playback", ["media-circle", "media-control"], "clockwise", 780),
	"archive-restore": K("Restoring archive", [
		"archive-lid",
		"archive-body-left",
		"archive-body-right",
		"archive-action",
		"archive-shaft"
	], "counterclockwise", 900),
	"log-in-out": K("Updating session", [
		"session-door",
		"session-arrow",
		"session-shaft"
	], "clockwise", 820),
	"copy-clipboard-check": K("Copying", [
		"copy-front",
		"copy-back",
		"copy-check"
	], "clockwise", 800),
	"message-message-off": K("Updating messages", [
		"message-lower",
		"message-upper",
		"message-slash"
	], "counterclockwise", 920),
	"battery-low-full": K("Charging battery", [
		"battery-shell",
		"battery-terminal",
		"battery-cell-low",
		"battery-cell-middle",
		"battery-cell-full"
	], "clockwise", 820),
	"signal-low-high": K("Improving signal", [
		"signal-origin",
		"signal-low-bar",
		"signal-middle-bar",
		"signal-high-bar"
	], "clockwise", 780),
	"volume-low-high": K("Raising volume", [
		"volume-level-speaker",
		"volume-level-inner",
		"volume-level-outer"
	], "clockwise", 760),
	"shield-shield-check": K("Verifying", ["shield-outline", "shield-check"], "clockwise", 880),
	"camera-camera-off": K("Updating camera", [
		"camera-frame-lower",
		"camera-frame-upper",
		"camera-lens",
		"camera-slash"
	], "counterclockwise", 900),
	"video-video-off": K("Updating video", [
		"video-lens",
		"video-body",
		"video-slash"
	], "counterclockwise", 860),
	"bluetooth-bluetooth-off": K("Updating Bluetooth", [
		"bluetooth-lower",
		"bluetooth-upper",
		"bluetooth-slash"
	], "clockwise", 840),
	"navigation-navigation-off": K("Updating navigation", [
		"navigation-lower",
		"navigation-upper",
		"navigation-slash"
	], "counterclockwise", 900),
	"map-pin-map-pin-check": K("Confirming location", [
		"location-pin",
		"location-dot",
		"location-check"
	], "clockwise", 860),
	"package-package-open": K("Opening package", [
		"package-spine",
		"package-shell",
		"package-fold",
		"package-flap"
	], "clockwise", 940),
	"door-closed-open": K("Opening door", [
		"door-frame",
		"door-threshold-left",
		"door-threshold-right",
		"door-handle",
		"door-panel"
	], "clockwise", 920),
	"panel-bottom-close-open": K("Updating panel", [
		"bottom-panel-frame",
		"bottom-panel-divider",
		"bottom-panel-arrow"
	], "clockwise", 800),
	"circle-plus-check": K("Completing action", [
		"circle-action-frame",
		"circle-action-primary",
		"circle-action-secondary"
	], "clockwise", 780),
	"circle-alert-check": K("Resolving alert", [
		"circle-status-frame",
		"circle-status-primary",
		"circle-status-dot"
	], "counterclockwise", 820),
	"clipboard-clipboard-check": K("Checking clipboard", [
		"clipboard-clip",
		"clipboard-frame",
		"clipboard-check"
	], "clockwise", 820),
	"calendar-plus-check": K("Confirming event", [
		"event-calendar-left-ring",
		"event-calendar-right-ring",
		"event-calendar-frame",
		"event-calendar-divider",
		"event-calendar-action",
		"event-calendar-add-arm"
	], "clockwise", 900),
	"user-plus-minus": K("Updating membership", [
		"membership-body",
		"membership-head",
		"membership-horizontal",
		"membership-vertical"
	], "counterclockwise", 820),
	"bookmark-plus-check": K("Saving bookmark", [
		"bookmark-action-ribbon",
		"bookmark-action-primary",
		"bookmark-action-secondary"
	], "clockwise", 820),
	"folder-plus-check": K("Creating folder", [
		"folder-action-frame",
		"folder-action-primary",
		"folder-action-secondary"
	], "clockwise", 860),
	"file-plus-check": K("Creating file", [
		"file-action-outline",
		"file-action-fold",
		"file-action-primary",
		"file-action-secondary"
	], "clockwise", 860),
	"cloud-cloud-off": K("Updating cloud", [
		"cloud-status-lower",
		"cloud-status-upper",
		"cloud-status-slash"
	], "counterclockwise", 900),
	"monitor-play-stop": K("Updating playback", [
		"screen-control",
		"screen-stand",
		"screen-base",
		"screen-frame"
	], "clockwise", 820),
	"mouse-pointer-click": K("Clicking", [
		"pointer-body",
		"pointer-ray-top-right",
		"pointer-ray-left",
		"pointer-ray-bottom-left",
		"pointer-ray-top-left"
	], "clockwise", 760),
	"scan-scan-line": K("Scanning", [
		"scanner-top-left",
		"scanner-top-right",
		"scanner-bottom-right",
		"scanner-bottom-left",
		"scanner-line"
	], "clockwise", 820),
	"printer-printer-check": K("Printing", [
		"print-body",
		"print-paper",
		"print-output",
		"print-check"
	], "clockwise", 900),
	"laptop-laptop-check": K("Verifying device", [
		"device-frame",
		"device-base",
		"device-check"
	], "clockwise", 840),
	"receipt-receipt-text": K("Preparing receipt", [
		"receipt-outline",
		"receipt-content-primary",
		"receipt-content-secondary",
		"receipt-content-tertiary"
	], "clockwise", 880),
	"list-list-checks": K("Building checklist", [
		"checklist-bottom-marker",
		"checklist-top-marker",
		"checklist-middle-marker",
		"checklist-top-rail",
		"checklist-middle-rail",
		"checklist-bottom-rail"
	], "clockwise", 860),
	"table-cells-merge-split": K("Updating table cells", [
		"table-action-frame",
		"table-action-top-divider",
		"table-action-bottom-divider",
		"table-action-lower-split",
		"table-action-upper-split"
	], "counterclockwise", 860),
	"chart-bar-decrease-increase": K("Updating trend", [
		"trend-frame",
		"trend-middle-bar",
		"trend-top-bar",
		"trend-bottom-bar"
	], "clockwise", 820),
	"battery-charging-full": K("Finishing charge", [
		"charge-shell-primary",
		"charge-shell-secondary",
		"charge-bolt",
		"charge-terminal",
		"charge-final-cell"
	], "clockwise", 840),
	"square-plus-check": K("Completing action", [
		"square-action-frame",
		"square-action-primary",
		"square-action-secondary"
	], "clockwise", 780),
	"mail-plus-check": K("Confirming mail", [
		"mail-action-frame",
		"mail-action-flap",
		"mail-action-primary",
		"mail-action-secondary"
	], "clockwise", 860),
	"alarm-clock-plus-check": K("Confirming alarm", [
		"alarm-action-face",
		"alarm-action-left-bell",
		"alarm-action-right-bell",
		"alarm-action-left-foot",
		"alarm-action-right-foot",
		"alarm-action-primary",
		"alarm-action-secondary"
	], "clockwise", 900),
	"timer-timer-reset": K("Resetting timer", [
		"timer-reset-cap",
		"timer-reset-hand",
		"timer-reset-face",
		"timer-reset-arrow"
	], "counterclockwise", 860),
	"power-power-off": K("Powering off", [
		"power-off-stem",
		"power-off-lower",
		"power-off-upper",
		"power-off-slash"
	], "counterclockwise", 840),
	"circle-pause-play": K("Updating playback", [
		"circle-media-frame",
		"circle-media-primary",
		"circle-media-secondary"
	], "clockwise", 780)
};
function Ee(e, t) {
	let n;
	try {
		n = Se(e.from, t.loading, e.to);
	} catch (t) {
		let n = t instanceof Error ? t.message : String(t);
		throw Error(`${e.id}: ${n}`);
	}
	return {
		...e,
		...n,
		loadingOpacity: t.loadingOpacity
	};
}
function De(e) {
	let t = Te[e.id];
	if (!t) throw Error(`Missing scene design for ${e.id}.`);
	let n = e.layers.map((n) => {
		let r = t.layers[n.id];
		if (!r) throw Error(`Missing scene design for ${e.id}/${n.id}.`);
		return Ee(n, r);
	});
	if (Object.keys(t.layers).length !== n.length) throw Error(`Scene design for ${e.id} contains unknown layers.`);
	return {
		...e,
		loading: {
			enabled: !0,
			label: t.label,
			rotationDirection: t.rotationDirection,
			rotationDuration: t.rotationDuration
		},
		layers: n
	};
}
var q = [
	{
		id: "menu-x",
		name: "Menu to X",
		fromLabel: "Menu",
		toLabel: "Close",
		fromIcon: "Menu",
		toIcon: "X",
		viewBox: "0 0 24 24"
	},
	{
		id: "play-pause",
		name: "Play to Pause",
		fromLabel: "Play",
		toLabel: "Pause",
		fromIcon: "Play",
		toIcon: "Pause",
		viewBox: "0 0 24 24"
	},
	{
		id: "plus-check",
		name: "Plus to Check",
		fromLabel: "Add",
		toLabel: "Done",
		fromIcon: "Plus",
		toIcon: "Check",
		viewBox: "0 0 24 24"
	},
	{
		id: "arrow-down-up",
		name: "Arrow Down to Up",
		fromLabel: "Download",
		toLabel: "Upload",
		fromIcon: "ArrowDown",
		toIcon: "ArrowUp",
		viewBox: "0 0 24 24"
	},
	{
		id: "search-x",
		name: "Search to X",
		fromLabel: "Search",
		toLabel: "Clear",
		fromIcon: "Search",
		toIcon: "X",
		viewBox: "0 0 24 24"
	},
	{
		id: "eye-eye-off",
		name: "Eye to Eye Off",
		fromLabel: "Visible",
		toLabel: "Hidden",
		fromIcon: "Eye",
		toIcon: "EyeOff",
		viewBox: "0 0 24 24"
	},
	{
		id: "bell-bell-off",
		name: "Bell to Bell Off",
		fromLabel: "Notify",
		toLabel: "Muted",
		fromIcon: "Bell",
		toIcon: "BellOff",
		viewBox: "0 0 24 24"
	},
	{
		id: "volume-volume-x",
		name: "Volume to Mute",
		fromLabel: "Sound",
		toLabel: "Mute",
		fromIcon: "Volume2",
		toIcon: "VolumeX",
		viewBox: "0 0 24 24"
	},
	{
		id: "mic-mic-off",
		name: "Mic to Mic Off",
		fromLabel: "Microphone",
		toLabel: "Muted",
		fromIcon: "Mic",
		toIcon: "MicOff",
		viewBox: "0 0 24 24"
	},
	{
		id: "lock-lock-open",
		name: "Lock to Unlock",
		fromLabel: "Locked",
		toLabel: "Unlocked",
		fromIcon: "Lock",
		toIcon: "LockOpen",
		viewBox: "0 0 24 24"
	},
	{
		id: "heart-heart-off",
		name: "Heart to Heart Off",
		fromLabel: "Favorite",
		toLabel: "Unfavorite",
		fromIcon: "Heart",
		toIcon: "HeartOff",
		viewBox: "0 0 24 24"
	},
	{
		id: "star-star-off",
		name: "Star to Star Off",
		fromLabel: "Starred",
		toLabel: "Unstarred",
		fromIcon: "Star",
		toIcon: "StarOff",
		viewBox: "0 0 24 24"
	},
	{
		id: "bookmark-bookmark-check",
		name: "Bookmark to Saved",
		fromLabel: "Bookmark",
		toLabel: "Saved",
		fromIcon: "Bookmark",
		toIcon: "BookmarkCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "calendar-calendar-check",
		name: "Calendar to Calendar Check",
		fromLabel: "Schedule",
		toLabel: "Confirmed",
		fromIcon: "Calendar",
		toIcon: "CalendarCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "send-check",
		name: "Send to Check",
		fromLabel: "Send",
		toLabel: "Sent",
		fromIcon: "Send",
		toIcon: "Check",
		viewBox: "0 0 24 24"
	},
	{
		id: "filter-list-filter",
		name: "Filter to List Filter",
		fromLabel: "Filter",
		toLabel: "Refine",
		fromIcon: "Filter",
		toIcon: "ListFilter",
		viewBox: "0 0 24 24"
	},
	{
		id: "chevron-down-up",
		name: "Chevron Down to Up",
		fromLabel: "Expand",
		toLabel: "Collapse",
		fromIcon: "ChevronDown",
		toIcon: "ChevronUp",
		viewBox: "0 0 24 24"
	},
	{
		id: "sun-moon",
		name: "Sun to Moon",
		fromLabel: "Light",
		toLabel: "Dark",
		fromIcon: "Sun",
		toIcon: "Moon",
		viewBox: "0 0 24 24"
	},
	{
		id: "folder-folder-open",
		name: "Folder to Folder Open",
		fromLabel: "Folder",
		toLabel: "Open",
		fromIcon: "Folder",
		toIcon: "FolderOpen",
		viewBox: "0 0 24 24"
	},
	{
		id: "file-file-check",
		name: "File to File Check",
		fromLabel: "File",
		toLabel: "Approved",
		fromIcon: "File",
		toIcon: "FileCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "collapse-sidebar-to-expand-inspector",
		name: "Collapse Sidebar to Expand Inspector",
		fromLabel: "Collapse sidebar",
		toLabel: "Expand inspector",
		fromIcon: "PanelLeftClose",
		toIcon: "PanelRightClose",
		viewBox: "0 0 24 24"
	},
	{
		id: "maximize-minimize",
		name: "Enter to Exit Fullscreen",
		fromLabel: "Enter fullscreen",
		toLabel: "Exit fullscreen",
		fromIcon: "Maximize2",
		toIcon: "Minimize2",
		viewBox: "0 0 24 24"
	},
	{
		id: "layout-grid-list",
		name: "Grid to List View",
		fromLabel: "Grid view",
		toLabel: "List view",
		fromIcon: "LayoutGrid",
		toIcon: "List",
		viewBox: "0 0 24 24"
	},
	{
		id: "columns-rows",
		name: "Columns to Rows",
		fromLabel: "Columns",
		toLabel: "Rows",
		fromIcon: "Columns2",
		toIcon: "Rows2",
		viewBox: "0 0 24 24"
	},
	{
		id: "undo-redo",
		name: "Undo to Redo",
		fromLabel: "Undo",
		toLabel: "Redo",
		fromIcon: "Undo2",
		toIcon: "Redo2",
		viewBox: "0 0 24 24"
	},
	{
		id: "rotate-ccw-cw",
		name: "Rotate Left to Right",
		fromLabel: "Rotate left",
		toLabel: "Rotate right",
		fromIcon: "RotateCcw",
		toIcon: "RotateCw",
		viewBox: "0 0 24 24"
	},
	{
		id: "zoom-in-out",
		name: "Zoom In to Zoom Out",
		fromLabel: "Zoom in",
		toLabel: "Zoom out",
		fromIcon: "ZoomIn",
		toIcon: "ZoomOut",
		viewBox: "0 0 24 24"
	},
	{
		id: "pin-pin-off",
		name: "Pin to Unpin",
		fromLabel: "Pin",
		toLabel: "Unpin",
		fromIcon: "Pin",
		toIcon: "PinOff",
		viewBox: "0 0 24 24"
	},
	{
		id: "link-unlink",
		name: "Link to Unlink",
		fromLabel: "Link",
		toLabel: "Unlink",
		fromIcon: "Link",
		toIcon: "Unlink",
		viewBox: "0 0 24 24"
	},
	{
		id: "cloud-download-upload",
		name: "Cloud Download to Upload",
		fromLabel: "Download",
		toLabel: "Upload",
		fromIcon: "CloudDownload",
		toIcon: "CloudUpload",
		viewBox: "0 0 24 24"
	},
	{
		id: "mail-mail-open",
		name: "Mail to Mail Open",
		fromLabel: "Unread",
		toLabel: "Read",
		fromIcon: "Mail",
		toIcon: "MailOpen",
		viewBox: "0 0 24 24"
	},
	{
		id: "user-plus-check",
		name: "Add User to User Added",
		fromLabel: "Add user",
		toLabel: "User added",
		fromIcon: "UserPlus",
		toIcon: "UserCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "toggle-left-right",
		name: "Toggle Off to On",
		fromLabel: "Off",
		toLabel: "On",
		fromIcon: "ToggleLeft",
		toIcon: "ToggleRight",
		viewBox: "0 0 24 24"
	},
	{
		id: "align-left-right",
		name: "Align Left to Right",
		fromLabel: "Align left",
		toLabel: "Align right",
		fromIcon: "AlignLeft",
		toIcon: "AlignRight",
		viewBox: "0 0 24 24"
	},
	{
		id: "image-image-off",
		name: "Image to Image Off",
		fromLabel: "Show image",
		toLabel: "Hide image",
		fromIcon: "Image",
		toIcon: "ImageOff",
		viewBox: "0 0 24 24"
	},
	{
		id: "wifi-wifi-off",
		name: "Wi-Fi to Wi-Fi Off",
		fromLabel: "Connected",
		toLabel: "Disconnected",
		fromIcon: "Wifi",
		toIcon: "WifiOff",
		viewBox: "0 0 24 24"
	},
	{
		id: "circle-play-stop",
		name: "Play to Stop",
		fromLabel: "Play",
		toLabel: "Stop",
		fromIcon: "CirclePlay",
		toIcon: "CircleStop",
		viewBox: "0 0 24 24"
	},
	{
		id: "archive-restore",
		name: "Archive to Restore",
		fromLabel: "Archive",
		toLabel: "Restore",
		fromIcon: "Archive",
		toIcon: "ArchiveRestore",
		viewBox: "0 0 24 24"
	},
	{
		id: "log-in-out",
		name: "Log In to Log Out",
		fromLabel: "Log in",
		toLabel: "Log out",
		fromIcon: "LogIn",
		toIcon: "LogOut",
		viewBox: "0 0 24 24"
	},
	{
		id: "copy-clipboard-check",
		name: "Copy to Copied",
		fromLabel: "Copy",
		toLabel: "Copied",
		fromIcon: "Copy",
		toIcon: "ClipboardCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "message-message-off",
		name: "Message to Messages Off",
		fromLabel: "Messages on",
		toLabel: "Messages off",
		fromIcon: "MessageCircle",
		toIcon: "MessageCircleOff",
		viewBox: "0 0 24 24"
	},
	{
		id: "battery-low-full",
		name: "Low Battery to Full Battery",
		fromLabel: "Low battery",
		toLabel: "Full battery",
		fromIcon: "BatteryLow",
		toIcon: "BatteryFull",
		viewBox: "0 0 24 24"
	},
	{
		id: "signal-low-high",
		name: "Low Signal to High Signal",
		fromLabel: "Low signal",
		toLabel: "High signal",
		fromIcon: "SignalLow",
		toIcon: "SignalHigh",
		viewBox: "0 0 24 24"
	},
	{
		id: "volume-low-high",
		name: "Low Volume to High Volume",
		fromLabel: "Low volume",
		toLabel: "High volume",
		fromIcon: "Volume1",
		toIcon: "Volume2",
		viewBox: "0 0 24 24"
	},
	{
		id: "shield-shield-check",
		name: "Shield to Verified",
		fromLabel: "Unverified",
		toLabel: "Verified",
		fromIcon: "Shield",
		toIcon: "ShieldCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "camera-camera-off",
		name: "Camera On to Off",
		fromLabel: "Camera on",
		toLabel: "Camera off",
		fromIcon: "Camera",
		toIcon: "CameraOff",
		viewBox: "0 0 24 24"
	},
	{
		id: "video-video-off",
		name: "Video On to Off",
		fromLabel: "Video on",
		toLabel: "Video off",
		fromIcon: "Video",
		toIcon: "VideoOff",
		viewBox: "0 0 24 24"
	},
	{
		id: "bluetooth-bluetooth-off",
		name: "Bluetooth On to Off",
		fromLabel: "Bluetooth on",
		toLabel: "Bluetooth off",
		fromIcon: "Bluetooth",
		toIcon: "BluetoothOff",
		viewBox: "0 0 24 24"
	},
	{
		id: "navigation-navigation-off",
		name: "Navigation On to Off",
		fromLabel: "Navigation on",
		toLabel: "Navigation off",
		fromIcon: "Navigation",
		toIcon: "NavigationOff",
		viewBox: "0 0 24 24"
	},
	{
		id: "map-pin-map-pin-check",
		name: "Location to Confirmed Location",
		fromLabel: "Location",
		toLabel: "Confirmed",
		fromIcon: "MapPin",
		toIcon: "MapPinCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "package-package-open",
		name: "Package to Open Package",
		fromLabel: "Package",
		toLabel: "Opened",
		fromIcon: "Package",
		toIcon: "PackageOpen",
		viewBox: "0 0 24 24"
	},
	{
		id: "door-closed-open",
		name: "Closed Door to Open Door",
		fromLabel: "Closed",
		toLabel: "Open",
		fromIcon: "DoorClosed",
		toIcon: "DoorOpen",
		viewBox: "0 0 24 24"
	},
	{
		id: "panel-bottom-close-open",
		name: "Collapse to Expand Bottom Panel",
		fromLabel: "Collapse panel",
		toLabel: "Expand panel",
		fromIcon: "PanelBottomClose",
		toIcon: "PanelBottomOpen",
		viewBox: "0 0 24 24"
	},
	{
		id: "circle-plus-check",
		name: "Add to Complete",
		fromLabel: "Add",
		toLabel: "Complete",
		fromIcon: "CirclePlus",
		toIcon: "CircleCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "circle-alert-check",
		name: "Alert to Resolved",
		fromLabel: "Alert",
		toLabel: "Resolved",
		fromIcon: "CircleAlert",
		toIcon: "CircleCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "clipboard-clipboard-check",
		name: "Clipboard to Checked",
		fromLabel: "Clipboard",
		toLabel: "Checked",
		fromIcon: "Clipboard",
		toIcon: "ClipboardCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "calendar-plus-check",
		name: "Add Event to Confirmed Event",
		fromLabel: "Add event",
		toLabel: "Confirmed",
		fromIcon: "CalendarPlus",
		toIcon: "CalendarCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "user-plus-minus",
		name: "Add User to Remove User",
		fromLabel: "Add user",
		toLabel: "Remove user",
		fromIcon: "UserPlus",
		toIcon: "UserMinus",
		viewBox: "0 0 24 24"
	},
	{
		id: "bookmark-plus-check",
		name: "Add Bookmark to Saved",
		fromLabel: "Add bookmark",
		toLabel: "Saved",
		fromIcon: "BookmarkPlus",
		toIcon: "BookmarkCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "folder-plus-check",
		name: "Create Folder to Ready Folder",
		fromLabel: "Create folder",
		toLabel: "Folder ready",
		fromIcon: "FolderPlus",
		toIcon: "FolderCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "file-plus-check",
		name: "Create File to Ready File",
		fromLabel: "Create file",
		toLabel: "File ready",
		fromIcon: "FilePlus",
		toIcon: "FileCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "cloud-cloud-off",
		name: "Cloud Online to Offline",
		fromLabel: "Cloud online",
		toLabel: "Cloud offline",
		fromIcon: "Cloud",
		toIcon: "CloudOff",
		viewBox: "0 0 24 24"
	},
	{
		id: "monitor-play-stop",
		name: "Start to Stop Screen Playback",
		fromLabel: "Start playback",
		toLabel: "Stop playback",
		fromIcon: "MonitorPlay",
		toIcon: "MonitorStop",
		viewBox: "0 0 24 24"
	},
	{
		id: "mouse-pointer-click",
		name: "Pointer to Click",
		fromLabel: "Point",
		toLabel: "Click",
		fromIcon: "MousePointer",
		toIcon: "MousePointerClick",
		viewBox: "0 0 24 24"
	},
	{
		id: "scan-scan-line",
		name: "Ready to Scanning",
		fromLabel: "Scanner ready",
		toLabel: "Scanning",
		fromIcon: "Scan",
		toIcon: "ScanLine",
		viewBox: "0 0 24 24"
	},
	{
		id: "printer-printer-check",
		name: "Print to Printed",
		fromLabel: "Printing",
		toLabel: "Printed",
		fromIcon: "Printer",
		toIcon: "PrinterCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "laptop-laptop-check",
		name: "Device to Verified Device",
		fromLabel: "Device",
		toLabel: "Verified device",
		fromIcon: "LaptopMinimal",
		toIcon: "LaptopMinimalCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "receipt-receipt-text",
		name: "Payment to Receipt Details",
		fromLabel: "Payment",
		toLabel: "Receipt details",
		fromIcon: "Receipt",
		toIcon: "ReceiptText",
		viewBox: "0 0 24 24"
	},
	{
		id: "list-list-checks",
		name: "List to Checklist",
		fromLabel: "List",
		toLabel: "Checklist",
		fromIcon: "List",
		toIcon: "ListChecks",
		viewBox: "0 0 24 24"
	},
	{
		id: "table-cells-merge-split",
		name: "Merge to Split Table Cells",
		fromLabel: "Merge cells",
		toLabel: "Split cells",
		fromIcon: "TableCellsMerge",
		toIcon: "TableCellsSplit",
		viewBox: "0 0 24 24"
	},
	{
		id: "chart-bar-decrease-increase",
		name: "Decreasing to Increasing Trend",
		fromLabel: "Decreasing",
		toLabel: "Increasing",
		fromIcon: "ChartBarDecreasing",
		toIcon: "ChartBarIncreasing",
		viewBox: "0 0 24 24"
	},
	{
		id: "battery-charging-full",
		name: "Charging Battery to Full Battery",
		fromLabel: "Charging",
		toLabel: "Fully charged",
		fromIcon: "BatteryCharging",
		toIcon: "BatteryFull",
		viewBox: "0 0 24 24"
	},
	{
		id: "square-plus-check",
		name: "Add to Complete in Square",
		fromLabel: "Add",
		toLabel: "Complete",
		fromIcon: "SquarePlus",
		toIcon: "SquareCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "mail-plus-check",
		name: "Add Mail to Confirmed Mail",
		fromLabel: "Add mail",
		toLabel: "Confirmed",
		fromIcon: "MailPlus",
		toIcon: "MailCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "alarm-clock-plus-check",
		name: "Add Alarm to Confirmed Alarm",
		fromLabel: "Add alarm",
		toLabel: "Alarm confirmed",
		fromIcon: "AlarmClockPlus",
		toIcon: "AlarmClockCheck",
		viewBox: "0 0 24 24"
	},
	{
		id: "timer-timer-reset",
		name: "Timer to Reset Timer",
		fromLabel: "Timer",
		toLabel: "Reset timer",
		fromIcon: "Timer",
		toIcon: "TimerReset",
		viewBox: "0 0 24 24"
	},
	{
		id: "power-power-off",
		name: "Power On to Off",
		fromLabel: "Power on",
		toLabel: "Power off",
		fromIcon: "Power",
		toIcon: "PowerOff",
		viewBox: "0 0 24 24"
	},
	{
		id: "circle-pause-play",
		name: "Pause to Play",
		fromLabel: "Pause",
		toLabel: "Play",
		fromIcon: "CirclePause",
		toIcon: "CirclePlay",
		viewBox: "0 0 24 24"
	}
].map((e) => De(me({
	...e,
	layers: []
}))), Oe = {
	"sidebar-inspector": "collapse-sidebar-to-expand-inspector",
	"collapse-to-expand-sidebar": "collapse-sidebar-to-expand-inspector",
	"collapse-to-expand-inspector": "collapse-sidebar-to-expand-inspector",
	"panel-left-close-open": "collapse-sidebar-to-expand-inspector",
	"panel-bottom-close-open": "collapse-sidebar-to-expand-inspector"
};
function ke(e) {
	return JSON.parse(JSON.stringify(e));
}
function Ae(e) {
	let t = Oe[e] ?? e;
	return q.find((e) => e.id === t) ?? q[0];
}
//#endregion
//#region src/morph/path.ts
var je = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;
function Me(e) {
	return e.replace(/[\s,]+/g, "").trim();
}
function J(e) {
	return e.replace(je, "{}");
}
function Y(e) {
	return e.match(je)?.map(Number) ?? [];
}
function Ne(e, t) {
	if (typeof e != "string" || typeof t != "string") return {
		ok: !1,
		reason: "Both path fields must be strings."
	};
	if (!e.trim() || !t.trim()) return {
		ok: !1,
		reason: "Both path fields are required."
	};
	let n = Y(e), r = Y(t), i = Me(J(e)), a = Me(J(t));
	return i === a ? n.length === r.length ? {
		ok: !0,
		template: i,
		numberCount: n.length
	} : {
		ok: !1,
		reason: "Number counts do not match.",
		fromTemplate: i,
		toTemplate: a,
		fromCount: n.length,
		toCount: r.length
	} : {
		ok: !1,
		reason: "Command templates do not match.",
		fromTemplate: i,
		toTemplate: a,
		fromCount: n.length,
		toCount: r.length
	};
}
function Pe(e) {
	let t = Number(e.toFixed(3));
	return Object.is(t, -0) ? "0" : t.toString();
}
function Fe(e, t) {
	let n = Ne(e, t);
	if (!n.ok) throw Error(n.reason);
	let r = Y(e), i = Y(t), a = J(e), o = 0;
	return (e) => (o = 0, a.replace(/\{\}/g, () => {
		let t = r[o] + (i[o] - r[o]) * e;
		return o += 1, Pe(t);
	}));
}
function Ie(e, t) {
	try {
		return Fe(e.from, e.to)(t);
	} catch {
		return t < .5 ? e.from : e.to;
	}
}
function Le(e, t) {
	return e.fromOpacity + (e.toOpacity - e.fromOpacity) * t;
}
function X(e, t = 0, n = 1) {
	return Math.min(n, Math.max(t, e));
}
//#endregion
//#region src/runtime/morph.ts
function Z(e) {
	return !!(e.loading && e.layers.length > 0 && e.layers.every((e) => e.loading && e.loadingOpacity !== void 0));
}
function Re(e, t) {
	return t || (typeof e == "string" ? Ae(e) : e || q[0]);
}
function ze(e, t, n = !1) {
	let r = t ?? (n ? "to" : "from");
	return r === "loading" && !Z(e) ? "from" : r;
}
function Be(e, t) {
	if (!Z(e)) return +(t === "to");
	switch (t) {
		case "loading": return 1;
		case "to": return 2;
		default: return 0;
	}
}
function Ve(e, t) {
	return X(t) * (Z(e) ? 2 : 1);
}
function He(e, t) {
	let n = {
		...e,
		from: e.from,
		fromOpacity: e.fromOpacity,
		to: e.to,
		toOpacity: e.toOpacity
	};
	return {
		d: Ie(n, X(t)),
		opacity: Le(n, X(t))
	};
}
function Ue(e, t) {
	if (!e.loading || e.loadingOpacity === void 0) return He(e, t / 2);
	let n = t <= 1, r = X(n ? t : t - 1), i = n ? {
		...e,
		from: e.from,
		fromOpacity: e.fromOpacity,
		to: e.loading,
		toOpacity: e.loadingOpacity
	} : {
		...e,
		from: e.loading,
		fromOpacity: e.loadingOpacity,
		to: e.to,
		toOpacity: e.toOpacity
	};
	return {
		d: Ie(i, r),
		opacity: Le(i, r)
	};
}
function We(e, t) {
	let n = Z(e);
	return e.layers.map((e) => {
		let r = n ? Ue(e, X(t, 0, 2)) : He(e, X(t));
		return {
			id: e.id,
			mode: e.mode,
			...r
		};
	});
}
function Ge(e) {
	let t = e.trim().split(/[\s,]+/).map(Number);
	if (t.length !== 4 || t.some((e) => !Number.isFinite(e))) return {
		x: 12,
		y: 12
	};
	let [n, r, i, a] = t;
	return {
		x: n + i / 2,
		y: r + a / 2
	};
}
function Q(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function $(e) {
	let t = Number(e.toFixed(3));
	return Object.is(t, -0) ? "0" : t.toString();
}
function Ke(e, t, { color: n = "currentColor", loading: r = !1, size: i = 24, strokeWidth: a = 2, title: o } = {}) {
	let s = We(e, t), c = Ge(e.viewBox), l = r && Z(e) && e.loading, u = o ? `<title>${Q(o)}</title>` : "", d = l ? `<animateTransform attributeName="transform" type="rotate" from="0 ${$(c.x)} ${$(c.y)}" to="${e.loading?.rotationDirection === "counterclockwise" ? "-360" : "360"} ${$(c.x)} ${$(c.y)}" dur="${e.loading?.rotationDuration ?? 900}ms" repeatCount="indefinite" />` : "", f = s.map((t) => t.mode === "fill" && !e.strokeLocked ? `<path d="${Q(t.d)}" opacity="${$(t.opacity)}" fill="currentColor" />` : `<path d="${Q(t.d)}" opacity="${$(t.opacity)}" fill="none" stroke="currentColor" stroke-width="${$(a)}" stroke-linecap="round" stroke-linejoin="round" />`).join("");
	return `<svg aria-hidden="${o ? "false" : "true"}" viewBox="${Q(e.viewBox)}" width="${$(i)}" height="${$(i)}" style="color:${Q(n)};display:block;overflow:visible">${u}<g>${d}${f}</g></svg>`;
}
//#endregion
export { Ke as a, Be as c, q as d, Ve as i, ke as l, Ge as n, Re as o, Z as r, ze as s, We as t, Ae as u };

//# sourceMappingURL=morph-DqGr4NxU.js.map