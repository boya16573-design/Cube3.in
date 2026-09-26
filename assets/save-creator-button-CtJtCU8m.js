import { ht as __toESM, j as require_jsx_runtime, m as useQuery, o as createLucideIcon, p as useMutation, pt as require_react, t as api } from "./api-DJqU9p-G.js";
import { t as useNavigate } from "./useNavigate-_yYfcLdj.js";
import { a as Button, o as cn } from "./app-shell-BzN9KHqO.js";
import { n as toast } from "./dist-B6VFZ26f.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-3eGq8AQc.js";
import { t as Textarea } from "./textarea-Du1JR257.js";
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var BookmarkCheck = createLucideIcon("bookmark-check", [["path", {
	d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
	key: "oz39mx"
}], ["path", {
	d: "m9 10 2 2 4-4",
	key: "1gnqz4"
}]]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Bookmark = createLucideIcon("bookmark", [["path", {
	d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
	key: "oz39mx"
}]]);
//#endregion
//#region src/components/invite-button.tsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Brand-only: invite a creator to one of the brand's active campaigns. */
function InviteButton({ creatorUserId, creatorName, className, defaultCampaignId }) {
	const me = useQuery(api.authz.whoAmI);
	const isBrand = me?.signedIn && me.profile?.role === "brand";
	const campaigns = useQuery(api.collabs.myInvitableCampaigns, isBrand ? {} : "skip");
	const invite = useMutation(api.collabs.invite);
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [campaignId, setCampaignId] = (0, import_react.useState)(defaultCampaignId);
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!isBrand) return null;
	async function send() {
		if (!campaignId) return void toast.error("Pick a campaign.");
		setBusy(true);
		try {
			const r = await invite({
				campaignId,
				creatorUserId,
				message
			});
			if (!r.ok) return void toast.error(r.message);
			toast.success(`Invited ${creatorName}`);
			setOpen(false);
			navigate({
				to: "/collab/$collaborationId",
				params: { collaborationId: r.collaborationId }
			});
		} catch (err) {
			console.error("invite failed", err);
			toast.error("Couldn't send invite.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		"data-macaly-loc": "src/components/invite-button.tsx:56:6",
		"data-macaly-name": "Button",
		variant: "secondary",
		className,
		onClick: () => setOpen(true),
		children: "Invite to campaign"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-macaly-loc": "src/components/invite-button.tsx:57:6",
		"data-macaly-name": "Dialog",
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-macaly-loc": "src/components/invite-button.tsx:58:8",
			"data-macaly-name": "DialogContent",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-macaly-loc": "src/components/invite-button.tsx:59:10",
					"data-macaly-name": "DialogHeader",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-macaly-loc": "src/components/invite-button.tsx:60:12",
						"data-macaly-name": "DialogTitle",
						children: ["Invite ", creatorName]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-macaly-loc": "src/components/invite-button.tsx:61:12",
						"data-macaly-name": "DialogDescription",
						children: "They'll get a notification and a conversation linked to the campaign."
					})]
				}),
				campaigns === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/components/invite-button.tsx:64:12",
					"data-macaly-name": "p",
					className: "text-sm text-muted-foreground",
					children: "Loading campaigns…"
				}) : campaigns.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/components/invite-button.tsx:66:12",
					"data-macaly-name": "p",
					className: "text-sm text-muted-foreground",
					children: "You have no active campaigns. Create one first."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/components/invite-button.tsx:68:12",
					"data-macaly-name": "div",
					className: "grid gap-2",
					children: campaigns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"data-macaly-loc": "src/components/invite-button.tsx:70:16",
						"data-macaly-name": "button",
						type: "button",
						onClick: () => setCampaignId(c._id),
						className: cn("rounded-lg border p-3 text-left text-sm", campaignId === c._id ? "border-brand bg-brand-soft font-medium" : "hover:bg-muted"),
						children: c.title
					}, c._id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					"data-macaly-loc": "src/components/invite-button.tsx:77:10",
					"data-macaly-name": "Textarea",
					rows: 3,
					maxLength: 2e3,
					value: message,
					onChange: (e) => setMessage(e.target.value),
					placeholder: `Hi ${creatorName}, we think your audience is a great fit for…`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
					"data-macaly-loc": "src/components/invite-button.tsx:79:10",
					"data-macaly-name": "DialogFooter",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/components/invite-button.tsx:80:12",
						"data-macaly-name": "Button",
						disabled: busy || !campaigns?.length || message.trim().length < 10,
						onClick: send,
						className: "bg-brand text-brand-foreground hover:bg-brand/90",
						children: busy ? "Sending…" : "Send invite"
					})
				})
			]
		})
	})] });
}
//#endregion
//#region src/components/save-creator-button.tsx
/** Brand-only save/unsave toggle for a creator. Renders nothing for other users. */
function SaveCreatorButton({ creatorUserId, className }) {
	const me = useQuery(api.authz.whoAmI);
	const isBrand = me?.signedIn && me.profile?.role === "brand";
	const ids = useQuery(api.creators.savedCreatorIds, isBrand ? {} : "skip");
	const toggle = useMutation(api.creators.toggleSaveCreator);
	if (!isBrand) return null;
	const saved = !!ids?.includes(creatorUserId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		"data-macaly-loc": "src/components/save-creator-button.tsx:18:4",
		"data-macaly-name": "Button",
		type: "button",
		variant: "ghost",
		size: "icon",
		className,
		"aria-label": saved ? "Remove from saved creators" : "Save creator",
		"aria-pressed": saved,
		onClick: async () => {
			const r = await toggle({ creatorUserId });
			if (!r.ok) toast.error(r.message);
		},
		children: saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, {
			"data-macaly-loc": "src/components/save-creator-button.tsx:30:15",
			"data-macaly-name": "BookmarkCheck",
			className: "size-5 text-brand"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {
			"data-macaly-loc": "src/components/save-creator-button.tsx:30:65",
			"data-macaly-name": "Bookmark",
			className: "size-5"
		})
	});
}
//#endregion
export { BookmarkCheck as i, InviteButton as n, Bookmark as r, SaveCreatorButton as t };
