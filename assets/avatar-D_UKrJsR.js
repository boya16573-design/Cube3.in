import { D as require_jsx_runtime, dt as __toESM, lt as require_react } from "./api-D74LnTM3.js";
import { o as cn } from "./app-shell-CtDeXJqm.js";
import { t as Primitive } from "./dist-kfylwfzP.js";
import { n as useLayoutEffect2, r as createContextScope, t as useCallbackRef } from "./dist-BF5gvTxC.js";
//#region node_modules/@radix-ui/react-avatar/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var AVATAR_NAME = "Avatar";
var [createAvatarContext, createAvatarScope] = createContextScope(AVATAR_NAME);
var STATIC_IMAGE_COUNT_STATE = [0, () => void 0];
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAvatar, ...avatarProps } = props;
	const [imageLoadingStatus, setImageLoadingStatus] = import_react.useState("idle");
	const [imageCount, setImageCount] = useImageCount();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarProvider, {
		scope: __scopeAvatar,
		imageLoadingStatus,
		setImageLoadingStatus,
		imageCount,
		setImageCount,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			...avatarProps,
			ref: forwardedRef
		})
	});
});
Avatar$1.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAvatar, src, onLoadingStatusChange, ...imageProps } = props;
	const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
	useUpdateImageCount(context.setImageCount);
	const imageLoadingStatus = useImageLoadingStatus(src, {
		referrerPolicy: imageProps.referrerPolicy,
		crossOrigin: imageProps.crossOrigin,
		loadingStatus: context.imageLoadingStatus,
		setLoadingStatus: context.setImageLoadingStatus
	});
	const handleLoadingStatusChange = useCallbackRef((status) => {
		onLoadingStatusChange?.(status);
	});
	const loadingStatusRef = import_react.useRef(imageLoadingStatus);
	useLayoutEffect2(() => {
		const previousLoadingStatus = loadingStatusRef.current;
		loadingStatusRef.current = imageLoadingStatus;
		if (imageLoadingStatus !== previousLoadingStatus) handleLoadingStatusChange(imageLoadingStatus);
	}, [imageLoadingStatus, handleLoadingStatusChange]);
	return imageLoadingStatus === "loaded" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.img, {
		...imageProps,
		ref: forwardedRef,
		src
	}) : null;
});
AvatarImage$1.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAvatar, delayMs, ...fallbackProps } = props;
	const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
	const [canRender, setCanRender] = import_react.useState(delayMs === void 0);
	import_react.useEffect(() => {
		if (delayMs !== void 0) {
			const timerId = window.setTimeout(() => setCanRender(true), delayMs);
			return () => window.clearTimeout(timerId);
		}
	}, [delayMs]);
	return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		...fallbackProps,
		ref: forwardedRef
	}) : null;
});
AvatarFallback$1.displayName = FALLBACK_NAME;
function useImageLoadingStatus(src, { loadingStatus, setLoadingStatus, referrerPolicy, crossOrigin }) {
	useLayoutEffect2(() => {
		if (!src) {
			setLoadingStatus("error");
			return;
		}
		const image = new window.Image();
		const handleLoad = (event) => {
			const image2 = event.currentTarget;
			setLoadingStatus(getImageLoadingStatus(image2));
		};
		const handleError = () => setLoadingStatus("error");
		image.addEventListener("load", handleLoad);
		image.addEventListener("error", handleError);
		if (referrerPolicy) image.referrerPolicy = referrerPolicy;
		image.crossOrigin = crossOrigin ?? null;
		image.src = src;
		setLoadingStatus(getImageLoadingStatus(image));
		return () => {
			image.removeEventListener("load", handleLoad);
			image.removeEventListener("error", handleError);
			setLoadingStatus("idle");
		};
	}, [
		src,
		crossOrigin,
		referrerPolicy,
		setLoadingStatus
	]);
	return loadingStatus;
}
function getImageLoadingStatus(image) {
	return image.complete ? image.naturalWidth > 0 ? "loaded" : "error" : "loading";
}
function useImageCount() {
	let state = STATIC_IMAGE_COUNT_STATE;
	{
		state = import_react.useState(0);
		const [imageCount] = state;
		const hasWarnedRef = import_react.useRef(false);
		import_react.useEffect(() => {
			if (imageCount > 1 && !hasWarnedRef.current) {
				hasWarnedRef.current = true;
				console.warn("Avatar: Only one `Avatar.Image` component should be rendered per `Avatar.Root`, but multiple were detected. This will lead to unexpected behavior.");
			}
		}, [imageCount]);
	}
	return state;
}
function useUpdateImageCount(setImageCount) {
	import_react.useEffect(() => {
		setImageCount((imageCount) => imageCount + 1);
		return () => {
			setImageCount((imageCount) => imageCount - 1);
		};
	}, [setImageCount]);
}
//#endregion
//#region src/components/ui/avatar.tsx
function Avatar({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
		"data-macaly-loc": "src/components/ui/avatar.tsx:14:4",
		"data-macaly-name": "AvatarPrimitive.Root",
		"data-slot": "avatar",
		"data-size": size,
		className: cn("group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6", className),
		...props
	});
}
function AvatarImage({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
		"data-macaly-loc": "src/components/ui/avatar.tsx:31:4",
		"data-macaly-name": "AvatarPrimitive.Image",
		"data-slot": "avatar-image",
		className: cn("aspect-square size-full", className),
		...props
	});
}
function AvatarFallback({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
		"data-macaly-loc": "src/components/ui/avatar.tsx:44:4",
		"data-macaly-name": "AvatarPrimitive.Fallback",
		"data-slot": "avatar-fallback",
		className: cn("flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs", className),
		...props
	});
}
//#endregion
export { AvatarFallback as n, AvatarImage as r, Avatar as t };
