import dynamic from "next/dynamic";
const NFTHomeTabs = dynamic(() => import("@/app/components/NFT/NFTHomeTabs/NFTHomeTabs"))

const NFTPage = () => {
	return (
		<div>

			<NFTHomeTabs />
		</div>
	)
}

export default NFTPage

export const metadata = {

	title: 'NFTs - Shows all available NFTs & Asset Platforms',
	alternates: {
		canonical: '/nfts',
	},
	description: `Shows all available NFTs details Contract Address, NFT IDs, & Asset Platform ID & Chain Identifier, Native Coin ID for Asset Platforms.`,
	openGraph: {
		title: 'NFTs - Shows all available NFTs & Asset Platforms',
		description: `Shows all available NFTs details Contract Address, NFT IDs, & Asset Platform ID & Chain Identifier, Native Coin ID for Asset Platforms.`,

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
		title: 'NFTs - Shows all available NFTs & Asset Platforms',
		description: `Shows all available NFTs details Contract Address, NFT IDs, & Asset Platform ID & Chain Identifier, Native Coin ID for Asset Platforms.`,
		creator: 'CryptoMarketVision',
		images: [`/images/Logo.png`,],
	},

	keywords: ['crypto', 'nft', 'nfts', 'nft collection', 'nfts collections', 'collections',],

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