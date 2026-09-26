import { Ct as __toESM, S as useQuery, s as api, t as Button, x as useMutation, xt as require_react, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { t as useNavigate } from "./useNavigate-DGvAM-7K.js";
import { i as RequireProfile, n as EmptyState, r as PageLoading, t as AppShell } from "./app-shell-GoO9XvM6.js";
import { n as toast } from "./dist-Dfgjbbc_.js";
import { t as Route } from "./_eventId-r4QKYipO.js";
import { r as toMutationArgs, t as EventForm } from "./event-form-mfM8dM2H.js";
//#region src/routes/events/edit/$eventId.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EditEventPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:20:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireProfile, {
			"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:21:6",
			"data-macaly-name": "RequireProfile",
			role: "organizer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditEvent, {
				"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:22:8",
				"data-macaly-name": "EditEvent"
			})
		})
	});
}
var s = (n) => n === void 0 ? "" : String(n);
function EditEvent() {
	const { eventId } = Route.useParams();
	const e = useQuery(api.events.getMineForEdit, { eventId });
	const update = useMutation(api.events.update);
	const setStatus = useMutation(api.events.setStatus);
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!e || form) return;
		setForm({
			name: e.name,
			description: e.description,
			category: e.category,
			institution: e.institution ?? "",
			city: e.city ?? "",
			state: e.state ?? "",
			country: e.country ?? "",
			mode: e.mode,
			eventDate: e.eventDate,
			registrationDeadline: e.registrationDeadline ?? "",
			sponsorshipDeadline: e.sponsorshipDeadline ?? "",
			expectedAttendees: s(e.expectedAttendees),
			previousAttendance: s(e.previousAttendance),
			audienceAgeRange: e.audienceAgeRange ?? "",
			audienceInterests: e.audienceInterests,
			website: e.website ?? "",
			instagram: e.instagram ?? "",
			youtube: e.youtube ?? "",
			bannerUrl: e.bannerUrl ?? "",
			currency: e.currency,
			sponsorshipMin: s(e.sponsorshipMin),
			sponsorshipMax: s(e.sponsorshipMax),
			acceptsCash: e.acceptsCash,
			acceptsProduct: e.acceptsProduct,
			acceptsService: e.acceptsService,
			packages: e.packages,
			previousSponsors: e.previousSponsors ?? ""
		});
	}, [e, form]);
	if (e === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:53:30",
		"data-macaly-name": "PageLoading"
	});
	if (e === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:54:25",
		"data-macaly-name": "EmptyState",
		title: "Event not found",
		cta: {
			to: "/dashboard",
			label: "My events"
		}
	});
	if (!form) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {
		"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:55:20",
		"data-macaly-name": "PageLoading"
	});
	async function save(publish) {
		if (!form || !e) return;
		setBusy(true);
		try {
			const r = await update({
				eventId: e._id,
				...toMutationArgs(form, publish)
			});
			if (!r.ok) return void toast.error(r.message);
			toast.success("Event saved");
			navigate({
				to: "/events/$slug",
				params: { slug: e.slug }
			});
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:71:4",
		"data-macaly-name": "div",
		className: "mx-auto grid max-w-2xl gap-6 px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:72:6",
				"data-macaly-name": "div",
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:73:8",
					"data-macaly-name": "div",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:74:10",
						"data-macaly-name": "h1",
						className: "text-2xl font-bold",
						children: "Edit event"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:75:10",
						"data-macaly-name": "p",
						className: "text-sm text-muted-foreground",
						children: "Changing the name, date or institution removes “Event verified” until it's checked again."
					})]
				}), e.status !== "cancelled" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:78:10",
					"data-macaly-name": "Button",
					variant: "ghost",
					size: "sm",
					className: "text-destructive",
					onClick: async () => {
						if (!confirm("Cancel this event? Brands will no longer be able to sponsor it.")) return;
						const r = await setStatus({
							eventId: e._id,
							status: "cancelled"
						});
						if (!r.ok) toast.error(r.message);
						else {
							toast.success("Event cancelled");
							navigate({ to: "/dashboard" });
						}
					},
					children: "Cancel event"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventForm, {
				"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:86:6",
				"data-macaly-name": "EventForm",
				value: form,
				onChange: setForm
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:87:6",
				"data-macaly-name": "div",
				className: "sticky bottom-20 z-10 flex gap-2 rounded-xl border bg-background/95 p-3 backdrop-blur md:bottom-4",
				children: [e.status === "draft" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:88:33",
					"data-macaly-name": "Button",
					variant: "outline",
					className: "flex-1",
					disabled: busy,
					onClick: () => save(false),
					children: "Save draft"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/events/edit/$eventId.tsx:89:8",
					"data-macaly-name": "Button",
					className: "flex-1 bg-brand text-brand-foreground hover:bg-brand/90",
					disabled: busy,
					onClick: () => save(true),
					children: busy ? "Saving…" : e.status === "draft" ? "Publish event" : "Save changes"
				})]
			})
		]
	});
}
//#endregion
export { EditEventPage as component };
