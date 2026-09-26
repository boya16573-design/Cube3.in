import { D as require_jsx_runtime, dt as __toESM, lt as require_react } from "./api-D74LnTM3.js";
import { f as Search, o as cn } from "./app-shell-CtDeXJqm.js";
import { t as Plus } from "./plus-Cf1jeTYa.js";
import { t as X } from "./x-BzRkyuW7.js";
import { t as Input } from "./input-C91OdWl8.js";
//#region src/lib/languages.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
var ISO_639_1 = [
	"Abkhazian",
	"Afar",
	"Afrikaans",
	"Akan",
	"Albanian",
	"Amharic",
	"Arabic",
	"Aragonese",
	"Armenian",
	"Assamese",
	"Avaric",
	"Avestan",
	"Aymara",
	"Azerbaijani",
	"Bambara",
	"Bashkir",
	"Basque",
	"Belarusian",
	"Bengali",
	"Bislama",
	"Bosnian",
	"Breton",
	"Bulgarian",
	"Burmese",
	"Catalan",
	"Chamorro",
	"Chechen",
	"Chichewa",
	"Chinese (Mandarin)",
	"Church Slavonic",
	"Chuvash",
	"Cornish",
	"Corsican",
	"Cree",
	"Croatian",
	"Czech",
	"Danish",
	"Dhivehi",
	"Dutch",
	"Dzongkha",
	"English",
	"Esperanto",
	"Estonian",
	"Ewe",
	"Faroese",
	"Fijian",
	"Finnish",
	"French",
	"Fula",
	"Galician",
	"Ganda",
	"Georgian",
	"German",
	"Greek",
	"Guarani",
	"Gujarati",
	"Haitian Creole",
	"Hausa",
	"Hebrew",
	"Herero",
	"Hindi",
	"Hiri Motu",
	"Hungarian",
	"Icelandic",
	"Ido",
	"Igbo",
	"Indonesian",
	"Interlingua",
	"Interlingue",
	"Inuktitut",
	"Inupiaq",
	"Irish",
	"Italian",
	"Japanese",
	"Javanese",
	"Kalaallisut",
	"Kannada",
	"Kanuri",
	"Kashmiri",
	"Kazakh",
	"Khmer",
	"Kikuyu",
	"Kinyarwanda",
	"Kirundi",
	"Komi",
	"Kongo",
	"Korean",
	"Kurdish",
	"Kwanyama",
	"Kyrgyz",
	"Lao",
	"Latin",
	"Latvian",
	"Limburgish",
	"Lingala",
	"Lithuanian",
	"Luba-Katanga",
	"Luxembourgish",
	"Macedonian",
	"Malagasy",
	"Malay",
	"Malayalam",
	"Maltese",
	"Manx",
	"Maori",
	"Marathi",
	"Marshallese",
	"Mongolian",
	"Nauruan",
	"Navajo",
	"Ndonga",
	"Nepali",
	"North Ndebele",
	"Northern Sami",
	"Norwegian",
	"Norwegian Bokmål",
	"Norwegian Nynorsk",
	"Nuosu",
	"Occitan",
	"Odia",
	"Ojibwe",
	"Oromo",
	"Ossetian",
	"Pali",
	"Pashto",
	"Persian (Farsi)",
	"Polish",
	"Portuguese",
	"Punjabi",
	"Quechua",
	"Romanian",
	"Romansh",
	"Russian",
	"Samoan",
	"Sango",
	"Sanskrit",
	"Sardinian",
	"Scottish Gaelic",
	"Serbian",
	"Shona",
	"Sindhi",
	"Sinhala",
	"Slovak",
	"Slovenian",
	"Somali",
	"South Ndebele",
	"Southern Sotho",
	"Spanish",
	"Sundanese",
	"Swahili",
	"Swati",
	"Swedish",
	"Tagalog",
	"Tahitian",
	"Tajik",
	"Tamil",
	"Tatar",
	"Telugu",
	"Thai",
	"Tibetan",
	"Tigrinya",
	"Tongan",
	"Tsonga",
	"Tswana",
	"Turkish",
	"Turkmen",
	"Twi",
	"Ukrainian",
	"Urdu",
	"Uyghur",
	"Uzbek",
	"Venda",
	"Vietnamese",
	"Volapük",
	"Walloon",
	"Welsh",
	"Western Frisian",
	"Wolof",
	"Xhosa",
	"Yiddish",
	"Yoruba",
	"Zhuang",
	"Zulu"
];
var WIDELY_SPOKEN_EXTRAS = [
	"Awadhi",
	"Bhili",
	"Bhojpuri",
	"Bodo",
	"Chhattisgarhi",
	"Dogri",
	"Garhwali",
	"Gondi",
	"Haryanvi",
	"Kokborok",
	"Konkani",
	"Kumaoni",
	"Magahi",
	"Maithili",
	"Manipuri (Meitei)",
	"Marwari",
	"Mizo",
	"Rajasthani",
	"Santali",
	"Tulu",
	"Hinglish",
	"Cantonese",
	"Hakka",
	"Hokkien",
	"Shanghainese (Wu)",
	"Filipino",
	"Cebuano",
	"Ilocano",
	"Hiligaynon",
	"Hawaiian",
	"Hmong",
	"Minangkabau",
	"Balinese",
	"Madurese",
	"Nigerian Pidgin",
	"Tok Pisin",
	"Tamazight (Berber)",
	"Kabyle",
	"Tigre",
	"Sesotho sa Leboa",
	"Luo",
	"Kamba",
	"Sylheti",
	"Chittagonian",
	"Saraiki",
	"Balochi",
	"Brahui",
	"Hazaragi",
	"Kurmanji",
	"Sorani",
	"Neapolitan",
	"Sicilian",
	"Venetian",
	"Low German",
	"Swiss German",
	"Alsatian",
	"Catalan (Valencian)",
	"Asturian",
	"Frisian (Saterland)",
	"Yue",
	"Min Dong",
	"Egyptian Arabic",
	"Levantine Arabic",
	"Gulf Arabic",
	"Maghrebi Arabic",
	"Jamaican Patois",
	"Papiamento",
	"Creole (Mauritian)",
	"Seychellois Creole",
	"American Sign Language",
	"British Sign Language",
	"Indian Sign Language",
	"International Sign"
];
var ALL_LANGUAGES = [.../* @__PURE__ */ new Set([...ISO_639_1, ...WIDELY_SPOKEN_EXTRAS])].sort((a, b) => a.localeCompare(b, "en"));
/** Quick picks shown before searching: Indian languages first, then the most-used global languages. */
var POPULAR_LANGUAGES = [
	"English",
	"Hindi",
	"Hinglish",
	"Telugu",
	"Tamil",
	"Kannada",
	"Malayalam",
	"Marathi",
	"Bengali",
	"Gujarati",
	"Punjabi",
	"Urdu",
	"Odia",
	"Assamese",
	"Bhojpuri",
	"Spanish",
	"Arabic",
	"Portuguese",
	"French",
	"Chinese (Mandarin)",
	"Indonesian",
	"Japanese",
	"Russian",
	"German"
];
//#endregion
//#region src/components/language-picker.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Searchable picker over every listed language. Selected languages show as
* removable chips; popular ones are one tap away; anything unlisted can be added.
*/
function LanguagePicker({ value, onChange, single, max = 20, placeholder = "Search any language…" }) {
	const [q, setQ] = (0, import_react.useState)("");
	const term = q.trim().toLowerCase();
	const matches = (0, import_react.useMemo)(() => {
		if (!term) return [];
		const starts = ALL_LANGUAGES.filter((l) => l.toLowerCase().startsWith(term));
		const contains = ALL_LANGUAGES.filter((l) => !l.toLowerCase().startsWith(term) && l.toLowerCase().includes(term));
		return [...starts, ...contains].slice(0, 10);
	}, [term]);
	const exact = ALL_LANGUAGES.some((l) => l.toLowerCase() === term);
	const canAddCustom = term.length >= 2 && !exact && !value.some((v) => v.toLowerCase() === term);
	function toggle(lang) {
		const has = value.includes(lang);
		if (single) onChange(has ? [] : [lang]);
		else if (has) onChange(value.filter((v) => v !== lang));
		else if (value.length < max) onChange([...value, lang]);
		setQ("");
	}
	function addCustom() {
		const clean = q.trim().replace(/\s+/g, " ").slice(0, 40);
		if (!clean) return;
		toggle(clean.charAt(0).toUpperCase() + clean.slice(1));
	}
	const quick = POPULAR_LANGUAGES.filter((l) => !value.includes(l));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/components/language-picker.tsx:56:4",
		"data-macaly-name": "div",
		className: "grid gap-2",
		children: [
			value.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/components/language-picker.tsx:58:8",
				"data-macaly-name": "div",
				className: "flex flex-wrap gap-1.5",
				children: value.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-macaly-loc": "src/components/language-picker.tsx:60:12",
					"data-macaly-name": "span",
					className: "inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-sm text-brand-foreground",
					children: [l, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"data-macaly-loc": "src/components/language-picker.tsx:62:14",
						"data-macaly-name": "button",
						type: "button",
						onClick: () => toggle(l),
						"aria-label": `Remove ${l}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							"data-macaly-loc": "src/components/language-picker.tsx:62:89",
							"data-macaly-name": "X",
							className: "size-3.5"
						})
					})]
				}, l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/language-picker.tsx:68:6",
				"data-macaly-name": "div",
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					"data-macaly-loc": "src/components/language-picker.tsx:69:8",
					"data-macaly-name": "Search",
					className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-macaly-loc": "src/components/language-picker.tsx:70:8",
					"data-macaly-name": "Input",
					className: "pl-9",
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder,
					maxLength: 40,
					onKeyDown: (e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							if (matches[0]) toggle(matches[0]);
							else if (canAddCustom) addCustom();
						}
					},
					"aria-label": "Search languages"
				})]
			}),
			term ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/language-picker.tsx:88:8",
				"data-macaly-name": "div",
				className: "flex flex-wrap gap-1.5",
				children: [
					matches.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"data-macaly-loc": "src/components/language-picker.tsx:90:12",
						"data-macaly-name": "button",
						type: "button",
						onClick: () => toggle(l),
						className: cn("rounded-full border px-3 py-1 text-sm", value.includes(l) ? "border-brand bg-brand-soft" : "hover:bg-muted"),
						children: l
					}, l)),
					canAddCustom && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						"data-macaly-loc": "src/components/language-picker.tsx:96:12",
						"data-macaly-name": "button",
						type: "button",
						onClick: addCustom,
						className: "inline-flex items-center gap-1 rounded-full border border-dashed px-3 py-1 text-sm hover:bg-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								"data-macaly-loc": "src/components/language-picker.tsx:97:14",
								"data-macaly-name": "Plus",
								className: "size-3.5"
							}),
							"Add “",
							q.trim(),
							"”"
						]
					}),
					matches.length === 0 && !canAddCustom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-macaly-loc": "src/components/language-picker.tsx:100:52",
						"data-macaly-name": "span",
						className: "text-xs text-muted-foreground",
						children: "No matches."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/components/language-picker.tsx:103:8",
				"data-macaly-name": "div",
				className: "-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1",
				children: quick.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"data-macaly-loc": "src/components/language-picker.tsx:105:12",
					"data-macaly-name": "button",
					type: "button",
					onClick: () => toggle(l),
					className: "shrink-0 rounded-full border px-3 py-1 text-sm hover:bg-muted",
					children: l
				}, l))
			}),
			!single && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/components/language-picker.tsx:111:18",
				"data-macaly-name": "p",
				className: "text-[11px] text-muted-foreground",
				children: [ALL_LANGUAGES.length, "+ languages — search or add your own."]
			})
		]
	});
}
//#endregion
export { LanguagePicker as t };
