'use client'

import { Fetcher } from '@/app/utils/Swr/Fetcher'
import dynamic from "next/dynamic";
import useSWR from 'swr'
import FetchingOptions from '../utils/Swr/FetchingOptions';
const ComponentLevelError = dynamic(() => import('./ComponentLevelError/ComponentLevelError'));

const Try = () => {
	try {

		const { data, error, isLoading, mutate } = useSWR('/api/ping', Fetcher, { ...FetchingOptions('1min') })

		if (isLoading) {
			return "Loading ..."
		}
		if (error) {
			return JSON.stringify(error)
		}
		if (data) {
			return JSON.stringify(data)
		}


	} catch (e) {
		<ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While getting Status, an error occured !"}
		/>
	}

}

export default Try