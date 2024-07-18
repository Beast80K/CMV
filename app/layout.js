import './globals.css'
import Providers from './components/Providers/Providers'
import { Noto_Sans } from 'next/font/google'
import GetCananicalURL from './utils/URL/GetCananicalURL'

const NotoFont = Noto_Sans({
	weight: ["variable"],
	subsets: ["cyrillic", "cyrillic-ext", "devanagari", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
	variable: '--font-Noto',
	display: "swap"
})

export const metadata = {
	title: "Home - Trending Coins, NFTs, Categories, Compare Coins & more",
	description: 'Get Trending Coins, NFTs, Categories, Compare Coins, Convert BTC to Currency, Market & DEFI Overview, Global Total Market Cap & Global Total Volume.',
	icons: [
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: '/favicons/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			url: '/favicons/favicon-16x16.png',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			url: '/favicons/apple-touch-icon.png',
		},
	],
	metadataBase: new URL(GetCananicalURL()),
	alternates: {
		canonical: new URL(GetCananicalURL()),
	},
	openGraph: {
		title: 'Home - Trending Coins, NFTs, Categories, Compare Coins & more',
		description: 'Get Trending Coins, NFTs, Categories, Compare Coins, Convert BTC to Currency, Market & DEFI Overview, Global Total Market Cap & Global Total Volume.',
		url: GetCananicalURL(),
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
		title: 'Home - Trending Coins, NFTs, Categories, Compare Coins & more',
		description: 'Get Trending Coins, NFTs, Categories, Compare Coins, Convert BTC to Currency, Market & DEFI Overview, Global Total Market Cap & Global Total Volume.',
		creator: 'CryptoMarketVision',
		images: [`/images/Logo.png`,],
	},
	keywords: ['crypto', 'coin', 'coins', 'crypto coins', 'exchange', 'crypto exchange', 'defi', 'defi crypto',
		'cryptocurrency', 'crypto currencies', 'crypto market', 'blockchain', 'nft', 'nfts', 'market cap', "defi to eth ratio",
		'crypto market cap', 'cryptocurrency price', 'crypto price', 'cryptocurrencies', 'trading volume', "defi market cap",
		"defi dominance", "top coin name", "market overview", "total market cap",
		'exchanges', 'nft collection', 'compare crypto', 'compare crypto coins', 'coming ICOs', "ongoing icos", 'ended icos',
		'fdv', 'CryptoMarketVision', 'CryptoMarketVision (CMV)', 'cmv', 'compare coins', 'btc to currency', 'convert btc',],

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


export default async function RootLayout({ children }) {


	return (
		<html lang="en" suppressHydrationWarning className='scroll-smooth scroll-pt-6'>
			<body className={`${NotoFont.variable} min-h-screen bg-background font-Noto selection:text-white selection:bg-primary`}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	)
}