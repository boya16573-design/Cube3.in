const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/_username-9z3Zuaj3.js","assets/api-DJqU9p-G.js","assets/app-shell-BzN9KHqO.js","assets/hydration-BRMOaqr7.js","assets/badge-check-grlmTD77.js","assets/save-creator-button-CtJtCU8m.js","assets/useNavigate-_yYfcLdj.js","assets/dist-B6VFZ26f.js","assets/dialog-3eGq8AQc.js","assets/x-L6wRmoZC.js","assets/dist-Cju310VN.js","assets/dist-B9Fhx2B8.js","assets/textarea-Du1JR257.js","assets/external-link-Iz_tt-8E.js","assets/map-pin-DphV8733.js","assets/cube3-BhcyVTyu.js","assets/avatar-BDLdAEYl.js","assets/badge-DLAy27x2.js"])))=>i.map(i=>d[i]);
import { t as api } from "./api-DJqU9p-G.js";
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-NnyMBpRV.js";
import { a as pageMeta, i as noindex, n as preloadedQueryResult, r as jsonLd, t as preloadQuery } from "./convex-Bpwy_uLM.js";
import { l as platformLabel } from "./cube3-BhcyVTyu.js";
//#region src/routes/c/$username.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./_username-9z3Zuaj3.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]));
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
