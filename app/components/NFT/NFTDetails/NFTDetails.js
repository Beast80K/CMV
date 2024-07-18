'use client'


import { Fetcher } from "@/app/utils/Swr/Fetcher"
import FetchingOptions from "@/app/utils/Swr/FetchingOptions"
import { Card, CardBody, Spinner, Tab, Tabs, Snippet, Link, Skeleton } from "@nextui-org/react"
import useSWR from "swr"
import HrWithText from "../../HrWithText/HrWithText"
import ToHTML from "@/app/utils/ToHTML/ToHTML"
import { FaRegCopy } from "react-icons/fa6"
import { BsFillCheckCircleFill } from "react-icons/bs"
import Capitalized from "@/app/utils/Text/Capitalized"
import CurrencyFormatter from "@/app/utils/Currency/CurrencyFormatter"
import { ZustandStore } from "@/app/store/store"
import NumberFormat from "@/app/utils/Number/NumberFormat"
import { useShallow } from 'zustand/react/shallow'


import dynamic from 'next/dynamic'
import TransitionDiv from "../../TransitionDiv/TransitionDiv"
import SectionHeader from "../../SectionHeader/SectionHeader"
import TabsSkeleton from "../../Skeletons/TabsSkeleton"
import ExternalLink from "../../ExternalLink/ExternalLink"
const ComponentLevelError = dynamic(() => import("@/app/components/ComponentLevelError/ComponentLevelError"))
const DataNotThere = dynamic(() => import("@/app/components/DataNotThere/DataNotThere"))
const LowHighChip = dynamic(() => import("../../LowHighChip/LowHighChip"))




export default function NFTDetails({ Nft_ID }) {
	try {
		const { data, error, isLoading, mutate } = useSWR('/api/nft_id?id=' + Nft_ID, Fetcher, { ...FetchingOptions('60sec') })
		// 1min
		const { StoreLocale } = ZustandStore(useShallow((state) => state))

		return (
			<TransitionDiv>
				<Card radius='sm' shadow='sm' className='mb-4'>
					<CardBody>
						<div className='grid grid-cols-12 gap-4 text-tiny '>
							<div className='col-span-12 lg:col-span-4 xl:col-span-3'>
							</div>
							<div className='col-span-12 lg:col-span-8 xl:col-span-9'>

							</div>
						</div>

						{
							isLoading
								?
								<div className='grid grid-cols-12 gap-4 text-tiny '>
									<div className='col-span-12 lg:col-span-4 xl:col-span-3'>
										<SectionHeader
											SectionName={`${"NFT Details"}`}
											SectionID={"NFTDetails"}
											InfoContentTitle={"NFT Details"}
											InfoContent={<ul className='list-disc'>
												<li className='ml-4'>Shows current data (name, symbol, price, exchange tickers, platforms etc.) for a coin.</li>
												<li className='ml-4'>Auto Updates in every 1 minute.</li>

											</ul>}
										/>

										<div className='flex flex-col gap-4'>

											<div className="max-w-[300px] w-full flex items-center gap-3">
												<div>
													<Skeleton className="flex rounded-full w-12 h-12" />
												</div>
												<div className="w-full flex flex-col gap-2">
													<Skeleton className="h-4 w-3/4 rounded-md" />
													<Skeleton className="h-4 w-2/4 rounded-md" />
												</div>
											</div>
											<Spinner label={`Getting NFT details for NFT ID : ${Nft_ID}`} color="primary" labelColor="primary" />

											<Skeleton className="w-4/4 rounded-md ">
												<div className="h-8 w-3/4 rounded-md "></div>
											</Skeleton>

											<Skeleton className="w-4/4 rounded-md ">
												<div className="h-8 w-2/4 rounded-md "></div>
											</Skeleton>

											<div className='flex  flex-col gap-4'>
												<Skeleton className="h-8 w-1/4 rounded-md  " />
												<Skeleton className="h-8 w-2/4 rounded-md  " />
												<Skeleton className="h-8 w-3/4 rounded-md  " />
												<Skeleton className="h-8 w-4/4 rounded-md  " />

												<Skeleton className="h-8 w-1/4 rounded-md  " />
												<Skeleton className="h-8 w-4/4 rounded-md  " />
												<Skeleton className="h-8 w-2/4 rounded-md  " />
												<Skeleton className="h-8 w-3/4 rounded-md  " />

											</div>
										</div>



									</div>
									<div className='col-span-12 lg:col-span-8 xl:col-span-9'>
										<TabsSkeleton />
									</div>
								</div>

								:
								error
									?
									error.response.status === 404
										?
										<DataNotThere
											Text={`${error?.response?.data ? error?.response?.data + " " : null}NFT Details data not available for NFT ID : ${Nft_ID}`}
										/>
										:
										<ComponentLevelError ErrorObj={error} Msg={error?.response?.data || "Error Occured while getting NFT Details"} Mutate={mutate} />
									:

									<div>


										<div className='grid grid-cols-12 gap-4 text-tiny '>
											<div className='col-span-12 lg:col-span-4 xl:col-span-3'>
												<SectionHeader
													SectionName={`${data.name} (${data.symbol.toUpperCase()})`}
													SectionID={"NFTDetails"}
													InfoContentTitle={"NFT Details"}
													InfoContent={<ul className='list-disc'>
														<li className='ml-4'>Shows current data (name, symbol, price, exchange tickers, platforms etc.) for a coin.</li>
														<li className='ml-4'>Auto Updates in every 1 minute.</li>

													</ul>}
												/>

												<div>
													{/* IMAGE NAME SYMBOL */}
													<div className='flex gap-2 flex-col mb-4'>

														<div className='flex flex-row flex-wrap justify-start gap-2'>
															<img
																src={data.image.small || null} alt={data.name}
																className=' rounded-full'
															/>
															<div className='flex flex-col'>

																<h3 className='font-bold text-lg'>{
																	data.name
																} </h3>
																{
																	data.symbol ? <h6 className=' text-sm'>{data.symbol.toUpperCase()}</h6> : <h6 className='text-danger text-sm'>Unavailable</h6>

																}
															</div>

														</div>
													</div>
													{/* Floor Price */}

													<div className="flex flex-col gap-2 mb-2">
														<div>
															<div className="mb-2">
																<HrWithText Text={"Floor Price"} />
															</div>
															<div className="flex flex-col gap-2">
																{/* Floor Price {data.native_currency_symbol.toUpperCase()} */}
																<div className="flex flex-wrap  gap-2 items-center">
																	<p className='text-4xl font-bold'>

																		{CurrencyFormatter(StoreLocale, data.native_currency_symbol, data.floor_price['native_currency'])}
																	</p>

																	<LowHighChip Value={data.floor_price['native_currency']} />




																</div>
																{/* Floor Price in USD */}

																<div className="flex flex-wrap  gap-2 items-center">
																	<p title="Floor Price in USD" className='text-2xl'>
																		{CurrencyFormatter(StoreLocale, 'usd', data.floor_price.usd)}
																	</p>

																	<LowHighChip Value={data.floor_price_24h_percentage_change.usd} />



																</div>

															</div>

														</div>

													</div>
													{/* MARKET CAP */}
													<div className="flex flex-col gap-2 mb-2">
														<div className="">
															<HrWithText Text={"Market Cap"} />
														</div>

														{/* Market Cap */}
														<div className="flex items-center gap-2 justify-between ">
															<div>Market Cap {data.native_currency_symbol.toUpperCase()}</div>
															<div>
																{CurrencyFormatter(StoreLocale, data.native_currency_symbol, data["market_cap"]["native_currency"])}
															</div>
														</div>
														<div className="flex items-center gap-2 justify-between ">

															<div>Market Cap in USD</div>

															{data["market_cap"]['usd'] ?
																<div >
																	{CurrencyFormatter(StoreLocale, 'usd', data["market_cap"]['usd'])}
																</div>
																:
																<div className="text-danger">Unavailable</div>
															}
														</div>

														{/* Market Cap */}
														<div className="col-span-12 gap-2  lg:col-span-3 ">

															<div className="mb-2">
																<HrWithText Text={"Market Cap % Change"} />
															</div>
															<div className="flex items-center gap-2 justify-between mb-2">
																<div>24 Hr. % Change {data.native_currency_symbol.toUpperCase()}</div>
																<LowHighChip Value={data['market_cap_24h_percentage_change']['native_currency']} />

															</div>
															{/* Native Currency USD*/}
															<div className="flex items-center gap-2 justify-between mb-2">
																<div>24 Hr. % Change in USD</div>
																<LowHighChip Value={data['market_cap_24h_percentage_change']['usd']} />

															</div>


														</div>



													</div>
													{/* VOLUME */}
													<div className="flex flex-col gap-2 mb-2">

														<HrWithText Text={"Volume"} />


														<div className="flex items-center justify-between">

															<div>Volume in Native Currency {data.native_currency_symbol.toUpperCase()}</div>
															<div>
																{CurrencyFormatter(StoreLocale, data.native_currency_symbol, data.volume_24h['native_currency'])}
															</div>


														</div>
														<div className="flex items-center justify-between">

															<div>Volume in USD</div>
															<div>
																{CurrencyFormatter(StoreLocale, 'usd', data.volume_24h['usd'])}
															</div>


														</div>
													</div>



													{/* Volume % Change */}
													<div className="col-span-12 gap-2  lg:col-span-3 ">

														<div className="mb-2">
															<HrWithText Text={"Volume % Change"} />
														</div>
														<div className="flex items-center gap-2 justify-between mb-2">
															<div>24 Hr. % Change {data.native_currency_symbol.toUpperCase()}</div>
															<LowHighChip Value={data['volume_24h_percentage_change']['native_currency']} />

														</div>
														{/* Native Currency USD*/}
														<div className="flex items-center gap-2 justify-between mb-2">
															<div>24 Hr. % Change in USD</div>
															<LowHighChip Value={data['volume_24h_percentage_change']['usd']} />

														</div>


													</div>

													{/* Total Supply */}
													<div className="flex flex-col gap-2 mb-2">

														<HrWithText Text={"Total Supply"} />


														<div className="flex items-center justify-between">

															<div>Total Supply</div>
															<div>
																{NumberFormat(StoreLocale, data.total_supply)}
															</div>


														</div>
													</div>


												</div>

											</div>

											<div className='col-span-12 lg:col-span-8 xl:col-span-9'>


												<Tabs radius='sm'
													variant='solid'
													color='primary'
													classNames={{
														tabList: "bg-secondary",
														tabContent: "group-data-[selected=true]:text-secondary group-data-[selected=true]:font-bold"
													}}
													aria-label="NFT Details">
													<Tab title="Info." key="nftInfo">

														<div className='grid grid-cols-12 gap-4 text-tiny '>
															<div className="col-span-12 xl:col-span-6 ">

																{/* Info. */}
																<div className="mb-2">
																	<HrWithText Text={"Info."} />
																</div>

																{/* ID */}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>
																		ID
																	</div>
																	<div>

																		<Snippet hideSymbol={true}
																			radius='sm'
																			size='sm'
																			variant='flat'
																			color='secondary'
																			copyIcon={<FaRegCopy />}
																			checkIcon={<BsFillCheckCircleFill />}
																			className='text-tiny bg-secondary text-primary'
																			codeString={data.id}
																			tooltipProps={
																				{
																					showArrow: true,
																					size: "sm",
																					color: 'secondary',
																					className: 'text-foreground shadow-md',
																					content: "Copy ID for " + data.name
																				}
																			}
																		>
																			{data.id}
																		</Snippet>
																	</div>
																</div>

																{/* ASSET PLATFORM ID */}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>
																		Asset Platform ID
																	</div>
																	<div>
																		<Snippet hideSymbol={true}
																			radius='sm'
																			size='sm'
																			variant='flat'
																			color='secondary'
																			copyIcon={<FaRegCopy />}
																			checkIcon={<BsFillCheckCircleFill />}
																			className='text-tiny bg-secondary text-primary'
																			codeString={data.asset_platform_id}
																			tooltipProps={
																				{
																					showArrow: true,
																					size: "sm",
																					color: 'secondary',
																					className: 'text-foreground shadow-md',
																					content: "Copy API ID for " + data.name
																				}
																			}
																		>
																			{data.asset_platform_id}
																		</Snippet>
																	</div>
																</div>

																{/* CONTRACT ADDRESS */}
																<div className="flex flex-col sm:flex-wrap sm:flex-row sm:items-center gap-2 justify-between mb-2">

																	<div>
																		Contract Address
																	</div>
																	<div>

																		<Snippet hideSymbol={true}
																			radius='sm'
																			size='sm'
																			variant='flat'
																			color='secondary'
																			copyIcon={<FaRegCopy />}
																			checkIcon={<BsFillCheckCircleFill />}
																			className='text-tiny bg-secondary text-primary'
																			codeString={data.contract_address}
																			tooltipProps={
																				{
																					showArrow: true,
																					size: "sm",
																					color: 'secondary',
																					className: 'text-foreground shadow-md',
																					content: "Copy Contract Address for " + data.name
																				}
																			}
																		>
																			{data.contract_address}
																		</Snippet>
																	</div>
																</div>

																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>Native Currency</div>
																	<div>
																		{data['native_currency']}
																	</div>
																</div>

																{/* Native Currency USD*/}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>Native Currency Symbol</div>
																	<div>
																		{data['native_currency_symbol']}
																	</div>
																</div>



																{/* No. Of Unique Addresses */}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>
																		No. Of Unique Addresses
																	</div>
																	<div>
																		{NumberFormat(StoreLocale, data.number_of_unique_addresses)}
																	</div>
																</div>
																{/* No. Of Unique Addresses 24h % change */}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>
																		No. Of Unique Addresses 24Hr. % Change
																	</div>
																	<div>


																		{

																			data.number_of_unique_addresses_24h_percentage_change < 0

																				?
																				<div className='text-danger flex gap-1 items-center '>
																					<div>
																						{data.number_of_unique_addresses_24h_percentage_change.toFixed(2)}%
																					</div>

																				</div>

																				:

																				<div className='text-success flex gap-1 items-center '>
																					<div>
																						{data.number_of_unique_addresses_24h_percentage_change.toFixed(2)}%
																					</div>

																				</div>
																		}
																	</div>
																</div>

																{/* Volume 24Hr % Change in USD */}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>
																		Volume 24Hr % Change in USD
																	</div>
																	<LowHighChip Value={data.volume_in_usd_24h_percentage_change} />


																</div>


																{/* One Day Sales */}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>
																		One Day Sales
																	</div>
																	<div>
																		{NumberFormat(StoreLocale, data.one_day_sales)}
																	</div>
																</div>

																{/* One Day Sales 24Hr % Change */}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>
																		One Day Sales 24Hr % Change
																	</div>
																	<LowHighChip Value={data.one_day_sales_24h_percentage_change} />

																</div>

																{/* One Day Avg. Sale Price */}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>
																		One Day Avg. Sale Price
																	</div>
																	<div>

																		{CurrencyFormatter(StoreLocale, data.native_currency_symbol, data.one_day_average_sale_price)}
																	</div>

																</div>

																{/* One Day Avg. Sale Price */}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>
																		One Day Avg. Sale Price 24Hr. % Change
																	</div>
																	<LowHighChip Value={data.one_day_average_sale_price_24h_percentage_change} />


																</div>




																{/* LINKS */}
																<div className="col-span-12 lg:col-span-3 ">
																	<div className="mb-2">
																		<HrWithText Text={"Links"} />
																	</div>

																	<div className="flex flex-wrap items-center gap-4 mb-2">


																		{
																			Object.keys(data.links).map((l, i) => (
																				data.links[l] ?
																					<div className="flex gap-2 items-center " key={l}>
																						{Capitalized(l)}


																						<ExternalLink ExternalLink={data.links[l]} />

																					</div>

																					:
																					null
																			))
																		}
																	</div>
																</div>


																{/* EXPLORERS */}
																<div className="col-span-12 gap-2  lg:col-span-3 ">
																	<div className="mb-2">
																		<HrWithText Text={"Explorers"} />
																	</div>
																	<div className="flex flex-wrap items-center gap-4">
																		{
																			data.explorers.map((l, i) => (
																				l.name && l.link ?
																					<div className="flex gap-2 items-center" key={l.link}>
																						{l.name}


																						<ExternalLink ExternalLink={l.link} />


																					</div>

																					:
																					null
																			))

																		}
																	</div>
																</div>
															</div>

															{/* Floor Price % Change */}
															<div className="col-span-12 xl:col-span-6 ">
																<div className="mb-2">
																	<HrWithText Text={"Floor Price % Change"} />
																</div>
																<div className="flex items-center gap-2 justify-between  mb-2">
																	<div>24 Hr. % Change in {data.native_currency_symbol.toUpperCase()}</div>
																	<LowHighChip Value={data.floor_price_24h_percentage_change.native_currency} />

																</div>
																{/* Native Currency USD*/}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>24 Hr. % Change in USD</div>
																	<LowHighChip Value={data['floor_price_24h_percentage_change']['usd']} />

																</div>

																{/* 7D % Change */}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>7D % Change in {data.native_currency_symbol.toUpperCase()}</div>

																	<LowHighChip Value={data['floor_price_7d_percentage_change']['native_currency']} />


																</div>
																{/* 7D % Change Native Currency USD*/}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>7D % Change in USD</div>
																	<LowHighChip Value={data['floor_price_7d_percentage_change']['usd']} />

																</div>

																{/* 14D % Change */}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>14D % Change {data.native_currency_symbol.toUpperCase()}</div>
																	<LowHighChip Value={data['floor_price_14d_percentage_change']['native_currency']} />

																</div>

																{/* 14D % Change in USD*/}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>14D % Change in USD</div>
																	<LowHighChip Value={data['floor_price_14d_percentage_change']['usd']} />

																</div>


																{/* 30D % Change */}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>30D % Change {data.native_currency_symbol.toUpperCase()}</div>
																	<LowHighChip Value={data['floor_price_30d_percentage_change']['native_currency']} />

																</div>

																{/* 30D % Change Native Currency USD*/}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>30D % Change in USD</div>
																	<LowHighChip Value={data['floor_price_30d_percentage_change']['usd']} />

																</div>

																{/* 60D % Change Native Currency*/}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>60D % Change {data.native_currency_symbol.toUpperCase()}</div>
																	<LowHighChip Value={data['floor_price_60d_percentage_change']['native_currency']} />

																</div>

																{/* 60D % Change  USD*/}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>60D % Change in USD</div>
																	<LowHighChip Value={data['floor_price_60d_percentage_change']['usd']} />

																</div>

																{/* 1y % Change */}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>1Yr. % Change {data.native_currency_symbol.toUpperCase()}</div>
																	<LowHighChip Value={data['floor_price_1y_percentage_change']['native_currency']} />

																</div>

																{/* 1yr % Change Native Currency USD*/}
																<div className="flex items-center gap-2 justify-between mb-2">
																	<div>1Yr. % Change in USD</div>
																	<LowHighChip Value={data['floor_price_1y_percentage_change']['usd']} />

																</div>

															</div>



														</div>

													</Tab>

													<Tab key={"NFTDescription"} title={"Description"}>
														{/* Description */}

														<div className="col-span-12">
															<div className="mb-2">
																<HrWithText Text={"Description"} />
															</div>

															<div className='[&>a]:text-primary'>
																{ToHTML(data.description)}
															</div>

														</div>

													</Tab>
												</Tabs>

											</div>
										</div>
									</div>

						}



					</CardBody>
				</Card>


			</TransitionDiv>
		)



	} catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While loading NFT Details section, an error occured !"}
		/>
	}

}