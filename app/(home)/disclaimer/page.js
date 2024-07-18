import Disclaimer from "@/app/components/Footer/Disclaimer/Disclaimer";

export default function DisclaimersPg() {
	return (
		<div>
			<Disclaimer />
		</div>
	);
}

export const metadata = {
	title: "Disclaimer - What you are responsible for",

	description: `Disclaimer covers use of by visiting this website, you agree to these terms legally, you understand & are responsible for any loss.`,

	alternates: {
		canonical: "/disclaimer",
	},
	openGraph: {
		title: "Disclaimer - What you are responsible for | CryptoMarketVision",
		description: `Disclaimer covers use of by visiting this website, you agree to these terms legally, you understand & are responsible for any loss.`,
		siteName: "CryptoMarketVision",
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
				alt: "CryptoMarketVision (CMV)",
			},
		],
		locale: "en_US",
		type: "website",
	},

	twitter: {
		card: "summary_large_image",
		title: "Disclaimer - What you are responsible for | CryptoMarketVision",
		description: `Disclaimer covers use of by visiting this website, you agree to these terms legally, you understand & are responsible for any loss.`,
		creator: "CryptoMarketVision",
		images: [`/images/Logo.png`],
	},
	keywords: [
		"Disclaimer",
		"disclaimer",
		"CryptoMarketVision",
		"CryptoMarketVision (CMV)",
		"cmv",
	],

	applicationName: "CryptoMarketVision (CMV)",
	authors: [{ name: "CryptoMarketVision (CMV)" }],
	generator: "Next.js",
	creator: "CryptoMarketVision (CMV)",
	publisher: "CryptoMarketVision (CMV)",
	category: "technology",

	robots: {
		index: true,
		follow: false,
		nocache: false,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};
