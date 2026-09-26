var CURRENCIES = [
	{
		code: "INR",
		label: "Indian rupee (₹)"
	},
	{
		code: "USD",
		label: "US dollar ($)"
	},
	{
		code: "EUR",
		label: "Euro (€)"
	},
	{
		code: "GBP",
		label: "British pound (£)"
	},
	{
		code: "AED",
		label: "UAE dirham"
	},
	{
		code: "SAR",
		label: "Saudi riyal"
	},
	{
		code: "QAR",
		label: "Qatari riyal"
	},
	{
		code: "KWD",
		label: "Kuwaiti dinar"
	},
	{
		code: "SGD",
		label: "Singapore dollar"
	},
	{
		code: "MYR",
		label: "Malaysian ringgit"
	},
	{
		code: "IDR",
		label: "Indonesian rupiah"
	},
	{
		code: "PHP",
		label: "Philippine peso"
	},
	{
		code: "THB",
		label: "Thai baht"
	},
	{
		code: "VND",
		label: "Vietnamese dong"
	},
	{
		code: "JPY",
		label: "Japanese yen"
	},
	{
		code: "KRW",
		label: "South Korean won"
	},
	{
		code: "CNY",
		label: "Chinese yuan"
	},
	{
		code: "HKD",
		label: "Hong Kong dollar"
	},
	{
		code: "AUD",
		label: "Australian dollar"
	},
	{
		code: "NZD",
		label: "New Zealand dollar"
	},
	{
		code: "CAD",
		label: "Canadian dollar"
	},
	{
		code: "MXN",
		label: "Mexican peso"
	},
	{
		code: "BRL",
		label: "Brazilian real"
	},
	{
		code: "ARS",
		label: "Argentine peso"
	},
	{
		code: "COP",
		label: "Colombian peso"
	},
	{
		code: "CLP",
		label: "Chilean peso"
	},
	{
		code: "PEN",
		label: "Peruvian sol"
	},
	{
		code: "ZAR",
		label: "South African rand"
	},
	{
		code: "NGN",
		label: "Nigerian naira"
	},
	{
		code: "KES",
		label: "Kenyan shilling"
	},
	{
		code: "EGP",
		label: "Egyptian pound"
	},
	{
		code: "MAD",
		label: "Moroccan dirham"
	},
	{
		code: "TRY",
		label: "Turkish lira"
	},
	{
		code: "CHF",
		label: "Swiss franc"
	},
	{
		code: "SEK",
		label: "Swedish krona"
	},
	{
		code: "NOK",
		label: "Norwegian krone"
	},
	{
		code: "DKK",
		label: "Danish krone"
	},
	{
		code: "PLN",
		label: "Polish złoty"
	},
	{
		code: "PKR",
		label: "Pakistani rupee"
	},
	{
		code: "BDT",
		label: "Bangladeshi taka"
	},
	{
		code: "LKR",
		label: "Sri Lankan rupee"
	},
	{
		code: "NPR",
		label: "Nepalese rupee"
	}
];
new Set(CURRENCIES.map((c) => c.code));
/** "₹15,000", "$250", "€1,200" — no decimals; Indian digit grouping for INR. */
function formatMoney(amount, currency = "INR") {
	if (amount === void 0 || amount === null || !Number.isFinite(amount)) return "—";
	const locale = currency === "INR" ? "en-IN" : "en-US";
	try {
		return new Intl.NumberFormat(locale, {
			style: "currency",
			currency,
			maximumFractionDigits: 0
		}).format(amount);
	} catch {
		return `${currency} ${Math.round(amount).toLocaleString("en-US")}`;
	}
}
function formatBudgetRange(min, max, currency = "INR") {
	if (min === void 0 && max === void 0) return "Budget on request";
	if (min !== void 0 && max !== void 0) return `${formatMoney(min, currency)}–${formatMoney(max, currency)}`;
	if (min !== void 0) return `From ${formatMoney(min, currency)}`;
	return `Up to ${formatMoney(max, currency)}`;
}
/** Suggested currency for a brand's country (used as the default in the campaign form). */
function currencyForCountry(country) {
	const c = (country ?? "").trim().toLowerCase();
	return {
		india: "INR",
		"united states": "USD",
		usa: "USD",
		"united kingdom": "GBP",
		uk: "GBP",
		"united arab emirates": "AED",
		uae: "AED",
		"saudi arabia": "SAR",
		qatar: "QAR",
		kuwait: "KWD",
		singapore: "SGD",
		malaysia: "MYR",
		indonesia: "IDR",
		philippines: "PHP",
		thailand: "THB",
		vietnam: "VND",
		japan: "JPY",
		"south korea": "KRW",
		china: "CNY",
		"hong kong": "HKD",
		australia: "AUD",
		"new zealand": "NZD",
		canada: "CAD",
		mexico: "MXN",
		brazil: "BRL",
		argentina: "ARS",
		colombia: "COP",
		chile: "CLP",
		peru: "PEN",
		"south africa": "ZAR",
		nigeria: "NGN",
		kenya: "KES",
		egypt: "EGP",
		morocco: "MAD",
		turkey: "TRY",
		türkiye: "TRY",
		switzerland: "CHF",
		sweden: "SEK",
		norway: "NOK",
		denmark: "DKK",
		poland: "PLN",
		pakistan: "PKR",
		bangladesh: "BDT",
		"sri lanka": "LKR",
		nepal: "NPR",
		germany: "EUR",
		france: "EUR",
		spain: "EUR",
		italy: "EUR",
		netherlands: "EUR",
		ireland: "EUR",
		portugal: "EUR",
		belgium: "EUR",
		austria: "EUR",
		finland: "EUR",
		greece: "EUR"
	}[c] ?? (c ? "USD" : "INR");
}
//#endregion
export { formatMoney as i, currencyForCountry as n, formatBudgetRange as r, CURRENCIES as t };
