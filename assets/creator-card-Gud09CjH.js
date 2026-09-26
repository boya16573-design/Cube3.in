import { D as require_jsx_runtime, v as Link } from "./api-D74LnTM3.js";
import { a as Button } from "./app-shell-CtDeXJqm.js";
import { t as BadgeCheck } from "./badge-check-B3dBneY_.js";
import { n as InviteButton, t as SaveCreatorButton } from "./save-creator-button-CN41vFFe.js";
import { n as MatchBadge, r as MatchReasons } from "./campaign-card-uuj6bXXJ.js";
import { t as MapPin } from "./map-pin-SfivTVGZ.js";
import { l as platformLabel, o as formatCount } from "./cube3-DuAq7Ab3.js";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-D_UKrJsR.js";
import { t as Badge } from "./badge-Ck0JGcps.js";
//#region src/components/creator-card.tsx
var import_jsx_runtime = require_jsx_runtime();
function CreatorCard({ c, match, campaignId }) {
	const bestViews = Math.max(0, ...c.accounts.map((a) => a.avgViews ?? 0));
	const initials = c.displayName.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		"data-macaly-loc": "src/components/creator-card.tsx:30:4",
		"data-macaly-name": "article",
		className: "flex flex-col rounded-xl border bg-card p-4 shadow-sm",
		"data-testid": "creator-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/creator-card.tsx:31:6",
				"data-macaly-name": "div",
				className: "flex items-start gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						"data-macaly-loc": "src/components/creator-card.tsx:32:8",
						"data-macaly-name": "Avatar",
						className: "size-12",
						children: [c.avatarUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
							"data-macaly-loc": "src/components/creator-card.tsx:33:26",
							"data-macaly-name": "AvatarImage",
							src: c.avatarUrl,
							alt: "",
							loading: "lazy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							"data-macaly-loc": "src/components/creator-card.tsx:34:10",
							"data-macaly-name": "AvatarFallback",
							children: initials
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/components/creator-card.tsx:36:8",
						"data-macaly-name": "div",
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-macaly-loc": "src/components/creator-card.tsx:37:10",
								"data-macaly-name": "p",
								className: "flex items-center gap-1 truncate font-semibold",
								children: [c.displayName, c.anyVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
									"data-macaly-loc": "src/components/creator-card.tsx:39:30",
									"data-macaly-name": "BadgeCheck",
									className: "size-4 shrink-0 text-brand",
									"aria-label": "Ownership verified"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-macaly-loc": "src/components/creator-card.tsx:41:10",
								"data-macaly-name": "p",
								className: "text-xs text-muted-foreground",
								children: [
									"@",
									c.username,
									" · ",
									c.category
								]
							}),
							(c.city || c.country) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-macaly-loc": "src/components/creator-card.tsx:43:12",
								"data-macaly-name": "p",
								className: "mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									"data-macaly-loc": "src/components/creator-card.tsx:44:14",
									"data-macaly-name": "MapPin",
									className: "size-3"
								}), [c.city, c.country].filter(Boolean).join(", ")]
							})
						]
					}),
					match && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchBadge, {
						"data-macaly-loc": "src/components/creator-card.tsx:48:18",
						"data-macaly-name": "MatchBadge",
						score: match.score
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveCreatorButton, {
						"data-macaly-loc": "src/components/creator-card.tsx:49:8",
						"data-macaly-name": "SaveCreatorButton",
						creatorUserId: c.userId,
						className: "-mr-2 -mt-2 shrink-0"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/creator-card.tsx:52:6",
				"data-macaly-name": "div",
				className: "mt-3 grid grid-cols-2 gap-2 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/creator-card.tsx:53:8",
					"data-macaly-name": "div",
					className: "rounded-lg bg-muted p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/components/creator-card.tsx:54:10",
						"data-macaly-name": "p",
						className: "font-bold",
						children: formatCount(c.totalFollowers)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/components/creator-card.tsx:55:10",
						"data-macaly-name": "p",
						className: "text-[11px] text-muted-foreground",
						children: "Total audience"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/creator-card.tsx:57:8",
					"data-macaly-name": "div",
					className: "rounded-lg bg-muted p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/components/creator-card.tsx:58:10",
						"data-macaly-name": "p",
						className: "font-bold",
						children: formatCount(bestViews)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/components/creator-card.tsx:59:10",
						"data-macaly-name": "p",
						className: "text-[11px] text-muted-foreground",
						children: "Avg views"
					})]
				})]
			}),
			c.accounts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/components/creator-card.tsx:63:8",
				"data-macaly-name": "p",
				className: "mt-1.5 text-[11px] text-muted-foreground",
				children: c.accounts.every((a) => a.connectedVia) ? "Verified stats from official APIs" : c.accounts.some((a) => a.connectedVia) ? "Some stats verified via official APIs" : `${c.anyVerified ? "Ownership verified · " : ""}${c.accounts.every((a) => a.statsCheckedAt) ? "Follower counts checked by Cube3" : "Stats are creator-reported"}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/creator-card.tsx:68:6",
				"data-macaly-name": "div",
				className: "mt-3 flex flex-wrap gap-1.5",
				children: [c.accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					"data-macaly-loc": "src/components/creator-card.tsx:69:31",
					"data-macaly-name": "Badge",
					variant: "outline",
					children: platformLabel(a.platform)
				}, a.platform)), c.languages.slice(0, 3).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					"data-macaly-loc": "src/components/creator-card.tsx:70:44",
					"data-macaly-name": "Badge",
					variant: "secondary",
					children: l
				}, l))]
			}),
			match && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/components/creator-card.tsx:73:16",
				"data-macaly-name": "div",
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchReasons, {
					"data-macaly-loc": "src/components/creator-card.tsx:73:38",
					"data-macaly-name": "MatchReasons",
					match,
					compact: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/creator-card.tsx:75:6",
				"data-macaly-name": "div",
				className: "mt-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/components/creator-card.tsx:76:8",
					"data-macaly-name": "Button",
					asChild: true,
					variant: "outline",
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/components/creator-card.tsx:77:10",
						"data-macaly-name": "Link",
						to: "/c/$username",
						params: { username: c.username },
						children: "View profile"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InviteButton, {
					"data-macaly-loc": "src/components/creator-card.tsx:79:8",
					"data-macaly-name": "InviteButton",
					creatorUserId: c.userId,
					creatorName: c.displayName,
					className: "flex-1",
					defaultCampaignId: campaignId
				})]
			})
		]
	});
}
//#endregion
export { CreatorCard as t };
