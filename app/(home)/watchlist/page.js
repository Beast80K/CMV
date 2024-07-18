import dynamic from "next/dynamic";
const WatchList = dynamic(() => import("@/app/components/WatchList/WatchList"))


export default function WatchListPg() {
	return <WatchList />
}

export const metadata = {

	title: 'Watchlist - Add coins to a list & keep track of them',
	alternates: {
		canonical: '/watchlist',
	},

	description: 'Keep an eye on coins of your choice, see Price, Price Change, Market Cap & Change, Rank, Volume, High-Low, ATH-ATL, FDV, Circulating Supply, ROI etc.',
	keywords: ['watchlist', 'cmv watchlist', 'watchlist cmv', 'CryptoMarketVision', 'CryptoMarketVision (CMV)', 'cmv'],

	openGraph: {
		title: 'Watchlist - Add coins to a list & keep track of them',
		description: 'Keep an eye on coins of your choice, see Price, Price Change, Market Cap & Change, Rank, Volume, High-Low, ATH-ATL, FDV, Circulating Supply, ROI etc.',

		siteName: 'CryptoMarketVision',
		images: [
			{
				url: `/images/Logo.png`,
				width: 600,
				height: 600,
			},
			{
				url: `/images/Logo.png`,
				width: 1600,
				height: 1600,
				alt: 'CryptoMarketVision (CMV)',
			},
		],
		locale: 'en_US',
		type: 'website',
	},

	twitter: {
		card: 'summary_large_image',
		title: 'Watchlist - Add coins to a list & keep track of them',
		description: 'Keep an eye on coins of your choice, see Price, Price Change, Market Cap & Change, Rank, Volume, High-Low, ATH-ATL, FDV, Circulating Supply, ROI etc.',
		creator: 'CryptoMarketVision',
		images: [`/images/Logo.png`,],
	},

	applicationName: "CryptoMarketVision (CMV)",
	authors: [{ name: "CryptoMarketVision (CMV)" }],
	generator: 'CryptoMarketVision (CMV)',
	creator: 'CryptoMarketVision (CMV)',
	publisher: 'CryptoMarketVision (CMV)',
	category: 'technology',

	robots: {
		index: true,
		follow: false,
		nocache: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
}