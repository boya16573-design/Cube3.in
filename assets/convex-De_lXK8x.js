import { C as ConvexHttpClient, D as convexToJson, O as jsonToConvex, k as validateDeploymentUrl, w as getFunctionName } from "./button-BKP2MwRw.js";
//#region node_modules/convex/dist/esm/nextjs/index.js
async function preloadQuery$1(query, ...args) {
	const value = await fetchQuery(query, ...args);
	return {
		_name: getFunctionName(query),
		_argsJSON: convexToJson(args[0] ?? {}),
		_valueJSON: convexToJson(value)
	};
}
function preloadedQueryResult(preloaded) {
	return jsonToConvex(preloaded._valueJSON);
}
async function fetchQuery(query, ...args) {
	const [fnArgs, options] = args;
	return setupClient(options ?? {}).query(query, fnArgs || {});
}
function setupClient(options) {
	if ("url" in options && options.url === void 0) console.error("deploymentUrl is undefined, are your environment variables set? In the future explicitly passing undefined will cause an error. To explicitly use the default, pass `process.env.NEXT_PUBLIC_CONVEX_URL`.");
	const client = new ConvexHttpClient(getConvexUrl(options.url, options.skipConvexDeploymentUrlCheck ?? false));
	if (options.token !== void 0) client.setAuth(options.token);
	if (options.adminToken !== void 0) client.setAdminAuth(options.adminToken);
	client.setFetchOptions({ cache: "no-store" });
	return client;
}
function getConvexUrl(deploymentUrl, skipConvexDeploymentUrlCheck) {
	const url = deploymentUrl ?? {}.NEXT_PUBLIC_CONVEX_URL;
	const isFromEnv = deploymentUrl === void 0;
	if (typeof url !== "string") throw new Error(isFromEnv ? `Environment variable NEXT_PUBLIC_CONVEX_URL is not set.` : `Convex function called with invalid deployment address.`);
	if (!skipConvexDeploymentUrlCheck) validateDeploymentUrl(url);
	return url;
}
//#endregion
//#region src/lib/convex.ts
/**
* Convex SSR helper for TanStack Start / Vite environments.
*
* The `preloadQuery` function from `convex/nextjs` works perfectly with any
* framework — not just Next.js — as long as you provide the Convex deployment
* URL. By default it looks for `NEXT_PUBLIC_CONVEX_URL`, which doesn't exist
* in a Vite/TanStack project. Without it you'll get:
*
*   "Environment variable NEXT_PUBLIC_CONVEX_URL is not set."
*
* This wrapper automatically passes `VITE_CONVEX_URL` (the standard env var
* in Vite projects) so you never hit that error. You can also override the
* URL manually via the `options.url` parameter if needed.
*
* ---
*
* USE THIS TO PRELOAD DATA ON ALL PUBLIC PAGES.
*
* Call `preloadQuery` inside your route's `loader` function to fetch data
* server-side. The HTML response will contain the actual content (SSR),
* making it indexable by search engines and instantly visible to users.
*
* Without preloading, pages render an empty skeleton on first paint and
* only fill in data after the client-side Convex subscription connects —
* bad for SEO and perceived performance.
*
* Example:
*
*   import { preloadQuery } from "@/lib/convex"
*   import { usePreloadedQuery, Preloaded } from "convex/react"
*
*   export const Route = createFileRoute("/blog")({
*     loader: async () => {
*       const preloadedPosts = await preloadQuery(api.posts.list, {})
*       return { preloadedPosts }
*     },
*     component: BlogPage,
*   })
*
*   function BlogPage() {
*     const { preloadedPosts } = Route.useLoaderData()
*     const posts = usePreloadedQuery(preloadedPosts as Preloaded<typeof api.posts.list>)
*     // posts is available immediately — no loading state needed
*   }
*/
async function preloadQuery(query, args, options) {
	const url = options?.url ?? "https://wry-anteater-100.eu-west-1.convex.cloud";
	return preloadQuery$1(query, args ?? {}, { url });
}
//#endregion
export { preloadedQueryResult as n, preloadQuery as t };
