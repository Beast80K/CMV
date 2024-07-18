"use client";
import { memo } from "react";
import {
	Card,
	CardBody,
	Link,
	Skeleton,
	Spinner,
	Tab,
	Tabs,

} from "@nextui-org/react";
import useSWR from "swr";
import FetchingOptions from "@/app/utils/Swr/FetchingOptions";

import { Fetcher } from "@/app/utils/Swr/Fetcher";
import ToHTML from "@/app/utils/ToHTML/ToHTML";
import ShortText from "@/app/utils/Text/ShortText";
import CurrencyFormatter from "@/app/utils/Currency/CurrencyFormatter";
import { ZustandStore } from "@/app/store/store";
import Capitalized from "@/app/utils/Text/Capitalized";
import UnixToSimpleDate from "@/app/utils/DateTime/UnixToSimpleDate";
import { useShallow } from "zustand/react/shallow";



import dynamic from 'next/dynamic'
import TransitionDiv from "../../TransitionDiv/TransitionDiv";
import SectionHeader from "../../SectionHeader/SectionHeader";
import TabsSkeleton from "../../Skeletons/TabsSkeleton";
import TableSkeleton from "../../Skeletons/TableSkeleton";
import ExternalLink from "../../ExternalLink/ExternalLink";
const MyTable = dynamic(() => import("../../MyTable/MyTable"))
const LowHighChip = dynamic(() => import("../../LowHighChip/LowHighChip"))
const DataNotThere = dynamic(() => import("../../DataNotThere/DataNotThere"))
const HrWithText = dynamic(() => import("../../HrWithText/HrWithText"))
const ComponentLevelError = dynamic(() => import("../../ComponentLevelError/ComponentLevelError"))




const DerivativeDetails = ({ DerivativeID }) => {
	try {
		const { StoreLocale } = ZustandStore(useShallow((state) => state));

		const { data, error, isLoading, mutate } = useSWR(
			"/api/derivatives_exchanges_id?id=" + DerivativeID,
			Fetcher,
			{ ...FetchingOptions("30sec") }
		);

		const DervativeMarketsColumnsList = [
			{
				Header: "Sr.No.",
				accessor: "sr_no",
			},
			{
				accessor: "symbol",
				Header: "Symbol",
			},
			{
				accessor: "base",
				Header: "Pair",
				Cell: ({ cell }) =>
					cell.row.values.trade_url ? (

						<ExternalLink ExternalLink={cell.row.values.trade_url}
							ExternalLinkName={ShortText(
								cell.row.values.base +
								"/" +
								cell.row.values.target,
								8
							)}
						/>

					) : (
						ShortText(
							cell.row.values.base + "/" + cell.row.values.target,
							8
						)
					),
			},
			{
				accessor: "contract_type",
				Header: "Contract Type",
				Cell: ({ cell }) => (
					<div>{Capitalized(cell.row.values.contract_type)}</div>
				),
			},
			{
				accessor: "last",
				Header: "Price",
				Cell: ({ cell }) => (
					<div>
						{CurrencyFormatter(
							StoreLocale,
							"usd",
							cell.row.values.last
						)}
					</div>
				),
			},
			{
				accessor: "h24_percentage_change",
				Header: "24 Hours % Change",
				Cell: ({ cell }) => (
					<div
						className={`${cell.row.values.h24_percentage_change < 0
							? "text-danger"
							: "text-success"
							}`}
					>
						{cell.row.values.h24_percentage_change}%
					</div>
				),
			},
			{
				accessor: "index",
				Header: "Index Price",
				Cell: ({ cell }) => (
					<div>
						{cell.row.values.index} {cell.row.values.target}
					</div>
				),
			},
			{
				accessor: "index_basis_percentage",
				Header: "Index Basis %",
				Cell: ({ cell }) => (
					<div>{cell.row.values.index_basis_percentage}%</div>
				),
			},
			{
				accessor: "bid_ask_spread",
				Header: "Bid Ask Spread",
				Cell: ({ cell }) => (
					<div>{cell.row.values.bid_ask_spread}%</div>
				),
			},
			{
				accessor: "funding_rate",
				Header: "Funding Rate",
				Cell: ({ cell }) => <div>{cell.row.values.funding_rate}%</div>,
			},
			{
				accessor: "open_interest_usd",
				Header: "Open Interest USD",
				Cell: ({ cell }) => (
					<div>
						{CurrencyFormatter(
							StoreLocale,
							"usd",
							cell.row.values.open_interest_usd.toFixed(2)
						)}
					</div>
				),
			},
			{
				accessor: "h24_volume",
				Header: "24 Hours Volume",
				Cell: ({ cell }) => (
					<div>
						{CurrencyFormatter(
							StoreLocale,
							"usd",
							cell.row.values.h24_volume
						)}
					</div>
				),
			},
			{
				accessor: "converted_last",
				Header: "Converted Last",
				Cell: ({ cell }) => (
					<div
						className="flex flex-col gap-2"
						title={`Converted Last: Latest converted price in BTC, ETH, and USD`}
					>
						<div>
							{CurrencyFormatter(
								StoreLocale,
								"btc",
								cell.row.values.converted_last.btc
							)}
						</div>
						<div>
							{CurrencyFormatter(
								StoreLocale,
								"eth",
								cell.row.values.converted_last.eth
							)}
						</div>
						<div>
							{CurrencyFormatter(
								StoreLocale,
								"usd",
								cell.row.values.converted_last.usd
							)}
						</div>
					</div>
				),
			},

			{
				Header: "Converted Volume",
				accessor: "converted_volume",
				Cell: ({ cell }) => (
					<div
						title={`Converted Volume: converted 24h trading volume in BTC, ETH, and USD`}
						className="flex flex-col gap-2"
					>
						<div>
							{CurrencyFormatter(
								StoreLocale,
								"btc",
								cell.row.values.converted_volume.btc
							)}
						</div>
						<div>
							{CurrencyFormatter(
								StoreLocale,
								"eth",
								cell.row.values.converted_volume.eth
							)}
						</div>
						<div>
							{CurrencyFormatter(
								StoreLocale,
								"usd",
								cell.row.values.converted_volume.usd
							)}
						</div>
					</div>
				),
			},
			{
				accessor: "target",
				Header: "Target",
			},
			{
				accessor: "trade_url",
				Header: "Trade Url",
			},

			{
				accessor: "last_traded",
				Header: "Last Traded",
				Cell: ({ cell }) =>
					cell.row.values.last_traded ? (
						UnixToSimpleDate(cell.row.values.last_traded)
					) : (
						<div className="text-danger">Unavailable</div>
					),
			},
			{
				accessor: "expired_at",
				Header: "Expiry",
				Cell: ({ cell }) =>
					cell.row.values.expired_at ? (
						UnixToSimpleDate(cell.row.values.expired_at)
					) : (
						<div className="text-danger">Unavailable</div>
					),
			},
		];

		return (
			<TransitionDiv>
				{isLoading ? (
					<div className="flex flex-col gap-4">
						<Card radius="sm" shadow="sm">
							<CardBody>
								<div className="grid grid-cols-12 gap-4 text-tiny">
									<div className="col-span-12 lg:col-span-4 xl:col-span-3 text-center">
										<SectionHeader
											SectionID={"DerivativeDetails"}
											SectionName={`Derivative Details`}
											InfoContentTitle={
												"Derivative Details"
											}
											InfoContent={
												<ul className="list-disc">
													<li className="ml-4">
														Shows derivative
														exchange data.
													</li>
													<li className="ml-4">
														Auto Updates in every 30
														seconds.
													</li>
												</ul>
											}
										/>
										<div className="gap-4 flex flex-col mb-4">
											<div className="flex flex-col gap-4 text-center">
												<Skeleton className="h-8 w-10/12 rounded-md  " />
												<Skeleton className="h-8 w-8/12 rounded-md  " />
												<Skeleton className="h-8 w-12/12 rounded-md  " />
												<Skeleton className="h-8 w-4/12 rounded-md  " />
												<Skeleton className="h-8 w-6/12 rounded-md  " />
												<Skeleton className="h-8 w-11/12 rounded-md  " />

												<Spinner
													label={`Getting Derivative details for Derivative ID : ${DerivativeID}`}
													color="primary"
													labelColor="primary"
												/>

												<Skeleton className="h-8 w-12/12 rounded-md  " />
												<Skeleton className="h-8 w-9/12 rounded-md  " />
												<Skeleton className="h-8 w-7/12 rounded-md  " />
												<Skeleton className="h-8 w-8/12 rounded-md  " />
												<Skeleton className="h-8 w-12/12 rounded-md  " />
												<Skeleton className="h-8 w-12/12 rounded-md  " />
											</div>
										</div>
									</div>
									<div className="col-span-12 lg:col-span-8 xl:col-span-9">
										<TabsSkeleton />
									</div>
								</div>
							</CardBody>
						</Card>

						<Card radius="sm" shadow="sm">
							<CardBody>
								<SectionHeader
									SectionID={"DerivativeMarkets"}
									SectionName={`Derivative Markets`}
									InfoContentTitle={"Markets"}
									InfoContent={
										<ul className="list-disc">
											<li className="ml-4">
												Shows derivative exchange data.
											</li>
											<li className="ml-4">
												Price (Last) : Latest
												unconverted price in the
												respective pair target currency.
											</li>
											<li className="ml-4">
												Volume : Unconverted 24h trading
												volume in the respective pair
												target currency.
											</li>
											<li className="ml-4">
												Converted Last : Latest
												converted price in BTC, ETH, and
												USD.
											</li>
											<li className="ml-4">
												Converted Volume : Latest
												converted 24h trading volume in
												BTC, ETH, and USD.
											</li>
											<li className="ml-4">
												Auto Updates in every 30
												seconds.
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
						<Card radius="sm" shadow="sm">
							<CardBody>
								<DataNotThere
									Text={`${error?.response?.data
										? error?.response?.data + " "
										: null
										}Derivative Details data not available for Derivative ID : ${DerivativeID}`}
								/>
							</CardBody>
						</Card>
					) : (
						<Card radius="sm" shadow="sm">
							<CardBody>
								<ComponentLevelError
									ErrorObj={error}
									Msg={
										error?.response?.data ||
										"Error Occured while getting Derivative Details"
									}
									Mutate={mutate}
								/>
							</CardBody>
						</Card>
					)
				) : (
					<div className="flex flex-col gap-4">
						<Card radius="sm" shadow="sm">
							<CardBody>
								<head>
									<title>
										{data.name +
											" | " +
											"Derivative Details"}
									</title>
								</head>
								<SectionHeader
									SectionName={`${data.name}`}
									SectionID={"DerivativeDetails"}
									InfoContentTitle={"Derivative Details"}
									InfoContent={
										<ul className="list-disc">
											<li className="ml-4">
												Shows derivative exchange data.
											</li>
											<li className="ml-4">
												Auto Updates in every 30
												seconds.
											</li>
										</ul>
									}
								/>

								<div className="grid grid-cols-12 gap-4 text-tiny">
									<div className="col-span-12 lg:col-span-4 xl:col-span-3">
										{/* INFO BUTTON */}

										{/* IMAGE NAME SYMBOL */}
										<div className="flex gap-2 flex-col mb-4">
											<div className="flex flex-row items-center flex-wrap justify-start gap-2">
												<img
													src={data.image || null}
													alt={data.name}
													className=" rounded-full object-contain h-12 w-12"
												/>

												<h3 className="font-bold text-lg">
													{data.name}{" "}
												</h3>
											</div>
										</div>

										<div className="mb-2">
											<HrWithText Text={"Info."} />
										</div>

										{/*  Open Interest BTC */}
										<div className="flex items-center gap-2 justify-between mb-2">
											<div>Open Interest BTC</div>
											<div>
												{data.open_interest_btc ? (
													CurrencyFormatter(
														StoreLocale,
														"btc",
														data.open_interest_btc
													)
												) : (
													<div className="text-danger">
														Unavailable
													</div>
												)}
											</div>
										</div>

										{/*  Trade Volume 24Hr. BTC */}
										<div className="flex items-center gap-2 justify-between mb-2">
											<div>Trade Volume 24Hr. BTC</div>
											<div>
												{data.trade_volume_24h_btc ? (
													CurrencyFormatter(
														StoreLocale,
														"btc",
														data.trade_volume_24h_btc
													)
												) : (
													<div className="text-danger">
														Unavailable
													</div>
												)}
											</div>
										</div>

										{/*  No. Of Perpetual Pairs */}
										<div className="flex items-center gap-2 justify-between mb-2">
											<div>No. Of Perpetual Pairs</div>
											<div>
												{data.number_of_perpetual_pairs ? (
													data.number_of_perpetual_pairs
												) : (
													<div className="text-danger">
														Unavailable
													</div>
												)}
											</div>
										</div>

										{/*  No. Of Futures Pairs */}
										<div className="flex items-center gap-2 justify-between mb-2">
											<div>No. Of Futures Pairs</div>
											<div>
												{data.number_of_futures_pairs ? (
													data.number_of_futures_pairs
												) : (
													<div className="text-danger">
														Unavailable
													</div>
												)}
											</div>
										</div>

										{/* Country */}
										<div className="flex items-center gap-2 justify-between mb-2">
											<div>Country</div>
											<div>
												{data.country ? (
													data.country
												) : (
													<div className="text-danger">
														Unavailable
													</div>
												)}
											</div>
										</div>

										{/* Year Established */}
										<div className="flex items-center gap-2 justify-between mb-2">
											<div>Year Established</div>
											<div>
												{data.year_established ? (
													data.year_established
												) : (
													<div className="text-danger">
														Unavailable
													</div>
												)}
											</div>
										</div>

										{/* Slack */}
										<div className="flex items-center gap-2 justify-between mb-2">
											<div>URL</div>
											<div>
												{data.url ? (

													<ExternalLink ExternalLink={data.url} />
												) : (
													<div className="text-danger">
														Unavailable
													</div>
												)}
											</div>
										</div>
									</div>
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
											aria-label="Derivative Details"
										>
											<Tab
												key={"DerivativeDescription"}
												title={"Description"}
											>
												{/* Description */}

												<div className="col-span-12">
													<div className="mb-2">
														<HrWithText
															Text={"Description"}
														/>
													</div>

													<div className="[&>a]:text-primary">
														{data.description ? (
															ToHTML(
																data.description
															)
														) : (
															<div className="text-danger">
																Unavailable
															</div>
														)}
													</div>
												</div>
											</Tab>
										</Tabs>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card radius="sm" shadow="sm">
							<CardBody>
								<SectionHeader
									SectionID={"DerivativeMarkets"}
									SectionName={`${data.name} Markets`}
									InfoContentTitle={"Markets"}
									InfoContent={
										<ul className="list-disc">
											<li className="ml-4">
												Shows derivative exchange data.
											</li>
											<li className="ml-4">
												Price (Last) : Latest
												unconverted price in the
												respective pair target currency.
											</li>
											<li className="ml-4">
												Volume : Unconverted 24h trading
												volume in the respective pair
												target currency.
											</li>
											<li className="ml-4">
												Converted Last : Latest
												converted price in BTC, ETH, and
												USD.
											</li>
											<li className="ml-4">
												Converted Volume : Latest
												converted 24h trading volume in
												BTC, ETH, and USD.
											</li>
											<li className="ml-4">
												Auto Updates in every 30
												seconds.
											</li>
										</ul>
									}
								/>

								<MyTable
									Data={data.tickers}
									ColumnsList={[
										{
											headerName: "Sr. No.",
											field: "sr_no",
											maxWidth: 120,
											pinned: "left",
										},
										{
											headerName: "Symbol",
											field: "symbol",
											hide: false,
											pinned: "left",
										},
										{
											headerName: "Pair",
											field: "base",
											hide: false,
											pinned: false,
											cellRenderer: memo(
												function PairRenderer({
													data,
												}) {
													return data.trade_url ? (

														<ExternalLink ExternalLink={data.trade_url} ExternalLinkName={ShortText(
															data.base +
															"/" +
															data.target,
															50
														)} />

													) : (
														ShortText(
															data.base +
															"/" +
															data.target,
															50
														)
													);
												}
											),
										},

										{
											headerName: "Contract Type",
											field: "contract_type",
											hide: false,
											pinned: false,
											valueFormatter: ({ value }) => {
												return value
													? Capitalized(value)
													: "-";
											},
										},
										{
											headerName: "Price In USD",
											field: "last",
											hide: false,
											pinned: false,
											headerTooltip: `Latest unconverted price in the respective pair target currency ${data.target}`,
											valueFormatter: ({ value }) =>
												value
													? CurrencyFormatter(
														StoreLocale,
														"usd",
														value
													)
													: "-",
										},
										{
											headerName: "24Hr. % Change",
											field: "h24_percentage_change",
											hide: false,
											pinned: false,
											cellRenderer: memo(function ({
												data,
											}) {
												let value = Number(
													data.h24_percentage_change
												);
												return value ? <LowHighChip Value={value} />
													:
													"-"
											}),
										},
										{
											headerName: "Index",
											field: "index",
											hide: false,
											pinned: false,
											valueFormatter: ({ value }) =>
												value || "-",
										},

										{
											headerName: "Target",
											field: "target",
											hide: true,
											pinned: false,
										},
										{
											headerName: "Base",
											field: "base",
											hide: true,
											pinned: false,
										},
										{
											headerName: "Basis",
											headerTooltip:
												"Index Basis Percentage",
											field: "index_basis_percentage",
											hide: false,
											pinned: false,
											valueFormatter: ({ value }) => {
												return value
													? `${value.toFixed(4)} %`
													: "-";
											},
										},
										{
											headerName: "Spread",
											field: "bid_ask_spread",
											hide: false,
											pinned: false,
											headerTooltip: `Bid Ask Spread Percentage`,
											valueFormatter: ({ value }) => {
												return value
													? `${value.toFixed(4)} %`
													: "-";
											},
										},
										{
											headerName: "Funding Rate",
											field: "funding_rate",
											hide: false,
											pinned: false,
											valueFormatter: ({ value }) => {
												return value
													? `${value.toFixed(4)} %`
													: "-";
											},
										},
										{
											headerName: "Open Interest in USD",
											field: "open_interest_usd",
											hide: false,
											pinned: false,
											valueFormatter: ({ data }) =>
												data.open_interest_usd
													? CurrencyFormatter(
														StoreLocale,
														"usd",
														data.open_interest_usd
													)
													: "-",
										},
										{
											headerName: "24Hr. Volume",
											field: "h24_volume",
											hide: false,
											pinned: false,
											valueFormatter: ({ data }) =>
												data.h24_volume
													? CurrencyFormatter(
														StoreLocale,
														"usd",
														data.h24_volume
													)
													: "-",
										},
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
														data.converted_last
															.btc
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
														data.converted_last
															.eth
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
														data.converted_last
															.usd
													)
													: "-",
										},

										// Converted Volume BTC
										{
											headerName: "Converted Volume BTC",
											field: "converted_volume.btc",
											hide: false,
											pinned: false,
											headerTooltip:
												"Converted Volume BTC",
											valueFormatter: ({ data }) =>
												data.converted_volume.btc
													? CurrencyFormatter(
														StoreLocale,
														"btc",
														data
															.converted_volume
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
											headerTooltip:
												"Converted Volume ETH",
											valueFormatter: ({ data }) =>
												data.converted_volume.eth
													? CurrencyFormatter(
														StoreLocale,
														"eth",
														data
															.converted_volume
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
											headerTooltip:
												"Converted Volume USD",
											valueFormatter: ({ data }) =>
												data.converted_volume.usd
													? CurrencyFormatter(
														StoreLocale,
														"usd",
														data
															.converted_volume
															.usd
													)
													: "-",
										},
										{
											headerName: "Last Traded At",
											field: "last_traded",
											hide: false,
											pinned: false,

											valueFormatter: ({ value }) =>
												value
													? UnixToSimpleDate(value)
													: "-",
										},
										{
											headerName: "Expired At",
											field: "expired_at",
											hide: false,
											pinned: false,
											valueFormatter: ({ value }) =>
												value
													? UnixToSimpleDate(value)
													: "-",
										},
									]}
								/>
							</CardBody>
						</Card>
					</div>
				)}
			</TransitionDiv>
		);
	} catch (e) {
		return (
			<ComponentLevelError
				ErrorObj={{ message: e.toString() }}
				Msg={
					"While loading Derivative Details section, an error occured !"
				}
			/>
		);
	}
};

export default DerivativeDetails;
