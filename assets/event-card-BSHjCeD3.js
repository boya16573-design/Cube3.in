import { A as Link, f as Users, p as CalendarDays, t as Button, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { t as BadgeCheck } from "./badge-check-B7Ly22Tv.js";
import { n as MatchBadge } from "./campaign-card-4B6i36Pt.js";
import { t as MapPin } from "./map-pin-BGNVwcBY.js";
import { r as formatBudgetRange } from "./money-B2xGNqWK.js";
import { o as formatCount } from "./cube3-xqG2XCU7.js";
import { t as Badge } from "./badge-Xcdv_DZw.js";
import { n as flagFor } from "./countries-BNqYBK9b.js";
//#region src/components/event-card.tsx
var import_jsx_runtime = require_jsx_runtime();
function formatEventDate(d) {
	const t = Date.parse(`${d}T12:00:00Z`);
	if (!Number.isFinite(t)) return d;
	return new Date(t).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "UTC"
	});
}
var MODE_LABEL = {
	offline: "In person",
	online: "Online",
	hybrid: "Hybrid"
};
function VerificationBadges({ collegeVerified, eventVerified }) {
	if (!collegeVerified && !eventVerified) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		"data-macaly-loc": "src/components/event-card.tsx:38:49",
		"data-macaly-name": "Badge",
		variant: "outline",
		className: "text-muted-foreground",
		children: "Unverified"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-macaly-loc": "src/components/event-card.tsx:40:4",
		"data-macaly-name": "span",
		className: "flex flex-wrap gap-1",
		children: [collegeVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			"data-macaly-loc": "src/components/event-card.tsx:41:26",
			"data-macaly-name": "Badge",
			className: "bg-success text-success-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
				"data-macaly-loc": "src/components/event-card.tsx:41:80",
				"data-macaly-name": "BadgeCheck",
				className: "size-3"
			}), "College verified"]
		}), eventVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			"data-macaly-loc": "src/components/event-card.tsx:42:24",
			"data-macaly-name": "Badge",
			className: "bg-success text-success-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
				"data-macaly-loc": "src/components/event-card.tsx:42:78",
				"data-macaly-name": "BadgeCheck",
				className: "size-3"
			}), "Event verified"]
		})]
	});
}
function EventCard({ e, score }) {
	const place = [e.city, e.country].filter(Boolean).join(", ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		"data-macaly-loc": "src/components/event-card.tsx:50:4",
		"data-macaly-name": "article",
		className: "flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm",
		"data-testid": "event-card",
		children: [e.bannerUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			"data-macaly-loc": "src/components/event-card.tsx:52:8",
			"data-macaly-name": "img",
			src: e.bannerUrl,
			alt: "",
			loading: "lazy",
			className: "aspect-[3/1] w-full object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-macaly-loc": "src/components/event-card.tsx:54:8",
			"data-macaly-name": "div",
			className: "grid aspect-[3/1] w-full place-items-center bg-gradient-to-br from-brand/20 to-brand-2/20 text-sm font-semibold text-muted-foreground",
			children: e.category
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/components/event-card.tsx:56:6",
			"data-macaly-name": "div",
			className: "flex flex-1 flex-col p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/event-card.tsx:57:8",
					"data-macaly-name": "div",
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/components/event-card.tsx:58:10",
						"data-macaly-name": "div",
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							"data-macaly-loc": "src/components/event-card.tsx:59:12",
							"data-macaly-name": "h3",
							className: "line-clamp-2 font-semibold leading-snug",
							children: e.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-macaly-loc": "src/components/event-card.tsx:60:12",
							"data-macaly-name": "p",
							className: "truncate text-xs text-muted-foreground",
							children: e.institution ?? e.organizer.organizationName
						})]
					}), score !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchBadge, {
						"data-macaly-loc": "src/components/event-card.tsx:62:34",
						"data-macaly-name": "MatchBadge",
						score
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/event-card.tsx:64:8",
					"data-macaly-name": "div",
					className: "mt-2 grid gap-1 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-macaly-loc": "src/components/event-card.tsx:65:10",
							"data-macaly-name": "span",
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
									"data-macaly-loc": "src/components/event-card.tsx:65:59",
									"data-macaly-name": "CalendarDays",
									className: "size-3.5"
								}),
								formatEventDate(e.eventDate),
								" · ",
								MODE_LABEL[e.mode] ?? e.mode
							]
						}),
						place && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-macaly-loc": "src/components/event-card.tsx:66:20",
							"data-macaly-name": "span",
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									"data-macaly-loc": "src/components/event-card.tsx:66:69",
									"data-macaly-name": "MapPin",
									className: "size-3.5"
								}),
								flagFor(e.country),
								" ",
								place
							]
						}),
						e.expectedAttendees !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							"data-macaly-loc": "src/components/event-card.tsx:67:48",
							"data-macaly-name": "span",
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									"data-macaly-loc": "src/components/event-card.tsx:67:97",
									"data-macaly-name": "Users",
									className: "size-3.5"
								}),
								formatCount(e.expectedAttendees),
								"+ expected (organizer estimate)"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/components/event-card.tsx:69:8",
					"data-macaly-name": "p",
					className: "mt-2 font-bold",
					children: formatBudgetRange(e.sponsorshipMin, e.sponsorshipMax, e.currency)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/event-card.tsx:70:8",
					"data-macaly-name": "div",
					className: "mt-2 flex flex-wrap gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						"data-macaly-loc": "src/components/event-card.tsx:71:10",
						"data-macaly-name": "Badge",
						variant: "secondary",
						children: e.category
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationBadges, {
						"data-macaly-loc": "src/components/event-card.tsx:72:10",
						"data-macaly-name": "VerificationBadges",
						collegeVerified: e.organizer.collegeVerified,
						eventVerified: e.verified
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/components/event-card.tsx:74:8",
					"data-macaly-name": "Button",
					asChild: true,
					className: "mt-4 bg-brand text-brand-foreground hover:bg-brand/90",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/components/event-card.tsx:75:10",
						"data-macaly-name": "Link",
						to: "/events/$slug",
						params: { slug: e.slug },
						children: "View event"
					})
				})
			]
		})]
	});
}
//#endregion
export { formatEventDate as i, MODE_LABEL as n, VerificationBadges as r, EventCard as t };
