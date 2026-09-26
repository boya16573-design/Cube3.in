import { Ct as __toESM, t as Button, xt as require_react, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { t as Plus } from "./plus-BzcJQXl5.js";
import { t as Trash2 } from "./trash-2-fcKCIOWR.js";
import { t as X } from "./x-CskuAKXe.js";
import { n as currencyForCountry, t as CURRENCIES } from "./money-B2xGNqWK.js";
import { t as Switch } from "./switch-B-DK5nMm.js";
import { t as Label } from "./label-DdaoZkXu.js";
import { t as Input } from "./input-BQJAkDLz.js";
import { t as Textarea } from "./textarea-CLFmgltT.js";
import { t as Chips } from "./chips-C_tCTvHp.js";
import { t as CountryPicker } from "./country-picker-T_YB6ZlU.js";
import { t as EVENT_CATEGORIES } from "./eventMatching--BdHk_j6.js";
//#region src/components/event-form.tsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyEvent = (country = "", institution = "") => ({
	name: "",
	description: "",
	category: "",
	institution,
	city: "",
	state: "",
	country,
	mode: "offline",
	eventDate: "",
	registrationDeadline: "",
	sponsorshipDeadline: "",
	expectedAttendees: "",
	previousAttendance: "",
	audienceAgeRange: "18–24",
	audienceInterests: [],
	website: "",
	instagram: "",
	youtube: "",
	bannerUrl: "",
	currency: currencyForCountry(country),
	sponsorshipMin: "",
	sponsorshipMax: "",
	acceptsCash: true,
	acceptsProduct: true,
	acceptsService: false,
	packages: [],
	previousSponsors: ""
});
var INTERESTS = [
	"Technology",
	"Coding",
	"AI",
	"Gaming",
	"Music",
	"Fashion",
	"Food",
	"Fitness",
	"Sports",
	"Finance",
	"Careers",
	"Startups",
	"Travel",
	"Movies",
	"Art",
	"Education"
];
var TIERS = [
	"Title Sponsor",
	"Gold Sponsor",
	"Silver Sponsor",
	"Bronze Sponsor",
	"Custom"
];
var SUGGESTED_BENEFITS = [
	"Main event branding",
	"Stage branding",
	"Logo on posters",
	"Instagram promotion",
	"Booth / stall",
	"Stage announcements",
	"Product sampling",
	"Speaking session",
	"Workshop slot",
	"Email to attendees",
	"Student discount promotion",
	"QR code promotion"
];
var num = (s) => s.trim() ? Number(s) : void 0;
function toMutationArgs(f, publish) {
	return {
		name: f.name,
		description: f.description,
		category: f.category || "Other",
		institution: f.institution || void 0,
		city: f.city || void 0,
		state: f.state || void 0,
		country: f.country || void 0,
		mode: f.mode,
		eventDate: f.eventDate,
		registrationDeadline: f.registrationDeadline || void 0,
		sponsorshipDeadline: f.sponsorshipDeadline || void 0,
		expectedAttendees: num(f.expectedAttendees),
		previousAttendance: num(f.previousAttendance),
		audienceAgeRange: f.audienceAgeRange || void 0,
		audienceInterests: f.audienceInterests,
		website: f.website || void 0,
		instagram: f.instagram || void 0,
		youtube: f.youtube || void 0,
		bannerUrl: f.bannerUrl || void 0,
		currency: f.currency,
		sponsorshipMin: num(f.sponsorshipMin),
		sponsorshipMax: num(f.sponsorshipMax),
		acceptsCash: f.acceptsCash,
		acceptsProduct: f.acceptsProduct,
		acceptsService: f.acceptsService,
		packages: f.packages,
		previousSponsors: f.previousSponsors || void 0,
		publish
	};
}
function Section({ title, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/components/event-form.tsx:77:4",
		"data-macaly-name": "section",
		className: "grid gap-4 rounded-xl border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/components/event-form.tsx:78:6",
			"data-macaly-name": "div",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-macaly-loc": "src/components/event-form.tsx:79:8",
				"data-macaly-name": "h2",
				className: "font-semibold",
				children: title
			}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/components/event-form.tsx:80:17",
				"data-macaly-name": "p",
				className: "text-xs text-muted-foreground",
				children: hint
			})]
		}), children]
	});
}
function Field({ label, id, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/components/event-form.tsx:88:9",
		"data-macaly-name": "div",
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			"data-macaly-loc": "src/components/event-form.tsx:88:39",
			"data-macaly-name": "Label",
			htmlFor: id,
			children: label
		}), children]
	});
}
var digits = (s) => s.replace(/\D/g, "");
function EventForm({ value, onChange }) {
	const f = value;
	const set = (k, v) => onChange({
		...f,
		[k]: v
	});
	const [benefitDraft, setBenefitDraft] = (0, import_react.useState)({});
	const addPackage = (name) => set("packages", [...f.packages, {
		id: `p${Date.now().toString(36)}${f.packages.length}`,
		name: name === "Custom" ? "Custom sponsorship" : name,
		benefits: []
	}]);
	const updatePkg = (id, patch) => set("packages", f.packages.map((p) => p.id === id ? {
		...p,
		...patch
	} : p));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/components/event-form.tsx:103:4",
		"data-macaly-name": "div",
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				"data-macaly-loc": "src/components/event-form.tsx:104:6",
				"data-macaly-name": "Section",
				title: "The event",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/components/event-form.tsx:105:8",
						"data-macaly-name": "Field",
						label: "Event name",
						id: "ev-name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/components/event-form.tsx:105:47",
							"data-macaly-name": "Input",
							id: "ev-name",
							value: f.name,
							onChange: (e) => set("name", e.target.value),
							maxLength: 120,
							placeholder: "TechFest 2026",
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/components/event-form.tsx:106:8",
						"data-macaly-name": "Field",
						label: "Description",
						id: "ev-desc",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							"data-macaly-loc": "src/components/event-form.tsx:106:48",
							"data-macaly-name": "Textarea",
							id: "ev-desc",
							rows: 4,
							value: f.description,
							onChange: (e) => set("description", e.target.value),
							maxLength: 4e3,
							placeholder: "What happens, who attends, why sponsors should care.",
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/components/event-form.tsx:107:8",
						"data-macaly-name": "Field",
						label: "Category",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
							"data-macaly-loc": "src/components/event-form.tsx:107:32",
							"data-macaly-name": "Chips",
							options: EVENT_CATEGORIES,
							value: f.category ? [f.category] : [],
							onChange: (v) => set("category", v[0] ?? ""),
							single: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/components/event-form.tsx:108:8",
						"data-macaly-name": "Field",
						label: "Format",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
							"data-macaly-loc": "src/components/event-form.tsx:109:10",
							"data-macaly-name": "Chips",
							options: [
								"In person",
								"Online",
								"Hybrid"
							],
							value: [f.mode === "offline" ? "In person" : f.mode === "online" ? "Online" : "Hybrid"],
							onChange: (v) => set("mode", v[0] === "Online" ? "online" : v[0] === "Hybrid" ? "hybrid" : "offline"),
							single: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/components/event-form.tsx:112:8",
						"data-macaly-name": "div",
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							"data-macaly-loc": "src/components/event-form.tsx:113:10",
							"data-macaly-name": "Field",
							label: "Event date",
							id: "ev-date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/components/event-form.tsx:113:49",
								"data-macaly-name": "Input",
								id: "ev-date",
								type: "date",
								value: f.eventDate,
								onChange: (e) => set("eventDate", e.target.value),
								required: true
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							"data-macaly-loc": "src/components/event-form.tsx:114:10",
							"data-macaly-name": "Field",
							label: "Registration deadline",
							id: "ev-reg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/components/event-form.tsx:114:59",
								"data-macaly-name": "Input",
								id: "ev-reg",
								type: "date",
								value: f.registrationDeadline,
								onChange: (e) => set("registrationDeadline", e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/components/event-form.tsx:116:8",
						"data-macaly-name": "Field",
						label: "Banner image link (optional)",
						id: "ev-banner",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/components/event-form.tsx:116:67",
							"data-macaly-name": "Input",
							id: "ev-banner",
							value: f.bannerUrl,
							onChange: (e) => set("bannerUrl", e.target.value),
							placeholder: "https://…",
							maxLength: 300
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				"data-macaly-loc": "src/components/event-form.tsx:119:6",
				"data-macaly-name": "Section",
				title: "Where",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/components/event-form.tsx:120:8",
						"data-macaly-name": "Field",
						label: "College / institution",
						id: "ev-inst",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/components/event-form.tsx:120:58",
							"data-macaly-name": "Input",
							id: "ev-inst",
							value: f.institution,
							onChange: (e) => set("institution", e.target.value),
							maxLength: 150
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/components/event-form.tsx:121:8",
						"data-macaly-name": "div",
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							"data-macaly-loc": "src/components/event-form.tsx:122:10",
							"data-macaly-name": "Field",
							label: "City",
							id: "ev-city",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/components/event-form.tsx:122:43",
								"data-macaly-name": "Input",
								id: "ev-city",
								value: f.city,
								onChange: (e) => set("city", e.target.value),
								maxLength: 80
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							"data-macaly-loc": "src/components/event-form.tsx:123:10",
							"data-macaly-name": "Field",
							label: "State / region",
							id: "ev-state",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/components/event-form.tsx:123:54",
								"data-macaly-name": "Input",
								id: "ev-state",
								value: f.state,
								onChange: (e) => set("state", e.target.value),
								maxLength: 80
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/components/event-form.tsx:125:8",
						"data-macaly-name": "Field",
						label: "Country",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryPicker, {
							"data-macaly-loc": "src/components/event-form.tsx:125:31",
							"data-macaly-name": "CountryPicker",
							value: f.country,
							onChange: (c) => onChange({
								...f,
								country: c,
								currency: f.currency || currencyForCountry(c)
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				"data-macaly-loc": "src/components/event-form.tsx:128:6",
				"data-macaly-name": "Section",
				title: "Audience",
				hint: "Your honest estimates — brands see them labelled as organizer-reported.",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/components/event-form.tsx:129:8",
						"data-macaly-name": "div",
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							"data-macaly-loc": "src/components/event-form.tsx:130:10",
							"data-macaly-name": "Field",
							label: "Expected attendees",
							id: "ev-exp",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/components/event-form.tsx:130:56",
								"data-macaly-name": "Input",
								id: "ev-exp",
								inputMode: "numeric",
								value: f.expectedAttendees,
								onChange: (e) => set("expectedAttendees", digits(e.target.value)),
								placeholder: "2000"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							"data-macaly-loc": "src/components/event-form.tsx:131:10",
							"data-macaly-name": "Field",
							label: "Last edition's attendance",
							id: "ev-prev",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/components/event-form.tsx:131:64",
								"data-macaly-name": "Input",
								id: "ev-prev",
								inputMode: "numeric",
								value: f.previousAttendance,
								onChange: (e) => set("previousAttendance", digits(e.target.value)),
								placeholder: "optional"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/components/event-form.tsx:133:8",
						"data-macaly-name": "Field",
						label: "Audience age range",
						id: "ev-age",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/components/event-form.tsx:133:54",
							"data-macaly-name": "Input",
							id: "ev-age",
							value: f.audienceAgeRange,
							onChange: (e) => set("audienceAgeRange", e.target.value),
							maxLength: 40
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/components/event-form.tsx:134:8",
						"data-macaly-name": "Field",
						label: "Audience interests",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
							"data-macaly-loc": "src/components/event-form.tsx:134:42",
							"data-macaly-name": "Chips",
							options: INTERESTS,
							value: f.audienceInterests,
							onChange: (v) => set("audienceInterests", v)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/components/event-form.tsx:135:8",
						"data-macaly-name": "div",
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"data-macaly-loc": "src/components/event-form.tsx:136:10",
								"data-macaly-name": "Field",
								label: "Website",
								id: "ev-web",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-macaly-loc": "src/components/event-form.tsx:136:45",
									"data-macaly-name": "Input",
									id: "ev-web",
									value: f.website,
									onChange: (e) => set("website", e.target.value),
									placeholder: "https://",
									maxLength: 300
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"data-macaly-loc": "src/components/event-form.tsx:137:10",
								"data-macaly-name": "Field",
								label: "Instagram",
								id: "ev-ig",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-macaly-loc": "src/components/event-form.tsx:137:46",
									"data-macaly-name": "Input",
									id: "ev-ig",
									value: f.instagram,
									onChange: (e) => set("instagram", e.target.value),
									placeholder: "@techfest",
									maxLength: 120
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								"data-macaly-loc": "src/components/event-form.tsx:138:10",
								"data-macaly-name": "Field",
								label: "YouTube",
								id: "ev-yt",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-macaly-loc": "src/components/event-form.tsx:138:44",
									"data-macaly-name": "Input",
									id: "ev-yt",
									value: f.youtube,
									onChange: (e) => set("youtube", e.target.value),
									placeholder: "channel link",
									maxLength: 200
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/components/event-form.tsx:140:8",
						"data-macaly-name": "Field",
						label: "Previous sponsors (optional)",
						id: "ev-ps",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							"data-macaly-loc": "src/components/event-form.tsx:140:63",
							"data-macaly-name": "Textarea",
							id: "ev-ps",
							rows: 2,
							value: f.previousSponsors,
							onChange: (e) => set("previousSponsors", e.target.value),
							maxLength: 1e3,
							placeholder: "Only list sponsors who actually sponsored you."
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				"data-macaly-loc": "src/components/event-form.tsx:143:6",
				"data-macaly-name": "Section",
				title: "Sponsorship needed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/components/event-form.tsx:144:8",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/components/event-form.tsx:145:10",
							"data-macaly-name": "Label",
							htmlFor: "ev-cur",
							children: "Currency"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							"data-macaly-loc": "src/components/event-form.tsx:146:10",
							"data-macaly-name": "select",
							id: "ev-cur",
							value: f.currency,
							onChange: (e) => set("currency", e.target.value),
							className: "h-9 rounded-md border bg-background px-3 text-sm",
							children: CURRENCIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								"data-macaly-loc": "src/components/event-form.tsx:147:35",
								"data-macaly-name": "option",
								value: c.code,
								children: [
									c.code,
									" — ",
									c.label
								]
							}, c.code))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/components/event-form.tsx:150:8",
						"data-macaly-name": "div",
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							"data-macaly-loc": "src/components/event-form.tsx:151:10",
							"data-macaly-name": "Field",
							label: `Minimum (${f.currency})`,
							id: "ev-min",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/components/event-form.tsx:151:63",
								"data-macaly-name": "Input",
								id: "ev-min",
								inputMode: "numeric",
								value: f.sponsorshipMin,
								onChange: (e) => set("sponsorshipMin", digits(e.target.value))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							"data-macaly-loc": "src/components/event-form.tsx:152:10",
							"data-macaly-name": "Field",
							label: `Maximum (${f.currency})`,
							id: "ev-max",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/components/event-form.tsx:152:63",
								"data-macaly-name": "Input",
								id: "ev-max",
								inputMode: "numeric",
								value: f.sponsorshipMax,
								onChange: (e) => set("sponsorshipMax", digits(e.target.value))
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						"data-macaly-loc": "src/components/event-form.tsx:154:8",
						"data-macaly-name": "Field",
						label: "Sponsorship deadline",
						id: "ev-sd",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/components/event-form.tsx:154:55",
							"data-macaly-name": "Input",
							id: "ev-sd",
							type: "date",
							value: f.sponsorshipDeadline,
							onChange: (e) => set("sponsorshipDeadline", e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-macaly-loc": "src/components/event-form.tsx:155:8",
						"data-macaly-name": "div",
						className: "grid gap-2 text-sm",
						children: [
							["acceptsCash", "Cash sponsorship"],
							["acceptsProduct", "Product sponsorship (goodies, prizes, samples)"],
							["acceptsService", "Service sponsorship (cloud credits, venue, printing…)"]
						].map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							"data-macaly-loc": "src/components/event-form.tsx:157:12",
							"data-macaly-name": "label",
							className: "flex items-center justify-between gap-3 rounded-lg border px-3 py-2",
							children: [l, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								"data-macaly-loc": "src/components/event-form.tsx:159:14",
								"data-macaly-name": "Switch",
								checked: f[k],
								onCheckedChange: (v) => set(k, v)
							})]
						}, k))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				"data-macaly-loc": "src/components/event-form.tsx:165:6",
				"data-macaly-name": "Section",
				title: "Sponsorship packages",
				hint: "Optional tiers with benefits. You set the price for each.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/components/event-form.tsx:166:8",
					"data-macaly-name": "div",
					className: "flex flex-wrap gap-2",
					children: TIERS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-macaly-loc": "src/components/event-form.tsx:168:12",
						"data-macaly-name": "Button",
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: () => addPackage(t),
						disabled: f.packages.length >= 10,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
							"data-macaly-loc": "src/components/event-form.tsx:169:14",
							"data-macaly-name": "Plus",
							className: "size-3.5"
						}), t]
					}, t))
				}), f.packages.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/event-form.tsx:174:10",
					"data-macaly-name": "div",
					className: "grid gap-3 rounded-lg border p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/components/event-form.tsx:175:12",
							"data-macaly-name": "div",
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-macaly-loc": "src/components/event-form.tsx:176:14",
									"data-macaly-name": "Input",
									value: p.name,
									onChange: (e) => updatePkg(p.id, { name: e.target.value }),
									maxLength: 60,
									"aria-label": "Package name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									"data-macaly-loc": "src/components/event-form.tsx:177:14",
									"data-macaly-name": "Input",
									className: "w-36",
									inputMode: "numeric",
									value: p.amount ?? "",
									placeholder: f.currency,
									onChange: (e) => updatePkg(p.id, { amount: digits(e.target.value) ? Number(digits(e.target.value)) : void 0 }),
									"aria-label": "Package price"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-macaly-loc": "src/components/event-form.tsx:179:14",
									"data-macaly-name": "Button",
									type: "button",
									variant: "ghost",
									size: "icon",
									"aria-label": "Remove package",
									onClick: () => set("packages", f.packages.filter((x) => x.id !== p.id)),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
										"data-macaly-loc": "src/components/event-form.tsx:179:165",
										"data-macaly-name": "Trash2",
										className: "size-4"
									})
								})
							]
						}),
						p.benefits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							"data-macaly-loc": "src/components/event-form.tsx:182:14",
							"data-macaly-name": "ul",
							className: "flex flex-wrap gap-1.5",
							children: p.benefits.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								"data-macaly-loc": "src/components/event-form.tsx:184:18",
								"data-macaly-name": "li",
								className: "inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs",
								children: [b, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"data-macaly-loc": "src/components/event-form.tsx:186:20",
									"data-macaly-name": "button",
									type: "button",
									"aria-label": `Remove ${b}`,
									onClick: () => updatePkg(p.id, { benefits: p.benefits.filter((_, j) => j !== i) }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
										"data-macaly-loc": "src/components/event-form.tsx:186:153",
										"data-macaly-name": "X",
										className: "size-3"
									})
								})]
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-macaly-loc": "src/components/event-form.tsx:191:12",
							"data-macaly-name": "div",
							className: "flex flex-wrap gap-1.5",
							children: SUGGESTED_BENEFITS.filter((b) => !p.benefits.includes(b)).slice(0, 6).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								"data-macaly-loc": "src/components/event-form.tsx:193:16",
								"data-macaly-name": "button",
								type: "button",
								onClick: () => updatePkg(p.id, { benefits: [...p.benefits, b] }),
								className: "rounded-full border border-dashed px-2.5 py-1 text-xs hover:bg-muted",
								children: ["+ ", b]
							}, b))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/components/event-form.tsx:196:12",
							"data-macaly-name": "div",
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/components/event-form.tsx:197:14",
								"data-macaly-name": "Input",
								value: benefitDraft[p.id] ?? "",
								onChange: (e) => setBenefitDraft({
									...benefitDraft,
									[p.id]: e.target.value
								}),
								placeholder: "Add your own benefit",
								maxLength: 160
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-macaly-loc": "src/components/event-form.tsx:198:14",
								"data-macaly-name": "Button",
								type: "button",
								variant: "secondary",
								onClick: () => {
									const b = (benefitDraft[p.id] ?? "").trim();
									if (b) {
										updatePkg(p.id, { benefits: [...p.benefits, b] });
										setBenefitDraft({
											...benefitDraft,
											[p.id]: ""
										});
									}
								},
								children: "Add"
							})]
						})
					]
				}, p.id))]
			})
		]
	});
}
//#endregion
export { emptyEvent as n, toMutationArgs as r, EventForm as t };
