import { S as Link, j as require_jsx_runtime, m as useQuery, o as createLucideIcon, p as useMutation, t as api } from "./api-DJqU9p-G.js";
import { a as Button } from "./app-shell-BzN9KHqO.js";
import { n as toast } from "./dist-B6VFZ26f.js";
import { t as Switch } from "./switch-B57GZnDl.js";
import { t as CreatorCard } from "./creator-card-BbRuZEit.js";
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Mail = createLucideIcon("mail", [["path", {
	d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
	key: "132q7q"
}], ["rect", {
	x: "2",
	y: "4",
	width: "20",
	height: "16",
	rx: "2",
	key: "izxlao"
}]]);
//#endregion
//#region src/components/preferences-and-saves.tsx
var import_jsx_runtime = require_jsx_runtime();
/** Profile setting: email notifications for important events. */
function EmailPreference() {
	const enabled = useQuery(api.profiles.emailPreference);
	const set = useMutation(api.profiles.setEmailPreference);
	if (enabled === void 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/components/preferences-and-saves.tsx:17:4",
		"data-macaly-name": "section",
		className: "flex items-start justify-between gap-4 rounded-xl border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/components/preferences-and-saves.tsx:18:6",
			"data-macaly-name": "div",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				"data-macaly-loc": "src/components/preferences-and-saves.tsx:19:8",
				"data-macaly-name": "h2",
				className: "flex items-center gap-2 font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
					"data-macaly-loc": "src/components/preferences-and-saves.tsx:19:62",
					"data-macaly-name": "Mail",
					className: "size-4"
				}), "Email notifications"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/components/preferences-and-saves.tsx:20:8",
				"data-macaly-name": "p",
				className: "text-sm text-muted-foreground",
				children: "Offers, acceptances, content reviews, deadlines and account updates. Chat messages stay in-app."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			"data-macaly-loc": "src/components/preferences-and-saves.tsx:22:6",
			"data-macaly-name": "Switch",
			checked: enabled,
			onCheckedChange: async (v) => {
				await set({ enabled: v });
				toast.success(v ? "Email notifications on" : "Email notifications off");
			},
			"aria-label": "Email notifications"
		})]
	});
}
/** Brand dashboard section. */
function SavedCreators() {
	const list = useQuery(api.creators.listSavedCreators);
	if (list === void 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/components/preferences-and-saves.tsx:39:4",
		"data-macaly-name": "section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			"data-macaly-loc": "src/components/preferences-and-saves.tsx:40:6",
			"data-macaly-name": "h2",
			className: "text-xl font-bold",
			children: "Saved creators"
		}), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/components/preferences-and-saves.tsx:42:8",
			"data-macaly-name": "div",
			className: "mt-3 rounded-xl border border-dashed p-5 text-center text-sm text-muted-foreground",
			children: ["Tap the bookmark on any creator to shortlist them here.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/components/preferences-and-saves.tsx:44:10",
				"data-macaly-name": "div",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/components/preferences-and-saves.tsx:44:15",
					"data-macaly-name": "Button",
					asChild: true,
					variant: "outline",
					size: "sm",
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/components/preferences-and-saves.tsx:44:76",
						"data-macaly-name": "Link",
						to: "/creators",
						children: "Discover Creators →"
					})
				})
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-macaly-loc": "src/components/preferences-and-saves.tsx:47:8",
			"data-macaly-name": "div",
			className: "mt-3 grid gap-3 md:grid-cols-2",
			children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatorCard, {
				"data-macaly-loc": "src/components/preferences-and-saves.tsx:48:27",
				"data-macaly-name": "CreatorCard",
				c
			}, c.userId))
		})]
	});
}
//#endregion
export { SavedCreators as n, EmailPreference as t };
