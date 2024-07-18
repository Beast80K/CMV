'use client'
import { Card, CardBody, Spinner, User } from '@nextui-org/react'
import { memo } from 'react'
import { Fetcher } from '@/app/utils/Swr/Fetcher'
import CurrencyFormatter from '@/app/utils/Currency/CurrencyFormatter'
import { ZustandStore } from '@/app/store/store'
import NumberFormat from '@/app/utils/Number/NumberFormat'
import { useShallow } from 'zustand/react/shallow'
import useSWRMutation from 'swr/mutation'
import { BsCheckCircleFill, BsDownload } from 'react-icons/bs'


import dynamic from 'next/dynamic'
import TransitionDiv from '@/app/components/TransitionDiv/TransitionDiv'
import SectionHeader from '@/app/components/SectionHeader/SectionHeader'
import TableSkeleton from '@/app/components/Skeletons/TableSkeleton'

const MyTable = dynamic(() => import("@/app/components/MyTable/MyTable"))
const ConfirmationBtnModal = dynamic(() => import("@/app/components/ConfirmationBtnModal/ConfirmationBtnModal"))
const HrWithText = dynamic(() => import("@/app/components/HrWithText/HrWithText"))
const DataNotThere = dynamic(() => import("@/app/components/DataNotThere/DataNotThere"))
const ComponentLevelError = dynamic(() => import("@/app/components/ComponentLevelError/ComponentLevelError"))



const PublicTreasury = ({ CoinId, CoinName, CoinSymbol }) => {

	try {

		const { data, error, isMutating, trigger, reset } = useSWRMutation('/api/public_treasury?coin_id=' + CoinId, Fetcher)

		// NOTHING MENTIONED ABOUT CACHE HENCE 30 MIN, 

		const { StoreCurrency, StoreLocale } = ZustandStore(useShallow((state) => state))


		return (

			<TransitionDiv>

				<Card radius='sm' shadow='sm'>

					<CardBody >

						<SectionHeader
							SectionID={"PublicTreasury"}

							SectionName={`${CoinName} (${CoinSymbol.toUpperCase()}) Public Treasury`}
							InfoContentTitle={"Public Treasury"}
							InfoContent={<ul className='list-disc'>
								<li className='ml-4'>Shows public companies bitcoin or ethereum holdings (Ordered by total holdings descending) for a coin.</li>
							</ul>}
						/>

						<div className='flex justify-start sm:justify-end mb-4'>

							<ConfirmationBtnModal
								BtnText={isMutating ? "Fetching ..." : data ? "Fetched" : "Fetch"}
								BtnClasses={{
									title: `Click to Fetch Public Treasury data results for ${CoinName} (${CoinSymbol.toUpperCase()}) !`,
									size: 'sm',
									radius: 'sm',
									variant: 'solid',
									color: data ? 'success' : 'primary',
									className: `font-bold text-white`,
									isDisabled: isMutating || data,
									endContent: data ? <BsCheckCircleFill /> : <BsDownload className={` ${data ? '' : "animate-bounce"}`} />,
									isLoading: isMutating
								}}
								Title={`are you sure to get Public Treasury data for ${CoinName})} (${CoinSymbol.toUpperCase()})`}
								YesAction={trigger}
								ActionMsg={``}
								YesActionColor={"danger"}
								NoActionColor={'success'}
							/>

						</div>

						{
							isMutating
								?
								<div>
									<TableSkeleton>
										<Spinner label={"Getting Public Treasury data ..."} color="primary" labelColor="primary" />
									</TableSkeleton>

								</div>
								:
								error

									?
									error.response.status === 404
										?
										<DataNotThere

											Text={`${error?.response?.data ? error?.response?.data + ", " : null} Public Treasury data not available for ${CoinName} (${CoinSymbol.toUpperCase()})`}
										/>
										:
										<ComponentLevelError ErrorObj={error}

											Msg={`${error?.response?.data ? error?.response?.data + ", " : null}Error Occured while loading Public Treasury data for ${CoinName} (${CoinSymbol.toUpperCase()})`}

											Mutate={reset} />

									:
									data
										?


										<div>

											<div className='mb-4'>

												<div className='mb-4 text-sm'>
													<HrWithText Text={"Other holdings data"} />
												</div>

												<div className='flex flex-row gap-8 text-tiny mb-4'>

													<div>
														<b>Total Holdings :</b> {
															data.total_holdings ?
																NumberFormat(StoreLocale, data.total_holdings)
																:
																<span className='text-danger'>Unavailable</span>
														}
													</div>
													<div>
														<b>Total Value USD :</b> {
															data.total_value_usd ?
																CurrencyFormatter(StoreLocale, StoreCurrency, data.total_value_usd)
																:
																<span className='text-danger'>Unavailable</span>
														}
													</div>


													<div>
														<b>Market Cap Dominance :</b> {
															data.market_cap_dominance
																?
																data.market_cap_dominance.toFixed(2) + " %"
																:
																<span className='text-danger'>Unavailable</span>
														}
													</div>
												</div>
											</div>

											<MyTable
												Data={data.companies}
												ColumnsList={[
													{
														headerName: "Sr. No.",
														field: "sr_no",
														maxWidth: 120,
														pinned: 'left',
													},
													{
														headerName: "Name",
														field: "name",
														hide: false,
														cellRenderer: memo(({ data }) => <User
															name={data.name}
															description={data.symbol.toUpperCase()}
															avatarProps={{
																src: null
															}}
														/>),
														pinned: 'left',

													},

													{
														headerName: "Country",
														field: "country",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value || "-"
														}
													},
													{
														headerName: "Total Holdings",
														field: "total_holdings",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? NumberFormat(StoreLocale, Number(value)) : "-"
														}
													},
													{
														headerName: "Total Entry Value in USD",
														field: "total_entry_value_usd",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? CurrencyFormatter(StoreLocale, 'usd', Number(value)) : "-"
														}
													},
													{
														headerName: "Total Current Value in USD",
														field: "total_current_value_usd",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? CurrencyFormatter(StoreLocale, 'usd', Number(value)) : "-"
														}
													},
													{
														headerName: "% Of Total Supply",
														field: "percentage_of_total_supply",
														hide: false,
														pinned: false,
														valueFormatter: ({ value }) => {
															return value ? `${value.toFixed(4)}%` : "-"
														}
													}
												]}


											/>
										</div>
										:
										<div
											className="flex flex-col items-center gap-4 text-center"

										>
											<img src='/images/PublicTreasury.svg'
												alt='Public Treasury image'
												className='m-8 transform scaleX(-1) h-96 w-96' />
											<div className='text-sm font-bold mb-4'>
												Public Treasury data for {CoinName} ({CoinSymbol.toUpperCase()}).
											</div>
										</div>
						}

					</CardBody>
				</Card>
			</TransitionDiv>
		)
	}
	catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While loading Public Treasury data, an error occured !"}
		/>
	}



}

export default PublicTreasury