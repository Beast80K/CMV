'use client'

import { Button, Card, CardBody, Divider } from '@nextui-org/react'
import { BsArrowClockwise, BsExclamationCircleFill } from 'react-icons/bs'
import { permanentRedirect, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
const TransitionDiv = dynamic(() => import("../TransitionDiv/TransitionDiv"))


const ComponentLevelError = ({ ErrorObj, Mutate, Msg }) => {


	/*
		DESCRIPTION

		WHEN ERROR OCCURS IN API CALL,
	    
		PASS SWR ERROR OBJ, ErrorObj.message IS NECESAARY !
		MSG TO SHOW TO THE USER,
		MUTATE FUNCTION FOR RETRY,


		error.code :  ERR_BAD_RESPONSE
		error.response.status :  503
		error.message :  Request failed with status code 503
		error.response.statusText :  Service Unavailable
		error.response.data.error :  DOWN

	*/

	const router = useRouter();

	return ErrorObj?.response?.status === 503
		?

		permanentRedirect('/maintenance')

		:
		<TransitionDiv>

			<Card radius='md' shadow='md' className='mb-4 bg-secondary font-mono'>
				<CardBody>
					<div className='flex p-5 flex-col'>
						<div className='mb-4'>
							<div className='flex flex-row mb-2 gap-2 text-danger items-center'>
								<BsExclamationCircleFill size={18} />


								<div className='text-2xl font-bold'>

									{ErrorObj?.code || "Oops !"}</div>
							</div>

							<div>{ErrorObj?.message || Msg}</div>
							<div>{ErrorObj?.response?.data}</div>

						</div>
						<Button
							color='success'
							className='font-Noto'
							variant='flat'
							onClick={() => { Mutate ? Mutate() : router.refresh() }}
							endContent={<BsArrowClockwise />}
						>{Mutate ? "Retry" : "Reload"}</Button>

					</div>
				</CardBody>
			</Card>
		</TransitionDiv>

}

export default ComponentLevelError