import { D as require_jsx_runtime, n as createLucideIcon, v as Link } from "./api-D74LnTM3.js";
import { a as Button, o as cn } from "./app-shell-CtDeXJqm.js";
import { t as BadgeCheck } from "./badge-check-B3dBneY_.js";
import { t as Check } from "./check-B3VULEwV.js";
import { t as MapPin } from "./map-pin-SfivTVGZ.js";
import { t as X } from "./x-BzRkyuW7.js";
import { a as formatBudget, i as daysLeft, l as platformLabel, o as formatCount } from "./cube3-DuAq7Ab3.js";
import { t as Badge } from "./badge-Ck0JGcps.js";
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Calendar = createLucideIcon("calendar", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}]
]);
//#endregion
//#region src/components/campaign-card.tsx
var import_jsx_runtime = require_jsx_runtime();
function MatchBadge({ score }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-macaly-loc": "src/components/campaign-card.tsx:33:4",
		"data-macaly-name": "span",
		className: cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", score >= 80 ? "bg-success text-success-foreground" : score >= 60 ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"),
		children: [score, "% match"]
	});
}
function MatchReasons({ match, compact }) {
	const shown = compact ? match.factors.filter((f) => f.met && f.weight > 0).slice(0, 4) : match.factors;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-macaly-loc": "src/components/campaign-card.tsx:47:4",
		"data-macaly-name": "ul",
		className: cn("grid gap-1.5 text-sm", compact && "text-xs"),
		children: shown.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			"data-macaly-loc": "src/components/campaign-card.tsx:49:8",
			"data-macaly-name": "li",
			className: "flex items-start gap-2",
			children: [f.met ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				"data-macaly-loc": "src/components/campaign-card.tsx:51:12",
				"data-macaly-name": "Check",
				className: "mt-0.5 size-4 shrink-0 text-success"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
				"data-macaly-loc": "src/components/campaign-card.tsx:53:12",
				"data-macaly-name": "X",
				className: "mt-0.5 size-4 shrink-0 text-muted-foreground"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				"data-macaly-loc": "src/components/campaign-card.tsx:55:10",
				"data-macaly-name": "span",
				className: cn(!f.met && "text-muted-foreground"),
				children: [f.label, f.detail && !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-macaly-loc": "src/components/campaign-card.tsx:57:37",
					"data-macaly-name": "span",
					className: "text-muted-foreground",
					children: [" · ", f.detail]
				})]
			})]
		}, i))
	});
}
function CampaignCard({ c, match, applied }) {
	const left = daysLeft(c.applicationDeadline);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		"data-macaly-loc": "src/components/campaign-card.tsx:76:4",
		"data-macaly-name": "article",
		className: "flex flex-col rounded-xl border bg-card p-4 shadow-sm transition hover:shadow-md",
		"data-testid": "campaign-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/campaign-card.tsx:77:6",
				"data-macaly-name": "div",
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/campaign-card.tsx:78:8",
					"data-macaly-name": "div",
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/components/campaign-card.tsx:79:10",
						"data-macaly-name": "p",
						className: "flex items-center gap-1 text-xs font-medium text-muted-foreground",
						children: [c.brandName, c.brandVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
							"data-macaly-loc": "src/components/campaign-card.tsx:81:32",
							"data-macaly-name": "BadgeCheck",
							className: "size-3.5 text-brand",
							"aria-label": "Verified brand"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						"data-macaly-loc": "src/components/campaign-card.tsx:83:10",
						"data-macaly-name": "h3",
						className: "mt-0.5 line-clamp-2 font-semibold leading-snug",
						children: c.title
					})]
				}), match && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchBadge, {
					"data-macaly-loc": "src/components/campaign-card.tsx:85:18",
					"data-macaly-name": "MatchBadge",
					score: match.score
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/campaign-card.tsx:88:6",
				"data-macaly-name": "div",
				className: "mt-3 flex flex-wrap gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						"data-macaly-loc": "src/components/campaign-card.tsx:89:8",
						"data-macaly-name": "Badge",
						variant: "secondary",
						children: c.category
					}),
					c.platforms.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						"data-macaly-loc": "src/components/campaign-card.tsx:91:10",
						"data-macaly-name": "Badge",
						variant: "outline",
						children: platformLabel(p)
					}, p)),
					c.minFollowers ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						"data-macaly-loc": "src/components/campaign-card.tsx:93:26",
						"data-macaly-name": "Badge",
						variant: "outline",
						children: [formatCount(c.minFollowers), "+ audience"]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/components/campaign-card.tsx:96:6",
				"data-macaly-name": "p",
				className: "mt-3 text-lg font-bold",
				children: formatBudget(c.budgetMinInr, c.budgetMaxInr)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/components/campaign-card.tsx:97:6",
				"data-macaly-name": "p",
				className: "line-clamp-1 text-sm text-muted-foreground",
				children: c.deliverables.join(" · ")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/campaign-card.tsx:99:6",
				"data-macaly-name": "div",
				className: "mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground",
				children: [c.targetLocation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-macaly-loc": "src/components/campaign-card.tsx:101:10",
					"data-macaly-name": "span",
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						"data-macaly-loc": "src/components/campaign-card.tsx:101:59",
						"data-macaly-name": "MapPin",
						className: "size-3"
					}), c.targetLocation]
				}), left && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-macaly-loc": "src/components/campaign-card.tsx:104:10",
					"data-macaly-name": "span",
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
						"data-macaly-loc": "src/components/campaign-card.tsx:104:59",
						"data-macaly-name": "Calendar",
						className: "size-3"
					}), left]
				})]
			}),
			match && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/campaign-card.tsx:109:8",
				"data-macaly-name": "div",
				className: "mt-3 rounded-lg bg-brand-soft p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/components/campaign-card.tsx:110:10",
					"data-macaly-name": "p",
					className: "mb-1.5 text-xs font-semibold",
					children: "Why you match"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchReasons, {
					"data-macaly-loc": "src/components/campaign-card.tsx:111:10",
					"data-macaly-name": "MatchReasons",
					match,
					compact: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/campaign-card.tsx:115:6",
				"data-macaly-name": "div",
				className: "mt-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/components/campaign-card.tsx:116:8",
					"data-macaly-name": "Button",
					asChild: true,
					variant: "outline",
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/components/campaign-card.tsx:117:10",
						"data-macaly-name": "Link",
						to: "/campaigns/$campaignId",
						params: { campaignId: c._id },
						children: "View campaign"
					})
				}), applied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/components/campaign-card.tsx:120:10",
					"data-macaly-name": "Button",
					disabled: true,
					className: "flex-1",
					children: "Applied"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/components/campaign-card.tsx:122:10",
					"data-macaly-name": "Button",
					asChild: true,
					className: "flex-1 bg-brand text-brand-foreground hover:bg-brand/90",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/components/campaign-card.tsx:123:12",
						"data-macaly-name": "Link",
						to: "/campaigns/$campaignId",
						params: { campaignId: c._id },
						hash: "apply",
						children: "Apply"
					})
				})]
			})
		]
	});
}
//#endregion
export { Calendar as i, MatchBadge as n, MatchReasons as r, CampaignCard as t };
