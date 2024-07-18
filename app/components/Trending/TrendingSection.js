'use client'
import dynamic from "next/dynamic";
import React, { memo } from 'react'
import useSWR from 'swr'
import { Fetcher } from '../../utils/Swr/Fetcher'
import FetchingOptions from '../../utils/Swr/FetchingOptions'
import { ZustandStore } from '@/app/store/store'
import { Card, CardBody, Spinner, User } from '@nextui-org/react'
import CurrencyFormatter from '@/app/utils/Currency/CurrencyFormatter'
import { useShallow } from 'zustand/react/shallow'
import ShortCurrency from '@/app/utils/Currency/ShortCurrency'

const ComponentLevelError = dynamic(() => import('../ComponentLevelError/ComponentLevelError'));
const DataNotThere = dynamic(() => import('../DataNotThere/DataNotThere'));


const WatchListBtn = dynamic(() => import('../WatchList/WatchListBtn/WatchListBtn'));

const MyTable = dynamic(() => import('../MyTable/MyTable'));
const SnippetRenderer = dynamic(() => import('../MyTable/Renderers/SnippetRenderer'));
const WatchListHeader = dynamic(() => import('../MyTable/Headers/WatchListHeader'));
const LowHighChip = dynamic(() => import('../LowHighChip/LowHighChip'));

import SectionHeader from '../SectionHeader/SectionHeader'
import TabsSkeleton from '../Skeletons/TabsSkeleton'
import TransitionDiv from '../TransitionDiv/TransitionDiv'




const TrendingSection = () => {


	try {
		const { StoreCurrency, StoreLocale } = ZustandStore(useShallow((state) => state))

		const { data, error, isLoading, mutate } = useSWR('/api/trending', Fetcher, { ...FetchingOptions('10min') })

		function SparkLineImgRenderer({ data }) {
			return <img src={data.data.sparkline} className="w-full h-10" alt="Sparkline Image" />
		}


		return (

			<TransitionDiv>
				{
					isLoading
						?
						<div className='flex flex-col gap-8'>
							<Card radius='sm' shadow='sm'>
								<CardBody>

									<SectionHeader
										SectionID={"TrendingCoins"}
										SectionName={"Trending Coins"}
										InfoContentTitle={"Trending Coins"}
										InfoContent={<ul className='list-disc'>
											<li className='ml-4'>Trending Coins searched in the last 24 hours (Ordered by most popular first).</li>

											<li className='ml-4'>Auto Updates in every 10 minutes.</li>
										</ul>}
									/>
									<TabsSkeleton>
										<Spinner label={"Getting Trending Coins ..."} color="primary" labelColor="primary" />
									</TabsSkeleton>

								</CardBody>
							</Card>
							<Card radius='sm' shadow='sm'>
								<CardBody>
									<SectionHeader
										SectionID={"TrendingNFTs"}
										SectionName={"Trending NFTs"}
										InfoContentTitle={"Trending NFTs"}
										InfoContent={<ul className='list-disc'>
											<li className='ml-4'>Trending NFTs searched in the last 24 hours (Ordered by most popular first).</li>
											<li className='ml-4'>Auto Updates in every 10 minutes.</li>
										</ul>}
									/>
									<TabsSkeleton>
										<Spinner label={"Getting Trending NFTs ..."} color="primary" labelColor="primary" />
									</TabsSkeleton>

								</CardBody>
							</Card>

							<Card radius='sm' shadow='sm'>
								<CardBody>
									<SectionHeader
										SectionID={"TrendingCategories"}
										SectionName={"Trending Categories"}
										InfoContentTitle={"Trending Categories"}
										InfoContent={<ul className='list-disc'>
											<li className='ml-4'>Trending Categories searched in the last 24 hours (Ordered by most popular first).</li>

											<li className='ml-4'>Auto Updates in every 10 minutes.</li>
										</ul>}
									/>
									<TabsSkeleton>
										<Spinner label={"Getting Trending Categories ..."} color="primary" labelColor="primary" />
									</TabsSkeleton>

								</CardBody>
							</Card>
						</div>
						:
						error
							?
							<Card radius='sm' shadow='sm' className='mb-4'>
								<CardBody>
									<SectionHeader
										SectionName={"Trending Coins, NFTs & Categories"}
										InfoContentTitle={"Trending Coins, NFTs & Categories"}
										InfoContent={<ul className='list-disc'>
											<li className='ml-4'>Trending Coins, NFTs & Categories searched in the last 24 hours (Ordered by most popular first).</li>
											<li className='ml-4'>Auto Updates in every 10 minutes.</li>
										</ul>}
									/><ComponentLevelError ErrorObj={error}
										Mutate={mutate} Msg={error?.response?.data?.error || "Error occured while getting Trending data !"} />
								</CardBody>
							</Card>
							:
							data
								?
								<div className='flex flex-col gap-4'>

									{/* TrendingCoins */}

									<Card radius='sm' shadow='sm'  >
										<CardBody>

											<SectionHeader
												SectionID={"TrendingCoins"}
												SectionName={"Trending Coins"}
												InfoContentTitle={"Trending Coins"}
												InfoContent={<ul className='list-disc'>
													<li className='ml-4'>Trending Coins searched in the last 24 hours (Ordered by most popular first).</li>

													<li className='ml-4'>Auto Updates in every 10 minutes.</li>
												</ul>}
											/>

											<MyTable
												Data={data.coins.map(c => c.item)}
												GoToLink={'/coins'}
												ColumnsList={
													[
														{
															headerName: 'Watchlist',
															headerComponent: WatchListHeader,
															field: 'watchlist', hide: false, sortable: false,
															cellRenderer: memo(function ({ data }) {
																return <WatchListBtn DataObj={data} />
															}),
															pinned: 'left',
															resizable: 'false',
															maxWidth: 80,
														},
														{
															headerName: "Sr. No.",
															field: "sr_no",
															pinned: "left",
															maxWidth: 120,
														},

														{
															headerName: 'Name', field: 'name', hide: false,
															cellRenderer: memo(({ data }) => <User
																name={data.name}
																description={data.symbol.toUpperCase()}
																avatarProps={{
																	src: data.large || data.small || data.thumb
																}}
															/>),
															pinned: 'left',
														},
														{ headerName: 'Mkt. Cap Rank', field: 'market_cap_rank', hide: false, },
														{ headerName: 'Mkt. Cap', field: 'data.market_cap', hide: false, },
														{
															headerName: 'Mkt. Cap BTC', field: 'data.market_cap_btc', hide: false,
															valueFormatter: ({ value }) => {
																return value ? CurrencyFormatter(StoreLocale, 'btc', Number(value)) : "-"
															}
														},
														{
															headerName: 'Price BTC', field: 'data.price_btc', hide: false,
															valueFormatter: ({ value }) => {
																return value ? CurrencyFormatter(StoreLocale, 'btc', Number(value)) : "-"
															}
														},
														{
															headerName: 'Price Change % 24Hr.', field: `data.price_change_percentage_24h.${StoreCurrency}`, hide: false,

															cellRenderer: memo(function ({ data }) {

																let value = Number(data.data.price_change_percentage_24h[StoreCurrency])
																return value ?

																	<LowHighChip Value={value} />
																	: "-"
															})
														},
														{ headerName: 'Total Volume', field: `data.total_volume`, hide: false, },
														{
															headerName: 'Total Volume BTC', field: `data.total_volume_btc`, hide: false,
															valueFormatter: ({ value }) => {
																return value ? CurrencyFormatter(StoreLocale, 'btc', Number(value)) : "-"
															}
														},
														{ headerName: 'Sparkline', field: `data.sparkline`, hide: false, cellRenderer: memo(SparkLineImgRenderer), sortable: false },
													]
												}

											/>


										</CardBody>
									</Card>


									{/* TrendingNFTs */}

									<Card radius='sm' shadow='sm'>
										<CardBody>
											<SectionHeader
												SectionID={"TrendingNFTs"}
												SectionName={"Trending NFTs"}
												InfoContentTitle={"Trending NFTs"}
												InfoContent={<ul className='list-disc'>
													<li className='ml-4'>Trending NFTs searched in the last 24 hours (Ordered by most popular first).</li>
													<li className='ml-4'>Auto Updates in every 10 minutes.</li>
												</ul>}
											/>

											<MyTable
												GoToLink={"/nfts"}
												ColumnsList={
													[
														{
															headerName: "Sr. No.",
															field: "sr_no",
															pinned: "left",
															maxWidth: 120,
														},
														{
															headerName: 'Name', field: 'name', hide: false,
															cellRenderer: memo(({ data }) => <User
																name={data.name}
																description={data.symbol.toUpperCase()}
																avatarProps={{
																	src: data.large || data.small || data.thumb
																}}
															/>),
															pinned: 'left',
														},
														{ headerName: 'NFT Contract ID', field: 'nft_contract_id', hide: false, cellRenderer: memo(SnippetRenderer), },

														{ headerName: 'Floor Price', field: 'data.floor_price', hide: false, },
														{ headerName: '24Hr. Avg. Sale Price BTC', field: `data.h24_average_sale_price`, hide: false, },
														{
															headerName: 'Floor Price 24Hr. % Change in USD', field: `data.floor_price_in_usd_24h_percentage_change`, hide: false,

															cellRenderer: memo(function ({ data }) {
																let value = Number(data.data.floor_price_in_usd_24h_percentage_change)
																return value ?

																	<LowHighChip Value={value} />


																	: "-"
															})
														},
														{ headerName: '24Hr. Volume', field: `data.h24_volume`, hide: false, },

														{ headerName: 'Sparkline', field: `data.sparkline`, hide: false, cellRenderer: memo(SparkLineImgRenderer), sortable: false },


													]
												}
												Data={data.nfts}


											/>
										</CardBody>
									</Card>


									{/* TrendingCategories */}


									<Card radius='sm' shadow='sm' >
										<CardBody>
											<SectionHeader
												SectionID={"TrendingCategories"}
												SectionName={"Trending Categories"}
												InfoContentTitle={"Trending Categories"}
												InfoContent={<ul className='list-disc'>
													<li className='ml-4'>Trending Categories searched in the last 24 hours (Ordered by most popular first).</li>

													<li className='ml-4'>Auto Updates in every 10 minutes.</li>
												</ul>}
											/>


											<MyTable
												Data={data.categories}

												ColumnsList={
													[

														{
															headerName: "Sr. No.",
															field: "sr_no",
															pinned: "left",
															maxWidth: 120,
														},
														{
															headerName: "Name",
															field: "name",
															hide: false,
															pinned: "left"
														},
														{
															headerName: "Coins Count",
															field: "coins_count",
															hide: false,
															pinned: false
														},
														{
															headerName: 'Mkt. Cap in USD', field: 'data.market_cap', hide: false,
															valueFormatter: ({ value }) => {
																return value ? `${CurrencyFormatter(StoreLocale, 'usd', Number(value))} ~ ${ShortCurrency(StoreLocale, 'usd', Number(value))}` : "-"
															}
														},

														{
															headerName: 'Mkt. Cap BTC', field: 'data.market_cap_btc', hide: false,
															valueFormatter: ({ value }) => {
																return value ? CurrencyFormatter(StoreLocale, 'btc', Number(value)) : "-"
															}
														},
														{
															headerName: 'Mkt. Cap 1Hr. Change', field: `market_cap_1h_change`, hide: false,

															cellRenderer: memo(function ({ data }) {

																let value = Number(data.market_cap_1h_change)

																return value ?

																	<LowHighChip
																		Value={value}
																		Currency={'usd'}
																		Locale={StoreLocale} />


																	: "-"
															})
														},
														{
															headerName: 'Mkt. Cap 24Hr. Change %', field: `data.market_cap_change_percentage_24h.${StoreCurrency}`, hide: false,

															cellRenderer: memo(function ({ data }) {
																let value = Number(data.data.market_cap_change_percentage_24h[StoreCurrency])
																return value ?

																	<LowHighChip Value={value} />


																	: "-"
															})

														},
														{
															headerName: 'Total Volume', field: `data.total_volume`, hide: false,
															valueFormatter: ({ value }) => {
																return value || "-"
															}
														},
														{
															headerName: 'Total Volume BTC', field: `data.total_volume_btc`, hide: false,
															valueFormatter: ({ value }) => {
																return value ? CurrencyFormatter(StoreLocale, 'btc', Number(value)) : "-"
															}
														},
														{ headerName: 'Sparkline', field: `data.sparkline`, hide: false, cellRenderer: memo(SparkLineImgRenderer), sortable: false },
													]
												}

											/>


										</CardBody>
									</Card>


								</div>
								:
								<DataNotThere Text={"Trending Coins, NFTs & Categories data unavailable !"} />

				}

			</TransitionDiv>
		)
	}


	catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While loading Trending section, an error occured !"}
		/>
	}


}

export default TrendingSection