'use client'
import { memo } from 'react'
import { Card, CardBody, Link, Spinner, User } from '@nextui-org/react'
import useSWR from 'swr'
import { Fetcher } from '@/app/utils/Swr/Fetcher'

import FetchingOptions from '@/app/utils/Swr/FetchingOptions'
import Capitalized from '@/app/utils/Text/Capitalized'


import CurrencyFormatter from '@/app/utils/Currency/CurrencyFormatter'
import { ZustandStore } from '@/app/store/store'
import ShortText from '@/app/utils/Text/ShortText'
import SimpleDateTime from '@/app/utils/DateTime/SimpleDateTime'
import NumberFormat from '@/app/utils/Number/NumberFormat'

import { FaCircle, FaCircleCheck, FaTriangleExclamation } from 'react-icons/fa6'

import { useShallow } from 'zustand/react/shallow'

import dynamic from 'next/dynamic'
import TransitionDiv from '@/app/components/TransitionDiv/TransitionDiv'
import SectionHeader from '@/app/components/SectionHeader/SectionHeader'
import TableSkeleton from '@/app/components/Skeletons/TableSkeleton'
import ExternalLink from '@/app/components/ExternalLink/ExternalLink'
const MyTable = dynamic(() => import("@/app/components/MyTable/MyTable"))
const DataNotThere = dynamic(() => import("@/app/components/DataNotThere/DataNotThere"))
const ComponentLevelError = dynamic(() => import("@/app/components/ComponentLevelError/ComponentLevelError"))



const CoinMarkets = ({ CoinId, CoinName, CoinSymbol }) => {
	try {
		const { data, error, isLoading, mutate } = useSWR('/api/coin_tickers?id=' + CoinId, Fetcher, { ...FetchingOptions('45sec') })

		const { StoreLocale } = ZustandStore(useShallow((state) => state))



		return (
			<TransitionDiv>

				<Card radius='sm' shadow='sm'>
					<CardBody>
						<SectionHeader
							SectionID={"Markets"}
							SectionName={`${CoinName} (${CoinSymbol.toUpperCase()}) Markets`}
							InfoContentTitle={"Markets"}
							InfoContent={<ul className='list-disc'>
								<li className='ml-4'>Shows Coin tickers data.</li>
								<li className='ml-4'>Auto Updates in every 45 seconds.</li>
								<li className='ml-4'>Price: Latest unconverted price in the respective pair target currency</li>
								<li className='ml-4'>Volume: Unconverted 24h trading volume in the respective pair target currency</li>
								<li className='ml-4'>Converted Last: Latest converted price in BTC, ETH, and USD</li>
								<li className='ml-4'>Converted Volume: converted 24h trading volume in BTC, ETH, and USD</li>
								<li className='ml-4'>Timestamp: returns the last time that the price has changed</li>
								<li className='ml-4'>Last Traded At: returns the last time that the price has changed</li>
								<li className='ml-4'>Last Fetch At: returns the last time we call the API</li>
								<li className='ml-4'><b>Is Stale</b> when ticker that has not been updated from the exchange for more than 8 hours.
									<div className='flex items-center gap-2'>
										<div className='flex items-center gap-2'>
											True <span className='text-danger'><FaTriangleExclamation /></span>
										</div>
										<div className='flex items-center gap-2'>
											False <span className='text-success'><FaCircleCheck /></span>
										</div>
									</div>
								</li>
								<li className='ml-4 flex gap-2 items-center'><b>Is Anomaly</b> if ticker's price is outliered by our system.
									<div className='flex items-center gap-2'>
										<div className='flex items-center gap-2'>
											True <span className='text-danger'><FaTriangleExclamation /></span>
										</div>
										<div className='flex items-center gap-2'>
											False <span className='text-success'><FaCircleCheck /></span>
										</div>
									</div>

								</li>
							</ul>}
						/>

						{
							isLoading
								?
								<TableSkeleton>
									<Spinner label={`Getting Markets data for ${CoinName} (${CoinSymbol.toUpperCase()})`} color="primary" labelColor="primary" />
								</TableSkeleton>
								:
								error
									?
									error.response.status === 404
										?
										<DataNotThere
											Text={`${error?.response?.data ? error?.response?.data + ", " : null}Markets data not available for ${CoinName} (${CoinSymbol.toUpperCase()}) !`}
										/>
										:
										<ComponentLevelError
											ErrorObj={error}
											Msg={`${error?.response?.data ? error?.response?.data + ", " : null}Error Occured while loading Markets data for ${CoinName} (${CoinSymbol.toUpperCase()})`}
											Mutate={mutate}
										/>
									:
									<>

										<MyTable
											LinkKey={'market.identifier'}
											Data={data.tickers}
											GoToLink={"/exchanges"}
											ColumnsList={
												[
													// Sr. No.
													{
														headerName: "Sr. No.",
														field: "sr_no",
														maxWidth: 120,
														pinned: "left"
													},

													// Market
													{
														headerName: "Market",
														field: "market.name",
														hide: false,
														cellRenderer: memo(({ data }) => <User
															name={data.market.name}
															description={data.market.identifier}
															avatarProps={{
																src: data.market.logo
															}}
														/>),
														pinned: 'left'
													},
													// Base
													{
														headerName: "Base",
														field: "base",
														"hide": true,
														pinned: false
													},
													// Target
													{
														headerName: "Target",
														field: "target",
														"hide": true,
														pinned: false
													},
													// Pair
													{
														headerName: "Pair",
														field: "pair",
														hide: false,
														pinned: 'left',
														cellRenderer: memo(function PairRenderer({ data }) {
															return data.trade_url ?
																<ExternalLink ExternalLink={data.trade_url} ExternalLinkName={ShortText(data.base + "/" + data.target, 8)} />
																:
																ShortText(data.base + "/" + data.target, 8)
														})
													},
													// Price
													{
														headerName: "Price In USD",
														field: "last",
														hide: false,
														pinned: false,
														headerTooltip: `Latest unconverted price in the respective pair target currency ${data.target}`,
														valueFormatter: ({ data }) => data.last ? CurrencyFormatter(StoreLocale, 'usd', data.last) : "-"
													},
													// Volume
													{
														headerName: "Volume",
														field: "volume",
														hide: false,
														pinned: false,
														headerTooltip: `Unconverted 24h trading volume in the respective pair target currency`,
														valueFormatter: ({ data }) => data.last ? NumberFormat(StoreLocale, data.volume) : "-"
													},
													// -2% Depth In USD
													{
														headerName: "-2% Depth In USD",
														field: "cost_to_move_up_usd",
														hide: false,
														pinned: false,
														headerTooltip: `Cost To Move Up USD`,
														valueFormatter: ({ data }) => data.cost_to_move_up_usd ? CurrencyFormatter(StoreLocale, 'usd', data.cost_to_move_up_usd.toFixed(2)) : "-"

													},
													// +2% Depth In USD
													{
														headerName: "+2% Depth In USD",
														field: "cost_to_move_down_usd",
														hide: false,
														pinned: false,
														headerTooltip: `Cost To Move Down USD`,
														valueFormatter: ({ data }) => data.cost_to_move_down_usd ? CurrencyFormatter(StoreLocale, 'usd', data.cost_to_move_down_usd.toFixed(2)) : "-"
													},

													// Converted Last BTC
													{
														headerName: "Converted Last BTC",
														field: "converted_last.btc",
														hide: false,
														pinned: false,
														headerTooltip: 'Converted Last BTC',
														valueFormatter: ({ data }) => data.converted_last.btc ? CurrencyFormatter(StoreLocale, 'btc', data.converted_last.btc) : "-"

													},
													// Converted Last ETH
													{
														headerName: "Converted Last ETH",
														field: "converted_last.eth",
														hide: false,
														pinned: false,
														headerTooltip: 'Converted Last ETH',
														valueFormatter: ({ data }) => data.converted_last.eth ? CurrencyFormatter(StoreLocale, 'eth', data.converted_last.eth) : "-"

													},
													// Converted Last USD
													{
														headerName: "Converted Last USD",
														field: "converted_last.usd",
														hide: false,
														pinned: false,
														headerTooltip: 'Converted Last USD',
														valueFormatter: ({ data }) => data.converted_last.usd ? CurrencyFormatter(StoreLocale, 'usd', data.converted_last.usd) : "-"

													},


													// Converted Volume BTC
													{
														headerName: "Converted Volume BTC",
														field: "converted_volume.btc",
														hide: false,
														pinned: false,
														headerTooltip: 'Converted Volume BTC',
														valueFormatter: ({ data }) => data.converted_volume.btc ? CurrencyFormatter(StoreLocale, 'btc', data.converted_volume.btc) : "-"

													},
													// Converted Volume ETH
													{
														headerName: "Converted Volume ETH",
														field: "converted_volume.eth",
														hide: false,
														pinned: false,
														headerTooltip: 'Converted Volume ETH',
														valueFormatter: ({ data }) => data.converted_volume.eth ? CurrencyFormatter(StoreLocale, 'eth', data.converted_volume.eth) : "-"

													},
													// Converted Volume USD
													{
														headerName: "Converted Volume USD",
														field: "converted_volume.usd",
														hide: false,
														pinned: false,
														headerTooltip: 'Converted Volume USD',
														valueFormatter: ({ data }) => data.converted_volume.usd ? CurrencyFormatter(StoreLocale, 'usd', data.converted_volume.usd) : "-"

													},
													// Trust Score
													{
														headerName: "Trust Score",
														field: "trust_score",
														hide: false,
														pinned: false,
														cellStyle: {
															display: 'flex',
															justifyContent: 'center'
														},
														cellRenderer: memo(({ data }) => <FaCircle color={data.trust_score} />)
													},
													{
														headerName: "Spread %",
														field: "bid_ask_spread_percentage",
														hide: false,
														pinned: false,
														headerTooltip: `Bid Ask Spread Percentage`,
														valueFormatter: ({ data }) => data.bid_ask_spread_percentage ? data.bid_ask_spread_percentage.toFixed(2) + "%" : "-"

													},
													{
														headerName: "Is Anomaly",
														field: "is_anomaly",
														hide: false,
														pinned: false,
														cellStyle: {
															display: 'flex',
															justifyContent: 'center'
														},
														cellRenderer: memo(({ data }) => typeof (data.is_anomaly) === 'boolean' ?
															<div>
																{data.is_anomaly ?
																	<div title={Capitalized(data.is_anomaly.toString())} className='text-danger flex gap-2 items-center'>Yes <FaTriangleExclamation size={16} />
																	</div> :
																	<div title={Capitalized(data.is_anomaly.toString())} className='text-success flex gap-2 items-center'>No <FaCircleCheck size={16} />
																	</div>
																}
															</div>
															: "-")
													},
													{
														headerName: "Is Stale",
														field: "is_stale",
														hide: false,
														pinned: false,
														cellStyle: {
															display: 'flex',
															justifyContent: 'center'
														},
														cellRenderer: memo(({ data }) => typeof (data.is_stale) === 'boolean' ?
															<div>
																{data.is_stale ? <div title={Capitalized(data.is_stale.toString())} className='text-danger  flex gap-2 items-center'>Yes <FaTriangleExclamation size={16} /></div>
																	: <div title={Capitalized(data.is_stale.toString())} className='text-success  flex gap-2 items-center'>No <FaCircleCheck size={16} /></div>}
															</div>
															: "-")
													},
													{
														headerName: "Timestamp",
														field: "timestamp",
														"hide": true,
														pinned: false,
														valueFormatter: ({ data }) => data.timestamp ? SimpleDateTime(data.timestamp) : "-"

													},
													{
														headerName: "Last Traded At",
														field: "last_traded_at",
														hide: false,
														pinned: false,

														valueFormatter: ({ data }) => data.last_traded_at ? SimpleDateTime(data.last_traded_at) : "-"
													},
													{
														headerName: "Last Fetch At",
														field: "last_fetch_at",
														hide: false,
														pinned: false,
														valueFormatter: ({ data }) => data.last_fetch_at ? SimpleDateTime(data.last_fetch_at) : "-"

													},




												]}

										/>

									</>

						}
					</CardBody>



				</Card>
			</TransitionDiv>
		)


	} catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While loading Markets data, an error occured !"}
		/>
	}
}

export default CoinMarkets