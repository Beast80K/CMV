export default function manifest() {
	return {
		name: "CryptoMarketVision (CMV)",
		short_name: "CMV",
		description: "Get Trending Coins, NFTs, Categories, Compare Coins, Convert BTC to Currency, Market & DEFI Overview, Global Total Market Cap & Global Total Volume.",
		start_url: "/",
		display: "standalone",
		background_color: "#FFFFFF",
		theme_color: "#EDF1FE",
		icons: [
			{
				"src": "/images/Logo.svg",
				"type": "image/svg+xml",
				"sizes": "1000x1000",
			},
			{
				"src": "/favicons/192x192.png",
				"type": "image/png",
				"sizes": "192x192"
			},
			{
				"src": "/favicons/512x512.png",
				"type": "image/png",
				"sizes": "512x512"
			}
		],
		shortcuts: [
			{
				name: "Home",
				short_name: "Home",
				description: "Get Trending Coins, NFTs, Categories, Compare Coins, Convert BTC to Currency, Market & DEFI Overview, Global Total Market Cap & Global Total Volume.",
				url: "/",
				icons: [{ "src": "/favicons/192x192.png", "sizes": "192x192" }]
			},
			{
				name: "Search",
				short_name: "Home",
				description: "Can't remember exact cryptocurrency name ? Search for it from hundreds of Coins, NFTs, Exchanges & Categories. Get various details about them.",
				url: "/search",
				icons: [{ "src": "/favicons/192x192.png", "sizes": "192x192" }]
			},
			{
				name: "Categories",
				short_name: "Categories",
				description: "Get all coins categories details like Top 3 Coins, Market Cap, 24Hr. Market Cap Change & 24Hr. Volume in USD sorted by Market Cap (descending order).",
				url: "/categories",
				icons: [{ "src": "/favicons/192x192.png", "sizes": "192x192" }]
			},
			{
				name: "Coins",
				short_name: "Coins",
				description: "Coins | Get all the supported coins with Price, Price Change, Market Cap, Market Cap Change Rank, Volume, High-Low, ATH-ATL, FDV, Circulating Supply, ROI etc.",
				url: "/coins",
				icons: [{ "src": "/favicons/192x192.png", "sizes": "192x192" }]
			},
			{
				name: "Derivatives",
				short_name: "Derivatives",
				description: "Get all Derivative exchanges details like 24 Hrs. Trade Volume BTC, No. Of Futures Pairs, Open Interest BTC, Country, Year Est., Perpetuals etc. ",
				url: "/derivatives",
				icons: [{ "src": "/favicons/192x192.png", "sizes": "192x192" }]
			},
			{
				name: "Exchanges",
				short_name: "Exchanges",
				description: "Get all available Exchanges, details like 24 Hrs. Trade Vol in BTC & BTC Normalized, Trust Score & Rank, Country, Year Est., has Trading Incentive etc.",
				url: "/exchanges",
				icons: [{ "src": "/favicons/192x192.png", "sizes": "192x192" }]
			},
			{
				name: "NFTs",
				short_name: "NFTs",
				description: "Shows all available NFTs details Contract Address, NFT IDs, & Asset Platform ID & Chain Identifier, Native Coin ID for Asset Platforms.",
				url: "/nfts",
				icons: [{ "src": "/favicons/192x192.png", "sizes": "192x192" }]
			},
			{
				name: "Watchlist",
				short_name: "Watchlist",
				description: "Keep an eye on coins of your choice, see Price, Price Change, Market Cap & Change, Rank, Volume, High-Low, ATH-ATL, FDV, Circulating Supply, ROI etc.",
				url: "/watchlist",
				icons: [{ "src": "/favicons/192x192.png", "sizes": "192x192" }]
			},
			{
				name: "About Us",
				short_name: "About Us",
				description: "CryptoMarketVision (CMV) is an non-commercial, personal project read more about us, Who we are ? Goal ? Team Members etc. its made by only one person.",
				url: "/about-us",
				icons: [{ "src": "/favicons/192x192.png", "sizes": "192x192" }]
			},
			{
				name: "Attributions",
				short_name: "Attributions",
				description: "We are deeply appreciative, thankful & grateful for all these free resources, your generosity, goodwill & kindness, has made this project possible.",
				url: "/attributions",
				icons: [{ "src": "/favicons/192x192.png", "sizes": "192x192" }]
			}
		],
		screenshots: [
			{
				"src": "/screenshots/wide/Homepg_1-1.png",
				"type": "image/png",
				"sizes": "1920x919",
				"form_factor": "wide"
			},
			{
				"src": "/screenshots/wide/Coins.png",
				"type": "image/png",
				"sizes": "1920x919",
				"form_factor": "wide"
			},
			{
				"src": "/screenshots/wide/Exchanges.png",
				"type": "image/png",
				"sizes": "1920x919",
				"form_factor": "wide"
			},
			{
				"src": "/screenshots/wide/NFTS.png",
				"type": "image/png",
				"sizes": "1920x919",
				"form_factor": "wide"
			},
			{
				"src": "/screenshots/wide/Search.png",
				"type": "image/png",
				"sizes": "1920x919",
				"form_factor": "wide"
			},
			{
				"src": "/screenshots/wide/Watchlist.png",
				"type": "image/png",
				"sizes": "1920x919",
				"form_factor": "wide"
			},
			{
				"src": "/screenshots/wide/Derivatives.png",
				"type": "image/png",
				"sizes": "1920x919",
				"form_factor": "wide"
			},
			{
				"src": "/screenshots/wide/Categories.png",
				"type": "image/png",
				"sizes": "1920x919",
				"form_factor": "wide"
			},
			{
				"src": "/screenshots/narrow/Homepg_1-1.png",
				"type": "image/png",
				"sizes": "370x802",
				"form_factor": "narrow"
			},
			{
				"src": "/screenshots/narrow/Coins.png",
				"type": "image/png",
				"sizes": "370x802",
				"form_factor": "narrow"
			},
			{
				"src": "/screenshots/narrow/Categories.png",
				"type": "image/png",
				"sizes": "370x802",
				"form_factor": "narrow"
			},
			{
				"src": "/screenshots/narrow/Derivatives.png",
				"type": "image/png",
				"sizes": "370x802",
				"form_factor": "narrow"
			},
			{
				"src": "/screenshots/narrow/Exchanges.png",
				"type": "image/png",
				"sizes": "370x802",
				"form_factor": "narrow"
			}
		]
	}
}