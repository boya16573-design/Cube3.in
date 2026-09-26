const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/onboarding-BKWrR514.js","assets/api-DJqU9p-G.js","assets/useNavigate-_yYfcLdj.js","assets/app-shell-BzN9KHqO.js","assets/dist-B6VFZ26f.js","assets/cube3-BhcyVTyu.js","assets/label-BFLP22M6.js","assets/dist-Cju310VN.js","assets/input-DAWToyPJ.js","assets/textarea-Du1JR257.js","assets/country-picker-DM07ioWK.js","assets/x-L6wRmoZC.js","assets/language-picker-DF0mbcBd.js","assets/plus-CpSjG8JO.js"])))=>i.map(i=>d[i]);
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-NnyMBpRV.js";
//#region src/routes/onboarding.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./onboarding-BKWrR514.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13]));
var Route = createFileRoute("/onboarding")({
	validateSearch: (s) => ({ role: s.role === "brand" ? "brand" : s.role === "creator" ? "creator" : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
