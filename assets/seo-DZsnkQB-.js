//#region src/metadata.json
var metadata_default = {
	"default": { "openGraph": {} },
	"/": {
		"title": "Cube3 — Find sponsorships. Find creators.",
		"description": "Cube3 helps creators — including small and regional-language creators — discover relevant sponsorships, and helps brands find creators who match their campaigns.",
		"openGraph": {}
	},
	"/sponsorships": {
		"title": "Find sponsorships for your channel · Cube3",
		"description": "Browse open brand campaigns for YouTubers, Instagram creators, podcasters and bloggers. See budgets, requirements and why you match — then apply.",
		"openGraph": {}
	},
	"/creators": {
		"title": "Find creators for your brand campaign · Cube3",
		"description": "Search YouTube, Instagram and regional-language creators by category, audience, language and location. Verified stats are clearly labelled.",
		"openGraph": {}
	}
};
//#endregion
//#region src/lib/seo.ts
var defaultImage = (metadata_default.default?.openGraph)?.images;
/** Title/description + Open Graph + Twitter tags for one page. */
function pageMeta(p) {
	const title = p.title.slice(0, 70);
	const description = p.description.replace(/\s+/g, " ").trim().slice(0, 160);
	const image = p.image ?? defaultImage;
	const meta = [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: p.type ?? "website"
		},
		{
			property: "og:site_name",
			content: "Cube3"
		},
		{
			name: "twitter:card",
			content: image ? "summary_large_image" : "summary"
		},
		{
			name: "twitter:title",
			content: title
		},
		{
			name: "twitter:description",
			content: description
		}
	];
	if (image) meta.push({
		property: "og:image",
		content: image
	});
	return meta;
}
/** Static route metadata from src/metadata.json (single source of truth). */
function routeMeta(path) {
	const page = metadata_default[path];
	return pageMeta({
		title: page.title,
		description: page.description
	});
}
/** JSON-LD script entry for a route's head(). `<` is escaped so content can't break out of the script tag. */
function jsonLd(data) {
	return {
		type: "application/ld+json",
		children: JSON.stringify(data).replace(/</g, "\\u003c")
	};
}
/** Page not found / private: keep out of search results. */
var noindex = [{
	name: "robots",
	content: "noindex"
}];
//#endregion
export { routeMeta as i, noindex as n, pageMeta as r, jsonLd as t };
