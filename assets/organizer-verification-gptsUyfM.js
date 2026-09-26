import { Ct as __toESM, S as useQuery, m as createLucideIcon, n as cn, s as api, t as Button, x as useMutation, xt as require_react, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { t as BadgeCheck } from "./badge-check-B7Ly22Tv.js";
import { n as toast } from "./dist-Dfgjbbc_.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-P9E-Q0K0.js";
import { t as Label } from "./label-DdaoZkXu.js";
import { t as Input } from "./input-BQJAkDLz.js";
import { t as Textarea } from "./textarea-CLFmgltT.js";
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Clock = createLucideIcon("clock", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M12 6v6l4 2",
	key: "mmk7yg"
}]]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShieldCheck = createLucideIcon("shield-check", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
//#endregion
//#region src/components/organizer-verification.tsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var METHODS = [
	{
		id: "college_email",
		label: "Official college email",
		hint: "Your @college.edu address — we'll email it to confirm."
	},
	{
		id: "college_website",
		label: "College website listing",
		hint: "Link to your club/event on the official college site."
	},
	{
		id: "faculty",
		label: "Faculty confirmation",
		hint: "Faculty coordinator's name, department and official email."
	},
	{
		id: "official_page",
		label: "Official event page",
		hint: "Official website or verified social page for the event."
	},
	{
		id: "documents",
		label: "Organization documents",
		hint: "Link to a permission letter or registration document."
	},
	{
		id: "other",
		label: "Other",
		hint: "Anything else we can independently check."
	}
];
function RequestDialog({ open, onOpenChange, target, eventId }) {
	const request = useMutation(api.organizerVerification.request);
	const [method, setMethod] = (0, import_react.useState)("college_email");
	const [evidence, setEvidence] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const m = METHODS.find((x) => x.id === method);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-macaly-loc": "src/components/organizer-verification.tsx:32:4",
		"data-macaly-name": "Dialog",
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-macaly-loc": "src/components/organizer-verification.tsx:33:6",
			"data-macaly-name": "DialogContent",
			className: "max-h-[90dvh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-macaly-loc": "src/components/organizer-verification.tsx:34:8",
					"data-macaly-name": "DialogHeader",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						"data-macaly-loc": "src/components/organizer-verification.tsx:35:10",
						"data-macaly-name": "DialogTitle",
						children: target === "organizer" ? "Get College Verified" : "Get this event verified"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						"data-macaly-loc": "src/components/organizer-verification.tsx:36:10",
						"data-macaly-name": "DialogDescription",
						children: "A Cube3 admin checks your evidence by hand. The badge appears only after that check — never automatically."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/organizer-verification.tsx:40:8",
					"data-macaly-name": "div",
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-macaly-loc": "src/components/organizer-verification.tsx:41:10",
							"data-macaly-name": "div",
							className: "flex flex-wrap gap-1.5",
							children: METHODS.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"data-macaly-loc": "src/components/organizer-verification.tsx:43:14",
								"data-macaly-name": "button",
								type: "button",
								onClick: () => setMethod(x.id),
								className: cn("rounded-full border px-3 py-1 text-sm", method === x.id ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"),
								children: x.label
							}, x.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-macaly-loc": "src/components/organizer-verification.tsx:46:10",
							"data-macaly-name": "p",
							className: "text-xs text-muted-foreground",
							children: m.hint
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/components/organizer-verification.tsx:47:10",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/components/organizer-verification.tsx:47:40",
								"data-macaly-name": "Label",
								htmlFor: "ev",
								children: "Details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								"data-macaly-loc": "src/components/organizer-verification.tsx:47:75",
								"data-macaly-name": "Textarea",
								id: "ev",
								rows: 3,
								value: evidence,
								onChange: (e) => setEvidence(e.target.value),
								maxLength: 1e3
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/components/organizer-verification.tsx:48:10",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/components/organizer-verification.tsx:48:40",
								"data-macaly-name": "Label",
								htmlFor: "eu",
								children: "Link (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/components/organizer-verification.tsx:48:83",
								"data-macaly-name": "Input",
								id: "eu",
								value: url,
								onChange: (e) => setUrl(e.target.value),
								placeholder: "https://…",
								maxLength: 300
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
					"data-macaly-loc": "src/components/organizer-verification.tsx:50:8",
					"data-macaly-name": "DialogFooter",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/components/organizer-verification.tsx:51:10",
						"data-macaly-name": "Button",
						disabled: busy || evidence.trim().length < 5,
						className: "bg-brand text-brand-foreground hover:bg-brand/90",
						onClick: async () => {
							setBusy(true);
							try {
								const r = await request({
									target,
									eventId,
									method,
									evidence,
									evidenceUrl: url || void 0
								});
								if (!r.ok) return void toast.error(r.message);
								toast.success("Sent for review");
								onOpenChange(false);
							} finally {
								setBusy(false);
							}
						},
						children: busy ? "Sending…" : "Send for review"
					})
				})
			]
		})
	});
}
function EventVerifyButton({ eventId }) {
	const s = useQuery(api.organizerVerification.status);
	const [open, setOpen] = (0, import_react.useState)(false);
	const mine = s?.events.find((x) => x.eventId === eventId);
	if (mine?.status === "pending") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-macaly-loc": "src/components/organizer-verification.tsx:72:41",
		"data-macaly-name": "span",
		className: "inline-flex items-center gap-1 text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
			"data-macaly-loc": "src/components/organizer-verification.tsx:72:120",
			"data-macaly-name": "Clock",
			className: "size-4"
		}), "Event verification in review"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			"data-macaly-loc": "src/components/organizer-verification.tsx:75:6",
			"data-macaly-name": "Button",
			variant: "outline",
			onClick: () => setOpen(true),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
				"data-macaly-loc": "src/components/organizer-verification.tsx:75:62",
				"data-macaly-name": "ShieldCheck",
				className: "size-4"
			}), mine?.status === "rejected" ? "Request event verification again" : "Verify this event"]
		}),
		mine?.status === "rejected" && mine.note && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"data-macaly-loc": "src/components/organizer-verification.tsx:76:51",
			"data-macaly-name": "span",
			className: "text-xs text-destructive",
			children: ["Not approved: ", mine.note]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestDialog, {
			"data-macaly-loc": "src/components/organizer-verification.tsx:77:6",
			"data-macaly-name": "RequestDialog",
			open,
			onOpenChange: setOpen,
			target: "event",
			eventId
		})
	] });
}
function OrganizerVerification({ collegeVerified }) {
	const s = useQuery(api.organizerVerification.status);
	const [open, setOpen] = (0, import_react.useState)(false);
	if (collegeVerified) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/components/organizer-verification.tsx:86:11",
		"data-macaly-name": "section",
		className: "flex items-center gap-2 rounded-xl border border-success p-4 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
			"data-macaly-loc": "src/components/organizer-verification.tsx:86:101",
			"data-macaly-name": "BadgeCheck",
			className: "size-5 text-success"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"data-macaly-loc": "src/components/organizer-verification.tsx:86:147",
			"data-macaly-name": "span",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				"data-macaly-loc": "src/components/organizer-verification.tsx:86:153",
				"data-macaly-name": "strong",
				children: "College verified."
			}), " Brands see this badge on your events."]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/components/organizer-verification.tsx:89:4",
		"data-macaly-name": "section",
		className: "grid gap-2 rounded-xl border p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				"data-macaly-loc": "src/components/organizer-verification.tsx:90:6",
				"data-macaly-name": "h2",
				className: "flex items-center gap-2 font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
					"data-macaly-loc": "src/components/organizer-verification.tsx:90:60",
					"data-macaly-name": "ShieldCheck",
					className: "size-5 text-brand"
				}), "College verification"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/components/organizer-verification.tsx:91:6",
				"data-macaly-name": "p",
				className: "text-sm text-muted-foreground",
				children: "Verified organizers get more sponsor replies. Use an official college email, website listing, faculty confirmation or official documents."
			}),
			s?.college === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/components/organizer-verification.tsx:93:8",
				"data-macaly-name": "p",
				className: "inline-flex items-center gap-1 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
					"data-macaly-loc": "src/components/organizer-verification.tsx:93:84",
					"data-macaly-name": "Clock",
					className: "size-4"
				}), "In review"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/components/organizer-verification.tsx:95:8",
				"data-macaly-name": "Button",
				variant: "secondary",
				className: "justify-self-start",
				onClick: () => setOpen(true),
				children: s?.college === "rejected" ? "Request again" : "Request College Verified"
			}),
			s?.college === "rejected" && s.collegeNote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/components/organizer-verification.tsx:97:53",
				"data-macaly-name": "p",
				className: "text-xs text-destructive",
				children: ["Not approved: ", s.collegeNote]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestDialog, {
				"data-macaly-loc": "src/components/organizer-verification.tsx:98:6",
				"data-macaly-name": "RequestDialog",
				open,
				onOpenChange: setOpen,
				target: "organizer"
			})
		]
	});
}
//#endregion
export { Clock as i, OrganizerVerification as n, ShieldCheck as r, EventVerifyButton as t };
