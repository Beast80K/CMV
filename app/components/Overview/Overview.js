'use client'
import { useState } from 'react'
import { Fetcher } from '@/app/utils/Swr/Fetcher'

import FetchingOptions from '@/app/utils/Swr/FetchingOptions'
import useSWR from 'swr'
import { Card, CardBody, Divider, Spinner } from '@nextui-org/react'
import { BsArrowClockwise } from 'react-icons/bs'
import { ZustandStore } from '@/app/store/store'
import CurrencyFormatter from '@/app/utils/Currency/CurrencyFormatter'
import ShortCurrency from '@/app/utils/Currency/ShortCurrency'


import { usePathname } from 'next/navigation'
import UnixToSimpleDate from '@/app/utils/DateTime/UnixToSimpleDate'
import { useShallow } from 'zustand/react/shallow'
import NumberFormat from '@/app/utils/Number/NumberFormat'



import dynamic from "next/dynamic";
const ComponentLevelError = dynamic(() => import("../ComponentLevelError/ComponentLevelError"));
const DataNotThere = dynamic(() => import('../DataNotThere/DataNotThere'));


import TransitionDiv from '../TransitionDiv/TransitionDiv'
import TableSkeleton from '../Skeletons/TableSkeleton'
import PieChartSkeleton from '../Skeletons/PieChartSkeleton'
import MyTable from '../MyTable/MyTable'
import PieChartGraph from '../Graphs/PieChartGraph'
import Status from './Status/Status'
import LowHighChip from '../LowHighChip/LowHighChip'
import SectionHeader from '../SectionHeader/SectionHeader'
import InfoPopup from '../InfoPopup/InfoPopup'
import Marquee from 'react-fast-marquee'
import GetCananicalURL from '@/app/utils/URL/GetCananicalURL'

const Overview = () => {


	try {

		const Global = useSWR('/api/global', Fetcher, { ...FetchingOptions('10min') })

		const GlobalDefi = useSWR('/api/globaldefi', Fetcher, { ...FetchingOptions('60min') })

		const { StoreCurrency, StoreLocale } = ZustandStore(useShallow((state) => state))


		const [Play, SetPlay] = useState(true)

		const HiddenOnPaths = [
			`${GetCananicalURL()}/about-us`,
			`${GetCananicalURL()}/attributions`,
			`${GetCananicalURL()}/contact-us`,
			`${GetCananicalURL()}/cookies-policy`,
			`${GetCananicalURL()}/disclaimer`,
			`${GetCananicalURL()}/faqs`,
			`${GetCananicalURL()}/licenses`,
			`${GetCananicalURL()}/privacy-policy`,
			`${GetCananicalURL()}/project-details`,
			`${GetCananicalURL()}/terms-of-service`,
			`${GetCananicalURL()}/terms-of-use`,

		]

		return HiddenOnPaths.includes(`${GetCananicalURL()}${usePathname()}`)
			?
			null
			:

			<TransitionDiv>
				{/* OVERVIEW */}

				<div className='flex gap-4 items-center mb-4 print:hidden bg-secondary p-2 rounded-md'>

					{/* MARQUEE */}
					<div className='overflow-x-auto w-full' onClick={() => { SetPlay(!Play) }}>

						<Marquee
							className='text-tiny cursor-pointer rounded-l-none rounded-r-md'
							autoFill={false}
							pauseOnHover={false}
							pauseOnClick={false}
							speed={75}
							play={Play}


						>
							{
								Global.isLoading

									?
									<div>Loading Market Overview data ...</div>
									:

									Global.error

										?
										<div className='flex flex-row flex-nowrap items-center gap-2 text-danger font-bold' >
											<div >
												Error Occured while Loading Market Overview data
											</div>

											<div onClick={Global.mutate} className=' cursor-pointer text-danger font-bold'>
												<BsArrowClockwise size={12} />
											</div>


										</div>
										:


										<div className='flex items-center flex-nowrap gap-4'>

											{/* MARKET OVERVIEW */}
											<div className='flex  items-center  text-primary font-bold'>
												Market Overview <InfoPopup
													ContentTitle={"Global cryptocurrency data"}
													Content={<ul className='list-disc'>
														<li className='ml-4'>Shows global cryptocurrency data like Market Cap, Total Volume, Active Coins etc..</li>
														<li className='ml-4'>Auto Updates in every 10 minutes.</li>
													</ul>} />
											</div>
											{/* MARKETS */}

											<div>
												<span><b>Markets</b> : {NumberFormat(StoreLocale, Global.data.markets)}</span>
											</div>


											{/* ACTIVE */}
											<div>
												<span><b>Active Cryptocurrencies: </b>{NumberFormat(StoreLocale, Global.data["active_cryptocurrencies"])}</span>
											</div>

											{/* UPCOIMG ICOS */}
											<div>
												<span><b>Upcoming ICOs : </b>{NumberFormat(StoreLocale, Global.data["upcoming_icos"])}</span>
											</div>

											{/* ONGOING ICOS */}

											<div>
												<span><b>Ongoing ICOs : </b>{NumberFormat(StoreLocale, Global.data["ongoing_icos"])}</span>
											</div>

											{/* ENDED ICOS */}

											<div>
												<span><b>Ended ICOs : </b>{NumberFormat(StoreLocale, Global.data["ended_icos"])}</span>
											</div>

											{/* TOTAL MARKET CAP */}
											<div>

												<div className='flex  items-center  flex-nowrap gap-2'>
													<div>

														<b>Total Market Cap : </b>

														{
															CurrencyFormatter(StoreLocale, StoreCurrency, Global.data["total_market_cap"][StoreCurrency])
														} ~ {ShortCurrency(StoreLocale, StoreCurrency, Global.data["total_market_cap"][StoreCurrency])}
													</div>
													<div className={`font-bold ${Global.data.market_cap_change_percentage_24h_usd < 0 ? "text-danger" : "text-success"}`}>

														<LowHighChip
															Value={Global.data.market_cap_change_percentage_24h_usd}

															Locale={StoreLocale}

														/>

													</div>
												</div>


											</div>

											{/* TOTAL MARKET CAP % */}
											<div className='flex  items-center  gap-2'>
												<span><b>Total Market Cap % : </b> </span>
												{
													Object.keys(Global.data["market_cap_percentage"]).map((v, i) => {
														return (
															<span key={i} ><b>{v.toUpperCase()} : </b> {Global.data["market_cap_percentage"][v].toFixed(2).toString() + "%"}</span>
														)
													})
												}

											</div>

											{/* TOTAL VOLUME */}
											<div>
												<span><b>Total Volume : </b> {CurrencyFormatter(StoreLocale, StoreCurrency, Global.data["total_volume"][StoreCurrency.toLowerCase()])} ~ {ShortCurrency(StoreLocale, StoreCurrency, Global.data["total_volume"][StoreCurrency.toLowerCase()])}</span>
											</div>
										</div>


							}

							<div className='mx-4 h-4'>
								<Divider orientation='vertical' />
							</div>

							{
								GlobalDefi.isLoading
									?
									<div>Loading Market DEFI Overview data ...</div>

									:
									GlobalDefi.error
										?
										<div className='flex flex-row flex-nowrap items-center gap-2 '>
											<div className='text-danger'>
												Error Occured while Loading Market DEFI Overview data
											</div>


											<div onClick={GlobalDefi.mutate} className=' cursor-pointer text-danger font-bold'>
												<BsArrowClockwise size={12} />
											</div>

										</div>

										:
										<div className='flex  items-center  flex-nowrap gap-4' onClick={() => { SetPlay(!Play) }}>
											<div className='flex  items-center  text-primary font-bold'>
												Market DEFI Overiview <InfoPopup
													ContentTitle={" Global Decentralized Finance(DEFI)"}
													Content={<ul className='list-disc'>
														<li className='ml-4'>Shows Cryptocurrency Global Decentralized Finance(DEFI) data.</li>

														<li className='ml-4'>Auto Updates in every 60 minutes.</li>
													</ul>} />
											</div>
											<div>
												<span><b>DEFI Market Cap</b> : {CurrencyFormatter(StoreLocale, 'USD', GlobalDefi.data.defi_market_cap)} ~ {ShortCurrency(StoreLocale, 'USD', GlobalDefi.data.defi_market_cap)}</span>
											</div>
											<div>
												<span><b>ETH Market Cap</b> : {CurrencyFormatter(StoreLocale, 'USD', GlobalDefi.data.eth_market_cap)} ~ {ShortCurrency(StoreLocale, 'USD', GlobalDefi.data.eth_market_cap)}

												</span>
											</div>
											<div>
												<span><b>DEFI to ETH Ratio</b> : {parseFloat(GlobalDefi.data.defi_to_eth_ratio).toFixed(18)}</span>
											</div>
											<div>
												<span><b>Trading Volume 24 Hours</b> : {CurrencyFormatter(StoreLocale, 'USD', GlobalDefi.data.trading_volume_24h)} ~ {ShortCurrency(StoreLocale, 'USD', GlobalDefi.data.trading_volume_24h)}</span>
											</div>
											<div>
												<span><b>DEFI Dominance</b> : {parseFloat(GlobalDefi.data.defi_dominance).toFixed(18)}</span>
											</div>
											<div>
												<span><b>Top Coin Name</b> : {GlobalDefi.data.top_coin_name}</span>
											</div>
											<div>
												<span><b>Top Coin DEFI Dominance</b> : {GlobalDefi.data.top_coin_defi_dominance}</span>
											</div>
										</div>


							}
							<div className='mx-4 h-4'>
								<Divider orientation='vertical' />
							</div>

						</Marquee>
					</div>



					<Status />

				</div>

				{
					usePathname() !== '/' ?

						null

						:

						<Card radius='sm' shadow='sm' className='mb-4'>
							<CardBody>
								{
									Global.isLoading
										?
										<div className='text-center mb-8'>
											<SectionHeader
												SectionName={"Cryptocurrency Global Data"}
												InfoContentTitle={"Cryptocurrency Global Data"}
												InfoContent={<ul className='list-disc'>
													<li className='ml-4'>Shows Cryptocurrency Global Data.</li>
													<li className='ml-4'>Auto Updates in every 10 minutes.</li>

												</ul>}
											/>
											<div className='grid grid-cols-12 gap-4'>

												<div className='col-span-12 lg:col-span-6 mb-4'>

													<PieChartSkeleton>
														<Spinner label={"Getting Cryptocurrency Global Data ..."} color="primary" labelColor="primary" />
													</PieChartSkeleton>
												</div>

												<div className='col-span-12 lg:col-span-6 mb-4'>

													<TableSkeleton>
														<Spinner label={"Getting Cryptocurrency Global Data ..."} color="primary" labelColor="primary" />
													</TableSkeleton>
												</div>


											</div>
										</div>
										:
										Global.error
											?
											<ComponentLevelError
												Msg={"While loading Cryptocurrency Global Data section, an error occured !"}
												ErrorObj={Global.error}
												Mutate={Global.mutate} />
											:

											Global.data

												?
												<div className='grid grid-cols-12 gap-4'>

													{/* PIE CHART SECTION */}
													<div className='col-span-12 lg:col-span-6'>
														<SectionHeader
															SectionID={"GlobalMarketCapPercentage"}
															SectionName={"Global Market Cap Percentage"}
															InfoContentTitle={"Global Market Cap Percentage"}
															InfoContent={<ul className='list-disc'>
																<li className='ml-4'>Global Market Cap Percentage.</li>
																<li className='ml-4'>Auto Updates in every 10 minutes.</li>
																<li className='ml-4'>Last Updated : {UnixToSimpleDate(Global.data.updated_at)}</li>
															</ul>}
														/>


														<PieChartGraph
															Height={500}
															ChartName={["Global Market Cap Percentage", UnixToSimpleDate(Global.data.updated_at)]}
															Data={Global.data.market_cap_percentage}
														/>


													</div>

													{/* TOTAL MARKET CAP & VOLUME */}
													<div className='col-span-12 lg:col-span-6'>

														<SectionHeader
															SectionID={"GlobalTotalMarketCapandVolume"}
															SectionName={"Global Total Market Cap & Total Volume"}
															InfoContentTitle={"Global Total Market Cap & Total Volume"}
															InfoContent={<ul className='list-disc'>
																<li className='ml-4'>Shows Global Total Market Cap & Total Volume.</li>
																<li className='ml-4'>Auto Updates in every 10 minutes.</li>
																<li className='ml-4'>Last Updated : {UnixToSimpleDate(Global.data.updated_at)}</li>
															</ul>}
														/>


														<MyTable
															DisableLimit={true}

															Data={Object.keys(Global.data.total_market_cap).map((v, i) => (
																{
																	"name": v.toUpperCase(),
																	"total_market_cap": CurrencyFormatter(StoreLocale, v, Global.data.total_market_cap[v]) || "-",
																	"total_volume": CurrencyFormatter(StoreLocale, v, Global.data.total_volume[v]) || "-",
																}
															))}

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
																	pinned: false
																},
																{
																	headerName: "Total Market Cap",
																	field: "total_market_cap",
																	hide: false,
																	pinned: false
																},
																{
																	headerName: "Total Volume",
																	field: "total_volume",
																	hide: false,
																	pinned: false
																}
															]}

														/>
													</div>
												</div>
												:

												<DataNotThere
													Text={"No Data Available"}
												/>
								}

							</CardBody>
						</Card>


				}
			</TransitionDiv>



	} catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While loading Overview Data, an error occured !"}
		/>
	}
}

export default Overview