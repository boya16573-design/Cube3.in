import { i as formatMoney, r as formatBudgetRange } from "./money-B2xGNqWK.js";
//#region src/lib/cube3.ts
var CATEGORIES = [
	"Technology",
	"Gaming",
	"Education",
	"Lifestyle",
	"Beauty",
	"Fashion",
	"Food",
	"Fitness",
	"Travel",
	"Finance",
	"Entertainment",
	"Music",
	"Parenting",
	"Automotive",
	"General"
];
var PLATFORMS = [
	{
		id: "youtube",
		label: "YouTube"
	},
	{
		id: "instagram",
		label: "Instagram"
	},
	{
		id: "tiktok",
		label: "TikTok"
	},
	{
		id: "blog",
		label: "Blog"
	},
	{
		id: "podcast",
		label: "Podcast"
	},
	{
		id: "other",
		label: "Other"
	}
];
var platformLabel = (id) => PLATFORMS.find((p) => p.id === id)?.label ?? id;
var CONTENT_TYPES = [
	"Reviews",
	"Tutorials",
	"Vlogs",
	"Shorts / Reels",
	"Unboxing",
	"Long-form",
	"Livestreams",
	"Podcasts",
	"Articles"
];
/** Money in a given currency (default INR, for older campaigns). */
function formatInr(n, currency = "INR") {
	return formatMoney(n, currency);
}
function formatBudget(min, max, currency = "INR") {
	return formatBudgetRange(min, max, currency);
}
function formatCount(n) {
	if (!n) return "0";
	if (n >= 1e6) return `${(n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1)}M`;
	if (n >= 1e3) return `${(n / 1e3).toFixed(n % 1e3 === 0 ? 0 : 1)}K`;
	return String(n);
}
function formatDate(ms) {
	if (!ms) return "—";
	return new Date(ms).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function daysLeft(ms) {
	if (!ms) return null;
	const d = Math.ceil((ms - Date.now()) / 864e5);
	if (d < 0) return "Closed";
	if (d === 0) return "Closes today";
	return `${d} day${d === 1 ? "" : "s"} left`;
}
//#endregion
export { formatBudget as a, formatInr as c, daysLeft as i, platformLabel as l, CONTENT_TYPES as n, formatCount as o, PLATFORMS as r, formatDate as s, CATEGORIES as t };
