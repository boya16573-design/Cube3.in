const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/signin-SxodB_gX.js","assets/button-BKP2MwRw.js","assets/useNavigate-DGvAM-7K.js","assets/app-shell-GoO9XvM6.js","assets/dist-Dfgjbbc_.js","assets/label-DdaoZkXu.js","assets/dist-DFw2Gqjt.js","assets/input-BQJAkDLz.js"])))=>i.map(i=>d[i]);
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-DLkEpAoA.js";
//#region src/routes/signin.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./signin-SxodB_gX.js"), __vite__mapDeps([0,1,2,3,4,5,6,7]));
var Route = createFileRoute("/signin")({
	validateSearch: (s) => ({ role: s.role === "brand" ? "brand" : s.role === "creator" ? "creator" : s.role === "organizer" ? "organizer" : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
