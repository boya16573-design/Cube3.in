import { D as require_jsx_runtime, dt as __toESM, i as useAuthActions, lt as require_react, t as api, u as useQuery } from "./api-D74LnTM3.js";
import { t as useNavigate } from "./useNavigate-BFWl-dPi.js";
import { a as Button, t as AppShell } from "./app-shell-CtDeXJqm.js";
import { n as toast } from "./dist-CXIX0U2y.js";
import { t as Route } from "./signin-Dct9Lq7o.js";
import { t as Label } from "./label-Da9P26Y4.js";
import { t as Input } from "./input-C91OdWl8.js";
//#region src/routes/signin.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SignIn() {
	const { role } = Route.useSearch();
	const { signIn } = useAuthActions();
	const navigate = useNavigate();
	const me = useQuery(api.authz.whoAmI);
	const [step, setStep] = (0, import_react.useState)("email");
	const [email, setEmail] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!me?.signedIn) return;
		if (me.profile) navigate({ to: "/dashboard" });
		else navigate({
			to: "/onboarding",
			search: { role }
		});
	}, [
		me,
		navigate,
		role
	]);
	async function sendCode(e) {
		e.preventDefault();
		const clean = email.trim().toLowerCase();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
			toast.error("Enter a valid email address.");
			return;
		}
		setBusy(true);
		try {
			await signIn("resend-otp", { email: clean });
			setStep("code");
			toast.success("We sent a 6-digit code to your email.");
		} catch (err) {
			console.error("send code failed", err);
			toast.error("Couldn't send the code. Please try again.");
		} finally {
			setBusy(false);
		}
	}
	async function verify(e) {
		e.preventDefault();
		if (!/^\d{6}$/.test(code.trim())) {
			toast.error("Enter the 6-digit code.");
			return;
		}
		setBusy(true);
		try {
			await signIn("resend-otp", {
				email: email.trim().toLowerCase(),
				code: code.trim()
			});
		} catch (err) {
			console.error("verify failed", err);
			toast.error("That code didn't work. Check it or request a new one.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/signin.tsx:77:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/signin.tsx:78:6",
			"data-macaly-name": "div",
			className: "mx-auto max-w-sm px-4 py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-macaly-loc": "src/routes/signin.tsx:79:8",
					"data-macaly-name": "h1",
					className: "text-2xl font-bold",
					children: role === "brand" ? "Join Cube3 as a brand" : role === "creator" ? "Join Cube3 as a creator" : "Sign in to Cube3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/signin.tsx:82:8",
					"data-macaly-name": "p",
					className: "mt-1 text-sm text-muted-foreground",
					children: "No passwords. We'll email you a one-time code — this also verifies your email."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-macaly-loc": "src/routes/signin.tsx:85:8",
					"data-macaly-name": "p",
					className: "mt-2 text-xs text-muted-foreground",
					children: [
						"By continuing you agree to our ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							"data-macaly-loc": "src/routes/signin.tsx:86:41",
							"data-macaly-name": "a",
							href: "/terms",
							className: "underline",
							children: "Terms"
						}),
						" and",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							"data-macaly-loc": "src/routes/signin.tsx:87:10",
							"data-macaly-name": "a",
							href: "/privacy",
							className: "underline",
							children: "Privacy Policy"
						}),
						". Cube3 is for people aged 18+."
					]
				}),
				step === "email" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					"data-macaly-loc": "src/routes/signin.tsx:91:10",
					"data-macaly-name": "form",
					onSubmit: sendCode,
					className: "mt-6 grid gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/signin.tsx:92:12",
						"data-macaly-name": "div",
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							"data-macaly-loc": "src/routes/signin.tsx:93:14",
							"data-macaly-name": "Label",
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							"data-macaly-loc": "src/routes/signin.tsx:94:14",
							"data-macaly-name": "Input",
							id: "email",
							type: "email",
							inputMode: "email",
							autoComplete: "email",
							placeholder: "you@example.com",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/signin.tsx:105:12",
						"data-macaly-name": "Button",
						type: "submit",
						disabled: busy,
						className: "h-11 bg-brand text-brand-foreground hover:bg-brand/90",
						children: busy ? "Sending…" : "Send code"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					"data-macaly-loc": "src/routes/signin.tsx:110:10",
					"data-macaly-name": "form",
					onSubmit: verify,
					className: "mt-6 grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/signin.tsx:111:12",
							"data-macaly-name": "div",
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-macaly-loc": "src/routes/signin.tsx:112:14",
								"data-macaly-name": "Label",
								htmlFor: "code",
								children: ["6-digit code sent to ", email]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/routes/signin.tsx:113:14",
								"data-macaly-name": "Input",
								id: "code",
								inputMode: "numeric",
								autoComplete: "one-time-code",
								maxLength: 6,
								placeholder: "123456",
								value: code,
								onChange: (e) => setCode(e.target.value.replace(/\D/g, "")),
								className: "text-center text-xl tracking-[0.4em]",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-macaly-loc": "src/routes/signin.tsx:125:12",
							"data-macaly-name": "Button",
							type: "submit",
							disabled: busy,
							className: "h-11 bg-brand text-brand-foreground hover:bg-brand/90",
							children: busy ? "Verifying…" : "Verify & continue"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"data-macaly-loc": "src/routes/signin.tsx:128:12",
							"data-macaly-name": "button",
							type: "button",
							className: "text-sm text-muted-foreground underline",
							onClick: () => {
								setStep("email");
								setCode("");
							},
							children: "Use a different email"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { SignIn as component };
