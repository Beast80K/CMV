export const dynamic = "force-dynamic"
import AxiosInstance from '@/app/lib/AxiosInstance'

import { NextRequest, NextResponse } from 'next/server'



export async function GET(NextRequest) {


	try {
		let { data, status, statusText, headers } = await AxiosInstance.get('/nfts')

		return NextResponse.json(data, {
			status, statusText, headers
		})
	} catch (e) {


		return NextResponse.json(e?.response?.data?.status?.error_message || e?.response?.data?.error || e.toString(), {
			status: e?.response?.status || 500,
			statusText: e?.response?.code || "Internal Server Error"
		})
	}

}