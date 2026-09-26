import { Ct as __toESM, S as useQuery, n as cn, s as api, t as Button, xt as require_react, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { o as Search, r as PageLoading, t as AppShell } from "./app-shell-GoO9XvM6.js";
import { t as SlidersHorizontal } from "./sliders-horizontal-CCLyyTKv.js";
import { t as Label } from "./label-DdaoZkXu.js";
import { t as EventCard } from "./event-card-BSHjCeD3.js";
import { t as Input } from "./input-BQJAkDLz.js";
import { t as CountryPicker } from "./country-picker-T_YB6ZlU.js";
import { t as EVENT_CATEGORIES } from "./eventMatching--BdHk_j6.js";
//#region src/routes/events/index.tsx?tsr-split=component
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
var SORTS = [
	["relevant", "Most relevant"],
	["date", "Soonest"],
	["newest", "Newest"],
	["audience", "Largest audience"],
	["budget", "Largest budget"]
];
function Chip({ on, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"data-macaly-loc": "src/routes/events/index.tsx:41:4",
		"data-macaly-name": "button",
		type: "button",
		onClick,
		className: cn("shrink-0 rounded-full border px-3 py-1.5 text-sm", on ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"),
		children
	});
}
function DiscoverEvents() {
	const me = useQuery(api.authz.whoAmIv2);
	const isBrand = me?.signedIn && me.profile?.role === "brand";
	const [text, setText] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)();
	const [country, setCountry] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)();
	const [type, setType] = (0, import_react.useState)();
	const [minAudience, setMinAudience] = (0, import_react.useState)("");
	const [maxBudget, setMaxBudget] = (0, import_react.useState)("");
	const [dateFrom, setDateFrom] = (0, import_react.useState)("");
	const [dateTo, setDateTo] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)();
	const [limit, setLimit] = (0, import_react.useState)(24);
	const [showFilters, setShowFilters] = (0, import_react.useState)(false);
	const res = useQuery(api.events.discover, {
		text: useDebounced(text) || void 0,
		category,
		country: country || void 0,
		city: useDebounced(city) || void 0,
		mode,
		sponsorshipType: type,
		minAudience: minAudience ? Number(minAudience) : void 0,
		maxBudget: maxBudget ? Number(maxBudget) : void 0,
		dateFrom: dateFrom || void 0,
		dateTo: dateTo || void 0,
		sort: sort ?? (isBrand ? "relevant" : "date"),
		limit
	});
	const activeSort = sort ?? (isBrand ? "relevant" : "date");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/events/index.tsx:81:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/events/index.tsx:82:6",
			"data-macaly-name": "div",
			className: "mx-auto max-w-6xl px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-macaly-loc": "src/routes/events/index.tsx:83:8",
					"data-macaly-name": "h1",
					className: "text-2xl font-bold",
					children: "Discover events"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/events/index.tsx:84:8",
					"data-macaly-name": "p",
					className: "text-sm text-muted-foreground",
					children: "College fests, hackathons, club and community events looking for sponsors."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/events/index.tsx:86:8",
					"data-macaly-name": "div",
					className: "mt-5 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/events/index.tsx:87:10",
						"data-macaly-name": "div",
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							"data-macaly-loc": "src/routes/events/index.tsx:88:12",
							"data-macaly-name": "Search",
							className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/events/index.tsx:89:12",
							"data-macaly-name": "Input",
							className: "pl-9",
							placeholder: "Search event, college, city, interest…",
							value: text,
							onChange: (e) => setText(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-macaly-loc": "src/routes/events/index.tsx:91:10",
						"data-macaly-name": "Button",
						variant: "outline",
						onClick: () => setShowFilters((s) => !s),
						"aria-expanded": showFilters,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {
							"data-macaly-loc": "src/routes/events/index.tsx:92:12",
							"data-macaly-name": "SlidersHorizontal",
							className: "size-4"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-macaly-loc": "src/routes/events/index.tsx:92:52",
							"data-macaly-name": "span",
							className: "hidden sm:inline",
							children: "Filters"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/events/index.tsx:96:8",
					"data-macaly-name": "div",
					className: "-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						"data-macaly-loc": "src/routes/events/index.tsx:97:10",
						"data-macaly-name": "Chip",
						on: !category,
						onClick: () => setCategory(void 0),
						children: "All"
					}), EVENT_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						"data-macaly-loc": "src/routes/events/index.tsx:98:39",
						"data-macaly-name": "Chip",
						on: category === c,
						onClick: () => setCategory(category === c ? void 0 : c),
						children: c
					}, c))]
				}),
				showFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/events/index.tsx:102:10",
					"data-macaly-name": "div",
					className: "mt-3 grid gap-4 rounded-xl border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/events/index.tsx:103:12",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/events/index.tsx:103:42",
								"data-macaly-name": "Label",
								children: "Country"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryPicker, {
								"data-macaly-loc": "src/routes/events/index.tsx:103:64",
								"data-macaly-name": "CountryPicker",
								value: country,
								onChange: setCountry,
								anywhereLabel: "Any country"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/events/index.tsx:104:12",
							"data-macaly-name": "div",
							className: "grid grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-macaly-loc": "src/routes/events/index.tsx:105:14",
									"data-macaly-name": "div",
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-macaly-loc": "src/routes/events/index.tsx:105:44",
										"data-macaly-name": "Label",
										htmlFor: "city",
										children: "City"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-macaly-loc": "src/routes/events/index.tsx:105:78",
										"data-macaly-name": "Input",
										id: "city",
										value: city,
										onChange: (e) => setCity(e.target.value),
										placeholder: "Hyderabad"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-macaly-loc": "src/routes/events/index.tsx:106:14",
									"data-macaly-name": "div",
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-macaly-loc": "src/routes/events/index.tsx:106:44",
										"data-macaly-name": "Label",
										htmlFor: "aud",
										children: "Min. audience"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-macaly-loc": "src/routes/events/index.tsx:106:86",
										"data-macaly-name": "Input",
										id: "aud",
										inputMode: "numeric",
										value: minAudience,
										onChange: (e) => setMinAudience(e.target.value.replace(/\D/g, "")),
										placeholder: "500"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-macaly-loc": "src/routes/events/index.tsx:107:14",
									"data-macaly-name": "div",
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-macaly-loc": "src/routes/events/index.tsx:107:44",
										"data-macaly-name": "Label",
										htmlFor: "bud",
										children: "My max budget"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-macaly-loc": "src/routes/events/index.tsx:107:86",
										"data-macaly-name": "Input",
										id: "bud",
										inputMode: "numeric",
										value: maxBudget,
										onChange: (e) => setMaxBudget(e.target.value.replace(/\D/g, "")),
										placeholder: "in the event's currency"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-macaly-loc": "src/routes/events/index.tsx:108:14",
									"data-macaly-name": "div"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-macaly-loc": "src/routes/events/index.tsx:109:14",
									"data-macaly-name": "div",
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-macaly-loc": "src/routes/events/index.tsx:109:44",
										"data-macaly-name": "Label",
										htmlFor: "df",
										children: "From date"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-macaly-loc": "src/routes/events/index.tsx:109:81",
										"data-macaly-name": "Input",
										id: "df",
										type: "date",
										value: dateFrom,
										onChange: (e) => setDateFrom(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-macaly-loc": "src/routes/events/index.tsx:110:14",
									"data-macaly-name": "div",
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-macaly-loc": "src/routes/events/index.tsx:110:44",
										"data-macaly-name": "Label",
										htmlFor: "dt",
										children: "To date"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										"data-macaly-loc": "src/routes/events/index.tsx:110:79",
										"data-macaly-name": "Input",
										id: "dt",
										type: "date",
										value: dateTo,
										onChange: (e) => setDateTo(e.target.value)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/events/index.tsx:112:12",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/events/index.tsx:113:14",
								"data-macaly-name": "Label",
								children: "Format"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-macaly-loc": "src/routes/events/index.tsx:114:14",
								"data-macaly-name": "div",
								className: "flex flex-wrap gap-2",
								children: [
									["offline", "In person"],
									["online", "Online"],
									["hybrid", "Hybrid"]
								].map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									"data-macaly-loc": "src/routes/events/index.tsx:115:104",
									"data-macaly-name": "Chip",
									on: mode === k,
									onClick: () => setMode(mode === k ? void 0 : k),
									children: l
								}, k))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/events/index.tsx:118:12",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/events/index.tsx:119:14",
								"data-macaly-name": "Label",
								children: "Sponsorship type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-macaly-loc": "src/routes/events/index.tsx:120:14",
								"data-macaly-name": "div",
								className: "flex flex-wrap gap-2",
								children: [
									"cash",
									"product",
									"service"
								].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									"data-macaly-loc": "src/routes/events/index.tsx:121:70",
									"data-macaly-name": "Chip",
									on: type === k,
									onClick: () => setType(type === k ? void 0 : k),
									children: k[0].toUpperCase() + k.slice(1)
								}, k))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/routes/events/index.tsx:127:8",
					"data-macaly-name": "div",
					className: "-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 text-sm",
					children: SORTS.filter(([k]) => k !== "relevant" || isBrand).map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						"data-macaly-loc": "src/routes/events/index.tsx:128:78",
						"data-macaly-name": "Chip",
						on: activeSort === k,
						onClick: () => setSort(k),
						children: l
					}, k))
				}),
				isBrand && activeSort === "relevant" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/events/index.tsx:131:10",
					"data-macaly-name": "p",
					className: "mt-2 text-xs text-muted-foreground",
					children: "Match scores use your industry, country, past campaign budgets and activity. They're recommendations, not guarantees."
				}),
				res === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
					"data-macaly-loc": "src/routes/events/index.tsx:135:10",
					"data-macaly-name": "PageLoading"
				}) : res.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/events/index.tsx:137:10",
					"data-macaly-name": "div",
					className: "mt-6 rounded-xl border border-dashed p-8 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/events/index.tsx:138:12",
						"data-macaly-name": "p",
						className: "font-medium",
						children: "No upcoming events match these filters"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/events/index.tsx:139:12",
						"data-macaly-name": "p",
						className: "mt-1 text-sm text-muted-foreground",
						children: "Try fewer filters. New events are listed by organizers every week."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/routes/events/index.tsx:142:10",
					"data-macaly-name": "div",
					className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					"data-state": "ready",
					children: res.items.map(({ event, match }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, {
						"data-macaly-loc": "src/routes/events/index.tsx:143:49",
						"data-macaly-name": "EventCard",
						e: event,
						score: match?.score
					}, event._id))
				}),
				res?.hasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/events/index.tsx:146:25",
					"data-macaly-name": "Button",
					variant: "outline",
					className: "mt-6 w-full",
					onClick: () => setLimit((l) => l + 24),
					children: "Load more events"
				})
			]
		})
	});
}
//#endregion
export { DiscoverEvents as component };
