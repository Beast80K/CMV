'use client'
import { Fetcher } from '@/app/utils/Swr/Fetcher'

import useSWR from 'swr'
import FetchingOptions from '@/app/utils/Swr/FetchingOptions'
import Capitalized from '@/app/utils/Text/Capitalized'
import ToHTML from '@/app/utils/ToHTML/ToHTML'
import { ZustandStore } from '@/app/store/store'
import { useShallow } from 'zustand/react/shallow'

import { FaCircleCheck, FaTriangleExclamation } from 'react-icons/fa6'
import { Card, CardBody, Skeleton, Spinner, Tab, Tabs, User } from '@nextui-org/react'
import CurrencyFormatter from '@/app/utils/Currency/CurrencyFormatter'
import SimpleDateTime from '@/app/utils/DateTime/SimpleDateTime'


import dynamic from 'next/dynamic'
const DataNotThere = dynamic(() => import("../../DataNotThere/DataNotThere"))
const ComponentLevelError = dynamic(() => import("../../ComponentLevelError/ComponentLevelError"))
const ExchangeMarkets = dynamic(() => import("./ExchangeMarkets/ExchangeMarkets"))
const ExchangeMarketChart = dynamic(() => import("./ExchangeMarketChart/ExchangeMarketChart"))
const HrWithText = dynamic(() => import("../../HrWithText/HrWithText"))
const Caraousel = dynamic(() => import("../../Caraousel/Caraousel"))


import SectionHeader from '../../SectionHeader/SectionHeader'
import TransitionDiv from '../../TransitionDiv/TransitionDiv'
import ChartSkeleton from '../../Skeletons/ChartSkeleton'
import TableSkeleton from '../../Skeletons/TableSkeleton'
import TabsSkeleton from '../../Skeletons/TabsSkeleton'
import ExternalLink from '../../ExternalLink/ExternalLink'

const ExchangeDetails = ({ ExchangeID }) => {
	try {
		const { StoreLocale } = ZustandStore(useShallow((state) => state))

		const { data, error, isLoading, mutate } = useSWR('/api/exchange_id?id=' + ExchangeID, Fetcher, { ...FetchingOptions('60sec') })


		return (
			<TransitionDiv>
				{
					isLoading
						?
						<div className='flex flex-col gap-4'>

							<Card radius='sm' shadow='sm' >
								<CardBody>
									<SectionHeader
										SectionName={`Exchange Details`}
										SectionID={"ExchangeDetails"}
										InfoContentTitle={"Exchange Details"}
										InfoContent={<ul className='list-disc'>
											<li className='ml-4'>Shows Exchange details.</li>
											<li className='ml-4'>Auto Updates in every 60 seconds.</li>
										</ul>}
									/>
									<div className='grid grid-cols-12 gap-4 text-tiny'>
										<div className='col-span-12 lg:col-span-4 xl:col-span-3 text-center'>



											<div className='flex flex-col gap-4 text-center'>
												<Skeleton className="h-8 w-12/12 rounded-md  " />
												<Skeleton className="h-8 w-9/12 rounded-md  " />
												<Skeleton className="h-8 w-10/12 rounded-md  " />
												<Skeleton className="h-8 w-5/12 rounded-md  " />
												<Skeleton className="h-8 w-6/12 rounded-md  " />
												<Skeleton className="h-8 w-11/12 rounded-md  " />

												<Spinner label={`Getting Exchange details for Exchange ID : ${ExchangeID}`} color="primary" labelColor="primary" />

												<Skeleton className="h-8 w-9/12 rounded-md  " />
												<Skeleton className="h-8 w-12/12 rounded-md  " />
												<Skeleton className="h-8 w-8/12 rounded-md  " />
												<Skeleton className="h-8 w-7/12 rounded-md  " />
												<Skeleton className="h-8 w-10/12 rounded-md  " />
												<Skeleton className="h-8 w-10/12 rounded-md  " />

											</div>
										</div>

										<div className='col-span-12 lg:col-span-8 xl:col-span-9'>
											<TabsSkeleton />
										</div>


									</div>
								</CardBody>
							</Card>

							<Card radius='sm' shadow='sm' >
								<CardBody>

									<SectionHeader
										SectionID={"ExchangeMarkets"}
										SectionName={`Markets`}
										InfoContentTitle={`Markets`}
										InfoContent={<ul className='list-disc'>
											<li className='ml-4'>Shows Exchange Tickers data.</li>
											<li className='ml-4'>Auto Updates in every 60 seconds.</li>
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

									<TableSkeleton>

										<Spinner label={`Getting Markets details for Exchange ID : ${ExchangeID}`} color="primary" labelColor="primary" />
									</TableSkeleton>

								</CardBody>
							</Card>


							<Card radius='sm' shadow='sm' >
								<CardBody>
									<SectionHeader
										SectionID={"ExchangeTradeVolChart"}
										SectionName={`Trade Volume Chart`}
										InfoContentTitle={`$Trade Volume Chart`}
										InfoContent={<ul className='list-disc'>
											<li className='ml-4'>Shows 24 hour rolling trading volume data (in BTC) for a given exchange. Data granularity is 1 day - 10 Min., 2-90 days - Hourly, 91 days above - Daily.</li>
											<li className='ml-4'>Auto updates Frequency: every 60 seconds.</li>
										</ul>}
									/>

									<ChartSkeleton>
										<Spinner label={`Getting Exchange Trade Volume Chart data for ${ExchangeID}`} color="primary" labelColor="primary" />
									</ChartSkeleton>


								</CardBody>
							</Card>

						</div>

						:
						error
							?
							error.response.status === 404
								?
								<DataNotThere
									Text={`${error?.response?.data ? error?.response?.data + " " : null}Exchange Details data not available for Exchange ID : ${ExchangeID}`}
								/>
								:
								<ComponentLevelError ErrorObj={error} Msg={error?.response?.data || "Error Occured while getting Exchange Details"} Mutate={mutate} />
							:
							<div className='flex flex-col gap-4'>

								<Card radius='sm' shadow='sm'>
									<CardBody>
										<div>
											<head>
												<title>
													{
														data.name + " | " + "Exchange Details"
													}
												</title>
											</head>
											<div className='grid grid-cols-12 gap-4 text-tiny'>
												<div className='col-span-12 lg:col-span-4 xl:col-span-3'>

													{/* INFO BUTTON */}

													<div className='mb-2'>
														<SectionHeader
															SectionID={'ExchangeDetails'}
															SectionName={`${data.name}`}
															InfoContentTitle={"Exchange Details"}
															InfoContent={<ul className='list-disc'>
																<li className='ml-4'>Shows Exchange details.</li>
																<li className='ml-4'>Auto Updates in every 60 seconds.</li>

															</ul>}
														/>
													</div>

													{/* IMAGE NAME SYMBOL */}
													<div className='flex gap-2 flex-col mb-4'>

														<div className='flex flex-row flex-wrap justify-start gap-2'>
															<img
																src={data.image || null} alt={data.name}
																className=' rounded-full object-contain h-12 w-12'
															/>
															<div className='flex flex-col'>
																<h3 className='font-bold text-lg'>{
																	data.name
																} </h3>
															</div>

														</div>
													</div>

													<div className="mb-2">
														<HrWithText Text={"Info."} />
													</div>

													{/* Country */}
													<div className="flex items-center gap-2 justify-between mb-2">
														<div>
															Country
														</div>
														<div>
															{data.country ? data.country : <span className='text-danger'>Unavailable</span>}
														</div>
													</div>
													{/* Year Established */}
													<div className="flex items-center gap-2 justify-between mb-2">
														<div>
															Year Established
														</div>
														<div>
															{data.year_established ? data.year_established : <span className='text-danger'>Unavailable</span>}
														</div>
													</div>
													{/* Trust Score */}
													<div className="flex items-center gap-2 justify-between mb-2">
														<div>
															Trust Score
														</div>
														<div>
															{data.trust_score ? data.trust_score : <span className='text-danger'>Unavailable</span>
															}
														</div>
													</div>

													{/* Trust Score  Rank*/}
													<div className="flex items-center gap-2 justify-between mb-2">
														<div>
															Trust Score Rank
														</div>
														<div>
															{data.trust_score_rank ? data.trust_score_rank : <span className='text-danger'>Unavailable</span>
															}
														</div>
													</div>

													{/*  Trade Volume 24Hr. BTC */}
													<div className="flex items-center gap-2 justify-between mb-2">
														<div>
															Trade Volume 24Hr. BTC
														</div>
														<div>

															{data.trade_volume_24h_btc ? CurrencyFormatter(StoreLocale, 'btc', data.trade_volume_24h_btc) : <span className='text-danger'>Unavailable</span>
															}
														</div>
													</div>

													{/*  Trade Volume 24Hr. BTC  Normalized*/}
													<div className="flex items-center gap-2 justify-between mb-2">
														<div>
															Trade Volume 24Hr. BTC Normalized
														</div>
														<div>
															{data.trade_volume_24h_btc_normalized ? CurrencyFormatter(StoreLocale, 'btc', data.trade_volume_24h_btc_normalized) : <span className='text-danger'>Unavailable</span>
															}
														</div>
													</div>

													{/* Facebook */}
													<div className="flex items-center gap-2 justify-between mb-2">
														<div>
															Facebook
														</div>
														<div>
															{data.facebook_url ?

																<ExternalLink ExternalLink={data.facebook_url} />
																: <span className='text-danger'>Unavailable</span>}
														</div>
													</div>
													{/* Reddit */}
													<div className="flex items-center gap-2 justify-between mb-2">
														<div>
															Reddit
														</div>
														<div>
															{data.reddit_url ?

																<ExternalLink ExternalLink={data.reddit_url} />

																: <span className='text-danger'>Unavailable</span>}
														</div>
													</div>



													{/* Slack */}
													<div className="flex items-center gap-2 justify-between mb-2">
														<div>
															Slack
														</div>
														<div>
															{data.slack_url ?

																<ExternalLink ExternalLink={data.slack_url} />

																: <span className='text-danger'>Unavailable</span>}
														</div>
													</div>

													{/* Telegram */}
													<div className="flex items-center gap-2 justify-between mb-2">
														<div>
															Telegram
														</div>
														<div>
															{data.telegram_url ?

																<ExternalLink ExternalLink={data.telegram_url} />

																: <span className='text-danger'>Unavailable</span>}
														</div>
													</div>
													{/* Twitter Handle */}
													<div className="flex items-center gap-2 justify-between mb-2">
														<div>
															Twitter Handle
														</div>
														<div>
															{data.twitter_handle ?

																<ExternalLink ExternalLink={`https://twitter.com/${data.twitter_handle}`} />

																: <span className='text-danger'>Unavailable</span>}
														</div>
													</div>

													{/* Other URLs */}
													<div className="flex flex-col gap-2  mb-2">
														<div>
															<HrWithText Text={"Other URLs"} />
														</div>

														<div className='flex gap-2'>

															{data.other_url_1 ?
																<div>


																	<ExternalLink ExternalLink={data.other_url_1} />

																</div>
																: null}




															{data.other_url_2 ?
																<div>


																	<ExternalLink ExternalLink={data.other_url_2} />

																</div>
																: null}
														</div>
													</div>


													{/* Has Trading Incentive */}
													<div className="flex items-center gap-2 justify-between mb-2">
														<div>
															Has Trading Incentive
														</div>
														<div>
															{
																typeof (data.has_trading_incentive) === 'boolean' ? Capitalized(data.has_trading_incentive.toString()) : "Unavailable"
															}
														</div>
													</div>
													{/* Centralized */}
													<div className="flex items-center gap-2 justify-between mb-2">
														<div>
															Centralized
														</div>
														<div>

															{
																typeof (data.has_trading_incentive) === 'boolean' ? Capitalized(data.centralized.toString()) : "Unavailable"
															}
														</div>
													</div>

													{/* Public Notice */}
													<div className='flex flex-col gap-2'>

														<div className='flex flex-col gap-2'>
															<HrWithText Text={"Public Notice"} />

															{
																data.public_notice ?

																	<div className='[&>a]:text-primary p-4 bg-warning/25 rounded-md'>


																		{ToHTML(data.public_notice)}



																	</div>
																	:
																	<div>-</div>
															}
														</div>
														{/* Alert Notices */}
														<div className='flex flex-col gap-2'>

															<HrWithText Text={"Alert Notice"} />

															{
																data.alert_notice ?

																	<div className='[&>a]:text-primary p-4 bg-warning/25 rounded-md'>


																		{ToHTML(data.alert_notice)}



																	</div>
																	:
																	<div>-</div>
															}
														</div>
													</div>

													{/* STATUS */}
													<div className=''>

														<div className='mb-2'>
															<HrWithText Text={"Status Updates"} />
														</div>

														<div >
															{
																data.status_updates.length > 0 ?
																	<Caraousel
																		Items={[...data.status_updates.map((s, i) => (


																			<div key={i} className='p-4 flex items-start flex-col gap-4'>


																				<div className='font-bold text-tiny'>{SimpleDateTime(s.created_at)}</div>



																				<User
																					name={s.project.name}
																					description={(s.project.id).toUpperCase()}
																					avatarProps={{
																						src: s.project.image.large || s.project.image.small || s.project.image.thumb
																					}}

																				/>

																				<div>{s.description}</div>

																				<div className='flex flex-wrap  gap-4'>

																					<div>
																						<span className='font-bold'>Category : </span>


																						{
																							s.category || <span className='text-danger'>Unavailable</span>
																						}
																					</div>

																					<div><span className='font-bold'>Project Type : </span>{s.project?.type || <span className='text-danger'>Unavailable</span>}


																					</div>
																					<div><span className='font-bold'>Project ID : </span>{s.project?.id || <span className='text-danger'>Unavailable</span>}</div>
																				</div>

																				{
																					s.user && s.user_title ?

																						<User
																							name={s.user}
																							description={s.user_title}
																						/>
																						:
																						null
																				}



																			</div>


																		))]}
																	/>
																	:

																	<div className="text-danger">Unavailable</div>
															}
														</div>



													</div>

												</div>

												<div className='col-span-12 lg:col-span-8 xl:col-span-9'>
													<Tabs
														radius='sm'
														variant='solid'
														color='primary'
														classNames={{
															tabList: "bg-secondary",
															tabContent: "group-data-[selected=true]:text-secondary group-data-[selected=true]:font-bold"
														}}
														aria-label="Exchange Details"
													>
														<Tab key={"ExchangeDescription"} title={"Description"}>
															{/* Description */}

															<div className="col-span-12">
																<div className="mb-2">
																	<HrWithText Text={"Description"} />
																</div>

																<div className='[&>a]:text-primary'>

																	{
																		data.description ?

																			ToHTML(data.description)
																			: <span className='text-danger'>Unavailable</span>

																	}

																</div>

															</div>
														</Tab>
													</Tabs>

												</div>




											</div>
										</div>
									</CardBody>
								</Card>

								<ExchangeMarkets
									ExchangeName={data.name}
									ExchangeID={ExchangeID}

								/>

								<ExchangeMarketChart
									ExchangeName={data.name}
									ExchangeID={ExchangeID}
								/>

							</div>

				}


			</TransitionDiv >
		)


	}
	catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While loading Exchange Details section, an error occured !"}
		/>
	}
}

export default ExchangeDetails