const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/_username-Bhib1r5s.js","assets/api-D74LnTM3.js","assets/app-shell-CtDeXJqm.js","assets/hydration-Bnl31goM.js","assets/badge-check-B3dBneY_.js","assets/map-pin-SfivTVGZ.js","assets/cube3-DuAq7Ab3.js","assets/avatar-D_UKrJsR.js","assets/dist-kfylwfzP.js","assets/dist-BF5gvTxC.js"])))=>i.map(i=>d[i]);
import { t as api } from "./api-D74LnTM3.js";
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-Bf8EG7_X.js";
import { a as pageMeta, i as noindex, n as preloadedQueryResult, t as preloadQuery } from "./convex-dQtcbM-P.js";
import { l as platformLabel, o as formatCount } from "./cube3-DuAq7Ab3.js";
//#region src/routes/kit/$username.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./_username-Bhib1r5s.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]));
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
