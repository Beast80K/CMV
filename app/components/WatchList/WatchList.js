"use client";
import { ZustandStore } from "@/app/store/store";
import { Fetcher } from "@/app/utils/Swr/Fetcher";

import {
	Accordion,
	AccordionItem,
	Avatar,
	Card,
	CardBody,
	Checkbox,
	CheckboxGroup,
	Chip,
	Snippet,
	Spinner,
	User,
} from "@nextui-org/react";
import { memo, useEffect, useMemo, useState } from "react";
import {
	FaCoins,
	FaRegCopy,
} from "react-icons/fa6";
import { useShallow } from "zustand/react/shallow";
import FetchingOptions from "@/app/utils/Swr/FetchingOptions";

import {
	BsDashCircleFill,
	BsFillCheckCircleFill,
	BsTrash,
	BsXCircle,
} from "react-icons/bs";
import CurrencyFormatter from "@/app/utils/Currency/CurrencyFormatter";
import SimpleDateTime from "@/app/utils/DateTime/SimpleDateTime";
import NumberFormat from "@/app/utils/Number/NumberFormat";
import useSWR from "swr";
import { isEqual, sortBy } from "lodash";


import dynamic from "next/dynamic";
import SectionHeader from "../SectionHeader/SectionHeader";
import TableSkeleton from "../Skeletons/TableSkeleton";
import TransitionDiv from "../TransitionDiv/TransitionDiv";
const ComponentLevelError = dynamic(() => import('../ComponentLevelError/ComponentLevelError'));
const ConfirmationBtnModal = dynamic(() => import('../ConfirmationBtnModal/ConfirmationBtnModal'));
const Sparkline = dynamic(() => import('../Graphs/Sparkline'));
const MyTable = dynamic(() => import('../MyTable/MyTable'));
const LowHighChip = dynamic(() => import('../LowHighChip/LowHighChip'));

const WatchList = () => {
	try {
		const {
			StoreLocale,
			StoreCurrency,
			StoreWatchlistCoins,
			SetWatchListCoins,
		} = ZustandStore(useShallow((state) => state));

		const [StoredCoins, SetStoredCoins] = useState([]);
		const [PrevStoredCoins, SetPrevStoredCoins] = useState([]);
		const [RemoveCoins, SetRemoveCoins] = useState([]);

		const CoinIDs = useMemo(
			() => StoredCoins.map((m) => m.id).join(","),
			[StoredCoins]
		);

		const CanCompare = () =>
			useMemo(
				() => !isEqual(StoreWatchlistCoins, StoredCoins),
				[StoreWatchlistCoins]
			);
		// IF EQUAL THEN RETURN FALSE, ELSE TRUE

		useEffect(() => {
			SetPrevStoredCoins(StoredCoins);
			SetStoredCoins(StoreWatchlistCoins);
		}, [StoreWatchlistCoins]);

		const CoinData = useSWR(
			CanCompare()
				? `/api/coin_market_data?currency=${StoreCurrency}&locale=${StoreLocale}&ids=${CoinIDs}`
				: null,
			Fetcher,
			{ ...FetchingOptions("45sec") }
		);


		const CoinsColumn = [
			{
				Header: "Sr.No.",
				accessor: "sr_no",
			},
			{
				Header: "Mkt. Cap Rank",
				accessor: "market_cap_rank",
				Cell: (cell) => cell.row.values.market_cap_rank || "-",
			},
			{
				Header: "Name",
				accessor: "name",
				Cell: ({ cell }) => (
					<div className="text-left">
						<User
							name={cell.row.values.name}
							description={cell.row.values.symbol.toUpperCase()}
							avatarProps={{
								src: cell.row.values.image,
							}}
						/>
					</div>
				),
			},
			{
				Header: "ID",
				accessor: "id",
				Cell: ({ cell }) => (
					<Snippet
						hideSymbol={true}
						radius="sm"
						size="sm"
						color="secondary"
						variant="flat"
						copyIcon={<FaRegCopy />}
						checkIcon={<BsFillCheckCircleFill />}
						className="text-tiny bg-secondary text-primary"
						codeString={cell.row.values.id}
						tooltipProps={{
							showArrow: true,
							size: "sm",
							color: "secondary",
							className: "text-foreground shadow-md",
							content: "Copy ID for " + cell.row.values.name,
						}}
					>
						{cell.row.values.id}
					</Snippet>
				),
			},
			{
				Header: "Price",
				accessor: "current_price",
				Cell: ({ cell }) =>
					cell.row.values.current_price
						? CurrencyFormatter(
							StoreLocale,
							StoreCurrency,
							cell.row.values.current_price
						)
						: "-",
			},
			// 1HR
			{
				Header: "1Hr",
				accessor: "price_change_percentage_1h_in_currency",
				Cell: ({ cell }) =>
					cell.row.values.price_change_percentage_1h_in_currency ? (
						<span
							className={`${cell.row.values
								.price_change_percentage_1h_in_currency < 0
								? "text-danger"
								: "text-success"
								}`}
						>
							{cell.row.values.price_change_percentage_1h_in_currency.toFixed(
								2
							)}
							%
						</span>
					) : (
						"-"
					),
			},
			// 24HR
			{
				Header: "24Hrs",
				accessor: "price_change_percentage_24h_in_currency",
				Cell: ({ cell }) =>
					cell.row.values.price_change_percentage_24h_in_currency ? (
						<span
							className={`${cell.row.values
								.price_change_percentage_24h_in_currency < 0
								? "text-danger"
								: "text-success"
								}`}
						>
							{cell.row.values.price_change_percentage_24h_in_currency.toFixed(
								2
							)}
							%
						</span>
					) : (
						"-"
					),
			},
			// 7d
			{
				Header: "7Days",
				accessor: "price_change_percentage_7d_in_currency",
				Cell: ({ cell }) =>
					cell.row.values.price_change_percentage_7d_in_currency ? (
						<span
							className={`${cell.row.values
								.price_change_percentage_7d_in_currency < 0
								? "text-danger"
								: "text-success"
								}`}
						>
							{cell.row.values.price_change_percentage_7d_in_currency.toFixed(
								2
							)}
							%
						</span>
					) : (
						"-"
					),
			},
			// 14D
			{
				Header: "14Days",
				accessor: "price_change_percentage_14d_in_currency",
				Cell: ({ cell }) =>
					cell.row.values.price_change_percentage_14d_in_currency ? (
						<span
							className={`${cell.row.values
								.price_change_percentage_14d_in_currency < 0
								? "text-danger"
								: "text-success"
								}`}
						>
							{cell.row.values.price_change_percentage_14d_in_currency.toFixed(
								2
							)}
							%
						</span>
					) : (
						"-"
					),
			},
			// 30d
			{
				Header: "30Days",
				accessor: "price_change_percentage_30d_in_currency",
				Cell: ({ cell }) =>
					cell.row.values.price_change_percentage_30d_in_currency ? (
						<span
							className={`${cell.row.values
								.price_change_percentage_30d_in_currency < 0
								? "text-danger"
								: "text-success"
								}`}
						>
							{cell.row.values.price_change_percentage_30d_in_currency.toFixed(
								2
							)}
							%
						</span>
					) : (
						"-"
					),
			},
			//200d
			{
				Header: "200Days",
				accessor: "price_change_percentage_200d_in_currency",
				Cell: ({ cell }) =>
					cell.row.values.price_change_percentage_200d_in_currency ? (
						<span
							className={`${cell.row.values
								.price_change_percentage_200d_in_currency <
								0
								? "text-danger"
								: "text-success"
								}`}
						>
							{cell.row.values.price_change_percentage_200d_in_currency.toFixed(
								2
							)}
							%
						</span>
					) : (
						"-"
					),
			},
			//1Yr
			{
				Header: "1Yr",
				accessor: "price_change_percentage_1y_in_currency",
				Cell: ({ cell }) =>
					cell.row.values.price_change_percentage_1y_in_currency ? (
						<span
							className={`${cell.row.values
								.price_change_percentage_1y_in_currency < 0
								? "text-danger"
								: "text-success"
								}`}
						>
							{cell.row.values.price_change_percentage_1y_in_currency.toFixed(
								2
							)}
							%
						</span>
					) : (
						"-"
					),
			},

			{
				Header: "Mkt. Cap",
				accessor: "market_cap",
				Cell: ({ cell }) =>
					cell.row.values.market_cap
						? CurrencyFormatter(
							StoreLocale,
							StoreCurrency,
							cell.row.values.market_cap
						)
						: "-",
			},

			{
				Header: "FDV",
				accessor: "fully_diluted_valuation",
				Cell: ({ cell }) =>
					cell.row.values.fully_diluted_valuation
						? CurrencyFormatter(
							StoreLocale,
							StoreCurrency,
							cell.row.values.fully_diluted_valuation
						)
						: "-",
			},

			{
				Header: "Mkt. Cap/FDV",
				accessor: "mcap/fdv",
				Cell: ({ cell }) =>
					cell.row.values.market_cap &&
						cell.row.values.fully_diluted_valuation
						? (
							cell.row.values.market_cap /
							cell.row.values.fully_diluted_valuation
						).toFixed(2)
						: "-",
			},
			{
				Header: "Total Volume",
				accessor: "total_volume",
				Cell: ({ cell }) =>
					cell.row.values.total_volume
						? CurrencyFormatter(
							StoreLocale,
							StoreCurrency,
							cell.row.values.total_volume
						)
						: "-",
			},

			{
				Header: "Symbol",
				accessor: "symbol",
			},

			{
				Header: "Image",
				accessor: "image",
			},

			// NOT SHOWN IN TABLE
			{
				Header: "24Hrs High",
				accessor: "high_24h",
				Cell: ({ cell }) =>
					cell.row.values.high_24h
						? CurrencyFormatter(
							StoreLocale,
							StoreCurrency,
							cell.row.values.high_24h
						)
						: "-",
			},
			{
				Header: "24Hrs Low",
				accessor: "low_24h",
				Cell: ({ cell }) =>
					cell.row.values.low_24h
						? CurrencyFormatter(
							StoreLocale,
							StoreCurrency,
							cell.row.values.low_24h
						)
						: "-",
			},
			{
				Header: "24Hrs Price Change",
				accessor: "price_change_24h",
				Cell: ({ cell }) =>
					cell.row.values.price_change_24h
						? CurrencyFormatter(
							StoreLocale,
							StoreCurrency,
							cell.row.values.price_change_24h
						)
						: "-",
			},
			{
				Header: "24Hrs Price Change %",
				accessor: "price_change_percentage_24h",
				Cell: ({ cell }) =>
					cell.row.values.price_change_percentage_24h ? (
						<span
							className={`${cell.row.values.price_change_percentage_24h < 0
								? "text-danger"
								: "text-success"
								}`}
						>
							{cell.row.values.price_change_percentage_24h.toFixed(
								2
							)}
							%
						</span>
					) : (
						"-"
					),
			},
			{
				Header: "24Hrs Mkt. Cap Change",
				accessor: "market_cap_change_24h",
				Cell: ({ cell }) =>
					cell.row.values.market_cap_change_24h
						? CurrencyFormatter(
							StoreLocale,
							StoreCurrency,
							cell.row.values.market_cap_change_24h
						)
						: "-",
			},
			{
				Header: "24Hrs Mkt. Cap Change %",
				accessor: "market_cap_change_percentage_24h",
				Cell: ({ cell }) =>
					cell.row.values.market_cap_change_percentage_24h ? (
						<span
							className={`${cell.row.values
								.market_cap_change_percentage_24h < 0
								? "text-danger"
								: "text-success"
								}`}
						>
							{cell.row.values.market_cap_change_percentage_24h.toFixed(
								2
							)}
							%
						</span>
					) : (
						"-"
					),
			},
			{
				Header: "Circulating Supply",
				accessor: "circulating_supply",
				Cell: ({ cell }) =>
					cell.row.values.circulating_supply
						? NumberFormat(
							StoreLocale,
							cell.row.values.circulating_supply
						)
						: "-",
			},
			{
				Header: "Total Supply",
				accessor: "total_supply",
				Cell: ({ cell }) =>
					cell.row.values.total_supply
						? NumberFormat(
							StoreLocale,
							cell.row.values.total_supply
						)
						: "-",
			},
			{
				Header: "Max Supply",
				accessor: "max_supply",
				Cell: ({ cell }) =>
					cell.row.values.max_supply
						? NumberFormat(StoreLocale, cell.row.values.max_supply)
						: "-",
			},
			{
				Header: "ATH",
				accessor: "ath",
				Cell: ({ cell }) =>
					cell.row.values.ath
						? CurrencyFormatter(
							StoreLocale,
							StoreCurrency,
							cell.row.values.ath
						)
						: "-",
			},
			{
				Header: "ATH Date",
				accessor: "ath_date",
				Cell: ({ cell }) =>
					cell.row.values.ath_date
						? SimpleDateTime(cell.row.values.ath_date)
						: "-",
			},
			{
				Header: "ATL",
				accessor: "atl",
				Cell: ({ cell }) =>
					cell.row.values.atl
						? CurrencyFormatter(
							StoreLocale,
							StoreCurrency,
							cell.row.values.atl
						)
						: "-",
			},
			{
				Header: "ATL Change %",
				accessor: "atl_change_percentage",
				Cell: ({ cell }) =>
					cell.row.values.atl_change_percentage ? (
						<span
							className={`${cell.row.values.atl_change_percentage < 0
								? "text-danger"
								: "text-success"
								}`}
						>
							{cell.row.values.atl_change_percentage.toFixed(2)}%
						</span>
					) : (
						"-"
					),
			},
			{
				Header: "ATL Date",
				accessor: "atl_date",
				Cell: ({ cell }) =>
					cell.row.values.atl_date
						? SimpleDateTime(cell.row.values.atl_date)
						: "-",
			},
			{
				Header: "ROI",
				accessor: "roi",
				Cell: ({ cell }) =>
					cell.row.original.roi ? (
						<div className="flex flex-col flex-nowrap">
							<div>
								Times :{" "}
								{cell.row.original.roi.times
									? cell.row.original.roi.times.toFixed(2)
									: "-"}
							</div>
							<div>
								Percentage :{" "}
								{cell.row.original.roi.percentage
									? cell.row.original.roi.percentage.toFixed(
										2
									)
									: "-"}
								%
							</div>
							<div>
								Currency :{" "}
								{cell.row.original.roi.currency
									? cell.row.original.roi.currency.toUpperCase()
									: "-"}
							</div>
						</div>
					) : (
						"-"
					),
			},
			{
				Header: "Last Updated",
				accessor: "last_updated",
				Cell: ({ cell }) =>
					cell.row.values.last_updated
						? SimpleDateTime(cell.row.values.last_updated)
						: "-",
			},
			{
				Header: "Last 7Days",
				accessor: "sparkline_in_7d",
				Cell: ({ cell }) => (
					<Sparkline
						Width={150}
						Height={50}
						Data={cell.row.values.sparkline_in_7d.price}
					/>
				),
			},
		];

		return (
			<TransitionDiv>

				<div className="mb-4">
					<Card radius="sm" shadow="sm">
						<CardBody>
							<SectionHeader
								SectionID={"Watchlist"}
								SectionName={`Watchlist`}
								InfoContentTitle={`Watchlist`}
								InfoContent={
									<ul className="list-disc">
										<li className="ml-4">
											Shows all the coins market data.
										</li>
										<li className="ml-4">
											Auto Updates in every 45 seconds.
										</li>
									</ul>
								}
							/>

							<Accordion variant="splitted">
								<AccordionItem
									key={"Coins"}
									classNames={{
										title: "font-bold text-tiny",
										content: "text-tiny",
									}}
									aria-label="Coins"
									className="mb-4"
									startContent={
										<User
											name="Selected Coins"
											description={`Total Coins ${StoredCoins.length
												}${RemoveCoins.length > 0
													? `, Selected Coins ${RemoveCoins.length}`
													: ""
												}  `}
											avatarProps={{
												fallback: (
													<FaCoins
														className="text-background"
														size={16}
													/>
												),
												color: "primary",
											}}
										/>
									}
								>
									<div className="flex sm:justify-end gap-4 mb-4">
										<ConfirmationBtnModal
											BtnText={
												<>
													<BsXCircle /> Remove Coins
												</>
											}
											BtnClasses={{
												title: `Click to Remove ${RemoveCoins.length} selected coins !`,
												size: "sm",
												radius: "sm",
												variant: "flat",
												color: "danger",
												className: "font-bold",
												isDisabled:
													CoinData.isLoading ||
													RemoveCoins.length < 1 ||
													StoredCoins.length < 1,
											}}
											Title={`remove ${RemoveCoins.length} selected Coins`}
											YesAction={() => {
												SetPrevStoredCoins(StoredCoins);
												SetStoredCoins(
													StoredCoins.filter(
														(f) =>
															!RemoveCoins.includes(
																f.id
															)
													)
												);
												SetWatchListCoins(
													StoredCoins.filter(
														(f) =>
															!RemoveCoins.includes(
																f.id
															)
													)
												);
												SetRemoveCoins([]);
											}}
											NoAction={() => {
												SetRemoveCoins([]);
											}}
											ActionMsg={`By doing this you will remove ${RemoveCoins.length} selected coins from the compare list.`}
										/>

										<ConfirmationBtnModal
											BtnText={
												<>
													<BsTrash className="hover:animate-bounce" />{" "}
													Remove All Coins
												</>
											}
											NoAction={() => {
												SetRemoveCoins([]);
											}}
											BtnClasses={{
												title: `Click to Remove All coins !`,
												size: "sm",
												radius: "sm",
												variant: "flat",
												color: "danger",
												className: "font-bold",
												isDisabled:
													CoinData.isLoading ||
													StoredCoins.length < 1,
											}}
											Title={`remove all ${StoredCoins.length} coins`}
											YesAction={() => {
												SetPrevStoredCoins(StoredCoins);
												SetStoredCoins([]);
												SetRemoveCoins([]);
												SetWatchListCoins([]);
											}}
											ActionMsg={`By doing this you will remove total ${StoredCoins.length} coins, & compare list will be empty.`}
										/>
									</div>

									<div className="mb-4">
										{StoredCoins.length > 0 ? (
											<CheckboxGroup
												aria-label="This are the selected coins, To remove coins you can select them & click remove !"
												value={RemoveCoins}
												onValueChange={SetRemoveCoins}
												orientation="horizontal"
												className=" mb-4 max-h-52 overflow-auto"
												color="danger"
												isDisabled={CoinData.isLoading}
											>
												{sortBy(StoredCoins, ["name"]).map(
													(s, i) => (
														<Checkbox
															isDisabled={
																CoinData.isLoading
															}
															size="md"
															radius="full"
															icon={
																<BsDashCircleFill />
															}
															value={s.id}
															key={s.id}
														>
															<Chip
																radius="sm"
																size="md"
																color={`${RemoveCoins.includes(
																	s.id
																)
																	? "danger"
																	: ""
																	}`}
																variant="flat"
																avatar={
																	<Avatar
																		name={
																			s.name
																		}
																		src={
																			s.image ||
																			s.large ||
																			s.small ||
																			s.thumb
																		}
																	/>
																}
															>
																{s.name}
															</Chip>
														</Checkbox>
													)
												)}
											</CheckboxGroup>
										) : (
											<div className="text-danger text-tiny font-bold">
												No Coins are selected.
											</div>
										)}
									</div>
								</AccordionItem>
							</Accordion>

							<div className="flex flex-col gap-4">
								{CoinData.isLoading ? (
									<div>
										<TableSkeleton>
											<Spinner
												label={`Getting coin details ...`}
												color="primary"
												labelColor="primary"
											/>
										</TableSkeleton>
									</div>
								) : CoinData.error ? (
									<ComponentLevelError
										ErrorObj={CoinData.error}
										Msg={
											CoinData.error?.response?.data ||
											"Error Occured while Getting coin details ..."
										}
										Mutate={CoinData.reset}
									/>
								) : CoinData.data &&
									CoinData.data.length > 0 &&
									StoredCoins.length > 0 ? (
									<div>
										<MyTable
											isBasic={false}
											GoToLink={"/coins"}
											Data={CoinData.data.filter((m) =>
												StoredCoins.map(
													(v) => v.id
												).includes(m.id)
											)}
											ColumnsList={[
												// Sr. No.
												{
													headerName: "Sr. No.",
													field: "sr_no",
													pinned: "left",
													maxWidth: 120,
												},
												// NAME
												{
													headerName: "Name",
													field: "name",
													hide: false,
													cellRenderer: memo(
														({ data }) => (
															<User
																name={data.name}
																description={data.symbol.toUpperCase()}
																avatarProps={{
																	src: data.image,
																}}
															/>
														)
													),
													pinned: "left",
												},
												{
													headerName: "Mkt. Cap Rank",
													field: "market_cap_rank",
													hide: true,
												},
												// CURRENT PRICE
												{
													headerName: "Price",
													field: "current_price",
													hide: false,
													pinned: false,
													enableCellChangeFlash: true,
													valueFormatter: ({ value }) => {
														return value
															? CurrencyFormatter(
																StoreLocale,
																StoreCurrency,
																Number(value)
															)
															: "-";
													},
													headerTooltip: "Current Price",
												},

												// Price Change 24Hr.
												{
													headerName:
														"Price Change 24Hr.",
													field: "price_change_24h",
													hide: false,
													pinned: false,
													enableCellChangeFlash: true,
													cellRenderer: memo(function ({
														data,
													}) {
														let value = Number(data.price_change_24h);
														return value ? <LowHighChip Value={value} Currency={StoreCurrency} Locale={StoreLocale} /> : "-"
													}),
												},
												// Mkt. Cap Change 24Hr.
												{
													headerName:
														"24Hr. Mkt. Cap Change",
													field: "market_cap_change_24h",
													hide: false,
													pinned: false,
													enableCellChangeFlash: true,

													cellRenderer: memo(function ({
														data,
													}) {
														let value = Number(
															data.market_cap_change_24h
														);
														return value ? <LowHighChip Value={value} Currency={StoreCurrency} Locale={StoreLocale} /> : "-"
													}),
												},
												// Mkt. Cap Change % 24Hr.
												{
													headerName:
														"Mkt. Cap Change % 24Hr.",
													field: "market_cap_change_percentage_24h",
													hide: false,
													pinned: false,
													enableCellChangeFlash: true,
													cellRenderer: memo(function ({
														data,
													}) {
														let value = Number(
															data.market_cap_change_percentage_24h
														);
														return value ? <LowHighChip Value={value} /> : "-"
													}),
													headerTooltip:
														"Mkt. Cap Change % 24Hr.",
												},
												// Price Change % 1Hr.
												{
													headerName: "1Hr.",
													field: "price_change_percentage_1h_in_currency",
													hide: false,
													pinned: false,
													enableCellChangeFlash: true,
													cellRenderer: memo(function ({
														data,
													}) {
														let value = Number(
															data.price_change_percentage_1h_in_currency
														);
														return value ? <LowHighChip Value={value} /> : "-"
													}),
													headerTooltip:
														"Price Change % 1Hr.",
												},
												// Price Change % 24 Hr.
												{
													headerName: "24Hr.",
													field: "price_change_percentage_24h_in_currency",
													hide: false,
													pinned: false,
													enableCellChangeFlash: true,
													cellRenderer: memo(function ({
														data,
													}) {
														let value = Number(
															data.price_change_percentage_24h_in_currency
														);
														return value ? <LowHighChip Value={value} /> : "-"
													}),
													headerTooltip: "Price Change % 24Hr.",
												},
												//  Price Change % 7D.
												{
													headerName: "7D.",
													field: "price_change_percentage_7d_in_currency",
													hide: false,
													pinned: false,
													enableCellChangeFlash: true,
													cellRenderer: memo(function ({
														data,
													}) {
														let value = Number(
															data.price_change_percentage_7d_in_currency
														);
														return value ? <LowHighChip Value={value} /> : "-"
													}),
													headerTooltip:
														"Price Change % 7D.",
												},
												// Price Change % 14D.
												{
													headerName: "14D.",
													field: "price_change_percentage_14d_in_currency",
													hide: false,
													pinned: false,
													enableCellChangeFlash: true,
													cellRenderer: memo(function ({
														data,
													}) {
														let value = Number(
															data.price_change_percentage_14d_in_currency
														);
														return value ? <LowHighChip Value={value} /> : "-"
													}),
													headerTooltip:
														"Price Change % 14D.",
												},
												// Price Change % 30D.
												{
													headerName: "30D.",
													field: "price_change_percentage_30d_in_currency",
													hide: false,
													pinned: false,
													enableCellChangeFlash: true,
													cellRenderer: memo(function ({
														data,
													}) {
														let value = Number(
															data.price_change_percentage_30d_in_currency
														);
														return value ? <LowHighChip Value={value} /> : "-"
													}),
													headerTooltip:
														"Price Change % 30D.",
												},
												// Price Change % 200D.
												{
													headerName: "200D.",
													field: "price_change_percentage_200d_in_currency",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													cellRenderer: memo(function ({
														data,
													}) {
														let value = Number(
															data.price_change_percentage_200d_in_currency
														);
														return value ? <LowHighChip Value={value} /> : "-"
													}),
													headerTooltip:
														"Price Change % 200D.",
												},
												// Price Change % 1Yr.
												{
													headerName: "1Yr.",
													field: "price_change_percentage_1y_in_currency",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													cellRenderer: memo(function ({
														data,
													}) {
														let value = Number(
															data.price_change_percentage_1y_in_currency
														);
														return value ? <LowHighChip Value={value} /> : "-"
													}),
													headerTooltip:
														"Price Change % 200D.",
												},
												// High 24Hr.
												{
													headerName: "24Hr. High",
													field: "high_24h",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													valueFormatter: ({ value }) => {
														return value
															? CurrencyFormatter(
																StoreLocale,
																StoreCurrency,
																Number(value)
															)
															: "-";
													},
												},
												// Low 24Hr.
												{
													headerName: "24Hr. Low",
													field: "low_24h",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													valueFormatter: ({ value }) => {
														return value
															? CurrencyFormatter(
																StoreLocale,
																StoreCurrency,
																Number(value)
															)
															: "-";
													},
												},

												// Mkt. Cap
												{
													headerName: "Mkt. Cap",
													field: "market_cap",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													valueFormatter: ({ value }) => {
														return value
															? CurrencyFormatter(
																StoreLocale,
																StoreCurrency,
																Number(value)
															)
															: "-";
													},
													headerTooltip: "Market Cap",
												},
												// Fully Diluted Valuation
												{
													headerName: "FDV",
													field: "fully_diluted_valuation",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													valueFormatter: ({ value }) => {
														return value
															? CurrencyFormatter(
																StoreLocale,
																StoreCurrency,
																Number(value)
															)
															: "-";
													},
													headerTooltip:
														"Fully Diluted Valuation",
												},
												// "Mkt. Cap/FDV"
												{
													headerName: "Mkt. Cap/FDV",
													field: "mcap/fdv",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													valueGetter: ({ data }) => {
														return data.market_cap &&
															data.fully_diluted_valuation
															? Number(
																data.market_cap /
																data.fully_diluted_valuation
															).toFixed(2)
															: "-";
													},
												},
												// Total Vol.
												{
													headerName: "Total Volume",
													field: "total_volume",
													hide: false,
													pinned: false,
													enableCellChangeFlash: true,
													valueFormatter: ({ value }) => {
														return value
															? NumberFormat(
																StoreLocale,
																Number(value)
															)
															: "-";
													},
												},
												// Circulating Supply
												{
													headerName:
														"Circulating Supply",
													field: "circulating_supply",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													valueFormatter: ({ value }) => {
														return value
															? NumberFormat(
																StoreLocale,
																Number(value)
															)
															: "-";
													},
												},

												// Max Supply
												{
													headerName: "Max Supply",
													field: "max_supply",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													valueFormatter: ({ value }) => {
														return value
															? NumberFormat(
																StoreLocale,
																Number(value)
															)
															: "-";
													},
												},
												// Total Supply
												{
													headerName: "Total Supply",
													field: "total_supply",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													valueFormatter: ({ value }) => {
														return value
															? NumberFormat(
																StoreLocale,
																Number(value)
															)
															: "-";
													},
												},

												// ATH
												{
													headerName: "ATH",
													field: "ath",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													valueFormatter: ({ value }) => {
														return value
															? CurrencyFormatter(
																StoreLocale,
																StoreCurrency,
																Number(value)
															)
															: "-";
													},
												},
												// ATH Change %
												{
													headerName: "ATH Change %",
													field: "ath_change_percentage",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													cellRenderer: memo(function ({
														data,
													}) {
														let value = Number(
															data.ath_change_percentage
														);
														return value ? <LowHighChip Value={value} /> : "-"
													}),
												},
												// ATH Date
												{
													headerName: "ATH Date",
													field: "ath_date",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													valueFormatter: ({ value }) => {
														return value
															? SimpleDateTime(value)
															: "-";
													},
												},
												// ATL
												{
													headerName: "ATL",
													field: "atl",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													valueFormatter: ({ value }) => {
														return value
															? CurrencyFormatter(
																StoreLocale,
																StoreCurrency,
																Number(value)
															)
															: "-";
													},
												},

												// ATL Change %
												{
													headerName: "ATL Change %",
													field: "atl_change_percentage",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													cellRenderer: memo(function ({
														data,
													}) {
														let value = Number(
															data.atl_change_percentage
														);
														return value ? <LowHighChip Value={value} /> : "-"
													}),
												},
												//ATL Date
												{
													headerName: "ATL Date",
													field: "atl_date",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													valueFormatter: ({ value }) => {
														return value
															? SimpleDateTime(value)
															: "-";
													},
												},
												// ROI Times

												{
													headerName: "ROI Times",
													field: "roi.times",
													pinned: false,
													hide: true,
													valueGetter: ({ data }) =>
														data.roi
															? data.roi.times
															: "-",
													headerTooltip:
														"Return on Investment Times",
												},
												// ROI Currency
												{
													headerName: "ROI Currency",
													field: "roi.currency",

													pinned: false,
													hide: true,
													valueGetter: ({ data }) =>
														data.roi
															? data.roi.currency.toUpperCase()
															: "-",
													headerTooltip:
														"Return on Investment Currency",
												},

												// ROI %
												{
													headerName: "ROI %",
													field: "roi.percentage",
													pinned: false,
													hide: true,
													valueGetter: ({ data }) =>
														data.roi
															? data.roi.percentage
															: "-",
													headerTooltip:
														"Return on Investment Percentage",
												},

												// Sparkline In 7D.
												{
													headerName: "Sparkline In 7D.",
													field: "sparkline_in_7d",
													hide: false,
													pinned: false,
													enableCellChangeFlash: true,
													cellRenderer: memo(({ data }) =>
														data.sparkline_in_7d
															.price ? (
															<Sparkline
																Width={150}
																Height={50}
																Data={
																	data
																		.sparkline_in_7d
																		.price
																}
															/>
														) : (
															"-"
														)
													),
													sortable: false,
												},

												// Last Updated
												{
													headerName: "Last Updated",
													field: "last_updated",
													hide: true,
													pinned: false,
													enableCellChangeFlash: true,
													valueFormatter: ({ value }) => {
														return value
															? SimpleDateTime(value)
															: "-";
													},
												},
											]}
										/>
									</div>
								) : (
									<div className="flex flex-col items-center gap-4 text-center">
										<img
											src="/images/Overview.svg"
											alt="Overview Image"
											className="h-96 w-96"
										/>
										<div className="text-sm font-bold mb-8">
											Keep an eye on intresting coins.
										</div>
									</div>
								)}
							</div>
						</CardBody>
					</Card>
				</div>
			</TransitionDiv>

		);
	} catch (e) {
		return (
			<ComponentLevelError
				ErrorObj={{ message: e.toString() }}
				Msg={"While loading Watchlist section, an error occured !"}
			/>
		);
	}
};

export default WatchList;
