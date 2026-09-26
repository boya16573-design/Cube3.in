import { Ct as __toESM, S as useQuery, s as api, t as Button, xt as require_react, y as useAction, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { t as Info } from "./info-D99mXMow.js";
import { t as Sparkles } from "./sparkles-CLlQowi6.js";
import { n as toast } from "./dist-Dfgjbbc_.js";
import { c as formatInr } from "./cube3-xqG2XCU7.js";
//#region src/components/apply-helpers.tsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	const mid = Math.round(((g.minInr ?? 0) + (g.maxInr ?? 0)) / 2);
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
					formatInr(g.minInr, g.currency),
					"–",
					formatInr(g.maxInr, g.currency)
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
					children: ["Use ", formatInr(mid, g.currency)]
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
export { PriceGuidanceCard as n, PitchHelper as t };
