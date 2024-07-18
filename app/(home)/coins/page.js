
import dynamic from "next/dynamic";
const CoinHomeTabs = dynamic(() => import("@/app/components/Coin/CoinHomeTabs/CoinHomeTabs"))

export default function page() {
	return (
		<div>
			<CoinHomeTabs />
		</div>
	);
}

export const metadata = {

	title: "Coins - Get all the supported coins related data",

	description: `Coins | Get all the supported coins with Price, Price Change, Market Cap, Market Cap Change Rank, Volume, High-Low, ATH-ATL, FDV, Circulating Supply, ROI etc.`,

	keywords: ['crypto', 'coin', 'coins', 'crypto coins', 'crypto categories',
		'crypto currencies', 'coins market cap', 'CryptoMarketVision coins',
		'CryptoMarketVision (CMV)', 'price', 'price change', 'market cap',
		'market cap change rank', 'volume', 'high-low', 'ath-atl', 'fdv', 'circulating supply', 'roi',
		'cmv coins',],
	alternates: {
		canonical: '/coins',
	},
	openGraph: {
		title: 'Coins - Get all the supported coins related data',
		description: `Coins | Get all the supported coins with Price, Price Change, Market Cap, Market Cap Change Rank, Volume, High-Low, ATH-ATL, FDV, Circulating Supply, ROI etc.`,


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
		title: 'Coins - Get all the supported coins related data',
		description: `Coins | Get all the supported coins with Price, Price Change, Market Cap, Market Cap Change Rank, Volume, High-Low, ATH-ATL, FDV, Circulating Supply, ROI etc.`,

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
