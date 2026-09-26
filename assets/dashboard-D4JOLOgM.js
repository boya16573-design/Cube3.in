import { D as require_jsx_runtime, t as api, u as useQuery, v as Link } from "./api-D74LnTM3.js";
import { a as Button, i as RequireProfile, r as PageLoading, t as AppShell } from "./app-shell-CtDeXJqm.js";
import { t as usePaginatedQuery } from "./use_paginated_query-BBYyLgEn.js";
import { t as CampaignCard } from "./campaign-card-uuj6bXXJ.js";
import { n as SavedCreators } from "./preferences-and-saves-CWe1itD0.js";
import { t as Plus } from "./plus-Cf1jeTYa.js";
import { t as Sparkles } from "./sparkles-CVCqxAfJ.js";
import { a as formatBudget, c as formatInr, s as formatDate } from "./cube3-DuAq7Ab3.js";
import { t as Badge } from "./badge-Ck0JGcps.js";
import { t as StatusPill$1 } from "./collab-status-t8V0w9Da.js";
//#region src/components/active-collaborations.tsx
var import_jsx_runtime = require_jsx_runtime();
/** Dashboard section: active collaborations for either role. */
function ActiveCollaborations() {
	const items = useQuery(api.collabs.inbox);
	if (!items) return null;
	const active = items.filter((c) => c.status !== "cancelled" && c.status !== "completed");
	const completed = items.filter((c) => c.status === "completed").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/components/active-collaborations.tsx:14:4",
		"data-macaly-name": "section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/active-collaborations.tsx:15:6",
				"data-macaly-name": "div",
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-macaly-loc": "src/components/active-collaborations.tsx:16:8",
					"data-macaly-name": "h2",
					className: "text-xl font-bold",
					children: "Collaborations"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					"data-macaly-loc": "src/components/active-collaborations.tsx:17:8",
					"data-macaly-name": "Link",
					to: "/inbox",
					className: "text-sm font-medium text-brand",
					children: "Inbox →"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/components/active-collaborations.tsx:19:6",
				"data-macaly-name": "p",
				className: "text-sm text-muted-foreground",
				children: [
					active.length,
					" active · ",
					completed,
					" completed"
				]
			}),
			active.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/components/active-collaborations.tsx:21:8",
				"data-macaly-name": "p",
				className: "mt-3 rounded-xl border border-dashed p-5 text-center text-sm text-muted-foreground",
				children: "No active collaborations yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-macaly-loc": "src/components/active-collaborations.tsx:23:8",
				"data-macaly-name": "ul",
				className: "mt-3 divide-y rounded-xl border",
				children: active.slice(0, 5).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					"data-macaly-loc": "src/components/active-collaborations.tsx:25:12",
					"data-macaly-name": "li",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						"data-macaly-loc": "src/components/active-collaborations.tsx:26:14",
						"data-macaly-name": "Link",
						to: "/collab/$collaborationId",
						params: { collaborationId: c._id },
						className: "flex items-center justify-between gap-3 p-4 hover:bg-muted/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/components/active-collaborations.tsx:27:16",
							"data-macaly-name": "div",
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-macaly-loc": "src/components/active-collaborations.tsx:28:18",
								"data-macaly-name": "p",
								className: "truncate font-medium",
								children: c.counterpartName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-macaly-loc": "src/components/active-collaborations.tsx:29:18",
								"data-macaly-name": "p",
								className: "truncate text-xs text-muted-foreground",
								children: c.campaignTitle
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/components/active-collaborations.tsx:31:16",
							"data-macaly-name": "div",
							className: "flex shrink-0 items-center gap-2",
							children: [c.unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-macaly-loc": "src/components/active-collaborations.tsx:32:35",
								"data-macaly-name": "span",
								className: "rounded-full bg-brand px-1.5 text-xs text-brand-foreground",
								children: c.unread
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill$1, {
								"data-macaly-loc": "src/components/active-collaborations.tsx:33:18",
								"data-macaly-name": "StatusPill",
								status: c.status
							})]
						})]
					})
				}, c._id))
			})
		]
	});
}
//#endregion
//#region src/components/creator-insights.tsx
/** Creator's own sponsorship performance, from Cube3 activity only. */
function CreatorInsights() {
	const i = useQuery(api.analytics.creatorInsights);
	if (!i || i.applications === 0) return null;
	const tiles = [
		{
			l: "Brand response rate",
			v: i.responseRate !== void 0 ? `${i.responseRate}%` : "—"
		},
		{
			l: "Acceptance rate",
			v: i.acceptanceRate !== void 0 ? `${i.acceptanceRate}%` : "—"
		},
		{
			l: "Completed collabs",
			v: String(i.completed)
		},
		{
			l: "Agreed value",
			v: formatInr(i.agreedTotalInr)
		}
	];
	let tip = null;
	if (i.avgRequestedInr && i.avgAgreedInr && i.avgRequestedInr > i.avgAgreedInr * 1.4) tip = `You usually ask ${formatInr(i.avgRequestedInr)} but deals close around ${formatInr(i.avgAgreedInr)}. Check the suggested range when applying.`;
	else if (i.responseRate !== void 0 && i.responseRate < 30 && i.applications >= 5) tip = "Few brands have responded yet. Applying to higher-match campaigns and verifying channel ownership can help.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/components/creator-insights.tsx:26:4",
		"data-macaly-name": "section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-macaly-loc": "src/components/creator-insights.tsx:27:6",
				"data-macaly-name": "h2",
				className: "text-xl font-bold",
				children: "Your sponsorship insights"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/components/creator-insights.tsx:28:6",
				"data-macaly-name": "div",
				className: "mt-3 grid grid-cols-2 gap-3 md:grid-cols-4",
				children: tiles.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/creator-insights.tsx:30:10",
					"data-macaly-name": "div",
					className: "rounded-xl border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/components/creator-insights.tsx:31:12",
						"data-macaly-name": "p",
						className: "text-lg font-bold",
						children: t.v
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/components/creator-insights.tsx:32:12",
						"data-macaly-name": "p",
						className: "text-[11px] text-muted-foreground",
						children: t.l
					})]
				}, t.l))
			}),
			i.topCategories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/components/creator-insights.tsx:37:8",
				"data-macaly-name": "p",
				className: "mt-2 text-xs text-muted-foreground",
				children: ["You apply most to: ", i.topCategories.map((c) => `${c.category} (${c.count})`).join(", ")]
			}),
			tip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/components/creator-insights.tsx:41:14",
				"data-macaly-name": "p",
				className: "mt-2 rounded-lg bg-brand-soft p-3 text-sm",
				children: tip
			})
		]
	});
}
//#endregion
//#region src/routes/dashboard.tsx?tsr-split=component
function Dashboard() {
	const me = useQuery(api.authz.whoAmI);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/dashboard.tsx:20:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireProfile, {
			"data-macaly-loc": "src/routes/dashboard.tsx:21:6",
			"data-macaly-name": "RequireProfile",
			children: me?.signedIn && me.profile?.role === "brand" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandDashboard, {
				"data-macaly-loc": "src/routes/dashboard.tsx:22:56",
				"data-macaly-name": "BrandDashboard"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatorDashboard, {
				"data-macaly-loc": "src/routes/dashboard.tsx:22:77",
				"data-macaly-name": "CreatorDashboard"
			})
		})
	});
}
var statusStyles = {
	submitted: "bg-muted text-muted-foreground",
	shortlisted: "bg-brand-soft text-brand",
	accepted: "bg-success text-success-foreground",
	rejected: "bg-destructive/10 text-destructive",
	withdrawn: "bg-muted text-muted-foreground"
};
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-macaly-loc": "src/routes/dashboard.tsx:37:9",
		"data-macaly-name": "span",
		className: `rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[status] ?? ""}`,
		children: status
	});
}
function CreatorDashboard() {
	const matches = useQuery(api.campaigns.forMe, { limit: 3 });
	const apps = useQuery(api.applications.listMine);
	const accounts = useQuery(api.creators.myAccounts);
	const appliedIds = new Set((apps ?? []).filter((a) => a.status !== "withdrawn").map((a) => a.campaignId));
	if (matches === void 0 || apps === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/routes/dashboard.tsx:46:58",
		"data-macaly-name": "PageLoading"
	});
	const active = apps.filter((a) => a.status === "accepted").length;
	const pending = apps.filter((a) => a.status === "submitted" || a.status === "shortlisted").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/dashboard.tsx:52:4",
		"data-macaly-name": "div",
		className: "mx-auto grid max-w-6xl gap-8 px-4 py-8",
		"data-state": "ready",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/routes/dashboard.tsx:53:6",
				"data-macaly-name": "div",
				className: "grid grid-cols-3 gap-3",
				children: [
					{
						l: "Matches",
						v: matches.ok ? matches.totalMatching : 0
					},
					{
						l: "Pending applications",
						v: pending
					},
					{
						l: "Accepted",
						v: active
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/dashboard.tsx:59:10",
					"data-macaly-name": "div",
					className: "rounded-xl border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/dashboard.tsx:60:12",
						"data-macaly-name": "p",
						className: "text-2xl font-bold",
						children: s.v
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/dashboard.tsx:61:12",
						"data-macaly-name": "p",
						className: "text-xs text-muted-foreground",
						children: s.l
					})]
				}, s.l))
			}),
			accounts !== void 0 && accounts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/dashboard.tsx:67:8",
				"data-macaly-name": "div",
				className: "rounded-xl border border-brand bg-brand-soft p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/dashboard.tsx:68:10",
						"data-macaly-name": "p",
						className: "font-semibold",
						children: "Add your YouTube or Instagram to get matched"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/dashboard.tsx:69:10",
						"data-macaly-name": "p",
						className: "mt-1 text-sm text-muted-foreground",
						children: "Cube3 matches you using your platforms, audience size and views."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/dashboard.tsx:70:10",
						"data-macaly-name": "Button",
						asChild: true,
						size: "sm",
						className: "mt-3 bg-brand text-brand-foreground hover:bg-brand/90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-macaly-loc": "src/routes/dashboard.tsx:71:12",
							"data-macaly-name": "Link",
							to: "/profile",
							children: "Add a platform →"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-macaly-loc": "src/routes/dashboard.tsx:76:6",
				"data-macaly-name": "section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/dashboard.tsx:77:8",
					"data-macaly-name": "div",
					className: "flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/dashboard.tsx:78:10",
						"data-macaly-name": "div",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							"data-macaly-loc": "src/routes/dashboard.tsx:79:12",
							"data-macaly-name": "h2",
							className: "flex items-center gap-2 text-xl font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
								"data-macaly-loc": "src/routes/dashboard.tsx:79:70",
								"data-macaly-name": "Sparkles",
								className: "size-5 text-brand"
							}), "Sponsorships for you"]
						}), matches.ok && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-macaly-loc": "src/routes/dashboard.tsx:81:14",
							"data-macaly-name": "p",
							className: "text-sm text-muted-foreground",
							children: [
								matches.totalMatching,
								" campaign",
								matches.totalMatching === 1 ? "" : "s",
								" match your profile"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/routes/dashboard.tsx:86:10",
						"data-macaly-name": "Link",
						to: "/sponsorships",
						className: "text-sm font-medium text-brand",
						children: "See all →"
					})]
				}), matches.ok && matches.items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/routes/dashboard.tsx:89:10",
					"data-macaly-name": "div",
					className: "mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
					children: matches.items.map(({ campaign, match }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampaignCard, {
						"data-macaly-loc": "src/routes/dashboard.tsx:91:14",
						"data-macaly-name": "CampaignCard",
						c: campaign,
						match,
						applied: appliedIds.has(campaign._id)
					}, campaign._id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/dashboard.tsx:95:10",
					"data-macaly-name": "div",
					className: "mt-4 rounded-xl border border-dashed p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-macaly-loc": "src/routes/dashboard.tsx:96:12",
							"data-macaly-name": "p",
							className: "font-medium",
							children: "No matching campaigns yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-macaly-loc": "src/routes/dashboard.tsx:97:12",
							"data-macaly-name": "p",
							className: "mt-1 text-sm text-muted-foreground",
							children: "Complete your profile and platform stats, or browse all open campaigns."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-macaly-loc": "src/routes/dashboard.tsx:98:12",
							"data-macaly-name": "Button",
							asChild: true,
							variant: "outline",
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								"data-macaly-loc": "src/routes/dashboard.tsx:98:63",
								"data-macaly-name": "Link",
								to: "/sponsorships",
								children: "Browse sponsorships →"
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatorInsights, {
				"data-macaly-loc": "src/routes/dashboard.tsx:103:6",
				"data-macaly-name": "CreatorInsights"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-macaly-loc": "src/routes/dashboard.tsx:105:6",
				"data-macaly-name": "section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-macaly-loc": "src/routes/dashboard.tsx:106:8",
					"data-macaly-name": "h2",
					className: "text-xl font-bold",
					children: "Your applications"
				}), apps.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/dashboard.tsx:108:10",
					"data-macaly-name": "div",
					className: "mt-4 rounded-xl border border-dashed p-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/dashboard.tsx:109:12",
						"data-macaly-name": "p",
						className: "font-medium",
						children: "You haven't applied to a campaign yet."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/dashboard.tsx:110:12",
						"data-macaly-name": "Button",
						asChild: true,
						className: "mt-3 bg-brand text-brand-foreground hover:bg-brand/90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-macaly-loc": "src/routes/dashboard.tsx:110:94",
							"data-macaly-name": "Link",
							to: "/sponsorships",
							children: "Find Sponsorships →"
						})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					"data-macaly-loc": "src/routes/dashboard.tsx:113:10",
					"data-macaly-name": "ul",
					className: "mt-4 divide-y rounded-xl border",
					children: apps.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						"data-macaly-loc": "src/routes/dashboard.tsx:115:14",
						"data-macaly-name": "li",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							"data-macaly-loc": "src/routes/dashboard.tsx:116:16",
							"data-macaly-name": "Link",
							to: "/campaigns/$campaignId",
							params: { campaignId: a.campaignId },
							className: "flex items-center justify-between gap-3 p-4 hover:bg-muted/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-macaly-loc": "src/routes/dashboard.tsx:117:18",
								"data-macaly-name": "div",
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-macaly-loc": "src/routes/dashboard.tsx:118:20",
									"data-macaly-name": "p",
									className: "truncate font-medium",
									children: a.campaignTitle
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-macaly-loc": "src/routes/dashboard.tsx:119:20",
									"data-macaly-name": "p",
									className: "text-xs text-muted-foreground",
									children: [
										a.brandName,
										" · applied ",
										formatDate(a._creationTime),
										a.requestedFeeInr ? ` · asked ${formatInr(a.requestedFeeInr)}` : ""
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								"data-macaly-loc": "src/routes/dashboard.tsx:121:18",
								"data-macaly-name": "StatusPill",
								status: a.status
							})]
						})
					}, a._id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveCollaborations, {
				"data-macaly-loc": "src/routes/dashboard.tsx:129:6",
				"data-macaly-name": "ActiveCollaborations"
			})
		]
	});
}
function BrandDashboard() {
	const { results, status, loadMore } = usePaginatedQuery(api.campaigns.listMine, {}, { initialNumItems: 20 });
	const totals = useQuery(api.analytics.brandTotals);
	if (status === "LoadingFirstPage") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/routes/dashboard.tsx:137:44",
		"data-macaly-name": "PageLoading"
	});
	const active = results.filter((c) => c.status === "active").length;
	const apps = results.reduce((s, c) => s + c.applicationCount, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/dashboard.tsx:143:4",
		"data-macaly-name": "div",
		className: "mx-auto grid max-w-5xl gap-8 px-4 py-8",
		"data-state": "ready",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/dashboard.tsx:144:6",
				"data-macaly-name": "div",
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-macaly-loc": "src/routes/dashboard.tsx:145:8",
					"data-macaly-name": "h1",
					className: "text-2xl font-bold",
					children: "Brand overview"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/dashboard.tsx:146:8",
					"data-macaly-name": "Button",
					asChild: true,
					className: "bg-brand text-brand-foreground hover:bg-brand/90",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						"data-macaly-loc": "src/routes/dashboard.tsx:147:10",
						"data-macaly-name": "Link",
						to: "/campaigns/new",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"data-macaly-loc": "src/routes/dashboard.tsx:147:36",
							"data-macaly-name": "Plus",
							className: "size-4"
						}), "New campaign"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/routes/dashboard.tsx:151:6",
				"data-macaly-name": "div",
				className: "grid grid-cols-2 gap-3 md:grid-cols-3",
				children: [
					{
						l: "Active campaigns",
						v: active
					},
					{
						l: "Applications",
						v: apps
					},
					{
						l: "Active collaborations",
						v: totals?.activeCollaborations ?? 0
					},
					{
						l: "Completed",
						v: totals?.completedCollaborations ?? 0
					},
					{
						l: "Committed (agreed fees)",
						v: formatInr(totals?.committedInr ?? 0)
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/dashboard.tsx:159:10",
					"data-macaly-name": "div",
					className: "rounded-xl border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/dashboard.tsx:160:12",
						"data-macaly-name": "p",
						className: "text-2xl font-bold",
						children: s.v
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/dashboard.tsx:161:12",
						"data-macaly-name": "p",
						className: "text-xs text-muted-foreground",
						children: s.l
					})]
				}, s.l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-macaly-loc": "src/routes/dashboard.tsx:166:6",
				"data-macaly-name": "section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-macaly-loc": "src/routes/dashboard.tsx:167:8",
						"data-macaly-name": "h2",
						className: "text-xl font-bold",
						children: "Your campaigns"
					}),
					results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/dashboard.tsx:169:10",
						"data-macaly-name": "div",
						className: "mt-4 rounded-xl border border-dashed p-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-macaly-loc": "src/routes/dashboard.tsx:170:12",
								"data-macaly-name": "p",
								className: "font-medium",
								children: "Create your first campaign to start receiving applications."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-macaly-loc": "src/routes/dashboard.tsx:171:12",
								"data-macaly-name": "p",
								className: "mt-1 text-sm text-muted-foreground",
								children: "Cube3 will recommend creators who match it."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-macaly-loc": "src/routes/dashboard.tsx:172:12",
								"data-macaly-name": "Button",
								asChild: true,
								className: "mt-3 bg-brand text-brand-foreground hover:bg-brand/90",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									"data-macaly-loc": "src/routes/dashboard.tsx:172:94",
									"data-macaly-name": "Link",
									to: "/campaigns/new",
									children: "Create campaign →"
								})
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						"data-macaly-loc": "src/routes/dashboard.tsx:175:10",
						"data-macaly-name": "ul",
						className: "mt-4 divide-y rounded-xl border",
						children: results.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							"data-macaly-loc": "src/routes/dashboard.tsx:177:14",
							"data-macaly-name": "li",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								"data-macaly-loc": "src/routes/dashboard.tsx:178:16",
								"data-macaly-name": "Link",
								to: "/campaigns/$campaignId",
								params: { campaignId: c._id },
								className: "flex items-center justify-between gap-3 p-4 hover:bg-muted/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-macaly-loc": "src/routes/dashboard.tsx:179:18",
									"data-macaly-name": "div",
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-macaly-loc": "src/routes/dashboard.tsx:180:20",
										"data-macaly-name": "p",
										className: "truncate font-medium",
										children: c.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-macaly-loc": "src/routes/dashboard.tsx:181:20",
										"data-macaly-name": "p",
										className: "text-xs text-muted-foreground",
										children: [
											c.category,
											" · ",
											formatBudget(c.budgetMinInr, c.budgetMaxInr)
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-macaly-loc": "src/routes/dashboard.tsx:183:18",
									"data-macaly-name": "div",
									className: "flex shrink-0 items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										"data-macaly-loc": "src/routes/dashboard.tsx:184:20",
										"data-macaly-name": "Badge",
										variant: "secondary",
										children: [c.applicationCount, " applied"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										"data-macaly-loc": "src/routes/dashboard.tsx:185:20",
										"data-macaly-name": "Badge",
										variant: c.status === "active" ? "default" : "outline",
										className: "capitalize",
										children: c.status
									})]
								})]
							})
						}, c._id))
					}),
					status === "CanLoadMore" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/dashboard.tsx:193:10",
						"data-macaly-name": "Button",
						variant: "outline",
						className: "mt-3 w-full",
						onClick: () => loadMore(20),
						children: "Load more"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveCollaborations, {
				"data-macaly-loc": "src/routes/dashboard.tsx:197:6",
				"data-macaly-name": "ActiveCollaborations"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavedCreators, {
				"data-macaly-loc": "src/routes/dashboard.tsx:199:6",
				"data-macaly-name": "SavedCreators"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/dashboard.tsx:201:6",
				"data-macaly-name": "div",
				className: "rounded-xl border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/dashboard.tsx:202:8",
						"data-macaly-name": "p",
						className: "font-semibold",
						children: "Looking for creators?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/dashboard.tsx:203:8",
						"data-macaly-name": "p",
						className: "mt-1 text-sm text-muted-foreground",
						children: "Open a campaign to see recommended creators, or search the directory."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/dashboard.tsx:204:8",
						"data-macaly-name": "Button",
						asChild: true,
						variant: "outline",
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-macaly-loc": "src/routes/dashboard.tsx:204:59",
							"data-macaly-name": "Link",
							to: "/creators",
							children: "Discover Creators →"
						})
					})
				]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
