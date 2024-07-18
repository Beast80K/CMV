
import LoadingPage from './components/LoadingPage/LoadingPage'

const loading = () => {
	return (
		<div>
			<LoadingPage />
		</div>
	)
}

export default loading

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
