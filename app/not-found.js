'use client'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { BsHouse } from 'react-icons/bs'
import Container from './components/Container/Container'

const NotFound = () => {

	const router = useRouter();

	return (
		<Container>

			<div className="flex justify-center items-center">
				<div className='flex flex-col gap-4 items-center mb-4 text-foreground'>

					<h1 className='text-4xl md:text-8xl text-danger font-Noto font-bold'>
						Not Found
					</h1>
					<div className='font-medium '>
						Page that you were looking for, doesn't exists !
					</div>

					<div className='flex flex-col gap-2 items-center mb-4'>

						<img src='/images/NotFound.svg' alt='Not Found' className="h-96 w-96" />


					</div>





					<Button
						title="Home"
						aria-label="Home Button"
						color='success'
						variant='flat'
						className='font-bold text-success'
						onClick={() => { router.replace('/') }}
						endContent={<BsHouse />}
					>Home</Button>

					<img src="/images/Logo.svg"
						aria-label='CMV' alt="CryptoMarketVision (CMV)"
						className='h-12 w-12 font-extrabold font-Noto text-primary' />

					<div className='font-bold text-sm text-center text-primary'>
						<div>CryptoMarketVision (CMV)</div>
					</div>

				</div>
			</div>
		</Container>



	)
}

export default NotFound

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
