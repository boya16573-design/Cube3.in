import { Ct as __toESM, S as useQuery, n as cn, s as api, t as Button, x as useMutation, xt as require_react, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { t as useNavigate } from "./useNavigate-DGvAM-7K.js";
import { n as EmptyState, r as PageLoading, t as AppShell } from "./app-shell-GoO9XvM6.js";
import { n as GraduationCap, r as Building2, t as Video } from "./video-BysRo96f.js";
import { n as toast } from "./dist-Dfgjbbc_.js";
import { t as Route } from "./onboarding-C8I4lR2y.js";
import { n as CONTENT_TYPES, t as CATEGORIES } from "./cube3-xqG2XCU7.js";
import { t as Label } from "./label-DdaoZkXu.js";
import { t as Input } from "./input-BQJAkDLz.js";
import { t as Textarea } from "./textarea-CLFmgltT.js";
import { t as CountryPicker } from "./country-picker-T_YB6ZlU.js";
import { t as LanguagePicker } from "./language-picker-BBfdKGRx.js";
import { t as EVENT_CATEGORIES } from "./eventMatching--BdHk_j6.js";
//#region src/routes/onboarding.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Chips({ options, value, onChange, single }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-macaly-loc": "src/routes/onboarding.tsx:40:4",
		"data-macaly-name": "div",
		className: "flex flex-wrap gap-2",
		children: options.map((o) => {
			const on = value.includes(o);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"data-macaly-loc": "src/routes/onboarding.tsx:44:10",
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
	const me = useQuery(api.authz.whoAmIv2);
	const navigate = useNavigate();
	const complete = useMutation(api.profiles.completeOnboarding);
	const [role, setRole] = (0, import_react.useState)(search.role);
	const [orgName, setOrgName] = (0, import_react.useState)("");
	const [institution, setInstitution] = (0, import_react.useState)("");
	const [stateName, setStateName] = (0, import_react.useState)("");
	const [eventCats, setEventCats] = (0, import_react.useState)([]);
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [bio, setBio] = (0, import_react.useState)("");
	const [country, setCountry] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [languages, setLanguages] = (0, import_react.useState)(["English"]);
	const [category, setCategory] = (0, import_react.useState)([]);
	const [contentTypes, setContentTypes] = (0, import_react.useState)([]);
	const [companyName, setCompanyName] = (0, import_react.useState)("");
	const [website, setWebsite] = (0, import_react.useState)("");
	const [industry, setIndustry] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [accepted, setAccepted] = (0, import_react.useState)(false);
	const uname = username.trim().toLowerCase();
	const available = useQuery(api.profiles.isUsernameAvailable, uname.length >= 3 ? { username: uname } : "skip");
	(0, import_react.useEffect)(() => {
		if (me?.signedIn && me.profile) navigate({ to: "/dashboard" });
	}, [me, navigate]);
	if (me === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/onboarding.tsx:96:31",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
			"data-macaly-loc": "src/routes/onboarding.tsx:96:41",
			"data-macaly-name": "PageLoading"
		})
	});
	if (!me.signedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/onboarding.tsx:99:6",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			"data-macaly-loc": "src/routes/onboarding.tsx:100:8",
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
				acceptedTerms: accepted,
				category: role === "creator" ? category[0] : void 0,
				contentTypes: role === "creator" ? contentTypes : void 0,
				companyName: role === "brand" ? companyName || displayName : void 0,
				website: role === "brand" ? website || void 0 : void 0,
				industry: role === "brand" ? industry[0] : void 0,
				organizationName: role === "organizer" ? orgName || displayName : void 0,
				institution: role === "organizer" ? institution || void 0 : void 0,
				state: role === "organizer" ? stateName || void 0 : void 0,
				eventCategories: role === "organizer" ? eventCats : void 0
			});
			if (!res.ok) {
				toast.error(res.message);
				return;
			}
			toast.success("Welcome to Cube3!");
			navigate({ to: role === "creator" ? "/profile" : role === "organizer" ? "/events/new" : "/campaigns/new" });
		} catch (err) {
			console.error("onboarding failed", err);
			toast.error("Something went wrong. Please try again.");
		} finally {
			setBusy(false);
		}
	}
	if (!role) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/onboarding.tsx:149:6",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/onboarding.tsx:150:8",
			"data-macaly-name": "div",
			className: "mx-auto max-w-lg px-4 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-macaly-loc": "src/routes/onboarding.tsx:151:10",
				"data-macaly-name": "h1",
				className: "text-2xl font-bold",
				children: "How will you use Cube3?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/routes/onboarding.tsx:152:10",
				"data-macaly-name": "div",
				className: "mt-6 grid gap-3",
				children: [
					{
						r: "creator",
						icon: Video,
						t: "I'm a creator",
						d: "Find sponsorships that match my audience."
					},
					{
						r: "brand",
						icon: Building2,
						t: "I'm a brand",
						d: "Find creators and events to sponsor."
					},
					{
						r: "organizer",
						icon: GraduationCap,
						t: "I'm organizing an event",
						d: "Find sponsors for a college fest, hackathon, club or community event. No company needed."
					}
				].map(({ r, icon: Icon, t, d }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					"data-macaly-loc": "src/routes/onboarding.tsx:158:14",
					"data-macaly-name": "button",
					onClick: () => setRole(r),
					className: "flex items-center gap-4 rounded-xl border p-5 text-left hover:border-brand hover:bg-brand-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-macaly-loc": "src/routes/onboarding.tsx:159:16",
						"data-macaly-name": "span",
						className: "grid size-11 place-items-center rounded-lg bg-brand-soft text-brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							"data-macaly-loc": "src/routes/onboarding.tsx:159:102",
							"data-macaly-name": "Icon",
							className: "size-5"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"data-macaly-loc": "src/routes/onboarding.tsx:160:16",
						"data-macaly-name": "span",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-macaly-loc": "src/routes/onboarding.tsx:161:18",
							"data-macaly-name": "span",
							className: "block font-semibold",
							children: t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-macaly-loc": "src/routes/onboarding.tsx:162:18",
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
		"data-macaly-loc": "src/routes/onboarding.tsx:173:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			"data-macaly-loc": "src/routes/onboarding.tsx:174:6",
			"data-macaly-name": "form",
			onSubmit: submit,
			className: "mx-auto grid max-w-lg gap-5 px-4 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:175:8",
					"data-macaly-name": "div",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-macaly-loc": "src/routes/onboarding.tsx:176:10",
							"data-macaly-name": "p",
							className: "text-xs font-semibold uppercase tracking-wide text-brand",
							children: [role === "creator" ? "Creator" : role === "organizer" ? "Event organizer" : "Brand", " setup"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							"data-macaly-loc": "src/routes/onboarding.tsx:177:10",
							"data-macaly-name": "h1",
							className: "mt-1 text-2xl font-bold",
							children: ["Tell us about ", role === "creator" ? "yourself" : role === "organizer" ? "your club or event team" : "your brand"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"data-macaly-loc": "src/routes/onboarding.tsx:178:10",
							"data-macaly-name": "button",
							type: "button",
							onClick: () => setRole(void 0),
							className: "mt-1 text-sm text-muted-foreground underline",
							children: "Change account type"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:181:8",
					"data-macaly-name": "div",
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-macaly-loc": "src/routes/onboarding.tsx:182:10",
						"data-macaly-name": "Label",
						htmlFor: "name",
						children: role === "creator" ? "Your name / creator name" : "Your name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						"data-macaly-loc": "src/routes/onboarding.tsx:183:10",
						"data-macaly-name": "Input",
						id: "name",
						value: displayName,
						onChange: (e) => setDisplayName(e.target.value),
						required: true,
						maxLength: 80
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:186:8",
					"data-macaly-name": "div",
					className: "grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:187:10",
							"data-macaly-name": "Label",
							htmlFor: "username",
							children: "Username"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/onboarding.tsx:188:10",
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
							"data-macaly-loc": "src/routes/onboarding.tsx:198:12",
							"data-macaly-name": "p",
							className: cn("text-xs", available ? "text-success" : "text-destructive"),
							children: available ? `cube3 profile: /c/${uname}` : "Taken or invalid — try another"
						})
					]
				}),
				role === "brand" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/onboarding.tsx:206:12",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:207:14",
							"data-macaly-name": "Label",
							htmlFor: "company",
							children: "Company / brand name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/onboarding.tsx:208:14",
							"data-macaly-name": "Input",
							id: "company",
							value: companyName,
							onChange: (e) => setCompanyName(e.target.value),
							required: true,
							maxLength: 100
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/onboarding.tsx:210:12",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:211:14",
							"data-macaly-name": "Label",
							htmlFor: "website",
							children: "Website"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/onboarding.tsx:212:14",
							"data-macaly-name": "Input",
							id: "website",
							value: website,
							onChange: (e) => setWebsite(e.target.value),
							placeholder: "https://",
							maxLength: 200
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/onboarding.tsx:214:12",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:215:14",
							"data-macaly-name": "Label",
							children: "Industry"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
							"data-macaly-loc": "src/routes/onboarding.tsx:216:14",
							"data-macaly-name": "Chips",
							options: CATEGORIES,
							value: industry,
							onChange: setIndustry,
							single: true
						})]
					})
				] }),
				role === "organizer" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/onboarding.tsx:223:12",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:224:14",
							"data-macaly-name": "Label",
							htmlFor: "org",
							children: "Club / organization / committee name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/onboarding.tsx:225:14",
							"data-macaly-name": "Input",
							id: "org",
							value: orgName,
							onChange: (e) => setOrgName(e.target.value),
							required: true,
							maxLength: 120,
							placeholder: "e.g. Coding Club, TechFest Committee"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/onboarding.tsx:227:12",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:228:14",
							"data-macaly-name": "Label",
							htmlFor: "inst",
							children: "College / institution (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/onboarding.tsx:229:14",
							"data-macaly-name": "Input",
							id: "inst",
							value: institution,
							onChange: (e) => setInstitution(e.target.value),
							maxLength: 150,
							placeholder: "e.g. ABC Engineering College"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/onboarding.tsx:231:12",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:232:14",
							"data-macaly-name": "Label",
							htmlFor: "st",
							children: "State / region (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/onboarding.tsx:233:14",
							"data-macaly-name": "Input",
							id: "st",
							value: stateName,
							onChange: (e) => setStateName(e.target.value),
							maxLength: 80
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/onboarding.tsx:235:12",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:236:14",
							"data-macaly-name": "Label",
							children: "Kinds of events you run"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
							"data-macaly-loc": "src/routes/onboarding.tsx:237:14",
							"data-macaly-name": "Chips",
							options: EVENT_CATEGORIES,
							value: eventCats,
							onChange: setEventCats
						})]
					})
				] }),
				role === "creator" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:244:12",
					"data-macaly-name": "div",
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-macaly-loc": "src/routes/onboarding.tsx:245:14",
						"data-macaly-name": "Label",
						children: "Main content category"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
						"data-macaly-loc": "src/routes/onboarding.tsx:246:14",
						"data-macaly-name": "Chips",
						options: CATEGORIES,
						value: category,
						onChange: setCategory,
						single: true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:248:12",
					"data-macaly-name": "div",
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-macaly-loc": "src/routes/onboarding.tsx:249:14",
						"data-macaly-name": "Label",
						children: "Content types"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
						"data-macaly-loc": "src/routes/onboarding.tsx:250:14",
						"data-macaly-name": "Chips",
						options: CONTENT_TYPES,
						value: contentTypes,
						onChange: setContentTypes
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:255:8",
					"data-macaly-name": "div",
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-macaly-loc": "src/routes/onboarding.tsx:256:10",
						"data-macaly-name": "Label",
						htmlFor: "bio",
						children: role === "creator" ? "Bio" : role === "organizer" ? "About your club / events" : "About the brand"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						"data-macaly-loc": "src/routes/onboarding.tsx:257:10",
						"data-macaly-name": "Textarea",
						id: "bio",
						value: bio,
						onChange: (e) => setBio(e.target.value),
						maxLength: 600,
						rows: 3
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:260:8",
					"data-macaly-name": "div",
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/onboarding.tsx:261:10",
						"data-macaly-name": "div",
						className: "col-span-2 grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:262:12",
							"data-macaly-name": "Label",
							htmlFor: "country",
							children: "Country"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryPicker, {
							"data-macaly-loc": "src/routes/onboarding.tsx:263:12",
							"data-macaly-name": "CountryPicker",
							id: "country",
							value: country,
							onChange: setCountry
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/onboarding.tsx:265:10",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/onboarding.tsx:266:12",
							"data-macaly-name": "Label",
							htmlFor: "city",
							children: "City / region"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/onboarding.tsx:267:12",
							"data-macaly-name": "Input",
							id: "city",
							value: city,
							onChange: (e) => setCity(e.target.value),
							maxLength: 60
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/onboarding.tsx:271:8",
					"data-macaly-name": "div",
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-macaly-loc": "src/routes/onboarding.tsx:272:10",
						"data-macaly-name": "Label",
						children: role === "creator" ? "Languages you create in" : "Languages"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePicker, {
						"data-macaly-loc": "src/routes/onboarding.tsx:273:10",
						"data-macaly-name": "LanguagePicker",
						value: languages,
						onChange: setLanguages
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					"data-macaly-loc": "src/routes/onboarding.tsx:276:8",
					"data-macaly-name": "label",
					className: "flex items-start gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						"data-macaly-loc": "src/routes/onboarding.tsx:277:10",
						"data-macaly-name": "input",
						type: "checkbox",
						className: "mt-1 size-4 accent-[hsl(var(--brand))]",
						checked: accepted,
						onChange: (e) => setAccepted(e.target.checked),
						required: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"data-macaly-loc": "src/routes/onboarding.tsx:278:10",
						"data-macaly-name": "span",
						children: [
							"I'm 18 or older and I agree to the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								"data-macaly-loc": "src/routes/onboarding.tsx:280:12",
								"data-macaly-name": "a",
								href: "/terms",
								target: "_blank",
								rel: "noopener",
								className: "text-brand underline",
								children: "Terms of Service"
							}),
							" and",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								"data-macaly-loc": "src/routes/onboarding.tsx:281:12",
								"data-macaly-name": "a",
								href: "/privacy",
								target: "_blank",
								rel: "noopener",
								className: "text-brand underline",
								children: "Privacy Policy"
							}),
							"."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/onboarding.tsx:285:8",
					"data-macaly-name": "Button",
					type: "submit",
					disabled: busy || available === false || !accepted,
					className: "h-11 bg-brand text-brand-foreground hover:bg-brand/90",
					children: busy ? "Saving…" : "Create profile"
				})
			]
		})
	});
}
//#endregion
export { Onboarding as component };
