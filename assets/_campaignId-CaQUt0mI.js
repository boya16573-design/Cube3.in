const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/_campaignId-FF3bledl.js","assets/button-BKP2MwRw.js","assets/useNavigate-DGvAM-7K.js","assets/app-shell-GoO9XvM6.js","assets/hydration-CjQq9zIR.js","assets/badge-check-B7Ly22Tv.js","assets/save-creator-button-mp9C7qbq.js","assets/dist-Dfgjbbc_.js","assets/dialog-P9E-Q0K0.js","assets/x-CskuAKXe.js","assets/dist-DFw2Gqjt.js","assets/dist-Dxs9K5-d.js","assets/dist-DIbNEpwj.js","assets/dist-Dd8Fivrx.js","assets/textarea-CLFmgltT.js","assets/campaign-card-4B6i36Pt.js","assets/check-DfHdiYc8.js","assets/map-pin-BGNVwcBY.js","assets/cube3-xqG2XCU7.js","assets/money-B2xGNqWK.js","assets/badge-Xcdv_DZw.js","assets/report-dialog-Da0j6I8b.js","assets/label-DdaoZkXu.js","assets/input-BQJAkDLz.js","assets/creator-card-B7Sq5Wba.js","assets/avatar-D0aA7E3h.js","assets/apply-helpers-AlRB4UGk.js","assets/info-D99mXMow.js","assets/sparkles-CLlQowi6.js"])))=>i.map(i=>d[i]);
import { s as api } from "./button-BKP2MwRw.js";
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-DLkEpAoA.js";
import { n as noindex, r as pageMeta } from "./seo-DZsnkQB-.js";
import { n as preloadedQueryResult, t as preloadQuery } from "./convex-De_lXK8x.js";
import { a as formatBudget, l as platformLabel } from "./cube3-xqG2XCU7.js";
//#region src/routes/campaigns/$campaignId.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./_campaignId-FF3bledl.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]));
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
