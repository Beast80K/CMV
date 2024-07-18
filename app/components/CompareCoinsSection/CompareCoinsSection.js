"use client";
import { ZustandStore } from "@/app/store/store";
import { Fetcher } from "@/app/utils/Swr/Fetcher";

import { memo, useMemo, useState } from "react";

import useSWRMutation from "swr/mutation";
import { useShallow } from "zustand/react/shallow";
import {
	Accordion,
	AccordionItem,
	Avatar,
	Button,
	Card,
	CardBody,
	Checkbox,
	CheckboxGroup,
	Chip,
	Input,
	Kbd,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,

	Skeleton,
	Spinner,
	User,
	useDisclosure,
} from "@nextui-org/react";
import SectionHeader from "../SectionHeader/SectionHeader";
import {
	BsDashCircleFill,

	BsPlusCircleFill,
	BsSearch,

	BsTrash,
	BsXCircle,
	BsXCircleFill,
} from "react-icons/bs";
import {
	FaArrowLeftLong,
	FaArrowRightLong,
	FaCoins,
} from "react-icons/fa6";
import useSWR from "swr";
import { sortBy } from "lodash";
import SimpleDateTime from "@/app/utils/DateTime/SimpleDateTime";
import CurrencyFormatter from "@/app/utils/Currency/CurrencyFormatter";
import NumberFormat from "@/app/utils/Number/NumberFormat";
import FetchingOptions from "@/app/utils/Swr/FetchingOptions";


import dynamic from "next/dynamic";
const ComponentLevelError = dynamic(() => import("../ComponentLevelError/ComponentLevelError"))

const MyTable = dynamic(() => import("@/app/components/MyTable/MyTable"))
const LowHighChip = dynamic(() => import("../LowHighChip/LowHighChip"))
const Sparkline = dynamic(() => import("../Graphs/Sparkline"))
const ConfirmationBtnModal = dynamic(() => import("../ConfirmationBtnModal/ConfirmationBtnModal"))

import TableSkeleton from "../Skeletons/TableSkeleton";
import TransitionDiv from "../TransitionDiv/TransitionDiv";
import InfoPopup from "../InfoPopup/InfoPopup";
import WatchListHeader from "../MyTable/Headers/WatchListHeader";
import WatchListBtn from "../WatchList/WatchListBtn/WatchListBtn";

const CompareCoinsSection = () => {
	try {
		const { StoreCurrency, StoreLocale } = ZustandStore(
			useShallow((state) => state)
		);
		const [SearchTerm, SetSearchTerm] = useState("");

		const [StoredCoins, SetStoredCoins] = useState([]);
		const [PrevStoredCoins, SetPrevStoredCoins] = useState([]);

		const [AddCoins, SetAddCoins] = useState([]);
		const [RemoveCoins, SetRemoveCoins] = useState([]);

		const CanCompare = useMemo(
			() => PrevStoredCoins.length < StoredCoins.length,
			[StoredCoins]
		);

		const CoinIDs = useMemo(
			() => StoredCoins.map((m) => m.id).join(","),
			[StoredCoins]
		);

		const SearchCall = useSWRMutation(
			"/api/search?query=" + SearchTerm,
			Fetcher
		);

		const CompareCall = useSWR(
			CanCompare
				? `/api/coin_market_data?currency=${StoreCurrency}&locale=${StoreLocale}&ids=${CoinIDs}`
				: null,
			Fetcher,
			{ ...FetchingOptions("45sec") }
		);




		const [SearchInResults, SetSearchInResults] = useState("");

		const { isOpen, onOpen, onOpenChange } = useDisclosure();

		const [Details, SetDetails] = useState(null);

		function SparkLineRenderer({ data }) {
			return data.sparkline_in_7d.price ? (
				<Sparkline Height={"100%"} Data={data.sparkline_in_7d.price} />
			) : (
				"-"
			);
		}

		return (
			<TransitionDiv>
				<Card radius="sm" shadow="sm" className="mb-4">
					<CardBody>
						<SectionHeader
							SectionName={`Compare Coins`}
							SectionID={"CompareCoins"}
							InfoContentTitle={`Compare Coins`}
							InfoContent={
								<ol className=" list-decimal">
									<li className="ml-4">
										Compare Coins by Market Cap, 24Hr. Volume,
										24Hr. Change, Current Price in various
										currencies.
									</li>
									<li className="ml-4">
										Results Auto Update every 45 seconds.
									</li>

									<li className="ml-4">Search & Select Coins</li>
									<li className="ml-4">
										Then Select currencies by typing names.
									</li>
									<li className="ml-4">
										Then click Compare button.
									</li>
									<li className="ml-4">
										By default, currently selected currency is
										the one which is selected on website.
									</li>
									<li className="ml-4">
										Minimum two currency has to be selected.
										Compare button is disabled if there are no
										Coins or Currencies selected.
									</li>

									<li className="ml-4">
										<div className="flex flex-col gap-1">
											<div className="flex gap-1 items-center">
												To add click on this :{" "}
												<BsPlusCircleFill
													className="text-success"
													size={16}
												/>{" "}
											</div>
											<div className="flex gap-1 items-center">
												To remove click on this :{" "}
												<BsDashCircleFill
													className="text-danger"
													size={16}
												/>
											</div>
										</div>
									</li>
								</ol>
							}
						/>

						<div className="flex flex-col gap-4">
							{/* SEARCH COINS */}

							<div className="flex justify-between items-center">
								<Button
									onClick={onOpen}
									radius="md"
									size="md"
									variant="flat"
									startContent={
										<>
											<BsSearch />
											Search coins{" "}
										</>
									}
									isDisabled={CompareCall.isLoading}
									title="Search coins"
									aria-label="Click to Search for coins"
								/>

								<Modal
									isDismissable={false}
									isOpen={isOpen}
									onOpenChange={onOpenChange}
									backdrop="blur"
									radius="md"
									shadow="md"
									size="xl"
									isKeyboardDismissDisabled={true}
									hideCloseButton={true}
									placement="center"
									scrollBehavior="inside"
								>
									<ModalContent>
										{(onClose) => (
											<div>
												<ModalHeader className="flex gap-1 items-center">
													<FaCoins />
													<div>Search Coins</div>
													<InfoPopup
														ContentTitle={
															"Search Coins"
														}
														Content={
															<ol className=" list-decimal">
																<li className="ml-4">
																	Type Coin name
																	then press{" "}
																	<Kbd
																		keys={[
																			"enter",
																		]}
																	>
																		Enter
																	</Kbd>
																	.
																</li>
																<li className="ml-4">
																	Searching will
																	not start
																	unless, Coin
																	name contains
																	more than 2
																	letters.
																</li>
																<li className="ml-4">
																	Minimum two
																	coins are needed
																	to be selected
																	to do
																	comparision..
																</li>
															</ol>
														}
													/>
												</ModalHeader>
												<ModalBody className="flex flex-col gap-4">
													<Accordion variant="splitted">
														<AccordionItem
															classNames={{
																title: "font-bold text-tiny",
																content:
																	"text-tiny",
															}}
															aria-label="Coins"
															startContent={
																<User
																	name="Coins"
																	description={`Selected ${AddCoins.length}`}
																	avatarProps={{
																		fallback: (
																			<FaCoins
																				className="text-background"
																				size={
																					16
																				}
																			/>
																		),
																		color: "primary",
																	}}
																/>
															}
														>
															<div className="flex flex-col gap-2 max-h-24 overflow-auto">
																<div className="flex flex-wrap gap-4 items-center">
																	{AddCoins.length >
																		0 ? (
																		AddCoins.map(
																			(
																				s,
																				i
																			) => (
																				<Chip
																					key={
																						s.id
																					}
																					radius="sm"
																					size="sm"
																					onClose={() => {
																						SetAddCoins(
																							AddCoins.filter(
																								(
																									f
																								) =>
																									f.id !==
																									s.id
																							)
																						);
																					}}
																					variant="flat"
																					endContent={
																						<ConfirmationBtnModal
																							BtnText={
																								<BsDashCircleFill
																									className="text-danger "
																									size={
																										"12"
																									}
																								/>
																							}
																							BtnClasses={{
																								title: `Click Remove to ${s.name} from coins to be added !`,
																								size: "sm",
																								radius: "sm",
																								variant:
																									"none",
																								color: "danger",
																								className:
																									"text-danger p-0",
																								isIconOnly: true,
																							}}
																							Title={`remove ${s.name} coins to be added`}
																							YesAction={() => {
																								SetAddCoins(
																									AddCoins.filter(
																										(
																											f
																										) =>
																											f.id !==
																											s.id
																									)
																								);
																							}}
																							ActionMsg={`By doing this you will remove ${s.name} will not be added for comparision.`}
																						/>
																					}
																					avatar={
																						<Avatar
																							name={
																								s.name
																							}
																							src={
																								s.large ||
																								s.thumb
																							}
																						/>
																					}
																				>
																					{
																						s.name
																					}
																				</Chip>
																			)
																		)
																	) : (
																		<div className="text-danger text-tiny font-bold">
																			No Coins
																			are
																			selected.
																		</div>
																	)}
																</div>
															</div>
														</AccordionItem>
													</Accordion>

													<div>
														<div className="flex gap-2 items-center justify-center">
															<Input
																autoFocus={true}
																isDisabled={
																	SearchCall.isMutating
																}
																fullWidth={false}
																placeholder="Search & Add Coins"
																size="md"
																radius="md"
																type="text"
																variant="light"
																color="primary"
																value={
																	SearchTerm || ""
																}
																label=""
																labelPlacement="outside"
																aria-label="Type Coin name"
																className="max-w-sm transition ease-in-out duration-500"
																isClearable
																onClear={() => {
																	SetSearchTerm(
																		""
																	);
																	SearchCall.reset();
																}}
																onKeyDown={(e) => {
																	e.key ===
																		"Enter" &&
																		SearchTerm.trim()
																			.length > 2
																		? SearchCall.trigger()
																		: null;
																}}
																endContent={
																	<BsXCircleFill
																		aria-label="Click to Clear"
																		size={16}
																		className="text-danger "
																	/>
																}
																startContent={
																	<BsSearch />
																}
																onChange={(e) => {
																	SetSearchTerm(
																		e.target.value.trim()
																	);
																}}
																isInvalid={
																	SearchTerm.trim()
																		.length < 2
																}
															/>
															<Button
																radius="md"
																size="md"
																onClick={() => {
																	SearchCall.trigger();
																}}
																fullWidth={false}
																color="primary"
																title="Click to search data !"
																aria-label="Click to search data !"
																isIconOnly={true}
																variant="light"
																isDisabled={
																	SearchTerm.trim()
																		.length <
																	3 ||
																	SearchCall.isMutating
																}
															>
																<BsSearch />
															</Button>
														</div>
													</div>

													<div>
														{SearchCall.isMutating ? (
															<div className=" flex flex-col gap-4">
																<Skeleton className="border-b-1  h-14 rounded-md" />
																<Skeleton className="border-b-1 h-14 rounded-md" />
																<Spinner
																	label={`Searching for Coins with name : ${SearchTerm}`}
																	color="primary"
																	labelColor="primary"
																/>
																<Skeleton className="border-b-1  h-14 rounded-md" />
																<Skeleton className="border-b-1 h-14 rounded-md" />
															</div>
														) : SearchCall.error ? (
															<ComponentLevelError
																ErrorObj={
																	SearchCall.error
																}
																Msg={
																	SearchCall.error
																		?.response
																		?.data ||
																	`Error Occured while Searching for Coins with name : ${SearchTerm} ...`
																}
																Mutate={
																	SearchCall.reset
																}
															/>
														) : SearchCall.data ? (
															SearchCall.data.coins
																.length > 0 ? (
																<div>
																	<div className="flex flex-col gap-4">
																		<div className="flex flex-wrap justify-between items-center">
																			<Input
																				value={
																					SearchInResults
																				}
																				onChange={(
																					e
																				) => {
																					SetSearchInResults(
																						e
																							.target
																							.value
																					);
																				}}
																				fullWidth={
																					false
																				}
																				isClearable
																				endContent={
																					<BsXCircleFill
																						aria-label="Click to Clear"
																						className="text-danger"
																					/>
																				}
																				onClear={() => {
																					SetSearchInResults(
																						""
																					);
																				}}
																				size="sm"
																				radius="sm"
																				className=" w-52"
																				label=""
																				aria-label="Search in results"
																				labelPlacement="outside"
																				placeholder="Search in results"
																				startContent={
																					<BsSearch />
																				}
																			/>
																			<div className="text-tiny font-bold">
																				Found{" "}
																				{
																					SearchCall
																						.data
																						.coins
																						.length
																				}{" "}
																				results
																			</div>
																		</div>
																		<div className="flex flex-col gap-2 max-h-96 overflow-auto">
																			{sortBy(
																				SearchInResults
																					? SearchCall.data.coins.filter(
																						(
																							f
																						) =>
																							f.name
																								.toLowerCase()
																								.includes(
																									SearchInResults.toLowerCase()
																								)
																					)
																					: SearchCall
																						.data
																						.coins,
																				[
																					"name",
																				]
																			).map(
																				(
																					v
																				) => (
																					<div
																						className={`border-b-1 transition-all duration-500 ease-soft-spring flex p-2 justify-between items-center rounded-md cursor-pointer hover:bg-secondary`}
																						onClick={() => {
																							StoredCoins.find(
																								(
																									f
																								) =>
																									f.id ===
																									v.id
																							)
																								? null
																								: AddCoins.find(
																									(
																										f
																									) =>
																										f.id ===
																										v.id
																								)
																									? SetAddCoins(
																										AddCoins.filter(
																											(
																												f
																											) =>
																												f.id !==
																												v.id
																										)
																									)
																									: SetAddCoins(
																										[
																											...AddCoins,
																											v,
																										]
																									);
																						}}
																						key={
																							v.id
																						}
																					>
																						<User
																							name={
																								v.name
																							}
																							description={
																								v.symbol
																							}
																							avatarProps={{
																								src:
																									v.large ||
																									v.small ||
																									v.thumb,
																							}}
																						/>

																						{StoredCoins.find(
																							(
																								f
																							) =>
																								f.id ===
																								v.id
																						) ? (
																							<Chip
																								size="sm"
																								radius="sm"
																								color="success"
																								variant="flat"
																							>
																								Added
																							</Chip>
																						) : AddCoins.find(
																							(
																								f
																							) =>
																								f.id ===
																								v.id
																						) ? (
																							<Button
																								color="danger"
																								variant="light"
																								size="sm"
																								radius="sm"
																								title={`Remove ${v.name} from selection`}
																								// isDisabled={CompareCall.isLoading}
																								isIconOnly={
																									true
																								}
																								onClick={() => {
																									SetAddCoins(
																										AddCoins.filter(
																											(
																												f
																											) =>
																												f.id !==
																												v.id
																										)
																									);
																								}}
																							>
																								<BsDashCircleFill
																									size={
																										16
																									}
																								/>
																							</Button>
																						) : (
																							<Button
																								color="success"
																								size="sm"
																								variant="light"
																								radius="sm"
																								title={`Add ${v.name} to selection`}
																								// isDisabled={CompareCall.isMutating}
																								isIconOnly={
																									true
																								}
																								onClick={() => {
																									SetAddCoins(
																										[
																											...AddCoins,
																											v,
																										]
																									);
																								}}
																							>
																								<BsPlusCircleFill
																									size={
																										16
																									}
																								/>
																							</Button>
																						)}
																					</div>
																				)
																			)}
																		</div>
																	</div>
																</div>
															) : (
																<div className="flex flex-col items-center gap-4 text-center">
																	<img
																		src="/images/NoData.svg"
																		alt="No Data image"
																		className="h-96 w-96"
																	/>

																	<div className="text-sm font-bold">
																		No Coins was
																		found for
																		search :{" "}
																		{SearchTerm}
																	</div>
																</div>
															)
														) : (
															<div className="flex flex-col items-center gap-4 text-center">
																<img
																	src="/images/Searching.svg"
																	alt="Searching image"
																	className="h-96 w-96"
																/>
																<div className="text-sm font-bold mb-4">
																	Search & Select
																	Coins.
																</div>
															</div>
														)}
													</div>
												</ModalBody>
												<ModalFooter className="flex flex-col gap-4">
													<div>
														<div className="flex justify-between">
															{AddCoins.length > 0 ? (
																<ConfirmationBtnModal
																	BtnText={"Back"}
																	BtnClasses={{
																		title: `Click to exit from Search Coins`,
																		size: "md",
																		radius: "md",
																		variant:
																			"flat",
																		color: "danger",
																		isDisabled:
																			SearchCall.isMutating,
																		startContent: <FaArrowLeftLong />,
																	}}
																	Title={`Exit from Search Coins`}
																	YesAction={() => {
																		SetSearchTerm("");
																		SearchCall.reset();
																		onClose();
																	}}
																	ActionMsg={`By doing this you will exit from Search Coins & if searched those results or coins selected from search results will be lost !`}
																/>
															) : (
																<Button
																	color="danger"
																	variant="flat"
																	radius="md"
																	size="md"
																	isDisabled={
																		SearchCall.isMutating
																	}
																	title={`Exit from Search Coins`}
																	startContent={
																		<FaArrowLeftLong />
																	}
																	onClick={() => {
																		SetSearchTerm("");
																		SearchCall.reset();
																		onClose();
																	}}
																>
																	Back
																</Button>
															)}

															<Button
																color="success"
																variant="flat"
																radius="md"
																size="md"
																isDisabled={
																	SearchCall.isMutating || AddCoins.length + StoredCoins.length < 2 || AddCoins.length === 0
																}
																startContent={<FaArrowRightLong />}
																onClick={() => {
																	SetSearchTerm("");
																	SearchCall.reset();
																	SetPrevStoredCoins(StoredCoins);
																	SetStoredCoins([
																		...StoredCoins,
																		...AddCoins.filter(
																			(f) =>
																				!StoredCoins.map(
																					(
																						m
																					) =>
																						m.id
																				).includes(
																					f.id
																				)
																		),
																	]);
																	SetAddCoins([]);
																	onClose();
																}}
															>
																Done
															</Button>
														</div>
													</div>
												</ModalFooter>
											</div>
										)}
									</ModalContent>
								</Modal>
							</div>

							{/* STORED COINS */}
							<Accordion variant="splitted">
								<AccordionItem
									key={"Coins"}
									classNames={{
										title: "font-bold text-tiny",
										content: "text-tiny",
									}}
									aria-label="Coins"
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
													CompareCall.isLoading ||
													RemoveCoins.length < 1 ||
													StoredCoins.length < 3,
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
													CompareCall.isLoading ||
													StoredCoins.length < 1,
											}}
											Title={`remove all ${StoredCoins.length} coins`}
											YesAction={() => {
												SetPrevStoredCoins(StoredCoins);
												SetStoredCoins([]);
												SetRemoveCoins([]);
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
												className=""
												color="danger"
												isDisabled={CompareCall.isLoading}
											>
												{sortBy(StoredCoins, ["name"]).map(
													(s, i) => (
														<Checkbox
															isDisabled={
																CompareCall.isLoading
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
																			s.large ||
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

							<div className="flex flex-col gap-4 mb-4">
								<div>
									{/* COMPARE RESULTS */}

									{CompareCall.isLoading ? (
										<div className="mb-4">
											<TableSkeleton>
												<Spinner
													label={`Comparing Coins ...`}
													color="primary"
													labelColor="primary"
												/>
											</TableSkeleton>
										</div>
									) : CompareCall.error ? (
										<ComponentLevelError
											ErrorObj={CompareCall.error}
											Msg={
												CompareCall.error?.response?.data ||
												"Error Occured while Comparing Coins ..."
											}
											Mutate={CompareCall.reset}
										/>
									) : CompareCall.data &&
										CompareCall.data.length > 0 &&
										StoredCoins.length > 0 ?
										<MyTable
											isBasic={false}
											GoToLink={"/coins"}
											Data={CompareCall.data.filter((m) =>
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
										: (
											<div className="flex flex-col items-center gap-2 text-center">
												<img
													src="/images/Compare.svg"
													alt="Compare image"
													className="h-96 w-96"
												/>
												<div className="text-sm font-bold mb-8">
													Compare coins by various statistics.
												</div>
											</div>
										)}
								</div>
							</div>
						</div>
					</CardBody>
				</Card></TransitionDiv>
		);
	} catch (e) {
		return (
			<ComponentLevelError
				ErrorObj={{ message: e.toString() }}
				Msg={"While loading Compare Coins Section, an error occured !"}
			/>
		);
	}
};

export default CompareCoinsSection;
