import { A as Link, S as useQuery, n as cn, p as CalendarDays, s as api, t as Button, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { c as Handshake, r as PageLoading } from "./app-shell-GoO9XvM6.js";
import { t as BadgeCheck } from "./badge-check-B7Ly22Tv.js";
import { n as OrganizerVerification } from "./organizer-verification-gptsUyfM.js";
import { t as Plus } from "./plus-BzcJQXl5.js";
import { i as formatMoney } from "./money-B2xGNqWK.js";
import { i as formatEventDate, t as EventCard } from "./event-card-BSHjCeD3.js";
//#region src/components/event-dashboards.tsx
var import_jsx_runtime = require_jsx_runtime();
var DEAL_TEXT = {
	proposed: "New",
	negotiating: "Negotiating",
	changes_requested: "Changes requested",
	accepted: "Accepted",
	agreement: "Agreement",
	active: "Active",
	completed: "Completed",
	rejected: "Declined",
	cancelled: "Ended"
};
function DealPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-macaly-loc": "src/components/event-dashboards.tsx:22:9",
		"data-macaly-name": "span",
		className: cn("rounded-full px-2 py-0.5 text-xs font-medium", status === "completed" || status === "agreement" || status === "accepted" || status === "active" ? "bg-success text-success-foreground" : status === "rejected" || status === "cancelled" ? "bg-muted text-muted-foreground" : "bg-warning text-warning-foreground"),
		children: DEAL_TEXT[status] ?? status
	});
}
function timeAgo(ms) {
	const m = Math.round((Date.now() - ms) / 6e4);
	if (m < 60) return `${Math.max(m, 1)}m`;
	const h = Math.round(m / 60);
	return h < 24 ? `${h}h` : `${Math.round(h / 24)}d`;
}
/** Event sponsorship conversations (used in Inbox and dashboards). */
function EventDealsList({ limit, title = "Event sponsorships" }) {
	const deals = useQuery(api.eventDeals.listMine);
	if (!deals || deals.length === 0) return null;
	const rows = limit ? deals.slice(0, limit) : deals;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/components/event-dashboards.tsx:38:4",
		"data-macaly-name": "section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			"data-macaly-loc": "src/components/event-dashboards.tsx:39:6",
			"data-macaly-name": "h2",
			className: "text-xl font-bold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			"data-macaly-loc": "src/components/event-dashboards.tsx:40:6",
			"data-macaly-name": "ul",
			className: "mt-3 divide-y rounded-xl border",
			children: rows.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				"data-macaly-loc": "src/components/event-dashboards.tsx:42:10",
				"data-macaly-name": "li",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					"data-macaly-loc": "src/components/event-dashboards.tsx:43:12",
					"data-macaly-name": "Link",
					to: "/event-deals/$dealId",
					params: { dealId: d._id },
					className: "flex items-start gap-3 p-4 hover:bg-muted/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:44:14",
						"data-macaly-name": "div",
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-macaly-loc": "src/components/event-dashboards.tsx:45:16",
								"data-macaly-name": "div",
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-macaly-loc": "src/components/event-dashboards.tsx:46:18",
									"data-macaly-name": "p",
									className: cn("truncate", d.unread > 0 ? "font-bold" : "font-medium"),
									children: d.counterpartName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-macaly-loc": "src/components/event-dashboards.tsx:47:18",
									"data-macaly-name": "span",
									className: "shrink-0 text-xs text-muted-foreground",
									children: timeAgo(d.lastActivityAt)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-macaly-loc": "src/components/event-dashboards.tsx:49:16",
								"data-macaly-name": "p",
								className: "truncate text-xs text-muted-foreground",
								children: [
									d.eventName,
									" · ",
									formatEventDate(d.eventDate),
									d.amount !== void 0 ? ` · ${formatMoney(d.amount, d.currency)}` : ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-macaly-loc": "src/components/event-dashboards.tsx:50:16",
								"data-macaly-name": "div",
								className: "mt-1 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DealPill, {
									"data-macaly-loc": "src/components/event-dashboards.tsx:51:18",
									"data-macaly-name": "DealPill",
									status: d.status
								}), d.deliverablesTotal > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-macaly-loc": "src/components/event-dashboards.tsx:52:46",
									"data-macaly-name": "span",
									className: "text-xs text-muted-foreground",
									children: [
										d.deliverablesApproved,
										"/",
										d.deliverablesTotal,
										" deliverables"
									]
								})]
							})
						]
					}), d.unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:55:31",
						"data-macaly-name": "span",
						className: "mt-1 grid min-w-5 place-items-center rounded-full bg-brand px-1.5 text-xs font-bold text-brand-foreground",
						children: d.unread
					})]
				})
			}, d._id))
		})]
	});
}
function OrganizerDashboard() {
	const events = useQuery(api.events.listMine);
	const me = useQuery(api.profiles.getMyProfileFullV2);
	if (events === void 0 || me === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/components/event-dashboards.tsx:67:55",
		"data-macaly-name": "PageLoading"
	});
	const active = events.filter((e) => e.status === "published");
	const drafts = events.filter((e) => e.status === "draft");
	const done = events.filter((e) => e.status === "completed" || e.status === "cancelled");
	const totals = events.reduce((s, e) => ({
		apps: s.apps + e.applications,
		pending: s.pending + e.pending,
		accepted: s.accepted + e.accepted,
		dl: s.dl + e.deliverablesPending
	}), {
		apps: 0,
		pending: 0,
		accepted: 0,
		dl: 0
	});
	const committedByCur = /* @__PURE__ */ new Map();
	for (const e of events) if (e.committed) committedByCur.set(e.currency, (committedByCur.get(e.currency) ?? 0) + e.committed);
	const committed = [...committedByCur.entries()].map(([c, a]) => formatMoney(a, c)).join(" + ") || formatMoney(0, events[0]?.currency ?? "INR");
	const EventRow = ({ e }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		"data-macaly-loc": "src/components/event-dashboards.tsx:81:4",
		"data-macaly-name": "li",
		className: "grid gap-2 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/event-dashboards.tsx:82:6",
				"data-macaly-name": "div",
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/event-dashboards.tsx:83:8",
					"data-macaly-name": "div",
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						"data-macaly-loc": "src/components/event-dashboards.tsx:84:10",
						"data-macaly-name": "Link",
						to: "/events/$slug",
						params: { slug: e.slug },
						className: "flex items-center gap-1 truncate font-medium hover:underline",
						children: [e.name, e.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
							"data-macaly-loc": "src/components/event-dashboards.tsx:85:35",
							"data-macaly-name": "BadgeCheck",
							className: "size-4 shrink-0 text-success",
							"aria-label": "Event verified"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:87:10",
						"data-macaly-name": "p",
						className: "text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
							"data-macaly-loc": "src/components/event-dashboards.tsx:87:55",
							"data-macaly-name": "CalendarDays",
							className: "mr-1 inline size-3"
						}), formatEventDate(e.eventDate)]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-macaly-loc": "src/components/event-dashboards.tsx:89:8",
					"data-macaly-name": "p",
					className: "shrink-0 text-right text-sm font-bold",
					children: [formatMoney(e.committed, e.currency), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:89:99",
						"data-macaly-name": "span",
						className: "block text-[11px] font-normal text-muted-foreground",
						children: "committed"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/components/event-dashboards.tsx:91:6",
				"data-macaly-name": "p",
				className: "text-xs text-muted-foreground",
				children: [
					e.applications,
					" sponsor conversation",
					e.applications === 1 ? "" : "s",
					" · ",
					e.pending,
					" pending · ",
					e.accepted,
					" accepted · ",
					e.deliverablesPending,
					" deliverable",
					e.deliverablesPending === 1 ? "" : "s",
					" pending"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/event-dashboards.tsx:94:6",
				"data-macaly-name": "div",
				className: "flex flex-wrap gap-2",
				children: [e.status === "published" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/components/event-dashboards.tsx:95:37",
					"data-macaly-name": "Button",
					asChild: true,
					size: "sm",
					className: "bg-brand text-brand-foreground hover:bg-brand/90",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						"data-macaly-loc": "src/components/event-dashboards.tsx:95:124",
						"data-macaly-name": "Link",
						to: "/event-sponsors",
						search: { event: e._id },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, {
							"data-macaly-loc": "src/components/event-dashboards.tsx:95:177",
							"data-macaly-name": "Handshake",
							className: "size-3.5"
						}), "Find sponsors"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/components/event-dashboards.tsx:96:8",
					"data-macaly-name": "Button",
					asChild: true,
					size: "sm",
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/components/event-dashboards.tsx:96:52",
						"data-macaly-name": "Link",
						to: "/events/edit/$eventId",
						params: { eventId: e._id },
						children: e.status === "draft" ? "Finish & publish" : "Edit"
					})
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/components/event-dashboards.tsx:102:4",
		"data-macaly-name": "div",
		className: "mx-auto grid max-w-5xl gap-8 px-4 py-8",
		"data-state": "ready",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/event-dashboards.tsx:103:6",
				"data-macaly-name": "div",
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/event-dashboards.tsx:104:8",
					"data-macaly-name": "div",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:105:10",
						"data-macaly-name": "h1",
						className: "text-2xl font-bold",
						children: "My events"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:106:10",
						"data-macaly-name": "p",
						className: "text-sm text-muted-foreground",
						children: [me?.organizer?.organizationName, me?.organizer?.institution ? ` · ${me.organizer.institution}` : ""]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/components/event-dashboards.tsx:108:8",
					"data-macaly-name": "Button",
					asChild: true,
					className: "bg-brand text-brand-foreground hover:bg-brand/90",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						"data-macaly-loc": "src/components/event-dashboards.tsx:108:85",
						"data-macaly-name": "Link",
						to: "/events/new",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"data-macaly-loc": "src/components/event-dashboards.tsx:108:108",
							"data-macaly-name": "Plus",
							className: "size-4"
						}), "Create event"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/components/event-dashboards.tsx:111:6",
				"data-macaly-name": "div",
				className: "grid grid-cols-2 gap-3 md:grid-cols-5",
				children: [
					["Sponsor conversations", String(totals.apps)],
					["Pending", String(totals.pending)],
					["Accepted sponsors", String(totals.accepted)],
					["Money committed", committed],
					["Deliverables pending", String(totals.dl)]
				].map(([l, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/event-dashboards.tsx:116:10",
					"data-macaly-name": "div",
					className: "rounded-xl border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:116:57",
						"data-macaly-name": "p",
						className: "text-lg font-bold",
						children: v
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:116:97",
						"data-macaly-name": "p",
						className: "text-[11px] text-muted-foreground",
						children: l
					})]
				}, l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/components/event-dashboards.tsx:119:6",
				"data-macaly-name": "p",
				className: "-mt-6 text-[11px] text-muted-foreground",
				children: "“Committed” is the total of accepted offers. Cube3 doesn't process payments."
			}),
			events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/event-dashboards.tsx:122:8",
				"data-macaly-name": "div",
				className: "rounded-xl border border-dashed p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:123:10",
						"data-macaly-name": "p",
						className: "font-medium",
						children: "Create your first event to start finding sponsors."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:124:10",
						"data-macaly-name": "p",
						className: "mt-1 text-sm text-muted-foreground",
						children: "It's free. Add packages, then Cube3 recommends brands that may fit."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/components/event-dashboards.tsx:125:10",
						"data-macaly-name": "Button",
						asChild: true,
						className: "mt-3 bg-brand text-brand-foreground hover:bg-brand/90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-macaly-loc": "src/components/event-dashboards.tsx:125:92",
							"data-macaly-name": "Link",
							to: "/events/new",
							children: "Create event →"
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				active.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-macaly-loc": "src/components/event-dashboards.tsx:129:32",
					"data-macaly-name": "section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:129:41",
						"data-macaly-name": "h2",
						className: "text-lg font-bold",
						children: "Active events"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:129:93",
						"data-macaly-name": "ul",
						className: "mt-3 divide-y rounded-xl border",
						children: active.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventRow, {
							"data-macaly-loc": "src/components/event-dashboards.tsx:129:160",
							"data-macaly-name": "EventRow",
							e
						}, e._id))
					})]
				}),
				drafts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-macaly-loc": "src/components/event-dashboards.tsx:130:32",
					"data-macaly-name": "section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:130:41",
						"data-macaly-name": "h2",
						className: "text-lg font-bold",
						children: "Drafts"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:130:86",
						"data-macaly-name": "ul",
						className: "mt-3 divide-y rounded-xl border",
						children: drafts.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventRow, {
							"data-macaly-loc": "src/components/event-dashboards.tsx:130:153",
							"data-macaly-name": "EventRow",
							e
						}, e._id))
					})]
				}),
				done.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-macaly-loc": "src/components/event-dashboards.tsx:131:30",
					"data-macaly-name": "section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:131:39",
						"data-macaly-name": "h2",
						className: "text-lg font-bold",
						children: "Completed / cancelled"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:131:99",
						"data-macaly-name": "ul",
						className: "mt-3 divide-y rounded-xl border",
						children: done.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventRow, {
							"data-macaly-loc": "src/components/event-dashboards.tsx:131:164",
							"data-macaly-name": "EventRow",
							e
						}, e._id))
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventDealsList, {
				"data-macaly-loc": "src/components/event-dashboards.tsx:135:6",
				"data-macaly-name": "EventDealsList",
				limit: 8,
				title: "Sponsor conversations"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrganizerVerification, {
				"data-macaly-loc": "src/components/event-dashboards.tsx:136:6",
				"data-macaly-name": "OrganizerVerification",
				collegeVerified: me?.organizer?.verification === "college_verified"
			})
		]
	});
}
/** Brand dashboard: sponsored events + recommendations. */
function BrandEventsSection() {
	const deals = useQuery(api.eventDeals.listMine);
	const recs = useQuery(api.events.recommendedForBrand);
	const sponsored = (deals ?? []).filter((d) => [
		"accepted",
		"agreement",
		"active",
		"completed"
	].includes(d.status));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/components/event-dashboards.tsx:148:6",
		"data-macaly-name": "section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/components/event-dashboards.tsx:149:8",
			"data-macaly-name": "div",
			className: "flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-macaly-loc": "src/components/event-dashboards.tsx:150:10",
				"data-macaly-name": "h2",
				className: "text-xl font-bold",
				children: "My sponsored events"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				"data-macaly-loc": "src/components/event-dashboards.tsx:151:10",
				"data-macaly-name": "Link",
				to: "/events",
				className: "text-sm font-medium text-brand",
				children: "Discover events →"
			})]
		}), sponsored.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-macaly-loc": "src/components/event-dashboards.tsx:154:10",
			"data-macaly-name": "p",
			className: "mt-3 rounded-xl border border-dashed p-5 text-center text-sm text-muted-foreground",
			children: "No event sponsorships yet. College fests and hackathons reach thousands of students."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			"data-macaly-loc": "src/components/event-dashboards.tsx:156:10",
			"data-macaly-name": "ul",
			className: "mt-3 divide-y rounded-xl border",
			children: sponsored.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				"data-macaly-loc": "src/components/event-dashboards.tsx:158:14",
				"data-macaly-name": "li",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					"data-macaly-loc": "src/components/event-dashboards.tsx:159:16",
					"data-macaly-name": "Link",
					to: "/event-deals/$dealId",
					params: { dealId: d._id },
					className: "grid gap-1 p-4 hover:bg-muted/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:160:18",
						"data-macaly-name": "div",
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-macaly-loc": "src/components/event-dashboards.tsx:161:20",
							"data-macaly-name": "p",
							className: "truncate font-medium",
							children: d.eventName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DealPill, {
							"data-macaly-loc": "src/components/event-dashboards.tsx:162:20",
							"data-macaly-name": "DealPill",
							status: d.status
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/components/event-dashboards.tsx:164:18",
						"data-macaly-name": "p",
						className: "text-xs text-muted-foreground",
						children: [
							d.counterpartName,
							" · ",
							formatEventDate(d.eventDate),
							" · ",
							formatMoney(d.amount, d.currency),
							" · ",
							d.deliverablesApproved,
							"/",
							d.deliverablesTotal,
							" deliverables approved"
						]
					})]
				})
			}, d._id))
		})]
	}), recs && recs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/components/event-dashboards.tsx:172:8",
		"data-macaly-name": "section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-macaly-loc": "src/components/event-dashboards.tsx:173:10",
				"data-macaly-name": "h2",
				className: "text-xl font-bold",
				children: "Recommended events"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/components/event-dashboards.tsx:174:10",
				"data-macaly-name": "p",
				className: "text-xs text-muted-foreground",
				children: "Based on your industry, country and past campaign budgets. Recommendations only."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/components/event-dashboards.tsx:175:10",
				"data-macaly-name": "div",
				className: "mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: recs.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, {
					"data-macaly-loc": "src/components/event-dashboards.tsx:175:90",
					"data-macaly-name": "EventCard",
					e: r.event,
					score: r.score
				}, r.event._id))
			})
		]
	})] });
}
//#endregion
export { EventDealsList as n, OrganizerDashboard as r, BrandEventsSection as t };
