import dynamic from "next/dynamic";
const MaintenanceStatus = dynamic(() => import("@/app/components/Maintenance/Status/MaintenanceStatus"))


export default function MaintenancePg() {
	return <MaintenanceStatus />
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
