'use client'
import dynamic from 'next/dynamic';
import { ZustandStore } from '@/app/store/store';
import CurrencyFormatter from '@/app/utils/Currency/CurrencyFormatter';
import { Autocomplete, AutocompleteItem, Chip, Input, Snippet } from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { BsCheckCircleFill, BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

import { FaRegCopy } from 'react-icons/fa6';
import { useShallow } from 'zustand/react/shallow'
const ComponentLevelError = dynamic(() => import("../../ComponentLevelError/ComponentLevelError"))

import { find } from 'lodash';



const BTCtoConverter = ({ Data }) => {

	try {


		const { StoreCurrency, StoreLocale } = ZustandStore(useShallow((state) => state))

		const [Quantity, SetQuantity] = useState(1.0)
		const [SelectedCurrency, SetSelectedCurrency] = useState(StoreCurrency.toUpperCase())
		const Calculate = useMemo(() => {
			return SelectedCurrency
				?
				CurrencyFormatter(StoreLocale, SelectedCurrency, find(Data, { 'Symbol': SelectedCurrency })['Value'] * Quantity * find(Data, { 'Symbol': "BTC" })['Value'])
				:
				0

		}, [Quantity, SelectedCurrency])


		return (

			<div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mb-4 items-center'>


					<Input
						isRequired
						size='sm'
						radius='sm'
						placeholder='Enter Quantity in BTC'
						className='text-foreground text-tiny transition ease-in-out duration-500 rounded-lg  md:max-w-full'
						endContent={<BsXCircleFill aria-label='Click to Clear' className='text-danger' />}
						fullWidth={false}
						type='number'
						isClearable={true}
						label="Enter Quantity in BTC"
						aria-label='Enter Quantity in BTC'
						defaultValue={1.0}
						value={Quantity}
						onClear={() => { SetQuantity(1.0) }}
						onChange={(e) => { SetQuantity(Number(e.target.value)) }}
					/>

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
						defaultItems={Object.keys(Data)}
						selectedKey={SelectedCurrency}
						onSelectionChange={SetSelectedCurrency}
					>
						{
							Data.map(({ Name, Symbol, Type, Unit, Value }) => (

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
										<div>{CurrencyFormatter(StoreLocale, Symbol.toLowerCase(), Value)}</div>
										<Chip size='sm' radius='sm' variant='flat' className='text-tiny' color="primary">{Type}</Chip>
									</div>

								</AutocompleteItem>
							))
						}

					</Autocomplete>

					{
						SelectedCurrency
							?

							<div className='text-tiny'>1 BTC in {SelectedCurrency.toUpperCase()} = {CurrencyFormatter(StoreLocale, SelectedCurrency, find(Data, { 'Symbol': SelectedCurrency })['Value'])}</div>

							:
							null
					}
					{
						SelectedCurrency
							?
							<Snippet radius='sm'
								size='sm'
								aria-label={`Copy converted BTC to ${SelectedCurrency.toUpperCase()} value ${Calculate}`}
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
										content: `Copy converted BTC to ${SelectedCurrency.toUpperCase()} value ${Calculate}`,
										color: 'secondary',
										className: 'text-foreground shadow-md',
									}
								} >
								<div>
									Copy BTC to {SelectedCurrency.toUpperCase()}
								</div>
							</Snippet>
							:
							null
					}



				</div>
				<div className='text-tiny'>


					{
						SelectedCurrency
							?
							<div>

								<div className='text-4xl font-bold'>

									<div >
										{
											Calculate
										}

									</div>

								</div>
							</div>
							:
							<div className='flex flex-col gap-4 align-middle '>
								<div className='text-tiny text-danger font-bold'>
									Please select a currency !
								</div>
							</div>
					}


				</div>
			</div >
		)
	} catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While loading BTC to Currency Converter, an error occured !"}
		/>
	}
}

export default BTCtoConverter