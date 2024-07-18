'use client'

import { Link } from '@nextui-org/react'


const Attribution = () => {
	return (
		<div>
			<div className='flex gap-1 items-center'>
				<img src="/images/CoinGeckoLogo.svg" alt="CoinGecko" className='h-8 w-8' />
				<div className='flex flex-col'>
					<div className='text-tiny font-Noto font-bold'>
						Powered by
					</div>

					<div className='flex gap-1 items-center'>


						<Link size="sm" className="text-primary text-tiny"
							aria-label='Coin Gecko dot com'
							isExternal={true}
							showAnchorIcon={true}
							href="https://www.coingecko.com">CoinGecko</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Attribution