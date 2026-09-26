import { n as cn, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { t as Check } from "./check-DfHdiYc8.js";
//#region src/components/collab-status.tsx
var import_jsx_runtime = require_jsx_runtime();
var COLLAB_STEPS = [
	{
		key: "discussion",
		label: "Discussion"
	},
	{
		key: "offer",
		label: "Offer"
	},
	{
		key: "accepted",
		label: "Accepted"
	},
	{
		key: "in_progress",
		label: "In progress"
	},
	{
		key: "content_submitted",
		label: "Content submitted"
	},
	{
		key: "approved",
		label: "Approved"
	},
	{
		key: "completed",
		label: "Completed"
	}
];
function statusLabel(s) {
	if (s === "cancelled") return "Cancelled";
	return COLLAB_STEPS.find((x) => x.key === s)?.label ?? s;
}
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-macaly-loc": "src/components/collab-status.tsx:31:9",
		"data-macaly-name": "span",
		className: cn("rounded-full px-2 py-0.5 text-xs font-medium", status === "completed" || status === "approved" ? "bg-success text-success-foreground" : status === "cancelled" ? "bg-muted text-muted-foreground line-through" : status === "offer" || status === "content_submitted" ? "bg-warning text-warning-foreground" : "bg-brand-soft text-brand"),
		children: statusLabel(status)
	});
}
/** Horizontal, scrollable lifecycle stepper. */
function StatusStepper({ status }) {
	if (status === "cancelled") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-macaly-loc": "src/components/collab-status.tsx:37:11",
		"data-macaly-name": "p",
		className: "rounded-lg bg-muted p-3 text-sm text-muted-foreground",
		children: "This conversation was ended."
	});
	const idx = COLLAB_STEPS.findIndex((s) => s.key === status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		"data-macaly-loc": "src/components/collab-status.tsx:41:4",
		"data-macaly-name": "ol",
		className: "-mx-4 flex gap-1 overflow-x-auto px-4 pb-1",
		"aria-label": "Campaign status",
		children: COLLAB_STEPS.map((s, i) => {
			const done = i < idx || status === "completed";
			const current = i === idx && status !== "completed";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				"data-macaly-loc": "src/components/collab-status.tsx:46:10",
				"data-macaly-name": "li",
				className: "flex shrink-0 items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-macaly-loc": "src/components/collab-status.tsx:47:12",
					"data-macaly-name": "span",
					className: cn("flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium", done && "border-success bg-success text-success-foreground", current && "border-brand bg-brand text-brand-foreground", !done && !current && "text-muted-foreground"),
					"aria-current": current ? "step" : void 0,
					children: [done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						"data-macaly-loc": "src/components/collab-status.tsx:56:23",
						"data-macaly-name": "Check",
						className: "size-3"
					}), s.label]
				}), i < COLLAB_STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-macaly-loc": "src/components/collab-status.tsx:59:44",
					"data-macaly-name": "span",
					className: "h-px w-3 bg-border"
				})]
			}, s.key);
		})
	});
}
//#endregion
export { StatusStepper as n, StatusPill as t };
