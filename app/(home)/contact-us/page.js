import dynamic from "next/dynamic";
const ContactUs = dynamic(() => import("@/app/components/Footer/ContactUs/ContactUs"))

export default function ContactUsPg() {
	return (
		<div>
			<ContactUs />
		</div>
	);
}

export const metadata = {

	title: 'Contact Us - Any queries no matter how big or small',
	description: `For any queries, please contact us through contact form. We will reply as soon as possible with an accurate response from our field/subject experts.`,


	keywords: ['Contact', 'contact', 'contact us', 'inquiry', 'legal', 'cmv contact', 'query', 'CryptoMarketVision', 'legal', 'CryptoMarketVision (CMV)', 'CryptoMarketVision contact'],

	applicationName: "CryptoMarketVision (CMV)",
	authors: [{ name: "CryptoMarketVision (CMV)" }],
	generator: 'CryptoMarketVision (CMV)',
	creator: 'CryptoMarketVision (CMV)',
	publisher: 'CryptoMarketVision (CMV)',
	category: 'technology',

	alternates: {
		canonical: '/contact-us',
	},
	openGraph: {
		title: 'Contact Us - Any queries no matter how big or small',
		description: `For any queries, please contact us through contact form. We will reply as soon as possible with an accurate response from our field/subject experts.`,

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
		title: 'Contact Us - Any queries no matter how big or small',
		description: `For any queries, please contact us through contact form. We will reply as soon as possible with an accurate response from our field/subject experts.`,
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
