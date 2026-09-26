import { S as Link, ht as __toESM, j as require_jsx_runtime, m as useQuery, o as createLucideIcon, pt as require_react, t as api } from "./api-DJqU9p-G.js";
import { a as Button, n as EmptyState, t as AppShell } from "./app-shell-BzN9KHqO.js";
import { t as usePreloadedQuery } from "./hydration-BRMOaqr7.js";
import { t as BadgeCheck } from "./badge-check-grlmTD77.js";
import { t as MapPin } from "./map-pin-DphV8733.js";
import { l as platformLabel, o as formatCount } from "./cube3-BhcyVTyu.js";
import { t as Route } from "./_username-Dx77qnWr.js";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-BDLdAEYl.js";
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Download = createLucideIcon("download", [
	["path", {
		d: "M12 15V3",
		key: "m9g1x1"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["path", {
		d: "m7 10 5 5 5-5",
		key: "brsn70"
	}]
]);
//#endregion
//#region src/routes/kit/$username.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MediaKitPage() {
	const { preloaded } = Route.useLoaderData();
	const kit = usePreloadedQuery(preloaded);
	const me = useQuery(api.authz.whoAmI);
	const [origin, setOrigin] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => setOrigin(window.location.origin), []);
	if (kit === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/kit/$username.tsx:41:27",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			"data-macaly-loc": "src/routes/kit/$username.tsx:41:37",
			"data-macaly-name": "EmptyState",
			title: "Media kit not found",
			cta: {
				to: "/creators",
				label: "Browse creators"
			}
		})
	});
	const c = kit.creator;
	const isMe = me?.signedIn && me.profile?.username === c.username;
	const initials = c.displayName.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();
	const bestViews = Math.max(0, ...c.accounts.map((a) => a.avgViews ?? 0));
	const profileUrl = `${origin}/c/${c.username}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/kit/$username.tsx:50:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/kit/$username.tsx:51:6",
			"data-macaly-name": "div",
			className: "mx-auto max-w-3xl px-4 py-6 print:max-w-none print:p-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/kit/$username.tsx:52:8",
					"data-macaly-name": "div",
					className: "mb-4 flex flex-wrap items-center justify-between gap-2 print:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/routes/kit/$username.tsx:53:10",
						"data-macaly-name": "Link",
						to: "/c/$username",
						params: { username: c.username },
						className: "text-sm text-muted-foreground hover:underline",
						children: "← Profile"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/kit/$username.tsx:54:10",
						"data-macaly-name": "div",
						className: "flex gap-2",
						children: [isMe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-macaly-loc": "src/routes/kit/$username.tsx:55:21",
							"data-macaly-name": "Button",
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								"data-macaly-loc": "src/routes/kit/$username.tsx:55:65",
								"data-macaly-name": "Link",
								to: "/profile",
								children: "Edit details"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							"data-macaly-loc": "src/routes/kit/$username.tsx:56:12",
							"data-macaly-name": "Button",
							size: "sm",
							onClick: () => window.print(),
							className: "bg-brand text-brand-foreground hover:bg-brand/90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
								"data-macaly-loc": "src/routes/kit/$username.tsx:57:14",
								"data-macaly-name": "Download",
								className: "size-4"
							}), "Download PDF"]
						})]
					})]
				}),
				isMe && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-macaly-loc": "src/routes/kit/$username.tsx:62:10",
					"data-macaly-name": "p",
					className: "mb-4 rounded-lg bg-muted p-3 text-xs text-muted-foreground print:hidden",
					children: [
						"Your media kit is generated automatically from your profile and stays up to date. “Download PDF” opens print — choose ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							"data-macaly-loc": "src/routes/kit/$username.tsx:63:130",
							"data-macaly-name": "strong",
							children: "Save as PDF"
						}),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					"data-macaly-loc": "src/routes/kit/$username.tsx:67:8",
					"data-macaly-name": "article",
					className: "overflow-hidden rounded-2xl border bg-card print:rounded-none print:border-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						"data-macaly-loc": "src/routes/kit/$username.tsx:68:10",
						"data-macaly-name": "header",
						className: "bg-brand p-6 text-brand-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/kit/$username.tsx:69:12",
							"data-macaly-name": "div",
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								"data-macaly-loc": "src/routes/kit/$username.tsx:70:14",
								"data-macaly-name": "Avatar",
								className: "size-20 border-4 border-brand-foreground/30",
								children: [c.avatarUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
									"data-macaly-loc": "src/routes/kit/$username.tsx:71:32",
									"data-macaly-name": "AvatarImage",
									src: c.avatarUrl,
									alt: ""
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
									"data-macaly-loc": "src/routes/kit/$username.tsx:72:16",
									"data-macaly-name": "AvatarFallback",
									className: "text-xl text-foreground",
									children: initials
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-macaly-loc": "src/routes/kit/$username.tsx:74:14",
								"data-macaly-name": "div",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-macaly-loc": "src/routes/kit/$username.tsx:75:16",
										"data-macaly-name": "p",
										className: "text-xs font-semibold uppercase tracking-widest opacity-80",
										children: "Media kit"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										"data-macaly-loc": "src/routes/kit/$username.tsx:76:16",
										"data-macaly-name": "h1",
										className: "text-2xl font-extrabold",
										children: c.displayName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-macaly-loc": "src/routes/kit/$username.tsx:77:16",
										"data-macaly-name": "p",
										className: "text-sm opacity-90",
										children: [
											"@",
											c.username,
											" · ",
											c.category,
											" creator"
										]
									}),
									(c.city || c.country) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-macaly-loc": "src/routes/kit/$username.tsx:79:18",
										"data-macaly-name": "p",
										className: "mt-0.5 inline-flex items-center gap-1 text-sm opacity-90",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
											"data-macaly-loc": "src/routes/kit/$username.tsx:79:90",
											"data-macaly-name": "MapPin",
											className: "size-3.5"
										}), [c.city, c.country].filter(Boolean).join(", ")]
									})
								]
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/kit/$username.tsx:85:10",
						"data-macaly-name": "div",
						className: "grid gap-6 p-6",
						children: [
							c.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"data-macaly-loc": "src/routes/kit/$username.tsx:87:14",
								"data-macaly-name": "section",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									"data-macaly-loc": "src/routes/kit/$username.tsx:88:16",
									"data-macaly-name": "h2",
									className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: "About"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-macaly-loc": "src/routes/kit/$username.tsx:89:16",
									"data-macaly-name": "p",
									className: "mt-1 whitespace-pre-line text-sm",
									children: c.bio
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"data-macaly-loc": "src/routes/kit/$username.tsx:93:12",
								"data-macaly-name": "section",
								className: "grid grid-cols-3 gap-3 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										"data-macaly-loc": "src/routes/kit/$username.tsx:94:14",
										"data-macaly-name": "Stat",
										value: formatCount(c.totalFollowers),
										label: "Total audience"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										"data-macaly-loc": "src/routes/kit/$username.tsx:95:14",
										"data-macaly-name": "Stat",
										value: formatCount(bestViews),
										label: "Best avg views"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										"data-macaly-loc": "src/routes/kit/$username.tsx:96:14",
										"data-macaly-name": "Stat",
										value: String(kit.completedCollaborations),
										label: "Cube3 collabs completed"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"data-macaly-loc": "src/routes/kit/$username.tsx:99:12",
								"data-macaly-name": "section",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										"data-macaly-loc": "src/routes/kit/$username.tsx:100:14",
										"data-macaly-name": "h2",
										className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
										children: "Platforms"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										"data-macaly-loc": "src/routes/kit/$username.tsx:101:14",
										"data-macaly-name": "table",
										className: "mt-2 w-full text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
											"data-macaly-loc": "src/routes/kit/$username.tsx:102:16",
											"data-macaly-name": "thead",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												"data-macaly-loc": "src/routes/kit/$username.tsx:103:18",
												"data-macaly-name": "tr",
												className: "border-b text-left text-xs text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														"data-macaly-loc": "src/routes/kit/$username.tsx:104:20",
														"data-macaly-name": "th",
														className: "py-1.5 font-medium",
														children: "Platform"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														"data-macaly-loc": "src/routes/kit/$username.tsx:105:20",
														"data-macaly-name": "th",
														className: "py-1.5 font-medium",
														children: "Handle"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														"data-macaly-loc": "src/routes/kit/$username.tsx:106:20",
														"data-macaly-name": "th",
														className: "py-1.5 text-right font-medium",
														children: "Audience"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														"data-macaly-loc": "src/routes/kit/$username.tsx:107:20",
														"data-macaly-name": "th",
														className: "py-1.5 text-right font-medium",
														children: "Avg views"
													})
												]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
											"data-macaly-loc": "src/routes/kit/$username.tsx:110:16",
											"data-macaly-name": "tbody",
											children: c.accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												"data-macaly-loc": "src/routes/kit/$username.tsx:112:20",
												"data-macaly-name": "tr",
												className: "border-b last:border-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														"data-macaly-loc": "src/routes/kit/$username.tsx:113:22",
														"data-macaly-name": "td",
														className: "py-2",
														children: [platformLabel(a.platform), a.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
															"data-macaly-loc": "src/routes/kit/$username.tsx:115:39",
															"data-macaly-name": "BadgeCheck",
															className: "ml-1 inline size-3.5 text-success",
															"aria-label": "Ownership verified"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														"data-macaly-loc": "src/routes/kit/$username.tsx:117:22",
														"data-macaly-name": "td",
														className: "py-2 text-muted-foreground",
														children: ["@", a.handle]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														"data-macaly-loc": "src/routes/kit/$username.tsx:118:22",
														"data-macaly-name": "td",
														className: "py-2 text-right font-medium",
														children: a.followerCount !== void 0 ? formatCount(a.followerCount) : "—"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														"data-macaly-loc": "src/routes/kit/$username.tsx:119:22",
														"data-macaly-name": "td",
														className: "py-2 text-right font-medium",
														children: a.avgViews !== void 0 ? formatCount(a.avgViews) : "—"
													})
												]
											}, a._id))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-macaly-loc": "src/routes/kit/$username.tsx:124:14",
										"data-macaly-name": "p",
										className: "mt-2 text-[11px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
											"data-macaly-loc": "src/routes/kit/$username.tsx:125:16",
											"data-macaly-name": "BadgeCheck",
											className: "inline size-3 text-success"
										}), " = verified. Accounts connected through YouTube/Instagram show stats from the official API; other numbers are creator-reported."]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"data-macaly-loc": "src/routes/kit/$username.tsx:130:12",
								"data-macaly-name": "section",
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-macaly-loc": "src/routes/kit/$username.tsx:131:14",
									"data-macaly-name": "div",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											"data-macaly-loc": "src/routes/kit/$username.tsx:132:16",
											"data-macaly-name": "h2",
											className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
											children: "Content"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-macaly-loc": "src/routes/kit/$username.tsx:133:16",
											"data-macaly-name": "p",
											className: "mt-1 text-sm",
											children: [c.category, ...c.contentTypes].join(" · ")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											"data-macaly-loc": "src/routes/kit/$username.tsx:134:16",
											"data-macaly-name": "p",
											className: "mt-1 text-sm text-muted-foreground",
											children: ["Languages: ", c.languages.join(", ") || "—"]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-macaly-loc": "src/routes/kit/$username.tsx:136:14",
									"data-macaly-name": "div",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										"data-macaly-loc": "src/routes/kit/$username.tsx:137:16",
										"data-macaly-name": "h2",
										className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
										children: "Previous collaborations"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-macaly-loc": "src/routes/kit/$username.tsx:138:16",
										"data-macaly-name": "p",
										className: "mt-1 text-sm",
										children: kit.completedCollaborations > 0 ? `${kit.completedCollaborations} completed on Cube3${kit.collaborationCategories.length ? ` · ${kit.collaborationCategories.join(", ")}` : ""}` : "No completed Cube3 collaborations yet."
									})]
								})]
							}),
							kit.sponsorshipPreferences && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"data-macaly-loc": "src/routes/kit/$username.tsx:147:14",
								"data-macaly-name": "section",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									"data-macaly-loc": "src/routes/kit/$username.tsx:148:16",
									"data-macaly-name": "h2",
									className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
									children: "Sponsorship preferences"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-macaly-loc": "src/routes/kit/$username.tsx:149:16",
									"data-macaly-name": "p",
									className: "mt-1 whitespace-pre-line text-sm",
									children: kit.sponsorshipPreferences
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"data-macaly-loc": "src/routes/kit/$username.tsx:153:12",
								"data-macaly-name": "section",
								className: "rounded-xl bg-muted p-4 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										"data-macaly-loc": "src/routes/kit/$username.tsx:154:14",
										"data-macaly-name": "h2",
										className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
										children: "Contact"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-macaly-loc": "src/routes/kit/$username.tsx:155:14",
										"data-macaly-name": "p",
										className: "mt-1",
										children: [
											"Work with ",
											c.displayName,
											" on Cube3: ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"data-macaly-loc": "src/routes/kit/$username.tsx:155:70",
												"data-macaly-name": "span",
												className: "break-all font-medium",
												children: profileUrl
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-macaly-loc": "src/routes/kit/$username.tsx:156:14",
										"data-macaly-name": "p",
										className: "mt-1 text-xs text-muted-foreground",
										children: "Contact goes through Cube3 so creators never have to publish their email or phone."
									})
								]
							})
						]
					})]
				})
			]
		})
	});
}
function Stat({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/kit/$username.tsx:167:4",
		"data-macaly-name": "div",
		className: "rounded-xl border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-macaly-loc": "src/routes/kit/$username.tsx:168:6",
			"data-macaly-name": "p",
			className: "text-xl font-extrabold",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-macaly-loc": "src/routes/kit/$username.tsx:169:6",
			"data-macaly-name": "p",
			className: "text-[11px] text-muted-foreground",
			children: label
		})]
	});
}
//#endregion
export { MediaKitPage as component };
