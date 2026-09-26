const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/signin-CIQ69ZET.js","assets/api-DJqU9p-G.js","assets/useNavigate-_yYfcLdj.js","assets/app-shell-BzN9KHqO.js","assets/dist-B6VFZ26f.js","assets/label-BFLP22M6.js","assets/dist-Cju310VN.js","assets/input-DAWToyPJ.js"])))=>i.map(i=>d[i]);
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-NnyMBpRV.js";
//#region src/routes/signin.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./signin-CIQ69ZET.js"), __vite__mapDeps([0,1,2,3,4,5,6,7]));
var Route = createFileRoute("/signin")({
	validateSearch: (s) => ({ role: s.role === "brand" ? "brand" : s.role === "creator" ? "creator" : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
