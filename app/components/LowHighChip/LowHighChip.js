'use client'

import CurrencyFormatter from '@/app/utils/Currency/CurrencyFormatter'
import InPercentage from '@/app/utils/Number/InPercentage'
import { Chip } from '@nextui-org/react'
import { FaArrowTrendDown, FaArrowTrendUp, } from 'react-icons/fa6'

const LowHighChip = ({ Size, Value, Currency, Locale, Precision }) => {
	return (
		Value !== undefined ?
			<Chip size={Size || 'sm'}
				variant='flat'
				color={Number(Value) < 0 ? "danger" : 'success'}
				classNames={{ content: 'font-bold' }}
				className={`font-bold ${Number(Value) < 0 ? "text-danger" : 'text-success'}`}
				startContent={Number(Value) < 0 ? <>-</> : Number(Value) === 0 ? null : <>+</>}
				radius='sm'
				endContent={Number(Value) < 0 ? <FaArrowTrendDown /> : <FaArrowTrendUp />}
				aria-label={
					Currency
						?
						CurrencyFormatter(Locale, Currency, Math.abs(Number(Value)))
						:
						InPercentage({ Value: Math.abs(Number(Value)), Precision })
				}
			>
				{
					Currency
						?
						CurrencyFormatter(Locale, Currency, Math.abs(Number(Value)))
						:
						InPercentage({ Value: Math.abs(Number(Value)), Precision })
				}


			</Chip>
			:
			<div className="text-danger text-tiny">
				Unavailable
			</div>
	)
}

export default LowHighChip