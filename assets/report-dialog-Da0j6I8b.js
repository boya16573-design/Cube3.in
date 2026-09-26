import { Ct as __toESM, m as createLucideIcon, n as cn, s as api, t as Button, x as useMutation, xt as require_react, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { n as toast } from "./dist-Dfgjbbc_.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-P9E-Q0K0.js";
import { t as Textarea } from "./textarea-CLFmgltT.js";
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Flag = createLucideIcon("flag", [["path", {
	d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
	key: "1jaruq"
}]]);
//#endregion
//#region src/components/report-dialog.tsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REASONS = [
	"Spam or scam",
	"Asking to pay outside agreed terms",
	"Fake profile or stats",
	"Harassment or abuse",
	"Suspicious links",
	"Other"
];
function ReportDialog({ open, onOpenChange, targetUserId, collaborationId, campaignId, targetRole }) {
	const report = useMutation(api.collabs.report);
	const [reason, setReason] = (0, import_react.useState)("");
	const [details, setDetails] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-macaly-loc": "src/components/report-dialog.tsx:29:4",
		"data-macaly-name": "Dialog",
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-macaly-loc": "src/components/report-dialog.tsx:30:6",
			"data-macaly-name": "DialogContent",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-macaly-loc": "src/components/report-dialog.tsx:31:8",
					"data-macaly-name": "DialogHeader",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-macaly-loc": "src/components/report-dialog.tsx:32:10",
						"data-macaly-name": "DialogTitle",
						children: ["Report this ", targetRole]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-macaly-loc": "src/components/report-dialog.tsx:33:10",
						"data-macaly-name": "DialogDescription",
						children: "Reports go to the Cube3 team for review. The other person isn't told who reported them."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/components/report-dialog.tsx:35:8",
					"data-macaly-name": "div",
					className: "flex flex-wrap gap-2",
					children: REASONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"data-macaly-loc": "src/components/report-dialog.tsx:37:12",
						"data-macaly-name": "button",
						type: "button",
						onClick: () => setReason(r),
						className: cn("rounded-full border px-3 py-1.5 text-sm", reason === r ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"),
						children: r
					}, r))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					"data-macaly-loc": "src/components/report-dialog.tsx:41:8",
					"data-macaly-name": "Textarea",
					placeholder: "Details (optional)",
					value: details,
					onChange: (e) => setDetails(e.target.value),
					rows: 3,
					maxLength: 2e3
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
					"data-macaly-loc": "src/components/report-dialog.tsx:42:8",
					"data-macaly-name": "DialogFooter",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/components/report-dialog.tsx:43:10",
						"data-macaly-name": "Button",
						variant: "destructive",
						disabled: busy || !reason,
						onClick: async () => {
							setBusy(true);
							try {
								const r = await report({
									targetUserId,
									reason,
									details: details || void 0,
									collaborationId,
									campaignId
								});
								if (!r.ok) return void toast.error(r.message);
								toast.success("Report sent. Thank you.");
								onOpenChange(false);
								setReason("");
								setDetails("");
							} finally {
								setBusy(false);
							}
						},
						children: "Send report"
					})
				})
			]
		})
	});
}
//#endregion
export { Flag as n, ReportDialog as t };
