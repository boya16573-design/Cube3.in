import { D as require_jsx_runtime, dt as __toESM, l as useMutation, lt as require_react, n as createLucideIcon, t as api, u as useQuery } from "./api-D74LnTM3.js";
import { t as useNavigate } from "./useNavigate-BFWl-dPi.js";
import { a as Button, n as EmptyState, o as cn, r as PageLoading, t as AppShell } from "./app-shell-CtDeXJqm.js";
import { n as toast } from "./dist-CXIX0U2y.js";
import { t as Route } from "./onboarding-DDXS52gt.js";
import { n as CONTENT_TYPES, t as CATEGORIES } from "./cube3-DuAq7Ab3.js";
import { t as Label } from "./label-Da9P26Y4.js";
import { t as Input } from "./input-C91OdWl8.js";
import { t as Textarea } from "./textarea-DwJpEbSB.js";
import { t as LanguagePicker } from "./language-picker-0bZF-D4m.js";
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Building2 = createLucideIcon("building-2", [
	["path", {
		d: "M10 12h4",
		key: "a56b0p"
	}],
	["path", {
		d: "M10 8h4",
		key: "1sr2af"
	}],
	["path", {
		d: "M14 21v-3a2 2 0 0 0-4 0v3",
		key: "1rgiei"
	}],
	["path", {
		d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
		key: "secmi2"
	}],
	["path", {
		d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",
		key: "16ra0t"
	}]
]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Video = createLucideIcon("video", [["path", {
	d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
	key: "ftymec"
}], ["rect", {
	x: "2",
	y: "6",
	width: "14",
	height: "12",
	rx: "2",
	key: "158x01"
}]]);
//#endregion
//#region src/routes/onboarding.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Chips({ options, value, onChange, single }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-macaly-loc": "src/routes/onboarding.tsx:38:4",
		"data-macaly-name": "div",
		className: "flex flex-wrap gap-2",
		children: options.map((o) => {
			const on = value.includes(o);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"data-macaly-loc": "src/routes/onboarding.tsx:42:10",
				"data-macaly-name": "button",
				type: "button",
				onClick: () => onChange(single ? [o] : on ? value.filter((x) => x !== o) : [...value, o]),
				className: cn("rounded-full border px-3 py-1.5 text-sm transition", on ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"),
				"aria-pressed": on,
				children: o
			}, o);
		})
	});
}
function Onboarding() {
	const search = Route.useSearch();
	const me = useQuery(api.authz.whoAmI);
	const navigate = useNavigate();
	const complete = useMutation(api.profiles.completeOnboarding);
	const [role, setRole] = (0, import_react.useState)(search.role);
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [bio, setBio] = (0, import_react.useState)("");
	const [country, setCountry] = (0, import_react.useState)("India");
	const [city, setCity] = (0, import_react.useState)("");
	const [languages, setLanguages] = (0, import_react.useState)(["English"]);
	const [category, setCategory] = (0, import_react.useState)([]);
	const [contentTypes, setContentTypes] = (0, import_react.useState)([]);
	const [companyName, setCompanyName] = (0, import_react.useState)("");
	const [website, setWebsite] = (0, import_react.useState)("");
	const [industry, setIndustry] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const uname = username.trim().toLowerCase();
	const available = useQuery(api.profiles.isUsernameAvailable, uname.length >= 3 ? { username: uname } : "skip");
	(0, import_react.useEffect)(() => {
		if (me?.signedIn && me.profile) navigate({ to: "/dashboard" });
	}, [me, navigate]);
	if (me === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/onboarding.tsx:89:31",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
			"data-macaly-loc": "src/routes/onboarding.tsx:89:41",
			"data-macaly-name": "PageLoading"
		})
	});
	if (!me.signedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/onboarding.tsx:92:6",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			"data-macaly-loc": "src/routes/onboarding.tsx:93:8",
			"data-macaly-name": "EmptyState",
			title: "Sign in first",
			body: "Create your account with your email, then set up your profile.",
			cta: {
				to: "/signin",
				label: "Sign in"
			}
		})
	});
	async function submit(e) {
		e.preventDefault();
		if (!role) return;
		if (role === "creator" && category.length === 0) {
			toast.error("Pick your main content category.");
			return;
		}
		setBusy(true);
		try {
			const res = await complete({
				role,
				displayName,
				username: uname,
				bio: bio || void 0,
				country: country || void 0,
				city: city || void 0,
				languages,
				category: role === "creator" ? category[0] : void 0,
				contentTypes: role === "creator" ? contentTypes : void 0,
				companyName: role === "brand" ? companyName || displayName : void 0,
				website: role === "brand" ? website || void 0 : void 0,
				industry: role === "brand" ? industry[0] : void 0
			});
			if (!res.ok) {
				toast.error(res.message);
				return;
			}
			toast.success("Welcome to Cube3!");
			navigate({ to: role === "creator" ? "/profile" : "/campaigns/new" });
		} catch (err) {
			console.error("onboarding failed", err);
			toast.error("Something went wrong. Please try again.");
		} finally {
			setBusy(false);
		}
	}
	if (!role) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/onboarding.tsx:137:6",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/onboarding.tsx:138:8",
			"data-macaly-name": "div",
			className: "mx-auto max-w-lg px-4 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-macaly-loc": "src/routes/onboarding.tsx:139:10",
				"data-macaly-name": "h1",
				className: "text-2xl font-bold",
				children: "How will you use Cube3?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/routes/onboarding.tsx:140:10",
				"data-macaly-name": "div",
				className: "mt-6 grid gap-3",
				children: [{
					r: "creator",
					icon: Video,
					t: "I'm a creator",
					d: "Find sponsorships that match my audience."
				}, {
					r: "brand",
					icon: Building2,
					t: "I'm a brand",
					d: "Find creators for my campaigns."
				}].map(({ r, icon: Icon, t, d }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					"data-macaly-loc": "src/routes/onboarding.tsx:145:14",
					"data-macaly-name": "button",
					onClick: () => setRole(r),
					className: "flex items-center gap-4 rounded-xl border p-5 text-left hover:border-brand hover:bg-brand-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-macaly-loc": "src/routes/onboarding.tsx:146:16",
						"data-macaly-name": "span",
						className: "grid size-11 place-items-center rounded-lg bg-brand-soft text-brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							"data-macaly-loc": "src/routes/onboarding.tsx:146:102",
							"data-macaly-name": "Icon",
							className: "size-5"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"data-macaly-loc": "src/routes/onboarding.tsx:147:16",
						"data-macaly-name": "span",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-macaly-loc": "src/routes/onboarding.tsx:148:18",
							"data-macaly-name": "span",
							className: "block font-semibold",
							children: t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-macaly-loc": "src/routes/onboarding.tsx:149:18",
							"data-macaly-name": "span",
							className: "block text-sm text-muted-foreground",
							children: d
						})]
					})]
				}, r))
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/onboarding.tsx:160:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			"data-macaly-loc": "src/routes/onboarding.tsx:161:6",
			"data-macaly-name": "form",
			onSubmit: submit,
			className: "mx-auto grid max-w-lg gap-5 px-4 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:162:8",
					"data-macaly-name": "div",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-macaly-loc": "src/routes/onboarding.tsx:163:10",
							"data-macaly-name": "p",
							className: "text-xs font-semibold uppercase tracking-wide text-brand",
							children: [role === "creator" ? "Creator" : "Brand", " setup"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							"data-macaly-loc": "src/routes/onboarding.tsx:164:10",
							"data-macaly-name": "h1",
							className: "mt-1 text-2xl font-bold",
							children: ["Tell us about ", role === "creator" ? "yourself" : "your brand"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"data-macaly-loc": "src/routes/onboarding.tsx:165:10",
							"data-macaly-name": "button",
							type: "button",
							onClick: () => setRole(void 0),
							className: "mt-1 text-sm text-muted-foreground underline",
							children: "Change account type"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:168:8",
					"data-macaly-name": "div",
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-macaly-loc": "src/routes/onboarding.tsx:169:10",
						"data-macaly-name": "Label",
						htmlFor: "name",
						children: role === "creator" ? "Your name / creator name" : "Your name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						"data-macaly-loc": "src/routes/onboarding.tsx:170:10",
						"data-macaly-name": "Input",
						id: "name",
						value: displayName,
						onChange: (e) => setDisplayName(e.target.value),
						required: true,
						maxLength: 80
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:173:8",
					"data-macaly-name": "div",
					className: "grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:174:10",
							"data-macaly-name": "Label",
							htmlFor: "username",
							children: "Username"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/onboarding.tsx:175:10",
							"data-macaly-name": "Input",
							id: "username",
							value: username,
							onChange: (e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")),
							placeholder: "techwithravi",
							required: true,
							minLength: 3,
							maxLength: 30
						}),
						uname.length >= 3 && available !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-macaly-loc": "src/routes/onboarding.tsx:185:12",
							"data-macaly-name": "p",
							className: cn("text-xs", available ? "text-success" : "text-destructive"),
							children: available ? `cube3 profile: /c/${uname}` : "Taken or invalid — try another"
						})
					]
				}),
				role === "brand" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/onboarding.tsx:193:12",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:194:14",
							"data-macaly-name": "Label",
							htmlFor: "company",
							children: "Company / brand name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/onboarding.tsx:195:14",
							"data-macaly-name": "Input",
							id: "company",
							value: companyName,
							onChange: (e) => setCompanyName(e.target.value),
							required: true,
							maxLength: 100
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/onboarding.tsx:197:12",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:198:14",
							"data-macaly-name": "Label",
							htmlFor: "website",
							children: "Website"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/onboarding.tsx:199:14",
							"data-macaly-name": "Input",
							id: "website",
							value: website,
							onChange: (e) => setWebsite(e.target.value),
							placeholder: "https://",
							maxLength: 200
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/onboarding.tsx:201:12",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:202:14",
							"data-macaly-name": "Label",
							children: "Industry"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
							"data-macaly-loc": "src/routes/onboarding.tsx:203:14",
							"data-macaly-name": "Chips",
							options: CATEGORIES,
							value: industry,
							onChange: setIndustry,
							single: true
						})]
					})
				] }),
				role === "creator" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:210:12",
					"data-macaly-name": "div",
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-macaly-loc": "src/routes/onboarding.tsx:211:14",
						"data-macaly-name": "Label",
						children: "Main content category"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
						"data-macaly-loc": "src/routes/onboarding.tsx:212:14",
						"data-macaly-name": "Chips",
						options: CATEGORIES,
						value: category,
						onChange: setCategory,
						single: true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:214:12",
					"data-macaly-name": "div",
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-macaly-loc": "src/routes/onboarding.tsx:215:14",
						"data-macaly-name": "Label",
						children: "Content types"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
						"data-macaly-loc": "src/routes/onboarding.tsx:216:14",
						"data-macaly-name": "Chips",
						options: CONTENT_TYPES,
						value: contentTypes,
						onChange: setContentTypes
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:221:8",
					"data-macaly-name": "div",
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-macaly-loc": "src/routes/onboarding.tsx:222:10",
						"data-macaly-name": "Label",
						htmlFor: "bio",
						children: role === "creator" ? "Bio" : "About the brand"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						"data-macaly-loc": "src/routes/onboarding.tsx:223:10",
						"data-macaly-name": "Textarea",
						id: "bio",
						value: bio,
						onChange: (e) => setBio(e.target.value),
						maxLength: 600,
						rows: 3
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:226:8",
					"data-macaly-name": "div",
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/onboarding.tsx:227:10",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:228:12",
							"data-macaly-name": "Label",
							htmlFor: "country",
							children: "Country"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/onboarding.tsx:229:12",
							"data-macaly-name": "Input",
							id: "country",
							value: country,
							onChange: (e) => setCountry(e.target.value),
							maxLength: 60
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/onboarding.tsx:231:10",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:232:12",
							"data-macaly-name": "Label",
							htmlFor: "city",
							children: "City / region"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/onboarding.tsx:233:12",
							"data-macaly-name": "Input",
							id: "city",
							value: city,
							onChange: (e) => setCity(e.target.value),
							maxLength: 60
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:237:8",
					"data-macaly-name": "div",
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-macaly-loc": "src/routes/onboarding.tsx:238:10",
						"data-macaly-name": "Label",
						children: role === "creator" ? "Languages you create in" : "Languages"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePicker, {
						"data-macaly-loc": "src/routes/onboarding.tsx:239:10",
						"data-macaly-name": "LanguagePicker",
						value: languages,
						onChange: setLanguages
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/onboarding.tsx:242:8",
					"data-macaly-name": "Button",
					type: "submit",
					disabled: busy || available === false,
					className: "h-11 bg-brand text-brand-foreground hover:bg-brand/90",
					children: busy ? "Saving…" : "Create profile"
				})
			]
		})
	});
}
//#endregion
export { Onboarding as component };
