export const dynamic = "force-dynamic"
export const revalidate = 0

import AxiosInstance from '@/app/lib/AxiosInstance'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		let { data, status, statusText, headers } = await AxiosInstance.get('/ping')

		return NextResponse.json(data, {
			status, statusText, headers,
		})

	} catch (e) {
		return Response.json(e?.response?.data || e.toString(), {
			status: e?.response?.status || 500,
			statusText: e?.response?.code || "Internal Server Error"
		})
	}

}