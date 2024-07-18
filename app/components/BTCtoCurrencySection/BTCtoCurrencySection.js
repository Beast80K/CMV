'use client'

import useSWR from 'swr'
import { Card, CardBody, Skeleton, Spinner } from '@nextui-org/react'


import { Fetcher } from '@/app/utils/Swr/Fetcher'
import FetchingOptions from '@/app/utils/Swr/FetchingOptions'



import Capitalized from '@/app/utils/Text/Capitalized'
import dynamic from 'next/dynamic'
const MyTable = dynamic(() => import("../MyTable/MyTable"))
const ComponentLevelError = dynamic(() => import("../ComponentLevelError/ComponentLevelError"))
const BTCtoConverter = dynamic(() => import("./BTCtoConverter/BTCtoConverter"))
import SectionHeader from '../SectionHeader/SectionHeader'
import TableSkeleton from '../Skeletons/TableSkeleton'
import TransitionDiv from '../TransitionDiv/TransitionDiv'


const BTCtoCurrencySection = () => {
	try {
		const { data, error, isLoading, mutate } = useSWR('/api/exchange_rates', Fetcher, { ...FetchingOptions('60sec') })

		return (

			<TransitionDiv>

				{
					isLoading
						?
						<div className='grid grid-cols-12 gap-4 mb-4'>
							<div className=' col-span-12 xl:col-span-8'>
								<Card radius='sm' shadow='sm'>
									<CardBody>
										<SectionHeader
											SectionID={"BTCtoCurrency"}
											SectionName={`BTC to Currency`}
											InfoContentTitle={"BTC to Currency"}
											InfoContent={<ul className='list-disc'>
												<li className='ml-4'>Shows BTC-to-Currency exchange rates.</li>
												<li className='ml-4'>Auto Updates every 60 seconds.</li>
											</ul>}
										/>
										<TableSkeleton>
											<Spinner label={`Getting BTC-to-Currency exchange rates`} color="primary" labelColor="primary" />
										</TableSkeleton>
									</CardBody>
								</Card>
							</div>
							<div className=' col-span-12 xl:col-span-4'>
								<Card radius='sm' shadow='sm'>
									<CardBody>
										<SectionHeader
											SectionID={"BTCtoCurrencyConverter"}
											SectionName={`BTC to Currency Converter`}
											InfoContentTitle={"BTC to Currency Converter"}
											InfoContent={<ul className='list-disc'>
												<li className='ml-4'>Shows BTC-to-Currency exchange rates.</li>
												<li className='ml-4'>Auto Updates every 60 seconds.</li>
											</ul>}
										/>
										<div className='flex flex-col gap-2'>
											<Skeleton className="h-8 w-4/4 rounded-md  " />
											<Skeleton className="h-8 w-3/4 rounded-md  " />
											<Spinner label={`Loading BTC to Currency Converter`} color="primary" labelColor="primary" />
											<Skeleton className="h-8 w-4/4 rounded-md  " />
											<Skeleton className="h-8 w-3/4 rounded-md  " />
										</div>

									</CardBody>
								</Card>
							</div>
						</div>

						:
						error
							?
							<ComponentLevelError ErrorObj={error}

								Msg={`${error?.response?.data ? error?.response?.data + ", " : null}Error Occured while loading BTC to Currency data !`}

								Mutate={mutate} />

							:
							<div className='grid grid-cols-12 gap-4'>
								<div className=' col-span-12 lg:col-span-8 xl:col-span-9'>
									<Card radius='sm' shadow='sm'>
										<CardBody>
											<SectionHeader
												SectionID={"BTCtoCurrency"}
												SectionName={`BTC to Currency`}
												InfoContentTitle={"BTC to Currency"}
												InfoContent={<ul className='list-disc'>
													<li className='ml-4'>Shows BTC-to-Currency exchange rates.</li>
													<li className='ml-4'>Auto Updates every 60 seconds.</li>
												</ul>}
											/>


											<MyTable
												DisableLimit={true}
												Data={data}
												ColumnsList={[
													{
														headerName: "Sr. No.",
														field: "sr_no",
														pinned: false
													},
													{
														headerName: "Name",
														field: "Name",
														hide: false,
														pinned: false
													},
													{
														headerName: "Symbol",
														field: "Symbol",
														hide: false,
														pinned: false
													},
													{
														headerName: "Unit",
														field: "Unit",
														hide: false,
														pinned: false
													},
													{
														headerName: "Type",
														field: "Type",
														hide: false,
														pinned: false
													},
													{
														headerName: "Value",
														field: "Value",
														hide: false,
														pinned: false,

													}

												]}
											/>
										</CardBody>
									</Card>

								</div>

								<div className=' col-span-12 lg:col-span-4 xl:col-span-3'>
									<Card radius='sm' shadow='sm'>
										<CardBody>
											<SectionHeader
												SectionID={"BTCtoCurrencyConverter"}
												SectionName={`BTC to Currency Converter`}
												InfoContentTitle={"BTC to Currency Converter"}
												InfoContent={<ul className='list-disc'>
													<li className='ml-4'>Shows BTC-to-Currency exchange rates.</li>
													<li className='ml-4'>Auto Updates every 60 seconds.</li>
												</ul>}
											/>

											<BTCtoConverter Data={data} />
										</CardBody>
									</Card>

								</div>
							</div>
				}


			</TransitionDiv >


		)
	}
	catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While loading BTC to Currency Section, an error occured !"}
		/>
	}
}

export default BTCtoCurrencySection