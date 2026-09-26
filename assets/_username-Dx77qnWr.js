const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/_username--y-l0W7l.js","assets/api-DJqU9p-G.js","assets/app-shell-BzN9KHqO.js","assets/hydration-BRMOaqr7.js","assets/badge-check-grlmTD77.js","assets/map-pin-DphV8733.js","assets/cube3-BhcyVTyu.js","assets/avatar-BDLdAEYl.js","assets/dist-Cju310VN.js","assets/dist-B9Fhx2B8.js"])))=>i.map(i=>d[i]);
import { t as api } from "./api-DJqU9p-G.js";
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-NnyMBpRV.js";
import { a as pageMeta, i as noindex, n as preloadedQueryResult, t as preloadQuery } from "./convex-Bpwy_uLM.js";
import { l as platformLabel, o as formatCount } from "./cube3-BhcyVTyu.js";
//#region src/routes/kit/$username.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./_username--y-l0W7l.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]));
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
