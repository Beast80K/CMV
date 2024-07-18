import dynamic from "next/dynamic";
const Attributions = dynamic(() => import("@/app/components/Footer/Attributions/Attributions"))



export default function AttributionsPg() {
	return (
		<div>
			<Attributions />
		</div>
	);
}



export const metadata = {

	title: 'Attributions - We are thankful for these free resources',

	description: `We are deeply appreciative, thankful & grateful for all these free resources, your generosity, goodwill & kindness, has made this project possible.`,

	alternates: {
		canonical: '/attributions',
	},
	openGraph: {
		title: 'Attributions - We are thankful for these free resources',
		description: `We are deeply appreciative, thankful & grateful for all these free resources, your generosity, goodwill & kindness, has made this project possible.`,
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
		title: 'Attributions - We are thankful for these free resources',
		description: `We are deeply appreciative, thankful & grateful for all these free resources, your generosity, goodwill & kindness, has made this project possible.`,
		creator: 'CryptoMarketVision',
		images: [`/images/Logo.png`,],
	},
	keywords: ['Attribution', 'Attributions', 'CryptoMarketVision', 'attribution', 'attributions', 'CryptoMarketVision (CMV)', 'CryptoMarketVision attribution'],

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