'use client'

import { memo, useMemo, useState } from 'react'
import { ZustandStore } from '@/app/store/store'


import useSWR from 'swr'
import { Fetcher } from '@/app/utils/Swr/Fetcher'
import { CalendarDate, getLocalTimeZone, isEqualDay, isEqualMonth, isEqualYear, parseDate, today } from "@internationalized/date"

import { useShallow } from 'zustand/react/shallow'
import FetchingOptions from '@/app/utils/Swr/FetchingOptions'
import {
	Button, ButtonGroup, Card, CardBody, DateInput, Dropdown,
	DropdownItem, DropdownMenu, DropdownTrigger,
	Modal,
	ModalBody, ModalContent, ModalFooter, ModalHeader,
	Spinner,
	useDisclosure,
} from '@nextui-org/react'
import moment from 'moment'

import { BsArrowLeft, BsArrowRight, BsCalendar2RangeFill, BsFillXCircleFill, BsXCircleFill } from 'react-icons/bs'


import dynamic from 'next/dynamic';

const ComponentLevelError = dynamic(() => import("@/app/components/ComponentLevelError/ComponentLevelError"))
const DateTimeXAxis = dynamic(() => import("@/app/components/Graphs/DateTimeXAxis"))
const DataNotThere = dynamic(() => import("@/app/components/DataNotThere/DataNotThere"))

import TransitionDiv from '@/app/components/TransitionDiv/TransitionDiv';
import ChartSkeleton from '@/app/components/Skeletons/ChartSkeleton';
import SectionHeader from '@/app/components/SectionHeader/SectionHeader';

import '@/app/components/styles/DatePickerCustomStyle.css'
import { FaRegCalendarAlt } from 'react-icons/fa';

const MarketChart = ({ CoinId, CoinName, CoinSymbol }) => {

	try {
		const { StoreCurrency } = ZustandStore(useShallow((state) => state))

		const DaysList = [
			{
				value: "1", label: "1 Day", desc: "Last 1 Day"
			},
			{
				value: "7", label: "7 Days", desc: "Last 7 Days"
			},
			{
				value: "14", label: "14 Days", desc: "Last 14 Days"
			},
			{
				value: "30", label: "30 Days", desc: "Last 30 Days"
			},
			{
				value: "90", label: "90 Days", desc: "Last 90 Days"
			},
			{
				value: "180", label: "180 Days", desc: "Last 180 Days"
			},
			{
				value: "365", label: "1 Year", desc: "Last 1Yr"
			},
			{
				value: "max", label: "Max", desc: "Max. available data"
			},
		]
		const [Days, SetDays] = useState(new Set(["1"]))

		const OptionList = [
			{
				value: "prices", label: "Prices"
			},
			{
				value: "market_caps", label: "Market Cap"
			},

		]
		const [Option, SetOption] = useState('prices')

		const [From, SetFrom] = useState(null);
		const [To, SetTo] = useState(null);

		const [DateRange, SetDateRange] = useState({
			From: null,
			To: null,
		})
		const { isOpen, onOpen, onOpenChange } = useDisclosure();


		const DateIsValid = useMemo(() => {
			if (From && To) {
				return isEqualYear(new CalendarDate(From.year, From.month, From.day),
					new CalendarDate(To.year, To.month, To.day))
					&&
					isEqualMonth(new CalendarDate(From.year, From.month, From.day),
						new CalendarDate(To.year, To.month, To.day))
					&&
					isEqualDay(new CalendarDate(From.year, From.month, From.day),
						new CalendarDate(To.year, To.month, To.day))

					?
					false
					:
					true
			}
			else {
				return false
			}

		}, [From, To])



		const { data, error, isLoading, mutate } = useSWR(
			DateRange.From && DateRange.To ?
				`/api/coin_marketchart_range?id=${CoinId}&from=${moment(`${DateRange.From.year}-${DateRange.From.month}-${DateRange.From.day}`).unix()}&to=${moment(`${DateRange.To.year}-${DateRange.To.month}-${DateRange.To.day}`).unix()}&currency=${StoreCurrency}`
				:
				`/api/coin_marketchart?id=${CoinId}&days=${Array.from(Days)[0]}&currency=${StoreCurrency}`,
			Fetcher,
			{ ...FetchingOptions("45sec") }
		)


		return (
			<TransitionDiv>
				<Card radius='sm' shadow='sm' >
					<CardBody>
						<SectionHeader
							SectionID={"MarketChart"}
							SectionName={`${CoinName} (${CoinSymbol.toUpperCase()}) Market Chart `}
							InfoContentTitle={"Market Chart"}
							InfoContent={<ul className='list-disc'>
								<li className='ml-4'>Shows historical data (Price, Mkt. Cap etc.) for a given date for a coin.</li>
								<li className='ml-4'>Data granularity is 1 day - 5 Min., 2-90 days - 1 Hr. , 91 days above - Daily.</li>
								<li className='ml-4'>Auto Updates every 5 minutes.</li>
								<li className='ml-4'>Last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35)</li>
							</ul>}
						/>
						<div className='flex flex-col items-start sm:items-center sm:flex-row sm:justify-between mb-2'>

							<ButtonGroup
								aria-label="Select Days options dropdown Button"
								className='mb-2'
								size='sm' radius='sm' >
								{OptionList.map((v, i) => (
									<Button
										key={v.value}
										className={`${Option === v.value ? "bg-primary text-white" : "text-foreground"}`}
										isDisabled={isLoading}
										aria-label={v.label}
										onClick={() => { SetOption(v.value) }}
									>
										{v.label}
									</Button>
								))}
							</ButtonGroup>
							<div className='flex flex-col sm:flex-row gap-2 justify-between sm:items-center'>
								<div>

									<div className='flex gap-2 items-center'>

										<div className='text-tiny font-bold'>
											Duration :
										</div>

										<Dropdown >
											<DropdownTrigger>
												<Button
													isDisabled={DateIsValid || isLoading}
													variant="flat"
													color='primary'
													size='sm'
													radius='sm'
													title="Select Days options"
													aria-label="Select Days options dropdown Button"
												>
													{DaysList[DaysList.findIndex(f => f.value === Array.from(Days)[0])]['label']}
												</Button>
											</DropdownTrigger>
											<DropdownMenu
												aria-label="Select Days for OHLC Chart"
												variant="flat"
												color='primary'
												disallowEmptySelection
												selectionMode="single"
												selectedKeys={Days}
												onSelectionChange={SetDays}

												className='max-h-52 overflow-auto'

											>
												{DaysList.map((v, i) => (
													<DropdownItem
														className={`transition ease-in-out duration-500 ${Days.has(v.value) ? ' text-primary font-bold ' : 'text-foreground'}`}
														textValue={v.label}
														description={v.desc}
														key={v.value}>
														{Days.has(v.value) ? <b>{v.label}</b> : v.label}
													</DropdownItem>

												))}

											</DropdownMenu>
										</Dropdown>
									</div>
								</div>

								<div className='text-tiny font-bold'>
									OR
								</div>

								<div className='flex gap-1 items-center'>




									<Button onClick={() => {
										SetFrom(DateRange.From)
										SetTo(DateRange.To)
										onOpen()

									}}
										size="sm"
										color="primary"
										variant={"flat"}
										isDisabled={isLoading}
										aria-label='From-To Range'
									>
										{DateRange.From && DateRange.To ? `${moment(`${DateRange.From.year}-${DateRange.From.month}-${DateRange.From.day}`).format("ddd, Do MMM YYYY")} to ${moment(`${DateRange.To.year}-${DateRange.To.month}-${DateRange.To.day}`).format("ddd, Do MMM YYYY")}` : "Select Range"}

									</Button>

									<Button onClick={() => {
										SetFrom(null)
										SetTo(null)
										SetDateRange({ From: null, To: null })
									}}
										size="sm"
										color="danger"
										variant={"flat"}
										radius='sm'
										isIconOnly={true}
										isDisabled={isLoading || !DateIsValid}
										title='Clear '
										aria-label='Clear Button'
									><BsXCircleFill aria-label='Click to Clear' /></Button>


									<Modal
										isDismissable={false}
										isOpen={isOpen}
										onOpenChange={onOpenChange}
										backdrop='blur'
										radius='sm'
										shadow='sm'

										isKeyboardDismissDisabled={true}
										hideCloseButton={true}
										placement='center'
										scrollBehavior='inside'

										size='sm'
									>
										<ModalContent >
											{(onClose) => (
												<>
													<ModalHeader className="flex gap-4 items-center"><BsCalendar2RangeFill size='18' /> Select Range</ModalHeader>
													<ModalBody className="text-tiny flex flex-col gap-4">
														<DateInput
															label={"From"}
															isRequired
															value={From} onChange={SetFrom}
															minValue={parseDate("2013-04-29")}
															maxValue={today(getLocalTimeZone()).subtract({ days: 1 })}
															className="max-w-xs"
															startContent={<FaRegCalendarAlt />}
															endContent={
																From ?
																	<BsFillXCircleFill
																		size={'16'}
																		className="cursor-pointer hover:text-danger transition-all duration-300 ease-in-out"
																		onClick={() => {
																			SetFrom(null)
																			SetTo(null)
																		}} />
																	: <></>
															}

														/>

														<DateInput

															label={"To"}
															isRequired
															minValue={From ? new CalendarDate(From.year, From.month, From.day).add({ days: 1 }) : null}
															isDisabled={!From}
															value={To} onChange={SetTo}
															maxValue={today(getLocalTimeZone())}
															className="max-w-xs"
															startContent={<FaRegCalendarAlt />}
															endContent={
																To ?
																	<BsFillXCircleFill
																		size={'16'}
																		className="cursor-pointer hover:text-danger transition-all duration-300 ease-in-out"
																		onClick={() => {
																			SetTo(null)
																		}} />
																	: <></>
															}
														/>

														<div className='italic'>
															{DateIsValid ? `${moment(`${From.year}-${From.month}-${From.day}`).format("ddd, Do MMM YYYY")} to ${moment(`${To.year}-${To.month}-${To.day}`).format("ddd, Do MMM YYYY")}` : "From-To"}

														</div>
													</ModalBody>
													<ModalFooter
														className="flex justify-center gap-8">
														<Button
															variant="flat"
															color="danger"
															onClick={onClose}
															startContent={<BsArrowLeft />}
															aria-label='Back Button'
															title='Back'
														>
															Back
														</Button>

														<Button
															variant="flat"
															color="success"
															isDisabled={!DateIsValid}
															onClick={() => {
																onClose()
																SetDateRange({ From, To })
															}}
															endContent={<BsArrowRight />}
															title='Done'
															aria-label='Done Button'
														>
															Done
														</Button>
													</ModalFooter>
												</>
											)}
										</ModalContent>
									</Modal>





								</div>


							</div>
						</div>

						{
							isLoading
								?
								<ChartSkeleton>
									<Spinner label={`Getting Market Chart data for ${CoinName} (${CoinSymbol.toUpperCase()})`} color="primary" labelColor="primary" />
								</ChartSkeleton>
								:
								error
									?

									error.response.status === 404
										?
										<DataNotThere
											Text={`${error?.response?.data ? error?.response?.data + ", " : null}Coin Market Chart data not available for ${CoinName} (${CoinSymbol.toUpperCase()}) !`}
										/>
										:
										<ComponentLevelError ErrorObj={error}
											Msg={`${error?.response?.data ? error?.response?.data + ", " : null}Error Occured while loading Market Chart data for ${CoinName} (${CoinSymbol.toUpperCase()})`}
											Mutate={mutate} />

									:
									data
										?

										<div>

											<DateTimeXAxis
												Group={'CoinMarketChart'}

												Chart1Name={`${CoinName} (${CoinSymbol.toUpperCase()})`}
												Chart2Name={`${CoinName} (${CoinSymbol.toUpperCase()}) Total Volume`}
												SeriesName={Option === "prices" ? "Prices" : "Market Cap"}
												data={data[Option]}
												totalVolumes={data['total_volumes']}
												Currency1={StoreCurrency}
												Currency2={StoreCurrency}
											/>
										</div>
										:
										<DataNotThere Text={`No data available for ${CoinName} (${CoinSymbol.toUpperCase()}) for duration 
															${DateIsValid ? `${moment(`${From.year}-${From.month}-${From.day}`).format("ddd, Do MMM YYYY")} to ${moment(`${To.year}-${To.month}-${To.day}`).format("ddd, Do MMM YYYY")}` : DaysList[DaysList.findIndex(f => f.value === Array.from(Days)[0])]['label']}
										
										`} />
						}




					</CardBody>
				</Card>
			</TransitionDiv>
		)

	} catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While loading Market Chart data, an error occured !"}
		/>
	}
}

export default memo(MarketChart)