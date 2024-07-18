import dynamic from "next/dynamic";
const CoinDetails = dynamic(() => import("@/app/components/Coin/CoinDetails/CoinDetails"))

export default async function CoinDetailsPage({ params }) {

	return (
		<div>
			<CoinDetails CoinId={params.coinId} />
		</div>
	)
}


export const metadata = {
	robots: {
		index: false,
		follow: false,
		nocache: true,
		googleBot: {
			index: false,
			follow: false,
			noimageindex: false,
			'max-video-preview': 0,
			'max-image-preview': 'none',
			'max-snippet': 0,
		},
	},
}