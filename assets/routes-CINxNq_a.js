import { D as require_jsx_runtime, n as createLucideIcon, v as Link } from "./api-D74LnTM3.js";
import { a as Button, f as Search, t as AppShell } from "./app-shell-CtDeXJqm.js";
import { t as BadgeCheck } from "./badge-check-B3dBneY_.js";
import { t as Sparkles } from "./sparkles-CVCqxAfJ.js";
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowRight = createLucideIcon("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Handshake = createLucideIcon("handshake", [
	["path", {
		d: "m11 17 2 2a1 1 0 1 0 3-3",
		key: "efffak"
	}],
	["path", {
		d: "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
		key: "9pr0kb"
	}],
	["path", {
		d: "m21 3 1 11h-2",
		key: "1tisrp"
	}],
	["path", {
		d: "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",
		key: "1uvwmv"
	}],
	["path", {
		d: "M3 4h8",
		key: "1ep09j"
	}]
]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Megaphone = createLucideIcon("megaphone", [
	["path", {
		d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
		key: "q8bfy3"
	}],
	["path", {
		d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14",
		key: "1853fq"
	}],
	["path", {
		d: "M8 6v8",
		key: "15ugcq"
	}]
]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Target = createLucideIcon("target", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "6",
		key: "1vlfrh"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "2",
		key: "1c9p78"
	}]
]);
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
var creatorFlow = [
	"Discover",
	"Apply",
	"Collaborate",
	"Get Paid"
];
var brandFlow = [
	"Campaign",
	"Discover",
	"Collaborate",
	"Grow"
];
function Flow({ start, steps }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/index.tsx:29:4",
		"data-macaly-name": "div",
		className: "flex flex-wrap items-center gap-2 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-macaly-loc": "src/routes/index.tsx:30:6",
			"data-macaly-name": "span",
			className: "rounded-full bg-foreground px-3 py-1 font-semibold text-background",
			children: start
		}), steps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"data-macaly-loc": "src/routes/index.tsx:32:8",
			"data-macaly-name": "span",
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
				"data-macaly-loc": "src/routes/index.tsx:33:10",
				"data-macaly-name": "ArrowRight",
				className: "size-4 text-muted-foreground"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-macaly-loc": "src/routes/index.tsx:34:10",
				"data-macaly-name": "span",
				className: "rounded-full border px-3 py-1 font-medium",
				children: s
			})]
		}, s))]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		"data-macaly-loc": "src/routes/index.tsx:43:4",
		"data-macaly-name": "AppShell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-macaly-loc": "src/routes/index.tsx:45:6",
				"data-macaly-name": "section",
				className: "relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/routes/index.tsx:46:8",
					"data-macaly-name": "div",
					className: "pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--brand)/0.18),transparent)]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/index.tsx:47:8",
					"data-macaly-name": "div",
					className: "mx-auto max-w-4xl px-4 pb-14 pt-12 text-center md:pt-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-macaly-loc": "src/routes/index.tsx:48:10",
							"data-macaly-name": "p",
							className: "inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-semibold tracking-wide",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-macaly-loc": "src/routes/index.tsx:49:12",
									"data-macaly-name": "span",
									className: "text-brand",
									children: "Creators"
								}),
								" × ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-macaly-loc": "src/routes/index.tsx:49:59",
									"data-macaly-name": "span",
									className: "text-brand-2",
									children: "Brands"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							"data-macaly-loc": "src/routes/index.tsx:51:10",
							"data-macaly-name": "h1",
							className: "mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl",
							children: [
								"Find sponsorships. Find creators.",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-macaly-loc": "src/routes/index.tsx:53:12",
									"data-macaly-name": "span",
									className: "text-brand",
									children: "Build collaborations."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-macaly-loc": "src/routes/index.tsx:55:10",
							"data-macaly-name": "p",
							className: "mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg",
							children: "Cube3 helps creators discover relevant sponsorship opportunities and helps brands find creators who match their campaigns."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/index.tsx:59:10",
							"data-macaly-name": "div",
							className: "mx-auto mt-8 grid max-w-md gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-macaly-loc": "src/routes/index.tsx:60:12",
								"data-macaly-name": "Button",
								asChild: true,
								size: "lg",
								className: "h-12 bg-brand text-brand-foreground hover:bg-brand/90",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									"data-macaly-loc": "src/routes/index.tsx:61:14",
									"data-macaly-name": "Link",
									to: "/sponsorships",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										"data-macaly-loc": "src/routes/index.tsx:61:39",
										"data-macaly-name": "Search",
										className: "size-4"
									}), " Find Sponsorships"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-macaly-loc": "src/routes/index.tsx:63:12",
								"data-macaly-name": "Button",
								asChild: true,
								size: "lg",
								variant: "outline",
								className: "h-12",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									"data-macaly-loc": "src/routes/index.tsx:64:14",
									"data-macaly-name": "Link",
									to: "/creators",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
										"data-macaly-loc": "src/routes/index.tsx:64:35",
										"data-macaly-name": "Target",
										className: "size-4"
									}), " Find Creators"]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/index.tsx:67:10",
							"data-macaly-name": "div",
							className: "mt-4 flex justify-center gap-5 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								"data-macaly-loc": "src/routes/index.tsx:68:12",
								"data-macaly-name": "Link",
								to: "/signin",
								search: { role: "creator" },
								className: "text-brand underline-offset-4 hover:underline",
								children: "I'm a Creator →"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								"data-macaly-loc": "src/routes/index.tsx:69:12",
								"data-macaly-name": "Link",
								to: "/signin",
								search: { role: "brand" },
								className: "text-brand-2 underline-offset-4 hover:underline",
								children: "I'm a Brand →"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"data-macaly-loc": "src/routes/index.tsx:75:6",
				"data-macaly-name": "section",
				className: "mx-auto max-w-5xl px-4 pb-14",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/index.tsx:76:8",
					"data-macaly-name": "div",
					className: "grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/index.tsx:77:10",
						"data-macaly-name": "div",
						className: "rounded-2xl border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-macaly-loc": "src/routes/index.tsx:78:12",
								"data-macaly-name": "h2",
								className: "text-lg font-bold",
								children: "For creators"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-macaly-loc": "src/routes/index.tsx:79:12",
								"data-macaly-name": "p",
								className: "mt-1 text-sm text-muted-foreground",
								children: "Connect your channel. Cube3 surfaces sponsorships that match your audience and content."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-macaly-loc": "src/routes/index.tsx:80:12",
								"data-macaly-name": "div",
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flow, {
									"data-macaly-loc": "src/routes/index.tsx:80:34",
									"data-macaly-name": "Flow",
									start: "Creator",
									steps: creatorFlow
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/index.tsx:82:10",
						"data-macaly-name": "div",
						className: "rounded-2xl border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								"data-macaly-loc": "src/routes/index.tsx:83:12",
								"data-macaly-name": "h2",
								className: "text-lg font-bold",
								children: "For brands"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-macaly-loc": "src/routes/index.tsx:84:12",
								"data-macaly-name": "p",
								className: "mt-1 text-sm text-muted-foreground",
								children: "Create a campaign. Cube3 finds creators who match your audience, category and requirements."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-macaly-loc": "src/routes/index.tsx:85:12",
								"data-macaly-name": "div",
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flow, {
									"data-macaly-loc": "src/routes/index.tsx:85:34",
									"data-macaly-name": "Flow",
									start: "Brand",
									steps: brandFlow
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"data-macaly-loc": "src/routes/index.tsx:91:6",
				"data-macaly-name": "section",
				className: "border-t bg-muted/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/routes/index.tsx:92:8",
					"data-macaly-name": "div",
					className: "mx-auto grid max-w-5xl gap-6 px-4 py-14 md:grid-cols-3",
					children: [
						{
							icon: Sparkles,
							title: "Sponsorships for you",
							body: "Open Cube3 and see campaigns matched to your category, platform, audience and language."
						},
						{
							icon: Handshake,
							title: "Explained matches",
							body: "Every match score shows exactly which requirements you meet — no black-box AI numbers."
						},
						{
							icon: BadgeCheck,
							title: "Honest data",
							body: "Verified and creator-reported stats are always labelled separately. Small creators welcome."
						}
					].map(({ icon: Icon, title, body }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/index.tsx:98:12",
						"data-macaly-name": "div",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-macaly-loc": "src/routes/index.tsx:99:14",
								"data-macaly-name": "span",
								className: "grid size-10 place-items-center rounded-lg bg-brand-soft text-brand",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									"data-macaly-loc": "src/routes/index.tsx:99:100",
									"data-macaly-name": "Icon",
									className: "size-5"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								"data-macaly-loc": "src/routes/index.tsx:100:14",
								"data-macaly-name": "h3",
								className: "mt-3 font-semibold",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"data-macaly-loc": "src/routes/index.tsx:101:14",
								"data-macaly-name": "p",
								className: "mt-1 text-sm text-muted-foreground",
								children: body
							})
						]
					}, title))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-macaly-loc": "src/routes/index.tsx:107:6",
				"data-macaly-name": "section",
				className: "mx-auto max-w-3xl px-4 py-14 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, {
						"data-macaly-loc": "src/routes/index.tsx:108:8",
						"data-macaly-name": "Megaphone",
						className: "mx-auto size-8 text-brand"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-macaly-loc": "src/routes/index.tsx:109:8",
						"data-macaly-name": "h2",
						className: "mt-3 text-2xl font-bold",
						children: "How do I find sponsors for my YouTube channel?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/index.tsx:110:8",
						"data-macaly-name": "p",
						className: "mt-2 text-muted-foreground",
						children: "Add your channel. Cube3 finds sponsorship opportunities that match your audience and content. Apply, negotiate and collaborate."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/index.tsx:113:8",
						"data-macaly-name": "Button",
						asChild: true,
						size: "lg",
						className: "mt-6 bg-brand text-brand-foreground hover:bg-brand/90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-macaly-loc": "src/routes/index.tsx:114:10",
							"data-macaly-name": "Link",
							to: "/signin",
							search: { role: "creator" },
							children: "Get started free"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				"data-macaly-loc": "src/routes/index.tsx:118:6",
				"data-macaly-name": "footer",
				className: "border-t py-8 text-center text-xs text-muted-foreground",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Cube3 · Creators × Brands ·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/routes/index.tsx:120:8",
						"data-macaly-name": "Link",
						to: "/privacy",
						className: "underline",
						children: "Privacy"
					}),
					" ·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/routes/index.tsx:121:8",
						"data-macaly-name": "Link",
						to: "/terms",
						className: "underline",
						children: "Terms"
					})
				]
			})
		]
	});
}
//#endregion
export { Home as component };
