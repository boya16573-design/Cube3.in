import { j as require_jsx_runtime } from "./api-DJqU9p-G.js";
import { o as cn } from "./app-shell-BzN9KHqO.js";
//#region src/components/chips.tsx
var import_jsx_runtime = require_jsx_runtime();
function Chips({ options, value, onChange, single }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-macaly-loc": "src/components/chips.tsx:15:4",
		"data-macaly-name": "div",
		className: "flex flex-wrap gap-2",
		children: options.map((o) => {
			const on = value.includes(o);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"data-macaly-loc": "src/components/chips.tsx:19:10",
				"data-macaly-name": "button",
				type: "button",
				onClick: () => onChange(single ? on ? [] : [o] : on ? value.filter((x) => x !== o) : [...value, o]),
				className: cn("rounded-full border px-3 py-1.5 text-sm transition", on ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"),
				"aria-pressed": on,
				children: o
			}, o);
		})
	});
}
//#endregion
export { Chips as t };
