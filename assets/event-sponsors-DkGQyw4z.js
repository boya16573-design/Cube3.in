import { A as Link, Ct as __toESM, S as useQuery, n as cn, s as api, t as Button, x as useMutation, xt as require_react, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { t as useNavigate } from "./useNavigate-DGvAM-7K.js";
import { i as RequireProfile, n as EmptyState, r as PageLoading, s as MessageSquare, t as AppShell } from "./app-shell-GoO9XvM6.js";
import { t as BadgeCheck } from "./badge-check-B7Ly22Tv.js";
import { n as MatchBadge } from "./campaign-card-4B6i36Pt.js";
import { t as Check } from "./check-DfHdiYc8.js";
import { t as Info } from "./info-D99mXMow.js";
import { t as X } from "./x-CskuAKXe.js";
import { n as toast } from "./dist-Dfgjbbc_.js";
import { t as Route } from "./event-sponsors-nlTOCNhL.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-P9E-Q0K0.js";
import { t as Label } from "./label-DdaoZkXu.js";
import { t as Badge } from "./badge-Xcdv_DZw.js";
import { i as formatEventDate } from "./event-card-BSHjCeD3.js";
import { t as Input } from "./input-BQJAkDLz.js";
import { t as Textarea } from "./textarea-CLFmgltT.js";
import { n as relevantIndustries } from "./eventMatching--BdHk_j6.js";
//#region src/routes/event-sponsors.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/event-sponsors.tsx:32:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireProfile, {
			"data-macaly-loc": "src/routes/event-sponsors.tsx:33:6",
			"data-macaly-name": "RequireProfile",
			role: "organizer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindSponsors, {
				"data-macaly-loc": "src/routes/event-sponsors.tsx:34:8",
				"data-macaly-name": "FindSponsors"
			})
		})
	});
}
function FindSponsors() {
	const { event } = Route.useSearch();
	const navigate = useNavigate();
	const mine = useQuery(api.events.listMine);
	if (mine === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/routes/event-sponsors.tsx:44:33",
		"data-macaly-name": "PageLoading"
	});
	const usable = mine.filter((e) => e.status === "published");
	if (mine.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		"data-macaly-loc": "src/routes/event-sponsors.tsx:47:11",
		"data-macaly-name": "EmptyState",
		title: "Create an event first",
		body: "Sponsor recommendations are based on your event's category, location and budget.",
		cta: {
			to: "/events/new",
			label: "Create event"
		}
	});
	const selected = usable.find((e) => e._id === event) ?? usable[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/event-sponsors.tsx:52:4",
		"data-macaly-name": "div",
		className: "mx-auto grid max-w-4xl gap-5 px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/event-sponsors.tsx:53:6",
			"data-macaly-name": "div",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-macaly-loc": "src/routes/event-sponsors.tsx:54:8",
				"data-macaly-name": "h1",
				className: "text-2xl font-bold",
				children: "Find event sponsors"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/event-sponsors.tsx:55:8",
				"data-macaly-name": "p",
				className: "text-sm text-muted-foreground",
				children: "Brands on Cube3 that may fit your event — with the reasons."
			})]
		}), usable.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/event-sponsors.tsx:59:8",
			"data-macaly-name": "div",
			className: "rounded-xl border border-dashed p-6 text-center text-sm",
			children: ["Publish an event to see sponsor recommendations.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/routes/event-sponsors.tsx:61:10",
				"data-macaly-name": "div",
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/event-sponsors.tsx:61:32",
					"data-macaly-name": "Button",
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/routes/event-sponsors.tsx:61:66",
						"data-macaly-name": "Link",
						to: "/events/edit/$eventId",
						params: { eventId: mine[0]._id },
						children: "Open draft"
					})
				})
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-macaly-loc": "src/routes/event-sponsors.tsx:65:10",
			"data-macaly-name": "div",
			className: "-mx-4 flex gap-2 overflow-x-auto px-4 pb-1",
			children: usable.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				"data-macaly-loc": "src/routes/event-sponsors.tsx:67:14",
				"data-macaly-name": "button",
				onClick: () => navigate({
					to: "/event-sponsors",
					search: { event: e._id }
				}),
				className: cn("shrink-0 rounded-full border px-3 py-1.5 text-sm", selected?._id === e._id ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"),
				children: [
					e.name,
					" · ",
					formatEventDate(e.eventDate)
				]
			}, e._id))
		}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recommendations, {
			"data-macaly-loc": "src/routes/event-sponsors.tsx:73:23",
			"data-macaly-name": "Recommendations",
			eventId: selected._id
		})] })]
	});
}
function Recommendations({ eventId }) {
	const res = useQuery(api.events.recommendSponsors, { eventId });
	const ev = useQuery(api.events.getMineForEdit, { eventId });
	const [target, setTarget] = (0, import_react.useState)(null);
	if (res === void 0 || ev === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/routes/event-sponsors.tsx:84:52",
		"data-macaly-name": "PageLoading"
	});
	if (!res.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/event-sponsors.tsx:85:22",
		"data-macaly-name": "p",
		className: "text-sm text-destructive",
		children: res.message
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			"data-macaly-loc": "src/routes/event-sponsors.tsx:89:6",
			"data-macaly-name": "p",
			className: "flex gap-2 rounded-lg bg-muted p-3 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
				"data-macaly-loc": "src/routes/event-sponsors.tsx:90:8",
				"data-macaly-name": "Info",
				className: "mt-0.5 size-4 shrink-0"
			}), "Match scores are recommendations based on each brand's industry, country, past campaign budgets on Cube3 and activity. They don't mean a brand will sponsor you."]
		}),
		ev && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			"data-macaly-loc": "src/routes/event-sponsors.tsx:94:8",
			"data-macaly-name": "p",
			className: "text-sm",
			children: [
				"For a ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					"data-macaly-loc": "src/routes/event-sponsors.tsx:94:37",
					"data-macaly-name": "strong",
					children: ev.category
				}),
				" event, brands in ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					"data-macaly-loc": "src/routes/event-sponsors.tsx:94:85",
					"data-macaly-name": "strong",
					children: relevantIndustries(ev.category).join(", ")
				}),
				" are usually the best fit — including local businesses near your college."
			]
		}),
		res.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/event-sponsors.tsx:98:8",
			"data-macaly-name": "div",
			className: "rounded-xl border border-dashed p-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/routes/event-sponsors.tsx:99:10",
				"data-macaly-name": "p",
				className: "font-medium",
				children: [
					"No strong matches among the ",
					res.totalBrands,
					" brands on Cube3 yet"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/event-sponsors.tsx:100:10",
				"data-macaly-name": "p",
				className: "mt-1 text-sm text-muted-foreground",
				children: "Share your event page link with brands directly — they can send a proposal from it."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			"data-macaly-loc": "src/routes/event-sponsors.tsx:103:8",
			"data-macaly-name": "ul",
			className: "grid gap-3 md:grid-cols-2",
			children: res.items.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				"data-macaly-loc": "src/routes/event-sponsors.tsx:105:12",
				"data-macaly-name": "li",
				className: "grid gap-3 rounded-xl border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/event-sponsors.tsx:106:14",
						"data-macaly-name": "div",
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/event-sponsors.tsx:107:16",
							"data-macaly-name": "div",
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-macaly-loc": "src/routes/event-sponsors.tsx:108:18",
								"data-macaly-name": "p",
								className: "flex items-center gap-1 font-semibold",
								children: [b.name, b.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
									"data-macaly-loc": "src/routes/event-sponsors.tsx:108:94",
									"data-macaly-name": "BadgeCheck",
									className: "size-4 text-brand",
									"aria-label": "Verified brand"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-macaly-loc": "src/routes/event-sponsors.tsx:109:18",
								"data-macaly-name": "p",
								className: "text-xs text-muted-foreground",
								children: [b.industry, b.country].filter(Boolean).join(" · ") || "Industry not set"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchBadge, {
							"data-macaly-loc": "src/routes/event-sponsors.tsx:111:16",
							"data-macaly-name": "MatchBadge",
							score: b.score
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						"data-macaly-loc": "src/routes/event-sponsors.tsx:113:14",
						"data-macaly-name": "ul",
						className: "grid gap-1 text-xs",
						children: b.factors.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							"data-macaly-loc": "src/routes/event-sponsors.tsx:115:18",
							"data-macaly-name": "li",
							className: "flex items-start gap-1.5",
							children: [f.met ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								"data-macaly-loc": "src/routes/event-sponsors.tsx:116:29",
								"data-macaly-name": "Check",
								className: "mt-0.5 size-3.5 shrink-0 text-success"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								"data-macaly-loc": "src/routes/event-sponsors.tsx:116:91",
								"data-macaly-name": "X",
								className: "mt-0.5 size-3.5 shrink-0 text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-macaly-loc": "src/routes/event-sponsors.tsx:117:20",
								"data-macaly-name": "span",
								className: cn(!f.met && "text-muted-foreground"),
								children: [f.label, f.detail ? ` — ${f.detail}` : ""]
							})]
						}, i))
					}),
					b.activeCampaigns > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						"data-macaly-loc": "src/routes/event-sponsors.tsx:121:40",
						"data-macaly-name": "Badge",
						variant: "secondary",
						className: "justify-self-start",
						children: [
							b.activeCampaigns,
							" active campaign",
							b.activeCampaigns === 1 ? "" : "s"
						]
					}),
					b.existingDealId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/event-sponsors.tsx:123:16",
						"data-macaly-name": "Button",
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							"data-macaly-loc": "src/routes/event-sponsors.tsx:123:50",
							"data-macaly-name": "Link",
							to: "/event-deals/$dealId",
							params: { dealId: b.existingDealId },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
								"data-macaly-loc": "src/routes/event-sponsors.tsx:123:120",
								"data-macaly-name": "MessageSquare",
								className: "size-4"
							}), "Open conversation"]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/event-sponsors.tsx:125:16",
						"data-macaly-name": "Button",
						className: "bg-brand text-brand-foreground hover:bg-brand/90",
						onClick: () => setTarget({
							id: b.brandUserId,
							name: b.name
						}),
						children: "Request sponsorship"
					})
				]
			}, b.brandUserId))
		}),
		target && ev && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestDialog, {
			"data-macaly-loc": "src/routes/event-sponsors.tsx:131:23",
			"data-macaly-name": "RequestDialog",
			brand: target,
			eventId,
			currency: ev.currency,
			packages: ev.packages,
			onClose: () => setTarget(null)
		})
	] });
}
function RequestDialog({ brand, eventId, currency, packages, onClose }) {
	const request = useMutation(api.eventDeals.requestSponsorship);
	const navigate = useNavigate();
	const [pkg, setPkg] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-macaly-loc": "src/routes/event-sponsors.tsx:150:4",
		"data-macaly-name": "Dialog",
		open: true,
		onOpenChange: (o) => {
			if (!o) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-macaly-loc": "src/routes/event-sponsors.tsx:151:6",
			"data-macaly-name": "DialogContent",
			className: "max-h-[90dvh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-macaly-loc": "src/routes/event-sponsors.tsx:152:8",
					"data-macaly-name": "DialogHeader",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-macaly-loc": "src/routes/event-sponsors.tsx:153:10",
						"data-macaly-name": "DialogTitle",
						children: [
							"Ask ",
							brand.name,
							" to sponsor"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-macaly-loc": "src/routes/event-sponsors.tsx:154:10",
						"data-macaly-name": "DialogDescription",
						children: "Be specific about why your audience fits their brand. You can send up to 20 requests a day."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/event-sponsors.tsx:156:8",
					"data-macaly-name": "div",
					className: "grid gap-3",
					children: [
						packages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-macaly-loc": "src/routes/event-sponsors.tsx:158:12",
							"data-macaly-name": "div",
							className: "flex flex-wrap gap-1.5",
							children: packages.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"data-macaly-loc": "src/routes/event-sponsors.tsx:160:16",
								"data-macaly-name": "button",
								type: "button",
								onClick: () => {
									setPkg(p.id);
									if (p.amount !== void 0) setAmount(String(p.amount));
								},
								className: cn("rounded-full border px-3 py-1 text-sm", pkg === p.id ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"),
								children: p.name
							}, p.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/event-sponsors.tsx:165:10",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-macaly-loc": "src/routes/event-sponsors.tsx:165:40",
								"data-macaly-name": "Label",
								htmlFor: "ra",
								children: [
									"Ask (",
									currency,
									", optional)"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/routes/event-sponsors.tsx:165:94",
								"data-macaly-name": "Input",
								id: "ra",
								inputMode: "numeric",
								value: amount,
								onChange: (e) => setAmount(e.target.value.replace(/\D/g, ""))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/event-sponsors.tsx:166:10",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/event-sponsors.tsx:166:40",
								"data-macaly-name": "Label",
								htmlFor: "rm",
								children: "Your pitch"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								"data-macaly-loc": "src/routes/event-sponsors.tsx:166:78",
								"data-macaly-name": "Textarea",
								id: "rm",
								rows: 5,
								value: message,
								onChange: (e) => setMessage(e.target.value),
								maxLength: 3e3,
								placeholder: `Hi ${brand.name} team, we're expecting 2,000+ engineering students…`
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
					"data-macaly-loc": "src/routes/event-sponsors.tsx:169:8",
					"data-macaly-name": "DialogFooter",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/event-sponsors.tsx:170:10",
						"data-macaly-name": "Button",
						className: "bg-brand text-brand-foreground hover:bg-brand/90",
						disabled: busy || message.trim().length < 20,
						onClick: async () => {
							setBusy(true);
							try {
								const r = await request({
									eventId,
									brandUserId: brand.id,
									message,
									packageName: packages.find((p) => p.id === pkg)?.name,
									amount: amount ? Number(amount) : void 0
								});
								if (!r.ok) return void toast.error(r.message);
								toast.success("Request sent");
								navigate({
									to: "/event-deals/$dealId",
									params: { dealId: r.dealId }
								});
							} finally {
								setBusy(false);
							}
						},
						children: busy ? "Sending…" : "Send request"
					})
				})
			]
		})
	});
}
//#endregion
export { Page as component };
