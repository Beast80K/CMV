
import dynamic from "next/dynamic";
const Categories = dynamic(() => import("@/app/components/Categories/Categories"))


export default function CategoriesPage() {
	return (
		<div>
			<Categories />
		</div>
	);
}


export const metadata = {

	title: 'Categories | Get all the coins categories with Mkt. data',
	description: 'Get all coins categories details like Top 3 Coins, Market Cap, 24Hr. Market Cap Change & 24Hr. Volume in USD sorted by Market Cap (descending order).',


	alternates: {
		canonical: '/categories',
	},
	openGraph: {
		title: 'Categories | Get all the coins categories with Mkt. data',
		description: 'Get all coins categories details like Top 3 Coins, Market Cap, 24Hr. Market Cap Change & 24Hr. Volume in USD.',

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
		title: 'Categories | Get all the coins categories with Mkt. data',
		description: 'Get all coins categories details like Top 3 Coins, Market Cap, 24Hr. Market Cap Change & 24Hr. Volume in USD sorted by Market Cap (descending order).',
		creator: 'CryptoMarketVision',
		images: [`/images/Logo.png`,],
	},
	keywords: ['crypto', 'coin', 'coins', 'crypto coins', 'exchange', 'crypto categories', 'crypto currencies', 'categories market cap', 'cryptocurrency categories', 'CryptoMarketVision', 'CryptoMarketVision (CMV)', 'cmv categories', 'categories volume',],


	applicationName: "CryptoMarketVision (CMV)",
	authors: [{ name: "CryptoMarketVision (CMV)" }],
	generator: 'CryptoMarketVision (CMV)',
	creator: 'CryptoMarketVision (CMV)',
	publisher: 'CryptoMarketVision (CMV)',
	category: 'technology',

	robots: {
		index: true,
		follow: false,
		nocache: false,
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