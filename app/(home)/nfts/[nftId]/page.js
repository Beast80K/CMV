import dynamic from "next/dynamic";
const NFTDetails = dynamic(() => import("@/app/components/NFT/NFTDetails/NFTDetails"))



export default function NFTDetailsPage({ params }) {
    return (
        <div>
            <NFTDetails Nft_ID={params.nftId} />
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
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}
