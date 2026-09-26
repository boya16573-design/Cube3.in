const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/_username-ebaEUsxB.js","assets/button-BKP2MwRw.js","assets/app-shell-GoO9XvM6.js","assets/hydration-CjQq9zIR.js","assets/badge-check-B7Ly22Tv.js","assets/download-lzFXaVzR.js","assets/map-pin-BGNVwcBY.js","assets/cube3-xqG2XCU7.js","assets/money-B2xGNqWK.js","assets/avatar-D0aA7E3h.js","assets/dist-DFw2Gqjt.js","assets/dist-Dxs9K5-d.js","assets/dist-Dd8Fivrx.js"])))=>i.map(i=>d[i]);
import { s as api } from "./button-BKP2MwRw.js";
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-DLkEpAoA.js";
import { n as noindex, r as pageMeta } from "./seo-DZsnkQB-.js";
import { n as preloadedQueryResult, t as preloadQuery } from "./convex-De_lXK8x.js";
import { l as platformLabel, o as formatCount } from "./cube3-xqG2XCU7.js";
//#region src/routes/kit/$username.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./_username-ebaEUsxB.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]));
var Route = createFileRoute("/kit/$username")({
	loader: async ({ params }) => ({ preloaded: await preloadQuery(api.mediaKit.get, { username: params.username }) }),
	head: ({ loaderData }) => {
		const k = loaderData ? preloadedQueryResult(loaderData.preloaded) : null;
		if (!k) return { meta: [...pageMeta({
			title: "Media kit not found · Cube3",
			description: "This media kit doesn't exist or is no longer available on Cube3."
		}), ...noindex] };
		const c = k.creator;
		return { meta: pageMeta({
			title: `${c.displayName} media kit · ${c.category} creator · Cube3`,
			description: `Sponsorship media kit for ${c.displayName} (@${c.username}): ${formatCount(c.totalFollowers)} total audience, ${c.accounts.map((a) => platformLabel(a.platform)).join(", ") || "platforms"}, ${k.completedCollaborations} completed Cube3 collaborations.`,
			image: c.avatarUrl,
			type: "profile"
		}) };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
