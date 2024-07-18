'use client'
import { memo } from 'react'
import { Card, CardBody, Link, Spinner, User, Tabs, Tab } from '@nextui-org/react'
import useSWR from 'swr'
import { Fetcher } from '@/app/utils/Swr/Fetcher'

import FetchingOptions from '@/app/utils/Swr/FetchingOptions'
import NumberFormat from '@/app/utils/Number/NumberFormat'
import CurrencyFormatter from '@/app/utils/Currency/CurrencyFormatter'
import { ZustandStore } from '@/app/store/store'
import { useShallow } from 'zustand/react/shallow'

import ShortCurrency from '@/app/utils/Currency/ShortCurrency'
import Capitalized from '@/app/utils/Text/Capitalized'
import UnixToSimpleDate from '@/app/utils/DateTime/UnixToSimpleDate'

import dynamic from 'next/dynamic'
import TransitionDiv from '../../TransitionDiv/TransitionDiv'
import SectionHeader from '../../SectionHeader/SectionHeader'
import TableSkeleton from '../../Skeletons/TableSkeleton'
import { usePathname } from 'next/navigation'

const MyTable = dynamic(() => import("../../MyTable/MyTable"))
const LowHighChip = dynamic(() => import("../../LowHighChip/LowHighChip"))
const ComponentLevelError = dynamic(() => import("../../ComponentLevelError/ComponentLevelError"))




const DerivativesHomeTabs = () => {
	try {
		const { StoreLocale } = ZustandStore(useShallow((state) => state))

		const DerivativesExchanges = useSWR('/api/derivatives_exchanges', Fetcher, { ...FetchingOptions('60sec') })
		const DerivativesTicker = useSWR('/api/derivatives', Fetcher, { ...FetchingOptions('60sec') })


		return (
			<TransitionDiv>

				<Card radius='sm' shadow='sm' className='mb-4'>
					<CardBody>
						<Tabs
							radius='sm'
							variant='solid'
							color='primary' classNames={{
								tabList: "bg-secondary",
								tabContent: "group-data-[selected=true]:text-secondary group-data-[selected=true]:font-bold"
							}} aria-label="Tab">

							<Tab key="DerivativesExchanges"
								title={"Dervatives Exchanges"}
							>
								<SectionHeader
									SectionName={`Derivatives Exchanges`}
									SectionID={`DerivativesExchanges`}
									InfoContentTitle={"Derivatives Exchanges"}
									InfoContent={<ul className='list-disc'>
										<li className='ml-4'>Shows all available Derivative exchanges.</li>
										<li className='ml-4'>Auto Updates in every 1 minute.</li>
									</ul>}
								/>

								{
									DerivativesExchanges.isLoading
										?
										<TableSkeleton>

											<Spinner label={`Getting Derivatives`} color="primary" labelColor="primary" />
										</TableSkeleton>
										:
										DerivativesExchanges.error
											?
											<ComponentLevelError ErrorObj={DerivativesExchanges.error} Msg={DerivativesExchanges.error?.response?.data || "Error Occured while getting Derivatives"} Mutate={DerivativesExchanges.mutate} />

											:


											<MyTable
												Data={DerivativesExchanges.data}
												GoToLink={"/derivatives"}
												ColumnsList={[
													{
														headerName: "Sr. No.",
														maxWidth: 120,
														field: "sr_no",
														pinned: false
													},
													{
														headerName: 'Name', field: 'name', hide: false,
														cellRenderer: memo(({ data }) => <User
															name={data.name}
															avatarProps={{
																src: data.image
															}}
														/>),
														pinned: false
													},


													{
														headerName: "Open Interest BTC",
														field: "open_interest_btc",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? CurrencyFormatter(StoreLocale, 'btc', Number(value)) : "-"
														}

													},
													{
														headerName: "URL",
														field: "url",
														hide: false,
														pinned: false,
														cellRenderer: memo(function ({ data }) {
															let value = data.url
															return value ?
																<Link
																	isExternal
																	href={value}
																	showAnchorIcon
																	className='text-tiny'
																>
																	{new URL(value).hostname || new URL(value).host}
																</Link>
																:
																"-"
														})

													},
													{
														headerName: "Trade Vol. 24Hr. BTC",
														field: "trade_volume_24h_btc",
														hide: false,
														pinned: false,
														headerTooltip: "Trade Volume 24Hr. BTC",
														valueFormatter: ({ value }) => {
															return value ? CurrencyFormatter(StoreLocale, 'btc', Number(value)) : "-"
														}

													},
													{
														headerName: "Perpetuals",
														field: "number_of_perpetual_pairs",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? NumberFormat(StoreLocale, value) : "-"
														},
														headerTooltip: 'Number Of Perpetual Pairs'

													},
													{
														headerName: "Futures",
														field: "number_of_futures_pairs",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? NumberFormat(StoreLocale, value) : "-"
														},
														headerTooltip: 'Number Of Futures Pairs'

													},
													{
														headerName: "Year Est.",
														field: "year_established",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value || "-"
														}

													},
													{
														headerName: "Country",
														field: "country",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value || "-"
														}
													},



												]}
											/>

								}
							</Tab>
							<Tab key="DerivativesTickers"
								title={"Dervatives Tickers"}
							>
								<SectionHeader
									SectionName={`Derivatives Tickers`}
									SectionID={`DerivativesTickers`}
									InfoContentTitle={"Derivatives Tickers"}
									InfoContent={<ul className='list-disc'>
										<li className='ml-4'>Shows all available Derivative Tickers.</li>
										<li className='ml-4'>Auto Updates in every 30 seconds.</li>
									</ul>}
								/>

								{
									DerivativesTicker.isLoading
										?
										<TableSkeleton>

											<Spinner label={`Getting Derivatives Tickers`} color="primary" labelColor="primary" />
										</TableSkeleton>
										:
										DerivativesTicker.error

											?
											<ComponentLevelError
												ErrorObj={error} Msg={error?.response?.data || "Error Occured while getting Derivatives"}
												Mutate={DerivativesTicker.mutate} />


											:

											<MyTable
												Data={DerivativesTicker.data}
												ColumnsList={[

													{
														headerName: "Sr. No.",
														field: "sr_no",
														maxWidth: 120,
														pinned: 'left'
													},
													{
														headerName: "Market",
														field: "market",
														hide: false,
														pinned: 'left'
													},
													{
														headerName: "Symbol",
														field: "symbol",
														hide: false,
														pinned: false
													},
													{
														headerName: "Index Id",
														field: "index_id",
														hide: false,
														pinned: false
													},
													{
														headerName: "Index",
														field: "index",
														hide: false,
														pinned: false,
														valueGetter: ({ data }) => data.index_id && data.index ? CurrencyFormatter(StoreLocale, data.index_id, data.index) : "-"

													},
													{
														headerName: "Price in USD",
														field: "price",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? `${CurrencyFormatter(StoreLocale, 'usd', Number(value))}` : "-"
														}

													},
													{
														headerName: "Price % Change 24Hr.",
														field: "price_percentage_change_24h",
														hide: false,
														pinned: false,
														cellRenderer: memo(function ({ data }) {
															let value = Number(data.price_percentage_change_24h)
															return value ?

																<LowHighChip Value={value} />

																: "-"
														})
													},
													{
														headerName: "Contract Type",
														field: "contract_type",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? Capitalized(value) : "-"
														}
													},

													{
														headerName: "Basis",
														field: "basis",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? `${value.toFixed(2)} %` : "-"
														}
													},
													{
														headerName: "Spread",
														field: "spread",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? `${value.toFixed(2)} %` : "-"
														}
													},
													{
														headerName: "Funding Rate",
														field: "funding_rate",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? `${value.toFixed(2)} %` : "-"
														}
													},
													{
														headerName: "Open Interest in USD",
														field: "open_interest",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? `${CurrencyFormatter(StoreLocale, 'usd', Number(value))} ~ ${ShortCurrency(StoreLocale, 'usd', Number(value))}` : "-"
														}
													},
													{
														headerName: "Vol. 24Hr.",
														field: "volume_24h",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? `${CurrencyFormatter(StoreLocale, 'usd', Number(value))} ~ ${ShortCurrency(StoreLocale, 'usd', Number(value))}` : "-"
														}
													},
													{
														headerName: "Last Traded At",
														field: "last_traded_at",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? UnixToSimpleDate(value) : "-"
														}
													},
													{
														headerName: "Expired At",
														field: "expired_at",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? UnixToSimpleDate(value) : "-"
														}
													}

												]}
											/>

								}

							</Tab>


						</Tabs>
					</CardBody>

				</Card>
			</TransitionDiv>
		)

	} catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While loading Derivatives section, an error occured !"}
		/>
	}
}

export default DerivativesHomeTabs