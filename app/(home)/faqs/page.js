import dynamic from "next/dynamic";
const FAQ = dynamic(() => import("@/app/components/Footer/FAQ/FAQ"))



export default function FAQPg() {
	return (
		<div>
			<FAQ />
		</div>
	);
}

export const metadata = {

	title: 'FAQs - Answers to most frequently asked questions',
	alternates: {
		canonical: '/faqs',
	},
	openGraph: {
		title: 'FAQs - Answers to most frequently asked questions',
		description: 'Doubts about user data, cookies, accuracy, safety etc. these are most commonly asked questions we always update these & have provided answers.',

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
		title: 'FAQs - Answers to most frequently asked questions',
		description: 'Doubts about user data, cookies, accuracy, safety etc. these are most commonly asked questions we always update these & have provided answers.',
		creator: 'CryptoMarketVision',
		images: [`/images/Logo.png`,],
	},

	description: 'Doubts about user data, cookies, accuracy, safety etc. these are most commonly asked questions we always update these & have provided answers.',
	keywords: ['faq', 'CryptoMarketVision', 'CryptoMarketVision (CMV)', 'CryptoMarketVision faqs', 'CryptoMarketVision faq', 'faqs'],

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
