import { D as require_jsx_runtime, l as useMutation, t as api, u as useQuery } from "./api-D74LnTM3.js";
import { t as useNavigate } from "./useNavigate-BFWl-dPi.js";
import { a as Button, i as RequireProfile, m as Bell, o as cn, r as PageLoading, t as AppShell } from "./app-shell-CtDeXJqm.js";
import { s as formatDate } from "./cube3-DuAq7Ab3.js";
//#region src/routes/notifications.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/notifications.tsx:15:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireProfile, {
			"data-macaly-loc": "src/routes/notifications.tsx:16:6",
			"data-macaly-name": "RequireProfile",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notifications, {
				"data-macaly-loc": "src/routes/notifications.tsx:17:8",
				"data-macaly-name": "Notifications"
			})
		})
	});
}
function Notifications() {
	const items = useQuery(api.notifications.listMine);
	const markAll = useMutation(api.notifications.markAllRead);
	const markRead = useMutation(api.notifications.markRead);
	const navigate = useNavigate();
	if (items === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/routes/notifications.tsx:28:34",
		"data-macaly-name": "PageLoading"
	});
	const unread = items.filter((n) => !n.read).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/notifications.tsx:32:4",
		"data-macaly-name": "div",
		className: "mx-auto max-w-2xl px-4 py-8",
		"data-state": "ready",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/notifications.tsx:33:6",
			"data-macaly-name": "div",
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-macaly-loc": "src/routes/notifications.tsx:34:8",
				"data-macaly-name": "h1",
				className: "text-2xl font-bold",
				children: "Notifications"
			}), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/routes/notifications.tsx:35:23",
				"data-macaly-name": "Button",
				variant: "outline",
				size: "sm",
				onClick: () => void markAll(),
				children: "Mark all read"
			})]
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/notifications.tsx:39:8",
			"data-macaly-name": "div",
			className: "mt-6 rounded-xl border border-dashed p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
					"data-macaly-loc": "src/routes/notifications.tsx:40:10",
					"data-macaly-name": "Bell",
					className: "mx-auto size-8 text-muted-foreground"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/notifications.tsx:41:10",
					"data-macaly-name": "p",
					className: "mt-2 font-medium",
					children: "You're all caught up"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/notifications.tsx:42:10",
					"data-macaly-name": "p",
					className: "mt-1 text-sm text-muted-foreground",
					children: "New matches, applications, offers and messages show up here."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			"data-macaly-loc": "src/routes/notifications.tsx:45:8",
			"data-macaly-name": "ul",
			className: "mt-6 divide-y rounded-xl border",
			children: items.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				"data-macaly-loc": "src/routes/notifications.tsx:47:12",
				"data-macaly-name": "li",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					"data-macaly-loc": "src/routes/notifications.tsx:48:14",
					"data-macaly-name": "button",
					className: cn("flex w-full items-start gap-3 p-4 text-left hover:bg-muted/50", !n.read && "bg-brand-soft"),
					onClick: () => {
						if (!n.read) markRead({ notificationId: n._id });
						if (n.link) navigate({ to: n.link });
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-macaly-loc": "src/routes/notifications.tsx:55:16",
						"data-macaly-name": "span",
						className: cn("mt-1.5 size-2 shrink-0 rounded-full", n.read ? "bg-transparent" : "bg-brand")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						"data-macaly-loc": "src/routes/notifications.tsx:56:16",
						"data-macaly-name": "span",
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-macaly-loc": "src/routes/notifications.tsx:57:18",
								"data-macaly-name": "span",
								className: cn("block text-sm", !n.read && "font-semibold"),
								children: n.title
							}),
							n.body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-macaly-loc": "src/routes/notifications.tsx:58:29",
								"data-macaly-name": "span",
								className: "block truncate text-xs text-muted-foreground",
								children: n.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-macaly-loc": "src/routes/notifications.tsx:59:18",
								"data-macaly-name": "span",
								className: "mt-0.5 block text-[11px] text-muted-foreground",
								children: formatDate(n._creationTime)
							})
						]
					})]
				})
			}, n._id))
		})]
	});
}
//#endregion
export { NotificationsPage as component };
