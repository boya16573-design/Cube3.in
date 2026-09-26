import { D as require_jsx_runtime, t as api, u as useQuery, v as Link } from "./api-D74LnTM3.js";
import { a as Button, n as EmptyState, t as AppShell } from "./app-shell-CtDeXJqm.js";
import { t as usePreloadedQuery } from "./hydration-Bnl31goM.js";
import { t as BadgeCheck } from "./badge-check-B3dBneY_.js";
import { n as InviteButton, t as SaveCreatorButton } from "./save-creator-button-CN41vFFe.js";
import { t as ExternalLink } from "./external-link-jbjCWyxj.js";
import { t as MapPin } from "./map-pin-SfivTVGZ.js";
import { l as platformLabel, o as formatCount } from "./cube3-DuAq7Ab3.js";
import { t as Route } from "./_username-DmR47DLO.js";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-D_UKrJsR.js";
import { t as Badge } from "./badge-Ck0JGcps.js";
//#region src/routes/c/$username.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function CreatorProfile() {
	const { preloaded } = Route.useLoaderData();
	const c = usePreloadedQuery(preloaded);
	const me = useQuery(api.authz.whoAmI);
	if (c === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/c/$username.tsx:56:25",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			"data-macaly-loc": "src/routes/c/$username.tsx:56:35",
			"data-macaly-name": "EmptyState",
			title: "Creator not found",
			cta: {
				to: "/creators",
				label: "Browse creators"
			}
		})
	});
	const isMe = me?.signedIn && me.profile?.username === c.username;
	const isBrand = me?.signedIn && me.profile?.role === "brand";
	const initials = c.displayName.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/c/$username.tsx:63:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/c/$username.tsx:64:6",
			"data-macaly-name": "div",
			className: "mx-auto grid max-w-3xl gap-6 px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					"data-macaly-loc": "src/routes/c/$username.tsx:65:8",
					"data-macaly-name": "header",
					className: "flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						"data-macaly-loc": "src/routes/c/$username.tsx:66:10",
						"data-macaly-name": "Avatar",
						className: "size-20",
						children: [c.avatarUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
							"data-macaly-loc": "src/routes/c/$username.tsx:67:28",
							"data-macaly-name": "AvatarImage",
							src: c.avatarUrl,
							alt: ""
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							"data-macaly-loc": "src/routes/c/$username.tsx:68:12",
							"data-macaly-name": "AvatarFallback",
							className: "text-xl",
							children: initials
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/c/$username.tsx:70:10",
						"data-macaly-name": "div",
						className: "mt-3 sm:mt-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								"data-macaly-loc": "src/routes/c/$username.tsx:71:12",
								"data-macaly-name": "h1",
								className: "flex items-center justify-center gap-1.5 text-2xl font-bold sm:justify-start",
								children: [c.displayName, c.anyVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
									"data-macaly-loc": "src/routes/c/$username.tsx:73:32",
									"data-macaly-name": "BadgeCheck",
									className: "size-5 text-brand"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-macaly-loc": "src/routes/c/$username.tsx:75:12",
								"data-macaly-name": "p",
								className: "text-sm text-muted-foreground",
								children: [
									"@",
									c.username,
									" · ",
									c.category,
									" creator"
								]
							}),
							(c.city || c.country) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-macaly-loc": "src/routes/c/$username.tsx:77:14",
								"data-macaly-name": "p",
								className: "mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									"data-macaly-loc": "src/routes/c/$username.tsx:77:95",
									"data-macaly-name": "MapPin",
									className: "size-3.5"
								}), [c.city, c.country].filter(Boolean).join(", ")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-macaly-loc": "src/routes/c/$username.tsx:79:12",
								"data-macaly-name": "div",
								className: "mt-2 flex flex-wrap justify-center gap-1.5 sm:justify-start",
								children: [c.languages.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-macaly-loc": "src/routes/c/$username.tsx:80:38",
									"data-macaly-name": "Badge",
									variant: "secondary",
									children: l
								}, l)), c.contentTypes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									"data-macaly-loc": "src/routes/c/$username.tsx:81:41",
									"data-macaly-name": "Badge",
									variant: "outline",
									children: t
								}, t))]
							})
						]
					})]
				}),
				c.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/c/$username.tsx:86:18",
					"data-macaly-name": "p",
					className: "whitespace-pre-line text-sm",
					children: c.bio
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"data-macaly-loc": "src/routes/c/$username.tsx:88:8",
					"data-macaly-name": "section",
					className: "grid gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-macaly-loc": "src/routes/c/$username.tsx:89:10",
						"data-macaly-name": "h2",
						className: "font-semibold",
						children: "Platforms"
					}), c.accounts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/c/$username.tsx:91:12",
						"data-macaly-name": "p",
						className: "text-sm text-muted-foreground",
						children: "No platforms added yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						"data-macaly-loc": "src/routes/c/$username.tsx:93:12",
						"data-macaly-name": "ul",
						className: "grid gap-3 sm:grid-cols-2",
						children: c.accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							"data-macaly-loc": "src/routes/c/$username.tsx:95:16",
							"data-macaly-name": "li",
							className: "rounded-xl border p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-macaly-loc": "src/routes/c/$username.tsx:96:18",
									"data-macaly-name": "div",
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-macaly-loc": "src/routes/c/$username.tsx:97:20",
										"data-macaly-name": "p",
										className: "font-medium",
										children: platformLabel(a.platform)
									}), a.connectedVia ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-macaly-loc": "src/routes/c/$username.tsx:99:22",
										"data-macaly-name": "span",
										className: "inline-flex items-center gap-1 text-xs font-medium text-success",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
											"data-macaly-loc": "src/routes/c/$username.tsx:99:104",
											"data-macaly-name": "BadgeCheck",
											className: "size-3.5"
										}), "Verified data"]
									}) : a.verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										"data-macaly-loc": "src/routes/c/$username.tsx:101:22",
										"data-macaly-name": "span",
										className: "inline-flex items-center gap-1 text-xs font-medium text-success",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
											"data-macaly-loc": "src/routes/c/$username.tsx:101:104",
											"data-macaly-name": "BadgeCheck",
											className: "size-3.5"
										}), "Ownership verified"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-macaly-loc": "src/routes/c/$username.tsx:103:22",
										"data-macaly-name": "span",
										className: "rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground",
										children: "Creator-reported"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									"data-macaly-loc": "src/routes/c/$username.tsx:106:18",
									"data-macaly-name": "p",
									className: "text-sm text-muted-foreground",
									children: ["@", a.handle]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-macaly-loc": "src/routes/c/$username.tsx:107:18",
									"data-macaly-name": "div",
									className: "mt-3 grid grid-cols-2 gap-2 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-macaly-loc": "src/routes/c/$username.tsx:108:20",
										"data-macaly-name": "div",
										className: "rounded-lg bg-muted p-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-macaly-loc": "src/routes/c/$username.tsx:109:22",
											"data-macaly-name": "p",
											className: "font-bold",
											children: a.followerCount !== void 0 ? formatCount(a.followerCount) : "—"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-macaly-loc": "src/routes/c/$username.tsx:110:22",
											"data-macaly-name": "p",
											className: "text-[11px] text-muted-foreground",
											children: a.platform === "youtube" ? "Subscribers" : "Followers"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-macaly-loc": "src/routes/c/$username.tsx:112:20",
										"data-macaly-name": "div",
										className: "rounded-lg bg-muted p-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-macaly-loc": "src/routes/c/$username.tsx:113:22",
											"data-macaly-name": "p",
											className: "font-bold",
											children: a.avgViews !== void 0 ? formatCount(a.avgViews) : "—"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											"data-macaly-loc": "src/routes/c/$username.tsx:114:22",
											"data-macaly-name": "p",
											className: "text-[11px] text-muted-foreground",
											children: "Avg views"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-macaly-loc": "src/routes/c/$username.tsx:117:18",
									"data-macaly-name": "p",
									className: "mt-2 text-[11px] text-muted-foreground",
									children: a.connectedVia && a.statsSyncedAt ? `From ${platformLabel(a.platform)}'s official API on ${new Date(a.statsSyncedAt).toLocaleDateString("en-IN")}${a.engagementRate !== void 0 ? ` · ${a.engagementRate}% engagement` : ""}.` : a.statsCheckedAt ? `Follower count checked by Cube3 on ${new Date(a.statsCheckedAt).toLocaleDateString("en-IN")}. Views are creator-reported.` : "Stats are creator-reported."
								}),
								a.recentMedia && a.recentMedia.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-macaly-loc": "src/routes/c/$username.tsx:123:20",
									"data-macaly-name": "div",
									className: "mt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-macaly-loc": "src/routes/c/$username.tsx:124:22",
										"data-macaly-name": "p",
										className: "text-xs font-medium",
										children: ["Recent ", a.platform === "youtube" ? "videos" : "posts"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										"data-macaly-loc": "src/routes/c/$username.tsx:125:22",
										"data-macaly-name": "ul",
										className: "mt-1 grid gap-1",
										children: a.recentMedia.slice(0, 4).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											"data-macaly-loc": "src/routes/c/$username.tsx:127:26",
											"data-macaly-name": "li",
											className: "flex justify-between gap-2 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												"data-macaly-loc": "src/routes/c/$username.tsx:128:28",
												"data-macaly-name": "a",
												href: m.url,
												target: "_blank",
												rel: "noopener noreferrer nofollow",
												className: "truncate text-brand hover:underline",
												children: m.title
											}), m.views !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												"data-macaly-loc": "src/routes/c/$username.tsx:129:54",
												"data-macaly-name": "span",
												className: "shrink-0 text-muted-foreground",
												children: [formatCount(m.views), " views"]
											})]
										}, m.url))
									})]
								}),
								a.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									"data-macaly-loc": "src/routes/c/$username.tsx:136:20",
									"data-macaly-name": "a",
									href: a.url,
									target: "_blank",
									rel: "noopener noreferrer nofollow",
									className: "mt-3 inline-flex items-center gap-1 text-sm text-brand hover:underline",
									children: ["Visit ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
										"data-macaly-loc": "src/routes/c/$username.tsx:137:28",
										"data-macaly-name": "ExternalLink",
										className: "size-3.5"
									})]
								})
							]
						}, a._id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/c/$username.tsx:146:8",
					"data-macaly-name": "Button",
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/routes/c/$username.tsx:146:42",
						"data-macaly-name": "Link",
						to: "/kit/$username",
						params: { username: c.username },
						children: "View media kit"
					})
				}),
				isMe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/c/$username.tsx:149:10",
					"data-macaly-name": "Button",
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/routes/c/$username.tsx:149:44",
						"data-macaly-name": "Link",
						to: "/profile",
						children: "Edit profile"
					})
				}),
				isBrand && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/c/$username.tsx:152:10",
					"data-macaly-name": "div",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InviteButton, {
						"data-macaly-loc": "src/routes/c/$username.tsx:153:12",
						"data-macaly-name": "InviteButton",
						creatorUserId: c.userId,
						creatorName: c.displayName,
						className: "flex-1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveCreatorButton, {
						"data-macaly-loc": "src/routes/c/$username.tsx:154:12",
						"data-macaly-name": "SaveCreatorButton",
						creatorUserId: c.userId
					})]
				})
			]
		})
	});
}
//#endregion
export { CreatorProfile as component };
