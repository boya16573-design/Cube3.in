const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/event-sponsors-DkGQyw4z.js","assets/button-BKP2MwRw.js","assets/useNavigate-DGvAM-7K.js","assets/app-shell-GoO9XvM6.js","assets/badge-check-B7Ly22Tv.js","assets/campaign-card-4B6i36Pt.js","assets/check-DfHdiYc8.js","assets/map-pin-BGNVwcBY.js","assets/x-CskuAKXe.js","assets/cube3-xqG2XCU7.js","assets/money-B2xGNqWK.js","assets/badge-Xcdv_DZw.js","assets/info-D99mXMow.js","assets/dist-Dfgjbbc_.js","assets/dialog-P9E-Q0K0.js","assets/dist-DFw2Gqjt.js","assets/dist-Dxs9K5-d.js","assets/dist-DIbNEpwj.js","assets/dist-Dd8Fivrx.js","assets/label-DdaoZkXu.js","assets/event-card-BSHjCeD3.js","assets/countries-BNqYBK9b.js","assets/input-BQJAkDLz.js","assets/textarea-CLFmgltT.js","assets/eventMatching--BdHk_j6.js"])))=>i.map(i=>d[i]);
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-DLkEpAoA.js";
import { n as noindex } from "./seo-DZsnkQB-.js";
//#region src/routes/event-sponsors.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./event-sponsors-DkGQyw4z.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]));
var Route = createFileRoute("/event-sponsors")({
	validateSearch: (s) => ({ event: typeof s.event === "string" ? s.event : void 0 }),
	head: () => ({ meta: [{ title: "Find event sponsors · Cube3" }, ...noindex] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
