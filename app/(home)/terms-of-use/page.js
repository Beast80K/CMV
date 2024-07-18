import dynamic from "next/dynamic";
const TermsOfUse = dynamic(() => import("@/app/components/Footer/TermsOfUse/TermsOfUse"))



export default function TermsOfUsePg() {
	return <TermsOfUse />

}


export const metadata = {

	title: 'Terms Of Use - User is liable & must read these terms',
	alternates: {
		canonical: '/terms-of-use',
	},
	description: `Terms of Use - These terms describe Use Of Service, Warranty, Accuracy, Liability etc. website shall be used only for what it's made for.`,


	keywords: ['Terms Of Use', 'terms', 'use', 'usage', 'legal', 'policy', 'CryptoMarketVision', 'CryptoMarketVision (CMV)'],

	applicationName: "CryptoMarketVision (CMV)",
	authors: [{ name: "CryptoMarketVision (CMV)" }],
	generator: 'CryptoMarketVision (CMV)',
	creator: 'CryptoMarketVision (CMV)',
	publisher: 'CryptoMarketVision (CMV)',
	category: 'technology',
	openGraph: {
		title: 'Terms Of Use - User is liable & must read these terms',
		description: `Terms of Use - These terms describe Use Of Service, Warranty, Accuracy, Liability etc. website shall be used only for what it's made for.`,

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
		title: 'Terms Of Use - User is liable & must read these terms',
		description: `Terms of Use - These terms describe Use Of Service, Warranty, Accuracy, Liability etc. website shall be used only for what it's made for.`,
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