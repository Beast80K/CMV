'use client'
import { Button } from "@nextui-org/react";
import { BsCircleFill } from "react-icons/bs";

const LoadingPage = () => {

	return (
		<div className='flex gap-4 justify-center h-screen  items-center'>



			<div className='flex flex-col font-medium gap-4 items-center'>

				<img src="/images/Loading.svg" className="h-96 w-96" alt="Loading image" />
				<Button
					color='success'
					variant='flat'
					title='Getting data ...'
					isLoading={true}
					className='font-bold text-success'
					endContent={<BsCircleFill size={10} className={`animate-ping`} />}
				>Loading ...</Button>


				<img src="/images/Logo.svg"
					aria-label='CMV' alt="CryptoMarketVision (CMV)"
					className='h-12 w-12 font-extrabold font-Noto text-primary' />

				<div className='font-bold text-sm text-center text-primary'>
					<div>CryptoMarketVision (CMV)</div>
				</div>

			</div>




		</div>
	)
}

export default LoadingPage