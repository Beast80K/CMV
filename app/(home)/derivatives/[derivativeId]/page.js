import dynamic from "next/dynamic";
const DerivativeDetails = dynamic(() => import("@/app/components/Derivatives/DerivativeDetails/DerivativeDetails"))


export default function DerivativeDetailsPage({ params }) {
    return (
        <div>
            <DerivativeDetails DerivativeID={params.derivativeId} />
        </div>
    );
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
