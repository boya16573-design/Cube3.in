import "./countries-BNqYBK9b.js";
//#region convex/lib/eventMatching.ts
var EVENT_CATEGORIES = [
	"Technology",
	"Hackathon",
	"AI",
	"Coding",
	"Robotics",
	"Science",
	"Cultural",
	"Music",
	"Sports",
	"Entrepreneurship",
	"Business",
	"Education",
	"Workshop",
	"Conference",
	"Gaming",
	"Arts",
	"Fashion",
	"College Fest",
	"Other"
];
var RELEVANT = {
	Technology: [
		"Technology",
		"Education",
		"Finance",
		"Gaming",
		"Food"
	],
	Hackathon: [
		"Technology",
		"Education",
		"Finance",
		"Food",
		"Gaming"
	],
	AI: [
		"Technology",
		"Education",
		"Finance"
	],
	Coding: [
		"Technology",
		"Education",
		"Finance",
		"Food"
	],
	Robotics: [
		"Technology",
		"Education",
		"Automotive"
	],
	Science: [
		"Technology",
		"Education",
		"Parenting"
	],
	Cultural: [
		"Entertainment",
		"Music",
		"Fashion",
		"Beauty",
		"Food",
		"Lifestyle"
	],
	Music: [
		"Music",
		"Entertainment",
		"Lifestyle",
		"Food",
		"Fashion"
	],
	Sports: [
		"Fitness",
		"Food",
		"Lifestyle",
		"Automotive"
	],
	Entrepreneurship: [
		"Finance",
		"Technology",
		"Education"
	],
	Business: [
		"Finance",
		"Technology",
		"Education"
	],
	Education: [
		"Education",
		"Technology",
		"Finance"
	],
	Workshop: ["Education", "Technology"],
	Conference: [
		"Technology",
		"Finance",
		"Education"
	],
	Gaming: [
		"Gaming",
		"Technology",
		"Food",
		"Entertainment"
	],
	Arts: [
		"Lifestyle",
		"Fashion",
		"Entertainment",
		"Education"
	],
	Fashion: [
		"Fashion",
		"Beauty",
		"Lifestyle"
	],
	"College Fest": [
		"Food",
		"Entertainment",
		"Fashion",
		"Beauty",
		"Technology",
		"Lifestyle",
		"Music"
	],
	Other: ["General"]
};
function relevantIndustries(eventCategory) {
	return RELEVANT[eventCategory] ?? RELEVANT.Other;
}
//#endregion
export { relevantIndustries as n, EVENT_CATEGORIES as t };
