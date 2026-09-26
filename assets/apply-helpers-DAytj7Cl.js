import { D as require_jsx_runtime, dt as __toESM, l as useMutation, lt as require_react, n as createLucideIcon, s as useAction, t as api, u as useQuery } from "./api-D74LnTM3.js";
import { a as Button, o as cn } from "./app-shell-CtDeXJqm.js";
import { t as Info } from "./info-Di6Fp7iY.js";
import { t as Sparkles } from "./sparkles-CVCqxAfJ.js";
import { n as toast } from "./dist-CXIX0U2y.js";
import { c as formatInr } from "./cube3-DuAq7Ab3.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-Bw6NbjqL.js";
import { t as Textarea } from "./textarea-DwJpEbSB.js";
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
//#region src/components/apply-helpers.tsx
/** Suggested sponsorship range with every factor explained. Guidance only. */
function PriceGuidanceCard({ campaignId, onUse }) {
	const g = useQuery(api.pricing.forCampaign, { campaignId });
	const [open, setOpen] = (0, import_react.useState)(false);
	if (!g) return null;
	if (!g.available) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		"data-macaly-loc": "src/components/apply-helpers.tsx:17:11",
		"data-macaly-name": "p",
		className: "flex gap-1.5 rounded-lg bg-muted p-2.5 text-xs text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
			"data-macaly-loc": "src/components/apply-helpers.tsx:17:95",
			"data-macaly-name": "Info",
			className: "mt-0.5 size-3.5 shrink-0"
		}), g.reasonUnavailable]
	});
	const mid = Math.round(((g.minInr ?? 0) + (g.maxInr ?? 0)) / 2 / 500) * 500;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/components/apply-helpers.tsx:21:4",
		"data-macaly-name": "div",
		className: "rounded-lg border border-brand/40 bg-brand-soft p-3 text-sm",
		"data-testid": "price-guidance",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/components/apply-helpers.tsx:22:6",
				"data-macaly-name": "p",
				className: "text-xs font-semibold uppercase tracking-wide text-brand",
				children: "Suggested sponsorship range"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/components/apply-helpers.tsx:23:6",
				"data-macaly-name": "p",
				className: "mt-0.5 text-lg font-bold",
				children: [
					formatInr(g.minInr),
					"–",
					formatInr(g.maxInr)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/components/apply-helpers.tsx:24:6",
				"data-macaly-name": "p",
				className: "text-xs text-muted-foreground",
				children: "Guidance, not a guaranteed market price. You choose your own fee."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/apply-helpers.tsx:25:6",
				"data-macaly-name": "div",
				className: "mt-2 flex flex-wrap gap-2",
				children: [onUse && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-macaly-loc": "src/components/apply-helpers.tsx:26:18",
					"data-macaly-name": "Button",
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: () => onUse(mid),
					children: ["Use ", formatInr(mid)]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/components/apply-helpers.tsx:27:8",
					"data-macaly-name": "Button",
					type: "button",
					size: "sm",
					variant: "ghost",
					onClick: () => setOpen((o) => !o),
					children: open ? "Hide" : "How is this calculated?"
				})]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-macaly-loc": "src/components/apply-helpers.tsx:30:8",
				"data-macaly-name": "ul",
				className: "mt-2 grid gap-1 text-xs",
				children: g.factors.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					"data-macaly-loc": "src/components/apply-helpers.tsx:31:35",
					"data-macaly-name": "li",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
							"data-macaly-loc": "src/components/apply-helpers.tsx:31:47",
							"data-macaly-name": "strong",
							children: [f.label, ":"]
						}),
						" ",
						f.detail
					]
				}, i))
			})
		]
	});
}
/** AI-drafted pitch from the creator's real profile facts. Always editable before sending. */
function PitchHelper({ campaignId, onDraft }) {
	const draft = useAction(api.ai.draftPitch);
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/components/apply-helpers.tsx:43:4",
		"data-macaly-name": "div",
		className: "flex flex-wrap items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			"data-macaly-loc": "src/components/apply-helpers.tsx:44:6",
			"data-macaly-name": "Button",
			type: "button",
			size: "sm",
			variant: "outline",
			disabled: busy,
			onClick: async () => {
				setBusy(true);
				try {
					const r = await draft({ campaignId });
					if (!r.ok) return void toast.error(r.message);
					onDraft(r.intro, r.contentIdea);
					toast.success("Draft added — review and edit before sending.");
				} catch (err) {
					console.error("pitch helper failed", err);
					toast.error("Pitch helper unavailable.");
				} finally {
					setBusy(false);
				}
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
				"data-macaly-loc": "src/components/apply-helpers.tsx:64:8",
				"data-macaly-name": "Sparkles",
				className: "size-4 text-brand"
			}), busy ? "Drafting…" : "Draft my pitch with AI"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-macaly-loc": "src/components/apply-helpers.tsx:66:6",
			"data-macaly-name": "span",
			className: "text-[11px] text-muted-foreground",
			children: "Uses only your profile facts. Check it before sending."
		})]
	});
}
//#endregion
export { Flag as i, PriceGuidanceCard as n, ReportDialog as r, PitchHelper as t };
