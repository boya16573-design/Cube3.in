import { D as require_jsx_runtime, dt as __toESM, l as useMutation, lt as require_react, n as createLucideIcon, t as api, u as useQuery, v as Link } from "./api-D74LnTM3.js";
import { a as Button, i as RequireProfile, o as cn, r as PageLoading, t as AppShell } from "./app-shell-CtDeXJqm.js";
import { t as BadgeCheck } from "./badge-check-B3dBneY_.js";
import { t as ExternalLink } from "./external-link-jbjCWyxj.js";
import { t as Info } from "./info-Di6Fp7iY.js";
import { t as EmailPreference } from "./preferences-and-saves-CWe1itD0.js";
import { n as toast } from "./dist-CXIX0U2y.js";
import { l as platformLabel, n as CONTENT_TYPES, o as formatCount, r as PLATFORMS, t as CATEGORIES } from "./cube3-DuAq7Ab3.js";
import { t as Primitive } from "./dist-kfylwfzP.js";
import { r as createContextScope } from "./dist-BF5gvTxC.js";
import { t as Label } from "./label-Da9P26Y4.js";
import { t as Input } from "./input-C91OdWl8.js";
import { t as Textarea } from "./textarea-DwJpEbSB.js";
import { t as Chips } from "./chips-DYO15QNe.js";
import { t as LanguagePicker } from "./language-picker-0bZF-D4m.js";
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
var Instagram = createLucideIcon("instagram", [
	["rect", {
		width: "20",
		height: "20",
		x: "2",
		y: "2",
		rx: "5",
		ry: "5",
		key: "2e1cvw"
	}],
	["path", {
		d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",
		key: "9exkf1"
	}],
	["line", {
		x1: "17.5",
		x2: "17.51",
		y1: "6.5",
		y2: "6.5",
		key: "r4j83e"
	}]
]);
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
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Trash2 = createLucideIcon("trash-2", [
	["path", {
		d: "M10 11v6",
		key: "nco0om"
	}],
	["path", {
		d: "M14 11v6",
		key: "outv1u"
	}],
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Youtube = createLucideIcon("youtube", [["path", {
	d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
	key: "1q2vi4"
}], ["path", {
	d: "m10 15 5-3-5-3z",
	key: "1jp15x"
}]]);
//#endregion
//#region node_modules/@radix-ui/react-progress/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext, createProgressScope] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeProgress, value: valueProp = null, max: maxProp, getValueLabel = defaultGetValueLabel, ...progressProps } = props;
	if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
	const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
	if (valueProp !== null && !isValidValueNumber(valueProp, max)) console.error(getInvalidValueError(`${valueProp}`, "Progress"));
	const value = isValidValueNumber(valueProp, max) ? valueProp : null;
	const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressProvider, {
		scope: __scopeProgress,
		value,
		max,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"aria-valuemax": max,
			"aria-valuemin": 0,
			"aria-valuenow": isNumber(value) ? value : void 0,
			"aria-valuetext": valueLabel,
			role: "progressbar",
			"data-state": getProgressState(value, max),
			"data-value": value ?? void 0,
			"data-max": max,
			...progressProps,
			ref: forwardedRef
		})
	});
});
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeProgress, ...indicatorProps } = props;
	const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-state": getProgressState(context.value, context.max),
		"data-value": context.value ?? void 0,
		"data-max": context.max,
		...indicatorProps,
		ref: forwardedRef
	});
});
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
	return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
	return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
	return typeof value === "number";
}
function isValidMaxNumber(max) {
	return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
	return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
	return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
	return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
//#endregion
//#region src/components/verification.tsx
/** Creator: prove channel ownership with a code placed in the channel description/bio. */
function CreatorVerification({ accounts }) {
	const status = useQuery(api.verification.myStatus);
	const request = useMutation(api.verification.requestAccountVerification);
	const [busy, setBusy] = (0, import_react.useState)(null);
	if (accounts.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/components/verification.tsx:24:4",
		"data-macaly-name": "section",
		className: "grid gap-3 rounded-xl border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/components/verification.tsx:25:6",
			"data-macaly-name": "div",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				"data-macaly-loc": "src/components/verification.tsx:26:8",
				"data-macaly-name": "h2",
				className: "flex items-center gap-2 font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
					"data-macaly-loc": "src/components/verification.tsx:26:62",
					"data-macaly-name": "ShieldCheck",
					className: "size-5 text-brand"
				}), "Verify channel ownership"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"data-macaly-loc": "src/components/verification.tsx:27:8",
				"data-macaly-name": "p",
				className: "text-sm text-muted-foreground",
				children: [
					"Add your Cube3 code to the channel description or bio. Our team checks the public page and marks it ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						"data-macaly-loc": "src/components/verification.tsx:28:110",
						"data-macaly-name": "strong",
						children: "Ownership verified"
					}),
					". This confirms the account is yours; stats you enter remain labelled as creator-reported unless our team checks them."
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			"data-macaly-loc": "src/components/verification.tsx:32:6",
			"data-macaly-name": "ul",
			className: "grid gap-2",
			children: accounts.map((a) => {
				const s = status?.accounts.find((x) => x.socialAccountId === a._id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					"data-macaly-loc": "src/components/verification.tsx:36:12",
					"data-macaly-name": "li",
					className: "rounded-lg border p-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/components/verification.tsx:37:14",
							"data-macaly-name": "div",
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-macaly-loc": "src/components/verification.tsx:38:16",
								"data-macaly-name": "span",
								className: "font-medium",
								children: [
									platformLabel(a.platform),
									" · @",
									a.handle
								]
							}), a.verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-macaly-loc": "src/components/verification.tsx:40:18",
								"data-macaly-name": "span",
								className: "inline-flex items-center gap-1 text-xs font-medium text-success",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
									"data-macaly-loc": "src/components/verification.tsx:40:100",
									"data-macaly-name": "BadgeCheck",
									className: "size-3.5"
								}), "Ownership verified"]
							}) : s?.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-macaly-loc": "src/components/verification.tsx:42:18",
								"data-macaly-name": "span",
								className: "inline-flex items-center gap-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
									"data-macaly-loc": "src/components/verification.tsx:42:97",
									"data-macaly-name": "Clock",
									className: "size-3.5"
								}), "In review"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								"data-macaly-loc": "src/components/verification.tsx:44:18",
								"data-macaly-name": "Button",
								size: "sm",
								variant: "outline",
								disabled: busy === a._id,
								onClick: async () => {
									setBusy(a._id);
									try {
										const r = await request({ socialAccountId: a._id });
										if (!r.ok) toast.error(r.message);
										else toast.success("Request sent. Add the code to your channel description.");
									} finally {
										setBusy(null);
									}
								},
								children: s?.status === "rejected" ? "Request again" : "Verify"
							})]
						}),
						!a.verified && s?.code && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-macaly-loc": "src/components/verification.tsx:64:16",
							"data-macaly-name": "p",
							className: "mt-2 rounded bg-muted p-2 text-xs",
							children: [
								"Your code: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									"data-macaly-loc": "src/components/verification.tsx:65:29",
									"data-macaly-name": "code",
									className: "font-mono font-bold",
									children: s.code
								}),
								" — paste it anywhere in your ",
								platformLabel(a.platform),
								" description/bio and keep it there until approved."
							]
						}),
						s?.status === "rejected" && s.note && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-macaly-loc": "src/components/verification.tsx:68:53",
							"data-macaly-name": "p",
							className: "mt-1 text-xs text-destructive",
							children: ["Not approved: ", s.note]
						})
					]
				}, a._id);
			})
		})]
	});
}
/** Brand: request business verification. */
function BrandVerification({ verified }) {
	const status = useQuery(api.verification.myStatus);
	const request = useMutation(api.verification.requestBrandVerification);
	const [registeredName, setRegisteredName] = (0, import_react.useState)("");
	const [website, setWebsite] = (0, import_react.useState)("");
	const [gstin, setGstin] = (0, import_react.useState)("");
	const [contactRole, setContactRole] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (verified) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/components/verification.tsx:90:6",
		"data-macaly-name": "section",
		className: "flex items-center gap-2 rounded-xl border border-success p-4 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
			"data-macaly-loc": "src/components/verification.tsx:91:8",
			"data-macaly-name": "BadgeCheck",
			className: "size-5 text-success"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"data-macaly-loc": "src/components/verification.tsx:91:54",
			"data-macaly-name": "span",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				"data-macaly-loc": "src/components/verification.tsx:91:60",
				"data-macaly-name": "strong",
				children: "Verified brand."
			}), " Creators see a verified badge on your campaigns."]
		})]
	});
	if (status?.brand === "pending") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/components/verification.tsx:97:6",
		"data-macaly-name": "section",
		className: "flex items-center gap-2 rounded-xl border p-4 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
			"data-macaly-loc": "src/components/verification.tsx:98:8",
			"data-macaly-name": "Clock",
			className: "size-5 text-muted-foreground"
		}), "Your verification request is being reviewed."]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		"data-macaly-loc": "src/components/verification.tsx:104:4",
		"data-macaly-name": "form",
		className: "grid gap-3 rounded-xl border p-4",
		onSubmit: async (e) => {
			e.preventDefault();
			setBusy(true);
			try {
				const r = await request({
					registeredName,
					website,
					gstin: gstin || void 0,
					contactRole,
					note: note || void 0
				});
				if (!r.ok) return void toast.error(r.message);
				toast.success("Verification request sent");
			} finally {
				setBusy(false);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/verification.tsx:118:6",
				"data-macaly-name": "div",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						"data-macaly-loc": "src/components/verification.tsx:119:8",
						"data-macaly-name": "h2",
						className: "flex items-center gap-2 font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
							"data-macaly-loc": "src/components/verification.tsx:119:62",
							"data-macaly-name": "ShieldCheck",
							className: "size-5 text-brand"
						}), "Get your brand verified"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/components/verification.tsx:120:8",
						"data-macaly-name": "p",
						className: "text-sm text-muted-foreground",
						children: "Verified brands get more applications — creators trust them."
					}),
					status?.brand === "rejected" && status.brandNote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/components/verification.tsx:121:61",
						"data-macaly-name": "p",
						className: "mt-1 text-xs text-destructive",
						children: ["Previous request not approved: ", status.brandNote]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/verification.tsx:123:6",
				"data-macaly-name": "div",
				className: "grid gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-macaly-loc": "src/components/verification.tsx:123:36",
					"data-macaly-name": "Label",
					htmlFor: "rn",
					children: "Registered business name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-macaly-loc": "src/components/verification.tsx:123:88",
					"data-macaly-name": "Input",
					id: "rn",
					value: registeredName,
					onChange: (e) => setRegisteredName(e.target.value),
					required: true,
					maxLength: 150
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/verification.tsx:124:6",
				"data-macaly-name": "div",
				className: "grid gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					"data-macaly-loc": "src/components/verification.tsx:124:36",
					"data-macaly-name": "Label",
					htmlFor: "ws",
					children: "Official website"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"data-macaly-loc": "src/components/verification.tsx:124:80",
					"data-macaly-name": "Input",
					id: "ws",
					value: website,
					onChange: (e) => setWebsite(e.target.value),
					required: true,
					maxLength: 200,
					placeholder: "https://"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/components/verification.tsx:125:6",
				"data-macaly-name": "div",
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/verification.tsx:126:8",
					"data-macaly-name": "div",
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-macaly-loc": "src/components/verification.tsx:126:38",
						"data-macaly-name": "Label",
						htmlFor: "gst",
						children: "GSTIN (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						"data-macaly-loc": "src/components/verification.tsx:126:83",
						"data-macaly-name": "Input",
						id: "gst",
						value: gstin,
						onChange: (e) => setGstin(e.target.value.toUpperCase()),
						maxLength: 15
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/verification.tsx:127:8",
					"data-macaly-name": "div",
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						"data-macaly-loc": "src/components/verification.tsx:127:38",
						"data-macaly-name": "Label",
						htmlFor: "cr",
						children: "Your role"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						"data-macaly-loc": "src/components/verification.tsx:127:75",
						"data-macaly-name": "Input",
						id: "cr",
						value: contactRole,
						onChange: (e) => setContactRole(e.target.value),
						required: true,
						maxLength: 80,
						placeholder: "Marketing Manager"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				"data-macaly-loc": "src/components/verification.tsx:129:6",
				"data-macaly-name": "Textarea",
				placeholder: "Anything that helps us verify (e.g. sign up with your company email domain)",
				value: note,
				onChange: (e) => setNote(e.target.value),
				rows: 2,
				maxLength: 1e3
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/components/verification.tsx:130:6",
				"data-macaly-name": "Button",
				type: "submit",
				disabled: busy,
				variant: "secondary",
				children: busy ? "Sending…" : "Request verification"
			})
		]
	});
}
//#endregion
//#region src/components/connect-platforms.tsx
var MESSAGES = {
	youtube_ok: {
		ok: true,
		text: "YouTube connected. Your stats now come directly from YouTube."
	},
	instagram_ok: {
		ok: true,
		text: "Instagram connected. Your stats now come directly from Instagram."
	},
	cancelled: {
		ok: false,
		text: "Connection cancelled."
	},
	expired: {
		ok: false,
		text: "That connection link expired. Please try again."
	},
	no_channel: {
		ok: false,
		text: "That Google account has no YouTube channel. Pick the account that owns your channel."
	},
	ig_not_professional: {
		ok: false,
		text: "Instagram only allows Business or Creator accounts to connect. Switch in Instagram settings (it's free), then try again."
	},
	already_linked: {
		ok: false,
		text: "This account is already connected to another Cube3 profile. Report it if that isn't you."
	},
	error: {
		ok: false,
		text: "Couldn't connect right now. Please try again."
	}
};
/** Shows the result after returning from Google/Instagram, then cleans the URL. */
function useConnectResultToast() {
	(0, import_react.useEffect)(() => {
		const url = new URL(window.location.href);
		const status = url.searchParams.get("connect");
		if (!status) return;
		const m = MESSAGES[status] ?? MESSAGES.error;
		if (m.ok) toast.success(m.text);
		else toast.error(m.text);
		url.searchParams.delete("connect");
		window.history.replaceState(null, "", url.toString());
	}, []);
}
function ConnectButtons({ connected }) {
	const avail = useQuery(api.oauth.availability);
	const start = useMutation(api.oauth.start);
	const [busy, setBusy] = (0, import_react.useState)(null);
	async function go(provider) {
		setBusy(provider);
		try {
			const r = await start({ provider });
			if (!r.ok) {
				toast.error(r.message);
				setBusy(null);
				return;
			}
			window.location.assign(r.url);
		} catch (err) {
			console.error("start oauth failed", err);
			toast.error("Couldn't start the connection.");
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/components/connect-platforms.tsx:62:4",
		"data-macaly-name": "div",
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-macaly-loc": "src/components/connect-platforms.tsx:63:6",
			"data-macaly-name": "div",
			className: "flex flex-wrap gap-2",
			children: [{
				id: "youtube",
				label: "YouTube",
				icon: Youtube
			}, {
				id: "instagram",
				label: "Instagram",
				icon: Instagram
			}].map(({ id, label, icon: Icon }) => {
				const ready = avail?.[id];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"data-macaly-loc": "src/components/connect-platforms.tsx:67:12",
					"data-macaly-name": "Button",
					type: "button",
					variant: connected[id] ? "outline" : "default",
					size: "sm",
					disabled: !ready || busy !== null,
					onClick: () => go(id),
					className: connected[id] ? "" : "bg-brand text-brand-foreground hover:bg-brand/90",
					title: ready ? void 0 : "Not set up on this server yet",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							"data-macaly-loc": "src/components/connect-platforms.tsx:77:14",
							"data-macaly-name": "Icon",
							className: "size-4"
						}),
						busy === id ? "Opening…" : connected[id] ? `Reconnect ${label}` : `Connect ${label}`,
						avail && !ready && " · soon"
					]
				}, id);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-macaly-loc": "src/components/connect-platforms.tsx:84:6",
			"data-macaly-name": "p",
			className: "text-[11px] text-muted-foreground",
			children: "Official sign-in with Google/Instagram — Cube3 never sees your password. We read your public stats once (YouTube: read-only access, revoked right after) and don't keep access tokens. Instagram requires a Business or Creator account."
		})]
	});
}
//#endregion
//#region src/components/ui/progress.tsx
function Progress({ className, value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-macaly-loc": "src/components/ui/progress.tsx:14:4",
		"data-macaly-name": "ProgressPrimitive.Root",
		"data-slot": "progress",
		className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			"data-macaly-loc": "src/components/ui/progress.tsx:22:6",
			"data-macaly-name": "ProgressPrimitive.Indicator",
			"data-slot": "progress-indicator",
			className: "h-full w-full flex-1 bg-primary transition-all",
			style: { transform: `translateX(-${100 - (value || 0)}%)` }
		})
	});
}
//#endregion
//#region src/routes/profile.tsx?tsr-split=component
function ProfilePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/profile.tsx:26:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireProfile, {
			"data-macaly-loc": "src/routes/profile.tsx:27:6",
			"data-macaly-name": "RequireProfile",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileEditor, {
				"data-macaly-loc": "src/routes/profile.tsx:28:8",
				"data-macaly-name": "ProfileEditor"
			})
		})
	});
}
function ProfileEditor() {
	const data = useQuery(api.profiles.getMyProfileFull);
	const accounts = useQuery(api.creators.myAccounts);
	const updateBasic = useMutation(api.profiles.updateBasicProfile);
	const updateCreator = useMutation(api.creators.updateCreatorDetails);
	useConnectResultToast();
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [bio, setBio] = (0, import_react.useState)("");
	const [country, setCountry] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [languages, setLanguages] = (0, import_react.useState)([]);
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)([]);
	const [contentTypes, setContentTypes] = (0, import_react.useState)([]);
	const [prefs, setPrefs] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!data || loaded) return;
		setDisplayName(data.profile.displayName);
		setBio(data.profile.bio ?? "");
		setCountry(data.profile.country ?? "");
		setCity(data.profile.city ?? "");
		setLanguages(data.profile.languages);
		setAvatarUrl(data.profile.avatarUrl ?? "");
		if (data.creator) {
			setCategory([data.creator.category]);
			setContentTypes(data.creator.contentTypes);
			setPrefs(data.creator.sponsorshipPreferences ?? "");
		}
		setLoaded(true);
	}, [data, loaded]);
	if (data === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/routes/profile.tsx:69:33",
		"data-macaly-name": "PageLoading"
	});
	if (data === null) return null;
	const isCreator = data.profile.role === "creator";
	const checks = isCreator ? [
		!!data.profile.bio,
		!!data.profile.avatarUrl,
		!!data.profile.country,
		data.profile.languages.length > 0,
		!!data.creator?.category && data.creator.category !== "General",
		(data.creator?.contentTypes.length ?? 0) > 0,
		(accounts?.length ?? 0) > 0,
		(accounts ?? []).some((a) => a.followerCount)
	] : [
		!!data.profile.bio,
		!!data.profile.country,
		!!data.brand?.website,
		!!data.brand?.industry
	];
	const completeness = Math.round(checks.filter(Boolean).length / checks.length * 100);
	async function save(e) {
		e.preventDefault();
		setSaving(true);
		try {
			const r1 = await updateBasic({
				displayName,
				bio,
				country,
				city,
				languages,
				avatarUrl
			});
			if (!r1.ok) return void toast.error(r1.message);
			if (isCreator) {
				const r2 = await updateCreator({
					category: category[0],
					contentTypes,
					sponsorshipPreferences: prefs
				});
				if (!r2.ok) return void toast.error(r2.message);
			}
			toast.success("Profile saved");
		} catch (err) {
			console.error("save profile failed", err);
			toast.error("Couldn't save. Try again.");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/profile.tsx:107:4",
		"data-macaly-name": "div",
		className: "mx-auto grid max-w-2xl gap-6 px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/profile.tsx:108:6",
				"data-macaly-name": "div",
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/profile.tsx:109:8",
					"data-macaly-name": "div",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-macaly-loc": "src/routes/profile.tsx:110:10",
						"data-macaly-name": "h1",
						className: "text-2xl font-bold",
						children: "Your profile"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/routes/profile.tsx:111:10",
						"data-macaly-name": "p",
						className: "text-sm text-muted-foreground",
						children: ["@", data.profile.username]
					})]
				}), isCreator && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/profile.tsx:114:10",
					"data-macaly-name": "div",
					className: "flex flex-wrap justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/profile.tsx:115:12",
						"data-macaly-name": "Button",
						asChild: true,
						size: "sm",
						className: "bg-brand text-brand-foreground hover:bg-brand/90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							"data-macaly-loc": "src/routes/profile.tsx:116:14",
							"data-macaly-name": "Link",
							to: "/kit/$username",
							params: { username: data.profile.username },
							children: "Media kit"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/profile.tsx:118:12",
						"data-macaly-name": "Button",
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							"data-macaly-loc": "src/routes/profile.tsx:119:14",
							"data-macaly-name": "Link",
							to: "/c/$username",
							params: { username: data.profile.username },
							children: ["Public profile ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								"data-macaly-loc": "src/routes/profile.tsx:120:31",
								"data-macaly-name": "ExternalLink",
								className: "size-3.5"
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/profile.tsx:127:6",
				"data-macaly-name": "div",
				className: "rounded-xl border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-macaly-loc": "src/routes/profile.tsx:128:8",
						"data-macaly-name": "p",
						className: "text-sm font-medium",
						children: [
							"Your profile is ",
							completeness,
							"% complete"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						"data-macaly-loc": "src/routes/profile.tsx:129:8",
						"data-macaly-name": "Progress",
						value: completeness,
						className: "mt-2"
					}),
					completeness < 100 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/profile.tsx:131:10",
						"data-macaly-name": "p",
						className: "mt-2 text-xs text-muted-foreground",
						children: isCreator ? "Complete profiles with platform stats get better sponsorship matches." : "Complete brand profiles build trust with creators."
					})
				]
			}),
			isCreator && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformsSection, {
				"data-macaly-loc": "src/routes/profile.tsx:137:20",
				"data-macaly-name": "PlatformsSection",
				accounts: accounts ?? []
			}),
			isCreator && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatorVerification, {
				"data-macaly-loc": "src/routes/profile.tsx:138:20",
				"data-macaly-name": "CreatorVerification",
				accounts: accounts ?? []
			}),
			!isCreator && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandVerification, {
				"data-macaly-loc": "src/routes/profile.tsx:139:21",
				"data-macaly-name": "BrandVerification",
				verified: !!data.brand?.verified
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailPreference, {
				"data-macaly-loc": "src/routes/profile.tsx:140:6",
				"data-macaly-name": "EmailPreference"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-macaly-loc": "src/routes/profile.tsx:142:6",
				"data-macaly-name": "form",
				onSubmit: save,
				className: "grid gap-5 rounded-xl border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						"data-macaly-loc": "src/routes/profile.tsx:143:8",
						"data-macaly-name": "h2",
						className: "font-semibold",
						children: "Details"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/profile.tsx:144:8",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/profile.tsx:145:10",
							"data-macaly-name": "Label",
							htmlFor: "dn",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/profile.tsx:146:10",
							"data-macaly-name": "Input",
							id: "dn",
							value: displayName,
							onChange: (e) => setDisplayName(e.target.value),
							maxLength: 80
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/profile.tsx:148:8",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/profile.tsx:149:10",
							"data-macaly-name": "Label",
							htmlFor: "av",
							children: "Profile photo URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/profile.tsx:150:10",
							"data-macaly-name": "Input",
							id: "av",
							value: avatarUrl,
							onChange: (e) => setAvatarUrl(e.target.value),
							placeholder: "https://…",
							maxLength: 500
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/profile.tsx:152:8",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/profile.tsx:153:10",
							"data-macaly-name": "Label",
							htmlFor: "bio",
							children: "Bio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							"data-macaly-loc": "src/routes/profile.tsx:154:10",
							"data-macaly-name": "Textarea",
							id: "bio",
							value: bio,
							onChange: (e) => setBio(e.target.value),
							rows: 3,
							maxLength: 600
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/profile.tsx:156:8",
						"data-macaly-name": "div",
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/profile.tsx:157:10",
							"data-macaly-name": "div",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/profile.tsx:158:12",
								"data-macaly-name": "Label",
								htmlFor: "co",
								children: "Country"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/routes/profile.tsx:159:12",
								"data-macaly-name": "Input",
								id: "co",
								value: country,
								onChange: (e) => setCountry(e.target.value),
								maxLength: 60
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/profile.tsx:161:10",
							"data-macaly-name": "div",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/profile.tsx:162:12",
								"data-macaly-name": "Label",
								htmlFor: "ci",
								children: "City / region"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/routes/profile.tsx:163:12",
								"data-macaly-name": "Input",
								id: "ci",
								value: city,
								onChange: (e) => setCity(e.target.value),
								maxLength: 60
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/profile.tsx:166:8",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/profile.tsx:167:10",
							"data-macaly-name": "Label",
							children: "Languages"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguagePicker, {
							"data-macaly-loc": "src/routes/profile.tsx:168:10",
							"data-macaly-name": "LanguagePicker",
							value: languages,
							onChange: setLanguages
						})]
					}),
					isCreator && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/profile.tsx:172:12",
							"data-macaly-name": "div",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/profile.tsx:173:14",
								"data-macaly-name": "Label",
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
								"data-macaly-loc": "src/routes/profile.tsx:174:14",
								"data-macaly-name": "Chips",
								options: CATEGORIES,
								value: category,
								onChange: setCategory,
								single: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/profile.tsx:176:12",
							"data-macaly-name": "div",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/profile.tsx:177:14",
								"data-macaly-name": "Label",
								children: "Content types"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
								"data-macaly-loc": "src/routes/profile.tsx:178:14",
								"data-macaly-name": "Chips",
								options: CONTENT_TYPES,
								value: contentTypes,
								onChange: setContentTypes
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/profile.tsx:180:12",
							"data-macaly-name": "div",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/profile.tsx:181:14",
								"data-macaly-name": "Label",
								htmlFor: "prefs",
								children: "Sponsorship preferences"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								"data-macaly-loc": "src/routes/profile.tsx:182:14",
								"data-macaly-name": "Textarea",
								id: "prefs",
								value: prefs,
								onChange: (e) => setPrefs(e.target.value),
								rows: 2,
								maxLength: 1e3,
								placeholder: "e.g. Tech gadgets and apps only. No gambling or crypto."
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/profile.tsx:186:8",
						"data-macaly-name": "Button",
						type: "submit",
						disabled: saving,
						className: "bg-brand text-brand-foreground hover:bg-brand/90",
						children: saving ? "Saving…" : "Save profile"
					})
				]
			})
		]
	});
}
function PlatformsSection({ accounts }) {
	const upsert = useMutation(api.creators.upsertSocialAccount);
	const remove = useMutation(api.creators.removeSocialAccount);
	const [platform, setPlatform] = (0, import_react.useState)("youtube");
	const [handle, setHandle] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const [followers, setFollowers] = (0, import_react.useState)("");
	const [views, setViews] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function add(e) {
		e.preventDefault();
		setBusy(true);
		try {
			const res = await upsert({
				platform,
				handle,
				url: url || void 0,
				followerCount: followers ? Number(followers) : void 0,
				avgViews: views ? Number(views) : void 0
			});
			if (!res.ok) return void toast.error(res.message);
			toast.success(`${platformLabel(platform)} saved`);
			setHandle("");
			setUrl("");
			setFollowers("");
			setViews("");
		} catch (err) {
			console.error("save account failed", err);
			toast.error("Couldn't save account.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-macaly-loc": "src/routes/profile.tsx:240:4",
		"data-macaly-name": "section",
		className: "grid gap-4 rounded-xl border p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/profile.tsx:241:6",
				"data-macaly-name": "div",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					"data-macaly-loc": "src/routes/profile.tsx:242:8",
					"data-macaly-name": "h2",
					className: "font-semibold",
					children: "Platforms"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/profile.tsx:243:8",
					"data-macaly-name": "p",
					className: "text-sm text-muted-foreground",
					children: "Add your channels so Cube3 can match you with sponsorships."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/profile.tsx:246:6",
				"data-macaly-name": "div",
				className: "flex gap-2 rounded-lg bg-muted p-3 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					"data-macaly-loc": "src/routes/profile.tsx:247:8",
					"data-macaly-name": "Info",
					className: "mt-0.5 size-4 shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-macaly-loc": "src/routes/profile.tsx:248:8",
					"data-macaly-name": "p",
					children: [
						"Connect officially for verified stats. Anything you type in yourself is shown to brands as ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							"data-macaly-loc": "src/routes/profile.tsx:249:101",
							"data-macaly-name": "strong",
							children: "creator-reported"
						}),
						". We never ask for your social passwords."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectButtons, {
				"data-macaly-loc": "src/routes/profile.tsx:254:6",
				"data-macaly-name": "ConnectButtons",
				connected: {
					youtube: accounts.some((a) => a.platform === "youtube" && a.connectedVia),
					instagram: accounts.some((a) => a.platform === "instagram" && a.connectedVia)
				}
			}),
			accounts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				"data-macaly-loc": "src/routes/profile.tsx:257:8",
				"data-macaly-name": "ul",
				className: "grid gap-2",
				children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					"data-macaly-loc": "src/routes/profile.tsx:259:12",
					"data-macaly-name": "li",
					className: "flex items-center justify-between gap-3 rounded-lg border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/profile.tsx:260:14",
						"data-macaly-name": "div",
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-macaly-loc": "src/routes/profile.tsx:261:16",
							"data-macaly-name": "p",
							className: "flex items-center gap-1.5 text-sm font-medium",
							children: [
								platformLabel(a.platform),
								" · @",
								a.handle,
								a.connectedVia ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-macaly-loc": "src/routes/profile.tsx:264:20",
									"data-macaly-name": "span",
									className: "inline-flex items-center gap-0.5 text-xs text-success",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
										"data-macaly-loc": "src/routes/profile.tsx:264:92",
										"data-macaly-name": "BadgeCheck",
										className: "size-3.5"
									}), "Connected · verified stats"]
								}) : a.verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									"data-macaly-loc": "src/routes/profile.tsx:266:20",
									"data-macaly-name": "span",
									className: "inline-flex items-center gap-0.5 text-xs text-success",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
										"data-macaly-loc": "src/routes/profile.tsx:266:92",
										"data-macaly-name": "BadgeCheck",
										className: "size-3.5"
									}), "Ownership verified"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-macaly-loc": "src/routes/profile.tsx:268:20",
									"data-macaly-name": "span",
									className: "rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground",
									children: "Creator-reported"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"data-macaly-loc": "src/routes/profile.tsx:271:16",
							"data-macaly-name": "p",
							className: "text-xs text-muted-foreground",
							children: [
								formatCount(a.followerCount),
								" followers · ",
								a.avgViews !== void 0 ? `${formatCount(a.avgViews)} avg views` : "avg views n/a",
								a.engagementRate !== void 0 && ` · ${a.engagementRate}% engagement`,
								a.statsSyncedAt && ` · synced ${new Date(a.statsSyncedAt).toLocaleDateString("en-IN")}`
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/profile.tsx:277:14",
						"data-macaly-name": "Button",
						variant: "ghost",
						size: "icon",
						"aria-label": `Remove ${platformLabel(a.platform)}`,
						onClick: async () => {
							const r = await remove({ accountId: a._id });
							if (!r.ok) toast.error(r.message);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
							"data-macaly-loc": "src/routes/profile.tsx:286:16",
							"data-macaly-name": "Trash2",
							className: "size-4"
						})
					})]
				}, a._id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				"data-macaly-loc": "src/routes/profile.tsx:293:6",
				"data-macaly-name": "form",
				onSubmit: add,
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-macaly-loc": "src/routes/profile.tsx:294:8",
						"data-macaly-name": "div",
						className: "flex flex-wrap gap-2",
						children: PLATFORMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"data-macaly-loc": "src/routes/profile.tsx:296:12",
							"data-macaly-name": "button",
							type: "button",
							onClick: () => setPlatform(p.id),
							className: cn("rounded-full border px-3 py-1.5 text-sm", platform === p.id ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"),
							children: p.label
						}, p.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/profile.tsx:306:8",
						"data-macaly-name": "div",
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/routes/profile.tsx:307:10",
								"data-macaly-name": "Input",
								placeholder: "Handle / channel name",
								value: handle,
								onChange: (e) => setHandle(e.target.value),
								required: true,
								maxLength: 100
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/routes/profile.tsx:308:10",
								"data-macaly-name": "Input",
								placeholder: "Link (optional)",
								value: url,
								onChange: (e) => setUrl(e.target.value),
								maxLength: 300
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/routes/profile.tsx:309:10",
								"data-macaly-name": "Input",
								placeholder: platform === "youtube" ? "Subscribers" : "Followers",
								inputMode: "numeric",
								value: followers,
								onChange: (e) => setFollowers(e.target.value.replace(/\D/g, ""))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/routes/profile.tsx:310:10",
								"data-macaly-name": "Input",
								placeholder: "Average views",
								inputMode: "numeric",
								value: views,
								onChange: (e) => setViews(e.target.value.replace(/\D/g, ""))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/profile.tsx:312:8",
						"data-macaly-name": "Button",
						type: "submit",
						variant: "secondary",
						disabled: busy,
						children: busy ? "Saving…" : `Save ${platformLabel(platform)} account`
					})
				]
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
