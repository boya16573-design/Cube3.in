import { A as Link, Ct as __toESM, S as useQuery, n as cn, s as api, t as Button, x as useMutation, xt as require_react, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { i as RequireProfile, n as EmptyState, r as PageLoading, t as AppShell } from "./app-shell-GoO9XvM6.js";
import { t as usePaginatedQuery } from "./use_paginated_query-CmHnku-B.js";
import { a as Send, c as ArrowLeft, i as DropdownMenuTrigger, n as DropdownMenuContent, o as EllipsisVertical, r as DropdownMenuItem, s as Ban, t as DropdownMenu } from "./dropdown-menu-D0WYJVdO.js";
import { t as Check } from "./check-DfHdiYc8.js";
import { t as ExternalLink } from "./external-link-r8XcJ03L.js";
import { n as Flag, t as ReportDialog } from "./report-dialog-Da0j6I8b.js";
import { t as Plus } from "./plus-BzcJQXl5.js";
import { t as Trash2 } from "./trash-2-fcKCIOWR.js";
import { t as TriangleAlert } from "./triangle-alert-BxrMt5YS.js";
import { t as X } from "./x-CskuAKXe.js";
import { n as toast } from "./dist-Dfgjbbc_.js";
import { i as formatMoney } from "./money-B2xGNqWK.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-P9E-Q0K0.js";
import { t as Label } from "./label-DdaoZkXu.js";
import { i as formatEventDate } from "./event-card-BSHjCeD3.js";
import { t as Route } from "./_dealId-C0FVlMG3.js";
import { t as Input } from "./input-BQJAkDLz.js";
import { t as Textarea } from "./textarea-CLFmgltT.js";
//#region src/routes/event-deals/$dealId.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:29:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireProfile, {
			"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:30:6",
			"data-macaly-name": "RequireProfile",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Deal, {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:31:8",
				"data-macaly-name": "Deal"
			})
		})
	});
}
async function run(p, success) {
	try {
		const r = await p;
		if (!r.ok) toast.error(r.message);
		else toast.success(success);
		return r.ok;
	} catch (err) {
		console.error("deal action failed", err);
		toast.error("Something went wrong.");
		return false;
	}
}
var STEPS = [
	{
		key: "negotiating",
		label: "Negotiating",
		covers: [
			"proposed",
			"negotiating",
			"changes_requested"
		]
	},
	{
		key: "accepted",
		label: "Accepted",
		covers: ["accepted"]
	},
	{
		key: "agreement",
		label: "Agreement",
		covers: ["agreement"]
	},
	{
		key: "active",
		label: "Active",
		covers: ["active"]
	},
	{
		key: "completed",
		label: "Completed",
		covers: ["completed"]
	}
];
var STATUS_TEXT = {
	proposed: "Proposal sent",
	negotiating: "Negotiating",
	changes_requested: "Changes requested",
	accepted: "Terms accepted",
	agreement: "Agreement confirmed",
	active: "Active",
	completed: "Completed",
	rejected: "Declined",
	cancelled: "Ended"
};
function Stepper({ status }) {
	if (status === "rejected" || status === "cancelled") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:67:62",
		"data-macaly-name": "p",
		className: "rounded-lg bg-muted p-3 text-sm text-muted-foreground",
		children: [STATUS_TEXT[status], "."]
	});
	const idx = STEPS.findIndex((s) => s.covers.includes(status));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:70:4",
		"data-macaly-name": "ol",
		className: "-mx-4 flex gap-1 overflow-x-auto px-4 pb-1",
		"aria-label": "Sponsorship status",
		children: STEPS.map((s, i) => {
			const done = i < idx || status === "completed";
			const cur = i === idx && status !== "completed";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:75:10",
				"data-macaly-name": "li",
				className: "flex shrink-0 items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:76:12",
					"data-macaly-name": "span",
					className: cn("flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium", done && "border-success bg-success text-success-foreground", cur && "border-brand bg-brand text-brand-foreground", !done && !cur && "text-muted-foreground"),
					"aria-current": cur ? "step" : void 0,
					children: [done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:77:23",
						"data-macaly-name": "Check",
						className: "size-3"
					}), s.label]
				}), i < STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:79:37",
					"data-macaly-name": "span",
					className: "h-px w-3 bg-border"
				})]
			}, s.key);
		})
	});
}
function Deal() {
	const { dealId } = Route.useParams();
	const id = dealId;
	const d = useQuery(api.eventDeals.get, { dealId: id });
	const markRead = useMutation(api.eventDeals.markRead);
	(0, import_react.useEffect)(() => {
		if (d) markRead({ dealId: id });
	}, [
		d?._id,
		d?.status,
		d?.offers.length,
		id,
		markRead
	]);
	if (d === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:96:30",
		"data-macaly-name": "PageLoading"
	});
	if (d === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:97:25",
		"data-macaly-name": "EmptyState",
		title: "Conversation not found",
		body: "It doesn't exist or you don't have access.",
		cta: {
			to: "/inbox",
			label: "Back to inbox"
		}
	});
	const open = [
		"proposed",
		"negotiating",
		"changes_requested"
	].includes(d.status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:101:4",
		"data-macaly-name": "div",
		className: "mx-auto flex max-w-3xl flex-col gap-4 px-4 py-4 md:py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:102:6",
				"data-macaly-name": "Header",
				d
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:103:6",
				"data-macaly-name": "Stepper",
				status: d.status
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Proposal, {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:104:6",
				"data-macaly-name": "Proposal",
				d
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Negotiation, {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:105:15",
				"data-macaly-name": "Negotiation",
				d
			}),
			d.offers.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:106:30",
				"data-macaly-name": "History",
				d
			}),
			!open && d.agreedAmount !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Agreement, {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:107:48",
				"data-macaly-name": "Agreement",
				d
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Deliverables, {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:108:6",
				"data-macaly-name": "Deliverables",
				d
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thread, {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:109:6",
				"data-macaly-name": "Thread",
				dealId: id,
				disabled: d.blocked || d.status === "cancelled"
			})
		]
	});
}
function Header({ d }) {
	const setBlocked = useMutation(api.collabs.setBlocked);
	const cancel = useMutation(api.eventDeals.cancel);
	const [report, setReport] = (0, import_react.useState)(false);
	const open = [
		"proposed",
		"negotiating",
		"changes_requested"
	].includes(d.status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:120:4",
		"data-macaly-name": "div",
		className: "flex items-start justify-between gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:121:6",
				"data-macaly-name": "div",
				className: "flex min-w-0 items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:122:8",
					"data-macaly-name": "Button",
					asChild: true,
					variant: "ghost",
					size: "icon",
					className: "-ml-2 shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:122:79",
						"data-macaly-name": "Link",
						to: "/inbox",
						"aria-label": "Back to inbox",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:122:124",
							"data-macaly-name": "ArrowLeft",
							className: "size-5"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:123:8",
					"data-macaly-name": "div",
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:124:10",
						"data-macaly-name": "h1",
						className: "truncate text-lg font-bold",
						children: d.counterpart.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:125:10",
						"data-macaly-name": "Link",
						to: "/events/$slug",
						params: { slug: d.event.slug },
						className: "block truncate text-sm text-muted-foreground hover:underline",
						children: [
							d.event.name,
							" · ",
							formatEventDate(d.event.eventDate)
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:128:6",
				"data-macaly-name": "div",
				className: "flex shrink-0 items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:129:8",
					"data-macaly-name": "span",
					className: "rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand",
					children: STATUS_TEXT[d.status]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:130:8",
					"data-macaly-name": "DropdownMenu",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:131:10",
						"data-macaly-name": "DropdownMenuTrigger",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:131:39",
							"data-macaly-name": "Button",
							variant: "ghost",
							size: "icon",
							"aria-label": "More actions",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, {
								"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:131:101",
								"data-macaly-name": "MoreVertical",
								className: "size-4"
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:132:10",
						"data-macaly-name": "DropdownMenuContent",
						align: "end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:133:12",
								"data-macaly-name": "DropdownMenuItem",
								onClick: () => setReport(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
									"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:133:62",
									"data-macaly-name": "Flag",
									className: "size-4"
								}), "Report"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:134:12",
								"data-macaly-name": "DropdownMenuItem",
								onClick: () => run(setBlocked({
									userId: d.counterpart.userId,
									blocked: true
								}), "Blocked"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {
									"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:134:122",
									"data-macaly-name": "Ban",
									className: "size-4"
								}), "Block"]
							}),
							open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:135:21",
								"data-macaly-name": "DropdownMenuItem",
								onClick: () => {
									if (confirm("End this conversation?")) run(cancel({ dealId: d._id }), "Conversation ended");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:135:156",
									"data-macaly-name": "X",
									className: "size-4"
								}), "End conversation"]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportDialog, {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:139:6",
				"data-macaly-name": "ReportDialog",
				open: report,
				onOpenChange: setReport,
				targetUserId: d.counterpart.userId,
				targetRole: d.mySide === "brand" ? "event organizer" : "brand"
			})
		]
	});
}
function Proposal({ d }) {
	if (!d.message && !d.objectives && !d.productOffer && !d.additionalRequirements && !d.packageName) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:147:4",
		"data-macaly-name": "details",
		className: "rounded-xl border p-4",
		open: d.status === "proposed",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
			"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:148:6",
			"data-macaly-name": "summary",
			className: "cursor-pointer text-sm font-semibold",
			children: d.initiatedBy === "brand" ? "Brand's proposal" : "Organizer's request"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:149:6",
			"data-macaly-name": "dl",
			className: "mt-3 grid gap-2 text-sm",
			children: [
				d.packageName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:150:26",
					"data-macaly-name": "div",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:150:31",
						"data-macaly-name": "dt",
						className: "text-xs text-muted-foreground",
						children: "Package"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:150:89",
						"data-macaly-name": "dd",
						children: d.packageName
					})]
				}),
				d.productOffer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:151:27",
					"data-macaly-name": "div",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:151:32",
						"data-macaly-name": "dt",
						className: "text-xs text-muted-foreground",
						children: "Product / service offer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:151:106",
						"data-macaly-name": "dd",
						children: d.productOffer
					})]
				}),
				d.objectives && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:152:25",
					"data-macaly-name": "div",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:152:30",
						"data-macaly-name": "dt",
						className: "text-xs text-muted-foreground",
						children: "Objectives"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:152:91",
						"data-macaly-name": "dd",
						className: "whitespace-pre-line",
						children: d.objectives
					})]
				}),
				d.additionalRequirements && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:153:37",
					"data-macaly-name": "div",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:153:42",
						"data-macaly-name": "dt",
						className: "text-xs text-muted-foreground",
						children: "Additional requirements"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:153:116",
						"data-macaly-name": "dd",
						className: "whitespace-pre-line",
						children: d.additionalRequirements
					})]
				})
			]
		})]
	});
}
function Negotiation({ d }) {
	const respond = useMutation(api.eventDeals.respond);
	const [counterOpen, setCounterOpen] = (0, import_react.useState)(false);
	const [changes, setChanges] = (0, import_react.useState)("");
	const openOffer = [...d.offers].reverse().find((o) => o.status === "open");
	const theirs = openOffer && openOffer.by !== d.mySide;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:167:4",
		"data-macaly-name": "div",
		className: "grid gap-3 rounded-xl border-2 border-warning p-4",
		children: [
			openOffer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:170:10",
					"data-macaly-name": "p",
					className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
					children: theirs ? `Offer from ${d.counterpart.name}` : "Your offer · waiting for a reply"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:171:10",
					"data-macaly-name": "p",
					className: "text-2xl font-bold",
					children: [formatMoney(openOffer.amount, d.currency), openOffer.productOffer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:171:113",
						"data-macaly-name": "span",
						className: "text-base font-medium",
						children: [" + ", openOffer.productOffer]
					}) : null]
				}),
				openOffer.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:172:29",
					"data-macaly-name": "p",
					className: "text-sm",
					children: openOffer.note
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:175:8",
				"data-macaly-name": "p",
				className: "text-sm",
				children: ["No amount on the table yet. ", d.mySide === "brand" ? "Make an offer to start negotiating." : "Wait for the brand's offer, or suggest an amount."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:177:6",
				"data-macaly-name": "div",
				className: "flex flex-wrap gap-2",
				children: [
					theirs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:178:19",
						"data-macaly-name": "Button",
						className: "bg-success text-success-foreground hover:bg-success/90",
						onClick: () => {
							if (confirm(`Accept ${formatMoney(openOffer.amount, d.currency)}?`)) run(respond({
								dealId: d._id,
								action: "accept"
							}), "Accepted");
						},
						children: "Accept"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:179:8",
						"data-macaly-name": "Button",
						variant: "outline",
						onClick: () => setCounterOpen(true),
						children: openOffer ? "Counteroffer" : "Make an offer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:180:8",
						"data-macaly-name": "Button",
						variant: "ghost",
						onClick: () => {
							const n = prompt("Reason (optional)") ?? void 0;
							run(respond({
								dealId: d._id,
								action: "reject",
								note: n || void 0
							}), "Declined");
						},
						children: "Decline"
					})
				]
			}),
			d.mySide === "organizer" && d.initiatedBy === "brand" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:183:8",
				"data-macaly-name": "div",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:184:10",
					"data-macaly-name": "Textarea",
					rows: 2,
					value: changes,
					onChange: (e) => setChanges(e.target.value),
					placeholder: "Ask the brand to change something (deliverables, timing…)",
					maxLength: 500
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:185:10",
					"data-macaly-name": "Button",
					variant: "outline",
					size: "sm",
					className: "justify-self-start",
					disabled: !changes.trim(),
					onClick: async () => {
						if (await run(respond({
							dealId: d._id,
							action: "request_changes",
							note: changes
						}), "Changes requested")) setChanges("");
					},
					children: "Request changes"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CounterDialog, {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:188:6",
				"data-macaly-name": "CounterDialog",
				open: counterOpen,
				onOpenChange: setCounterOpen,
				d,
				defaultAmount: openOffer?.amount
			})
		]
	});
}
function CounterDialog({ open, onOpenChange, d, defaultAmount }) {
	const counter = useMutation(api.eventDeals.counter);
	const [amount, setAmount] = (0, import_react.useState)("");
	const [product, setProduct] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (open) {
			setAmount(defaultAmount !== void 0 ? String(defaultAmount) : "");
			setProduct("");
			setNote("");
		}
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:200:4",
		"data-macaly-name": "Dialog",
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:201:6",
			"data-macaly-name": "DialogContent",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:202:8",
					"data-macaly-name": "DialogHeader",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:203:10",
						"data-macaly-name": "DialogTitle",
						children: "Your offer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:204:10",
						"data-macaly-name": "DialogDescription",
						children: [
							"Amounts in ",
							d.currency,
							". Both sides keep the full offer history."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:206:8",
					"data-macaly-name": "div",
					className: "grid gap-3",
					children: [
						d.event.packages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:208:12",
							"data-macaly-name": "div",
							className: "flex flex-wrap gap-1.5",
							children: d.event.packages.filter((p) => p.amount !== void 0).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:210:16",
								"data-macaly-name": "button",
								type: "button",
								onClick: () => setAmount(String(p.amount)),
								className: "rounded-full border px-2.5 py-1 text-xs hover:bg-muted",
								children: [
									p.name,
									" · ",
									formatMoney(p.amount, d.currency)
								]
							}, p.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:214:10",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:214:40",
								"data-macaly-name": "Label",
								htmlFor: "ca",
								children: [
									"Amount (",
									d.currency,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:214:89",
								"data-macaly-name": "Input",
								id: "ca",
								inputMode: "numeric",
								value: amount,
								onChange: (e) => setAmount(e.target.value.replace(/\D/g, ""))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:215:10",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:215:40",
								"data-macaly-name": "Label",
								htmlFor: "cp",
								children: "Plus products / services (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:215:103",
								"data-macaly-name": "Input",
								id: "cp",
								value: product,
								onChange: (e) => setProduct(e.target.value),
								maxLength: 500,
								placeholder: "e.g. goodies for 200 attendees"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:216:10",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:216:40",
								"data-macaly-name": "Label",
								htmlFor: "cn",
								children: "Note (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:216:83",
								"data-macaly-name": "Textarea",
								id: "cn",
								rows: 2,
								value: note,
								onChange: (e) => setNote(e.target.value),
								maxLength: 500
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:218:8",
					"data-macaly-name": "DialogFooter",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:219:10",
						"data-macaly-name": "Button",
						className: "bg-brand text-brand-foreground hover:bg-brand/90",
						disabled: !amount,
						onClick: async () => {
							if (await run(counter({
								dealId: d._id,
								amount: Number(amount),
								productOffer: product || void 0,
								note: note || void 0
							}), "Offer sent")) onOpenChange(false);
						},
						children: "Send offer"
					})
				})
			]
		})
	});
}
function History({ d }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:230:4",
		"data-macaly-name": "details",
		className: "rounded-xl border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
			"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:231:6",
			"data-macaly-name": "summary",
			className: "cursor-pointer text-sm font-medium",
			children: [
				"Offer history (",
				d.offers.length,
				")"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:232:6",
			"data-macaly-name": "ol",
			className: "mt-3 grid gap-2",
			children: d.offers.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:234:10",
				"data-macaly-name": "li",
				className: "flex items-center justify-between gap-3 rounded-lg bg-muted/60 p-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:235:12",
					"data-macaly-name": "span",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:236:14",
							"data-macaly-name": "span",
							className: "font-medium",
							children: o.by === d.mySide ? "You" : d.counterpart.name
						}),
						" · ",
						formatMoney(o.amount, d.currency),
						o.productOffer ? ` + ${o.productOffer}` : "",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:237:14",
							"data-macaly-name": "span",
							className: "block text-xs text-muted-foreground",
							children: new Date(o.at).toLocaleDateString("en-GB")
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:239:12",
					"data-macaly-name": "span",
					className: cn("rounded-full px-2 py-0.5 text-xs capitalize", o.status === "accepted" ? "bg-success text-success-foreground" : "bg-background"),
					children: o.status
				})]
			}, i))
		})]
	});
}
function Agreement({ d }) {
	const confirm_ = useMutation(api.eventDeals.confirmAgreement);
	const markActive = useMutation(api.eventDeals.markActive);
	const markCompleted = useMutation(api.eventDeals.markCompleted);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:252:4",
		"data-macaly-name": "div",
		className: "grid gap-3 rounded-xl border border-success bg-success/5 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:253:6",
				"data-macaly-name": "p",
				className: "text-xs font-semibold uppercase tracking-wide text-success",
				children: "Agreed terms"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:254:6",
				"data-macaly-name": "p",
				className: "text-xl font-bold",
				children: [formatMoney(d.agreedAmount, d.currency), d.agreedProductOffer ? ` + ${d.agreedProductOffer}` : ""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:255:6",
				"data-macaly-name": "p",
				className: "text-xs text-muted-foreground",
				children: "Payment is arranged directly between the brand and the organizer. Cube3 doesn't process payments."
			}),
			d.organizerContact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:256:29",
				"data-macaly-name": "p",
				className: "rounded-lg bg-background p-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:256:81",
						"data-macaly-name": "strong",
						children: "Organizer contact:"
					}),
					" ",
					d.organizerContact
				]
			}),
			d.status === "accepted" && (d.iConfirmed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:259:10",
				"data-macaly-name": "p",
				className: "text-sm text-muted-foreground",
				children: ["You confirmed. ", d.theyConfirmed ? "" : `Waiting for ${d.counterpart.name} to confirm.`]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:261:10",
				"data-macaly-name": "div",
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:262:12",
					"data-macaly-name": "p",
					className: "text-sm",
					children: "Confirm you agree to these terms and the deliverables below. This is your written agreement on Cube3."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:263:12",
					"data-macaly-name": "Button",
					className: "justify-self-start bg-brand text-brand-foreground hover:bg-brand/90",
					onClick: () => run(confirm_({ dealId: d._id }), "Agreement confirmed"),
					children: "Confirm agreement"
				})]
			})),
			d.status === "agreement" && d.mySide === "organizer" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:267:63",
				"data-macaly-name": "Button",
				className: "justify-self-start",
				onClick: () => run(markActive({ dealId: d._id }), "Sponsorship active"),
				children: "Start delivering"
			}),
			d.status === "agreement" && d.mySide === "brand" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:268:59",
				"data-macaly-name": "p",
				className: "text-sm text-muted-foreground",
				children: "Waiting for the organizer to start delivering."
			}),
			d.status === "active" && d.mySide === "brand" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:270:8",
				"data-macaly-name": "Button",
				className: "justify-self-start bg-success text-success-foreground hover:bg-success/90",
				onClick: () => run(markCompleted({ dealId: d._id }), "Sponsorship completed"),
				children: "Mark sponsorship complete"
			}),
			d.status === "completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:272:35",
				"data-macaly-name": "p",
				className: "text-sm font-medium text-success",
				children: "This sponsorship is complete. 🎉"
			})
		]
	});
}
var DL_TEXT = {
	pending: "Pending",
	in_progress: "In progress",
	completed: "Completed",
	approved: "Approved"
};
function Deliverables({ d }) {
	const add = useMutation(api.eventDeals.addDeliverable);
	const update = useMutation(api.eventDeals.updateDeliverable);
	const remove = useMutation(api.eventDeals.removeDeliverable);
	const [title, setTitle] = (0, import_react.useState)("");
	const closed = [
		"completed",
		"rejected",
		"cancelled"
	].includes(d.status);
	const negotiating = [
		"proposed",
		"negotiating",
		"changes_requested"
	].includes(d.status);
	const working = d.status === "active" || d.status === "agreement";
	const approved = d.deliverables.filter((x) => x.status === "approved").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:290:4",
		"data-macaly-name": "section",
		className: "grid gap-3 rounded-xl border p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:291:6",
				"data-macaly-name": "div",
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:292:8",
					"data-macaly-name": "h2",
					className: "font-semibold",
					children: "Deliverables"
				}), d.deliverables.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:293:38",
					"data-macaly-name": "span",
					className: "text-xs text-muted-foreground",
					children: [
						approved,
						"/",
						d.deliverables.length,
						" approved"
					]
				})]
			}),
			d.deliverables.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:295:38",
				"data-macaly-name": "p",
				className: "text-sm text-muted-foreground",
				children: "No deliverables yet — add what the sponsor gets (logo placement, stage mention, booth…)."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:296:6",
				"data-macaly-name": "ul",
				className: "grid gap-2",
				children: d.deliverables.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:298:10",
					"data-macaly-name": "li",
					className: "grid gap-2 rounded-lg border p-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:299:12",
							"data-macaly-name": "div",
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:300:14",
								"data-macaly-name": "span",
								className: "font-medium",
								children: x.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:301:14",
								"data-macaly-name": "span",
								className: cn("shrink-0 rounded-full px-2 py-0.5 text-xs", x.status === "approved" ? "bg-success text-success-foreground" : x.status === "completed" ? "bg-warning text-warning-foreground" : "bg-muted"),
								children: DL_TEXT[x.status]
							})]
						}),
						x.proofUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:303:27",
							"data-macaly-name": "a",
							href: x.proofUrl,
							target: "_blank",
							rel: "noopener noreferrer nofollow ugc",
							className: "inline-flex items-center gap-1 break-all text-xs text-brand hover:underline",
							children: ["Proof", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:303:196",
								"data-macaly-name": "ExternalLink",
								className: "size-3"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:304:12",
							"data-macaly-name": "div",
							className: "flex flex-wrap gap-2",
							children: [
								working && d.mySide === "organizer" && x.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:305:80",
									"data-macaly-name": "Button",
									size: "sm",
									variant: "outline",
									onClick: () => run(update({
										deliverableId: x._id,
										status: "in_progress"
									}), "Updated"),
									children: "Start"
								}),
								working && d.mySide === "organizer" && (x.status === "pending" || x.status === "in_progress") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:307:16",
									"data-macaly-name": "Button",
									size: "sm",
									variant: "outline",
									onClick: () => {
										const url = prompt("Link to proof (photo, post, recording) — optional") ?? "";
										run(update({
											deliverableId: x._id,
											status: "completed",
											proofUrl: url.trim() || void 0
										}), "Marked completed");
									},
									children: "Mark completed"
								}),
								working && d.mySide === "brand" && x.status === "completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:311:18",
									"data-macaly-name": "Button",
									size: "sm",
									className: "bg-success text-success-foreground hover:bg-success/90",
									onClick: () => run(update({
										deliverableId: x._id,
										status: "approved"
									}), "Approved"),
									children: "Approve"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:312:18",
									"data-macaly-name": "Button",
									size: "sm",
									variant: "ghost",
									onClick: () => run(update({
										deliverableId: x._id,
										status: "in_progress"
									}), "Sent back"),
									children: "Send back"
								})] }),
								negotiating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:315:30",
									"data-macaly-name": "Button",
									size: "sm",
									variant: "ghost",
									"aria-label": `Remove ${x.title}`,
									onClick: () => run(remove({ deliverableId: x._id }), "Removed"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
										"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:315:162",
										"data-macaly-name": "Trash2",
										className: "size-3.5"
									})
								})
							]
						})
					]
				}, x._id))
			}),
			!closed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:321:8",
				"data-macaly-name": "div",
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:322:10",
					"data-macaly-name": "Input",
					value: title,
					onChange: (e) => setTitle(e.target.value),
					placeholder: "e.g. Logo on main stage banner",
					maxLength: 160
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:323:10",
					"data-macaly-name": "Button",
					variant: "secondary",
					disabled: !title.trim(),
					onClick: async () => {
						if (await run(add({
							dealId: d._id,
							title
						}), "Added")) setTitle("");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:323:157",
						"data-macaly-name": "Plus",
						className: "size-4"
					}), "Add"]
				})]
			})
		]
	});
}
function Thread({ dealId, disabled }) {
	const { results, status, loadMore } = usePaginatedQuery(api.eventDeals.messages, { dealId }, { initialNumItems: 40 });
	const send = useMutation(api.eventDeals.sendMessage);
	const [text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const endRef = (0, import_react.useRef)(null);
	const ordered = [...results].reverse();
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ block: "end" });
	}, [results.length]);
	async function submit(e) {
		e.preventDefault();
		if (!text.trim()) return;
		setBusy(true);
		try {
			const r = await send({
				dealId,
				body: text
			});
			if (!r.ok) return void toast.error(r.message);
			setText("");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:353:4",
		"data-macaly-name": "section",
		className: "flex flex-col rounded-xl border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:354:6",
			"data-macaly-name": "div",
			className: "max-h-[55dvh] min-h-48 overflow-y-auto p-3",
			children: [
				status === "CanLoadMore" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:355:37",
					"data-macaly-name": "button",
					className: "mb-2 w-full text-center text-xs text-muted-foreground underline",
					onClick: () => loadMore(40),
					children: "Load earlier messages"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:356:8",
					"data-macaly-name": "ul",
					className: "grid gap-2",
					children: ordered.map((m) => m.kind === "system" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:359:14",
						"data-macaly-name": "li",
						className: "mx-auto max-w-[90%] rounded-full bg-muted px-3 py-1 text-center text-xs text-muted-foreground",
						children: m.body
					}, m._id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:361:14",
						"data-macaly-name": "li",
						className: cn("flex", m.mine ? "justify-end" : "justify-start"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:362:16",
							"data-macaly-name": "div",
							className: cn("max-w-[80%] rounded-2xl px-3 py-2 text-sm", m.kind === "offer" ? "border-2 border-warning bg-background" : m.mine ? "bg-brand text-brand-foreground" : "bg-muted"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:363:18",
									"data-macaly-name": "p",
									className: "whitespace-pre-line break-words",
									children: m.body
								}),
								m.riskFlag && !m.mine && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:365:20",
									"data-macaly-name": "p",
									className: "mt-1.5 flex items-start gap-1 rounded-md bg-destructive/10 p-1.5 text-[11px] font-medium text-destructive",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
											"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:365:141",
											"data-macaly-name": "AlertTriangle",
											className: "mt-0.5 size-3 shrink-0"
										}),
										m.riskFlag,
										" If this feels wrong, use Report in the menu."
									]
								}),
								m.hasLink && !m.mine && !m.riskFlag && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:367:58",
									"data-macaly-name": "p",
									className: "mt-1 flex items-center gap-1 text-[11px] opacity-80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
										"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:367:125",
										"data-macaly-name": "AlertTriangle",
										className: "size-3"
									}), "Contains a link. Never share passwords or pay outside agreed terms."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:368:18",
									"data-macaly-name": "p",
									className: "mt-0.5 text-[10px] opacity-70",
									children: new Date(m._creationTime).toLocaleTimeString(void 0, {
										hour: "2-digit",
										minute: "2-digit"
									})
								})
							]
						})
					}, m._id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:374:8",
					"data-macaly-name": "div",
					ref: endRef
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:376:6",
			"data-macaly-name": "form",
			onSubmit: submit,
			className: "flex gap-2 border-t p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:377:8",
				"data-macaly-name": "Textarea",
				value: text,
				onChange: (e) => setText(e.target.value),
				placeholder: disabled ? "Messaging unavailable" : "Write a message…",
				disabled,
				rows: 1,
				maxLength: 2e3,
				className: "min-h-10 resize-none",
				onKeyDown: (e) => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault();
						submit(e);
					}
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:379:8",
				"data-macaly-name": "Button",
				type: "submit",
				size: "icon",
				disabled: busy || disabled || !text.trim(),
				"aria-label": "Send",
				className: "shrink-0 bg-brand text-brand-foreground hover:bg-brand/90",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
					"data-macaly-loc": "src/routes/event-deals/$dealId.tsx:379:174",
					"data-macaly-name": "Send",
					className: "size-4"
				})
			})]
		})]
	});
}
//#endregion
export { Page as component };
