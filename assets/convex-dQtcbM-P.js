import { _ as validateDeploymentUrl, d as ConvexHttpClient, f as getFunctionName, g as jsonToConvex, h as convexToJson } from "./api-D74LnTM3.js";
//#region src/metadata.json
var metadata_default = {
	"default": { "openGraph": {} },
	"/": {
		"title": "Cube3 — Find sponsorships. Find creators.",
		"description": "Cube3 helps creators — including small and regional-language creators — discover relevant sponsorships, and helps brands find creators who match their campaigns.",
		"openGraph": {}
	},
	"/sponsorships": {
		"title": "Find sponsorships for your channel · Cube3",
		"description": "Browse open brand campaigns for YouTubers, Instagram creators, podcasters and bloggers. See budgets, requirements and why you match — then apply.",
		"openGraph": {}
	},
	"/creators": {
		"title": "Find creators for your brand campaign · Cube3",
		"description": "Search YouTube, Instagram and regional-language creators by category, audience, language and location. Verified stats are clearly labelled.",
		"openGraph": {}
	}
};
//#endregion
//#region src/lib/seo.ts
var defaultImage = (metadata_default.default?.openGraph)?.images;
/** Title/description + Open Graph + Twitter tags for one page. */
function pageMeta(p) {
	const title = p.title.slice(0, 70);
	const description = p.description.replace(/\s+/g, " ").trim().slice(0, 160);
	const image = p.image ?? defaultImage;
	const meta = [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: p.type ?? "website"
		},
		{
			property: "og:site_name",
			content: "Cube3"
		},
		{
			name: "twitter:card",
			content: image ? "summary_large_image" : "summary"
		},
		{
			name: "twitter:title",
			content: title
		},
		{
			name: "twitter:description",
			content: description
		}
	];
	if (image) meta.push({
		property: "og:image",
		content: image
	});
	return meta;
}
/** Static route metadata from src/metadata.json (single source of truth). */
function routeMeta(path) {
	const page = metadata_default[path];
	return pageMeta({
		title: page.title,
		description: page.description
	});
}
/** JSON-LD script entry for a route's head(). `<` is escaped so content can't break out of the script tag. */
function jsonLd(data) {
	return {
		type: "application/ld+json",
		children: JSON.stringify(data).replace(/</g, "\\u003c")
	};
}
/** Page not found / private: keep out of search results. */
var noindex = [{
	name: "robots",
	content: "noindex"
}];
//#endregion
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
export { pageMeta as a, noindex as i, preloadedQueryResult as n, routeMeta as o, jsonLd as r, preloadQuery as t };
