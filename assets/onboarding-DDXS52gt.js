const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/onboarding-DxygHt9c.js","assets/api-D74LnTM3.js","assets/useNavigate-BFWl-dPi.js","assets/app-shell-CtDeXJqm.js","assets/dist-CXIX0U2y.js","assets/cube3-DuAq7Ab3.js","assets/label-Da9P26Y4.js","assets/dist-kfylwfzP.js","assets/input-C91OdWl8.js","assets/textarea-DwJpEbSB.js","assets/language-picker-0bZF-D4m.js","assets/plus-Cf1jeTYa.js","assets/x-BzRkyuW7.js"])))=>i.map(i=>d[i]);
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-Bf8EG7_X.js";
//#region src/routes/onboarding.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./onboarding-DxygHt9c.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]));
var Route = createFileRoute("/onboarding")({
	validateSearch: (s) => ({ role: s.role === "brand" ? "brand" : s.role === "creator" ? "creator" : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
