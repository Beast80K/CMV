'use client'
import { Button, Card, CardBody, DateInput, Skeleton, Snippet, Spinner } from '@nextui-org/react'
import { forwardRef, memo, useMemo, useState } from 'react'
import { ZustandStore } from '@/app/store/store'
import { Fetcher } from '@/app/utils/Swr/Fetcher'
import { FaRegCopy } from 'react-icons/fa6'
import { BsCheckCircleFill, BsDownload, BsFillCheckCircleFill, BsFillXCircleFill, BsXCircleFill } from 'react-icons/bs'

import { useShallow } from 'zustand/react/shallow'
import CurrencyFormatter from '@/app/utils/Currency/CurrencyFormatter'

import useSWRMutation from 'swr/mutation'
import moment from 'moment/moment'


import dynamic from 'next/dynamic'
import { getLocalTimeZone, parseDate, today } from '@internationalized/date'

const MyTable = dynamic(() => import("@/app/components/MyTable/MyTable"))
const ComponentLevelError = dynamic(() => import("@/app/components/ComponentLevelError/ComponentLevelError"))
const ConfirmationBtnModal = dynamic(() => import("@/app/components/ConfirmationBtnModal/ConfirmationBtnModal"))
const HrWithText = dynamic(() => import("@/app/components/HrWithText/HrWithText"))
const SectionHeader = dynamic(() => import("@/app/components/SectionHeader/SectionHeader"))
const ColumnsSkeleton = dynamic(() => import("@/app/components/Skeletons/ColumnsSkeleton"))
const DataNotThere = dynamic(() => import("@/app/components/DataNotThere/DataNotThere"))
const TransitionDiv = dynamic(() => import("@/app/components/TransitionDiv/TransitionDiv"))



const CoinHistory = ({ CoinId, CoinName, CoinSymbol }) => {


	try {
		const [DateFrom, SetDateFrom] = useState(null)
		const DateIsValid = useMemo(() => DateFrom?.year && DateFrom?.day && DateFrom?.month ? true : false, [DateFrom])


		const { data, error, isMutating, trigger, reset } = useSWRMutation(DateIsValid ? '/api/coin_history?id=' + CoinId + "&date=" + `${DateFrom.day}-${DateFrom.month}-${DateFrom.year}` : null, Fetcher)

		const { StoreCurrency, StoreLocale } = ZustandStore(useShallow((state) => state))

		function MakeTableData() {

			return Object.keys(data['market_data']['current_price']).map((v, i) => (
				{
					name: v.toUpperCase(),
					"price": data['market_data']['current_price'][v] || null,
					"market_cap": data['market_data']['market_cap'][v] || null,
					"total_volume": data['market_data']['total_volume'][v] || null,
				}
			))
		}




		return (
			<TransitionDiv>
				<Card radius='sm' shadow='sm' >
					<CardBody>

						<SectionHeader
							SectionID={"HistoricalData"}
							SectionName={`${CoinName} (${CoinSymbol.toUpperCase()}) Historical Data`}
							InfoContentTitle={"Historical Data"}
							InfoContent={<ul className='list-disc'>
								<li className='ml-4'>Shows historical data (Price, Mkt. Cap etc.) a coin, data returned is at 00:00:00 UTC, for a given date.</li>
								<li className='ml-4'>Last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35)</li>
								<li className='ml-4'>Select date by clicking on it, will automatically set the date.</li>
								<li className='ml-4'>Navigate between Years using dropdown.</li>
								<li className='ml-4'>Navigate between Months using dropdown or arrows keys.</li>
								<li className='ml-4'>Previously fetched data is cleared automatically, when date is changed.</li>
							</ul>}
						/>

						<div className='flex mb-8 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>

							<DateInput
								size='sm'
								radius='sm'
								label={"From"}
								isRequired
								value={DateFrom} onChange={SetDateFrom}
								minValue={parseDate("2013-04-29")}
								maxValue={today(getLocalTimeZone())}
								className="max-w-xs"

								endContent={
									DateFrom ?
										<BsFillXCircleFill
											size={'16'}

											className="cursor-pointer hover:text-danger transition-all duration-300 ease-in-out"
											onClick={() => {
												SetDateFrom(null)
											}} />
										: <></>
								}

							/>


							<div className='flex md:flex-row items-center gap-4 flex-wrap'>

								<ConfirmationBtnModal
									BtnText={"Clear Results"}
									BtnClasses={{
										"title": `Click to Clear ${CoinName} Historical Data Results !`,
										"size": 'sm',
										"radius": 'sm',
										"variant": 'solid',
										"color": 'danger',
										"className": 'text-white font-bold',
										"isDisabled": isMutating || !data,
										"endContent": <BsXCircleFill aria-label='Click to Clear' />,
									}}
									Title={`clear historical data results of ${CoinName} ${DateIsValid ? `for ${moment(`${DateFrom.year}-${DateFrom.month}-${DateFrom.day}`).format("ddd, Do MMM YYYY")}` : ""}`}
									YesAction={() => {
										reset()
										SetDateFrom(null)
									}}
									ActionMsg={`By doing this you will clear historical data results of ${CoinName} ${DateIsValid ? `for ${moment(`${DateFrom.year}-${DateFrom.month}-${DateFrom.day}`).format("ddd, Do MMM YYYY")}` : ""}`}
								/>


								<ConfirmationBtnModal
									BtnText={isMutating ? "Fetching ..." : data ? "Fetched" : "Fetch"}
									BtnClasses={{
										"title": data ? `Fetched results of ${CoinName} !` : `Click to Fetch Historical data results of ${CoinName} !`,
										"size": 'sm',
										"radius": 'sm',
										"variant": 'solid',
										color: data ? 'success' : 'primary',

										className: `font-bold text-white`,

										"isDisabled": isMutating || !DateIsValid || data,
										endContent: data ? <BsCheckCircleFill /> : <BsDownload className={` ${data ? '' : "animate-bounce"}`} />,
										"isLoading": isMutating
									}}
									Title={`are you sure to get historical data results of ${CoinName} ${DateIsValid ? `for ${moment(`${DateFrom.year}-${DateFrom.month}-${DateFrom.day}`).format("ddd, Do MMM YYYY")}` : null}`}
									YesAction={() => { trigger() }}
									ActionMsg={``}
									YesActionColor={"danger"}
									NoActionColor={'success'}
								/>

							</div>

						</div>


						{
							isMutating
								?
								<div className=' mb-4'>
									<div className='flex justify-between gap-4 mb-4'>
										<Skeleton className='h-8 w-1/4 bg-primary rounded-md' />
										<Skeleton className='h-8 w-1/4 bg-primary rounded-md' />
									</div>
									<ColumnsSkeleton>
										<Spinner
											label={`Getting Coin History data for ${CoinName} (${CoinSymbol.toUpperCase()})`}
											color="primary" labelColor="primary" />
									</ColumnsSkeleton>
								</div>
								:

								error

									?
									error.response.status === 404

										?


										<DataNotThere
											Text={`${error?.response?.data ? error?.response?.data + ", " : null}Coin History data not available for ${CoinName} (${CoinSymbol.toUpperCase()}) !`}
										/>

										:

										<ComponentLevelError
											ErrorObj={error}
											Msg={`${error?.response?.data ? error?.response?.data + ", " : null}Error Occured while loading Coin History data for ${CoinName} (${CoinSymbol.toUpperCase()})`}
											Mutate={reset} />

									:
									data ?

										<div className='grid gap-4 grid-cols-12 mb-4'>
											<div className='sm:col-span-6 lg:col-span-3 col-span-12'>

												<div className='flex flex-col gap-4 text-tiny'>

													<HrWithText Text={"Basic Info."} />

													<div className='flex gap-2 flex-wrap justify-between items-center mb-4'>

														<div className='flex flex-wrap justify-between gap-4 '>
															<img
																src={data.image.large || data.image.small || data.image.thumb} alt={data.name}
																className=' rounded-full object-contain h-12 w-12'
															/>
															<div className='flex flex-col'>
																<h3 className='font-bold text-lg'>{data.localization[StoreLocale] || data.localization['en']} </h3>
																<h6 className=' text-sm'>{data.symbol.toUpperCase()}</h6>
															</div>
														</div>


													</div>
													<div >
														<div className='flex flex-wrap gap-2 items-center text-tiny'>
															Coin ID :
															<Snippet

																radius='sm'
																size='sm'
																copyIcon={<FaRegCopy size={12} />}
																checkIcon={<BsFillCheckCircleFill size={12} />}
																className='text-tiny bg-secondary text-primary'
																hideSymbol={true}
																color='primary'
																variant='flat'
																copyButtonProps={{
																	isIconOnly: true,
																	variant: 'flat',
																	color: 'secondary',
																}}

																tooltipProps={
																	{
																		showArrow: true,
																		size: "sm",
																		color: 'secondary',
																		className: 'text-foreground shadow-md',
																		content: "Copy Coin ID for " + data.name
																	}
																}


															>{data.id}</Snippet>
														</div>
													</div>


													<div className='flex flex-wrap gap-2 items-center'>
														Price  : {
															data.market_data?.current_price[StoreCurrency]
																?
																CurrencyFormatter(StoreLocale, StoreCurrency, data.market_data?.current_price[StoreCurrency])
																:
																<span className='text-danger'>Unavailable</span>
														}
													</div>
													<div className='flex flex-wrap gap-2 items-center'>
														Market Cap  : {
															data.market_data?.market_cap[StoreCurrency]
																?
																CurrencyFormatter(StoreLocale, StoreCurrency, data.market_data?.market_cap[StoreCurrency])
																:
																<span className='text-danger'>Unavailable</span>
														}
													</div>
													<div className='flex flex-wrap gap-2 items-center'>
														Total Volume  : {
															data.market_data?.total_volume[StoreCurrency]
																?
																CurrencyFormatter(StoreLocale, StoreCurrency, data.market_data?.total_volume[StoreCurrency])
																:
																<span className='text-danger'>Unavailable</span>
														}
													</div>
												</div>

											</div>


											<div className=' sm:col-span-6 lg:col-span-3 col-span-12'>
												<div className='mb-4'>

													<div className='mb-2 text-tiny'>
														<HrWithText Text={"Developer Data"} />
													</div>

													<div className='flex  items-center flex-wrap gap-4 text-tiny '>

														<div className='flex flex-wrap gap-2 items-center'>
															Forks  : {data.developer_data.forks || <span className='text-danger'>Unavailable</span>}
														</div>
														<div className='flex flex-wrap gap-2 items-center'>
															Stars : {data.developer_data.stars || <span className='text-danger'>Unavailable</span>}
														</div>
														<div className='flex flex-wrap gap-2 items-center'>
															Subscribers : {data.developer_data.subscribers || <span className='text-danger'>Unavailable</span>}
														</div>
														<div className='flex flex-wrap gap-2 items-center'>
															Total Issues : {data.developer_data.total_issues || <span className='text-danger'>Unavailable</span>}
														</div>
														<div className='flex flex-wrap gap-2 items-center'>
															Closed Issues : {data.developer_data.closed_issues || <span className='text-danger'>Unavailable</span>}
														</div>
														<div className='flex flex-wrap gap-2 items-center'>
															Pull Requests Merged : {data.developer_data.pull_requests_merged || <span className='text-danger'>Unavailable</span>}
														</div>
														<div className='flex flex-wrap gap-2 items-center'>
															Pull Request Contributors : {data.developer_data.pull_request_contributors || <span className='text-danger'>Unavailable</span>}
														</div>
														<div className='flex flex-wrap gap-2 items-center'>
															Code Additions 4 Weeks : {data.developer_data.code_additions_deletions_4_weeks.additions || <span className='text-danger'>Unavailable</span>}
														</div>
														<div className='flex flex-wrap gap-2 items-center'>
															Code Deletions 4 Weeks : {data.developer_data.code_additions_deletions_4_weeks.deletions || <span className='text-danger'>Unavailable</span>}

														</div>

														<div className='flex flex-wrap gap-2 items-center'>
															Commit Count 4 Weeks : {data.developer_data.commit_count_4_weeks || <span className='text-danger'>Unavailable</span>}
														</div>
													</div>
												</div>
											</div>

											<div className=' sm:col-span-6 lg:col-span-3 col-span-12'>


												<div className='mb-4'>

													<div className='mb-2 text-tiny'>

														<HrWithText Text={"Community Data"} />
													</div>
													<div className='flex  items-center flex-wrap gap-4 text-tiny'>

														<div className='flex flex-wrap gap-2 items-center'>
															Facebook Likes  : {data.community_data.facebook_likes || <span className='text-danger'>Unavailable</span>}
														</div>

														<div className='flex flex-wrap gap-2 items-center'>
															Twitter Followers  : {data.community_data.twitter_followers || <span className='text-danger'>Unavailable</span>}
														</div>
														<div className='flex flex-wrap gap-2 items-center'>
															Reddit Average Posts 48h  : {data.community_data.reddit_average_posts_48h || <span className='text-danger'>Unavailable</span>}
														</div>
														<div className='flex flex-wrap gap-2 items-center'>
															Reddit Average Comments 48h  : {data.community_data.reddit_average_comments_48h || <span className='text-danger'>Unavailable</span>}
														</div>

														<div className='flex flex-wrap gap-2 items-center'>
															Reddit Subscribers  : {data.community_data.reddit_subscribers || <span className='text-danger'>Unavailable</span>}
														</div>

														<div className='flex flex-wrap gap-2 items-center'>
															Reddit Accounts Active 48h  : {data.community_data.reddit_accounts_active_48h || <span className='text-danger'>Unavailable</span>}
														</div>
														<div className='flex flex-wrap gap-2 items-center'>
															Telegram Channel User Count  : {data.community_data.telegram_channel_user_count || <span className='text-danger'>Unavailable</span>}
														</div>

													</div>
												</div>

											</div>

											<div className=' sm:col-span-6 lg:col-span-3 col-span-12'>

												<div className='mb-4'>

													<div className='mb-2 text-tiny'>
														<HrWithText Text={"Public Interest Stats."} />
													</div>
													<div className='flex items-center flex-wrap gap-4 text-tiny'>

														<div className='flex flex-wrap gap-2 items-center'>
															Alexa Rank  : {data.public_interest_stats.alexa_rank || <span className='text-danger'>Unavailable</span>}
														</div>
														<div className='flex flex-wrap gap-2 items-center'>
															Bing Matches  : {data.public_interest_stats.bing_matches || <span className='text-danger'>Unavailable</span>}
														</div>
													</div>
												</div>

											</div>

											<div className='col-span-12'>


												<SectionHeader
													SectionID={"HistoricalPriceTable"}
													SectionName={`${CoinName} (${CoinSymbol.toUpperCase()}) Price, Market Cap. & Total Volume`}

												/>


												<MyTable
													Data={MakeTableData()}

													ColumnsList={[
														{
															headerName: "Sr. No.",
															field: "sr_no",
															maxWidth: 120,
															pinned: false
														},
														{
															headerName: "Name",
															field: "name",
															hide: false,
															pinned: false,

														},
														{
															headerName: "Price",
															field: "price",
															hide: false,
															pinned: false,
															cellRenderer: memo(function ({ data }) {
																return data.price ? CurrencyFormatter(StoreLocale, data.name, data.price) : "-"
															})
															,
														},
														{
															headerName: "Market Cap",
															field: "market_cap",
															hide: false,
															pinned: false,
															cellRenderer: memo(function ({ data }) {
																return data.market_cap ? CurrencyFormatter(StoreLocale, data.name, data.market_cap) : "-"
															})
															,
														},
														{
															headerName: "Total Volume",
															field: "total_volume",
															hide: false,
															pinned: false,
															cellRenderer: memo(function ({ data }) {
																return data.market_cap ? CurrencyFormatter(StoreLocale, data.name, data.total_volume) : "-"
															})
															,
														}
													]}


												/>
											</div>
										</div>

										:
										<div className="flex flex-col items-center gap-4 text-center">
											<img src='/images/History.svg' className='transform scaleX(-1) h-96 w-96'
												alt='History image'
											/>
											<div className='text-sm font-bold mb-4'>
												See Historical data for {CoinName} ({CoinSymbol.toUpperCase()}).
											</div>
										</div>


						}




					</CardBody>

				</Card>
			</TransitionDiv >
		)



	} catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While loading Coin History data, an error occured !"}
		/>
	}

}

export default CoinHistory