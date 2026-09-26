import { A as Link, Ct as __toESM, S as useQuery, f as Users, m as createLucideIcon, n as cn, p as CalendarDays, s as api, t as Button, x as useMutation, xt as require_react, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { t as useNavigate } from "./useNavigate-DGvAM-7K.js";
import { c as Handshake, l as Globe, n as EmptyState, s as MessageSquare, t as AppShell } from "./app-shell-GoO9XvM6.js";
import { t as usePreloadedQuery } from "./hydration-CjQq9zIR.js";
import { t as EventVerifyButton } from "./organizer-verification-gptsUyfM.js";
import { t as Download } from "./download-lzFXaVzR.js";
import { t as ExternalLink } from "./external-link-r8XcJ03L.js";
import { n as Flag, t as ReportDialog } from "./report-dialog-Da0j6I8b.js";
import { t as MapPin } from "./map-pin-BGNVwcBY.js";
import { n as toast } from "./dist-Dfgjbbc_.js";
import { i as formatMoney, r as formatBudgetRange } from "./money-B2xGNqWK.js";
import { o as formatCount } from "./cube3-xqG2XCU7.js";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-P9E-Q0K0.js";
import { t as Label } from "./label-DdaoZkXu.js";
import { t as Badge } from "./badge-Xcdv_DZw.js";
import { n as flagFor } from "./countries-BNqYBK9b.js";
import { i as formatEventDate, n as MODE_LABEL, r as VerificationBadges } from "./event-card-BSHjCeD3.js";
import { t as Route } from "./_slug-DRLU0Buv.js";
import { t as Input } from "./input-BQJAkDLz.js";
import { t as Textarea } from "./textarea-CLFmgltT.js";
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Pencil = createLucideIcon("pencil", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}], ["path", {
	d: "m15 5 4 4",
	key: "1mk7zo"
}]]);
//#endregion
//#region src/routes/events/$slug.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EventPage() {
	const { preloaded } = Route.useLoaderData();
	const r = usePreloadedQuery(preloaded);
	const me = useQuery(api.authz.whoAmIv2);
	if (!r) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/events/$slug.tsx:67:17",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			"data-macaly-loc": "src/routes/events/$slug.tsx:67:27",
			"data-macaly-name": "EmptyState",
			title: "Event not found",
			body: "It may have been removed or is still a draft.",
			cta: {
				to: "/events",
				label: "Discover events"
			}
		})
	});
	const e = r.event;
	const role = me?.signedIn ? me.profile?.role : void 0;
	const place = [
		e.institution,
		e.city,
		e.state,
		e.country
	].filter(Boolean).join(", ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/events/$slug.tsx:73:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			"data-macaly-loc": "src/routes/events/$slug.tsx:74:6",
			"data-macaly-name": "article",
			className: "mx-auto max-w-4xl px-4 py-6 print:max-w-none print:p-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/events/$slug.tsx:75:8",
					"data-macaly-name": "div",
					className: "mb-4 flex flex-wrap items-center justify-end gap-2 print:hidden",
					children: [r.isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/events/$slug.tsx:78:14",
						"data-macaly-name": "Button",
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							"data-macaly-loc": "src/routes/events/$slug.tsx:78:58",
							"data-macaly-name": "Link",
							to: "/events/edit/$eventId",
							params: { eventId: e._id },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
								"data-macaly-loc": "src/routes/events/$slug.tsx:78:119",
								"data-macaly-name": "Pencil",
								className: "size-4"
							}), "Edit"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/events/$slug.tsx:79:14",
						"data-macaly-name": "Button",
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							"data-macaly-loc": "src/routes/events/$slug.tsx:79:58",
							"data-macaly-name": "Link",
							to: "/event-sponsors",
							search: { event: e._id },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, {
								"data-macaly-loc": "src/routes/events/$slug.tsx:79:111",
								"data-macaly-name": "Handshake",
								className: "size-4"
							}), "Find sponsors"]
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						"data-macaly-loc": "src/routes/events/$slug.tsx:82:10",
						"data-macaly-name": "Button",
						size: "sm",
						variant: "outline",
						onClick: () => window.print(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							"data-macaly-loc": "src/routes/events/$slug.tsx:82:77",
							"data-macaly-name": "Download",
							className: "size-4"
						}), "Download media kit"]
					})]
				}),
				r.isOwner && e.status === "draft" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					"data-macaly-loc": "src/routes/events/$slug.tsx:86:10",
					"data-macaly-name": "p",
					className: "mb-4 rounded-lg bg-warning/20 p-3 text-sm print:hidden",
					children: [
						"This event is a ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							"data-macaly-loc": "src/routes/events/$slug.tsx:86:96",
							"data-macaly-name": "strong",
							children: "draft"
						}),
						" — only you can see it. Publish it from Edit to start receiving sponsors."
					]
				}),
				e.status === "cancelled" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/events/$slug.tsx:88:37",
					"data-macaly-name": "p",
					className: "mb-4 rounded-lg bg-muted p-3 text-sm",
					children: "This event was cancelled."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/events/$slug.tsx:90:8",
					"data-macaly-name": "div",
					className: "overflow-hidden rounded-2xl border bg-card print:rounded-none print:border-0",
					children: [e.bannerUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						"data-macaly-loc": "src/routes/events/$slug.tsx:92:12",
						"data-macaly-name": "img",
						src: e.bannerUrl,
						alt: "",
						className: "aspect-[3/1] w-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-macaly-loc": "src/routes/events/$slug.tsx:94:12",
						"data-macaly-name": "div",
						className: "grid aspect-[4/1] place-items-center bg-gradient-to-br from-brand/25 to-brand-2/25 text-lg font-bold text-muted-foreground",
						children: e.category
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/events/$slug.tsx:96:10",
						"data-macaly-name": "div",
						className: "grid gap-6 p-5 md:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								"data-macaly-loc": "src/routes/events/$slug.tsx:97:12",
								"data-macaly-name": "header",
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:98:14",
										"data-macaly-name": "p",
										className: "text-xs font-semibold uppercase tracking-widest text-brand",
										children: "Sponsorship media kit"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:99:14",
										"data-macaly-name": "h1",
										className: "text-2xl font-extrabold md:text-3xl",
										children: e.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:100:14",
										"data-macaly-name": "p",
										className: "text-sm text-muted-foreground",
										children: [
											"by ",
											e.organizer.organizationName,
											e.institution ? ` · ${e.institution}` : ""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:101:14",
										"data-macaly-name": "div",
										className: "flex flex-wrap gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-macaly-loc": "src/routes/events/$slug.tsx:102:16",
												"data-macaly-name": "Badge",
												variant: "secondary",
												children: e.category
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												"data-macaly-loc": "src/routes/events/$slug.tsx:103:16",
												"data-macaly-name": "Badge",
												variant: "outline",
												children: MODE_LABEL[e.mode] ?? e.mode
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationBadges, {
												"data-macaly-loc": "src/routes/events/$slug.tsx:104:16",
												"data-macaly-name": "VerificationBadges",
												collegeVerified: e.organizer.collegeVerified,
												eventVerified: e.verified
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"data-macaly-loc": "src/routes/events/$slug.tsx:108:12",
								"data-macaly-name": "section",
								className: "grid grid-cols-2 gap-3 md:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										"data-macaly-loc": "src/routes/events/$slug.tsx:109:14",
										"data-macaly-name": "Stat",
										icon: CalendarDays,
										label: "Date",
										value: formatEventDate(e.eventDate)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										"data-macaly-loc": "src/routes/events/$slug.tsx:110:14",
										"data-macaly-name": "Stat",
										icon: MapPin,
										label: "Location",
										value: place ? `${flagFor(e.country)} ${e.city ?? e.country ?? ""}`.trim() : MODE_LABEL[e.mode]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										"data-macaly-loc": "src/routes/events/$slug.tsx:111:14",
										"data-macaly-name": "Stat",
										icon: Users,
										label: "Expected attendees",
										value: e.expectedAttendees !== void 0 ? `${formatCount(e.expectedAttendees)}+` : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										"data-macaly-loc": "src/routes/events/$slug.tsx:112:14",
										"data-macaly-name": "Stat",
										icon: Globe,
										label: "Sponsorship sought",
										value: formatBudgetRange(e.sponsorshipMin, e.sponsorshipMax, e.currency)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								"data-macaly-loc": "src/routes/events/$slug.tsx:114:12",
								"data-macaly-name": "p",
								className: "-mt-3 text-[11px] text-muted-foreground",
								children: [
									"Audience numbers are the organizer's estimates",
									e.previousAttendance !== void 0 ? `; last edition: ${formatCount(e.previousAttendance)} attendees (organizer-reported)` : "",
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"data-macaly-loc": "src/routes/events/$slug.tsx:116:12",
								"data-macaly-name": "section",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:117:14",
										"data-macaly-name": "h2",
										className: "font-semibold",
										children: "About the event"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:118:14",
										"data-macaly-name": "p",
										className: "mt-1 whitespace-pre-line text-sm",
										children: e.description
									}),
									place && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:119:24",
										"data-macaly-name": "p",
										className: "mt-2 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
											"data-macaly-loc": "src/routes/events/$slug.tsx:119:74",
											"data-macaly-name": "MapPin",
											className: "mr-1 inline size-3.5"
										}), place]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"data-macaly-loc": "src/routes/events/$slug.tsx:122:12",
								"data-macaly-name": "section",
								className: "grid gap-2 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										"data-macaly-loc": "src/routes/events/$slug.tsx:123:14",
										"data-macaly-name": "Info",
										label: "Audience",
										value: [e.audienceAgeRange ? `Ages ${e.audienceAgeRange}` : null, e.audienceInterests.join(", ") || null].filter(Boolean).join(" · ") || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										"data-macaly-loc": "src/routes/events/$slug.tsx:124:14",
										"data-macaly-name": "Info",
										label: "Accepts",
										value: [
											e.acceptsCash && "Cash",
											e.acceptsProduct && "Products",
											e.acceptsService && "Services"
										].filter(Boolean).join(", ")
									}),
									e.registrationDeadline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										"data-macaly-loc": "src/routes/events/$slug.tsx:125:41",
										"data-macaly-name": "Info",
										label: "Registration closes",
										value: formatEventDate(e.registrationDeadline)
									}),
									e.sponsorshipDeadline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										"data-macaly-loc": "src/routes/events/$slug.tsx:126:40",
										"data-macaly-name": "Info",
										label: "Sponsorship deadline",
										value: formatEventDate(e.sponsorshipDeadline)
									})
								]
							}),
							e.packages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"data-macaly-loc": "src/routes/events/$slug.tsx:130:14",
								"data-macaly-name": "section",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									"data-macaly-loc": "src/routes/events/$slug.tsx:131:16",
									"data-macaly-name": "h2",
									className: "font-semibold",
									children: "Sponsorship packages"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-macaly-loc": "src/routes/events/$slug.tsx:132:16",
									"data-macaly-name": "div",
									className: "mt-3 grid gap-3 sm:grid-cols-2",
									children: e.packages.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:134:20",
										"data-macaly-name": "div",
										className: "rounded-xl border p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-macaly-loc": "src/routes/events/$slug.tsx:135:22",
												"data-macaly-name": "p",
												className: "font-semibold",
												children: p.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												"data-macaly-loc": "src/routes/events/$slug.tsx:136:22",
												"data-macaly-name": "p",
												className: "text-lg font-bold text-brand",
												children: p.amount !== void 0 ? formatMoney(p.amount, e.currency) : "Price on request"
											}),
											p.benefits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												"data-macaly-loc": "src/routes/events/$slug.tsx:137:48",
												"data-macaly-name": "ul",
												className: "mt-2 grid gap-1 text-sm",
												children: p.benefits.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													"data-macaly-loc": "src/routes/events/$slug.tsx:137:114",
													"data-macaly-name": "li",
													children: ["✓ ", b]
												}, i))
											})
										]
									}, p.id))
								})]
							}),
							e.previousSponsors && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"data-macaly-loc": "src/routes/events/$slug.tsx:145:14",
								"data-macaly-name": "section",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:146:16",
										"data-macaly-name": "h2",
										className: "font-semibold",
										children: "Previous sponsors"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:147:16",
										"data-macaly-name": "p",
										className: "mt-1 whitespace-pre-line text-sm",
										children: e.previousSponsors
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:148:16",
										"data-macaly-name": "p",
										className: "text-[11px] text-muted-foreground",
										children: "Listed by the organizer; not verified by Cube3."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								"data-macaly-loc": "src/routes/events/$slug.tsx:152:12",
								"data-macaly-name": "section",
								className: "rounded-xl bg-muted p-4 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:153:14",
										"data-macaly-name": "h2",
										className: "font-semibold",
										children: "Organizer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:154:14",
										"data-macaly-name": "p",
										className: "mt-1",
										children: [e.organizer.organizationName, e.organizer.institution ? ` · ${e.organizer.institution}` : ""]
									}),
									e.organizer.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:155:42",
										"data-macaly-name": "p",
										className: "mt-1 text-muted-foreground",
										children: e.organizer.description
									}),
									e.organizer.previousEvents && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:156:45",
										"data-macaly-name": "p",
										className: "mt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												"data-macaly-loc": "src/routes/events/$slug.tsx:156:65",
												"data-macaly-name": "strong",
												children: "Previous events:"
											}),
											" ",
											e.organizer.previousEvents
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:157:14",
										"data-macaly-name": "div",
										className: "mt-2 flex flex-wrap gap-3 print:hidden",
										children: [
											e.website ?? e.organizer.website,
											e.instagram,
											e.youtube,
											e.organizer.linkedin
										].filter(Boolean).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialLink, {
											"data-macaly-loc": "src/routes/events/$slug.tsx:159:18",
											"data-macaly-name": "SocialLink",
											value: l
										}, l))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-macaly-loc": "src/routes/events/$slug.tsx:162:14",
										"data-macaly-name": "p",
										className: "mt-2 text-xs text-muted-foreground",
										children: "Contact the organizer through Cube3 — contact details are shared once a sponsorship is agreed."
									})
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/events/$slug.tsx:167:8",
					"data-macaly-name": "div",
					className: "mt-6 grid gap-4 print:hidden",
					children: [r.isOwner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwnerPanel, {
						"data-macaly-loc": "src/routes/events/$slug.tsx:169:12",
						"data-macaly-name": "OwnerPanel",
						eventId: e._id,
						verified: e.verified,
						status: e.status
					}) : role === "brand" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandActions, {
						"data-macaly-loc": "src/routes/events/$slug.tsx:171:12",
						"data-macaly-name": "BrandActions",
						e
					}) : !me?.signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-macaly-loc": "src/routes/events/$slug.tsx:173:12",
						"data-macaly-name": "div",
						className: "rounded-xl border p-4 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							"data-macaly-loc": "src/routes/events/$slug.tsx:174:14",
							"data-macaly-name": "p",
							className: "font-medium",
							children: "Want to sponsor this event?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							"data-macaly-loc": "src/routes/events/$slug.tsx:175:14",
							"data-macaly-name": "Button",
							asChild: true,
							className: "mt-3 bg-brand text-brand-foreground hover:bg-brand/90",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								"data-macaly-loc": "src/routes/events/$slug.tsx:175:96",
								"data-macaly-name": "Link",
								to: "/signin",
								search: { role: "brand" },
								children: "Join as a brand"
							})
						})]
					}) : null, me?.signedIn && !r.isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportEvent, {
						"data-macaly-loc": "src/routes/events/$slug.tsx:178:41",
						"data-macaly-name": "ReportEvent",
						organizerUserId: e.organizerUserId,
						eventName: e.name
					})]
				})
			]
		})
	});
}
function Stat({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/events/$slug.tsx:187:4",
		"data-macaly-name": "div",
		className: "rounded-xl border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			"data-macaly-loc": "src/routes/events/$slug.tsx:188:6",
			"data-macaly-name": "p",
			className: "flex items-center gap-1 text-[11px] text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				"data-macaly-loc": "src/routes/events/$slug.tsx:188:79",
				"data-macaly-name": "Icon",
				className: "size-3.5"
			}), label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-macaly-loc": "src/routes/events/$slug.tsx:189:6",
			"data-macaly-name": "p",
			className: "mt-0.5 text-sm font-semibold",
			children: value
		})]
	});
}
function Info({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/events/$slug.tsx:195:9",
		"data-macaly-name": "div",
		className: "rounded-lg border p-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-macaly-loc": "src/routes/events/$slug.tsx:195:56",
			"data-macaly-name": "p",
			className: "text-[11px] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-macaly-loc": "src/routes/events/$slug.tsx:195:116",
			"data-macaly-name": "p",
			children: value
		})]
	});
}
function SocialLink({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		"data-macaly-loc": "src/routes/events/$slug.tsx:201:4",
		"data-macaly-name": "a",
		href: value.startsWith("http") ? value : value.startsWith("@") ? `https://instagram.com/${value.slice(1)}` : `https://${value}`,
		target: "_blank",
		rel: "noopener noreferrer nofollow",
		className: "inline-flex items-center gap-1 text-brand hover:underline",
		children: [value.replace(/^https?:\/\/(www\.)?/, "").slice(0, 40), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
			"data-macaly-loc": "src/routes/events/$slug.tsx:202:62",
			"data-macaly-name": "ExternalLink",
			className: "size-3"
		})]
	});
}
function OwnerPanel({ eventId, verified, status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/events/$slug.tsx:209:4",
		"data-macaly-name": "div",
		className: "grid gap-3 rounded-xl border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-macaly-loc": "src/routes/events/$slug.tsx:210:6",
			"data-macaly-name": "p",
			className: "font-semibold",
			children: "Manage this event"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-macaly-loc": "src/routes/events/$slug.tsx:211:6",
			"data-macaly-name": "div",
			className: "flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/events/$slug.tsx:212:8",
					"data-macaly-name": "Button",
					asChild: true,
					className: "bg-brand text-brand-foreground hover:bg-brand/90",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						"data-macaly-loc": "src/routes/events/$slug.tsx:212:85",
						"data-macaly-name": "Link",
						to: "/event-sponsors",
						search: { event: eventId },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, {
							"data-macaly-loc": "src/routes/events/$slug.tsx:212:140",
							"data-macaly-name": "Handshake",
							className: "size-4"
						}), "Find sponsors"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/events/$slug.tsx:213:8",
					"data-macaly-name": "Button",
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"data-macaly-loc": "src/routes/events/$slug.tsx:213:42",
						"data-macaly-name": "Link",
						to: "/inbox",
						children: "Sponsorship inbox"
					})
				}),
				!verified && status !== "cancelled" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventVerifyButton, {
					"data-macaly-loc": "src/routes/events/$slug.tsx:214:48",
					"data-macaly-name": "EventVerifyButton",
					eventId
				})
			]
		})]
	});
}
function BrandActions({ e }) {
	const deals = useQuery(api.eventDeals.listMine);
	const existing = deals?.find((d) => d.eventSlug === e.slug && d.status !== "rejected" && d.status !== "cancelled");
	const [open, setOpen] = (0, import_react.useState)(false);
	if (deals === void 0) return null;
	if (existing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/events/$slug.tsx:227:6",
		"data-macaly-name": "div",
		className: "rounded-xl border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			"data-macaly-loc": "src/routes/events/$slug.tsx:228:8",
			"data-macaly-name": "p",
			className: "font-medium",
			children: "You're talking with this organizer."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			"data-macaly-loc": "src/routes/events/$slug.tsx:229:8",
			"data-macaly-name": "Button",
			asChild: true,
			className: "mt-3 bg-brand text-brand-foreground hover:bg-brand/90",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				"data-macaly-loc": "src/routes/events/$slug.tsx:229:90",
				"data-macaly-name": "Link",
				to: "/event-deals/$dealId",
				params: { dealId: existing._id },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
					"data-macaly-loc": "src/routes/events/$slug.tsx:229:156",
					"data-macaly-name": "MessageSquare",
					className: "size-4"
				}), "Open conversation"]
			})
		})]
	});
	if (e.status !== "published") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/events/$slug.tsx:235:4",
		"data-macaly-name": "div",
		className: "rounded-xl border p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/events/$slug.tsx:236:6",
				"data-macaly-name": "p",
				className: "font-medium",
				children: "Interested in sponsoring?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-macaly-loc": "src/routes/events/$slug.tsx:237:6",
				"data-macaly-name": "p",
				className: "text-sm text-muted-foreground",
				children: "Send a proposal with your amount, package and what you'd like in return. The organizer can accept, counter or ask for changes."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				"data-macaly-loc": "src/routes/events/$slug.tsx:238:6",
				"data-macaly-name": "Button",
				className: "mt-3 bg-brand text-brand-foreground hover:bg-brand/90",
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, {
					"data-macaly-loc": "src/routes/events/$slug.tsx:238:110",
					"data-macaly-name": "Handshake",
					className: "size-4"
				}), "Send sponsorship proposal"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProposalDialog, {
				"data-macaly-loc": "src/routes/events/$slug.tsx:239:6",
				"data-macaly-name": "ProposalDialog",
				open,
				onOpenChange: setOpen,
				e
			})
		]
	});
}
var DELIVERABLE_IDEAS = [
	"Logo placement",
	"Stage mention",
	"Instagram post",
	"Instagram story",
	"YouTube promotion",
	"Booth",
	"Product distribution",
	"Speaking session",
	"Workshop",
	"Banner",
	"Email promotion",
	"Student discounts",
	"QR code promotion"
];
function ProposalDialog({ open, onOpenChange, e }) {
	const propose = useMutation(api.eventDeals.propose);
	const navigate = useNavigate();
	const [pkg, setPkg] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [productOffer, setProductOffer] = (0, import_react.useState)("");
	const [objectives, setObjectives] = (0, import_react.useState)("");
	const [deliverables, setDeliverables] = (0, import_react.useState)([]);
	const [extra, setExtra] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const choosePkg = (id) => {
		setPkg(id);
		const p = e.packages.find((x) => x.id === id);
		if (p) {
			if (p.amount !== void 0) setAmount(String(p.amount));
			setDeliverables(p.benefits.slice(0, 15));
		}
	};
	const toggle = (d) => setDeliverables(deliverables.includes(d) ? deliverables.filter((x) => x !== d) : [...deliverables, d]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-macaly-loc": "src/routes/events/$slug.tsx:269:4",
		"data-macaly-name": "Dialog",
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			"data-macaly-loc": "src/routes/events/$slug.tsx:270:6",
			"data-macaly-name": "DialogContent",
			className: "max-h-[90dvh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					"data-macaly-loc": "src/routes/events/$slug.tsx:271:8",
					"data-macaly-name": "DialogHeader",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						"data-macaly-loc": "src/routes/events/$slug.tsx:272:10",
						"data-macaly-name": "DialogTitle",
						children: ["Sponsor ", e.name]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						"data-macaly-loc": "src/routes/events/$slug.tsx:273:10",
						"data-macaly-name": "DialogDescription",
						children: [
							"Amounts are in ",
							e.currency,
							". Nothing is charged through Cube3 — payment is arranged between you and the organizer."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/events/$slug.tsx:275:8",
					"data-macaly-name": "div",
					className: "grid gap-3",
					children: [
						e.packages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/events/$slug.tsx:277:12",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/events/$slug.tsx:278:14",
								"data-macaly-name": "Label",
								children: "Package"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-macaly-loc": "src/routes/events/$slug.tsx:279:14",
								"data-macaly-name": "div",
								className: "flex flex-wrap gap-1.5",
								children: e.packages.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									"data-macaly-loc": "src/routes/events/$slug.tsx:281:18",
									"data-macaly-name": "button",
									type: "button",
									onClick: () => choosePkg(p.id),
									className: cn("rounded-full border px-3 py-1 text-sm", pkg === p.id ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"),
									children: [p.name, p.amount !== void 0 ? ` · ${formatMoney(p.amount, e.currency)}` : ""]
								}, p.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/events/$slug.tsx:288:10",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								"data-macaly-loc": "src/routes/events/$slug.tsx:288:40",
								"data-macaly-name": "Label",
								htmlFor: "pa",
								children: [
									"Proposed amount (",
									e.currency,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/routes/events/$slug.tsx:288:98",
								"data-macaly-name": "Input",
								id: "pa",
								inputMode: "numeric",
								value: amount,
								onChange: (x) => setAmount(x.target.value.replace(/\D/g, "")),
								placeholder: "0 if product/service only"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/events/$slug.tsx:289:10",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/events/$slug.tsx:289:40",
								"data-macaly-name": "Label",
								htmlFor: "po",
								children: "Product / service offer (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"data-macaly-loc": "src/routes/events/$slug.tsx:289:102",
								"data-macaly-name": "Input",
								id: "po",
								value: productOffer,
								onChange: (x) => setProductOffer(x.target.value),
								maxLength: 500,
								placeholder: "e.g. 200 T-shirts, cloud credits"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/events/$slug.tsx:290:10",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/events/$slug.tsx:290:40",
								"data-macaly-name": "Label",
								htmlFor: "ob",
								children: "Campaign objectives"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								"data-macaly-loc": "src/routes/events/$slug.tsx:290:87",
								"data-macaly-name": "Textarea",
								id: "ob",
								rows: 2,
								value: objectives,
								onChange: (x) => setObjectives(x.target.value),
								maxLength: 1e3,
								placeholder: "e.g. App installs among engineering students"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/events/$slug.tsx:291:10",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/events/$slug.tsx:292:12",
								"data-macaly-name": "Label",
								children: "Deliverables you'd like"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-macaly-loc": "src/routes/events/$slug.tsx:293:12",
								"data-macaly-name": "div",
								className: "flex flex-wrap gap-1.5",
								children: [.../* @__PURE__ */ new Set([...deliverables, ...DELIVERABLE_IDEAS])].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"data-macaly-loc": "src/routes/events/$slug.tsx:295:16",
									"data-macaly-name": "button",
									type: "button",
									onClick: () => toggle(d),
									className: cn("rounded-full border px-2.5 py-1 text-xs", deliverables.includes(d) ? "border-brand bg-brand-soft" : "hover:bg-muted"),
									children: d
								}, d))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/events/$slug.tsx:299:10",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/events/$slug.tsx:299:40",
								"data-macaly-name": "Label",
								htmlFor: "ex",
								children: "Additional requirements (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								"data-macaly-loc": "src/routes/events/$slug.tsx:299:102",
								"data-macaly-name": "Textarea",
								id: "ex",
								rows: 2,
								value: extra,
								onChange: (x) => setExtra(x.target.value),
								maxLength: 1e3
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-macaly-loc": "src/routes/events/$slug.tsx:300:10",
							"data-macaly-name": "div",
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								"data-macaly-loc": "src/routes/events/$slug.tsx:300:40",
								"data-macaly-name": "Label",
								htmlFor: "msg",
								children: "Message to the organizer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								"data-macaly-loc": "src/routes/events/$slug.tsx:300:93",
								"data-macaly-name": "Textarea",
								id: "msg",
								rows: 3,
								value: message,
								onChange: (x) => setMessage(x.target.value),
								maxLength: 3e3,
								required: true
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
					"data-macaly-loc": "src/routes/events/$slug.tsx:302:8",
					"data-macaly-name": "DialogFooter",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						"data-macaly-loc": "src/routes/events/$slug.tsx:303:10",
						"data-macaly-name": "Button",
						className: "bg-brand text-brand-foreground hover:bg-brand/90",
						disabled: busy || message.trim().length < 10,
						onClick: async () => {
							setBusy(true);
							try {
								const r = await propose({
									eventId: e._id,
									amount: amount ? Number(amount) : 0,
									packageName: e.packages.find((p) => p.id === pkg)?.name,
									message,
									productOffer: productOffer || void 0,
									objectives: objectives || void 0,
									deliverables,
									additionalRequirements: extra || void 0
								});
								if (!r.ok) return void toast.error(r.message);
								toast.success("Proposal sent");
								onOpenChange(false);
								navigate({
									to: "/event-deals/$dealId",
									params: { dealId: r.dealId }
								});
							} finally {
								setBusy(false);
							}
						},
						children: busy ? "Sending…" : "Send proposal"
					})
				})
			]
		})
	});
}
function ReportEvent({ organizerUserId, eventName }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		"data-macaly-loc": "src/routes/events/$slug.tsx:340:6",
		"data-macaly-name": "button",
		onClick: () => setOpen(true),
		className: "inline-flex items-center gap-1 justify-self-start text-xs text-muted-foreground hover:text-destructive",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
			"data-macaly-loc": "src/routes/events/$slug.tsx:341:8",
			"data-macaly-name": "Flag",
			className: "size-3.5"
		}), "Report this event"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportDialog, {
		"data-macaly-loc": "src/routes/events/$slug.tsx:343:6",
		"data-macaly-name": "ReportDialog",
		open,
		onOpenChange: setOpen,
		targetUserId: organizerUserId,
		targetRole: `event organizer (${eventName})`
	})] });
}
//#endregion
export { EventPage as component };
