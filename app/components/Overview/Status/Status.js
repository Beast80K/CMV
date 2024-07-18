'use client'
import { Button } from '@nextui-org/react'
import { BsCircleFill } from 'react-icons/bs'
import useSWR from 'swr'
import { Fetcher } from '@/app/utils/Swr/Fetcher'
import FetchingOptions from '@/app/utils/Swr/FetchingOptions'
import { useRouter } from 'next/navigation'

import dynamic from "next/dynamic";
const ComponentLevelError = dynamic(() => import('../../ComponentLevelError/ComponentLevelError'));

const Status = () => {
	try {
		const router = useRouter()

		const { data, error, isLoading, mutate } = useSWR('/api/ping', Fetcher, { ...FetchingOptions('10min') })
		if (error) {
			router.replace('/maintenance')
		}

		else {
			return <Button
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
				Status : {isLoading ? "Checking ..." : "OK"}
			</Button>
		}


	} catch (e) {
		<ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While getting Status, an error occured !"}
		/>
	}

}

export default Status