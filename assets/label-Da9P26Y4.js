import { D as require_jsx_runtime, dt as __toESM, lt as require_react } from "./api-D74LnTM3.js";
import { o as cn } from "./app-shell-CtDeXJqm.js";
import { t as Primitive } from "./dist-kfylwfzP.js";
//#region node_modules/@radix-ui/react-label/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var NAME = "Label";
var Label$1 = import_react.forwardRef((props, forwardedRef) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.label, {
		...props,
		ref: forwardedRef,
		onMouseDown: (event) => {
			if (event.target.closest("button, input, select, textarea")) return;
			props.onMouseDown?.(event);
			if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
		}
	});
});
Label$1.displayName = NAME;
var Root = Label$1;
//#endregion
//#region src/components/ui/label.tsx
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-macaly-loc": "src/components/ui/label.tsx:11:4",
		"data-macaly-name": "LabelPrimitive.Root",
		"data-slot": "label",
		className: cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
//#endregion
export { Label as t };
