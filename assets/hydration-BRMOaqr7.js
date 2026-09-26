import { _ as makeFunctionReference, b as jsonToConvex, ht as __toESM, m as useQuery, pt as require_react } from "./api-DJqU9p-G.js";
//#region node_modules/convex/dist/esm/react/hydration.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function usePreloadedQuery(preloadedQuery) {
	const args = (0, import_react.useMemo)(() => jsonToConvex(preloadedQuery._argsJSON), [preloadedQuery._argsJSON]);
	const preloadedResult = (0, import_react.useMemo)(() => jsonToConvex(preloadedQuery._valueJSON), [preloadedQuery._valueJSON]);
	const result = useQuery(makeFunctionReference(preloadedQuery._name), args);
	return result === void 0 ? preloadedResult : result;
}
//#endregion
export { usePreloadedQuery as t };
