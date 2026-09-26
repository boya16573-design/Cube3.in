import { S as Link, ht as __toESM, j as require_jsx_runtime, m as useQuery, p as useMutation, pt as require_react, t as api } from "./api-DJqU9p-G.js";
import { t as useNavigate } from "./useNavigate-_yYfcLdj.js";
import { a as Button, n as EmptyState, o as cn, p as MessageSquare, r as PageLoading, t as AppShell } from "./app-shell-BzN9KHqO.js";
import { t as usePreloadedQuery } from "./hydration-BRMOaqr7.js";
import { t as BadgeCheck } from "./badge-check-grlmTD77.js";
import { i as BookmarkCheck, r as Bookmark } from "./save-creator-button-CtJtCU8m.js";
import { i as Calendar, n as MatchBadge, r as MatchReasons } from "./campaign-card-C_ZyglTr.js";
import { i as Flag, n as PriceGuidanceCard, r as ReportDialog, t as PitchHelper } from "./apply-helpers-DrNiHFJO.js";
import { t as MapPin } from "./map-pin-DphV8733.js";
import { n as toast } from "./dist-B6VFZ26f.js";
import { a as formatBudget, c as formatInr, i as daysLeft, l as platformLabel, o as formatCount, s as formatDate } from "./cube3-BhcyVTyu.js";
import { t as Route } from "./_campaignId-BfcFN9Xh.js";
import { t as Label } from "./label-BFLP22M6.js";
import { t as Badge } from "./badge-DLAy27x2.js";
import { t as Input } from "./input-DAWToyPJ.js";
import { t as Textarea } from "./textarea-Du1JR257.js";
import { t as CreatorCard } from "./creator-card-BbRuZEit.js";
//#region src/components/campaign-actions.tsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Brand: open (or create) the conversation with an applicant. */
function MessageApplicant({ applicationId }) {
	const open = useMutation(api.collabs.openFromApplication);
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		"data-macaly-loc": "src/components/campaign-actions.tsx:18:4",
		"data-macaly-name": "Button",
		size: "sm",
		variant: "outline",
		disabled: busy,
		onClick: async () => {
			setBusy(true);
			try {
				const r = await open({ applicationId });
				if (!r.ok) return void toast.error(r.message);
				navigate({
					to: "/collab/$collaborationId",
					params: { collaborationId: r.collaborationId }
				});
			} finally {
				setBusy(false);
			}
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
			"data-macaly-loc": "src/components/campaign-actions.tsx:33:6",
			"data-macaly-name": "MessageSquare",
			className: "size-4"
		}), "Message / Offer"]
	});
}
/** Creator: link to the conversation once the brand opened one (or after shortlist/accept). */
function OpenThread({ campaignId, status }) {
	const app = useQuery(api.applications.listMine)?.find((a) => a.campaignId === campaignId);
	const threadId = useQuery(api.collabs.forApplication, app ? { applicationId: app._id } : "skip");
	const open = useMutation(api.collabs.openFromApplication);
	const navigate = useNavigate();
	if (threadId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		"data-macaly-loc": "src/components/campaign-actions.tsx:48:6",
		"data-macaly-name": "Button",
		asChild: true,
		className: "mt-3 w-full bg-brand text-brand-foreground hover:bg-brand/90",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			"data-macaly-loc": "src/components/campaign-actions.tsx:49:8",
			"data-macaly-name": "Link",
			to: "/collab/$collaborationId",
			params: { collaborationId: threadId },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
				"data-macaly-loc": "src/components/campaign-actions.tsx:50:10",
				"data-macaly-name": "MessageSquare",
				className: "size-4"
			}), "Open conversation"]
		})
	});
	if (app && (status === "shortlisted" || status === "accepted")) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		"data-macaly-loc": "src/components/campaign-actions.tsx:57:6",
		"data-macaly-name": "Button",
		className: "mt-3 w-full bg-brand text-brand-foreground hover:bg-brand/90",
		onClick: async () => {
			const r = await open({ applicationId: app._id });
			if (!r.ok) return void toast.error(r.message);
			navigate({
				to: "/collab/$collaborationId",
				params: { collaborationId: r.collaborationId }
			});
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
			"data-macaly-loc": "src/components/campaign-actions.tsx:65:8",
			"data-macaly-name": "MessageSquare",
			className: "size-4"
		}), "Message brand"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		"data-macaly-loc": "src/components/campaign-actions.tsx:70:4",
		"data-macaly-name": "Button",
		asChild: true,
		variant: "outline",
		className: "mt-3 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			"data-macaly-loc": "src/components/campaign-actions.tsx:71:6",
			"data-macaly-name": "Link",
			to: "/dashboard",
			children: "View my applications"
		})
	});
}
function ReportCampaign({ campaignId }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const owner = useQuery(api.campaigns.ownerForReport, { campaignId });
	if (!owner) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		"data-macaly-loc": "src/components/campaign-actions.tsx:82:6",
		"data-macaly-name": "button",
		onClick: () => setOpen(true),
		className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
			"data-macaly-loc": "src/components/campaign-actions.tsx:83:8",
			"data-macaly-name": "Flag",
			className: "size-3.5"
		}), "Report this campaign"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportDialog, {
		"data-macaly-loc": "src/components/campaign-actions.tsx:85:6",
		"data-macaly-name": "ReportDialog",
		open,
		onOpenChange: setOpen,
		targetUserId: owner,
		campaignId,
		targetRole: "brand"
	})] });
}
//#endregion
//#region src/components/campaign-analytics.tsx
function Bar({ label, value, total }) {
	const pct = total ? Math.round(value / total * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/components/campaign-analytics.tsx:10:4",
		"data-macaly-name": "div",
		className: "grid gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/components/campaign-analytics.tsx:11:6",
			"data-macaly-name": "div",
			className: "flex justify-between text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-macaly-loc": "src/components/campaign-analytics.tsx:11:52",
				"data-macaly-name": "span",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-macaly-loc": "src/components/campaign-analytics.tsx:11:72",
				"data-macaly-name": "span",
				className: "text-muted-foreground",
				children: value
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-macaly-loc": "src/components/campaign-analytics.tsx:12:6",
			"data-macaly-name": "div",
			className: "h-2 overflow-hidden rounded-full bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/components/campaign-analytics.tsx:12:65",
				"data-macaly-name": "div",
				className: "h-full rounded-full bg-brand",
				style: { width: `${pct}%` }
			})
		})]
	});
}
function CampaignAnalytics({ campaignId }) {
	const a = useQuery(api.analytics.campaign, { campaignId });
	if (a === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/components/campaign-analytics.tsx:19:30",
		"data-macaly-name": "p",
		className: "text-sm text-muted-foreground",
		children: "Loading analytics…"
	});
	if (!a.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/components/campaign-analytics.tsx:20:20",
		"data-macaly-name": "p",
		className: "text-sm text-destructive",
		children: a.message
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/components/campaign-analytics.tsx:30:4",
		"data-macaly-name": "div",
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/components/campaign-analytics.tsx:31:6",
				"data-macaly-name": "div",
				className: "grid grid-cols-2 gap-3 md:grid-cols-4",
				children: [
					{
						l: "Applications",
						v: String(a.applications.total)
					},
					{
						l: "Avg match score",
						v: a.avgMatchScore !== void 0 ? `${a.avgMatchScore}%` : "—"
					},
					{
						l: "Avg requested fee",
						v: a.avgRequestedFeeInr !== void 0 ? formatInr(a.avgRequestedFeeInr, a.currency) : "—"
					},
					{
						l: "Committed (agreed fees)",
						v: formatInr(a.committedInr, a.currency)
					}
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/campaign-analytics.tsx:33:10",
					"data-macaly-name": "div",
					className: "rounded-xl border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/components/campaign-analytics.tsx:34:12",
						"data-macaly-name": "p",
						className: "text-lg font-bold",
						children: t.v
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/components/campaign-analytics.tsx:35:12",
						"data-macaly-name": "p",
						className: "text-[11px] text-muted-foreground",
						children: t.l
					})]
				}, t.l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/campaign-analytics.tsx:40:6",
				"data-macaly-name": "div",
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/campaign-analytics.tsx:41:8",
					"data-macaly-name": "div",
					className: "grid gap-2 rounded-xl border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-macaly-loc": "src/components/campaign-analytics.tsx:42:10",
							"data-macaly-name": "p",
							className: "text-sm font-semibold",
							children: "Application funnel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							"data-macaly-loc": "src/components/campaign-analytics.tsx:43:10",
							"data-macaly-name": "Bar",
							label: "Awaiting review",
							value: a.applications.submitted,
							total: a.applications.total
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							"data-macaly-loc": "src/components/campaign-analytics.tsx:44:10",
							"data-macaly-name": "Bar",
							label: "Shortlisted",
							value: a.applications.shortlisted,
							total: a.applications.total
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							"data-macaly-loc": "src/components/campaign-analytics.tsx:45:10",
							"data-macaly-name": "Bar",
							label: "Accepted",
							value: a.applications.accepted,
							total: a.applications.total
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							"data-macaly-loc": "src/components/campaign-analytics.tsx:46:10",
							"data-macaly-name": "Bar",
							label: "Rejected",
							value: a.applications.rejected,
							total: a.applications.total
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/campaign-analytics.tsx:48:8",
					"data-macaly-name": "div",
					className: "grid gap-2 rounded-xl border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-macaly-loc": "src/components/campaign-analytics.tsx:49:10",
							"data-macaly-name": "p",
							className: "text-sm font-semibold",
							children: "Collaborations"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							"data-macaly-loc": "src/components/campaign-analytics.tsx:50:10",
							"data-macaly-name": "Bar",
							label: "Negotiating",
							value: a.collaborations.negotiating,
							total: a.collaborations.total
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							"data-macaly-loc": "src/components/campaign-analytics.tsx:51:10",
							"data-macaly-name": "Bar",
							label: "In progress",
							value: a.collaborations.active,
							total: a.collaborations.total
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							"data-macaly-loc": "src/components/campaign-analytics.tsx:52:10",
							"data-macaly-name": "Bar",
							label: "Completed",
							value: a.collaborations.completed,
							total: a.collaborations.total
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-macaly-loc": "src/components/campaign-analytics.tsx:53:10",
							"data-macaly-name": "p",
							className: "mt-1 text-xs text-muted-foreground",
							children: ["Completed value: ", formatInr(a.completedInr, a.currency)]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/components/campaign-analytics.tsx:57:6",
				"data-macaly-name": "p",
				className: "text-[11px] text-muted-foreground",
				children: "Based on Cube3 activity only. Video views and reach after publishing aren't tracked yet — that needs official platform connections. “Committed” is the sum of accepted offers; Cube3 doesn't process payments."
			})
		]
	});
}
//#endregion
//#region src/routes/campaigns/$campaignId.tsx?tsr-split=component
/** Public, server-rendered campaign summary (what crawlers and link previews see). */
function CampaignSummary({ c }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:49:4",
		"data-macaly-name": "div",
		className: "mx-auto grid max-w-5xl gap-4 px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:50:6",
				"data-macaly-name": "p",
				className: "text-sm font-medium text-muted-foreground",
				children: [c.brandName, c.brandVerified ? " · Verified brand" : ""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:51:6",
				"data-macaly-name": "h1",
				className: "text-2xl font-bold md:text-3xl",
				children: c.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:52:6",
				"data-macaly-name": "p",
				className: "text-sm",
				children: [
					c.category,
					" · ",
					c.platforms.map(platformLabel).join(", "),
					" · ",
					formatBudget(c.budgetMinInr, c.budgetMaxInr, c.currency)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:53:6",
				"data-macaly-name": "p",
				className: "text-sm font-medium",
				children: ["Product: ", c.product]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:54:6",
				"data-macaly-name": "p",
				className: "whitespace-pre-line text-sm text-muted-foreground",
				children: c.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:55:6",
				"data-macaly-name": "div",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:56:8",
					"data-macaly-name": "h2",
					className: "font-semibold",
					children: "Deliverables"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:57:8",
					"data-macaly-name": "ul",
					className: "list-inside list-disc text-sm",
					children: c.deliverables.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:57:84",
						"data-macaly-name": "li",
						children: d
					}, i))
				})]
			}),
			c.applicationDeadline && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:59:32",
				"data-macaly-name": "p",
				className: "text-sm text-muted-foreground",
				children: ["Apply by ", formatDate(c.applicationDeadline)]
			})
		]
	});
}
function CampaignPage() {
	const { campaignId } = Route.useParams();
	const id = campaignId;
	const data = useQuery(api.campaigns.get, { campaignId: id });
	const { summary: preloadedSummary } = Route.useLoaderData();
	const summary = usePreloadedQuery(preloadedSummary);
	const me = useQuery(api.authz.whoAmI);
	const toggleSave = useMutation(api.campaigns.toggleSave);
	if (data === void 0 || me === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:73:53",
		"data-macaly-name": "AppShell",
		children: summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampaignSummary, {
			"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:73:74",
			"data-macaly-name": "CampaignSummary",
			c: summary
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
			"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:73:108",
			"data-macaly-name": "PageLoading"
		})
	});
	if (data === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:75:11",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:75:21",
			"data-macaly-name": "EmptyState",
			title: "Campaign not found",
			body: "It may have been closed or removed.",
			cta: {
				to: "/sponsorships",
				label: "Browse sponsorships"
			}
		})
	});
	const c = data.campaign;
	const role = me.signedIn ? me.profile?.role : void 0;
	const left = daysLeft(c.applicationDeadline);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:83:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:84:6",
			"data-macaly-name": "div",
			className: "mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[1fr_340px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:85:8",
				"data-macaly-name": "div",
				className: "grid gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:86:10",
						"data-macaly-name": "div",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:87:12",
								"data-macaly-name": "p",
								className: "flex items-center gap-1 text-sm font-medium text-muted-foreground",
								children: [c.brandName, c.brandVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
									"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:90:18",
									"data-macaly-name": "BadgeCheck",
									className: "size-4 text-brand"
								}), " Verified brand"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:92:16",
									"data-macaly-name": "span",
									className: "ml-1 rounded bg-muted px-1.5 py-0.5 text-[10px]",
									children: "Unverified brand"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:95:12",
								"data-macaly-name": "h1",
								className: "mt-1 text-2xl font-bold md:text-3xl",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:96:12",
								"data-macaly-name": "div",
								className: "mt-3 flex flex-wrap gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:97:14",
										"data-macaly-name": "Badge",
										variant: "secondary",
										children: c.category
									}),
									c.platforms.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:98:38",
										"data-macaly-name": "Badge",
										variant: "outline",
										children: platformLabel(p)
									}, p)),
									c.status === "closed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:99:40",
										"data-macaly-name": "Badge",
										variant: "destructive",
										children: "Closed"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:103:10",
						"data-macaly-name": "div",
						className: "grid grid-cols-2 gap-3 md:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:104:12",
								"data-macaly-name": "Stat",
								label: "Budget",
								value: formatBudget(c.budgetMinInr, c.budgetMaxInr, c.currency)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:105:12",
								"data-macaly-name": "Stat",
								label: "Min. audience",
								value: c.minFollowers ? `${formatCount(c.minFollowers)}+` : "Any"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:106:12",
								"data-macaly-name": "Stat",
								label: "Min. avg views",
								value: c.minAvgViews ? `${formatCount(c.minAvgViews)}+` : "Any"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:107:12",
								"data-macaly-name": "Stat",
								label: "Apply by",
								value: c.applicationDeadline ? formatDate(c.applicationDeadline) : "Open"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:110:10",
						"data-macaly-name": "section",
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:111:12",
								"data-macaly-name": "h2",
								className: "font-semibold",
								children: "About the campaign"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:112:12",
								"data-macaly-name": "p",
								className: "text-sm font-medium",
								children: ["Product: ", c.product]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:113:12",
								"data-macaly-name": "p",
								className: "whitespace-pre-line text-sm text-muted-foreground",
								children: c.description
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:116:10",
						"data-macaly-name": "section",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:117:12",
							"data-macaly-name": "h2",
							className: "font-semibold",
							children: "Deliverables"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:118:12",
							"data-macaly-name": "ul",
							className: "list-inside list-disc text-sm",
							children: c.deliverables.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:118:88",
								"data-macaly-name": "li",
								children: d
							}, i))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:121:10",
						"data-macaly-name": "section",
						className: "flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground",
						children: [
							c.targetLocation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:122:33",
								"data-macaly-name": "span",
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:122:82",
									"data-macaly-name": "MapPin",
									className: "size-4"
								}), c.targetLocation]
							}),
							c.targetLanguage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:123:33",
								"data-macaly-name": "span",
								children: ["Language: ", c.targetLanguage]
							}),
							c.duration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:124:27",
								"data-macaly-name": "span",
								children: ["Duration: ", c.duration]
							}),
							left && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:125:21",
								"data-macaly-name": "span",
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
									"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:125:70",
									"data-macaly-name": "Calendar",
									className: "size-4"
								}), left]
							})
						]
					}),
					data.additionalRequirements && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:129:12",
						"data-macaly-name": "section",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:130:14",
							"data-macaly-name": "h2",
							className: "font-semibold",
							children: "Additional requirements"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:131:14",
							"data-macaly-name": "p",
							className: "whitespace-pre-line text-sm text-muted-foreground",
							children: data.additionalRequirements
						})]
					}),
					data.isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwnerPanel, {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:135:27",
						"data-macaly-name": "OwnerPanel",
						campaignId: id,
						status: c.status
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:139:8",
				"data-macaly-name": "aside",
				className: "grid content-start gap-4",
				children: [
					data.match && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:141:12",
						"data-macaly-name": "div",
						className: "rounded-xl border p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:142:14",
								"data-macaly-name": "div",
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:143:16",
									"data-macaly-name": "h2",
									className: "font-semibold",
									children: "Why this matches"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchBadge, {
									"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:144:16",
									"data-macaly-name": "MatchBadge",
									score: data.match.score
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:146:14",
								"data-macaly-name": "div",
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchReasons, {
									"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:146:36",
									"data-macaly-name": "MatchReasons",
									match: data.match
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:147:14",
								"data-macaly-name": "p",
								className: "mt-3 text-[11px] text-muted-foreground",
								children: "Score = share of campaign requirements you meet. No hidden factors."
							})
						]
					}),
					role === "creator" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:152:12",
						"data-macaly-name": "Button",
						variant: "outline",
						onClick: async () => {
							const r = await toggleSave({ campaignId: id });
							if (!r.ok) toast.error(r.message);
						},
						children: data.saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:159:30",
							"data-macaly-name": "BookmarkCheck",
							className: "size-4"
						}), "Saved"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:159:79",
							"data-macaly-name": "Bookmark",
							className: "size-4"
						}), "Save"] })
					}),
					role === "creator" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportCampaign, {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:163:33",
						"data-macaly-name": "ReportCampaign",
						campaignId: id
					}),
					role === "creator" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplyPanel, {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:166:12",
						"data-macaly-name": "ApplyPanel",
						campaignId: id,
						open: data.open,
						status: data.myApplicationStatus,
						eligible: data.match?.eligible ?? true,
						budgetMin: c.budgetMinInr,
						budgetMax: c.budgetMaxInr,
						currency: c.currency
					}) : !me.signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:176:12",
						"data-macaly-name": "div",
						id: "apply",
						className: "rounded-xl border p-4 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:177:14",
								"data-macaly-name": "p",
								className: "font-medium",
								children: "Want this sponsorship?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:178:14",
								"data-macaly-name": "p",
								className: "mt-1 text-sm text-muted-foreground",
								children: "Create a free creator profile to apply."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:179:14",
								"data-macaly-name": "Button",
								asChild: true,
								className: "mt-3 w-full bg-brand text-brand-foreground hover:bg-brand/90",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:180:16",
									"data-macaly-name": "Link",
									to: "/signin",
									search: { role: "creator" },
									children: "Sign up to apply"
								})
							})
						]
					}) : null
				]
			})]
		})
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:192:4",
		"data-macaly-name": "div",
		className: "rounded-xl border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:193:6",
			"data-macaly-name": "p",
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:194:6",
			"data-macaly-name": "p",
			className: "mt-0.5 text-sm font-semibold",
			children: value
		})]
	});
}
function ApplyPanel({ campaignId, open, status, eligible, budgetMin, budgetMax, currency }) {
	const apply = useMutation(api.applications.apply);
	const [intro, setIntro] = (0, import_react.useState)("");
	const [idea, setIdea] = (0, import_react.useState)("");
	const [fee, setFee] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (status && status !== "withdrawn") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:219:6",
		"data-macaly-name": "div",
		id: "apply",
		className: "rounded-xl border p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:220:8",
				"data-macaly-name": "p",
				className: "font-semibold",
				children: ["Application ", status]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:221:8",
				"data-macaly-name": "p",
				className: "mt-1 text-sm text-muted-foreground",
				children: status === "accepted" ? "The brand accepted your application. Discuss terms in your conversation." : status === "shortlisted" ? "You're on the brand's shortlist." : status === "rejected" ? "The brand went with other creators this time." : "The brand will review your application."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenThread, {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:227:8",
				"data-macaly-name": "OpenThread",
				campaignId,
				status
			})
		]
	});
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:231:20",
		"data-macaly-name": "div",
		id: "apply",
		className: "rounded-xl border p-4 text-sm text-muted-foreground",
		children: "Applications are closed."
	});
	if (!eligible) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:234:6",
		"data-macaly-name": "div",
		id: "apply",
		className: "rounded-xl border p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:235:8",
				"data-macaly-name": "p",
				className: "font-medium",
				children: "Not eligible yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:236:8",
				"data-macaly-name": "p",
				className: "mt-1 text-sm text-muted-foreground",
				children: "You don't meet this campaign's platform or audience requirement. Update your profile if your stats have changed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:237:8",
				"data-macaly-name": "Button",
				asChild: true,
				variant: "outline",
				className: "mt-3 w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:237:66",
					"data-macaly-name": "Link",
					to: "/profile",
					children: "Update profile"
				})
			})
		]
	});
	async function submit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			const r = await apply({
				campaignId,
				introMessage: intro,
				contentIdea: idea || void 0,
				requestedFeeInr: fee ? Number(fee) : void 0,
				deliveryDate: date || void 0
			});
			if (!r.ok) return void toast.error(r.message);
			toast.success("Application sent!");
		} catch (err) {
			console.error("apply failed", err);
			toast.error("Couldn't send application.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:264:4",
		"data-macaly-name": "form",
		id: "apply",
		onSubmit: submit,
		className: "grid gap-3 rounded-xl border p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:265:6",
				"data-macaly-name": "h2",
				className: "font-semibold",
				children: "Apply"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PitchHelper, {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:266:6",
				"data-macaly-name": "PitchHelper",
				campaignId,
				onDraft: (i, c) => {
					setIntro(i);
					if (c) setIdea(c);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:267:6",
				"data-macaly-name": "div",
				className: "grid gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:268:8",
					"data-macaly-name": "Label",
					htmlFor: "intro",
					children: "Introduce yourself & why you fit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:269:8",
					"data-macaly-name": "Textarea",
					id: "intro",
					rows: 4,
					value: intro,
					onChange: (e) => setIntro(e.target.value),
					required: true,
					minLength: 20,
					maxLength: 3e3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:271:6",
				"data-macaly-name": "div",
				className: "grid gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:272:8",
					"data-macaly-name": "Label",
					htmlFor: "idea",
					children: "Content idea"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:273:8",
					"data-macaly-name": "Textarea",
					id: "idea",
					rows: 3,
					value: idea,
					onChange: (e) => setIdea(e.target.value),
					maxLength: 3e3,
					placeholder: "How you'd feature the product"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:275:6",
				"data-macaly-name": "div",
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:276:8",
					"data-macaly-name": "div",
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:277:10",
						"data-macaly-name": "Label",
						htmlFor: "fee",
						children: [
							"Your fee (",
							currency,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:278:10",
						"data-macaly-name": "Input",
						id: "fee",
						inputMode: "numeric",
						value: fee,
						onChange: (e) => setFee(e.target.value.replace(/\D/g, "")),
						placeholder: budgetMin ? String(budgetMin) : ""
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:280:8",
					"data-macaly-name": "div",
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:281:10",
						"data-macaly-name": "Label",
						htmlFor: "dd",
						children: "Delivery by"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:282:10",
						"data-macaly-name": "Input",
						id: "dd",
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceGuidanceCard, {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:285:6",
				"data-macaly-name": "PriceGuidanceCard",
				campaignId,
				onUse: (n) => setFee(String(n))
			}),
			(budgetMin || budgetMax) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:287:8",
				"data-macaly-name": "p",
				className: "text-xs text-muted-foreground",
				children: [
					"Brand budget: ",
					formatBudget(budgetMin, budgetMax, currency),
					". You choose your own fee."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:289:6",
				"data-macaly-name": "Button",
				type: "submit",
				disabled: busy,
				className: "bg-brand text-brand-foreground hover:bg-brand/90",
				children: busy ? "Sending…" : "Send application"
			})
		]
	});
}
function OwnerPanel({ campaignId, status }) {
	const [tab, setTab] = (0, import_react.useState)("apps");
	const setCampaignStatus = useMutation(api.campaigns.setStatus);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:300:4",
		"data-macaly-name": "section",
		className: "grid gap-4 rounded-xl border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:301:6",
			"data-macaly-name": "div",
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:302:8",
				"data-macaly-name": "div",
				className: "inline-flex rounded-lg border p-1",
				children: [
					["apps", "Applications"],
					["recs", "Recommended"],
					["stats", "Analytics"]
				].map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:304:12",
					"data-macaly-name": "button",
					onClick: () => setTab(k),
					className: cn("rounded-md px-3 py-1.5 text-sm font-medium", tab === k ? "bg-brand text-brand-foreground" : "text-muted-foreground"),
					children: l
				}, k))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:307:8",
				"data-macaly-name": "Button",
				variant: "outline",
				size: "sm",
				onClick: async () => {
					const r = await setCampaignStatus({
						campaignId,
						status: status === "active" ? "closed" : "active"
					});
					if (!r.ok) toast.error(r.message);
					else toast.success(status === "active" ? "Campaign closed" : "Campaign reopened");
				},
				children: status === "active" ? "Close campaign" : "Reopen campaign"
			})]
		}), tab === "apps" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Applications, {
			"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:319:24",
			"data-macaly-name": "Applications",
			campaignId
		}) : tab === "recs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recommended, {
			"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:319:84",
			"data-macaly-name": "Recommended",
			campaignId
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampaignAnalytics, {
			"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:319:126",
			"data-macaly-name": "CampaignAnalytics",
			campaignId
		})]
	});
}
function Applications({ campaignId }) {
	const res = useQuery(api.applications.listForCampaign, { campaignId });
	const setStatus = useMutation(api.applications.setStatus);
	if (res === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:327:32",
		"data-macaly-name": "p",
		className: "text-sm text-muted-foreground",
		children: "Loading…"
	});
	if (!res.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:328:22",
		"data-macaly-name": "p",
		className: "text-sm text-destructive",
		children: res.message
	});
	if (res.items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:330:11",
		"data-macaly-name": "p",
		className: "text-sm text-muted-foreground",
		children: "No applications yet. Check “Recommended creators” to find people who match."
	});
	async function act(id, s) {
		const r = await setStatus({
			applicationId: id,
			status: s
		});
		if (!r.ok) toast.error(r.message);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:339:4",
		"data-macaly-name": "ul",
		className: "grid gap-3",
		children: res.items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:341:8",
			"data-macaly-name": "li",
			className: "rounded-lg border p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:342:10",
					"data-macaly-name": "div",
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:343:12",
						"data-macaly-name": "div",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:344:14",
							"data-macaly-name": "Link",
							to: "/c/$username",
							params: { username: a.creator.username },
							className: "font-medium hover:underline",
							children: a.creator.displayName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:345:14",
							"data-macaly-name": "p",
							className: "text-xs text-muted-foreground",
							children: [
								"@",
								a.creator.username,
								" · ",
								a.creator.category,
								" · ",
								formatDate(a._creationTime)
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:347:12",
						"data-macaly-name": "div",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchBadge, {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:348:14",
							"data-macaly-name": "MatchBadge",
							score: a.matchScore
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:349:14",
							"data-macaly-name": "span",
							className: "rounded-full bg-muted px-2 py-0.5 text-xs capitalize",
							children: a.status
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:352:10",
					"data-macaly-name": "p",
					className: "mt-2 whitespace-pre-line text-sm",
					children: a.introMessage
				}),
				a.contentIdea && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:353:28",
					"data-macaly-name": "p",
					className: "mt-2 whitespace-pre-line text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:353:98",
							"data-macaly-name": "strong",
							children: "Idea:"
						}),
						" ",
						a.contentIdea
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:354:10",
					"data-macaly-name": "p",
					className: "mt-2 text-sm",
					children: [
						"Requested fee: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:355:27",
							"data-macaly-name": "strong",
							children: a.requestedFeeInr ? formatInr(a.requestedFeeInr, res.currency) : "Not specified"
						}),
						a.deliveryDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · Delivery by ", a.deliveryDate] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:358:10",
					"data-macaly-name": "div",
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:359:12",
							"data-macaly-name": "Button",
							size: "sm",
							variant: "outline",
							disabled: a.status === "shortlisted",
							onClick: () => act(a._id, "shortlisted"),
							children: "Shortlist"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:360:12",
							"data-macaly-name": "Button",
							size: "sm",
							className: "bg-success text-success-foreground hover:bg-success/90",
							disabled: a.status === "accepted",
							onClick: () => act(a._id, "accepted"),
							children: "Accept"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:361:12",
							"data-macaly-name": "Button",
							size: "sm",
							variant: "ghost",
							disabled: a.status === "rejected",
							onClick: () => act(a._id, "rejected"),
							children: "Reject"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageApplicant, {
							"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:362:12",
							"data-macaly-name": "MessageApplicant",
							applicationId: a._id
						})
					]
				})
			]
		}, a._id))
	});
}
function Recommended({ campaignId }) {
	const res = useQuery(api.creators.recommendedForCampaign, { campaignId });
	if (res === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:372:32",
		"data-macaly-name": "p",
		className: "text-sm text-muted-foreground",
		children: "Finding matching creators…"
	});
	if (!res.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:373:22",
		"data-macaly-name": "p",
		className: "text-sm text-destructive",
		children: res.message
	});
	if (res.items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:375:11",
		"data-macaly-name": "p",
		className: "text-sm text-muted-foreground",
		children: [
			"No creators match all requirements yet. Try lowering the minimum audience, or browse the ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:375:145",
				"data-macaly-name": "Link",
				to: "/creators",
				className: "text-brand underline",
				children: "creator directory"
			}),
			"."
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:378:4",
		"data-macaly-name": "div",
		className: "grid gap-3 md:grid-cols-2",
		children: res.items.map(({ creator, match }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatorCard, {
			"data-macaly-loc": "src/routes/campaigns/$campaignId.tsx:379:45",
			"data-macaly-name": "CreatorCard",
			c: creator,
			match,
			campaignId
		}, creator.userId))
	});
}
//#endregion
export { CampaignPage as component };
