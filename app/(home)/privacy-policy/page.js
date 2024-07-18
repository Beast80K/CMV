import dynamic from "next/dynamic";
const PrivacyPolicy = dynamic(() => import("@/app/components/Footer/PrivacyPolicy/PrivacyPolicy"))


export default function PrivacyPolicyPg() {
	return (
		<PrivacyPolicy />
	);
}

export const metadata = {

	title: 'Privacy Policy - Data collection & Cookies',

	description: `Privacy Policy explains what data is collected, stored, generated, marketing, user-preferences & used for.`,


	keywords: ['privacy', 'Privacy Policy', 'Policy', 'legal', 'policy', 'CryptoMarketVision', 'CryptoMarketVision (CMV)', 'CryptoMarketVision privacy', 'CryptoMarketVision privacy policy'],

	applicationName: "CryptoMarketVision (CMV)",
	authors: [{ name: "CryptoMarketVision (CMV)" }],
	generator: 'CryptoMarketVision (CMV)',
	creator: 'CryptoMarketVision (CMV)',
	publisher: 'CryptoMarketVision (CMV)',
	category: 'technology',
	alternates: {
		canonical: '/privacy-policy',
	},
	openGraph: {
		title: 'Privacy Policy - Data collection & Cookies',
		description: `Privacy Policy explains what data is collected, stored, generated, marketing, user-preferences & used for.`,

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
		title: 'Privacy Policy - Data collection & Cookies',
		description: `Privacy Policy explains what data is collected, stored, generated, marketing, user-preferences & used for.`,
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