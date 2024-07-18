"use client";

import {
	Spinner,
	Card,
	CardBody,
	Progress,
	Snippet,
	Tabs,
	Tab,
	User,
	Skeleton,
} from "@nextui-org/react";
import useSWR from "swr";
import { Fetcher } from "@/app/utils/Swr/Fetcher";

import FetchingOptions from "@/app/utils/Swr/FetchingOptions";
import { ZustandStore } from "@/app/store/store";
import {
	FaCircleCheck,
	FaRegCopy,
	FaTriangleExclamation,
} from "react-icons/fa6";
import CurrencyFormatter from "@/app/utils/Currency/CurrencyFormatter";
import NumberFormat from "@/app/utils/Number/NumberFormat";
import SimpleDateTime from "@/app/utils/DateTime/SimpleDateTime";
import Capitalized from "@/app/utils/Text/Capitalized";
import ToHTML from "@/app/utils/ToHTML/ToHTML";

import { BsFillCheckCircleFill } from "react-icons/bs";

import { useShallow } from "zustand/react/shallow";


import dynamic from "next/dynamic";

import SectionHeader from '../../SectionHeader/SectionHeader'
import DetailsCardSkeleton from "../../Skeletons/DetailsCardSkeleton"
import TransitionDiv from "../../TransitionDiv/TransitionDiv"
import TableSkeleton from "../../Skeletons/TableSkeleton"
import ChartSkeleton from "../../Skeletons/ChartSkeleton"
import ExternalLink from "../../ExternalLink/ExternalLink";



const Sparkline = dynamic(() => import("@/app/components/Graphs/Sparkline"))
const CoinConverter = dynamic(() => import("@/app/components/Coin/CoinDetails/CoinConverter/CoinConverter"))
const DataNotThere = dynamic(() => import("../../DataNotThere/DataNotThere"))
const CoinOHLC = dynamic(() => import("./CoinOHLC/CoinOHLC"))
const WatchListBtn = dynamic(() => import("../../WatchList/WatchListBtn/WatchListBtn"))
const LowHighChip = dynamic(() => import("../../LowHighChip/LowHighChip"))
const HrWithText = dynamic(() => import("@/app/components/HrWithText/HrWithText"))
const InfoPopup = dynamic(() => import("@/app/components/InfoPopup/InfoPopup"))
const BarGraph = dynamic(() => import("@/app/components/Graphs/BarGraph"))


const Caraousel = dynamic(() => import("@/app/components/Caraousel/Caraousel"))
const MarketChart = dynamic(() => import("./MarketChart/MarketChart"))
const PublicTreasury = dynamic(() => import("@/app/components/Coin/CoinDetails/PublicTreasury/PublicTreasury"))
const CoinMarkets = dynamic(() => import('@/app/components/Coin/CoinDetails/CoinMarkets/CoinMarkets'))
const CoinHistory = dynamic(() => import('@/app/components/Coin/CoinDetails/CoinHistory/CoinHistory'))

const ComponentLevelError = dynamic(() => import('@/app/components/ComponentLevelError/ComponentLevelError'))



const CoinDetails = ({ CoinId }) => {
	try {
		const { data, error, isLoading, mutate } = useSWR(
			"/api/coin_id?id=" + CoinId,
			Fetcher,
			{ ...FetchingOptions("60sec") }
		);
		const { StoreCurrency, StoreLocale } = ZustandStore(
			useShallow((state) => state)
		);

		return (
			<TransitionDiv>
				{isLoading ? (
					<div className="flex flex-col gap-4">
						<Card radius="sm" shadow="sm">
							<CardBody>
								<SectionHeader
									SectionID={"CoinDetails"}
									SectionName={`Coin Details`}
									InfoContentTitle={`Coin Details`}
									InfoContent={
										<ul className="list-disc">
											<li className="ml-4">
												Shows Coin details.
											</li>
											<li className="ml-4">
												Auto Updates in every 60
												seconds.
											</li>
											<li className="ml-4">
												Reddit, Telegram, and Twitter is
												updated on daily basis
											</li>
										</ul>
									}
								/>

								<DetailsCardSkeleton>
									<Spinner
										label={`Getting Coin details for Coin ID : ${CoinId}`}
										color="primary"
										labelColor="primary"
									/>
								</DetailsCardSkeleton>
							</CardBody>
						</Card>

						{/* COIN MARKETS */}
						<Card radius="sm" shadow="sm">
							<CardBody>
								<SectionHeader
									SectionID={"Markets"}
									SectionName={`Markets`}
									InfoContentTitle={"Markets"}
									InfoContent={
										<ul className="list-disc">
											<li className="ml-4">
												Shows Coin tickers data.
											</li>
											<li className="ml-4">
												Auto Updates in every 45
												seconds.
											</li>
											<li className="ml-4">
												Price: Latest unconverted price
												in the respective pair target
												currency
											</li>
											<li className="ml-4">
												Volume: Unconverted 24h trading
												volume in the respective pair
												target currency
											</li>
											<li className="ml-4">
												Converted Last: Latest converted
												price in BTC, ETH, and USD
											</li>
											<li className="ml-4">
												Converted Volume: converted 24h
												trading volume in BTC, ETH, and
												USD
											</li>
											<li className="ml-4">
												Timestamp: returns the last time
												that the price has changed
											</li>
											<li className="ml-4">
												Last Traded At: returns the last
												time that the price has changed
											</li>
											<li className="ml-4">
												Last Fetch At: returns the last
												time we call the API
											</li>
											<li className="ml-4">
												<b>Is Stale</b> when ticker that
												has not been updated from the
												exchange for more than 8 hours.
												<div className="flex items-center gap-2">
													<div className="flex items-center gap-2">
														True{" "}
														<span className="text-danger">
															<FaTriangleExclamation />
														</span>
													</div>
													<div className="flex items-center gap-2">
														False{" "}
														<span className="text-success">
															<FaCircleCheck />
														</span>
													</div>
												</div>
											</li>
											<li className="ml-4 flex gap-2 items-center">
												<b>Is Anomaly</b> if ticker's
												price is outliered by our
												system.
												<div className="flex items-center gap-2">
													<div className="flex items-center gap-2">
														True{" "}
														<span className="text-danger">
															<FaTriangleExclamation />
														</span>
													</div>
													<div className="flex items-center gap-2">
														False{" "}
														<span className="text-success">
															<FaCircleCheck />
														</span>
													</div>
												</div>
											</li>
										</ul>
									}
								/>
								<TableSkeleton>
									<Spinner
										label={`Getting Markets data for ${CoinId}`}
										color="primary"
										labelColor="primary"
									/>
								</TableSkeleton>
							</CardBody>
						</Card>

						{/*MARKET CHART */}
						<Card radius="sm" shadow="sm">
							<CardBody>
								<div>
									<SectionHeader
										SectionID={"MarketChart"}
										SectionName={`Market Chart `}
										InfoContentTitle={"Market Chart"}
										InfoContent={
											<ul className="list-disc">
												<li className="ml-4">
													Shows historical data
													(Price, Mkt. Cap etc.) for a
													given date for a coin.
												</li>
												<li className="ml-4">
													Data granularity is 1 day -
													5 Min., 2-90 days - 1 Hr. ,
													91 days above - Daily.
												</li>
												<li className="ml-4">
													Auto Updates every 5
													minutes.
												</li>
												<li className="ml-4">
													Last completed UTC day
													(00:00) is available 35
													minutes after midnight on
													the next UTC day (00:35)
												</li>
											</ul>
										}
									/>
									<ChartSkeleton>
										<Spinner
											label={`Getting Market Chart data for ${CoinId}`}
											color="primary"
											labelColor="primary"
										/>
									</ChartSkeleton>
								</div>
							</CardBody>
						</Card>

						{/* OHLC */}
						<Card radius="sm" shadow="sm">
							<CardBody>
								<SectionHeader
									SectionID={"OHLCData"}
									SectionName={`OHLC Data`}
									InfoContentTitle={"OHLC Data"}
									InfoContent={
										<ul className="list-disc">
											<li className="ml-4">
												Shows OHLC/ Candle Body data
												(Price, Mkt. Cap etc.) for a
												given date for a coin.{" "}
											</li>
											<li className="ml-4">
												Data granularity is 1-2 day - 30
												Min., 3-90 days - 4 Hours, 31
												days days and beyond - 4 days.
											</li>
											<li className="ml-4">
												Auto Updates every 30 minutes.
											</li>
											<li className="ml-4">
												Last completed UTC day (00:00)
												is available 35 minutes after
												midnight on the next UTC day
												(00:35)
											</li>
										</ul>
									}
								/>
								<ChartSkeleton>
									<Spinner
										label={`Getting OHLC data for ${CoinId}`}
										color="primary"
										labelColor="primary"
									/>
								</ChartSkeleton>
							</CardBody>
						</Card>
						{/* HISTORY */}
						<Card radius="sm" shadow="sm">
							<CardBody>
								<SectionHeader
									SectionID={"HistoricalData"}
									SectionName={`Historical Data`}
									InfoContentTitle={"Historical Data"}
									InfoContent={
										<ul className="list-disc">
											<li className="ml-4">
												Shows historical data (Price,
												Mkt. Cap etc.) a coin, data
												returned is at 00:00:00 UTC, for
												a given date.
											</li>
											<li className="ml-4">
												Last completed UTC day (00:00)
												is available 35 minutes after
												midnight on the next UTC day
												(00:35)
											</li>
											<li className="ml-4">
												Select date by clicking on it,
												will automatically set the date.
											</li>
											<li className="ml-4">
												Navigate between Years using
												dropdown.
											</li>
											<li className="ml-4">
												Navigate between Months using
												dropdown or arrows keys.
											</li>
											<li className="ml-4">
												Previously fetched data is
												cleared automatically, when date
												is changed.
											</li>
										</ul>
									}
								/>
								<div className="flex justify-between gap-4 mb-4">
									<Skeleton className="h-8 w-1/4 bg-primary rounded-md" />
									<Skeleton className="h-8 w-1/4 bg-primary rounded-md" />
								</div>
								<ChartSkeleton />
							</CardBody>
						</Card>

						{/* TREASURY */}
						<Card radius="sm" shadow="sm">
							<CardBody>
								<SectionHeader
									SectionID={"PublicTreasury"}
									SectionName={`Public Treasury`}
									InfoContentTitle={"Public Treasury"}
									InfoContent={
										<ul className="list-disc">
											<li className="ml-4">
												Shows public companies bitcoin
												or ethereum holdings (Ordered by
												total holdings descending) for a
												coin.
											</li>
										</ul>
									}
								/>

								<TableSkeleton />
							</CardBody>
						</Card>
					</div>
				) : error ? (
					error.response.status === 404 ? (
						<DataNotThere
							Text={`${error?.response?.data
								? Capitalized(e?.response?.data) + ", "
								: null
								} Coin Details data not available for Coin ID : ${CoinId}`}
						/>
					) : (
						<ComponentLevelError
							ErrorObj={error}
							Msg={
								error?.response?.data ||
								"Error Occured while getting Coin Details"
							}
							Mutate={mutate}
						/>
					)
				) : data ? (
					<div className="flex flex-col gap-4">
						<Card radius="sm" shadow="sm">
							<CardBody>
								<div className="grid grid-cols-12 gap-4 text-tiny ">
									{/* BASIC INFO SECTION */}
									<div className="col-span-12 lg:col-span-4 xl:col-span-3 ">
										<div>
											{/* INFO BUTTON */}

											<div className="mb-2">
												<SectionHeader
													SectionID={"CoinDetails"}
													SectionName={`${data.localization[StoreLocale] || data.name} (${data.symbol.toUpperCase()})`}
													InfoContentTitle={`Coin Details`}
													InfoContent={
														<ul className="list-disc">
															<li className="ml-4">
																Shows Coin
																details.
															</li>
															<li className="ml-4">
																Auto Updates in
																every 60
																seconds.
															</li>
															<li className="ml-4">
																Reddit,
																Telegram, and
																Twitter is
																updated on daily
																basis
															</li>
														</ul>
													}
												/>
											</div>

											{/* IMAGE NAME SYMBOL */}
											<div className="flex gap-2 flex-col mb-2">
												<div className="flex justify-between">
													<div>
														<div className="flex flex-row flex-wrap justify-start gap-2">
															<img
																src={
																	data.image
																		.large ||
																	data.image
																		.small ||
																	data.image
																		.thumb ||
																	null
																}
																alt={data.name}
																className=" rounded-full object-contain h-12 w-12"
															/>
															<div className="flex flex-col">
																<h3 className="font-bold text-lg">
																	{data
																		.localization[StoreLocale]
																		? data.localization[StoreLocale]
																		: data.name}{" "}
																</h3>
																{data.symbol ? (
																	<h6 className=" text-sm">
																		{data.symbol.toUpperCase()}
																	</h6>
																) : (
																	<h6 className="text-danger text-sm">
																		Unavailable
																	</h6>
																)}
															</div>
														</div>
													</div>

													<WatchListBtn
														DataObj={data}
													/>
												</div>
												{data.market_data.sparkline_7d
													.price ? (
													<Sparkline
														aria-label='Sparkline'
														Width={"100%"}
														Height={"75%"}
														Data={data.market_data.sparkline_7d.price}
													/>
												) : null}
											</div>

											{/* CURRRENT PRICE , 24 Hours range,  */}
											<div className="flex flex-wrap flex-col gap-2">
												<div className="flex flex-wrap gap-2 items-center">
													<p className="text-4xl font-bold">
														{CurrencyFormatter(
															StoreLocale,
															StoreCurrency,
															data.market_data.current_price[StoreCurrency]
														)}
													</p>

													<LowHighChip Value={data.market_data.market_cap_change_percentage_24h.toFixed(2)} />




												</div>
												{/* BTC ETH */}
												<div className="flex flex-wrap gap-4 text-tiny items-center">
													<div className="flex flex-wrap gap-2 items-center">
														<div>
															{data.market_data
																.current_price[
																"btc"
															] ? (
																<div className="flex gap-2 flex-wrap items-center">
																	<div className="font-bold">
																		BTC :
																	</div>

																	<div>
																		{
																			data.market_data.current_price["btc"]
																		}
																	</div>
																	<LowHighChip Value={data.market_data.price_change_percentage_24h_in_currency['btc']} />


																</div>
															) : (
																<div className="text-danger">
																	Unavailable
																</div>
															)}
														</div>
													</div>

													<div className="flex flex-wrap gap-2 items-center">
														{data.market_data.current_price["eth"] ? (
															<div className="flex gap-2 items-center">
																<div className="font-bold">
																	ETH
																</div>
																<div>
																	{
																		data.market_data.current_price["eth"]
																	}
																</div>
																<LowHighChip Value={data.market_data.price_change_percentage_24h_in_currency['eth']} />

															</div>
														) : (
															<div className="text-danger">
																Unavailable
															</div>
														)}
													</div>
												</div>

												{/* PROGRESSBAR */}
												<div className="flex flex-wrap flex-col gap-2 mb-4">
													<Progress
														classNames={{
															track: "bg-secondary border border-primary",
														}}
														color="primary"
														minValue={0}
														maxValue={Math.abs(
															data.market_data
																.high_24h[
															StoreCurrency
															] -
															data.market_data
																.low_24h[
															StoreCurrency
															]
														)}
														value={Math.abs(
															data.market_data
																.low_24h[
															StoreCurrency
															] -
															data.market_data
																.current_price[
															StoreCurrency
															]
														)}
													/>
													<div className="flex gap-2 justify-between text-tiny">
														<div>
															{CurrencyFormatter(
																StoreLocale,
																StoreCurrency,
																data.market_data
																	.low_24h[
																StoreCurrency
																]
															)}
														</div>
														<div className="font-bold">
															24 Hours Range
														</div>
														<div>
															{CurrencyFormatter(
																StoreLocale,
																StoreCurrency,
																data.market_data
																	.high_24h[
																StoreCurrency
																]
															)}
														</div>
													</div>
												</div>

												{/* INFO SECTION */}
												<div className="flex flex-col text-tiny gap-2">
													{/* Last Updated */}
													<div className="flex flex-wrap items-center justify-between">
														<div>Last Updated</div>
														{data.last_updated ? (
															<div>
																{SimpleDateTime(
																	data.last_updated
																)}
															</div>
														) : (
															<div className="text-danger">
																Unavailable
															</div>
														)}
													</div>

													{/* Mkt. Cap */}
													<div className="flex flex-wrap items-center justify-between">
														<div>Mkt. Cap</div>
														{data.market_data
															.market_cap ? (
															<div>
																{CurrencyFormatter(
																	StoreLocale,
																	StoreCurrency,
																	data
																		.market_data
																		.market_cap[
																	StoreCurrency
																	]
																)}
															</div>
														) : (
															<div className="text-danger">
																Unavailable
															</div>
														)}
													</div>
													{/* Mkt. Cap / FDV */}
													<div className="flex flex-wrap items-center justify-between">
														<div>
															Mkt. Cap / FDV
														</div>
														{data.market_data
															.market_cap_fdv_ratio ? (
															<div>
																{data.market_data.market_cap_fdv_ratio.toFixed(
																	2
																)}
															</div>
														) : (
															<div className="text-danger">
																Unavailable
															</div>
														)}
													</div>
													{/* Fully Diluted Valuation */}
													<div className="flex flex-wrap items-center justify-between">
														<div>
															Fully Diluted
															Valuation (FDV)
														</div>
														{data.market_data
															.fully_diluted_valuation ? (
															<div>
																{data
																	.market_data
																	.fully_diluted_valuation[
																	StoreCurrency
																] ? (
																	<div>
																		{CurrencyFormatter(
																			StoreLocale,
																			StoreCurrency,
																			data
																				.market_data
																				.fully_diluted_valuation[
																			StoreCurrency
																			]
																		)}
																	</div>
																) : (
																	<div className="text-danger">
																		Unavailable
																	</div>
																)}
															</div>
														) : (
															<div className="text-danger">
																Unavailable
															</div>
														)}
													</div>

													{/* Mkt. Cap Change 24 Hours  */}
													<div className="flex flex-wrap items-center justify-between">
														<div>Mkt. Cap Change 24Hr.</div>
														<LowHighChip Currency={StoreCurrency} Locale={StoreLocale} Value={data.market_data.market_cap_change_24h_in_currency[StoreCurrency]} />
													</div>
													{/* Mkt. Cap Change % 24 Hours  */}
													<div className="flex flex-wrap items-center justify-between">
														<div>Mkt. Cap Change % 24Hr.</div>
														<LowHighChip Value={data.market_data.market_cap_change_percentage_24h_in_currency[StoreCurrency]} />
													</div>
													{/* TOTAL VOLUME */}
													<div className="flex items-center flex-wrap justify-between">
														<div>Total Vol.</div>

														{data.market_data
															.total_volume ? (
															<div>
																{CurrencyFormatter(
																	StoreLocale,
																	StoreCurrency,
																	data
																		.market_data
																		.total_volume[
																	StoreCurrency
																	]
																)}
															</div>
														) : (
															<div className="text-danger">
																Unavailable
															</div>
														)}
													</div>

													{/* Price Change 24 Hours  */}
													<div className="flex flex-wrap items-center justify-between">
														<div>Price Change 24Hr.</div>


														<LowHighChip Currency={StoreCurrency}
															Locale={StoreLocale}
															Value={data.market_data.price_change_24h_in_currency[StoreCurrency]} />
													</div>

													{/* Total Supply */}
													<div className="flex flex-wrap items-center justify-between">
														<div>Total Supply</div>
														<div>
															{data.market_data
																.total_supply ? (
																<div>
																	{" "}
																	{NumberFormat(
																		StoreLocale,
																		data
																			.market_data
																			.total_supply
																	)}
																</div>
															) : (
																<div className="text-danger">
																	Unavailable
																</div>
															)}
														</div>
													</div>
													{/* Circulating Supply */}
													<div className="flex items-center flex-wrap justify-between">
														<div>
															Circulating Supply
														</div>

														{data.market_data
															.circulating_supply ? (
															<div>
																{NumberFormat(
																	StoreLocale,
																	data
																		.market_data
																		.circulating_supply
																)}
															</div>
														) : (
															<div className="text-danger">
																Unavailable
															</div>
														)}
													</div>
													{/* Max Supply */}
													<div className="flex items-center flex-wrap justify-between">
														<div>Max Supply</div>
														{data.market_data
															.max_supply ? (
															NumberFormat(
																StoreLocale,
																data.market_data
																	.max_supply
															)
														) : (
															<div className="text-danger">
																Unavailable
															</div>
														)}
													</div>
													{/* 24 Hours Trading Vol. */}
													<div className="flex items-center flex-wrap justify-between">
														<div>
															24 Hours Trading
															Vol.
														</div>
														{data.market_data
															.total_volume ? (
															<div>
																{CurrencyFormatter(
																	StoreLocale,
																	StoreCurrency,
																	data
																		.market_data
																		.total_volume[
																	StoreCurrency
																	]
																)}
															</div>
														) : (
															<div className="text-danger">
																Unavailable
															</div>
														)}
													</div>

													{/* Public Notice */}
													<div className="flex flex-col gap-2">
														<div className="flex flex-col gap-2">
															<HrWithText
																Text={
																	"Public Notice"
																}
															/>

															{data.public_notice ? (
																<div className="[&>a]:text-primary p-4 bg-warning/25 rounded-md">
																	{ToHTML(
																		data.public_notice
																	)}
																</div>
															) : (
																<div>-</div>
															)}
														</div>
														{/* Additional Notices */}
														<div className="flex flex-col gap-2 mb-2">
															<HrWithText
																Text={
																	"Additional Notices"
																}
															/>

															{data.additional_notices.filter(
																(v) => v
															).length ? (
																data.additional_notices.map(
																	(n, i) => (
																		<div key={n}>
																			{n}
																		</div>
																	)
																)
															) : (
																<div>-</div>
															)}
														</div>
													</div>
												</div>
											</div>
											{/* COIN CONVERTER */}
											<div className="flex flex-col gap-2">
												<HrWithText
													Text={"Coin converter"}
												/>
												<CoinConverter
													Prices={
														data.market_data
															.current_price
													}
													CoinSymbol={data.symbol}
													CoinName={
														data.localization[
															StoreLocale
														]
															? data.localization[
															StoreLocale
															]
															: data.name
													}
												/>
											</div>
										</div>
									</div>
									{/* TABS SECTION */}

									<div className="col-span-12 lg:col-span-8 xl:col-span-9">
										<Tabs
											radius="sm"
											variant="solid"
											color="primary"
											classNames={{
												tabList: "bg-secondary",
												tabContent:
													"group-data-[selected=true]:text-secondary group-data-[selected=true]:font-bold",
											}}
											aria-label="Coin details"
										>
											<Tab
												title={"Mkt. Info."}
												key="marketInfo"
												aria-label="Market Info"
											>
												<div className="grid grid-cols-12 gap-4">
													<div className="col-span-12 lg:col-span-12 xl:col-span-4">
														<div className="flex flex-col text-tiny gap-2">
															<HrWithText
																Text={"Info"}
															/>
															{/* COIN ID */}
															<div className="flex  flex-wrap justify-between items-center">
																<div>
																	API ID
																</div>

																<Snippet
																	hideSymbol={
																		true
																	}
																	radius="sm"
																	size="sm"
																	variant="flat"
																	color="secondary"
																	copyIcon={
																		<FaRegCopy />
																	}
																	checkIcon={
																		<BsFillCheckCircleFill />
																	}
																	className="text-tiny bg-secondary text-primary"
																	codeString={
																		data.id
																	}
																	tooltipProps={{
																		showArrow: true,
																		size: "sm",
																		content:
																			"Copy API ID for " +
																			data
																				.localization[
																			StoreLocale
																			],
																		color: "secondary",
																		className:
																			"text-foreground shadow-md",
																	}}
																>
																	{data.id}
																</Snippet>
															</div>

															{/* TVL */}
															<div className="flex flex-wrap justify-between items-center">
																<div>TVL</div>

																{data
																	.market_data
																	.total_value_locked ? (
																	Object.keys(
																		data
																			.market_data
																			.total_value_locked
																	).map(
																		(
																			t,
																			i
																		) => (
																			<span key={t}>
																				{t.toUpperCase()}{" "}
																				:{" "}
																				{
																					data
																						.market_data
																						.total_value_locked[
																					t
																					]
																				}
																			</span>
																		)
																	)
																) : (
																	<div className="text-danger">
																		Unavailable
																	</div>
																)}
															</div>
															{/* Mkt. Cap/TVL Ratio */}
															<div className="flex justify-between flex-wrap  items-center">
																<div>
																	Mkt. Cap/TVL
																	Ratio
																</div>
																{data
																	.market_data
																	.mcap_to_tvl_ratio ? (
																	data
																		.market_data
																		.mcap_to_tvl_ratio
																) : (
																	<div className="text-danger">
																		Unavailable
																	</div>
																)}
															</div>
															{/* FDV/TVL Ratio */}
															<div className="flex justify-between  flex-wrap items-center">
																<div>
																	FDV/TVL
																	Ratio
																</div>
																{data
																	.market_data
																	.fdv_to_tvl_ratio ? (
																	data
																		.market_data
																		.fdv_to_tvl_ratio
																) : (
																	<div className="text-danger">
																		Unavailable
																	</div>
																)}
															</div>
															{/* Asset Platform ID */}
															<div className="flex justify-between  flex-wrap items-center">
																<div>
																	Asset
																	Platform ID
																</div>
																{data.asset_platform_id ? (
																	<div>
																		{
																			data.asset_platform_id
																		}
																	</div>
																) : (
																	<div className="text-danger">
																		Unavailable
																	</div>
																)}
															</div>
															{/* Country Origin */}
															<div className="flex justify-between  flex-wrap items-center">
																<div>
																	Country
																	Origin
																</div>
																{data.country_origin ? (
																	<div>
																		{
																			data.country_origin
																		}
																	</div>
																) : (
																	<div className="text-danger">
																		Unavailable
																	</div>
																)}
															</div>
															{/* Genesis Date */}
															<div className="flex justify-between flex-wrap items-center">
																<div>
																	Genesis Date
																</div>
																{data.genesis_date ? (
																	<div>
																		{SimpleDateTime(
																			data.genesis_date
																		)}
																	</div>
																) : (
																	<div className="text-danger">
																		Unavailable
																	</div>
																)}
															</div>
															{/* Block Time In Min. */}
															<div className="flex justify-between flex-wrap items-center">
																<div>
																	Block Time
																	In Min.
																</div>
																{data.block_time_in_minutes ? (
																	<div>
																		{
																			data.block_time_in_minutes
																		}
																	</div>
																) : (
																	<div className="text-danger">
																		Unavailable
																	</div>
																)}
															</div>
															{/* hashing_algorithm */}
															<div className="flex justify-between flex-wrap  items-center">
																<div>
																	Hashing
																	Algorithm
																</div>
																{data.hashing_algorithm ? (
																	<div>
																		{
																			data.hashing_algorithm
																		}
																	</div>
																) : (
																	<div className="text-danger">
																		Unavailable
																	</div>
																)}
															</div>
															{/* preview_listing */}
															<div className="flex justify-between flex-wrap items-center">
																<div>
																	Preview
																	Listing
																</div>

																<div>
																	{Capitalized(
																		data.preview_listing.toString()
																	)}
																</div>
															</div>

															{/* ROI */}
															<div className="flex flex-col gap-2">
																<HrWithText
																	Text={"ROI"}
																/>
																{data
																	.market_data
																	.roi ? (
																	<div className="flex flex-col justify-between gap-2">
																		<span>
																			Times
																			:{" "}
																			{data
																				.market_data
																				.roi
																				.times ? (
																				data.market_data.roi.times.toFixed(
																					2
																				)
																			) : (
																				<span className="text-danger">
																					Unavailable
																				</span>
																			)}
																		</span>
																		<span>
																			Percentage
																			:{" "}
																			{data
																				.market_data
																				.roi
																				.percentage ? (
																				data.market_data.roi.percentage.toFixed(
																					2
																				)
																			) : (
																				<span className="text-danger">
																					Unavailable
																				</span>
																			)}
																		</span>
																		<span>
																			Currency
																			:{" "}
																			{data
																				.market_data
																				.roi
																				.currency ? (
																				data.market_data.roi.currency.toUpperCase()
																			) : (
																				<span className="text-danger">
																					Unavailable
																				</span>
																			)}
																		</span>
																	</div>
																) : (
																	<div className="text-danger">
																		Unavailable
																	</div>
																)}
															</div>

															{/* ALL TIME */}
															<div className="flex flex-col gap-2">
																<HrWithText
																	Text={
																		"All Time"
																	}
																/>

																{/* ATH */}
																<div className="flex flex-wrap justify-between items-center">
																	<div>
																		ATH
																	</div>

																	{data
																		.market_data
																		.ath ? (
																		<div>
																			{CurrencyFormatter(
																				StoreLocale,
																				StoreCurrency,
																				data
																					.market_data
																					.ath[
																				StoreCurrency
																				]
																			)}
																		</div>
																	) : (
																		<div className="text-danger">
																			Unavailable
																		</div>
																	)}
																</div>
																{/* ATH Change % */}
																<div className="flex flex-wrap justify-between items-center">
																	<div>
																		ATH
																		Change %
																	</div>
																	{data
																		.market_data
																		.ath_change_percentage[StoreCurrency] ?
																		<LowHighChip
																			Value={data.market_data.ath_change_percentage[StoreCurrency]} />
																		: (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																</div>
																{/* ATH Date */}
																<div className="flex flex-wrap justify-between items-center">
																	<div>
																		ATH Date
																	</div>
																	{data
																		.market_data
																		.ath_date ? (
																		<div>
																			{SimpleDateTime(
																				data
																					.market_data
																					.ath_date[
																				StoreCurrency
																				]
																			)}
																		</div>
																	) : (
																		<div className="text-danger">
																			Unavailable
																		</div>
																	)}
																</div>
																{/* ATL */}
																<div className="flex flex-wrap justify-between items-center">
																	<div>
																		ATL
																	</div>
																	{data
																		.market_data
																		.atl ? (
																		<div>
																			{CurrencyFormatter(
																				StoreLocale,
																				StoreCurrency,
																				data
																					.market_data
																					.atl[
																				StoreCurrency
																				]
																			)}
																		</div>
																	) : (
																		<div className="text-danger">
																			Unavailable
																		</div>
																	)}
																</div>
																{/* ATL CHANGE % */}
																<div className="flex flex-wrap justify-between items-center">
																	<div>ATL Change %</div>
																	{data.market_data.atl_change_percentage[StoreCurrency] ?

																		<LowHighChip
																			Value={data.market_data.atl_change_percentage[StoreCurrency]} />
																		: (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																</div>
																{/* ATL Date */}

																<div className="flex flex-wrap justify-between items-center">
																	<div>
																		ATL Date
																	</div>
																	{data
																		.market_data
																		.atl_date ? (
																		<div>
																			{SimpleDateTime(
																				data
																					.market_data
																					.atl_date[
																				StoreCurrency
																				]
																			)}
																		</div>
																	) : (
																		<div className="text-danger">
																			Unavailable
																		</div>
																	)}
																</div>
															</div>

															{/* PRICE_CHANGE_24H_IN_CURRENCY */}
															<div className="flex flex-col gap-2">
																<HrWithText
																	Text={
																		"Price Change %"
																	}
																/>

																{/* Price Change % 1Hr.  */}
																<div className="flex justify-between  flex-wrap items-center">
																	<div>
																		1Hr.
																	</div>

																	{
																		data.market_data.price_change_percentage_1h_in_currency[StoreCurrency]
																			?
																			<LowHighChip
																				Value={data.market_data.price_change_percentage_1h_in_currency[StoreCurrency]} />

																			:
																			<div className="text-danger">
																				Unavailable
																			</div>
																	}
																</div>
																{/* Price Change % 24 Hours  */}
																<div className="flex justify-between flex-wrap items-center">
																	<div>
																		24Hr.
																	</div>
																	{
																		data.market_data.price_change_percentage_24h_in_currency[StoreCurrency]
																			?
																			<LowHighChip
																				Value={data.market_data.price_change_percentage_24h_in_currency[StoreCurrency]} />
																			: (
																				<div className="text-danger">
																					Unavailable
																				</div>
																			)}
																</div>
																{/* Price Change % 7D.  */}
																<div className="flex flex-wrap justify-between items-center">
																	<div>
																		7 Days
																	</div>

																	{
																		data.market_data.price_change_percentage_7d_in_currency[StoreCurrency] ?
																			<LowHighChip
																				Value={data.market_data.price_change_percentage_7d_in_currency[StoreCurrency]} />
																			: (
																				<div className="text-danger">
																					Unavailable
																				</div>
																			)}
																</div>
																{/* Price Change % 14D.  */}
																<div className="flex flex-wrap justify-between items-center">
																	<div>14 Days</div>


																	{
																		data.market_data.price_change_percentage_14d_in_currency[StoreCurrency] ?
																			<LowHighChip
																				Value={data.market_data.price_change_percentage_14d_in_currency[StoreCurrency]} />
																			:
																			<div className="text-danger">
																				Unavailable
																			</div>
																	}
																</div>
																{/* Price Change % 30D.  */}
																<div className="flex flex-wrap justify-between items-center">
																	<div>
																		30 Days{" "}
																	</div>
																	{
																		data.market_data.price_change_percentage_30d_in_currency[StoreCurrency] ?
																			<LowHighChip
																				Value={data.market_data.price_change_percentage_30d_in_currency[StoreCurrency]} />
																			:
																			<div className="text-danger">
																				Unavailable
																			</div>
																	}
																</div>
																{/* Price Change % 60D.  */}
																<div className="flex flex-wrap justify-between items-center">
																	<div>60 Days</div>

																	{data.market_data.price_change_percentage_60d_in_currency[StoreCurrency] ?
																		<LowHighChip
																			Value={data.market_data.price_change_percentage_60d_in_currency[StoreCurrency]} />
																		:
																		<div className="text-danger">
																			Unavailable
																		</div>
																	}
																</div>
																{/* Price Change % 200D.  */}
																<div className="flex flex-wrap justify-between items-center">
																	<div>200 Days</div>

																	{
																		data.market_data.price_change_percentage_200d_in_currency[StoreCurrency]
																			?
																			<LowHighChip
																				Value={data.market_data.price_change_percentage_200d_in_currency[StoreCurrency]} /> : (
																				<div className="text-danger">
																					Unavailable
																				</div>
																			)}
																</div>
																{/* Price Change % 1Y.  */}
																<div className="flex flex-wrap justify-between items-center">
																	<div>
																		1Yr.
																	</div>
																	{data
																		.market_data
																		.price_change_percentage_1y_in_currency[
																		StoreCurrency
																	] ? <LowHighChip
																		Value={data.market_data.price_change_percentage_1y_in_currency[StoreCurrency]} />
																		: (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																</div>
															</div>

															{/* sentiment_votes_up_percentage */}
															<div className="flex flex-col gap-2">
																<HrWithText
																	Text={
																		"Sentiment Votes Percentage"
																	}
																/>
																<div className="flex flex-wrap justify-between items-center">
																	<div>
																		Sentiment
																		Votes Up
																	</div>

																	{data.sentiment_votes_up_percentage ? (
																		<div>
																			{
																				data.sentiment_votes_up_percentage
																			}{" "}
																			%
																		</div>
																	) : (
																		<div className="text-danger">
																			Unavailable
																		</div>
																	)}
																</div>
																{/* Sentiment Votes Down % */}
																<div className="flex flex-wrap justify-between items-center">
																	<div>
																		Sentiment
																		Votes
																		Down
																	</div>

																	{data.sentiment_votes_down_percentage ? (
																		<div>
																			{
																				data.sentiment_votes_down_percentage
																			}{" "}
																			%
																		</div>
																	) : (
																		<div className="text-danger">
																			Unavailable
																		</div>
																	)}
																</div>
															</div>
															{/* Watchlist Portfolio Users */}
															<div className="flex flex-wrap justify-between items-center">
																<div>
																	Watchlist
																	Portfolio
																	Users
																</div>
																{data.watchlist_portfolio_users ? (
																	<div>
																		{NumberFormat(
																			StoreLocale,
																			data.watchlist_portfolio_users
																		)}
																	</div>
																) : (
																	<div className="text-danger">
																		Unavailable
																	</div>
																)}
															</div>
														</div>
													</div>

													<div className="col-span-12 lg:col-span-12 xl:col-span-8 ">
														<div className="flex flex-col text-tiny gap-2">
															{/* LINKS */}
															<div className="flex flex-col gap-2">
																{/* public_interest_stats */}
																<div className="flex flex-col gap-2">
																	<HrWithText
																		Text={
																			"Public Interest Stats"
																		}
																	/>
																	<div className="flex flex-wrap justify-between items-center">
																		<div>
																			Alexa
																			Rank
																		</div>
																		{data.public_interest_stats ? (
																			data
																				.public_interest_stats
																				.alexa_rank ? (
																				<div>
																					{
																						data
																							.public_interest_stats
																							.alexa_rank
																					}
																				</div>
																			) : (
																				<div className="text-danger">
																					Unavailable
																				</div>
																			)
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																	{/* BING MATCHES */}
																	<div className="flex flex-wrap justify-between items-center">
																		<div>
																			Bing
																			Matches
																		</div>

																		{data.public_interest_stats ? (
																			data
																				.public_interest_stats
																				.bing_matches ? (
																				<div>
																					{
																						data
																							.public_interest_stats
																							.bing_matches
																					}
																				</div>
																			) : (
																				<div className="text-danger">
																					Unavailable
																				</div>
																			)
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>
																{/* SCORES */}
																<div className="flex flex-col gap-2">
																	<HrWithText
																		Text={
																			"Scores"
																		}
																	/>
																	<div className="flex flex-wrap justify-between items-center">
																		<div>
																			CoinGecko
																			Score
																		</div>
																		{data.coingecko_score ? (
																			<div>
																				{
																					data.coingecko_score
																				}
																			</div>
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																	<div className="flex flex-wrap justify-between items-center">
																		<div>
																			Developer
																			Score
																		</div>
																		{data.developer_score ? (
																			<div>
																				{
																					data.developer_score
																				}
																			</div>
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																	<div className="flex flex-wrap justify-between items-center">
																		<div>
																			Community
																			Score
																		</div>
																		{data.community_score ? (
																			<div>
																				{
																					data.community_score
																				}
																			</div>
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																	<div className="flex flex-wrap justify-between items-center">
																		<div>
																			Liquidity
																			Score
																		</div>
																		{data.liquidity_score ? (
																			<div>
																				{
																					data.liquidity_score
																				}
																			</div>
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																	<div className="flex flex-wrap justify-between items-center">
																		<div>
																			Public
																			Interest
																			Score
																		</div>
																		{data.public_interest_score ? (
																			<div>
																				{
																					data.public_interest_score
																				}
																			</div>
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>
																{/* RANKS */}
																<div className="flex flex-col gap-2">
																	<HrWithText
																		Text={
																			"Ranks"
																		}
																	/>
																	<div className="flex flex-wrap justify-between items-center">
																		<div>
																			CoinGecko
																			Rank
																		</div>
																		{data.coingecko_rank ? (
																			<div>
																				{
																					data.coingecko_rank
																				}
																			</div>
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																	<div className="flex flex-wrap justify-between  items-center">
																		<div>
																			Mkt.
																			Cap.
																			Rank
																		</div>
																		{data.market_cap_rank ? (
																			<div>
																				{
																					data.market_cap_rank
																				}
																			</div>
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>

																<HrWithText
																	Text={
																		"Links"
																	}
																/>
																{/* HOMEPAGE */}
																<div className="flex flex-wrap justify-between items-center">
																	Homepage
																	<div className="flex gap-2 flex-wrap justify-end">
																		{data.links.homepage?.filter(
																			(l) => l).length > 0 ? (
																			data.links.homepage
																				.filter((l) => l)
																				.map((l, i) => (
																					<ExternalLink key={l} ExternalLink={l}
																					/>
																				)
																				)
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>

																<div className="flex flex-wrap justify-between items-center">
																	WhitePaper
																	<div>
																		{data
																			.links
																			.whitepaper ? (
																			// <Link
																			// 	isExternal
																			// 	href={
																			// 		data
																			// 			.links
																			// 			.whitepaper
																			// 	}
																			// 	showAnchorIcon
																			// 	className="text-tiny"
																			// >
																			// 	{
																			// 		data
																			// 			.links
																			// 			.whitepaper
																			// 	}
																			// 			</Link>
																			<ExternalLink ExternalLink={data.links.whitepaper} />
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>

																{/* BLOCKCHAIN SITES */}
																<div className="flex flex-col gap-2">
																	<div>
																		Blockchain
																		Sites
																	</div>
																	<div className="flex flex-wrap items-center gap-2">
																		{data.links.homepage?.filter((l) => l).length > 0 ? (
																			data.links.blockchain_site
																				.filter((l) => l)
																				.map((l, i) => (
																					<ExternalLink key={l} ExternalLink={l} />
																				)
																				)
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>

																{/* OFFICIAL FORUM URL */}
																<div className="flex flex-wrap justify-between items-center">
																	Official
																	Forum URL
																	<div className="flex gap-2 items-center flex-wrap justify-end">
																		{data.links.official_forum_url?.filter(
																			(l) => l).length > 0 ? (data.links.official_forum_url
																				.filter((l) => l)
																				.map(
																					(l, i) => (
																						<ExternalLink key={l} ExternalLink={l} />
																					)
																				)
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>
																{/*  CHAT URL */}
																<div className="flex flex-wrap justify-between items-center">
																	Chat URL
																	<div className="flex gap-2 items-center flex-wrap justify-end">
																		{data.links.chat_url?.filter((l) => l).length > 0 ? (
																			data.links.chat_url.filter((l) => l).map(
																				(l, i) => (
																					<ExternalLink key={l} ExternalLink={l} />
																				)
																			)
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>
																{/* ANNOUNCEMENT */}
																<div className="flex flex-wrap justify-between items-center">
																	Announcement
																	URL
																	<div className="flex gap-2 items-center flex-wrap justify-end">
																		{data.links.announcement_url?.filter((l) => l).length > 0 ? (
																			data.links.announcement_url
																				.filter((l) => l)
																				.map((l, i) => (
																					<ExternalLink key={l} ExternalLink={l} />
																				)
																				)
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>
																{/* TWITTER */}
																<div className="flex flex-wrap justify-between items-center">
																	Twitter
																	<div className="flex gap-2 items-center flex-wrap justify-end">
																		{data
																			.links
																			.twitter_screen_name ? (

																			<ExternalLink ExternalLink={`https://twitter.com/${data.links.twitter_screen_name}`} />
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>
																{/* FACEBOOK */}
																<div className="flex flex-wrap items-center justify-between">
																	Facebook
																	<div className="flex items-center gap-2 flex-wrap justify-end">
																		{data
																			.links
																			.facebook_username ? (

																			<ExternalLink ExternalLink={`https://facebook.com/${data.links.twitter_screen_name}`} />

																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>
																{/* Bitcointalk */}
																<div className="flex flex-wrap items-center justify-between">
																	Bitcointalk
																	Thread
																	Identifier
																	<div className="flex items-center gap-2 flex-wrap justify-end">
																		{data
																			.links
																			.bitcointalk_thread_identifier ? (

																			<ExternalLink ExternalLink={`https://bitcointalk.org/index.php?topic=${data.links.bitcointalk_thread_identifier}`} />

																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>
																{/* Telegram */}
																<div className="flex flex-wrap items-center justify-between">
																	Telegram
																	Channel
																	<div className="flex items-center gap-2 flex-wrap justify-end">
																		{data
																			.links
																			.telegram_channel_identifier ? (

																			< ExternalLink ExternalLink={`https://t.me/${data.links.telegram_channel_identifier}`} />

																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>

																{/* Reddit */}
																<div className="flex flex-wrap items-center justify-between">
																	Reddit
																	<div className="flex items-center gap-2 flex-wrap justify-end">
																		{data
																			.links
																			.subreddit_url ? (

																			< ExternalLink ExternalLink={data.links.subreddit_url} />

																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>
																{/* GITHUB */}
																<div className="flex flex-col gap-2">
																	<div>
																		Github
																	</div>
																	<div className="flex items-center flex-row flex-wrap gap-2">
																		{data.links.repos_url.github?.filter(
																			(
																				l
																			) =>
																				l
																		)
																			.length >
																			0 ? (
																			data.links.repos_url.github
																				.filter((l) => l)
																				.map((l, i) => (
																					< ExternalLink key={l} ExternalLink={l} />
																				)
																				)
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>
																{/* BITBUCKET */}
																<div className="flex flex-col gap-2">
																	BitBucket
																	<div className="flex items-center gap-2 flex-wrap">
																		{data.links.repos_url.bitbucket?.filter((l) => l).length > 0
																			? (data.links.repos_url.bitbucket.filter((l) => l)
																				.map((l, i) => (
																					< ExternalLink key={l} ExternalLink={l} />
																				)
																				)
																			) : (
																				<div className="text-danger">
																					Unavailable
																				</div>
																			)}
																	</div>
																</div>

																{/* STATUS */}
																<div className="">
																	<div className="mb-2">
																		<HrWithText
																			Text={
																				"Status Updates"
																			}
																		/>
																	</div>

																	<div>
																		{data
																			.status_updates
																			.length >
																			0 ? (
																			<Caraousel
																				Items={[
																					...data.status_updates.map(
																						(
																							s,
																							i
																						) => (
																							<div key={i}
																								className="p-4 flex items-start flex-col gap-4"
																							>
																								<div className="font-bold text-tiny">
																									{SimpleDateTime(
																										s.created_at
																									)}
																								</div>

																								<User
																									name={
																										s
																											.project
																											.name
																									}
																									description={s.project.symbol.toUpperCase()}
																									avatarProps={{
																										src:
																											s
																												.project
																												.image
																												.large ||
																											s
																												.project
																												.image
																												.small ||
																											s
																												.project
																												.image
																												.thumb,
																									}}
																								/>

																								<div>
																									{
																										s.description
																									}
																								</div>

																								<div className="flex flex-wrap  gap-4">
																									<div>
																										<span className="font-bold">
																											Category
																											:{" "}
																										</span>

																										{s.category || (
																											<span className="text-danger">
																												Unavailable
																											</span>
																										)}
																									</div>

																									<div>
																										<span className="font-bold">
																											Project
																											Type
																											:{" "}
																										</span>
																										{s
																											.project
																											?.type || (
																												<span className="text-danger">
																													Unavailable
																												</span>
																											)}
																									</div>
																									<div>
																										<span className="font-bold">
																											Project
																											ID
																											:{" "}
																										</span>
																										{s
																											.project
																											?.id || (
																												<span className="text-danger">
																													Unavailable
																												</span>
																											)}
																									</div>
																								</div>

																								{s.user &&
																									s.user_title ? (
																									<User
																										name={s.user
																										}
																										description={s.user_title}
																									/>
																								) : null}
																							</div>
																						)
																					),
																				]}
																			/>
																		) : (
																			<div className="text-danger">
																				Unavailable
																			</div>
																		)}
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</Tab>
											<Tab
												title={"Platforms"}
												key="platforms"
												aria-label="Platforms"

											>
												<div className="flex flex-col gap-2">
													<HrWithText
														Text={"Platforms"}
													/>

													<div className="flex items-center gap-2 flex-wrap">
														{Object.keys(
															data.detail_platforms
														).filter((e) => e)
															.length > 0 ? (
															Object.keys(
																data.detail_platforms
															)
																.filter(
																	(e) => e
																)
																.sort()
																.map((v, i) => (
																	<div key={i} className="flex items-center flex-wrap">
																		<Snippet
																			hideSymbol={
																				true
																			}
																			radius="sm"
																			size="sm"
																			variant="flat"
																			copyIcon={
																				<FaRegCopy />
																			}
																			checkIcon={
																				<BsFillCheckCircleFill />
																			}
																			className="text-tiny bg-secondary text-primary"
																			codeString={
																				data.detail_platforms[v]["contract_address"]
																			}
																			tooltipProps={{
																				showArrow: true,
																				size: "sm",
																				color: "secondary",
																				className:
																					"text-foreground shadow-md",
																				content:
																					"Copy Contract Address for " +
																					v,
																			}}
																		>
																			{Capitalized(
																				v
																			)}
																		</Snippet>
																		<InfoPopup
																			Content={
																				<div>
																					Decimal
																					Place
																					:{" "}
																					{
																						data
																							.detail_platforms[
																						v
																						][
																						"decimal_place"
																						]
																					}
																				</div>
																			}
																		/>
																	</div>
																))
														) : (
															<div className="text-danger">
																Unavailable
															</div>
														)}
													</div>
												</div>
											</Tab>

											<Tab
												title={"Other Data"}
												key="otherData"
												aria-label="Other Data"

											>
												<div className="text-tiny flex  flex-col gap-2">
													<HrWithText
														Text={"Developer Data"}
													/>

													{data.developer_data ? (
														<div className="flex items-center flex-wrap gap-4 mb-4">
															<div className="flex flex-wrap gap-2 items-center">
																Forks :{" "}
																{data
																	.developer_data
																	.forks || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>
															<div className="flex flex-wrap gap-2 items-center">
																Stars :{" "}
																{data
																	.developer_data
																	.stars || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>
															<div className="flex flex-wrap gap-2 items-center">
																Subscribers :{" "}
																{data
																	.developer_data
																	.subscribers || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>
															<div className="flex flex-wrap gap-2 items-center">
																Total Issues :{" "}
																{data
																	.developer_data
																	.total_issues || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>
															<div className="flex flex-wrap gap-2 items-center">
																Closed Issues :{" "}
																{data
																	.developer_data
																	.closed_issues || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>
															<div className="flex flex-wrap gap-2 items-center">
																Pull Requests
																Merged :{" "}
																{data
																	.developer_data
																	.pull_requests_merged || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>
															<div className="flex flex-wrap gap-2 items-center">
																Pull Request
																Contributors :{" "}
																{data
																	.developer_data
																	.pull_request_contributors || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>
															<div className="flex flex-wrap gap-2 items-center">
																Code Additions 4
																Weeks :{" "}
																{data
																	.developer_data
																	.code_additions_deletions_4_weeks
																	.additions || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>
															<div className="flex flex-wrap gap-2 items-center">
																Code Deletions 4
																Weeks :{" "}
																{data
																	.developer_data
																	.code_additions_deletions_4_weeks
																	.deletions || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>

															<div className="flex flex-wrap gap-2 items-center">
																Commit Count 4
																Weeks :{" "}
																{data
																	.developer_data
																	.commit_count_4_weeks || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>
														</div>
													) : (
														<div className="text-danger">
															Unavailable
														</div>
													)}

													<div className="flex flex-col gap-2 mb-4">
														<div>
															Last 4 Weeks Commit
															Activity Series
														</div>

														{data.developer_data
															.last_4_weeks_commit_activity_series &&
															data.developer_data
																.last_4_weeks_commit_activity_series
																.length > 0 ? (
															<BarGraph
																XTitle={"Days"}
																YTitle={
																	"Commits"
																}
																Height={"250"}
																Width={"100%"}
																Data={
																	data
																		.developer_data
																		.last_4_weeks_commit_activity_series
																}
																ChartName={`${data
																	.localization[
																	StoreLocale
																]
																	? data
																		.localization[
																	StoreLocale
																	] +
																	" (" +
																	data.symbol.toUpperCase() +
																	")"
																	: data.name +
																	" (" +
																	data.symbol.toUpperCase() +
																	")"
																	} Last 4 Weeks Commit Activity`}
															/>
														) : (
															<span className="text-danger">
																Unavailable
															</span>
														)}
													</div>

													{/* Community Data */}
													<div className="mb-4">
														<div className="mb-2">
															<HrWithText
																Text={
																	"Community Data"
																}
															/>
														</div>
														<div className="flex items-center flex-wrap gap-4 ">
															<div className="flex flex-wrap gap-2 items-center">
																Facebook Likes :{" "}
																{data
																	.community_data
																	.facebook_likes || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>

															<div className="flex flex-wrap gap-2 items-center">
																Twitter
																Followers :{" "}
																{data
																	.community_data
																	.twitter_followers || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>
															<div className="flex flex-wrap gap-2 items-center">
																Reddit Average
																Posts 48h :{" "}
																{data
																	.community_data
																	.reddit_average_posts_48h || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>
															<div className="flex flex-wrap gap-2 items-center">
																Reddit Average
																Comments 48h :{" "}
																{data
																	.community_data
																	.reddit_average_comments_48h || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>

															<div className="flex flex-wrap gap-2 items-center">
																Reddit
																Subscribers :{" "}
																{data
																	.community_data
																	.reddit_subscribers || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>

															<div className="flex flex-wrap gap-2 items-center">
																Reddit Accounts
																Active 48h :{" "}
																{data
																	.community_data
																	.reddit_accounts_active_48h || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>
															<div className="flex flex-wrap gap-2 items-center">
																Telegram Channel
																User Count :{" "}
																{data
																	.community_data
																	.telegram_channel_user_count || (
																		<span className="text-danger">
																			Unavailable
																		</span>
																	)}
															</div>
														</div>
													</div>
												</div>
											</Tab>

											<Tab title={"About"} key="about" aria-label="About">
												<div className="text-tiny gap-2">
													<HrWithText
														Text={"Description"}
													/>
													<div>
														{data.description[
															StoreLocale
														] ? (
															<div className="[&>a]:text-primary">
																{ToHTML(
																	data
																		.description[
																	StoreLocale
																	]
																)}
															</div>
														) : (
															<div>-</div>
														)}
													</div>
												</div>
											</Tab>
										</Tabs>
									</div>
								</div>
							</CardBody>
						</Card>

						<CoinMarkets
							CoinId={CoinId}
							CoinName={
								data.localization[StoreLocale]
									? data.localization[StoreLocale]
									: data.name
							}
							CoinSymbol={data.symbol.toUpperCase()}
						/>

						<MarketChart
							CoinId={CoinId}
							CoinName={
								data.localization[StoreLocale]
									? data.localization[StoreLocale]
									: data.name
							}
							CoinSymbol={data.symbol.toUpperCase()}
						/>

						<CoinOHLC
							CoinId={CoinId}
							CoinName={
								data.localization[StoreLocale]
									? data.localization[StoreLocale]
									: data.name
							}
							CoinSymbol={data.symbol.toUpperCase()}
						/>

						<CoinHistory
							CoinId={CoinId}
							CoinName={
								data.localization[StoreLocale]
									? data.localization[StoreLocale]
									: data.name
							}
							CoinSymbol={data.symbol.toUpperCase()}
						/>

						<PublicTreasury
							CoinId={CoinId}
							CoinName={
								data.localization[StoreLocale]
									? data.localization[StoreLocale]
									: data.name
							}
							CoinSymbol={data.symbol.toUpperCase()}
						/>
					</div>
				) : (
					<DataNotThere
						Text={`Coin Details data not available for Coin ID : ${CoinId}`}
					/>
				)}
			</TransitionDiv>
		);
	} catch (e) {
		return (
			<ComponentLevelError
				ErrorObj={{ message: e.toString() }}
				Msg={"While loading Coin Details section, an error occured !"}
			/>
		);
	}
};

export default CoinDetails;
