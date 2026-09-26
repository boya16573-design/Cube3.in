import { ht as __toESM, j as require_jsx_runtime, pt as require_react } from "./api-DJqU9p-G.js";
import { f as Search, m as Globe, o as cn } from "./app-shell-BzN9KHqO.js";
import { t as X } from "./x-L6wRmoZC.js";
import { t as Input } from "./input-DAWToyPJ.js";
//#region convex/lib/countries.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
var COUNTRIES = [
	["AF", "Afghanistan"],
	["AL", "Albania"],
	["DZ", "Algeria"],
	["AD", "Andorra"],
	["AO", "Angola"],
	["AG", "Antigua and Barbuda"],
	["AR", "Argentina"],
	["AM", "Armenia"],
	["AU", "Australia"],
	["AT", "Austria"],
	["AZ", "Azerbaijan"],
	["BS", "Bahamas"],
	["BH", "Bahrain"],
	["BD", "Bangladesh"],
	["BB", "Barbados"],
	["BY", "Belarus"],
	["BE", "Belgium"],
	["BZ", "Belize"],
	["BJ", "Benin"],
	["BT", "Bhutan"],
	["BO", "Bolivia"],
	["BA", "Bosnia and Herzegovina"],
	["BW", "Botswana"],
	["BR", "Brazil"],
	["BN", "Brunei"],
	["BG", "Bulgaria"],
	["BF", "Burkina Faso"],
	["BI", "Burundi"],
	["CV", "Cabo Verde"],
	["KH", "Cambodia"],
	["CM", "Cameroon"],
	["CA", "Canada"],
	["CF", "Central African Republic"],
	["TD", "Chad"],
	["CL", "Chile"],
	["CN", "China"],
	["CO", "Colombia"],
	["KM", "Comoros"],
	["CG", "Congo"],
	["CD", "Congo (DRC)"],
	["CR", "Costa Rica"],
	["CI", "Côte d'Ivoire"],
	["HR", "Croatia"],
	["CU", "Cuba"],
	["CY", "Cyprus"],
	["CZ", "Czechia"],
	["DK", "Denmark"],
	["DJ", "Djibouti"],
	["DM", "Dominica"],
	["DO", "Dominican Republic"],
	["EC", "Ecuador"],
	["EG", "Egypt"],
	["SV", "El Salvador"],
	["GQ", "Equatorial Guinea"],
	["ER", "Eritrea"],
	["EE", "Estonia"],
	["SZ", "Eswatini"],
	["ET", "Ethiopia"],
	["FJ", "Fiji"],
	["FI", "Finland"],
	["FR", "France"],
	["GA", "Gabon"],
	["GM", "Gambia"],
	["GE", "Georgia"],
	["DE", "Germany"],
	["GH", "Ghana"],
	["GR", "Greece"],
	["GD", "Grenada"],
	["GT", "Guatemala"],
	["GN", "Guinea"],
	["GW", "Guinea-Bissau"],
	["GY", "Guyana"],
	["HT", "Haiti"],
	["HN", "Honduras"],
	["HK", "Hong Kong"],
	["HU", "Hungary"],
	["IS", "Iceland"],
	["IN", "India"],
	["ID", "Indonesia"],
	["IR", "Iran"],
	["IQ", "Iraq"],
	["IE", "Ireland"],
	["IL", "Israel"],
	["IT", "Italy"],
	["JM", "Jamaica"],
	["JP", "Japan"],
	["JO", "Jordan"],
	["KZ", "Kazakhstan"],
	["KE", "Kenya"],
	["KI", "Kiribati"],
	["KW", "Kuwait"],
	["KG", "Kyrgyzstan"],
	["LA", "Laos"],
	["LV", "Latvia"],
	["LB", "Lebanon"],
	["LS", "Lesotho"],
	["LR", "Liberia"],
	["LY", "Libya"],
	["LI", "Liechtenstein"],
	["LT", "Lithuania"],
	["LU", "Luxembourg"],
	["MO", "Macao"],
	["MG", "Madagascar"],
	["MW", "Malawi"],
	["MY", "Malaysia"],
	["MV", "Maldives"],
	["ML", "Mali"],
	["MT", "Malta"],
	["MH", "Marshall Islands"],
	["MR", "Mauritania"],
	["MU", "Mauritius"],
	["MX", "Mexico"],
	["FM", "Micronesia"],
	["MD", "Moldova"],
	["MC", "Monaco"],
	["MN", "Mongolia"],
	["ME", "Montenegro"],
	["MA", "Morocco"],
	["MZ", "Mozambique"],
	["MM", "Myanmar"],
	["NA", "Namibia"],
	["NR", "Nauru"],
	["NP", "Nepal"],
	["NL", "Netherlands"],
	["NZ", "New Zealand"],
	["NI", "Nicaragua"],
	["NE", "Niger"],
	["NG", "Nigeria"],
	["KP", "North Korea"],
	["MK", "North Macedonia"],
	["NO", "Norway"],
	["OM", "Oman"],
	["PK", "Pakistan"],
	["PW", "Palau"],
	["PS", "Palestine"],
	["PA", "Panama"],
	["PG", "Papua New Guinea"],
	["PY", "Paraguay"],
	["PE", "Peru"],
	["PH", "Philippines"],
	["PL", "Poland"],
	["PT", "Portugal"],
	["PR", "Puerto Rico"],
	["QA", "Qatar"],
	["RO", "Romania"],
	["RU", "Russia"],
	["RW", "Rwanda"],
	["KN", "Saint Kitts and Nevis"],
	["LC", "Saint Lucia"],
	["VC", "Saint Vincent and the Grenadines"],
	["WS", "Samoa"],
	["SM", "San Marino"],
	["ST", "São Tomé and Príncipe"],
	["SA", "Saudi Arabia"],
	["SN", "Senegal"],
	["RS", "Serbia"],
	["SC", "Seychelles"],
	["SL", "Sierra Leone"],
	["SG", "Singapore"],
	["SK", "Slovakia"],
	["SI", "Slovenia"],
	["SB", "Solomon Islands"],
	["SO", "Somalia"],
	["ZA", "South Africa"],
	["KR", "South Korea"],
	["SS", "South Sudan"],
	["ES", "Spain"],
	["LK", "Sri Lanka"],
	["SD", "Sudan"],
	["SR", "Suriname"],
	["SE", "Sweden"],
	["CH", "Switzerland"],
	["SY", "Syria"],
	["TW", "Taiwan"],
	["TJ", "Tajikistan"],
	["TZ", "Tanzania"],
	["TH", "Thailand"],
	["TL", "Timor-Leste"],
	["TG", "Togo"],
	["TO", "Tonga"],
	["TT", "Trinidad and Tobago"],
	["TN", "Tunisia"],
	["TR", "Türkiye"],
	["TM", "Turkmenistan"],
	["TV", "Tuvalu"],
	["UG", "Uganda"],
	["UA", "Ukraine"],
	["AE", "United Arab Emirates"],
	["GB", "United Kingdom"],
	["US", "United States"],
	["UY", "Uruguay"],
	["UZ", "Uzbekistan"],
	["VU", "Vanuatu"],
	["VA", "Vatican City"],
	["VE", "Venezuela"],
	["VN", "Vietnam"],
	["YE", "Yemen"],
	["ZM", "Zambia"],
	["ZW", "Zimbabwe"]
].map(([code, name]) => ({
	code,
	name
}));
var ALIASES = {
	bharat: "India",
	hindustan: "India",
	usa: "United States",
	"u.s.": "United States",
	"u.s.a.": "United States",
	america: "United States",
	"united states of america": "United States",
	uk: "United Kingdom",
	"great britain": "United Kingdom",
	britain: "United Kingdom",
	england: "United Kingdom",
	scotland: "United Kingdom",
	wales: "United Kingdom",
	uae: "United Arab Emirates",
	dubai: "United Arab Emirates",
	"abu dhabi": "United Arab Emirates",
	ksa: "Saudi Arabia",
	korea: "South Korea",
	"republic of korea": "South Korea",
	turkey: "Türkiye",
	"czech republic": "Czechia",
	holland: "Netherlands",
	"the netherlands": "Netherlands",
	russia: "Russia",
	"ivory coast": "Côte d'Ivoire",
	burma: "Myanmar",
	swaziland: "Eswatini",
	"cape verde": "Cabo Verde",
	drc: "Congo (DRC)",
	"east timor": "Timor-Leste",
	macau: "Macao"
};
var byName = new Map(COUNTRIES.map((c) => [c.name.toLowerCase(), c.name]));
var byCode = new Map(COUNTRIES.map((c) => [c.code.toLowerCase(), c.name]));
/** Canonical English country name for any spelling/code/alias; otherwise the trimmed input. */
function normalizeCountry(input) {
	const raw = (input ?? "").trim();
	if (!raw) return void 0;
	const k = raw.toLowerCase();
	return byName.get(k) ?? byCode.get(k) ?? ALIASES[k] ?? raw;
}
/** Emoji flag from a country name (display only). */
function flagFor(name) {
	const c = COUNTRIES.find((x) => x.name === normalizeCountry(name));
	if (!c) return "";
	return String.fromCodePoint(...[...c.code].map((ch) => 127462 + ch.charCodeAt(0) - 65));
}
//#endregion
//#region src/components/country-picker.tsx
var import_jsx_runtime = require_jsx_runtime();
var POPULAR = [
	"India",
	"United States",
	"United Kingdom",
	"United Arab Emirates",
	"Canada",
	"Australia",
	"Singapore",
	"Indonesia",
	"Brazil",
	"Nigeria",
	"Germany",
	"Saudi Arabia"
];
/**
* Searchable single-country picker. `value` is a canonical country name ("" = none).
* With `anywhereLabel`, an extra option clears the value (e.g. "Anywhere" for campaigns/filters).
*/
function CountryPicker({ value, onChange, anywhereLabel, placeholder = "Search country…", id }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const term = q.trim().toLowerCase();
	const matches = (0, import_react.useMemo)(() => {
		if (!term) return POPULAR.map((name) => ({ name }));
		const exact = normalizeCountry(q);
		const list = COUNTRIES.filter((c) => c.name.toLowerCase().includes(term) || c.code.toLowerCase() === term);
		if (exact && !list.some((c) => c.name === exact) && COUNTRIES.some((c) => c.name === exact)) list.unshift({
			code: "",
			name: exact
		});
		return list.slice(0, 12);
	}, [term, q]);
	const selected = normalizeCountry(value);
	if (selected && !open) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/components/country-picker.tsx:43:6",
		"data-macaly-name": "div",
		className: "flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"data-macaly-loc": "src/components/country-picker.tsx:44:8",
			"data-macaly-name": "span",
			children: [
				flagFor(selected),
				" ",
				selected
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/components/country-picker.tsx:45:8",
			"data-macaly-name": "div",
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"data-macaly-loc": "src/components/country-picker.tsx:46:10",
				"data-macaly-name": "button",
				type: "button",
				className: "text-xs text-brand underline",
				onClick: () => setOpen(true),
				children: "Change"
			}), anywhereLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"data-macaly-loc": "src/components/country-picker.tsx:48:12",
				"data-macaly-name": "button",
				type: "button",
				"aria-label": "Clear country",
				onClick: () => onChange(""),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
					"data-macaly-loc": "src/components/country-picker.tsx:48:90",
					"data-macaly-name": "X",
					className: "size-4"
				})
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/components/country-picker.tsx:56:4",
		"data-macaly-name": "div",
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/components/country-picker.tsx:57:6",
			"data-macaly-name": "div",
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				"data-macaly-loc": "src/components/country-picker.tsx:58:8",
				"data-macaly-name": "Search",
				className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				"data-macaly-loc": "src/components/country-picker.tsx:59:8",
				"data-macaly-name": "Input",
				id,
				className: "pl-9",
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder,
				"aria-label": "Search country",
				autoComplete: "off"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/components/country-picker.tsx:61:6",
			"data-macaly-name": "div",
			className: "flex flex-wrap gap-1.5",
			children: [
				anywhereLabel && !term && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					"data-macaly-loc": "src/components/country-picker.tsx:63:10",
					"data-macaly-name": "button",
					type: "button",
					onClick: () => {
						onChange("");
						setQ("");
						setOpen(false);
					},
					className: cn("inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm hover:bg-muted", !selected && "border-brand bg-brand-soft"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
						"data-macaly-loc": "src/components/country-picker.tsx:65:12",
						"data-macaly-name": "Globe",
						className: "size-3.5"
					}), anywhereLabel]
				}),
				matches.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					"data-macaly-loc": "src/components/country-picker.tsx:69:10",
					"data-macaly-name": "button",
					type: "button",
					onClick: () => {
						onChange(c.name);
						setQ("");
						setOpen(false);
					},
					className: cn("rounded-full border px-3 py-1 text-sm hover:bg-muted", selected === c.name && "border-brand bg-brand-soft"),
					children: [
						flagFor(c.name),
						" ",
						c.name
					]
				}, c.name)),
				term && matches.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-macaly-loc": "src/components/country-picker.tsx:74:41",
					"data-macaly-name": "span",
					className: "text-xs text-muted-foreground",
					children: "No country found."
				})
			]
		})]
	});
}
//#endregion
export { CountryPicker as t };
