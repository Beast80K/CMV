export const dynamic = "force-dynamic"
import AxiosInstance from '@/app/lib/AxiosInstance'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(NextRequest) {




	try {



		let { data, status, statusText, headers } = await AxiosInstance.get('/coin/' + NextRequest.nextUrl.searchParams.get('id') + '/market_chart',
			{
				params: {
					"vs_currency": NextRequest.nextUrl.searchParams.get('currency'),
					"days": NextRequest.nextUrl.searchParams.get('days'),
					"precision": "full",
				}
			}
		)

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