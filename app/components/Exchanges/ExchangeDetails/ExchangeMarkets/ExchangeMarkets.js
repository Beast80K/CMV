"use client";
import { ZustandStore } from "@/app/store/store";
import { Fetcher } from "@/app/utils/Swr/Fetcher";
import { memo } from "react";
import useSWR from "swr";
import FetchingOptions from "@/app/utils/Swr/FetchingOptions";
import { Card, CardBody, Spinner, } from "@nextui-org/react";

import CurrencyFormatter from "@/app/utils/Currency/CurrencyFormatter";
import {
	FaCircle,
	FaCircleCheck,
	FaTriangleExclamation,
} from "react-icons/fa6";
import SimpleDateTime from "@/app/utils/DateTime/SimpleDateTime";
import Capitalized from "@/app/utils/Text/Capitalized";
import NumberFormat from "@/app/utils/Number/NumberFormat";
import { useShallow } from "zustand/react/shallow";
import ShortText from "@/app/utils/Text/ShortText";




import dynamic from 'next/dynamic'
import ExternalLink from "@/app/components/ExternalLink/ExternalLink";
const MyTable = dynamic(() => import("@/app/components/MyTable/MyTable"))
const ComponentLevelError = dynamic(() => import("@/app/components/ComponentLevelError/ComponentLevelError"))
const SectionHeader = dynamic(() => import("@/app/components/SectionHeader/SectionHeader"))
const DataNotThere = dynamic(() => import("@/app/components/DataNotThere/DataNotThere"))
const TableSkeleton = dynamic(() => import("@/app/components/Skeletons/TableSkeleton"))
const TransitionDiv = dynamic(() => import("@/app/components/TransitionDiv/TransitionDiv"))

const ExchangeMarkets = ({ ExchangeName, ExchangeID }) => {
	try {
		const { StoreLocale } = ZustandStore(useShallow((state) => state));

		const { data, error, isLoading, mutate } = useSWR(
			"/api/exchange_tickers?id=" + ExchangeID,
			Fetcher,
			{ ...FetchingOptions("60sec") }
		);


		return (
			<TransitionDiv>
				<Card radius="sm" shadow="sm" className="mb-4">
					<CardBody>
						<SectionHeader
							SectionID={"ExchangeMarkets"}
							SectionName={`${ExchangeName} Markets`}
							InfoContentTitle={`${ExchangeName} Markets`}
							InfoContent={
								<ul className="list-disc">
									<li className="ml-4">
										Shows Exchange Tickers data.
									</li>
									<li className="ml-4">
										Auto Updates in every 60 seconds.
									</li>
									<li className="ml-4">
										Price: Latest unconverted price in the
										respective pair target currency
									</li>
									<li className="ml-4">
										Volume: Unconverted 24h trading volume
										in the respective pair target currency
									</li>
									<li className="ml-4">
										Converted Last: Latest converted price
										in BTC, ETH, and USD
									</li>
									<li className="ml-4">
										Converted Volume: converted 24h trading
										volume in BTC, ETH, and USD
									</li>
									<li className="ml-4">
										Timestamp: returns the last time that
										the price has changed
									</li>
									<li className="ml-4">
										Last Traded At: returns the last time
										that the price has changed
									</li>
									<li className="ml-4">
										Last Fetch At: returns the last time we
										call the API
									</li>
									<li className="ml-4">
										<b>Is Stale</b> when ticker that has not
										been updated from the exchange for more
										than 8 hours.
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
									<li className="ml-4">
										<b>Is Anomaly</b> if ticker's price is
										outliered by our system.
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
						{isLoading ? (
							<TableSkeleton>
								<Spinner
									label={`Getting Markets details for Exchange ID : ${ExchangeName}`}
									color="primary"
									labelColor="primary"
								/>
							</TableSkeleton>
						) : error ? (
							error.response.status === 404 ? (
								<DataNotThere
									Text={`${error?.response?.data
										? error?.response?.data + " "
										: null
										}Markets Details data not available for Exchange : ${ExchangeName}`}
								/>
							) : (
								<ComponentLevelError
									ErrorObj={error}
									Msg={
										error?.response?.data ||
										`Error Occured while getting Markets Details for Exchange : ${ExchangeName}`
									}
									Mutate={mutate}
								/>
							)
						) : data ? (
							<MyTable
								Data={data.tickers}
								ColumnsList={[
									// Sr. No.
									{
										headerName: "Sr. No.",
										field: "sr_no",
										pinned: "left",
										maxWidth: 120,
									},


									// Base
									{
										headerName: "Base",
										field: "base",
										hide: true,
										pinned: false,
									},
									// Target
									{
										headerName: "Target",
										field: "target",
										hide: true,
										pinned: false,
									},
									// Pair
									{
										headerName: "Pair",
										field: "base",
										hide: false,
										pinned: "left",
										cellRenderer: memo(
											function PairRenderer({ data }) {
												return data.trade_url ?

													<ExternalLink ExternalLink={data.trade_url}
														ExternalLinkName={ShortText(
															data.base +
															"/" +
															data.target,
															8
														)}
													/>
													: (
														ShortText(
															data.base +
															"/" +
															data.target,
															8
														)
													);
											}
										),
									},
									// Price
									{
										headerName: "Price In USD",
										field: "last",
										hide: false,
										pinned: false,
										headerTooltip: `Latest unconverted price in the respective pair target currency ${data.target}`,
										valueFormatter: ({ data }) =>
											data.last
												? CurrencyFormatter(
													StoreLocale,
													"usd",
													data.last
												)
												: "-",
									},
									// Volume
									{
										headerName: "Volume",
										field: "volume",
										hide: false,
										pinned: false,
										headerTooltip: `Unconverted 24h trading volume in the respective pair target currency`,
										valueFormatter: ({ data }) =>
											data.last
												? NumberFormat(
													StoreLocale,
													data.volume
												)
												: "-",
									},
									// -2% Depth In USD
									{
										headerName: "-2% Depth In USD",
										field: "cost_to_move_up_usd",
										hide: false,
										pinned: false,
										headerTooltip: `Cost To Move Up USD`,
										valueFormatter: ({ data }) =>
											data.cost_to_move_up_usd
												? CurrencyFormatter(
													StoreLocale,
													"usd",
													data.cost_to_move_up_usd.toFixed(
														2
													)
												)
												: "-",
									},
									// +2% Depth In USD
									{
										headerName: "+2% Depth In USD",
										field: "cost_to_move_down_usd",
										hide: false,
										pinned: false,
										headerTooltip: `Cost To Move Down USD`,
										valueFormatter: ({ data }) =>
											data.cost_to_move_down_usd
												? CurrencyFormatter(
													StoreLocale,
													"usd",
													data.cost_to_move_down_usd.toFixed(
														2
													)
												)
												: "-",
									},

									// Converted Last BTC
									{
										headerName: "Converted Last BTC",
										field: "converted_last.btc",
										hide: false,
										pinned: false,
										headerTooltip: "Converted Last BTC",
										valueFormatter: ({ data }) =>
											data.converted_last.btc
												? CurrencyFormatter(
													StoreLocale,
													"btc",
													data.converted_last.btc
												)
												: "-",
									},
									// Converted Last ETH
									{
										headerName: "Converted Last ETH",
										field: "converted_last.eth",
										hide: false,
										pinned: false,
										headerTooltip: "Converted Last ETH",
										valueFormatter: ({ data }) =>
											data.converted_last.eth
												? CurrencyFormatter(
													StoreLocale,
													"eth",
													data.converted_last.eth
												)
												: "-",
									},
									// Converted Last USD
									{
										headerName: "Converted Last USD",
										field: "converted_last.usd",
										hide: false,
										pinned: false,
										headerTooltip: "Converted Last USD",
										valueFormatter: ({ data }) =>
											data.converted_last.usd
												? CurrencyFormatter(
													StoreLocale,
													"usd",
													data.converted_last.usd
												)
												: "-",
									},

									// Converted Volume BTC
									{
										headerName: "Converted Volume BTC",
										field: "converted_volume.btc",
										hide: false,
										pinned: false,
										headerTooltip: "Converted Volume BTC",
										valueFormatter: ({ data }) =>
											data.converted_volume.btc
												? CurrencyFormatter(
													StoreLocale,
													"btc",
													data.converted_volume
														.btc
												)
												: "-",
									},
									// Converted Volume ETH
									{
										headerName: "Converted Volume ETH",
										field: "converted_volume.eth",
										hide: false,
										pinned: false,
										headerTooltip: "Converted Volume ETH",
										valueFormatter: ({ data }) =>
											data.converted_volume.eth
												? CurrencyFormatter(
													StoreLocale,
													"eth",
													data.converted_volume
														.eth
												)
												: "-",
									},
									// Converted Volume USD
									{
										headerName: "Converted Volume USD",
										field: "converted_volume.usd",
										hide: false,
										pinned: false,
										headerTooltip: "Converted Volume USD",
										valueFormatter: ({ data }) =>
											data.converted_volume.usd
												? CurrencyFormatter(
													StoreLocale,
													"usd",
													data.converted_volume
														.usd
												)
												: "-",
									},

									{
										headerName: "Spread %",
										field: "bid_ask_spread_percentage",
										hide: false,
										pinned: false,
										headerTooltip: `Bid Ask Spread Percentage`,
										valueFormatter: ({ data }) =>
											data.bid_ask_spread_percentage
												? data.bid_ask_spread_percentage.toFixed(
													2
												) + "%"
												: "-",
									},
									// Trust Score
									{
										headerName: "Trust Score",
										field: "trust_score",
										hide: false,
										pinned: false,
										cellStyle: {
											display: "flex",
											justifyContent: "center",
										},
										cellRenderer: memo(({ data }) => (
											<FaCircle
												color={data.trust_score}
											/>
										)),
									},
									{
										headerName: "Is Anomaly",
										field: "is_anomaly",
										hide: false,
										pinned: false,
										cellStyle: {
											display: "flex",
											justifyContent: "center",
										},
										cellRenderer: memo(({ data }) =>
											typeof data.is_anomaly ===
												"boolean" ? (
												<div>
													{data.is_anomaly ? (
														<div
															title={Capitalized(
																data.is_anomaly.toString()
															)}
															className="text-danger flex gap-2 items-center"
														>
															Yes{" "}
															<FaTriangleExclamation
																size={16}
															/>
														</div>
													) : (
														<div
															title={Capitalized(
																data.is_anomaly.toString()
															)}
															className="text-success flex gap-2 items-center"
														>
															No{" "}
															<FaCircleCheck
																size={16}
															/>
														</div>
													)}
												</div>
											) : (
												"-"
											)
										),
									},
									{
										headerName: "Is Stale",
										field: "is_stale",
										hide: false,
										pinned: false,
										cellStyle: {
											display: "flex",
											justifyContent: "center",
										},
										cellRenderer: memo(({ data }) =>
											typeof data.is_stale ===
												"boolean" ? (
												<div>
													{data.is_stale ? (
														<div
															title={Capitalized(
																data.is_stale.toString()
															)}
															className="text-danger  flex gap-2 items-center"
														>
															Yes{" "}
															<FaTriangleExclamation
																size={16}
															/>
														</div>
													) : (
														<div
															title={Capitalized(
																data.is_stale.toString()
															)}
															className="text-success  flex gap-2 items-center"
														>
															No{" "}
															<FaCircleCheck
																size={16}
															/>
														</div>
													)}
												</div>
											) : (
												"-"
											)
										),
									},
									{
										headerName: "Timestamp",
										field: "timestamp",
										hide: true,
										pinned: false,
										valueFormatter: ({ data }) =>
											data.timestamp
												? SimpleDateTime(data.timestamp)
												: "-",
									},
									{
										headerName: "Last Traded At",
										field: "last_traded_at",
										hide: false,
										pinned: false,

										valueFormatter: ({ data }) =>
											data.last_traded_at
												? SimpleDateTime(
													data.last_traded_at
												)
												: "-",
									},
									{
										headerName: "Last Fetch At",
										field: "last_fetch_at",
										hide: false,
										pinned: false,
										valueFormatter: ({ data }) =>
											data.last_fetch_at
												? SimpleDateTime(
													data.last_fetch_at
												)
												: "-",
									},
								]}
							/>
						) : (
							<DataNotThere
								Text={`Markets Details data not available for Exchange : ${ExchangeName}`}
							/>
						)}
					</CardBody>
				</Card>
			</TransitionDiv>
		);
	} catch (e) {
		return (
			<ComponentLevelError
				ErrorObj={{ message: e.toString() }}
				Msg={
					"While loading Markets Details section, an error occured !"
				}
			/>
		);
	}
};

export default ExchangeMarkets;
