import { Ct as __toESM, n as cn, xt as require_react, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { l as Globe, o as Search } from "./app-shell-GoO9XvM6.js";
import { t as X } from "./x-CskuAKXe.js";
import { n as flagFor, r as normalizeCountry, t as COUNTRIES } from "./countries-BNqYBK9b.js";
import { t as Input } from "./input-BQJAkDLz.js";
//#region src/components/country-picker.tsx
var import_react = /* @__PURE__ */ __toESM(require_react());
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
