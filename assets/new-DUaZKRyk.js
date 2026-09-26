import { Ct as __toESM, S as useQuery, s as api, t as Button, x as useMutation, xt as require_react, z as require_jsx_runtime } from "./button-BKP2MwRw.js";
import { t as useNavigate } from "./useNavigate-DGvAM-7K.js";
import { i as RequireProfile, t as AppShell } from "./app-shell-GoO9XvM6.js";
import { n as toast } from "./dist-Dfgjbbc_.js";
import { n as emptyEvent, r as toMutationArgs, t as EventForm } from "./event-form-mfM8dM2H.js";
//#region src/routes/events/new.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewEventPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		"data-macaly-loc": "src/routes/events/new.tsx:19:4",
		"data-macaly-name": "AppShell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireProfile, {
			"data-macaly-loc": "src/routes/events/new.tsx:20:6",
			"data-macaly-name": "RequireProfile",
			role: "organizer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewEvent, {
				"data-macaly-loc": "src/routes/events/new.tsx:21:8",
				"data-macaly-name": "NewEvent"
			})
		})
	});
}
function NewEvent() {
	const me = useQuery(api.profiles.getMyProfileFullV2);
	const create = useMutation(api.events.create);
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (me && !form) setForm(emptyEvent(me.profile.country ?? "", me.organizer?.institution ?? ""));
	}, [me, form]);
	if (!form) return null;
	async function save(publish) {
		if (!form) return;
		setBusy(true);
		try {
			const r = await create(toMutationArgs(form, publish));
			if (!r.ok) return void toast.error(r.message);
			toast.success(publish ? "Event published" : "Draft saved");
			navigate({
				to: "/events/$slug",
				params: { slug: r.slug }
			});
		} catch (err) {
			console.error("create event failed", err);
			toast.error("Couldn't save the event.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-macaly-loc": "src/routes/events/new.tsx:57:4",
		"data-macaly-name": "div",
		className: "mx-auto grid max-w-2xl gap-6 px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/events/new.tsx:58:6",
				"data-macaly-name": "div",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					"data-macaly-loc": "src/routes/events/new.tsx:59:8",
					"data-macaly-name": "h1",
					className: "text-2xl font-bold",
					children: "Create an event"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					"data-macaly-loc": "src/routes/events/new.tsx:60:8",
					"data-macaly-name": "p",
					className: "text-sm text-muted-foreground",
					children: "Describe your event and what sponsors get. Creating and listing events on Cube3 is free."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventForm, {
				"data-macaly-loc": "src/routes/events/new.tsx:62:6",
				"data-macaly-name": "EventForm",
				value: form,
				onChange: setForm
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-macaly-loc": "src/routes/events/new.tsx:63:6",
				"data-macaly-name": "div",
				className: "sticky bottom-20 z-10 flex gap-2 rounded-xl border bg-background/95 p-3 backdrop-blur md:bottom-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/events/new.tsx:64:8",
					"data-macaly-name": "Button",
					variant: "outline",
					className: "flex-1",
					disabled: busy,
					onClick: () => save(false),
					children: "Save draft"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-macaly-loc": "src/routes/events/new.tsx:65:8",
					"data-macaly-name": "Button",
					className: "flex-1 bg-brand text-brand-foreground hover:bg-brand/90",
					disabled: busy,
					onClick: () => save(true),
					children: busy ? "Saving…" : "Publish event"
				})]
			})
		]
	});
}
//#endregion
export { NewEventPage as component };
