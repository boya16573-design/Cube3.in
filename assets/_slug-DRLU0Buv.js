const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/_slug-BngMOHyL.js","assets/button-BKP2MwRw.js","assets/useNavigate-DGvAM-7K.js","assets/app-shell-GoO9XvM6.js","assets/hydration-CjQq9zIR.js","assets/organizer-verification-gptsUyfM.js","assets/badge-check-B7Ly22Tv.js","assets/dist-Dfgjbbc_.js","assets/dialog-P9E-Q0K0.js","assets/x-CskuAKXe.js","assets/dist-DFw2Gqjt.js","assets/dist-Dxs9K5-d.js","assets/dist-DIbNEpwj.js","assets/dist-Dd8Fivrx.js","assets/label-DdaoZkXu.js","assets/input-BQJAkDLz.js","assets/textarea-CLFmgltT.js","assets/download-lzFXaVzR.js","assets/external-link-r8XcJ03L.js","assets/report-dialog-Da0j6I8b.js","assets/map-pin-BGNVwcBY.js","assets/money-B2xGNqWK.js","assets/cube3-xqG2XCU7.js","assets/badge-Xcdv_DZw.js","assets/countries-BNqYBK9b.js","assets/event-card-BSHjCeD3.js","assets/campaign-card-4B6i36Pt.js","assets/check-DfHdiYc8.js"])))=>i.map(i=>d[i]);
import { s as api } from "./button-BKP2MwRw.js";
import { n as lazyRouteComponent, r as createFileRoute, t as __vitePreload } from "./preload-helper-DLkEpAoA.js";
import { n as noindex, r as pageMeta, t as jsonLd } from "./seo-DZsnkQB-.js";
import { n as preloadedQueryResult, t as preloadQuery } from "./convex-De_lXK8x.js";
import { r as formatBudgetRange } from "./money-B2xGNqWK.js";
import { i as formatEventDate } from "./event-card-BSHjCeD3.js";
//#region src/routes/events/$slug.tsx
var $$splitComponentImporter = () => __vitePreload(() => import("./_slug-BngMOHyL.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]));
var Route = createFileRoute("/events/$slug")({
	loader: async ({ params }) => ({ preloaded: await preloadQuery(api.events.getBySlug, { slug: params.slug }) }),
	head: ({ loaderData }) => {
		const r = loaderData ? preloadedQueryResult(loaderData.preloaded) : null;
		if (!r) return { meta: [...pageMeta({
			title: "Event not found · Cube3",
			description: "This event doesn't exist or is no longer listed on Cube3."
		}), ...noindex] };
		const e = r.event;
		const place = [
			e.institution,
			e.city,
			e.country
		].filter(Boolean).join(", ");
		const description = `${e.name}${place ? ` at ${place}` : ""} on ${formatEventDate(e.eventDate)}. ${e.category} event seeking sponsors: ${formatBudgetRange(e.sponsorshipMin, e.sponsorshipMax, e.currency)}. ${e.description}`;
		const attendance = e.mode === "online" ? "OnlineEventAttendanceMode" : e.mode === "hybrid" ? "MixedEventAttendanceMode" : "OfflineEventAttendanceMode";
		return {
			meta: [...pageMeta({
				title: `${e.name} — sponsorship opportunity · Cube3`,
				description,
				image: e.bannerUrl,
				type: "article"
			}), ...e.status === "draft" ? noindex : []],
			scripts: [jsonLd({
				"@context": "https://schema.org",
				"@type": "Event",
				name: e.name,
				description: e.description.slice(0, 500),
				startDate: e.eventDate,
				eventAttendanceMode: `https://schema.org/${attendance}`,
				eventStatus: e.status === "cancelled" ? "https://schema.org/EventCancelled" : "https://schema.org/EventScheduled",
				...e.bannerUrl ? { image: [e.bannerUrl] } : {},
				...e.mode !== "online" && place ? { location: {
					"@type": "Place",
					name: e.institution ?? place,
					address: {
						"@type": "PostalAddress",
						addressLocality: e.city,
						addressRegion: e.state,
						addressCountry: e.country
					}
				} } : e.website ? { location: {
					"@type": "VirtualLocation",
					url: e.website
				} } : {},
				organizer: {
					"@type": "Organization",
					name: e.organizer.organizationName,
					...e.organizer.website ? { url: e.organizer.website } : {}
				}
			})]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
