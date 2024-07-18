'use client'
import { ZustandStore } from '@/app/store/store'
import { Fetcher } from '@/app/utils/Swr/Fetcher'

import { memo } from 'react'
import useSWR from 'swr'
import FetchingOptions from '@/app/utils/Swr/FetchingOptions'
import { Avatar, AvatarGroup, Card, CardBody, Spinner } from '@nextui-org/react'
import { useShallow } from 'zustand/react/shallow'

import CurrencyFormatter from '@/app/utils/Currency/CurrencyFormatter'
import SimpleDateTime from '@/app/utils/DateTime/SimpleDateTime'

import dynamic from 'next/dynamic'
import TransitionDiv from '../TransitionDiv/TransitionDiv'
import SectionHeader from '../SectionHeader/SectionHeader'
import TableSkeleton from '../Skeletons/TableSkeleton'
const ComponentLevelError = dynamic(() => import("../ComponentLevelError/ComponentLevelError"))
const DataNotThere = dynamic(() => import("../DataNotThere/DataNotThere"))
const MyTable = dynamic(() => import("../MyTable/MyTable"))
const LowHighChip = dynamic(() => import("../LowHighChip/LowHighChip"))



const Categories = () => {
	try {
		const { StoreCurrency, StoreLocale } = ZustandStore(useShallow((state) => state))
		const { data: data, error, isLoading, mutate } = useSWR('/api/categories', Fetcher, { ...FetchingOptions('5min') })

		return (
			<TransitionDiv>
				<Card radius='sm' shadow='sm' className='mb-4'>
					<CardBody>

						<SectionHeader
							SectionID={"Categories"}
							SectionName={"Categories"}
							InfoContentTitle={"Categories"}
							InfoContent={<ul className='list-disc'>
								<li className='ml-4'>Shows market data for all available categories.</li>
								<li className='ml-4'>Auto Updates in every 5 minutes.</li>
							</ul>}
						/>

						{
							isLoading
								?
								<TableSkeleton>
									<Spinner label={"Getting Categories data ..."} color="primary" labelColor="primary" />
								</TableSkeleton>
								:
								error
									?
									<ComponentLevelError
										Msg={"While loading Categories section, an error occured !"}
										ErrorObj={error}
										Mutate={mutate} />
									:

									data
										?

										<MyTable
											Data={data}
											ColumnsList={[

												// Sr. No.
												{
													headerName: "Sr. No.",
													field: "sr_no",
													pinned: false,
													maxWidth: 120,

												},
												{ headerName: 'Name', field: 'name', hide: false, pinned: false },

												// Top 3 Coins
												{
													headerName: 'Top 3 Coins',
													field: 'top_3_coins',
													hide: false,
													sortable: false,
													cellRenderer: memo(({ data }) => <AvatarGroup >
														{
															data.top_3_coins.map(img => (
																<Avatar src={img} />
															))
														}
													</AvatarGroup>)
													,
													pinned: false
												},
												{
													headerName: "24Hr. Mkt. Cap Change",
													field: "market_cap_change_24h",
													hide: false,
													pinned: false,
													"enableCellChangeFlash": true,

													cellRenderer: memo(function ({ data }) {
														let value = Number(data.market_cap_change_24h)
														return value ?

															<LowHighChip
																Value={value}
																Currency={StoreCurrency}
																Locale={StoreLocale} />
															: "-"
													})
													,
												},
												{
													headerName: 'Mkt. Cap', field: 'market_cap', hide: false,
													valueFormatter: ({ value }) => {
														return value ? CurrencyFormatter(StoreLocale, 'usd', Number(value)) : "-"
													}
												},

												{
													headerName: "Updated At",
													field: "updated_at",
													hide: false,
													pinned: false,
													"enableCellChangeFlash": true,
													valueFormatter: ({ value }) => {
														return value ? SimpleDateTime(value)
															: '-'
													}
												},
												{
													headerName: '24Hr. Volume in USD', field: `volume_24h`, hide: false,
													valueFormatter: ({ value }) => {
														return value ? CurrencyFormatter(StoreLocale, 'usd', Number(value)) : "-"
													}
												},


											]}
										/>

										:
										<DataNotThere
											Text={`${error?.response?.data ? error?.response?.data + " " : "Categories data not available !"}`}
										/>
						}


					</CardBody>
				</Card>

			</TransitionDiv>
		)
	}

	catch (e) {
		return <ComponentLevelError
			Msg={"While loading Categories section, an error occured !"}
			ErrorObj={{ message: e.toString() }}
		/>
	}
}

export default Categories