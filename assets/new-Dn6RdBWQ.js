import { ht as __toESM, j as require_jsx_runtime, m as useQuery, p as useMutation, pt as require_react, t as api } from "./api-DJqU9p-G.js";
import { t as useNavigate } from "./useNavigate-_yYfcLdj.js";
import { a as Button, i as RequireProfile, t as AppShell } from "./app-shell-BzN9KHqO.js";
import { t as Plus } from "./plus-CpSjG8JO.js";
import { t as X } from "./x-L6wRmoZC.js";
import { n as toast } from "./dist-B6VFZ26f.js";
import { d as currencyForCountry, r as PLATFORMS, t as CATEGORIES, u as CURRENCIES } from "./cube3-BhcyVTyu.js";
import { t as Label } from "./label-BFLP22M6.js";
import { t as Input } from "./input-DAWToyPJ.js";
import { t as Textarea } from "./textarea-Du1JR257.js";
import { t as Chips } from "./chips-BsymWY34.js";
import { t as CountryPicker } from "./country-picker-DM07ioWK.js";
import { t as LanguagePicker } from "./language-picker-DF0mbcBd.js";
//#region src/routes/campaigns/new.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewCampaignPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/campaigns/new.tsx:23:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireProfile, {
			"data-macaly-loc": "src/routes/campaigns/new.tsx:24:6",
			"data-macaly-name": "RequireProfile",
			role: "brand",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewCampaignForm, {
				"data-macaly-loc": "src/routes/campaigns/new.tsx:25:8",
				"data-macaly-name": "NewCampaignForm"
			})
		})
	});
}
var OBJECTIVES = [
	"Product awareness",
	"App installs",
	"Sales / conversions",
	"Launch",
	"Brand trust"
];
var num = (s) => s.trim() ? Number(s) : void 0;
function NewCampaignForm() {
	const create = useMutation(api.campaigns.create);
	const me = useQuery(api.profiles.getMyProfileFull);
	const [currencyTouched, setCurrencyTouched] = (0, import_react.useState)(false);
	const [currencyState, setCurrency] = (0, import_react.useState)(null);
	const currency = currencyState ?? currencyForCountry(me?.profile.country);
	const navigate = useNavigate();
	const [title, setTitle] = (0, import_react.useState)("");
	const [product, setProduct] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [objective, setObjective] = (0, import_react.useState)([]);
	const [category, setCategory] = (0, import_react.useState)([]);
	const [platforms, setPlatforms] = (0, import_react.useState)(["YouTube"]);
	const [minFollowers, setMinFollowers] = (0, import_react.useState)("");
	const [minViews, setMinViews] = (0, import_react.useState)("");
	const [location, setLocation] = (0, import_react.useState)("");
	const [language, setLanguage] = (0, import_react.useState)([]);
	const [deliverables, setDeliverables] = (0, import_react.useState)(["1 YouTube integration"]);
	const [newDeliverable, setNewDeliverable] = (0, import_react.useState)("");
	const [budgetMin, setBudgetMin] = (0, import_react.useState)("");
	const [budgetMax, setBudgetMax] = (0, import_react.useState)("");
	const [deadline, setDeadline] = (0, import_react.useState)("");
	const [duration, setDuration] = (0, import_react.useState)("");
	const [extra, setExtra] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	async function submit(e) {
		e.preventDefault();
		if (category.length === 0) return void toast.error("Choose a creator category.");
		setBusy(true);
		try {
			const platformIds = platforms.map((label) => PLATFORMS.find((p) => p.label === label)?.id).filter((x) => !!x);
			const res = await create({
				title,
				product,
				description: objective.length ? `Objective: ${objective[0]}\n\n${description}` : description,
				category: category[0],
				platforms: platformIds,
				minFollowers: num(minFollowers),
				minAvgViews: num(minViews),
				targetLocation: location || void 0,
				targetLanguage: language[0],
				deliverables,
				budgetMinInr: num(budgetMin),
				budgetMaxInr: num(budgetMax),
				currency,
				applicationDeadline: deadline ? (/* @__PURE__ */ new Date(`${deadline}T23:59:59`)).getTime() : void 0,
				duration: duration || void 0,
				additionalRequirements: extra || void 0
			});
			if (!res.ok) return void toast.error(res.message);
			toast.success("Campaign published");
			navigate({
				to: "/campaigns/$campaignId",
				params: { campaignId: res.campaignId }
			});
		} catch (err) {
			console.error("create campaign failed", err);
			toast.error("Couldn't publish campaign.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		"data-macaly-loc": "src/routes/campaigns/new.tsx:101:4",
		"data-macaly-name": "form",
		onSubmit: submit,
		className: "mx-auto grid max-w-2xl gap-6 px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/campaigns/new.tsx:102:6",
				"data-macaly-name": "div",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-macaly-loc": "src/routes/campaigns/new.tsx:103:8",
					"data-macaly-name": "h1",
					className: "text-2xl font-bold",
					children: "Create a campaign"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/campaigns/new.tsx:104:8",
					"data-macaly-name": "p",
					className: "text-sm text-muted-foreground",
					children: "Describe what you need. Cube3 matches it with creators who fit."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				"data-macaly-loc": "src/routes/campaigns/new.tsx:107:6",
				"data-macaly-name": "Section",
				title: "The campaign",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/routes/campaigns/new.tsx:108:8",
						"data-macaly-name": "Field",
						label: "Campaign title",
						id: "t",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/campaigns/new.tsx:109:10",
							"data-macaly-name": "Input",
							id: "t",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							required: true,
							maxLength: 120,
							placeholder: "Wireless earbuds launch – tech YouTubers"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/routes/campaigns/new.tsx:111:8",
						"data-macaly-name": "Field",
						label: "Product / service",
						id: "p",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/campaigns/new.tsx:112:10",
							"data-macaly-name": "Input",
							id: "p",
							value: product,
							onChange: (e) => setProduct(e.target.value),
							required: true,
							maxLength: 120,
							placeholder: "TechGear X2 Wireless Earbuds"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/routes/campaigns/new.tsx:114:8",
						"data-macaly-name": "Field",
						label: "Description",
						id: "d",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							"data-macaly-loc": "src/routes/campaigns/new.tsx:115:10",
							"data-macaly-name": "Textarea",
							id: "d",
							rows: 4,
							value: description,
							onChange: (e) => setDescription(e.target.value),
							required: true,
							maxLength: 3800,
							placeholder: "Looking for Indian technology YouTubers with 10K+ subscribers to review our new wireless earbuds…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/routes/campaigns/new.tsx:117:8",
						"data-macaly-name": "Field",
						label: "Objective",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
							"data-macaly-loc": "src/routes/campaigns/new.tsx:117:33",
							"data-macaly-name": "Chips",
							options: OBJECTIVES,
							value: objective,
							onChange: setObjective,
							single: true
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				"data-macaly-loc": "src/routes/campaigns/new.tsx:120:6",
				"data-macaly-name": "Section",
				title: "Creator requirements",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/routes/campaigns/new.tsx:121:8",
						"data-macaly-name": "Field",
						label: "Creator category",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
							"data-macaly-loc": "src/routes/campaigns/new.tsx:121:40",
							"data-macaly-name": "Chips",
							options: CATEGORIES,
							value: category,
							onChange: setCategory,
							single: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/routes/campaigns/new.tsx:122:8",
						"data-macaly-name": "Field",
						label: "Platforms",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
							"data-macaly-loc": "src/routes/campaigns/new.tsx:122:33",
							"data-macaly-name": "Chips",
							options: PLATFORMS.map((p) => p.label),
							value: platforms,
							onChange: setPlatforms
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/campaigns/new.tsx:123:8",
						"data-macaly-name": "div",
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							"data-macaly-loc": "src/routes/campaigns/new.tsx:124:10",
							"data-macaly-name": "Field",
							label: "Min. subscribers / followers",
							id: "mf",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/routes/campaigns/new.tsx:125:12",
								"data-macaly-name": "Input",
								id: "mf",
								inputMode: "numeric",
								value: minFollowers,
								onChange: (e) => setMinFollowers(e.target.value.replace(/\D/g, "")),
								placeholder: "10000"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							"data-macaly-loc": "src/routes/campaigns/new.tsx:127:10",
							"data-macaly-name": "Field",
							label: "Min. average views",
							id: "mv",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/routes/campaigns/new.tsx:128:12",
								"data-macaly-name": "Input",
								id: "mv",
								inputMode: "numeric",
								value: minViews,
								onChange: (e) => setMinViews(e.target.value.replace(/\D/g, "")),
								placeholder: "3000"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/routes/campaigns/new.tsx:131:8",
						"data-macaly-name": "Field",
						label: "Creator / audience country",
						id: "loc",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryPicker, {
							"data-macaly-loc": "src/routes/campaigns/new.tsx:132:10",
							"data-macaly-name": "CountryPicker",
							id: "loc",
							value: location,
							onChange: setLocation,
							anywhereLabel: "Anywhere in the world"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/routes/campaigns/new.tsx:134:8",
						"data-macaly-name": "Field",
						label: "Content language (optional)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePicker, {
							"data-macaly-loc": "src/routes/campaigns/new.tsx:134:51",
							"data-macaly-name": "LanguagePicker",
							value: language,
							onChange: setLanguage,
							single: true,
							placeholder: "Any language — or search one"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				"data-macaly-loc": "src/routes/campaigns/new.tsx:137:6",
				"data-macaly-name": "Section",
				title: "Deliverables & budget",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/campaigns/new.tsx:138:8",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/campaigns/new.tsx:139:10",
								"data-macaly-name": "Label",
								children: "Deliverables"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								"data-macaly-loc": "src/routes/campaigns/new.tsx:140:10",
								"data-macaly-name": "ul",
								className: "grid gap-2",
								children: deliverables.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									"data-macaly-loc": "src/routes/campaigns/new.tsx:142:14",
									"data-macaly-name": "li",
									className: "flex items-center justify-between rounded-lg border px-3 py-2 text-sm",
									children: [d, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										"data-macaly-loc": "src/routes/campaigns/new.tsx:144:16",
										"data-macaly-name": "button",
										type: "button",
										"aria-label": "Remove deliverable",
										onClick: () => setDeliverables(deliverables.filter((_, j) => j !== i)),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
											"data-macaly-loc": "src/routes/campaigns/new.tsx:144:142",
											"data-macaly-name": "X",
											className: "size-4"
										})
									})]
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-macaly-loc": "src/routes/campaigns/new.tsx:148:10",
								"data-macaly-name": "div",
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-macaly-loc": "src/routes/campaigns/new.tsx:149:12",
									"data-macaly-name": "Input",
									value: newDeliverable,
									onChange: (e) => setNewDeliverable(e.target.value),
									placeholder: "e.g. 1 Instagram Story",
									maxLength: 120
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-macaly-loc": "src/routes/campaigns/new.tsx:150:12",
									"data-macaly-name": "Button",
									type: "button",
									variant: "secondary",
									onClick: () => {
										if (newDeliverable.trim()) {
											setDeliverables([...deliverables, newDeliverable.trim()]);
											setNewDeliverable("");
										}
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
										"data-macaly-loc": "src/routes/campaigns/new.tsx:151:14",
										"data-macaly-name": "Plus",
										className: "size-4"
									}), "Add"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/campaigns/new.tsx:155:8",
						"data-macaly-name": "div",
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-macaly-loc": "src/routes/campaigns/new.tsx:156:10",
								"data-macaly-name": "div",
								className: "col-span-2 grid gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										"data-macaly-loc": "src/routes/campaigns/new.tsx:157:12",
										"data-macaly-name": "Label",
										htmlFor: "cur",
										children: "Currency"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										"data-macaly-loc": "src/routes/campaigns/new.tsx:158:12",
										"data-macaly-name": "select",
										id: "cur",
										value: currency,
										onChange: (e) => {
											setCurrency(e.target.value);
											setCurrencyTouched(true);
										},
										className: "h-9 rounded-md border bg-background px-3 text-sm",
										children: CURRENCIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											"data-macaly-loc": "src/routes/campaigns/new.tsx:164:37",
											"data-macaly-name": "option",
											value: c.code,
											children: [
												c.code,
												" — ",
												c.label
											]
										}, c.code))
									}),
									!currencyTouched && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-macaly-loc": "src/routes/campaigns/new.tsx:166:33",
										"data-macaly-name": "p",
										className: "text-[11px] text-muted-foreground",
										children: "Based on your country. Creators see the budget and offers in this currency."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"data-macaly-loc": "src/routes/campaigns/new.tsx:168:10",
								"data-macaly-name": "Field",
								label: `Budget min (${currency})`,
								id: "bmin",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-macaly-loc": "src/routes/campaigns/new.tsx:169:12",
									"data-macaly-name": "Input",
									id: "bmin",
									inputMode: "numeric",
									value: budgetMin,
									onChange: (e) => setBudgetMin(e.target.value.replace(/\D/g, "")),
									placeholder: "10000"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"data-macaly-loc": "src/routes/campaigns/new.tsx:171:10",
								"data-macaly-name": "Field",
								label: `Budget max (${currency})`,
								id: "bmax",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-macaly-loc": "src/routes/campaigns/new.tsx:172:12",
									"data-macaly-name": "Input",
									id: "bmax",
									inputMode: "numeric",
									value: budgetMax,
									onChange: (e) => setBudgetMax(e.target.value.replace(/\D/g, "")),
									placeholder: "20000"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"data-macaly-loc": "src/routes/campaigns/new.tsx:174:10",
								"data-macaly-name": "Field",
								label: "Application deadline",
								id: "dl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-macaly-loc": "src/routes/campaigns/new.tsx:175:12",
									"data-macaly-name": "Input",
									id: "dl",
									type: "date",
									min: today,
									value: deadline,
									onChange: (e) => setDeadline(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"data-macaly-loc": "src/routes/campaigns/new.tsx:177:10",
								"data-macaly-name": "Field",
								label: "Campaign duration",
								id: "du",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-macaly-loc": "src/routes/campaigns/new.tsx:178:12",
									"data-macaly-name": "Input",
									id: "du",
									value: duration,
									onChange: (e) => setDuration(e.target.value),
									placeholder: "2 weeks",
									maxLength: 60
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/routes/campaigns/new.tsx:181:8",
						"data-macaly-name": "Field",
						label: "Additional requirements",
						id: "ex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							"data-macaly-loc": "src/routes/campaigns/new.tsx:182:10",
							"data-macaly-name": "Textarea",
							id: "ex",
							rows: 2,
							value: extra,
							onChange: (e) => setExtra(e.target.value),
							maxLength: 2e3,
							placeholder: "Product shipped to creator; honest review expected; disclose as paid partnership."
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/routes/campaigns/new.tsx:186:6",
				"data-macaly-name": "Button",
				type: "submit",
				disabled: busy,
				className: "h-12 bg-brand text-brand-foreground hover:bg-brand/90",
				children: busy ? "Publishing…" : "Publish campaign"
			})
		]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/routes/campaigns/new.tsx:195:4",
		"data-macaly-name": "section",
		className: "grid gap-4 rounded-xl border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			"data-macaly-loc": "src/routes/campaigns/new.tsx:196:6",
			"data-macaly-name": "h2",
			className: "font-semibold",
			children: title
		}), children]
	});
}
function Field({ label, id, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/campaigns/new.tsx:204:4",
		"data-macaly-name": "div",
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			"data-macaly-loc": "src/routes/campaigns/new.tsx:205:6",
			"data-macaly-name": "Label",
			htmlFor: id,
			children: label
		}), children]
	});
}
//#endregion
export { NewCampaignPage as component };
