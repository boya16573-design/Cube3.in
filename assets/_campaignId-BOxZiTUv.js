const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/_campaignId-BLxyUaUz.js","assets/api-D74LnTM3.js","assets/useNavigate-BFWl-dPi.js","assets/app-shell-CtDeXJqm.js","assets/hydration-Bnl31goM.js","assets/badge-check-B3dBneY_.js","assets/save-creator-button-CN41vFFe.js","assets/dist-CXIX0U2y.js","assets/dialog-Bw6NbjqL.js","assets/x-BzRkyuW7.js","assets/dist-kfylwfzP.js","assets/dist-BF5gvTxC.js","assets/textarea-DwJpEbSB.js","assets/campaign-card-uuj6bXXJ.js","assets/check-B3VULEwV.js","assets/map-pin-SfivTVGZ.js","assets/cube3-DuAq7Ab3.js","assets/badge-Ck0JGcps.js","assets/apply-helpers-DAytj7Cl.js","assets/info-Di6Fp7iY.js","assets/sparkles-CVCqxAfJ.js","assets/label-Da9P26Y4.js","assets/input-C91OdWl8.js","assets/creator-card-Gud09CjH.js","assets/avatar-D_UKrJsR.js"])))=>i.map(i=>d[i]);
import { t as api } from "./api-D74LnTM3.js";
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-Bf8EG7_X.js";
import { a as pageMeta, i as noindex, n as preloadedQueryResult, t as preloadQuery } from "./convex-dQtcbM-P.js";
import { a as formatBudget, l as platformLabel } from "./cube3-DuAq7Ab3.js";
//#region src/routes/campaigns/$campaignId.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./_campaignId-BLxyUaUz.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]));
var Route = createFileRoute("/campaigns/$campaignId")({
	loader: async ({ params }) => ({ summary: await preloadQuery(api.campaigns.publicSummary, { campaignId: params.campaignId }) }),
	head: ({ loaderData }) => {
		const c = loaderData ? preloadedQueryResult(loaderData.summary) : null;
		if (!c) return { meta: [...pageMeta({
			title: "Campaign not available · Cube3",
			description: "This sponsorship campaign is closed or no longer available on Cube3. Browse other open campaigns."
		}), ...noindex] };
		return { meta: pageMeta({
			title: `${c.title} · ${c.brandName} sponsorship · Cube3`,
			description: `${c.brandName} is looking for ${c.category} creators on ${c.platforms.map(platformLabel).join(", ")}${c.targetLocation ? ` (${c.targetLocation})` : ""}. Budget: ${formatBudget(c.budgetMinInr, c.budgetMaxInr)}. Apply on Cube3.`,
			type: "article"
		}) };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Public, server-rendered campaign summary (what crawlers and link previews see). */
//#endregion
export { Route as t };
