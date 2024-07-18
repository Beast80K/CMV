'use client'


import { Button } from '@nextui-org/react'
import { BsArrowClockwise } from 'react-icons/bs'

import dynamic from "next/dynamic";
const TransitionDiv = dynamic(() => import("../components/TransitionDiv/TransitionDiv"))


const Error = ({ error, reset }) => {


	return (
		<TransitionDiv>
			<div className='flex flex-col gap-4 justify-center items-center text-foreground'>

				<div className='flex flex-col gap-2'>


					<h1 className='text-4xl md:text-8xl text-danger font-Noto font-bold'>
						Error
					</h1>
					<p className='font-medium'>While loading this page, an error occured ! </p>
				</div>



				<img src="/images/Error.svg" alt="Error" className="h-96 w-96" />
				<Button
					title="Retry"
					aria-label="Retry Button"
					color='success'
					variant='flat'
					className='font-bold text-success'
					onClick={reset}
					endContent={<BsArrowClockwise />}
				>Retry</Button>

				<div className='font-bold text-danger'>{error.toString()}</div>

				<div className='font-bold text-sm text-center text-primary'>
					<div>CryptoMarketVision (CMV)</div>
				</div>

			</div>
		</TransitionDiv>

	)
}

export default Error
