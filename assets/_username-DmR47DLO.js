const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/_username-B3Lz8g98.js","assets/api-D74LnTM3.js","assets/app-shell-CtDeXJqm.js","assets/hydration-Bnl31goM.js","assets/badge-check-B3dBneY_.js","assets/save-creator-button-CN41vFFe.js","assets/useNavigate-BFWl-dPi.js","assets/dist-CXIX0U2y.js","assets/dialog-Bw6NbjqL.js","assets/x-BzRkyuW7.js","assets/dist-kfylwfzP.js","assets/dist-BF5gvTxC.js","assets/textarea-DwJpEbSB.js","assets/external-link-jbjCWyxj.js","assets/map-pin-SfivTVGZ.js","assets/cube3-DuAq7Ab3.js","assets/avatar-D_UKrJsR.js","assets/badge-Ck0JGcps.js"])))=>i.map(i=>d[i]);
import { t as api } from "./api-D74LnTM3.js";
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-Bf8EG7_X.js";
import { a as pageMeta, i as noindex, n as preloadedQueryResult, r as jsonLd, t as preloadQuery } from "./convex-dQtcbM-P.js";
import { l as platformLabel } from "./cube3-DuAq7Ab3.js";
//#region src/routes/c/$username.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./_username-B3Lz8g98.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]));
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
