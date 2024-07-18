'use client'
import { memo } from 'react'
import { Spinner, User, Card, CardBody, } from "@nextui-org/react";
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { Fetcher } from '@/app/utils/Swr/Fetcher';
import FetchingOptions from '@/app/utils/Swr/FetchingOptions';
import { ZustandStore } from '@/app/store/store';
import CurrencyFormatter from '@/app/utils/Currency/CurrencyFormatter';
import SimpleDateTime from '@/app/utils/DateTime/SimpleDateTime';
import NumberFormat from '@/app/utils/Number/NumberFormat';
import { useShallow } from 'zustand/react/shallow'


import TransitionDiv from '../../TransitionDiv/TransitionDiv';
import SectionHeader from '../../SectionHeader/SectionHeader';
import TableSkeleton from '../../Skeletons/TableSkeleton';


const Sparkline = dynamic(() => import("../../Graphs/Sparkline"))
const WatchListBtn = dynamic(() => import("../../WatchList/WatchListBtn/WatchListBtn"))
const ComponentLevelError = dynamic(() => import("../../ComponentLevelError/ComponentLevelError"))
const WatchListHeader = dynamic(() => import("../../MyTable/Headers/WatchListHeader"))
const MyTable = dynamic(() => import("../../MyTable/MyTable"))
const LowHighChip = dynamic(() => import("../../LowHighChip/LowHighChip"))




const CoinHomeTabs = () => {
	try {

		const { StoreCurrency, StoreLocale } = ZustandStore(useShallow((state) => state))
		const CoinData = useSWR('/api/coin_market_data?currency=' + StoreCurrency + "&locale=" + StoreLocale, Fetcher, { ...FetchingOptions('45sec') })


		return (

			<TransitionDiv >

				<Card radius='sm' shadow='sm' className='mb-4'>
					<CardBody>
						<SectionHeader
							SectionID={"Coins"}
							SectionName={"Coin Prices by Market Cap"}
							InfoContentTitle={"Coins Mkt. data"}
							InfoContent={<ul className='list-disc'>
								<li className='ml-4'>Shows all the coins market data.</li>
								<li className='ml-4'>Auto Updates in every 45 seconds.</li>
							</ul>}
						/>
						{
							CoinData.isLoading

								?
								<TableSkeleton>
									<Spinner label={"Getting Cryptocurrency Prices data ..."} color="primary" labelColor="primary" />
								</TableSkeleton>
								:
								CoinData.error
									?
									<ComponentLevelError
										Msg={"While loading Cryptocurrency Prices section, an error occured !"}
										ErrorObj={CoinData.error}
										Mutate={CoinData.mutate} />
									:

									CoinData.data
										?

										<MyTable
											isBasic={false}
											GoToLink={'/coins'}

											Data={CoinData.data}
											ColumnsList={[
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
												// Sr. No.
												{
													headerName: "Sr. No.",
													field: "sr_no",
													pinned: 'left',
													maxWidth: 120,
												},
												// NAME
												{
													headerName: 'Name', field: 'name', hide: false,
													cellRenderer: memo(({ data }) => <User
														name={data.name}
														description={data.symbol.toUpperCase()}
														avatarProps={{
															src: data.image
														}}
													/>),
													pinned: 'left',
												},
												{ headerName: 'Mkt. Cap Rank', field: 'market_cap_rank', hide: true },
												// CURRENT PRICE
												{
													headerName: "Price",
													field: "current_price",
													hide: false,
													pinned: false,
													"enableCellChangeFlash": true,
													valueFormatter: ({ value }) => {

														return value ? CurrencyFormatter(StoreLocale, StoreCurrency, Number(value))
															: '-'
													},
													headerTooltip: "Current Price"


												},

												// Price Change 24Hr.
												{
													headerName: "Price Change 24Hr.",
													field: "price_change_24h",
													hide: true,
													pinned: false,
													"enableCellChangeFlash": true,
													cellRenderer: memo(function ({ data }) {
														let value = Number(data.price_change_24h)
														return value ?
															<LowHighChip
																Value={value}
																Currency={StoreCurrency}
																Locale={StoreLocale} />
															:
															"-"
													})
													,
												},

												// Mkt. Cap Change 24Hr.
												{
													headerName: "24Hr. Mkt. Cap Change",
													field: "market_cap_change_24h",
													hide: true,
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
												// Mkt. Cap Change % 24Hr.
												{
													headerName: "Mkt. Cap Change % 24Hr.",
													field: "market_cap_change_percentage_24h",
													hide: true,
													pinned: false,
													"enableCellChangeFlash": true,
													cellRenderer: memo(function ({ data }) {
														let value = Number(data.market_cap_change_percentage_24h)
														return value ?

															<LowHighChip Value={value} />

															: "-"
													})
													,
													headerTooltip: "Mkt. Cap Change % 24Hr."
												},
												// Price Change % 1Hr.
												{
													headerName: "1Hr.",
													field: "price_change_percentage_1h_in_currency",
													hide: false,
													pinned: false,
													"enableCellChangeFlash": true,
													cellRenderer: memo(function ({ data }) {
														let value = Number(data.price_change_percentage_1h_in_currency)
														return value ?
															<LowHighChip Value={value} />

															: "-"
													})
													,
													headerTooltip: "Price Change % 1Hr."
												},
												// Price Change % 24 Hr.
												{
													headerName: "24Hr.",
													field: "price_change_percentage_24h_in_currency",
													hide: false,
													pinned: false,
													"enableCellChangeFlash": true,
													cellRenderer: memo(function ({ data }) {
														let value = Number(data.price_change_percentage_24h_in_currency)
														return value ?
															<LowHighChip Value={value} />

															: "-"
													}),
													headerTooltip: "Price Change % 24Hr."
												},
												//  Price Change % 7D.
												{
													headerName: "7D.",
													field: "price_change_percentage_7d_in_currency",
													hide: false,
													pinned: false,
													"enableCellChangeFlash": true,
													cellRenderer: memo(function ({ data }) {
														let value = Number(data.price_change_percentage_7d_in_currency)
														return value ?
															<LowHighChip Value={value} />

															: "-"
													}),
													headerTooltip: "Price Change % 7D."
												},
												// Price Change % 14D.
												{
													headerName: "14D.",
													field: "price_change_percentage_14d_in_currency",
													hide: false,
													pinned: false,
													"enableCellChangeFlash": true,
													cellRenderer: memo(function ({ data }) {
														let value = Number(data.price_change_percentage_14d_in_currency)
														return value ?
															<LowHighChip Value={value} />

															: "-"
													}),
													headerTooltip: "Price Change % 14D."

												},
												// Price Change % 30D.
												{
													headerName: "30D.",
													field: "price_change_percentage_30d_in_currency",
													hide: false,
													pinned: false,
													"enableCellChangeFlash": true,
													cellRenderer: memo(function ({ data }) {
														let value = Number(data.price_change_percentage_30d_in_currency)
														return value ?
															<LowHighChip Value={value} />

															: "-"
													}),
													headerTooltip: "Price Change % 30D."

												},
												// Price Change % 200D.
												{
													headerName: "200D.",
													field: "price_change_percentage_200d_in_currency",
													hide: true,
													pinned: false,
													"enableCellChangeFlash": true,
													cellRenderer: memo(function ({ data }) {
														let value = Number(data.price_change_percentage_200d_in_currency)
														return value ?
															<LowHighChip Value={value} />

															: "-"
													}),
													headerTooltip: "Price Change % 200D."

												},
												// Price Change % 1Yr.
												{
													headerName: "1Yr.",
													field: "price_change_percentage_1y_in_currency",
													hide: true,
													pinned: false,
													"enableCellChangeFlash": true,
													cellRenderer: memo(function ({ data }) {
														let value = Number(data.price_change_percentage_1y_in_currency)
														return value ?
															<LowHighChip Value={value} />

															: "-"
													}),
													headerTooltip: "Price Change % 200D."
												},
												// High 24Hr.
												{
													headerName: "24Hr. High",
													field: "high_24h",
													"hide": true,
													pinned: false,
													"enableCellChangeFlash": true,
													valueFormatter: ({ value }) => {
														return value ? CurrencyFormatter(StoreLocale, StoreCurrency, Number(value))
															: '-'
													},
												},
												// Low 24Hr.
												{
													headerName: "24Hr. Low",
													field: "low_24h",
													"hide": true,
													pinned: false,
													"enableCellChangeFlash": true,
													valueFormatter: ({ value }) => {
														return value ? CurrencyFormatter(StoreLocale, StoreCurrency, Number(value))
															: '-'
													},
												},

												// Mkt. Cap
												{
													headerName: "Mkt. Cap",
													field: "market_cap",
													hide: false,
													pinned: false,
													"enableCellChangeFlash": true,
													valueFormatter: ({ value }) => {
														return value ? CurrencyFormatter(StoreLocale, StoreCurrency, Number(value))
															: '-'
													},
													headerTooltip: "Market Cap"

												},
												// Fully Diluted Valuation
												{
													headerName: "FDV",
													field: "fully_diluted_valuation",
													hide: true,
													pinned: false,
													"enableCellChangeFlash": true,
													valueFormatter: ({ value }) => {
														return value ? CurrencyFormatter(StoreLocale, StoreCurrency, Number(value))
															: '-'
													},
													headerTooltip: "Fully Diluted Valuation"
												},
												// "Mkt. Cap/FDV"
												{
													headerName: "Mkt. Cap/FDV",
													field: "mcap/fdv",
													hide: true,
													pinned: false,
													"enableCellChangeFlash": true,
													valueGetter: ({ data }) => {

														return data.market_cap && data.fully_diluted_valuation ? Number(data.market_cap / data.fully_diluted_valuation).toFixed(2)
															: '-'
													},
												},
												// Total Vol.
												{
													headerName: "Total Volume",
													field: "total_volume",
													hide: false,
													pinned: false,
													"enableCellChangeFlash": true,
													valueFormatter: ({ value }) => {
														return value ? NumberFormat(StoreLocale, Number(value))
															: '-'
													},
												},
												// Circulating Supply
												{
													headerName: "Circulating Supply",
													field: "circulating_supply",
													"hide": false,
													pinned: false,
													"enableCellChangeFlash": true,
													valueFormatter: ({ value }) => {
														return value ? NumberFormat(StoreLocale, Number(value))
															: '-'
													}
												},

												// Max Supply
												{
													headerName: "Max Supply",
													field: "max_supply",
													"hide": true,
													pinned: false,
													"enableCellChangeFlash": true,
													valueFormatter: ({ value }) => {
														return value ? NumberFormat(StoreLocale, Number(value))
															: '-'
													}
												},
												// Total Supply
												{
													headerName: "Total Supply",
													field: "total_supply",
													"hide": true,
													pinned: false,
													"enableCellChangeFlash": true,
													valueFormatter: ({ value }) => {
														return value ? NumberFormat(StoreLocale, Number(value))
															: '-'
													}
												},

												// ATH
												{
													headerName: "ATH",
													field: "ath",
													"hide": true,
													pinned: false,
													"enableCellChangeFlash": true,
													valueFormatter: ({ value }) => {
														return value ? CurrencyFormatter(StoreLocale, StoreCurrency, Number(value))
															: '-'
													}
												},
												// ATH Change %
												{
													headerName: "ATH Change %",
													field: "ath_change_percentage",
													hide: true,
													pinned: false,
													"enableCellChangeFlash": true,
													cellRenderer: memo(function ({ data }) {
														let value = Number(data.atl_change_percentage)
														return value ?
															<LowHighChip Value={value} />

															: "-"
													})
												},
												// ATH Date
												{
													headerName: "ATH Date",
													field: "ath_date",
													hide: true,
													pinned: false,
													"enableCellChangeFlash": true,
													valueFormatter: ({ value }) => {
														return value ? SimpleDateTime(value)
															: '-'
													}
												},
												// ATL
												{
													headerName: "ATL",
													field: "atl",
													"hide": true,
													pinned: false,
													"enableCellChangeFlash": true,
													valueFormatter: ({ value }) => {
														return value ? CurrencyFormatter(StoreLocale, StoreCurrency, Number(value))
															: '-'
													}
												},

												// ATL Change %
												{
													headerName: "ATL Change %",
													field: "atl_change_percentage",
													hide: true,
													pinned: false,
													"enableCellChangeFlash": true,
													cellRenderer: memo(function ({ data }) {
														let value = Number(data.atl_change_percentage)
														return value ?
															<LowHighChip Value={value} />

															: "-"
													})
												},
												//ATL Date
												{
													headerName: "ATL Date",
													field: "atl_date",
													hide: true,
													pinned: false,
													"enableCellChangeFlash": true,
													valueFormatter: ({ value }) => {
														return value ? SimpleDateTime(value)
															: '-'
													}
												},
												// ROI Times

												{
													headerName: "ROI Times",
													field: "roi.times",
													pinned: false,
													hide: true,
													valueGetter: ({ data }) =>
														data.roi ? data.roi.times : "-",
													headerTooltip: "Return on Investment Times"
												},
												// ROI Currency
												{
													headerName: "ROI Currency",
													field: "roi.currency",

													pinned: false,
													hide: true,
													valueGetter: ({ data }) =>
														data.roi ? data.roi.currency.toUpperCase() : "-",
													headerTooltip: "Return on Investment Currency"
												},

												// ROI %
												{
													headerName: "ROI %",
													field: "roi.percentage",
													pinned: false,
													hide: true,
													valueGetter: ({ data }) =>
														data.roi ? data.roi.percentage : "-",
													headerTooltip: "Return on Investment Percentage"
												},

												// Sparkline In 7D.
												{
													headerName: "Sparkline In 7D.",
													field: "sparkline_in_7d",
													hide: false,
													pinned: false,
													"enableCellChangeFlash": true,
													cellRenderer: memo(({ data }) => data.sparkline_in_7d.price ? <Sparkline
														Width={150}
														Height={50}
														Data={data.sparkline_in_7d.price} />
														: "-")
													,
													sortable: false,
												},

												// Last Updated
												{
													headerName: "Last Updated",
													field: "last_updated",
													"hide": true,
													pinned: false,
													"enableCellChangeFlash": true,
													valueFormatter: ({ value }) => {
														return value ? SimpleDateTime(value)
															: '-'
													}
												},



											]}
										/>



										:

										"No Data"

						}

					</CardBody>
				</Card>
			</TransitionDiv>
		)





	} catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While loading Cryptocurrency Prices section, an error occured !"}
		/>
	}

}

export default CoinHomeTabs