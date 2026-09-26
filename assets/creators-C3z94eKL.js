import { D as require_jsx_runtime, dt as __toESM, lt as require_react, n as createLucideIcon, t as api } from "./api-D74LnTM3.js";
import { a as Button, f as Search, o as cn, r as PageLoading, t as AppShell } from "./app-shell-CtDeXJqm.js";
import { t as usePaginatedQuery } from "./use_paginated_query-BBYyLgEn.js";
import { r as PLATFORMS, t as CATEGORIES } from "./cube3-DuAq7Ab3.js";
import { t as Switch } from "./switch-oF6pMvOr.js";
import { t as Label } from "./label-Da9P26Y4.js";
import { t as Input } from "./input-C91OdWl8.js";
import { t as CreatorCard } from "./creator-card-Gud09CjH.js";
import { t as LanguagePicker } from "./language-picker-0bZF-D4m.js";
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SlidersHorizontal = createLucideIcon("sliders-horizontal", [
	["path", {
		d: "M10 5H3",
		key: "1qgfaw"
	}],
	["path", {
		d: "M12 19H3",
		key: "yhmn1j"
	}],
	["path", {
		d: "M14 3v4",
		key: "1sua03"
	}],
	["path", {
		d: "M16 17v4",
		key: "1q0r14"
	}],
	["path", {
		d: "M21 12h-9",
		key: "1o4lsq"
	}],
	["path", {
		d: "M21 19h-5",
		key: "1rlt1p"
	}],
	["path", {
		d: "M21 5h-7",
		key: "1oszz2"
	}],
	["path", {
		d: "M8 10v4",
		key: "tgpxqk"
	}],
	["path", {
		d: "M8 12H3",
		key: "a7s4jb"
	}]
]);
//#endregion
//#region src/routes/creators.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useDebounced(value, ms = 300) {
	const [v, setV] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setV(value), ms);
		return () => clearTimeout(t);
	}, [value, ms]);
	return v;
}
function CreatorsPage() {
	const [text, setText] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)();
	const [platform, setPlatform] = (0, import_react.useState)();
	const [language, setLanguage] = (0, import_react.useState)();
	const [country, setCountry] = (0, import_react.useState)("");
	const [minFollowers, setMinFollowers] = (0, import_react.useState)("");
	const [verifiedOnly, setVerifiedOnly] = (0, import_react.useState)(false);
	const [showFilters, setShowFilters] = (0, import_react.useState)(false);
	const args = {
		text: useDebounced(text) || void 0,
		category,
		platform,
		language,
		country: useDebounced(country) || void 0,
		minFollowers: minFollowers ? Number(minFollowers) : void 0,
		verifiedOnly: verifiedOnly || void 0
	};
	const { results, status, loadMore } = usePaginatedQuery(api.creators.search, args, { initialNumItems: 24 });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/creators.tsx:51:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/creators.tsx:52:6",
			"data-macaly-name": "div",
			className: "mx-auto max-w-6xl px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-macaly-loc": "src/routes/creators.tsx:53:8",
					"data-macaly-name": "h1",
					className: "text-2xl font-bold",
					children: "Find Creators"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/creators.tsx:54:8",
					"data-macaly-name": "p",
					className: "text-sm text-muted-foreground",
					children: "Small and mid-size creators welcome. Open a campaign to see ranked matches."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/creators.tsx:56:8",
					"data-macaly-name": "div",
					className: "mt-5 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/creators.tsx:57:10",
						"data-macaly-name": "div",
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							"data-macaly-loc": "src/routes/creators.tsx:58:12",
							"data-macaly-name": "Search",
							className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/creators.tsx:59:12",
							"data-macaly-name": "Input",
							className: "pl-9",
							placeholder: "Search name, category, city, language…",
							value: text,
							onChange: (e) => setText(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-macaly-loc": "src/routes/creators.tsx:61:10",
						"data-macaly-name": "Button",
						variant: "outline",
						onClick: () => setShowFilters((s) => !s),
						"aria-expanded": showFilters,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {
							"data-macaly-loc": "src/routes/creators.tsx:62:12",
							"data-macaly-name": "SlidersHorizontal",
							className: "size-4"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-macaly-loc": "src/routes/creators.tsx:62:52",
							"data-macaly-name": "span",
							className: "hidden sm:inline",
							children: "Filters"
						})]
					})]
				}),
				showFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/creators.tsx:67:10",
					"data-macaly-name": "div",
					className: "mt-3 grid gap-4 rounded-xl border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
							"data-macaly-loc": "src/routes/creators.tsx:68:12",
							"data-macaly-name": "FilterRow",
							label: "Category",
							options: CATEGORIES,
							value: category,
							onChange: setCategory
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
							"data-macaly-loc": "src/routes/creators.tsx:69:12",
							"data-macaly-name": "FilterRow",
							label: "Platform",
							options: PLATFORMS.map((p) => p.label),
							value: platform ? PLATFORMS.find((p) => p.id === platform)?.label : void 0,
							onChange: (l) => setPlatform(l ? PLATFORMS.find((p) => p.label === l)?.id : void 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/creators.tsx:71:12",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-macaly-loc": "src/routes/creators.tsx:72:14",
								"data-macaly-name": "p",
								className: "text-sm font-medium",
								children: "Language"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePicker, {
								"data-macaly-loc": "src/routes/creators.tsx:73:14",
								"data-macaly-name": "LanguagePicker",
								single: true,
								value: language ? [language] : [],
								onChange: (v) => setLanguage(v[0])
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/creators.tsx:75:12",
							"data-macaly-name": "div",
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-macaly-loc": "src/routes/creators.tsx:76:14",
								"data-macaly-name": "div",
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-macaly-loc": "src/routes/creators.tsx:77:16",
									"data-macaly-name": "Label",
									htmlFor: "ctry",
									children: "Country"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-macaly-loc": "src/routes/creators.tsx:78:16",
									"data-macaly-name": "Input",
									id: "ctry",
									value: country,
									onChange: (e) => setCountry(e.target.value),
									placeholder: "India"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-macaly-loc": "src/routes/creators.tsx:80:14",
								"data-macaly-name": "div",
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									"data-macaly-loc": "src/routes/creators.tsx:81:16",
									"data-macaly-name": "Label",
									htmlFor: "mf",
									children: "Min. audience"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-macaly-loc": "src/routes/creators.tsx:82:16",
									"data-macaly-name": "Input",
									id: "mf",
									inputMode: "numeric",
									value: minFollowers,
									onChange: (e) => setMinFollowers(e.target.value.replace(/\D/g, "")),
									placeholder: "5000"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							"data-macaly-loc": "src/routes/creators.tsx:85:12",
							"data-macaly-name": "label",
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								"data-macaly-loc": "src/routes/creators.tsx:86:14",
								"data-macaly-name": "Switch",
								checked: verifiedOnly,
								onCheckedChange: setVerifiedOnly
							}), " Verified accounts only"]
						})
					]
				}),
				status === "LoadingFirstPage" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
					"data-macaly-loc": "src/routes/creators.tsx:92:10",
					"data-macaly-name": "PageLoading"
				}) : results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/creators.tsx:94:10",
					"data-macaly-name": "div",
					className: "mt-6 rounded-xl border border-dashed p-8 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/routes/creators.tsx:95:12",
						"data-macaly-name": "p",
						className: "font-medium",
						children: ["No creators found", status === "CanLoadMore" ? " in this batch" : ""]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/routes/creators.tsx:96:12",
						"data-macaly-name": "p",
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							"Try fewer filters",
							status === "CanLoadMore" ? " or load more" : "",
							"."
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/routes/creators.tsx:99:10",
					"data-macaly-name": "div",
					className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					"data-state": "ready",
					children: results.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatorCard, {
						"data-macaly-loc": "src/routes/creators.tsx:100:32",
						"data-macaly-name": "CreatorCard",
						c
					}, c.userId))
				}),
				status === "CanLoadMore" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/creators.tsx:105:10",
					"data-macaly-name": "Button",
					variant: "outline",
					className: "mt-6 w-full",
					onClick: () => loadMore(24),
					children: "Load more creators"
				})
			]
		})
	});
}
function FilterRow({ label, options, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/creators.tsx:114:4",
		"data-macaly-name": "div",
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-macaly-loc": "src/routes/creators.tsx:115:6",
			"data-macaly-name": "p",
			className: "text-sm font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-macaly-loc": "src/routes/creators.tsx:116:6",
			"data-macaly-name": "div",
			className: "-mx-4 flex gap-2 overflow-x-auto px-4 pb-1",
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"data-macaly-loc": "src/routes/creators.tsx:118:10",
				"data-macaly-name": "button",
				onClick: () => onChange(value === o ? void 0 : o),
				className: cn("shrink-0 rounded-full border px-3 py-1 text-sm", value === o ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"),
				children: o
			}, o))
		})]
	});
}
//#endregion
export { CreatorsPage as component };
