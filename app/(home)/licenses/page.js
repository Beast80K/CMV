import dynamic from "next/dynamic";
const Licenses = dynamic(() => import("@/app/components/Footer/Licenses/Licenses"))


export default function LicensesPg() {
	return (
		<div>
			<Licenses />
		</div>
	);
}
export const metadata = {

	title: 'Licenses - These are the licenses of resources we used',
	alternates: {
		canonical: '/licenses',
	},
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
	description: `These are the licenses of resources used form various sources, which are available to be used for free under various licenses.`,
	keywords: ['licenses', 'legal', 'CryptoMarketVision', 'CryptoMarketVision (CMV)', 'CryptoMarketVision licenses', 'cmv licenses', 'cmv license', 'cmv legal',],

	applicationName: "CryptoMarketVision (CMV)",
	authors: [{ name: "CryptoMarketVision (CMV)" }],
	generator: 'CryptoMarketVision (CMV)',
	creator: 'CryptoMarketVision (CMV)',
	publisher: 'CryptoMarketVision (CMV)',
	category: 'technology',
	openGraph: {
		title: 'Licenses - These are the licenses of resources we used',
		description: `These are the licenses of resources used form various sources. These are the licenses of resources used form various sources, which are available to be used for free under various licenses.`,

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
		title: 'Licenses - These are the licenses of resources we used',
		description: `These are the licenses of resources used form various sources. These are the licenses of resources used form various sources, which are available to be used for free under various licenses.`,
		creator: 'CryptoMarketVision',
		images: [`/images/Logo.png`,],
	},


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