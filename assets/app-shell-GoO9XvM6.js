import { A as Link, Ct as __toESM, F as useRouter, M as useStructuralSharing, N as useStore, S as useQuery, d as UI_LANGUAGES, f as Users, g as useAuthActions, l as useI18n, m as createLucideIcon, n as cn, p as CalendarDays, s as api, t as Button, x as useMutation, xt as require_react, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
//#region node_modules/@tanstack/react-router/dist/esm/useRouterState.js
/**
* Subscribe to the router's state store with optional selection and
* structural sharing for render optimization.
*
* Options:
* - `select`: Project the full router state to a derived slice
* - `structuralSharing`: Replace-equal semantics for stable references
* - `router`: Read state from a specific router instance instead of context
*
* @returns The selected router state (or the full state by default).
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useRouterStateHook
*/
function useRouterState(opts) {
	const contextRouter = useRouter({ warn: opts?.router === void 0 });
	const router = opts?.router || contextRouter;
	return useStore(router.stores.__store, useStructuralSharing(opts, router));
}
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Bell = createLucideIcon("bell", [["path", {
	d: "M10.268 21a2 2 0 0 0 3.464 0",
	key: "vwvbt9"
}], ["path", {
	d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
	key: "11g9vi"
}]]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Briefcase = createLucideIcon("briefcase", [["path", {
	d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
	key: "jecpp"
}], ["rect", {
	width: "20",
	height: "14",
	x: "2",
	y: "6",
	rx: "2",
	key: "i6l2r4"
}]]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Globe = createLucideIcon("globe", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
		key: "13o1zl"
	}],
	["path", {
		d: "M2 12h20",
		key: "9i4pu4"
	}]
]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Handshake = createLucideIcon("handshake", [
	["path", {
		d: "m11 17 2 2a1 1 0 1 0 3-3",
		key: "efffak"
	}],
	["path", {
		d: "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
		key: "9pr0kb"
	}],
	["path", {
		d: "m21 3 1 11h-2",
		key: "1tisrp"
	}],
	["path", {
		d: "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",
		key: "1uvwmv"
	}],
	["path", {
		d: "M3 4h8",
		key: "1ep09j"
	}]
]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var House = createLucideIcon("house", [["path", {
	d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
	key: "5wwlr5"
}], ["path", {
	d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
	key: "r6nss1"
}]]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LayoutDashboard = createLucideIcon("layout-dashboard", [
	["rect", {
		width: "7",
		height: "9",
		x: "3",
		y: "3",
		rx: "1",
		key: "10lvy0"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "14",
		y: "3",
		rx: "1",
		key: "16une8"
	}],
	["rect", {
		width: "7",
		height: "9",
		x: "14",
		y: "12",
		rx: "1",
		key: "1hutg5"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "3",
		y: "16",
		rx: "1",
		key: "ldoo1y"
	}]
]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LogOut = createLucideIcon("log-out", [
	["path", {
		d: "m16 17 5-5-5-5",
		key: "1bji2h"
	}],
	["path", {
		d: "M21 12H9",
		key: "dn1m92"
	}],
	["path", {
		d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
		key: "1uf3rs"
	}]
]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MessageSquare = createLucideIcon("message-square", [["path", {
	d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	key: "18887p"
}]]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Search = createLucideIcon("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShieldAlert = createLucideIcon("shield-alert", [
	["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}],
	["path", {
		d: "M12 8v4",
		key: "1got3b"
	}],
	["path", {
		d: "M12 16h.01",
		key: "1drbdi"
	}]
]);
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var User = createLucideIcon("user", [["path", {
	d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
	key: "975kel"
}], ["circle", {
	cx: "12",
	cy: "7",
	r: "4",
	key: "17ys0d"
}]]);
//#endregion
//#region src/components/app-shell.tsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Logo({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		"data-macaly-loc": "src/components/app-shell.tsx:14:4",
		"data-macaly-name": "Link",
		to: "/",
		className: cn("flex items-center gap-2 font-bold tracking-tight", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-macaly-loc": "src/components/app-shell.tsx:15:6",
			"data-macaly-name": "span",
			className: "grid size-8 place-items-center rounded-lg bg-brand text-brand-foreground text-sm",
			children: "C³"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-macaly-loc": "src/components/app-shell.tsx:18:6",
			"data-macaly-name": "span",
			className: "text-lg",
			children: "Cube3"
		})]
	});
}
function useNav() {
	const me = useQuery(api.authz.whoAmIv2);
	const { t } = useI18n();
	const role = me?.signedIn ? me.profile?.role : void 0;
	let items;
	if (role === "creator") items = [
		{
			to: "/dashboard",
			label: t("nav.home"),
			icon: LayoutDashboard
		},
		{
			to: "/sponsorships",
			label: t("nav.sponsorships"),
			icon: Briefcase
		},
		{
			to: "/inbox",
			label: t("nav.inbox"),
			icon: MessageSquare
		},
		{
			to: "/profile",
			label: t("nav.profile"),
			icon: User
		}
	];
	else if (role === "organizer") items = [
		{
			to: "/dashboard",
			label: t("nav.home"),
			icon: LayoutDashboard
		},
		{
			to: "/event-sponsors",
			label: "Find Sponsors",
			icon: Handshake
		},
		{
			to: "/inbox",
			label: t("nav.inbox"),
			icon: MessageSquare
		},
		{
			to: "/profile",
			label: t("nav.profile"),
			icon: User
		}
	];
	else if (role === "brand") items = [
		{
			to: "/dashboard",
			label: t("nav.home"),
			icon: LayoutDashboard
		},
		{
			to: "/creators",
			label: t("nav.creators"),
			icon: Users
		},
		{
			to: "/events",
			label: "Events",
			icon: CalendarDays
		},
		{
			to: "/inbox",
			label: t("nav.inbox"),
			icon: MessageSquare
		},
		{
			to: "/profile",
			label: t("nav.profile"),
			icon: User
		}
	];
	else items = [
		{
			to: "/",
			label: t("nav.home"),
			icon: House
		},
		{
			to: "/sponsorships",
			label: t("nav.sponsorships"),
			icon: Briefcase
		},
		{
			to: "/creators",
			label: t("nav.creators"),
			icon: Search
		},
		{
			to: "/events",
			label: "Events",
			icon: CalendarDays
		}
	];
	return {
		items,
		me
	};
}
function AppShell({ children }) {
	const { items, me } = useNav();
	const { signOut } = useAuthActions();
	const { t } = useI18n();
	const signedIn = !!me?.signedIn;
	const unreadNotifs = useQuery(api.notifications.unreadCount, signedIn ? {} : "skip") ?? 0;
	const unreadMsgs = (useQuery(api.collabs.unreadTotal, signedIn ? {} : "skip") ?? 0) + (useQuery(api.eventDeals.unreadTotal, signedIn ? {} : "skip") ?? 0);
	const isAdmin = useQuery(api.admin.amIAdmin, signedIn ? {} : "skip") ?? false;
	const syncTimezone = useMutation(api.profiles.syncTimezone);
	const hasProfile = !!(me?.signedIn && me.profile);
	(0, import_react.useEffect)(() => {
		if (!hasProfile) return;
		try {
			const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			if (tz) syncTimezone({ timezone: tz }).catch(() => void 0);
		} catch {}
	}, [hasProfile, syncTimezone]);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const isActive = (to) => to === "/" ? pathname === "/" : pathname.startsWith(to);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/components/app-shell.tsx:87:4",
		"data-macaly-name": "div",
		className: "min-h-dvh bg-background pb-20 md:pb-0 print:pb-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				"data-macaly-loc": "src/components/app-shell.tsx:88:6",
				"data-macaly-name": "header",
				className: "sticky top-0 z-40 print:hidden border-b bg-background/85 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/components/app-shell.tsx:89:8",
					"data-macaly-name": "div",
					className: "mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
							"data-macaly-loc": "src/components/app-shell.tsx:90:10",
							"data-macaly-name": "Logo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							"data-macaly-loc": "src/components/app-shell.tsx:91:10",
							"data-macaly-name": "nav",
							className: "hidden items-center gap-1 md:flex",
							children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								"data-macaly-loc": "src/components/app-shell.tsx:93:14",
								"data-macaly-name": "Link",
								to: i.to,
								className: cn("rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground", isActive(i.to) && "bg-muted text-foreground"),
								children: [i.label, i.to === "/inbox" && unreadMsgs > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"data-macaly-loc": "src/components/app-shell.tsx:102:56",
									"data-macaly-name": "span",
									className: "ml-1.5 rounded-full bg-brand px-1.5 text-[10px] text-brand-foreground",
									children: unreadMsgs
								})]
							}, i.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/components/app-shell.tsx:106:10",
							"data-macaly-name": "div",
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {
									"data-macaly-loc": "src/components/app-shell.tsx:107:12",
									"data-macaly-name": "LanguageSwitcher"
								}),
								isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									"data-macaly-loc": "src/components/app-shell.tsx:109:14",
									"data-macaly-name": "Link",
									to: "/admin",
									className: "rounded-md p-2 hover:bg-muted",
									"aria-label": "Admin",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
										"data-macaly-loc": "src/components/app-shell.tsx:109:93",
										"data-macaly-name": "ShieldAlert",
										className: "size-5 text-brand"
									})
								}),
								me?.signedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									"data-macaly-loc": "src/components/app-shell.tsx:112:14",
									"data-macaly-name": "Link",
									to: "/notifications",
									className: "relative rounded-md p-2 hover:bg-muted",
									"aria-label": `Notifications${unreadNotifs ? `, ${unreadNotifs} unread` : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
										"data-macaly-loc": "src/components/app-shell.tsx:113:16",
										"data-macaly-name": "Bell",
										className: "size-5"
									}), unreadNotifs > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountDot, {
										"data-macaly-loc": "src/components/app-shell.tsx:114:37",
										"data-macaly-name": "CountDot",
										n: unreadNotifs
									})]
								}),
								me === void 0 ? null : me.signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									"data-macaly-loc": "src/components/app-shell.tsx:118:14",
									"data-macaly-name": "Button",
									variant: "ghost",
									size: "sm",
									onClick: () => void signOut(),
									"aria-label": "Sign out",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
										"data-macaly-loc": "src/components/app-shell.tsx:124:16",
										"data-macaly-name": "LogOut",
										className: "size-4"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-macaly-loc": "src/components/app-shell.tsx:125:16",
										"data-macaly-name": "span",
										className: "hidden sm:inline",
										children: t("nav.signOut")
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-macaly-loc": "src/components/app-shell.tsx:129:16",
									"data-macaly-name": "Button",
									asChild: true,
									variant: "ghost",
									size: "sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										"data-macaly-loc": "src/components/app-shell.tsx:130:18",
										"data-macaly-name": "Link",
										to: "/signin",
										children: t("nav.signIn")
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									"data-macaly-loc": "src/components/app-shell.tsx:132:16",
									"data-macaly-name": "Button",
									asChild: true,
									size: "sm",
									className: "bg-brand text-brand-foreground hover:bg-brand/90",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										"data-macaly-loc": "src/components/app-shell.tsx:133:18",
										"data-macaly-name": "Link",
										to: "/signin",
										search: { role: "creator" },
										children: t("nav.join")
									})
								})] })
							]
						})
					]
				})
			}),
			me?.signedIn && me.profile?.suspended && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/components/app-shell.tsx:142:8",
				"data-macaly-name": "div",
				className: "bg-destructive px-4 py-2 text-center text-sm text-destructive-foreground print:hidden",
				children: "Your account is restricted. You can view Cube3 but can't post, apply or message. Contact support if this is a mistake."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				"data-macaly-loc": "src/components/app-shell.tsx:146:6",
				"data-macaly-name": "main",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"data-macaly-loc": "src/components/app-shell.tsx:149:6",
				"data-macaly-name": "nav",
				className: "fixed inset-x-0 bottom-0 z-40 print:hidden border-t bg-background/95 backdrop-blur md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-macaly-loc": "src/components/app-shell.tsx:150:8",
					"data-macaly-name": "div",
					className: "mx-auto grid max-w-md",
					style: { gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` },
					children: items.map((i) => {
						const Icon = i.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							"data-macaly-loc": "src/components/app-shell.tsx:154:14",
							"data-macaly-name": "Link",
							to: i.to,
							className: cn("flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground", isActive(i.to) && "text-brand"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								"data-macaly-loc": "src/components/app-shell.tsx:162:16",
								"data-macaly-name": "span",
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									"data-macaly-loc": "src/components/app-shell.tsx:163:18",
									"data-macaly-name": "Icon",
									className: "size-5"
								}), i.to === "/inbox" && unreadMsgs > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountDot, {
									"data-macaly-loc": "src/components/app-shell.tsx:164:58",
									"data-macaly-name": "CountDot",
									n: unreadMsgs
								})]
							}), i.label]
						}, i.to);
					})
				})
			})
		]
	});
}
function LanguageSwitcher() {
	const { lang, setLang, t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		"data-macaly-loc": "src/components/app-shell.tsx:179:4",
		"data-macaly-name": "label",
		className: "relative flex items-center rounded-md p-2 hover:bg-muted",
		title: t("nav.language"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
				"data-macaly-loc": "src/components/app-shell.tsx:180:6",
				"data-macaly-name": "Globe",
				className: "size-5",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-macaly-loc": "src/components/app-shell.tsx:181:6",
				"data-macaly-name": "span",
				className: "sr-only",
				children: t("nav.language")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				"data-macaly-loc": "src/components/app-shell.tsx:182:6",
				"data-macaly-name": "select",
				value: lang,
				onChange: (e) => setLang(e.target.value),
				className: "absolute inset-0 cursor-pointer opacity-0",
				"aria-label": t("nav.language"),
				children: UI_LANGUAGES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					"data-macaly-loc": "src/components/app-shell.tsx:188:33",
					"data-macaly-name": "option",
					value: l.code,
					children: l.label
				}, l.code))
			})
		]
	});
}
function CountDot({ n }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-macaly-loc": "src/components/app-shell.tsx:196:4",
		"data-macaly-name": "span",
		className: "absolute -right-1.5 -top-1 grid min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] font-bold leading-4 text-destructive-foreground",
		children: n > 99 ? "99+" : n
	});
}
/** Wraps pages that need a signed-in, onboarded user. */
function RequireProfile({ role, children }) {
	const me = useQuery(api.authz.whoAmIv2);
	if (me === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/components/app-shell.tsx:211:31",
		"data-macaly-name": "PageLoading"
	});
	if (!me.signedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		"data-macaly-loc": "src/components/app-shell.tsx:214:6",
		"data-macaly-name": "EmptyState",
		title: "Sign in to continue",
		body: "You need a Cube3 account to view this page.",
		cta: {
			to: "/signin",
			label: "Sign in"
		}
	});
	if (!me.profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		"data-macaly-loc": "src/components/app-shell.tsx:223:6",
		"data-macaly-name": "EmptyState",
		title: "Finish setting up your account",
		body: "Tell us whether you're a creator or a brand.",
		cta: {
			to: "/onboarding",
			label: "Complete setup"
		}
	});
	if (role && me.profile.role !== role) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		"data-macaly-loc": "src/components/app-shell.tsx:232:6",
		"data-macaly-name": "EmptyState",
		title: role === "brand" ? "This page is for brands" : role === "organizer" ? "This page is for event organizers" : "This page is for creators",
		body: "Your account type doesn't have access to this page.",
		cta: {
			to: "/dashboard",
			label: "Go to dashboard"
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function PageLoading() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/components/app-shell.tsx:244:4",
		"data-macaly-name": "div",
		className: "mx-auto max-w-6xl px-4 py-10",
		"data-state": "loading",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/components/app-shell.tsx:245:6",
				"data-macaly-name": "div",
				className: "h-6 w-48 animate-pulse rounded bg-muted"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/components/app-shell.tsx:246:6",
				"data-macaly-name": "div",
				className: "mt-4 h-24 animate-pulse rounded-xl bg-muted"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-macaly-loc": "src/components/app-shell.tsx:247:6",
				"data-macaly-name": "div",
				className: "mt-3 h-24 animate-pulse rounded-xl bg-muted"
			})
		]
	});
}
function EmptyState({ title, body, cta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/components/app-shell.tsx:262:4",
		"data-macaly-name": "div",
		className: "mx-auto max-w-md px-4 py-14 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				"data-macaly-loc": "src/components/app-shell.tsx:263:6",
				"data-macaly-name": "h2",
				className: "text-lg font-semibold",
				children: title
			}),
			body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/components/app-shell.tsx:264:15",
				"data-macaly-name": "p",
				className: "mt-2 text-sm text-muted-foreground",
				children: body
			}),
			cta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				"data-macaly-loc": "src/components/app-shell.tsx:266:8",
				"data-macaly-name": "Button",
				asChild: true,
				className: "mt-5 bg-brand text-brand-foreground hover:bg-brand/90",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					"data-macaly-loc": "src/components/app-shell.tsx:267:10",
					"data-macaly-name": "Link",
					to: cta.to,
					search: cta.search,
					children: [cta.label, " →"]
				})
			})
		]
	});
}
//#endregion
export { ShieldAlert as a, Handshake as c, RequireProfile as i, Globe as l, EmptyState as n, Search as o, PageLoading as r, MessageSquare as s, AppShell as t, Bell as u };
