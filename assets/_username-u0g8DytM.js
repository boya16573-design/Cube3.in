const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/_username-DnWjYD5_.js","assets/button-BKP2MwRw.js","assets/app-shell-GoO9XvM6.js","assets/hydration-CjQq9zIR.js","assets/badge-check-B7Ly22Tv.js","assets/save-creator-button-mp9C7qbq.js","assets/useNavigate-DGvAM-7K.js","assets/dist-Dfgjbbc_.js","assets/dialog-P9E-Q0K0.js","assets/x-CskuAKXe.js","assets/dist-DFw2Gqjt.js","assets/dist-Dxs9K5-d.js","assets/dist-DIbNEpwj.js","assets/dist-Dd8Fivrx.js","assets/textarea-CLFmgltT.js","assets/external-link-r8XcJ03L.js","assets/map-pin-BGNVwcBY.js","assets/cube3-xqG2XCU7.js","assets/money-B2xGNqWK.js","assets/avatar-D0aA7E3h.js","assets/badge-Xcdv_DZw.js"])))=>i.map(i=>d[i]);
import { s as api } from "./button-BKP2MwRw.js";
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-DLkEpAoA.js";
import { n as noindex, r as pageMeta, t as jsonLd } from "./seo-DZsnkQB-.js";
import { n as preloadedQueryResult, t as preloadQuery } from "./convex-De_lXK8x.js";
import { l as platformLabel } from "./cube3-xqG2XCU7.js";
//#region src/routes/c/$username.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./_username-DnWjYD5_.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]));
var Route = createFileRoute("/c/$username")({
	loader: async ({ params }) => ({ preloaded: await preloadQuery(api.creators.getByUsername, { username: params.username }) }),
	head: ({ loaderData }) => {
		const c = loaderData ? preloadedQueryResult(loaderData.preloaded) : null;
		if (!c) return { meta: [...pageMeta({
			title: "Creator not found · Cube3",
			description: "This creator profile doesn't exist or is no longer available on Cube3."
		}), ...noindex] };
		const platforms = c.accounts.map((a) => platformLabel(a.platform)).join(", ");
		const place = [c.city, c.country].filter(Boolean).join(", ");
		const description = c.bio?.trim() ? c.bio : `${c.displayName} is a ${c.category} creator${place ? ` from ${place}` : ""}${platforms ? ` on ${platforms}` : ""}${c.languages.length ? `, creating in ${c.languages.slice(0, 3).join(", ")}` : ""}. Work with them on Cube3.`;
		return {
			meta: pageMeta({
				title: `${c.displayName} (@${c.username}) · ${c.category} creator · Cube3`,
				description,
				image: c.avatarUrl,
				type: "profile"
			}),
			scripts: [jsonLd({
				"@context": "https://schema.org",
				"@type": "ProfilePage",
				mainEntity: {
					"@type": "Person",
					name: c.displayName,
					alternateName: `@${c.username}`,
					description,
					...c.avatarUrl ? { image: c.avatarUrl } : {},
					...c.accounts.some((a) => a.url) ? { sameAs: c.accounts.map((a) => a.url).filter(Boolean) } : {},
					knowsLanguage: c.languages
				}
			})]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
