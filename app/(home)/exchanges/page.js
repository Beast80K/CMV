import dynamic from "next/dynamic";
const ExchangesHomeTabs = dynamic(() => import("@/app/components/Exchanges/ExchangesHomeTabs/ExchangesHomeTabs"))


const page = () => {
	return (
		<div className=''>


			<ExchangesHomeTabs />


		</div>
	)
}

export default page

export const metadata = {

	title: 'Exchanges - Get all the exchanges data that have active trading volumes',
	alternates: {
		canonical: '/exchanges',
	},
	description: 'Get all available Exchanges, details like 24 Hrs. Trade Vol in BTC & BTC Normalized, Trust Score & Rank, Country, Year Est., has Trading Incentive etc.',
	openGraph: {
		title: 'Exchanges - Get all the exchanges data that have active trading volumes',
		description: 'Get all available Exchanges, details like 24 Hrs. Trade Vol in BTC & BTC Normalized, Trust Score & Rank, Country, Year Est., has Trading Incentive etc.',

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
		title: 'Exchanges - Get all the exchanges data that have active trading volumes',
		description: 'Get all available Exchanges, details like 24 Hrs. Trade Vol in BTC & BTC Normalized, Trust Score & Rank, Country, Year Est., has Trading Incentive etc.',
		creator: 'CryptoMarketVision',
		images: [`/images/Logo.png`,],
	},



	keywords: ['crypto', 'Exchanges', 'coin', 'coins', 'crypto exchanges', 'coins market cap', 'CryptoMarketVision exchanges', 'CryptoMarketVision (CMV)', 'cmv exchanges',],

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
