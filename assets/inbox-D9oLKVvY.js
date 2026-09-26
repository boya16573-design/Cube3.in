import { S as Link, j as require_jsx_runtime, m as useQuery, t as api } from "./api-DJqU9p-G.js";
import { a as Button, i as RequireProfile, o as cn, r as PageLoading, t as AppShell } from "./app-shell-BzN9KHqO.js";
import { t as StatusPill } from "./collab-status-CNpZ_UKi.js";
//#region src/routes/inbox.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function timeAgo(ms) {
	const m = Math.round((Date.now() - ms) / 6e4);
	if (m < 1) return "now";
	if (m < 60) return `${m}m`;
	const h = Math.round(m / 60);
	if (h < 24) return `${h}h`;
	return `${Math.round(h / 24)}d`;
}
function InboxPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/inbox.tsx:23:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireProfile, {
			"data-macaly-loc": "src/routes/inbox.tsx:24:6",
			"data-macaly-name": "RequireProfile",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {
				"data-macaly-loc": "src/routes/inbox.tsx:25:8",
				"data-macaly-name": "Inbox"
			})
		})
	});
}
function Inbox() {
	const items = useQuery(api.collabs.inbox);
	const me = useQuery(api.authz.whoAmI);
	if (items === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/routes/inbox.tsx:34:34",
		"data-macaly-name": "PageLoading"
	});
	const isBrand = me?.signedIn && me.profile?.role === "brand";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/inbox.tsx:38:4",
		"data-macaly-name": "div",
		className: "mx-auto max-w-2xl px-4 py-8",
		"data-state": "ready",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-macaly-loc": "src/routes/inbox.tsx:39:6",
				"data-macaly-name": "h1",
				className: "text-2xl font-bold",
				children: "Inbox"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/inbox.tsx:40:6",
				"data-macaly-name": "p",
				className: "text-sm text-muted-foreground",
				children: "Conversations, offers and active collaborations."
			}),
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/routes/inbox.tsx:43:8",
				"data-macaly-name": "div",
				className: "mt-6 rounded-xl border border-dashed p-8 text-center",
				children: isBrand ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/inbox.tsx:46:14",
						"data-macaly-name": "p",
						className: "font-medium",
						children: "No conversations yet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/inbox.tsx:47:14",
						"data-macaly-name": "p",
						className: "mt-1 text-sm text-muted-foreground",
						children: "Message an applicant or invite a creator to start one."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/inbox.tsx:48:14",
						"data-macaly-name": "Button",
						asChild: true,
						className: "mt-3 bg-brand text-brand-foreground hover:bg-brand/90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-macaly-loc": "src/routes/inbox.tsx:48:96",
							"data-macaly-name": "Link",
							to: "/creators",
							children: "Discover Creators →"
						})
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/inbox.tsx:52:14",
						"data-macaly-name": "p",
						className: "font-medium",
						children: "No conversations yet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/inbox.tsx:53:14",
						"data-macaly-name": "p",
						className: "mt-1 text-sm text-muted-foreground",
						children: "Brands start a conversation after you apply or when they invite you."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/inbox.tsx:54:14",
						"data-macaly-name": "Button",
						asChild: true,
						className: "mt-3 bg-brand text-brand-foreground hover:bg-brand/90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-macaly-loc": "src/routes/inbox.tsx:54:96",
							"data-macaly-name": "Link",
							to: "/sponsorships",
							children: "Find Sponsorships →"
						})
					})
				] })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-macaly-loc": "src/routes/inbox.tsx:59:8",
				"data-macaly-name": "ul",
				className: "mt-6 divide-y rounded-xl border",
				children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					"data-macaly-loc": "src/routes/inbox.tsx:61:12",
					"data-macaly-name": "li",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						"data-macaly-loc": "src/routes/inbox.tsx:62:14",
						"data-macaly-name": "Link",
						to: "/collab/$collaborationId",
						params: { collaborationId: c._id },
						className: "flex items-start gap-3 p-4 hover:bg-muted/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/inbox.tsx:63:16",
							"data-macaly-name": "div",
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-macaly-loc": "src/routes/inbox.tsx:64:18",
									"data-macaly-name": "div",
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-macaly-loc": "src/routes/inbox.tsx:65:20",
										"data-macaly-name": "p",
										className: cn("truncate", c.unread > 0 ? "font-bold" : "font-medium"),
										children: c.counterpartName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-macaly-loc": "src/routes/inbox.tsx:66:20",
										"data-macaly-name": "span",
										className: "shrink-0 text-xs text-muted-foreground",
										children: timeAgo(c.lastActivityAt)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									"data-macaly-loc": "src/routes/inbox.tsx:68:18",
									"data-macaly-name": "p",
									className: "truncate text-xs text-muted-foreground",
									children: c.campaignTitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-macaly-loc": "src/routes/inbox.tsx:69:18",
									"data-macaly-name": "div",
									className: "mt-1 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
										"data-macaly-loc": "src/routes/inbox.tsx:70:20",
										"data-macaly-name": "StatusPill",
										status: c.status
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-macaly-loc": "src/routes/inbox.tsx:71:20",
										"data-macaly-name": "p",
										className: cn("truncate text-sm", c.unread > 0 ? "text-foreground" : "text-muted-foreground"),
										children: c.lastMessagePreview
									})]
								})
							]
						}), c.unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-macaly-loc": "src/routes/inbox.tsx:74:33",
							"data-macaly-name": "span",
							className: "mt-1 grid min-w-5 place-items-center rounded-full bg-brand px-1.5 text-xs font-bold text-brand-foreground",
							children: c.unread
						})]
					})
				}, c._id))
			})
		]
	});
}
//#endregion
export { InboxPage as component };
