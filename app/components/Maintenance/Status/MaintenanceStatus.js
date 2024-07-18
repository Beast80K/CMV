'use client'

import { useEffect } from 'react'
import useSWR from 'swr'

import FetchingOptions from '@/app/utils/Swr/FetchingOptions'
import { Fetcher } from '@/app/utils/Swr/Fetcher'
import { BsCircleFill } from 'react-icons/bs'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

import dynamic from "next/dynamic";
const ComponentLevelError = dynamic(() => import("../../ComponentLevelError/ComponentLevelError"))



const MaintenanceStatus = () => {

	try {
		const router = useRouter()
		const { data, error, isLoading, mutate } = useSWR('/api/ping', Fetcher, { ...FetchingOptions('60sec') })




		useEffect(() => {
			data && !error ? router.replace('/') : null
		}, [data, error])




		return (
			<div className='flex justify-center items-center text-foreground p-8'>

				<div>


					<div className='flex flex-col gap-4 items-center '>

						<h1 className='text-4xl md:text-8xl text-danger font-Noto font-bold' >
							Maintenance
						</h1>

						<div className='font-medium flex flex-col gap-2 items-center'>

							<div>CryptoMarketVision (CMV) is currently down for a scheduled maintenance.</div>
							<div>We apologize for the inconvenience.</div>
						</div>



						<img src="/images/Maintenance.svg" className="h-96 w-96" alt="Maintenance" />

						{
							isLoading
								?
								<Button
									title='Keeps checking if server is working, every 5 minutes.'
									radius='sm'
									size='sm'
									fullWidth={false}
									className={`font-bold text-success`}
									variant='flat'
									color={'success'}
									isLoading={isLoading}
									startContent={<BsCircleFill size={10} className={`animate-ping`} />}

								>
									Checking ...
								</Button>
								:
								error
									?
									<Button
										title='Keeps checking if server is working, every 5 minutes.'
										radius='sm'
										size='sm'
										fullWidth={false}
										className={`font-bold text-danger`}
										variant='flat'
										color={'danger'}
										isLoading={isLoading}
										startContent={<BsCircleFill size={10} className={`animate-ping`} />}
									>
										Service Unavailable
									</Button>
									:

									<Button
										title='Keeps checking if server is working, every 5 minutes.'
										radius='sm'
										size='sm'
										fullWidth={false}
										className={`font-bold text-success`}
										variant='flat'
										color={'success'}
										startContent={<BsCircleFill size={10} className={`animate-ping`} />}
										isLoading={isLoading}
									>
										Service Available - Redirecting ...
									</Button>
						}



						<div>Refresh this page after sometime, we will redirect you to Homepage.</div>



						<img src="/images/Logo.svg" aria-label='CMV' alt="CryptoMarketVision (CMV)" className='h-12 w-12 font-extrabold font-Noto text-primary' />
						<div className='font-bold text-sm text-center text-primary'>
							<div>CryptoMarketVision (CMV)</div>
						</div>
					</div>
				</div>


			</div>
		)


	} catch (e) {
		<ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While getting Status, an error occured !"}
		/>
	}


}

export default MaintenanceStatus