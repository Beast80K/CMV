import dynamic from "next/dynamic";
const Search = dynamic(() => import("@/app/components/Search/Search"))


const SearchPg = () => {
	return (
		<Search />
	)
}

export default SearchPg

export const metadata = {

	title: 'Search - Search for Coins, NFTs, Exchanges & Categories',

	description: `Can't remember exact cryptocurrency name ? Search for it from hundreds of Coins, NFTs, Exchanges & Categories.`,
	alternates: {
		canonical: '/search',
	},
	openGraph: {
		title: 'Search - Search for Coins, NFTs, Exchanges & Categories',
		description: `Can't remember exact cryptocurrency name ? Search for it from hundreds of Coins, NFTs, Exchanges & Categories.`,

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

	keywords: ['search crypto coins', 'search coins', 'exchange', 'crypto exchanges', 'search cryptocurrency', 'search crypto currencies', 'search nft', 'nft',
		'nfts', 'search nfts', 'cryptocurrencies', 'exchanges', 'search exchanges', 'Search', 'search', 'CMV search', 'cmv search',
		'search CryptoMarketVision', 'CryptoMarketVision search',
		'Categories', 'categories', 'search categories'],

	applicationName: "CryptoMarketVision (CMV)",
	authors: [{ name: "CryptoMarketVision (CMV)" }],
	generator: 'CryptoMarketVision (CMV)',
	creator: 'CryptoMarketVision (CMV)',
	publisher: 'CryptoMarketVision (CMV)',
	category: 'technology',

	twitter: {
		card: 'summary_large_image',
		title: 'Search - Search for Coins, NFTs, Exchanges & Categories',
		description: `Can't remember exact cryptocurrency name ? Search for it from hundreds of Coins, NFTs, Exchanges & Categories.`,
		creator: 'CryptoMarketVision',
		images: [`/images/Logo.png`,],
	},

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