import { S as Link, ht as __toESM, i as useT, j as require_jsx_runtime, m as useQuery, pt as require_react, t as api } from "./api-DJqU9p-G.js";
import { a as Button, f as Search, o as cn, r as PageLoading, t as AppShell } from "./app-shell-BzN9KHqO.js";
import { t as usePaginatedQuery } from "./use_paginated_query-DQByuTLc.js";
import { t as CampaignCard } from "./campaign-card-C_ZyglTr.js";
import { t as Sparkles } from "./sparkles-CQSfE9JT.js";
import { r as PLATFORMS, t as CATEGORIES } from "./cube3-BhcyVTyu.js";
import { t as Input } from "./input-DAWToyPJ.js";
import { t as LanguagePicker } from "./language-picker-DF0mbcBd.js";
//#region src/routes/sponsorships.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Sponsorships() {
	const t = useT();
	const me = useQuery(api.authz.whoAmI);
	const isCreator = me?.signedIn && me.profile?.role === "creator";
	const [tab, setTab] = (0, import_react.useState)("forYou");
	const effectiveTab = isCreator ? tab : "all";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/sponsorships.tsx:27:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/sponsorships.tsx:28:6",
			"data-macaly-name": "div",
			className: "mx-auto max-w-6xl px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-macaly-loc": "src/routes/sponsorships.tsx:29:8",
					"data-macaly-name": "h1",
					className: "text-2xl font-bold",
					children: t("sp.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/sponsorships.tsx:30:8",
					"data-macaly-name": "p",
					className: "text-sm text-muted-foreground",
					children: t("sp.sub")
				}),
				isCreator && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/routes/sponsorships.tsx:33:10",
					"data-macaly-name": "div",
					className: "mt-5 inline-flex rounded-lg border p-1",
					children: [["forYou", t("sp.forYou")], ["all", t("sp.all")]].map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"data-macaly-loc": "src/routes/sponsorships.tsx:35:14",
						"data-macaly-name": "button",
						onClick: () => setTab(k),
						className: cn("rounded-md px-4 py-1.5 text-sm font-medium", tab === k ? "bg-brand text-brand-foreground" : "text-muted-foreground"),
						children: l
					}, k))
				}),
				me !== void 0 && !me.signedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/sponsorships.tsx:43:10",
					"data-macaly-name": "div",
					className: "mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand bg-brand-soft p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/routes/sponsorships.tsx:44:12",
						"data-macaly-name": "p",
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							"data-macaly-loc": "src/routes/sponsorships.tsx:44:35",
							"data-macaly-name": "Sparkles",
							className: "mr-1 inline size-4 text-brand"
						}), t("sp.getMatched")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/sponsorships.tsx:45:12",
						"data-macaly-name": "Button",
						asChild: true,
						size: "sm",
						className: "bg-brand text-brand-foreground hover:bg-brand/90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-macaly-loc": "src/routes/sponsorships.tsx:45:99",
							"data-macaly-name": "Link",
							to: "/signin",
							search: { role: "creator" },
							children: t("sp.getMatchedCta")
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/routes/sponsorships.tsx:49:8",
					"data-macaly-name": "div",
					className: "mt-6",
					children: effectiveTab === "forYou" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForYou, {
						"data-macaly-loc": "src/routes/sponsorships.tsx:49:59",
						"data-macaly-name": "ForYou"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AllCampaigns, {
						"data-macaly-loc": "src/routes/sponsorships.tsx:49:72",
						"data-macaly-name": "AllCampaigns"
					})
				})
			]
		})
	});
}
function useAppliedIds() {
	const apps = useQuery(api.applications.listMine);
	return new Set((apps ?? []).filter((a) => a.status !== "withdrawn").map((a) => a.campaignId));
}
function ForYou() {
	const t = useT();
	const res = useQuery(api.campaigns.forMe, { limit: 30 });
	const applied = useAppliedIds();
	if (res === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/routes/sponsorships.tsx:64:32",
		"data-macaly-name": "PageLoading"
	});
	if (!res.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/sponsorships.tsx:65:22",
		"data-macaly-name": "p",
		className: "text-sm text-muted-foreground",
		children: res.message
	});
	if (res.items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/sponsorships.tsx:68:6",
		"data-macaly-name": "div",
		className: "rounded-xl border border-dashed p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/sponsorships.tsx:69:8",
				"data-macaly-name": "p",
				className: "font-medium",
				children: t("sp.noMatches")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/sponsorships.tsx:70:8",
				"data-macaly-name": "p",
				className: "mt-1 text-sm text-muted-foreground",
				children: t("sp.noMatchesBody")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/routes/sponsorships.tsx:71:8",
				"data-macaly-name": "Button",
				asChild: true,
				variant: "outline",
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					"data-macaly-loc": "src/routes/sponsorships.tsx:71:59",
					"data-macaly-name": "Link",
					to: "/profile",
					children: t("sp.completeProfile")
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/routes/sponsorships.tsx:77:6",
		"data-macaly-name": "p",
		className: "mb-4 text-sm font-medium",
		children: t("sp.matchCount", { n: res.totalMatching })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-macaly-loc": "src/routes/sponsorships.tsx:78:6",
		"data-macaly-name": "div",
		className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
		"data-state": "ready",
		children: res.items.map(({ campaign, match }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampaignCard, {
			"data-macaly-loc": "src/routes/sponsorships.tsx:80:10",
			"data-macaly-name": "CampaignCard",
			c: campaign,
			match,
			applied: applied.has(campaign._id)
		}, campaign._id))
	})] });
}
function AllCampaigns() {
	const t = useT();
	const [category, setCategory] = (0, import_react.useState)();
	const [platform, setPlatform] = (0, import_react.useState)();
	const [language, setLanguage] = (0, import_react.useState)();
	const [text, setText] = (0, import_react.useState)("");
	const applied = useAppliedIds();
	const { results, status, loadMore } = usePaginatedQuery(api.campaigns.browse, { category }, { initialNumItems: 24 });
	const filtered = (0, import_react.useMemo)(() => {
		const t = text.trim().toLowerCase();
		return results.filter((c) => {
			if (platform && !c.platforms.includes(platform)) return false;
			if (language && (c.targetLanguage ?? "").toLowerCase() !== language.toLowerCase()) return false;
			if (!t) return true;
			return [
				c.title,
				c.product,
				c.brandName,
				c.category,
				c.description,
				c.targetLocation ?? ""
			].join(" ").toLowerCase().includes(t);
		});
	}, [
		results,
		text,
		platform,
		language
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/sponsorships.tsx:107:4",
		"data-macaly-name": "div",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/sponsorships.tsx:108:6",
				"data-macaly-name": "div",
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/sponsorships.tsx:109:8",
						"data-macaly-name": "div",
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							"data-macaly-loc": "src/routes/sponsorships.tsx:110:10",
							"data-macaly-name": "Search",
							className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/sponsorships.tsx:111:10",
							"data-macaly-name": "Input",
							className: "pl-9",
							placeholder: t("sp.search"),
							value: text,
							onChange: (e) => setText(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/sponsorships.tsx:113:8",
						"data-macaly-name": "div",
						className: "-mx-4 flex gap-2 overflow-x-auto px-4 pb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
							"data-macaly-loc": "src/routes/sponsorships.tsx:114:10",
							"data-macaly-name": "FilterChip",
							on: !category,
							onClick: () => setCategory(void 0),
							children: t("sp.allCategories")
						}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
							"data-macaly-loc": "src/routes/sponsorships.tsx:116:12",
							"data-macaly-name": "FilterChip",
							on: category === c,
							onClick: () => setCategory(category === c ? void 0 : c),
							children: c
						}, c))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-macaly-loc": "src/routes/sponsorships.tsx:119:8",
						"data-macaly-name": "div",
						className: "-mx-4 flex gap-2 overflow-x-auto px-4 pb-1",
						children: PLATFORMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
							"data-macaly-loc": "src/routes/sponsorships.tsx:121:12",
							"data-macaly-name": "FilterChip",
							on: platform === p.id,
							onClick: () => setPlatform(platform === p.id ? void 0 : p.id),
							children: p.label
						}, p.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePicker, {
						"data-macaly-loc": "src/routes/sponsorships.tsx:124:8",
						"data-macaly-name": "LanguagePicker",
						single: true,
						value: language ? [language] : [],
						onChange: (v) => setLanguage(v[0]),
						placeholder: "Filter by content language…"
					}),
					language && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/routes/sponsorships.tsx:125:21",
						"data-macaly-name": "p",
						className: "text-xs text-muted-foreground",
						children: [
							"Showing campaigns that ask for ",
							language,
							" content."
						]
					})
				]
			}),
			status === "LoadingFirstPage" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
				"data-macaly-loc": "src/routes/sponsorships.tsx:129:8",
				"data-macaly-name": "PageLoading"
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/sponsorships.tsx:131:8",
				"data-macaly-name": "div",
				className: "mt-6 rounded-xl border border-dashed p-8 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/sponsorships.tsx:132:10",
					"data-macaly-name": "p",
					className: "font-medium",
					children: t("sp.noOpen")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-macaly-loc": "src/routes/sponsorships.tsx:133:10",
					"data-macaly-name": "p",
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"Try another filter",
						status === "CanLoadMore" ? " or load more results" : "",
						"."
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/routes/sponsorships.tsx:136:8",
				"data-macaly-name": "div",
				className: "mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
				"data-state": "ready",
				children: filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampaignCard, {
					"data-macaly-loc": "src/routes/sponsorships.tsx:138:12",
					"data-macaly-name": "CampaignCard",
					c,
					applied: applied.has(c._id)
				}, c._id))
			}),
			status === "CanLoadMore" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/routes/sponsorships.tsx:144:8",
				"data-macaly-name": "Button",
				variant: "outline",
				className: "mt-6 w-full",
				onClick: () => loadMore(24),
				children: t("sp.loadMore")
			}),
			status === "LoadingMore" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/sponsorships.tsx:146:35",
				"data-macaly-name": "p",
				className: "mt-6 text-center text-sm text-muted-foreground",
				children: "Loading…"
			})
		]
	});
}
function FilterChip({ on, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"data-macaly-loc": "src/routes/sponsorships.tsx:153:4",
		"data-macaly-name": "button",
		onClick,
		className: cn("shrink-0 rounded-full border px-3 py-1.5 text-sm", on ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"),
		children
	});
}
//#endregion
export { Sponsorships as component };
