import dynamic from "next/dynamic";
const TermsOfService = dynamic(() => import("@/app/components/Footer/TermsOfService/TermsOfService"))


export default function TermsOfServicePg() {
	return <TermsOfService />
}

export const metadata = {

	title: 'Terms Of Service - Responsibility & Liability of service',
	description: `Terms Of Service - What we are responsible for & user obligations, rules, regulations that must be followed for continuation of use of the service`,


	keywords: ['Terms Of Service', 'terms', 'service', 'legal', 'policy', 'CryptoMarketVision', 'CryptoMarketVision (CMV)'],

	applicationName: "CryptoMarketVision (CMV)",
	authors: [{ name: "CryptoMarketVision (CMV)" }],
	generator: 'CryptoMarketVision (CMV)',
	creator: 'CryptoMarketVision (CMV)',
	publisher: 'CryptoMarketVision (CMV)',
	category: 'technology',
	alternates: {
		canonical: '/terms-of-service',
	},
	openGraph: {
		title: 'Terms Of Service - Responsibility & Liability of service',
		description: `Terms Of Service - What we are responsible for & user obligations, rules, regulations that must be followed for continuation of use of the service`,

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
		title: 'Terms Of Service - Responsibility & Liability of service',
		description: `Terms Of Service - What we are responsible for & user obligations, rules, regulations that must be followed for continuation of use of the service`,
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