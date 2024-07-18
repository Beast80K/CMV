'use client'

import { Fetcher } from '@/app/utils/Swr/Fetcher'
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from '@nextui-org/react'
import { useState } from 'react'
import useSWR from 'swr'

import FetchingOptions from '@/app/utils/Swr/FetchingOptions'


import dynamic from 'next/dynamic'
const DateTimeXAxis = dynamic(() => import("@/app/components/Graphs/DateTimeXAxis"))
const ChartSkeleton = dynamic(() => import("@/app/components/Skeletons/ChartSkeleton"))
const TransitionDiv = dynamic(() => import("@/app/components/TransitionDiv/TransitionDiv"))
const ComponentLevelError = dynamic(() => import("@/app/components/ComponentLevelError/ComponentLevelError"))
const DataNotThere = dynamic(() => import("@/app/components/DataNotThere/DataNotThere"))
const SectionHeader = dynamic(() => import("@/app/components/SectionHeader/SectionHeader"))



const ExchangeMarketChart = ({ ExchangeName, ExchangeID }) => {

	try {

		const DaysList = [
			{
				value: "1", label: "1D", desc: "Last 1 Day"
			},
			{
				value: "7", label: "7D", desc: "Last 7 Days"
			},
			{
				value: "14", label: "14D", desc: "Last 14 Days"
			},
			{
				value: "30", label: "30D", desc: "Last 30 Days"
			},
			{
				value: "90", label: "90D", desc: "Last 90 Days"
			},
			{
				value: "180", label: "180D", desc: "Last 180 Days"
			},
			{
				value: "365", label: "1Yr", desc: "Last 1Yr"
			},
		]
		const [Days, SetDays] = useState(new Set(["1"]))


		const { data, error, isLoading, mutate } = useSWR(`/api/exchange_volumechart?id=${ExchangeID}&days=` + Array.from(Days)[0], Fetcher, { ...FetchingOptions('60sec') })



		return (
			<TransitionDiv>

				<Card radius='sm' shadow='sm' className='mb-4'>
					<CardBody>

						<SectionHeader
							SectionID={'ExchangeTradeVolChart'}
							SectionName={`${ExchangeName} Trade Volume Chart`}
							InfoContentTitle={`${ExchangeName} Trade Volume Chart`}
							InfoContent={<ul className='list-disc'>
								<li className='ml-4'>Shows 24 hour rolling trading volume data (in BTC) for a given exchange. Data granularity is 1 day - 10 Min., 2-90 days - Hourly, 91 days above - Daily.</li>
								<li className='ml-4'>Auto updates Frequency: every 60 seconds.</li>
							</ul>}
						/>

						{
							isLoading
								?


								<ChartSkeleton>
									<Spinner label={`Getting Exchange Trade Volume Chart data for ${ExchangeName} `} color="primary" labelColor="primary" />
								</ChartSkeleton>
								:
								error

									?
									error.response.status === 404
										?
										<DataNotThere
											Text={`${error?.response?.data ? error?.response?.data + ", " : null}Exchange Trade Volume Chart data not available for ${ExchangeName} `}
										/>
										:
										<ComponentLevelError ErrorObj={error}
											Msg={`${error?.response?.data ? error?.response?.data + ", " : null}Error Occured while loading Exchange Trade Volume Chart data for ${ExchangeName}`}
											Mutate={mutate} />
									:
									<div className='flex flex-col gap-2'>

										<div className='flex flex-row items-center justify-start sm:justify-end'>

											<div className='flex justify-end gap-2 items-center'>
												<div className='text-tiny font-bold'>
													Duration :
												</div>

												<Dropdown >
													<DropdownTrigger

													>
														<Button
															variant="light"
															color='primary'
															size='sm'
															isDisabled={isLoading}

														>
															{DaysList[DaysList.findIndex(f => f.value === Array.from(Days)[0])]['label']}
														</Button>
													</DropdownTrigger>
													<DropdownMenu
														aria-label="Select Days for Exchange Exchange Trade Volume Chart"
														variant="flat"
														color='primary'

														disallowEmptySelection
														selectionMode="single"
														selectedKeys={Days}
														onSelectionChange={SetDays}

														className='max-h-52 overflow-auto'
													>
														{DaysList.map((v, i) => (
															<DropdownItem
																className={`transition ease-in-out duration-500 ${Days.has(v.value) ? ' text-primary font-bold ' : 'text-foreground'}`}
																textValue={v.label}
																description={v.desc}
																key={v.value}>
																{Days.has(v.value) ? <b>{v.label}</b> : v.label}
															</DropdownItem>

														))}

													</DropdownMenu>
												</Dropdown>

											</div>

										</div>


										<div>
											<DateTimeXAxis
												Chart1Name={`${ExchangeName} Trade Vol. Chart (in BTC) ${DaysList[DaysList.findIndex(f => f.value === Array.from(Days)[0])]['label']}`}
												SeriesName={`Trade Vol. (in BTC)`}
												data={[...data]}
												Currency1={'btc'}
											/>
										</div>
									</div>
						}

					</CardBody>

				</Card>
			</TransitionDiv>

		)


	} catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While loading Exchange Exchange Trade Volume Chart data, an error occured !"}
		/>
	}
}

export default ExchangeMarketChart