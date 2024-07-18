'use client'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { ZustandStore } from '@/app/store/store'

import useSWR from 'swr'
import { useShallow } from 'zustand/react/shallow'
import { Fetcher } from '@/app/utils/Swr/Fetcher'
import {
	Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Kbd, Snippet, Autocomplete, AutocompleteItem, Chip,
	Skeleton
} from '@nextui-org/react'
import { BsCheckCircleFill, BsChevronDown, BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs'
import { FaRegCopy } from 'react-icons/fa6'
import CurrencyFormatter from '@/app/utils/Currency/CurrencyFormatter'

import FetchingOptions from '@/app/utils/Swr/FetchingOptions'
import { find } from 'lodash'

const SectionHeader = dynamic(() => import("@/app/components/SectionHeader/SectionHeader"))
const TransitionDiv = dynamic(() => import("@/app/components/TransitionDiv/TransitionDiv"))
const ComponentLevelError = dynamic(() => import('@/app/components/ComponentLevelError/ComponentLevelError'))


const CoinConverter = ({ Prices, CoinName, CoinSymbol }) => {

	try {

		const { StoreCurrency, StoreLocale } = ZustandStore(useShallow((state) => state))

		const PricesList = useMemo(() => Object.keys(Prices).sort(), [Prices])

		const [Quantity, SetQuantity] = useState(1.0)
		const [SelectedCurrency, SetSelectedCurrency] = useState(StoreCurrency.toUpperCase())
		const [DrpDwn_SelectedCurrency, SetDrpDwn_SelectedCurrency] = useState(new Set([StoreCurrency || PricesList[0]]))
		const { data, error, isLoading, mutate } = useSWR('/api/exchange_rates',
			Fetcher,
			{ ...FetchingOptions('0sec') })

		const Calculate = useMemo(() => {

			return !isLoading && !error && data
				?
				SelectedCurrency
					?
					CurrencyFormatter(StoreLocale, SelectedCurrency, (Prices[SelectedCurrency.toLowerCase()] * Quantity))
					:
					null
				:
				Quantity
					? CurrencyFormatter(StoreLocale, Array.from(DrpDwn_SelectedCurrency)[0].toLowerCase(), (Prices[Array.from(DrpDwn_SelectedCurrency)[0].toLowerCase()] * Quantity))
					: null
		}, [Quantity, SelectedCurrency, DrpDwn_SelectedCurrency])

		return (
			<TransitionDiv>


				<SectionHeader
					SectionID={'CoinConverter'}
					SectionName={`${CoinName + " (" + CoinSymbol.toUpperCase() + ")"} Converter`}
					InfoContentTitle={"Coin Converter"}
					InfoContent={<ul className='list-disc'>
						<li className='ml-4'>Convert Cryptocurrency coin to any other currency</li>
						<li className='ml-4'>Add Quantity, Select currency from dropdown to convert to(you can also type to search desired currency & Hit  <Kbd keys={["enter"]}>Enter</Kbd> ).</li>
						<li className='ml-4'>
							<div className='flex items-center gap-2'>

								<div>Click to</div> <div><FaRegCopy className='text-primary' size={12} /></div><div>copy converted value.</div>
							</div>
						</li>
						<li className='ml-4'>Auto Updates in every 60 seconds.</li>

					</ul>}
				/>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mb-4'>

					<Input
						isDisabled={isLoading}
						isRequired
						size='sm'
						radius='sm'
						placeholder={`Enter Quantity in ${CoinName} ${CoinSymbol.toUpperCase()}`}
						className='text-foreground text-tiny transition ease-in-out duration-500 rounded-lg md:max-w-full '
						endContent={<BsXCircleFill aria-label='Click to Clear' className='text-danger' />}
						fullWidth={true}
						type='number'
						isClearable={true}
						label={`Enter Quantity in ${CoinName} ${CoinSymbol.toUpperCase()}`}
						aria-label={`Enter Quantity in ${CoinName} ${CoinSymbol.toUpperCase()}`}
						labelPlacement='inside'
						defaultValue={1}
						value={Quantity}
						onClear={() => { SetQuantity(1.0) }}
						onChange={(e) => { SetQuantity(Number(e.target.value)) }}
					/>

					{
						isLoading
							?
							<Skeleton className='h-4 w-full rounded-sm' />

							:
							data && !error
								?
								<div>

									<Autocomplete
										isRequired
										label="Select Currencies"
										placeholder="Type currency name"
										className="text-tiny md:max-w-full"
										isClearable={true}
										fullWidth={false}
										showScrollIndicators={true}
										endContent={<BsXCircleFill aria-label='Click to Clear' className='text-danger' />}

										onClear={() => { SetSelectedCurrency("") }}
										size='sm'
										inputMode='text'
										listboxProps={{
											color: "primary",
											variant: "flat",
											disallowEmptySelection: true
										}}

										popoverProps={{
											shouldCloseOnBlur: false,
											shadow: 'sm',
										}}
										defaultItems={Object.keys(data)}
										selectedKey={SelectedCurrency}
										onSelectionChange={SetSelectedCurrency}

									>
										{
											data.map(({ Name, Symbol, Type, Unit }) => (

												<AutocompleteItem
													key={Symbol}
													textValue={`${Name} ${Unit} ${Symbol}`}
													selectedIcon={
														SelectedCurrency === Symbol ? <BsCheckCircleFill size={16} /> : null
													}

													className={`transition ease-in-out duration-500 ${SelectedCurrency === Symbol ? ' text-primary font-bold' : 'text-foreground'}`}
												>
													<div className='text-tiny flex flex-col gap-2 '>
														<div>
															{SelectedCurrency === Symbol ? <b>{Name} ({Unit})</b> : <>{Name}{Symbol} ({Unit})</>}
														</div>
														<div>{CurrencyFormatter(StoreLocale, Symbol.toLowerCase(), Prices[Symbol.toLowerCase()])}</div>
														<Chip size='sm' radius='sm' variant='flat' className='text-tiny' color="primary">{Type}</Chip>
													</div>

												</AutocompleteItem>
											))
										}

									</Autocomplete>

								</div>
								:
								<div className='flex flex-row gap-4 items-center'>
									<div className='font-bold'>
										Select Currency :
									</div>
									<Dropdown >
										<DropdownTrigger>
											<Button
												size='sm'
												radius='sm'
												variant="light"
												title="Select Currency"
												aria-label="Select Currency Button"
												fullWidth={false}
												color='primary'
												className='max-w-xs'
												endContent={<BsChevronDown className='text-foreground' />}
											>
												{Array.from(DrpDwn_SelectedCurrency)[0].toUpperCase()}
											</Button>
										</DropdownTrigger>
										<DropdownMenu
											className='max-h-52 overflow-auto'

											variant="flat"
											color='primary'
											aria-label="Select Number of results per page"
											disallowEmptySelection
											selectionMode="single"
											selectedKeys={DrpDwn_SelectedCurrency}
											onSelectionChange={SetDrpDwn_SelectedCurrency}

										>


											{
												PricesList.map((l, i) => (
													<DropdownItem
														className={`transition ease-in-out duration-300 ${DrpDwn_SelectedCurrency.has(l) ? 'text-primary font-bold' : 'text-foreground'}`}
														selectedIcon={DrpDwn_SelectedCurrency.has(l) ? <BsCheckCircleFill size={16} /> : null}
														key={l}
														textValue={l.toUpperCase()}
														description={CurrencyFormatter(StoreLocale, l, Prices[l])}
													>
														{DrpDwn_SelectedCurrency.has(l) ? <b>{l.toUpperCase()}</b> : l.toUpperCase()}

													</DropdownItem>


												))
											}


										</DropdownMenu>
									</Dropdown>

								</div>

					}
					{
						isLoading
							?
							<Skeleton className='h-4 w-full rounded-sm' />
							:
							data && !error
								?
								<div>
									{
										SelectedCurrency
											?
											<div className='flex flex-row items-center justify-between flex-wrap gap-4'>
												<div className='text-tiny'>1 {CoinSymbol.toUpperCase()} in {SelectedCurrency.toUpperCase()} = {CurrencyFormatter(StoreLocale, SelectedCurrency, find(data, { 'Symbol': SelectedCurrency })['Value'])}</div>
												<Snippet radius='sm'
													size='sm'
													aria-label={`Copy converted ${CoinSymbol.toUpperCase()} to ${SelectedCurrency.toUpperCase()} value ${Calculate}`}
													copyIcon={<FaRegCopy size={12} />}
													color='secondary'
													variant='flat'
													checkIcon={<BsFillCheckCircleFill />}
													className='text-tiny text-primary'
													copyButtonProps={{
														isIconOnly: true,
														variant: 'flat',
														color: 'primary',
														fullWidth: false,
													}}
													hideSymbol={true}
													codeString={Calculate}
													tooltipProps={
														{
															showArrow: true,
															size: "sm",
															content: `Copy converted ${CoinSymbol.toUpperCase()} to ${SelectedCurrency.toUpperCase()} value ${Calculate}`,
															color: 'secondary',
															className: 'text-foreground shadow-md',
														}
													} >
													<div>
														Copy {CoinSymbol.toUpperCase()} to {SelectedCurrency.toUpperCase()}
													</div>
												</Snippet>

											</div>
											:
											<div className='text-tiny font-bold text-danger'>
												Please select a currency !
											</div>
									}

								</div>
								:
								<div>
									{
										DrpDwn_SelectedCurrency
											?
											<div className='flex flex-row items-center justify-between flex-wrap gap-4'>
												<div className='text-tiny'>1 {CoinSymbol.toUpperCase()} in {Array.from(DrpDwn_SelectedCurrency)[0].toUpperCase()} = {CurrencyFormatter(StoreLocale, Array.from(DrpDwn_SelectedCurrency)[0], Prices[Array.from(DrpDwn_SelectedCurrency)[0]])}</div>

												<Snippet radius='sm'
													size='sm'
													aria-label={`Copy converted ${CoinSymbol.toUpperCase()} to ${Array.from(DrpDwn_SelectedCurrency)[0].toUpperCase()} value ${Calculate}`}
													copyIcon={<FaRegCopy size={12} />}
													color='secondary'
													variant='flat'
													checkIcon={<BsFillCheckCircleFill />}
													className='text-tiny text-primary'
													copyButtonProps={{
														isIconOnly: true,
														variant: 'flat',
														color: 'primary',
														fullWidth: false
													}}
													hideSymbol={true}
													codeString={Calculate}
													tooltipProps={
														{
															showArrow: true,
															size: "sm",
															content: `Copy converted BTC to ${Array.from(DrpDwn_SelectedCurrency)[0].toUpperCase()} value ${Calculate}`,
															color: 'secondary',
															className: 'text-foreground shadow-md',
														}
													} >
													<div>
														Copy {CoinSymbol.toUpperCase()} to {Array.from(DrpDwn_SelectedCurrency)[0].toUpperCase()}
													</div>
												</Snippet>

											</div>
											:
											<div className='text-tiny font-bold text-danger'>
												Please select a currency !
											</div>
									}

								</div>
					}


					<h2 className='text-4xl font-bold '>
						{Calculate}
					</h2>


				</div>
			</TransitionDiv>
		)
	}
	catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: "CoinConverter" + e.toString() }}
			Msg={"While loading Coin Converter, an error occured !"}
		/>
	}

}

export default CoinConverter