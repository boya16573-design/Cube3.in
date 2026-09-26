import { S as Link, ht as __toESM, j as require_jsx_runtime, m as useQuery, p as useMutation, pt as require_react, t as api } from "./api-DJqU9p-G.js";
import { a as Button, d as ShieldAlert, n as EmptyState, o as cn, r as PageLoading, t as AppShell } from "./app-shell-BzN9KHqO.js";
import { t as ExternalLink } from "./external-link-Iz_tt-8E.js";
import { t as TriangleAlert } from "./triangle-alert-BRGHnlg4.js";
import { n as toast } from "./dist-B6VFZ26f.js";
import { a as formatBudget, o as formatCount, s as formatDate } from "./cube3-BhcyVTyu.js";
import { t as Badge } from "./badge-DLAy27x2.js";
import { t as Input } from "./input-DAWToyPJ.js";
import { t as Textarea } from "./textarea-Du1JR257.js";
//#region src/routes/admin.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function run(p, success) {
	try {
		const r = await p;
		if (!r.ok) toast.error(r.message);
		else toast.success(success);
		return r.ok;
	} catch (err) {
		console.error("admin action failed", err);
		toast.error("Action failed.");
		return false;
	}
}
function AdminPage() {
	const isAdmin = useQuery(api.admin.amIAdmin);
	const [tab, setTab] = (0, import_react.useState)("overview");
	if (isAdmin === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/admin.tsx:38:36",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
			"data-macaly-loc": "src/routes/admin.tsx:38:46",
			"data-macaly-name": "PageLoading"
		})
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/admin.tsx:40:23",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			"data-macaly-loc": "src/routes/admin.tsx:40:33",
			"data-macaly-name": "EmptyState",
			title: "Admins only",
			body: "You don't have access to this page.",
			cta: {
				to: "/",
				label: "Go home"
			}
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/admin.tsx:43:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/admin.tsx:44:6",
			"data-macaly-name": "div",
			className: "mx-auto max-w-5xl px-4 py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					"data-macaly-loc": "src/routes/admin.tsx:45:8",
					"data-macaly-name": "h1",
					className: "flex items-center gap-2 text-2xl font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
						"data-macaly-loc": "src/routes/admin.tsx:45:67",
						"data-macaly-name": "ShieldAlert",
						className: "size-6 text-brand"
					}), "Admin"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/routes/admin.tsx:46:8",
					"data-macaly-name": "div",
					className: "-mx-4 mt-4 flex gap-1 overflow-x-auto px-4 pb-1",
					children: [
						"overview",
						"verification",
						"reports",
						"users",
						"campaigns"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"data-macaly-loc": "src/routes/admin.tsx:48:12",
						"data-macaly-name": "button",
						onClick: () => setTab(t),
						className: cn("shrink-0 rounded-md px-3 py-1.5 text-sm font-medium capitalize", tab === t ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:bg-muted"),
						children: t === "reports" ? "Reports & disputes" : t
					}, t))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/admin.tsx:54:8",
					"data-macaly-name": "div",
					className: "mt-5",
					children: [
						tab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, {
							"data-macaly-loc": "src/routes/admin.tsx:55:33",
							"data-macaly-name": "Overview"
						}),
						tab === "verification" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Verification, {
							"data-macaly-loc": "src/routes/admin.tsx:56:37",
							"data-macaly-name": "Verification"
						}),
						tab === "reports" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reports, {
							"data-macaly-loc": "src/routes/admin.tsx:57:32",
							"data-macaly-name": "Reports"
						}),
						tab === "users" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
							"data-macaly-loc": "src/routes/admin.tsx:58:30",
							"data-macaly-name": "Users"
						}),
						tab === "campaigns" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campaigns, {
							"data-macaly-loc": "src/routes/admin.tsx:59:34",
							"data-macaly-name": "Campaigns"
						})
					]
				})
			]
		})
	});
}
function Overview() {
	const o = useQuery(api.admin.overview);
	if (!o) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/routes/admin.tsx:68:17",
		"data-macaly-name": "PageLoading"
	});
	if (!o.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/admin.tsx:69:20",
		"data-macaly-name": "p",
		className: "text-destructive",
		children: o.message
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-macaly-loc": "src/routes/admin.tsx:77:6",
		"data-macaly-name": "div",
		className: "grid grid-cols-2 gap-3 md:grid-cols-4",
		children: [
			["Creators", o.creators],
			["Brands", o.brands],
			["Active campaigns", o.activeCampaigns],
			["Collaborations", o.collaborations],
			["Completed", o.completedCollaborations],
			["Pending verifications", o.pendingVerifications],
			["Open reports", o.openReports]
		].map(([l, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/admin.tsx:79:10",
			"data-macaly-name": "div",
			className: "rounded-xl border p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/admin.tsx:80:12",
				"data-macaly-name": "p",
				className: "text-2xl font-bold",
				children: n >= o.cap ? `${o.cap}+` : n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/admin.tsx:81:12",
				"data-macaly-name": "p",
				className: "text-xs text-muted-foreground",
				children: l
			})]
		}, l))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/admin.tsx:85:6",
		"data-macaly-name": "p",
		className: "mt-4 text-xs text-muted-foreground",
		children: "Transactions: Cube3 doesn't process payments, so there are no transactions to monitor."
	})] });
}
function Verification() {
	const q = useQuery(api.admin.verificationQueue);
	const review = useMutation(api.admin.reviewVerification);
	const [notes, setNotes] = (0, import_react.useState)({});
	const [checked, setChecked] = (0, import_react.useState)({});
	if (!q) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/routes/admin.tsx:95:17",
		"data-macaly-name": "PageLoading"
	});
	if (!q.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/admin.tsx:96:20",
		"data-macaly-name": "p",
		className: "text-destructive",
		children: q.message
	});
	if (q.items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/admin.tsx:97:35",
		"data-macaly-name": "p",
		className: "text-sm text-muted-foreground",
		children: "No pending verification requests."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-macaly-loc": "src/routes/admin.tsx:100:4",
		"data-macaly-name": "ul",
		className: "grid gap-3",
		children: q.items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			"data-macaly-loc": "src/routes/admin.tsx:102:8",
			"data-macaly-name": "li",
			className: "grid gap-2 rounded-xl border p-4 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/admin.tsx:103:10",
					"data-macaly-name": "div",
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/routes/admin.tsx:104:12",
						"data-macaly-name": "p",
						className: "font-semibold",
						children: [
							r.user.name,
							" ",
							r.user.username && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-macaly-loc": "src/routes/admin.tsx:104:75",
								"data-macaly-name": "span",
								className: "font-normal text-muted-foreground",
								children: ["@", r.user.username]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						"data-macaly-loc": "src/routes/admin.tsx:105:12",
						"data-macaly-name": "Badge",
						variant: "secondary",
						children: r.kind === "brand" ? "Brand" : "Channel ownership"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/admin.tsx:107:10",
					"data-macaly-name": "p",
					className: "whitespace-pre-line text-muted-foreground",
					children: r.details
				}),
				r.kind === "social_account" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/admin.tsx:109:12",
					"data-macaly-name": "div",
					className: "rounded-lg bg-muted p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-macaly-loc": "src/routes/admin.tsx:110:14",
							"data-macaly-name": "p",
							children: ["1. Open the channel: ", r.accountUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								"data-macaly-loc": "src/routes/admin.tsx:111:16",
								"data-macaly-name": "a",
								href: r.accountUrl,
								target: "_blank",
								rel: "noopener noreferrer nofollow",
								className: "inline-flex items-center gap-1 break-all text-brand underline",
								children: [r.accountUrl, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
									"data-macaly-loc": "src/routes/admin.tsx:111:178",
									"data-macaly-name": "ExternalLink",
									className: "size-3"
								})]
							}) : "no link"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-macaly-loc": "src/routes/admin.tsx:113:14",
							"data-macaly-name": "p",
							children: ["2. Confirm the description/bio contains ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								"data-macaly-loc": "src/routes/admin.tsx:113:57",
								"data-macaly-name": "code",
								className: "font-mono font-bold",
								children: r.code
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-macaly-loc": "src/routes/admin.tsx:114:14",
							"data-macaly-name": "p",
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								"Creator-reported: ",
								formatCount(r.reportedFollowers),
								" followers · ",
								formatCount(r.reportedAvgViews),
								" avg views"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/admin.tsx:115:14",
							"data-macaly-name": "Input",
							className: "mt-2",
							inputMode: "numeric",
							placeholder: "Optional: follower count you saw on the public page",
							value: checked[r._id] ?? "",
							onChange: (e) => setChecked({
								...checked,
								[r._id]: e.target.value.replace(/\D/g, "")
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					"data-macaly-loc": "src/routes/admin.tsx:119:10",
					"data-macaly-name": "Textarea",
					rows: 2,
					placeholder: "Note (required to reject)",
					value: notes[r._id] ?? "",
					onChange: (e) => setNotes({
						...notes,
						[r._id]: e.target.value
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/admin.tsx:120:10",
					"data-macaly-name": "div",
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/admin.tsx:121:12",
						"data-macaly-name": "Button",
						size: "sm",
						className: "bg-success text-success-foreground hover:bg-success/90",
						onClick: () => run(review({
							requestId: r._id,
							decision: "approve",
							note: notes[r._id],
							checkedFollowers: checked[r._id] ? Number(checked[r._id]) : void 0
						}), "Approved"),
						children: "Approve"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/admin.tsx:125:12",
						"data-macaly-name": "Button",
						size: "sm",
						variant: "outline",
						onClick: () => run(review({
							requestId: r._id,
							decision: "reject",
							note: notes[r._id]
						}), "Rejected"),
						children: "Reject"
					})]
				})
			]
		}, r._id))
	});
}
function Reports() {
	const [status, setStatus] = (0, import_react.useState)("open");
	const q = useQuery(api.admin.reportsQueue, { status });
	const resolve = useMutation(api.admin.resolveReport);
	const suspend = useMutation(api.admin.setSuspended);
	const [notes, setNotes] = (0, import_react.useState)({});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/admin.tsx:140:4",
		"data-macaly-name": "div",
		className: "grid gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-macaly-loc": "src/routes/admin.tsx:141:6",
			"data-macaly-name": "div",
			className: "flex gap-2",
			children: [
				"open",
				"reviewed",
				"dismissed"
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/routes/admin.tsx:143:10",
				"data-macaly-name": "Button",
				size: "sm",
				variant: status === s ? "default" : "outline",
				onClick: () => setStatus(s),
				className: "capitalize",
				children: s
			}, s))
		}), !q ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
			"data-macaly-loc": "src/routes/admin.tsx:146:12",
			"data-macaly-name": "PageLoading"
		}) : !q.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-macaly-loc": "src/routes/admin.tsx:146:38",
			"data-macaly-name": "p",
			className: "text-destructive",
			children: q.message
		}) : q.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			"data-macaly-loc": "src/routes/admin.tsx:147:8",
			"data-macaly-name": "p",
			className: "text-sm text-muted-foreground",
			children: [
				"No ",
				status,
				" reports."
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			"data-macaly-loc": "src/routes/admin.tsx:149:8",
			"data-macaly-name": "ul",
			className: "grid gap-3",
			children: q.items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				"data-macaly-loc": "src/routes/admin.tsx:151:12",
				"data-macaly-name": "li",
				className: "grid gap-2 rounded-xl border p-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/admin.tsx:152:14",
						"data-macaly-name": "div",
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-macaly-loc": "src/routes/admin.tsx:153:16",
							"data-macaly-name": "p",
							className: "font-semibold",
							children: r.reason
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-macaly-loc": "src/routes/admin.tsx:154:16",
							"data-macaly-name": "span",
							className: "text-xs text-muted-foreground",
							children: formatDate(r._creationTime)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/routes/admin.tsx:156:14",
						"data-macaly-name": "p",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-macaly-loc": "src/routes/admin.tsx:157:16",
								"data-macaly-name": "span",
								className: "text-muted-foreground",
								children: "Reported:"
							}),
							" ",
							r.target.name,
							" (",
							r.target.role,
							")",
							r.target.suspended && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								"data-macaly-loc": "src/routes/admin.tsx:158:39",
								"data-macaly-name": "Badge",
								variant: "destructive",
								className: "ml-2",
								children: "Suspended"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/routes/admin.tsx:160:14",
						"data-macaly-name": "p",
						className: "text-muted-foreground",
						children: [
							"By ",
							r.reporter.name,
							" (",
							r.reporter.role,
							")"
						]
					}),
					r.campaignTitle && r.campaignId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/routes/admin.tsx:162:16",
						"data-macaly-name": "p",
						children: ["Campaign: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-macaly-loc": "src/routes/admin.tsx:162:29",
							"data-macaly-name": "Link",
							to: "/campaigns/$campaignId",
							params: { campaignId: r.campaignId },
							className: "text-brand underline",
							children: r.campaignTitle
						})]
					}),
					r.collaborationId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/admin.tsx:164:36",
						"data-macaly-name": "p",
						className: "text-xs text-muted-foreground",
						children: "Linked to a collaboration (dispute). Conversation contents stay private to participants."
					}),
					r.details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/admin.tsx:165:28",
						"data-macaly-name": "p",
						className: "whitespace-pre-line rounded bg-muted p-2",
						children: r.details
					}),
					r.priorReportsOnTarget > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/routes/admin.tsx:167:16",
						"data-macaly-name": "p",
						className: "inline-flex items-center gap-1 text-xs font-medium text-destructive",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
								"data-macaly-loc": "src/routes/admin.tsx:167:99",
								"data-macaly-name": "AlertTriangle",
								className: "size-3.5"
							}),
							r.priorReportsOnTarget,
							" open reports against this account"
						]
					}),
					r.reviewerNote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/routes/admin.tsx:169:33",
						"data-macaly-name": "p",
						className: "text-xs text-muted-foreground",
						children: ["Admin note: ", r.reviewerNote]
					}),
					status === "open" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						"data-macaly-loc": "src/routes/admin.tsx:172:18",
						"data-macaly-name": "Textarea",
						rows: 2,
						placeholder: "Admin note / suspension reason",
						value: notes[r._id] ?? "",
						onChange: (e) => setNotes({
							...notes,
							[r._id]: e.target.value
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/admin.tsx:173:18",
						"data-macaly-name": "div",
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-macaly-loc": "src/routes/admin.tsx:174:20",
								"data-macaly-name": "Button",
								size: "sm",
								variant: "outline",
								onClick: () => run(resolve({
									reportId: r._id,
									status: "reviewed",
									note: notes[r._id]
								}), "Marked reviewed"),
								children: "Mark reviewed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-macaly-loc": "src/routes/admin.tsx:175:20",
								"data-macaly-name": "Button",
								size: "sm",
								variant: "ghost",
								onClick: () => run(resolve({
									reportId: r._id,
									status: "dismissed",
									note: notes[r._id]
								}), "Dismissed"),
								children: "Dismiss"
							}),
							!r.target.suspended && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-macaly-loc": "src/routes/admin.tsx:177:22",
								"data-macaly-name": "Button",
								size: "sm",
								variant: "destructive",
								onClick: async () => {
									if (!confirm(`Suspend ${r.target.name}?`)) return;
									if (await run(suspend({
										userId: r.targetUserId,
										suspended: true,
										reason: notes[r._id]
									}), "Account suspended")) await run(resolve({
										reportId: r._id,
										status: "reviewed",
										note: `Suspended: ${notes[r._id] ?? ""}`
									}), "Report closed");
								},
								children: "Suspend account"
							})
						]
					})] })
				]
			}, r._id))
		})]
	});
}
function Users() {
	const [text, setText] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)();
	const q = useQuery(api.admin.searchUsers, {
		text: text || void 0,
		role
	});
	const suspend = useMutation(api.admin.setSuspended);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/admin.tsx:200:4",
		"data-macaly-name": "div",
		className: "grid gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				"data-macaly-loc": "src/routes/admin.tsx:201:6",
				"data-macaly-name": "Input",
				placeholder: "Search username or name",
				value: text,
				onChange: (e) => setText(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/routes/admin.tsx:202:6",
				"data-macaly-name": "div",
				className: "flex gap-2",
				children: [
					void 0,
					"creator",
					"brand"
				].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/admin.tsx:204:10",
					"data-macaly-name": "Button",
					size: "sm",
					variant: role === r ? "default" : "outline",
					onClick: () => setRole(r),
					className: "capitalize",
					children: r ?? "All"
				}, r ?? "all"))
			}),
			!q ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
				"data-macaly-loc": "src/routes/admin.tsx:207:12",
				"data-macaly-name": "PageLoading"
			}) : !q.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/admin.tsx:207:38",
				"data-macaly-name": "p",
				className: "text-destructive",
				children: q.message
			}) : q.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/admin.tsx:207:111",
				"data-macaly-name": "p",
				className: "text-sm text-muted-foreground",
				children: "No users found."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-macaly-loc": "src/routes/admin.tsx:208:8",
				"data-macaly-name": "ul",
				className: "divide-y rounded-xl border",
				children: q.items.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					"data-macaly-loc": "src/routes/admin.tsx:210:12",
					"data-macaly-name": "li",
					className: "flex flex-wrap items-center justify-between gap-2 p-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/admin.tsx:211:14",
						"data-macaly-name": "div",
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-macaly-loc": "src/routes/admin.tsx:212:16",
								"data-macaly-name": "p",
								className: "font-medium",
								children: [
									u.name,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-macaly-loc": "src/routes/admin.tsx:212:52",
										"data-macaly-name": "span",
										className: "text-muted-foreground",
										children: ["@", u.username]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-macaly-loc": "src/routes/admin.tsx:213:16",
								"data-macaly-name": "p",
								className: "text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-macaly-loc": "src/routes/admin.tsx:214:18",
										"data-macaly-name": "span",
										className: "capitalize",
										children: u.role
									}),
									" · joined ",
									formatDate(u.createdAt),
									u.verified ? " · verified" : "",
									u.suspended && ` · suspended: ${u.suspendedReason ?? ""}`
								]
							}),
							u.riskSignals.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								"data-macaly-loc": "src/routes/admin.tsx:218:18",
								"data-macaly-name": "ul",
								className: "mt-1 grid gap-0.5",
								children: u.riskSignals.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									"data-macaly-loc": "src/routes/admin.tsx:220:22",
									"data-macaly-name": "li",
									className: "flex items-start gap-1 text-xs text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
										"data-macaly-loc": "src/routes/admin.tsx:220:94",
										"data-macaly-name": "AlertTriangle",
										className: "mt-0.5 size-3 shrink-0"
									}), r]
								}, r))
							})
						]
					}), u.suspended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/admin.tsx:226:16",
						"data-macaly-name": "Button",
						size: "sm",
						variant: "outline",
						onClick: () => run(suspend({
							userId: u.userId,
							suspended: false
						}), "Account restored"),
						children: "Restore"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/admin.tsx:228:16",
						"data-macaly-name": "Button",
						size: "sm",
						variant: "destructive",
						onClick: () => {
							const reason = prompt(`Reason for suspending ${u.name}?`);
							if (reason) run(suspend({
								userId: u.userId,
								suspended: true,
								reason
							}), "Account suspended");
						},
						children: "Suspend"
					})]
				}, u.userId))
			})
		]
	});
}
function Campaigns() {
	const q = useQuery(api.admin.recentCampaigns);
	const close = useMutation(api.admin.closeCampaign);
	if (!q) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/routes/admin.tsx:244:17",
		"data-macaly-name": "PageLoading"
	});
	if (!q.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/admin.tsx:245:20",
		"data-macaly-name": "p",
		className: "text-destructive",
		children: q.message
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-macaly-loc": "src/routes/admin.tsx:247:4",
		"data-macaly-name": "ul",
		className: "grid gap-3",
		children: q.items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			"data-macaly-loc": "src/routes/admin.tsx:249:8",
			"data-macaly-name": "li",
			className: "grid gap-2 rounded-xl border p-4 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/admin.tsx:250:10",
					"data-macaly-name": "div",
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/routes/admin.tsx:251:12",
						"data-macaly-name": "Link",
						to: "/campaigns/$campaignId",
						params: { campaignId: c._id },
						className: "font-semibold hover:underline",
						children: c.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						"data-macaly-loc": "src/routes/admin.tsx:252:12",
						"data-macaly-name": "Badge",
						variant: c.status === "active" ? "default" : "outline",
						className: "capitalize",
						children: c.status
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-macaly-loc": "src/routes/admin.tsx:254:10",
					"data-macaly-name": "p",
					className: "text-muted-foreground",
					children: [
						c.brand.name,
						" · ",
						formatBudget(c.budgetMinInr, c.budgetMaxInr, c.currency),
						" · ",
						formatDate(c._creationTime)
					]
				}),
				c.flags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/routes/admin.tsx:256:12",
					"data-macaly-name": "div",
					className: "flex flex-wrap gap-1.5",
					children: c.flags.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						"data-macaly-loc": "src/routes/admin.tsx:257:34",
						"data-macaly-name": "Badge",
						variant: f === "Unverified brand" ? "outline" : "destructive",
						children: f
					}, f))
				}),
				c.status === "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/admin.tsx:261:12",
					"data-macaly-name": "Button",
					size: "sm",
					variant: "outline",
					className: "justify-self-start",
					onClick: () => {
						const reason = prompt("Reason for closing this campaign? (sent to the brand)");
						if (reason) run(close({
							campaignId: c._id,
							reason
						}), "Campaign closed");
					},
					children: "Close campaign"
				})
			]
		}, c._id))
	});
}
//#endregion
export { AdminPage as component };
