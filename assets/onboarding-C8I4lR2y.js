const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/onboarding-cWp5ly3y.js","assets/button-BKP2MwRw.js","assets/useNavigate-DGvAM-7K.js","assets/app-shell-GoO9XvM6.js","assets/video-BysRo96f.js","assets/dist-Dfgjbbc_.js","assets/cube3-xqG2XCU7.js","assets/money-B2xGNqWK.js","assets/label-DdaoZkXu.js","assets/dist-DFw2Gqjt.js","assets/input-BQJAkDLz.js","assets/textarea-CLFmgltT.js","assets/country-picker-T_YB6ZlU.js","assets/x-CskuAKXe.js","assets/countries-BNqYBK9b.js","assets/language-picker-BBfdKGRx.js","assets/plus-BzcJQXl5.js","assets/eventMatching--BdHk_j6.js"])))=>i.map(i=>d[i]);
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-DLkEpAoA.js";
//#region src/routes/onboarding.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./onboarding-cWp5ly3y.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]));
var Route = createFileRoute("/onboarding")({
	validateSearch: (s) => ({ role: s.role === "brand" ? "brand" : s.role === "creator" ? "creator" : s.role === "organizer" ? "organizer" : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
