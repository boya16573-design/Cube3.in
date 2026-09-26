import { A as Link, Ct as __toESM, S as useQuery, n as cn, s as api, t as Button, x as useMutation, xt as require_react, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { i as RequireProfile, n as EmptyState, r as PageLoading, t as AppShell } from "./app-shell-GoO9XvM6.js";
import { t as usePaginatedQuery } from "./use_paginated_query-CmHnku-B.js";
import { a as Send, c as ArrowLeft, i as DropdownMenuTrigger, n as DropdownMenuContent, o as EllipsisVertical, r as DropdownMenuItem, s as Ban, t as DropdownMenu } from "./dropdown-menu-D0WYJVdO.js";
import { t as ExternalLink } from "./external-link-r8XcJ03L.js";
import { n as Flag, t as ReportDialog } from "./report-dialog-Da0j6I8b.js";
import { t as Plus } from "./plus-BzcJQXl5.js";
import { t as TriangleAlert } from "./triangle-alert-BxrMt5YS.js";
import { t as X } from "./x-CskuAKXe.js";
import { n as toast } from "./dist-Dfgjbbc_.js";
import { a as formatBudget, c as formatInr, s as formatDate } from "./cube3-xqG2XCU7.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-P9E-Q0K0.js";
import { t as Label } from "./label-DdaoZkXu.js";
import { t as Route } from "./_collaborationId-B-oWShJ_.js";
import { t as Input } from "./input-BQJAkDLz.js";
import { t as Textarea } from "./textarea-CLFmgltT.js";
import { n as PriceGuidanceCard } from "./apply-helpers-AlRB4UGk.js";
import { n as StatusStepper, t as StatusPill } from "./collab-status-D7ibcmqR.js";
//#region src/routes/collab/$collaborationId.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CollabPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:26:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireProfile, {
			"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:27:6",
			"data-macaly-name": "RequireProfile",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collab, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:28:8",
				"data-macaly-name": "Collab"
			})
		})
	});
}
function Collab() {
	const { collaborationId } = Route.useParams();
	const id = collaborationId;
	const data = useQuery(api.collabs.get, { collaborationId: id });
	const markRead = useMutation(api.collabs.markRead);
	const [offerOpen, setOfferOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (data) markRead({ collaborationId: id });
	}, [
		data?._id,
		data?.status,
		data?.offers.length,
		id,
		markRead
	]);
	if (data === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:47:33",
		"data-macaly-name": "PageLoading"
	});
	if (data === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:48:28",
		"data-macaly-name": "EmptyState",
		title: "Conversation not found",
		body: "It doesn't exist or you don't have access.",
		cta: {
			to: "/inbox",
			label: "Back to inbox"
		}
	});
	const pending = [...data.offers].reverse().find((o) => o.status === "pending");
	const canOffer = !data.blocked && (data.status === "discussion" || data.status === "offer") && (data.myRole === "brand" || data.offers.some((o) => o.fromRole === "brand"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:55:4",
		"data-macaly-name": "div",
		className: "mx-auto flex max-w-3xl flex-col gap-4 px-4 py-4 md:py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:56:6",
				"data-macaly-name": "Header",
				data
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusStepper, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:57:6",
				"data-macaly-name": "StatusStepper",
				status: data.status
			}),
			data.agreedFeeInr !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgreedTerms, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:59:42",
				"data-macaly-name": "AgreedTerms",
				data
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkflowPanel, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:60:6",
				"data-macaly-name": "WorkflowPanel",
				data
			}),
			pending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:62:18",
				"data-macaly-name": "OfferCard",
				offer: pending,
				currency: data.campaign.currency,
				onCounter: () => setOfferOpen(true)
			}),
			canOffer && !pending?.mine && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:65:8",
				"data-macaly-name": "Button",
				variant: "outline",
				onClick: () => setOfferOpen(true),
				className: "self-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
					"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:66:10",
					"data-macaly-name": "Plus",
					className: "size-4"
				}), pending ? "Counter offer" : data.myRole === "brand" ? data.offers.length ? "Send new offer" : "Send offer" : "Send counteroffer"]
			}),
			data.offers.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferHistory, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:71:33",
				"data-macaly-name": "OfferHistory",
				offers: data.offers,
				currency: data.campaign.currency
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thread, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:73:6",
				"data-macaly-name": "Thread",
				collaborationId: id,
				blocked: data.blocked,
				status: data.status
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferDialog, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:75:6",
				"data-macaly-name": "OfferDialog",
				open: offerOpen,
				onOpenChange: setOfferOpen,
				collaborationId: id,
				isCounter: !!pending,
				defaults: {
					fee: pending?.feeInr ?? data.campaign.budgetMinInr,
					deliverables: pending?.deliverables ?? data.campaign.deliverables,
					deadline: pending?.deadline ?? ""
				},
				budgetHint: formatBudget(data.campaign.budgetMinInr, data.campaign.budgetMaxInr, data.campaign.currency),
				currency: data.campaign.currency,
				guidanceCampaignId: data.myRole === "creator" ? data.campaign._id : void 0
			})
		]
	});
}
function Header({ data }) {
	const setBlocked = useMutation(api.collabs.setBlocked);
	const cancel = useMutation(api.collabs.cancel);
	const [reportOpen, setReportOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:98:4",
		"data-macaly-name": "div",
		className: "flex items-start justify-between gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:99:6",
				"data-macaly-name": "div",
				className: "flex min-w-0 items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:100:8",
					"data-macaly-name": "Button",
					asChild: true,
					variant: "ghost",
					size: "icon",
					className: "-ml-2 shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:100:79",
						"data-macaly-name": "Link",
						to: "/inbox",
						"aria-label": "Back to inbox",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:100:124",
							"data-macaly-name": "ArrowLeft",
							className: "size-5"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:101:8",
					"data-macaly-name": "div",
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:102:10",
						"data-macaly-name": "h1",
						className: "truncate text-lg font-bold",
						children: data.counterpart.username ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:104:14",
							"data-macaly-name": "Link",
							to: "/c/$username",
							params: { username: data.counterpart.username },
							className: "hover:underline",
							children: data.counterpart.name
						}) : data.counterpart.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:107:10",
						"data-macaly-name": "Link",
						to: "/campaigns/$campaignId",
						params: { campaignId: data.campaign._id },
						className: "block truncate text-sm text-muted-foreground hover:underline",
						children: data.campaign.title
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:112:6",
				"data-macaly-name": "div",
				className: "flex shrink-0 items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
					"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:113:8",
					"data-macaly-name": "StatusPill",
					status: data.status
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, {
					"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:114:8",
					"data-macaly-name": "DropdownMenu",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:115:10",
						"data-macaly-name": "DropdownMenuTrigger",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:115:39",
							"data-macaly-name": "Button",
							variant: "ghost",
							size: "icon",
							"aria-label": "More actions",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, {
								"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:115:101",
								"data-macaly-name": "MoreVertical",
								className: "size-4"
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:116:10",
						"data-macaly-name": "DropdownMenuContent",
						align: "end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:117:12",
								"data-macaly-name": "DropdownMenuItem",
								onClick: () => setReportOpen(true),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
										"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:117:66",
										"data-macaly-name": "Flag",
										className: "size-4"
									}),
									"Report ",
									data.counterpart.role
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:118:12",
								"data-macaly-name": "DropdownMenuItem",
								onClick: async () => {
									const r = await setBlocked({
										userId: data.counterpart.userId,
										blocked: !data.blockedByMe
									});
									if (!r.ok) toast.error(r.message);
									else toast.success(data.blockedByMe ? "Unblocked" : "Blocked — they can't message you");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {
									"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:125:14",
									"data-macaly-name": "Ban",
									className: "size-4"
								}), data.blockedByMe ? "Unblock" : "Block"]
							}),
							(data.status === "discussion" || data.status === "offer") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:128:14",
								"data-macaly-name": "DropdownMenuItem",
								onClick: async () => {
									if (!confirm("End this conversation? Pending offers will be withdrawn.")) return;
									const r = await cancel({ collaborationId: data._id });
									if (!r.ok) toast.error(r.message);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:135:16",
									"data-macaly-name": "X",
									className: "size-4"
								}), "End conversation"]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportDialog, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:141:6",
				"data-macaly-name": "ReportDialog",
				open: reportOpen,
				onOpenChange: setReportOpen,
				targetUserId: data.counterpart.userId,
				collaborationId: data._id,
				targetRole: data.counterpart.role
			})
		]
	});
}
function AgreedTerms({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:148:4",
		"data-macaly-name": "div",
		className: "rounded-xl border border-success bg-success/5 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:149:6",
				"data-macaly-name": "p",
				className: "text-xs font-semibold uppercase tracking-wide text-success",
				children: "Agreed terms"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:150:6",
				"data-macaly-name": "p",
				className: "mt-1 text-xl font-bold",
				children: formatInr(data.agreedFeeInr, data.campaign.currency)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:151:6",
				"data-macaly-name": "ul",
				className: "mt-1 list-inside list-disc text-sm",
				children: data.agreedDeliverables?.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:151:97",
					"data-macaly-name": "li",
					children: d
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:152:6",
				"data-macaly-name": "p",
				className: "mt-1 text-sm text-muted-foreground",
				children: ["Deadline: ", data.agreedDeadline]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:153:6",
				"data-macaly-name": "p",
				className: "mt-2 text-[11px] text-muted-foreground",
				children: "Payment is arranged directly between brand and creator. Cube3 does not process payments yet."
			})
		]
	});
}
function WorkflowPanel({ data }) {
	const startWork = useMutation(api.collabs.startWork);
	const submit = useMutation(api.collabs.submitContent);
	const review = useMutation(api.collabs.reviewContent);
	const complete = useMutation(api.collabs.complete);
	const [url, setUrl] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [changes, setChanges] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function run(p, success) {
		setBusy(true);
		try {
			const r = await p;
			if (!r.ok) toast.error(r.message);
			else toast.success(success);
		} catch (err) {
			console.error("workflow action failed", err);
			toast.error("Something went wrong.");
		} finally {
			setBusy(false);
		}
	}
	const s = data.status;
	const creator = data.myRole === "creator";
	const submission = data.submissionUrl && (s === "content_submitted" || s === "approved" || s === "completed") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:186:4",
		"data-macaly-name": "div",
		className: "rounded-lg bg-muted p-3 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:187:6",
				"data-macaly-name": "p",
				className: "font-medium",
				children: "Submitted content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:188:6",
				"data-macaly-name": "a",
				href: data.submissionUrl,
				target: "_blank",
				rel: "noopener noreferrer nofollow ugc",
				className: "mt-1 inline-flex items-center gap-1 break-all text-brand hover:underline",
				children: [data.submissionUrl, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
					"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:189:28",
					"data-macaly-name": "ExternalLink",
					className: "size-3.5 shrink-0"
				})]
			}),
			data.submissionNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:191:30",
				"data-macaly-name": "p",
				className: "mt-1 whitespace-pre-line text-muted-foreground",
				children: data.submissionNote
			})
		]
	});
	let body = null;
	if (s === "accepted" && creator) body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:199:8",
		"data-macaly-name": "p",
		className: "text-sm",
		children: "Terms are agreed. Start when you begin creating the content."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:200:8",
		"data-macaly-name": "Button",
		disabled: busy,
		onClick: () => run(startWork({ collaborationId: data._id }), "Marked as in progress"),
		className: "bg-brand text-brand-foreground hover:bg-brand/90",
		children: "Start work"
	})] });
	else if (s === "accepted") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:204:11",
		"data-macaly-name": "p",
		className: "text-sm text-muted-foreground",
		children: "Waiting for the creator to start work."
	});
	else if (s === "in_progress" && creator) body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:207:6",
		"data-macaly-name": "form",
		className: "grid gap-2",
		onSubmit: (e) => {
			e.preventDefault();
			run(submit({
				collaborationId: data._id,
				url,
				note: note || void 0
			}), "Submitted for review");
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:208:8",
				"data-macaly-name": "p",
				className: "text-sm font-medium",
				children: "Submit content for approval"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:209:8",
				"data-macaly-name": "Input",
				type: "url",
				placeholder: "https:// link to draft or published video/post",
				value: url,
				onChange: (e) => setUrl(e.target.value),
				required: true,
				maxLength: 500
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:210:8",
				"data-macaly-name": "Textarea",
				placeholder: "Notes for the brand (optional)",
				value: note,
				onChange: (e) => setNote(e.target.value),
				rows: 2,
				maxLength: 1e3
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:211:8",
				"data-macaly-name": "Button",
				type: "submit",
				disabled: busy,
				className: "bg-brand text-brand-foreground hover:bg-brand/90",
				children: "Submit content"
			})
		]
	});
	else if (s === "in_progress") body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:215:11",
		"data-macaly-name": "p",
		className: "text-sm text-muted-foreground",
		children: "The creator is working on the content."
	});
	else if (s === "content_submitted" && !creator) body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		submission,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:220:8",
			"data-macaly-name": "div",
			className: "flex flex-wrap gap-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:221:10",
				"data-macaly-name": "Button",
				disabled: busy,
				onClick: () => run(review({
					collaborationId: data._id,
					decision: "approve"
				}), "Content approved"),
				className: "bg-success text-success-foreground hover:bg-success/90",
				children: "Approve content"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:223:8",
			"data-macaly-name": "div",
			className: "grid gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:224:10",
				"data-macaly-name": "Textarea",
				placeholder: "What should the creator change?",
				value: changes,
				onChange: (e) => setChanges(e.target.value),
				rows: 2,
				maxLength: 1e3
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:225:10",
				"data-macaly-name": "Button",
				variant: "outline",
				disabled: busy || !changes.trim(),
				onClick: () => run(review({
					collaborationId: data._id,
					decision: "request_changes",
					note: changes
				}), "Changes requested"),
				children: "Request changes"
			})]
		})
	] });
	else if (s === "content_submitted") body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [submission, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:230:25",
		"data-macaly-name": "p",
		className: "text-sm text-muted-foreground",
		children: "Waiting for the brand to review your content."
	})] });
	else if (s === "approved" && !creator) body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		submission,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:235:8",
			"data-macaly-name": "p",
			className: "text-sm",
			children: "Content approved. Mark the collaboration complete once everything is live."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:236:8",
			"data-macaly-name": "Button",
			disabled: busy,
			onClick: () => run(complete({ collaborationId: data._id }), "Collaboration completed"),
			className: "bg-success text-success-foreground hover:bg-success/90",
			children: "Mark complete"
		})
	] });
	else if (s === "approved") body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [submission, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:240:25",
		"data-macaly-name": "p",
		className: "text-sm text-muted-foreground",
		children: "Approved! The brand will mark the collaboration complete."
	})] });
	else if (s === "completed") body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [submission, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:242:25",
		"data-macaly-name": "p",
		className: "text-sm font-medium text-success",
		children: "This collaboration is complete. 🎉"
	})] });
	if (!body) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:246:9",
		"data-macaly-name": "div",
		className: "grid gap-3 rounded-xl border p-4",
		children: body
	});
}
function OfferCard({ offer, onCounter, currency }) {
	const respond = useMutation(api.collabs.respondToOffer);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function act(action) {
		if (action === "accept" && !confirm(`Accept ${formatInr(offer.feeInr, currency)} for these deliverables?`)) return;
		setBusy(true);
		try {
			const r = await respond({
				offerId: offer._id,
				action
			});
			if (!r.ok) toast.error(r.message);
			else toast.success(action === "accept" ? "Offer accepted!" : "Offer declined");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:266:4",
		"data-macaly-name": "div",
		className: "rounded-xl border-2 border-warning p-4",
		"data-testid": "pending-offer",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:267:6",
				"data-macaly-name": "p",
				className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
				children: offer.mine ? "Your offer · waiting for response" : `Offer from ${offer.fromRole}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:270:6",
				"data-macaly-name": "p",
				className: "mt-1 text-2xl font-bold",
				children: formatInr(offer.feeInr, currency)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:271:6",
				"data-macaly-name": "ul",
				className: "mt-1 list-inside list-disc text-sm",
				children: offer.deliverables.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:271:91",
					"data-macaly-name": "li",
					children: d
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:272:6",
				"data-macaly-name": "p",
				className: "mt-1 text-sm text-muted-foreground",
				children: ["Deadline: ", offer.deadline]
			}),
			offer.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:273:21",
				"data-macaly-name": "p",
				className: "mt-2 whitespace-pre-line text-sm",
				children: offer.note
			}),
			!offer.mine && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:275:8",
				"data-macaly-name": "div",
				className: "mt-4 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:276:10",
						"data-macaly-name": "Button",
						disabled: busy,
						onClick: () => act("accept"),
						className: "bg-success text-success-foreground hover:bg-success/90",
						children: "Accept"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:277:10",
						"data-macaly-name": "Button",
						disabled: busy,
						variant: "outline",
						onClick: onCounter,
						children: "Counter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:278:10",
						"data-macaly-name": "Button",
						disabled: busy,
						variant: "ghost",
						onClick: () => act("decline"),
						children: "Decline"
					})
				]
			})
		]
	});
}
function OfferHistory({ offers, currency }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:287:4",
		"data-macaly-name": "details",
		className: "rounded-xl border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
			"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:288:6",
			"data-macaly-name": "summary",
			className: "cursor-pointer text-sm font-medium",
			children: [
				"Offer history (",
				offers.length,
				")"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:289:6",
			"data-macaly-name": "ol",
			className: "mt-3 grid gap-2",
			children: offers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:291:10",
				"data-macaly-name": "li",
				className: "flex items-center justify-between gap-3 rounded-lg bg-muted/60 p-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:292:12",
					"data-macaly-name": "span",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:293:14",
							"data-macaly-name": "span",
							className: "font-medium capitalize",
							children: o.mine ? "You" : o.fromRole
						}),
						" · ",
						formatInr(o.feeInr, currency),
						" · by ",
						o.deadline,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:294:14",
							"data-macaly-name": "span",
							className: "block text-xs text-muted-foreground",
							children: formatDate(o._creationTime)
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:296:12",
					"data-macaly-name": "span",
					className: cn("rounded-full px-2 py-0.5 text-xs capitalize", o.status === "accepted" ? "bg-success text-success-foreground" : "bg-background"),
					children: o.status
				})]
			}, o._id))
		})]
	});
}
function OfferDialog({ open, onOpenChange, collaborationId, isCounter, defaults, budgetHint, guidanceCampaignId, currency }) {
	const send = useMutation(api.collabs.sendOffer);
	const [fee, setFee] = (0, import_react.useState)("");
	const [deliverables, setDeliverables] = (0, import_react.useState)([]);
	const [newD, setNewD] = (0, import_react.useState)("");
	const [deadline, setDeadline] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setFee(defaults.fee ? String(defaults.fee) : "");
		setDeliverables(defaults.deliverables);
		setDeadline(defaults.deadline);
		setNote("");
	}, [open]);
	async function submit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			const r = await send({
				collaborationId,
				feeInr: Number(fee),
				deliverables,
				deadline,
				note: note || void 0
			});
			if (!r.ok) return void toast.error(r.message);
			toast.success(isCounter ? "Counteroffer sent" : "Offer sent");
			onOpenChange(false);
		} catch (err) {
			console.error("send offer failed", err);
			toast.error("Couldn't send offer.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:349:4",
		"data-macaly-name": "Dialog",
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:350:6",
			"data-macaly-name": "DialogContent",
			className: "max-h-[90dvh] overflow-y-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:351:8",
				"data-macaly-name": "form",
				onSubmit: submit,
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:352:10",
						"data-macaly-name": "DialogHeader",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:353:12",
							"data-macaly-name": "DialogTitle",
							children: isCounter ? "Counteroffer" : "Send an offer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:354:12",
							"data-macaly-name": "DialogDescription",
							children: [
								"Campaign budget: ",
								budgetHint,
								". Both sides keep a full offer history."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:356:10",
						"data-macaly-name": "div",
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:357:12",
							"data-macaly-name": "Label",
							htmlFor: "fee",
							children: [
								"Fee (",
								currency,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:358:12",
							"data-macaly-name": "Input",
							id: "fee",
							inputMode: "numeric",
							value: fee,
							onChange: (e) => setFee(e.target.value.replace(/\D/g, "")),
							required: true
						})]
					}),
					guidanceCampaignId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceGuidanceCard, {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:360:33",
						"data-macaly-name": "PriceGuidanceCard",
						campaignId: guidanceCampaignId,
						onUse: (n) => setFee(String(n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:361:10",
						"data-macaly-name": "div",
						className: "grid gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:362:12",
								"data-macaly-name": "Label",
								children: "Deliverables"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:363:12",
								"data-macaly-name": "ul",
								className: "grid gap-1.5",
								children: deliverables.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:365:16",
									"data-macaly-name": "li",
									className: "flex items-center justify-between rounded-md border px-2.5 py-1.5 text-sm",
									children: [d, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:367:18",
										"data-macaly-name": "button",
										type: "button",
										"aria-label": "Remove",
										onClick: () => setDeliverables(deliverables.filter((_, j) => j !== i)),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
											"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:367:132",
											"data-macaly-name": "X",
											className: "size-4"
										})
									})]
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:371:12",
								"data-macaly-name": "div",
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:372:14",
									"data-macaly-name": "Input",
									value: newD,
									onChange: (e) => setNewD(e.target.value),
									placeholder: "e.g. 1 Instagram Story",
									maxLength: 160
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:373:14",
									"data-macaly-name": "Button",
									type: "button",
									variant: "secondary",
									onClick: () => {
										if (newD.trim()) {
											setDeliverables([...deliverables, newD.trim()]);
											setNewD("");
										}
									},
									children: "Add"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:376:10",
						"data-macaly-name": "div",
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:377:12",
							"data-macaly-name": "Label",
							htmlFor: "dl",
							children: "Deadline"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:378:12",
							"data-macaly-name": "Input",
							id: "dl",
							type: "date",
							value: deadline,
							onChange: (e) => setDeadline(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:380:10",
						"data-macaly-name": "div",
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:381:12",
							"data-macaly-name": "Label",
							htmlFor: "note",
							children: "Note (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:382:12",
							"data-macaly-name": "Textarea",
							id: "note",
							rows: 2,
							value: note,
							onChange: (e) => setNote(e.target.value),
							maxLength: 1e3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:384:10",
						"data-macaly-name": "DialogFooter",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:385:12",
							"data-macaly-name": "Button",
							type: "submit",
							disabled: busy || deliverables.length === 0,
							className: "bg-brand text-brand-foreground hover:bg-brand/90",
							children: busy ? "Sending…" : isCounter ? "Send counteroffer" : "Send offer"
						})
					})
				]
			})
		})
	});
}
function Thread({ collaborationId, blocked, status }) {
	const { results, status: pageStatus, loadMore } = usePaginatedQuery(api.collabs.messages, { collaborationId }, { initialNumItems: 40 });
	const send = useMutation(api.collabs.sendMessage);
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
				collaborationId,
				body: text
			});
			if (!r.ok) return void toast.error(r.message);
			setText("");
		} catch (err) {
			console.error("send message failed", err);
			toast.error("Message not sent.");
		} finally {
			setBusy(false);
		}
	}
	const disabled = blocked || status === "cancelled";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:426:4",
		"data-macaly-name": "section",
		className: "flex flex-col rounded-xl border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:427:6",
			"data-macaly-name": "div",
			className: "max-h-[55dvh] min-h-48 overflow-y-auto p-3",
			"data-state": pageStatus === "LoadingFirstPage" ? "loading" : "ready",
			children: [
				pageStatus === "CanLoadMore" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:429:10",
					"data-macaly-name": "button",
					className: "mb-2 w-full text-center text-xs text-muted-foreground underline",
					onClick: () => loadMore(40),
					children: "Load earlier messages"
				}),
				ordered.length === 0 && pageStatus !== "LoadingFirstPage" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:432:10",
					"data-macaly-name": "p",
					className: "py-8 text-center text-sm text-muted-foreground",
					children: "No messages yet. Say hello 👋"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:434:8",
					"data-macaly-name": "ul",
					className: "grid gap-2",
					children: ordered.map((m) => m.kind === "system" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:437:14",
						"data-macaly-name": "li",
						className: "mx-auto max-w-[90%] rounded-full bg-muted px-3 py-1 text-center text-xs text-muted-foreground",
						children: m.body
					}, m._id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:439:14",
						"data-macaly-name": "li",
						className: cn("flex", m.mine ? "justify-end" : "justify-start"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:440:16",
							"data-macaly-name": "div",
							className: cn("max-w-[80%] rounded-2xl px-3 py-2 text-sm", m.kind === "offer" && "border-2 border-warning bg-background text-foreground", m.kind === "text" && (m.mine ? "bg-brand text-brand-foreground" : "bg-muted")),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:446:18",
									"data-macaly-name": "p",
									className: "whitespace-pre-line break-words",
									children: m.body
								}),
								m.riskFlag && !m.mine && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:448:20",
									"data-macaly-name": "p",
									className: "mt-1.5 flex items-start gap-1 rounded-md bg-destructive/10 p-1.5 text-[11px] font-medium text-destructive",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
											"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:449:22",
											"data-macaly-name": "AlertTriangle",
											className: "mt-0.5 size-3 shrink-0"
										}),
										m.riskFlag,
										" If this feels wrong, use Report in the menu."
									]
								}),
								m.hasLink && !m.mine && !m.riskFlag && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:453:20",
									"data-macaly-name": "p",
									className: "mt-1 flex items-center gap-1 text-[11px] opacity-80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
										"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:454:22",
										"data-macaly-name": "AlertTriangle",
										className: "size-3"
									}), "Contains a link. Never share passwords or pay outside agreed terms."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:457:18",
									"data-macaly-name": "p",
									className: "mt-0.5 text-[10px] opacity-70",
									children: new Date(m._creationTime).toLocaleTimeString("en-IN", {
										hour: "2-digit",
										minute: "2-digit"
									})
								})
							]
						})
					}, m._id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:463:8",
					"data-macaly-name": "div",
					ref: endRef
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:465:6",
			"data-macaly-name": "form",
			onSubmit: submit,
			className: "flex gap-2 border-t p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:466:8",
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
				"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:476:8",
				"data-macaly-name": "Button",
				type: "submit",
				size: "icon",
				disabled: busy || disabled || !text.trim(),
				"aria-label": "Send",
				className: "shrink-0 bg-brand text-brand-foreground hover:bg-brand/90",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
					"data-macaly-loc": "src/routes/collab/$collaborationId.tsx:477:10",
					"data-macaly-name": "Send",
					className: "size-4"
				})
			})]
		})]
	});
}
//#endregion
export { CollabPage as component };
