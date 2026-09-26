import { D as require_jsx_runtime, v as Link } from "./api-D74LnTM3.js";
import { t as AppShell } from "./app-shell-CtDeXJqm.js";
//#region src/lib/legal.ts
var LEGAL = {
	/** Registered business / operator name. Replace with your company or proprietor name once registered. */
	operatorName: "Cube3",
	/** Where users send privacy requests, grievances and legal notices. */
	contactEmail: "boya16573@gmail.com",
	/** Grievance Officer (DPDP Act, 2023 / IT Rules, 2021). Replace with a named person when available. */
	grievanceOfficer: "Cube3 Grievance Officer",
	/** Governing-law location for disputes. */
	jurisdiction: "India",
	lastUpdated: "26 September 2026",
	/** Minimum age to use Cube3. */
	minimumAge: 18
};
//#endregion
//#region src/components/legal-page.tsx
var import_jsx_runtime = require_jsx_runtime();
function LegalPage({ title, intro, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/components/legal-page.tsx:8:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			"data-macaly-loc": "src/components/legal-page.tsx:9:6",
			"data-macaly-name": "article",
			className: "mx-auto max-w-3xl px-4 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/components/legal-page.tsx:10:8",
					"data-macaly-name": "p",
					className: "text-xs font-semibold uppercase tracking-wide text-brand",
					children: "Legal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-macaly-loc": "src/components/legal-page.tsx:11:8",
					"data-macaly-name": "h1",
					className: "mt-1 text-3xl font-bold",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-macaly-loc": "src/components/legal-page.tsx:12:8",
					"data-macaly-name": "p",
					className: "mt-1 text-sm text-muted-foreground",
					children: ["Last updated: ", LEGAL.lastUpdated]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/components/legal-page.tsx:13:8",
					"data-macaly-name": "p",
					className: "mt-4 text-base",
					children: intro
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/components/legal-page.tsx:14:8",
					"data-macaly-name": "div",
					className: "mt-8 grid gap-8 text-sm leading-relaxed [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-2 [&_ul]:mt-2 [&_ul]:grid [&_ul]:gap-1.5",
					children
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-macaly-loc": "src/components/legal-page.tsx:17:8",
					"data-macaly-name": "p",
					className: "mt-10 border-t pt-6 text-sm text-muted-foreground",
					children: [
						"Questions? Email ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							"data-macaly-loc": "src/components/legal-page.tsx:18:27",
							"data-macaly-name": "a",
							href: `mailto:${LEGAL.contactEmail}`,
							className: "text-brand underline",
							children: LEGAL.contactEmail
						}),
						". See also our ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-macaly-loc": "src/components/legal-page.tsx:19:23",
							"data-macaly-name": "Link",
							to: "/privacy",
							className: "text-brand underline",
							children: "Privacy Policy"
						}),
						" and",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-macaly-loc": "src/components/legal-page.tsx:20:10",
							"data-macaly-name": "Link",
							to: "/terms",
							className: "text-brand underline",
							children: "Terms of Service"
						}),
						"."
					]
				})
			]
		})
	});
}
function Mail() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		"data-macaly-loc": "src/components/legal-page.tsx:28:9",
		"data-macaly-name": "a",
		href: `mailto:${LEGAL.contactEmail}`,
		className: "text-brand underline",
		children: LEGAL.contactEmail
	});
}
//#endregion
export { Mail as n, LEGAL as r, LegalPage as t };
