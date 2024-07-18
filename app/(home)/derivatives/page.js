import dynamic from "next/dynamic";
const DerivativesHomeTabs = dynamic(() => import("@/app/components/Derivatives/DerivativesHomeTabs/DerivativesHomeTabs"))


const DerivatesPage = () => {
	return (
		<div>
			<DerivativesHomeTabs />
		</div>
	)
}

export default DerivatesPage

export const metadata = {

	title: 'Derivatives - Get all the derivatives exchanges related data',
	alternates: {
		canonical: '/derivatives',
	},
	description: 'Get all Derivative exchanges details like 24 Hrs. Trade Volume BTC, No. Of Futures Pairs, Open Interest BTC, Country, Year Est., Perpetuals etc.',
	openGraph: {
		title: 'Derivatives - Get all the derivatives exchanges related data',
		description: 'Get all Derivative exchanges details like 24 Hrs. Trade Volume BTC, No. Of Futures Pairs, Open Interest BTC, Country, Year Est., Perpetuals etc.',

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
		title: 'Derivatives - Get all the derivatives exchanges related data',
		description: 'Get all Derivative exchanges details like 24 Hrs. Trade Volume BTC, No. Of Futures Pairs, Open Interest BTC, Country, Year Est., Perpetuals etc.',
		creator: 'CryptoMarketVision',
		images: [`/images/Logo.png`,],
	},
	keywords: ['crypto', 'Derivatives', 'coin', 'coins', 'crypto derivatives', 'coins market cap', 'CryptoMarketVision Derivatives', 'CryptoMarketVision (CMV)', 'cmv derivatives',],

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
