const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/_campaignId-BEAyB1mw.js","assets/api-DJqU9p-G.js","assets/useNavigate-_yYfcLdj.js","assets/app-shell-BzN9KHqO.js","assets/hydration-BRMOaqr7.js","assets/badge-check-grlmTD77.js","assets/save-creator-button-CtJtCU8m.js","assets/dist-B6VFZ26f.js","assets/dialog-3eGq8AQc.js","assets/x-L6wRmoZC.js","assets/dist-Cju310VN.js","assets/dist-B9Fhx2B8.js","assets/textarea-Du1JR257.js","assets/campaign-card-C_ZyglTr.js","assets/check-DDLBuiCX.js","assets/map-pin-DphV8733.js","assets/cube3-BhcyVTyu.js","assets/badge-DLAy27x2.js","assets/apply-helpers-DrNiHFJO.js","assets/info-D-wkdiP_.js","assets/sparkles-CQSfE9JT.js","assets/label-BFLP22M6.js","assets/input-DAWToyPJ.js","assets/creator-card-BbRuZEit.js","assets/avatar-BDLdAEYl.js"])))=>i.map(i=>d[i]);
import { t as api } from "./api-DJqU9p-G.js";
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-NnyMBpRV.js";
import { a as pageMeta, i as noindex, n as preloadedQueryResult, t as preloadQuery } from "./convex-Bpwy_uLM.js";
import { a as formatBudget, l as platformLabel } from "./cube3-BhcyVTyu.js";
//#region src/routes/campaigns/$campaignId.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./_campaignId-BEAyB1mw.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]));
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
			description: `${c.brandName} is looking for ${c.category} creators on ${c.platforms.map(platformLabel).join(", ")}${c.targetLocation ? ` (${c.targetLocation})` : ""}. Budget: ${formatBudget(c.budgetMinInr, c.budgetMaxInr, c.currency)}. Apply on Cube3.`,
			type: "article"
		}) };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Public, server-rendered campaign summary (what crawlers and link previews see). */
//#endregion
export { Route as t };
