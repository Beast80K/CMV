import dynamic from "next/dynamic";
const ExchangeDetails = dynamic(() => import("@/app/components/Exchanges/ExchangeDetails/ExchangeDetails"))




export default function ExchangeDetailsPage({ params }) {

    return (
        <div>
            <ExchangeDetails ExchangeID={params.exchangeId} />
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
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}
