'use client'
import { useState } from 'react'

import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from '@nextui-org/react'
import { ZustandStore } from '@/app/store/store'
import useSWR from 'swr'
import dynamic from "next/dynamic";
import { Fetcher } from '@/app/utils/Swr/Fetcher'
import FetchingOptions from '@/app/utils/Swr/FetchingOptions'


import { useShallow } from 'zustand/react/shallow'
import { BsCheckCircleFill } from 'react-icons/bs'
import TransitionDiv from '@/app/components/TransitionDiv/TransitionDiv'
import SectionHeader from '@/app/components/SectionHeader/SectionHeader'
import ChartSkeleton from '@/app/components/Skeletons/ChartSkeleton'



const CandleStickGraph = dynamic(() => import("@/app/components/Graphs/CandleStickGraph"))
const ComponentLevelError = dynamic(() => import('@/app/components/ComponentLevelError/ComponentLevelError'))
const DataNotThere = dynamic(() => import('@/app/components/DataNotThere/DataNotThere'))



const CoinOHLC = ({ CoinId, CoinName, CoinSymbol }) => {



	try {

		const { StoreCurrency } = ZustandStore(useShallow((state) => state))
		const DaysList = [
			{
				value: "1", label: "1 Days", desc: "Last 1 Day"
			},
			{
				value: "7", label: "7 Days", desc: "Last 7 Days"
			},
			{
				value: "14", label: "14 Days", desc: "Last 14 Days"
			},
			{
				value: "30", label: "30 Days", desc: "Last 30 Days"
			},
			{
				value: "90", label: "90 Days", desc: "Last 90 Days"
			},
			{
				value: "180", label: "180 Days", desc: "Last 180 Days"
			},
			{
				value: "365", label: "1 Year", desc: "Last 1Yr"
			},
			{
				value: "max", label: "Max", desc: "Max. available data"
			},
		]
		const [Days, SetDays] = useState(new Set(["1"]))


		const { data, error, isLoading, mutate } = useSWR(`/api/coin_ohlc?id=${CoinId}&days=${Array.from(Days)[0]}&currency=${StoreCurrency}`, Fetcher, { ...FetchingOptions('30min') })


		return (
			<TransitionDiv>

				<Card radius='sm' shadow='sm' >
					<CardBody>
						<SectionHeader
							SectionID={"OHLCData"}
							SectionName={`${CoinName} (${CoinSymbol.toUpperCase()}) OHLC Data`}
							InfoContentTitle={"OHLC Data"}
							InfoContent={<ul className='list-disc'>
								<li className='ml-4'>Shows OHLC/ Candle Body data (Price, Mkt. Cap etc.) for a given date for a coin. </li>
								<li className='ml-4'>Data granularity is 1-2 day - 30 Min., 3-90 days - 4 Hours, 31 days days and beyond - 4 days.</li>
								<li className='ml-4'>Auto Updates every 30 minutes.</li>
								<li className='ml-4'>Last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35)</li>
							</ul>}
						/>
						<div className='flex items-center justify-end mb-4'>


							<div className='flex gap-2 justify-end items-center'>
								<div className='text-tiny'>
									Duration :
								</div>
								<Dropdown>
									<DropdownTrigger>
										<Button
											variant="light"
											color='primary'
											size='sm'
											title="Select Days"
											aria-label="Select Days dropdown Button"
											isDisabled={isLoading}
										>
											{DaysList[DaysList.findIndex(f => f.value === Array.from(Days)[0])]['label']}
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										className='max-h-52 overflow-auto'

										aria-label="Select Days for OHLC Chart"
										variant="flat"
										color='primary'
										disallowEmptySelection
										selectionMode="single"
										selectedKeys={Days}
										onSelectionChange={SetDays}
									>
										{DaysList.map((v, i) => (
											<DropdownItem
												className={`transition ease-in-out duration-500 ${Days.has(v.value) ? ' text-primary font-bold ' : 'text-foreground'}`}
												textValue={v.label}
												selectedIcon={
													Days.has(v.value) ? <BsCheckCircleFill
														size={16} /> : null
												}
												description={v.desc}
												key={v.value}>
												{Days.has(v.value) ? <b>{v.label}</b> : v.label}
											</DropdownItem>

										))}

									</DropdownMenu>
								</Dropdown>
							</div>



						</div>

						{
							isLoading
								?

								<ChartSkeleton>
									<Spinner
										label={`Getting OHLC data for ${CoinName} (${CoinSymbol.toUpperCase()})`}
										color="primary" labelColor="primary" />
								</ChartSkeleton>

								:
								error
									?
									error.response.status === 404
										?
										<DataNotThere
											Text={`${error?.response?.data ? error?.response?.data + ", " : null}OHLC data not available for ${CoinName} (${CoinSymbol.toUpperCase()})`} />
										:
										<ComponentLevelError
											ErrorObj={error}
											Msg={`${error?.response?.data ? error?.response?.data + ", " : null}Error Occured while loading OHLC data for ${CoinName} (${CoinSymbol.toUpperCase()})`}
											Mutate={mutate}
										/>
									:
									data ?
										<CandleStickGraph

											ChartName={`${CoinName} (${CoinSymbol.toUpperCase()}) OHLC - ${DaysList.find(f => f.value === Array.from(Days)[0])['label']}`}


											Data={data}
											CoinName={CoinName}
											CoinSymbol={CoinSymbol}
										/>
										:

										<DataNotThere
											Text={`OHLC data not available for ${CoinName} (${CoinSymbol.toUpperCase()})`} />

						}





					</CardBody>
				</Card>

			</TransitionDiv>
		)

	} catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={`While loading OHLC data for ${CoinName} (${CoinSymbol.toUpperCase()}), an error occured !`}
		/>
	}
}

export default CoinOHLC