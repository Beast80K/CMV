import dynamic from "next/dynamic";
const CookiePolicy = dynamic(() => import("@/app/components/Footer/CookiePolicy/CookiePolicy"))



export default function CookiePg() {
	return (

		<CookiePolicy />


	);
}

export const metadata = {

	title: `Cookies Policy - Why cookies are used, what data stored`,
	description: `Cookies Policy explains use of cookies why they are used for, what data is stored, & notice acceptance cookies.`,
	alternates: {
		canonical: '/cookies-policy',
	},
	openGraph: {
		title: 'Cookies Policy - Why cookies are used, what data stored',
		description: `Cookies Policy explains use of cookies why they are used for, what data is stored, & notice acceptance cookies.`,

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
		title: 'Cookies Policy - Why cookies are used, what data stored',
		description: `Cookies Policy explains use of cookies why they are used for, what data is stored, & notice acceptance cookies.`,
		creator: 'CryptoMarketVision',
		images: [`/images/Logo.png`,],
	},

	keywords: ['cookie', 'cookies', 'cookie policy', 'cmv cookies policy', 'CryptoMarketVision cookies policy', 'CryptoMarketVision',
		'legal', 'cookies policy', 'policy', 'CryptoMarketVision (CMV)', 'CryptoMarketVision cookies'],

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
