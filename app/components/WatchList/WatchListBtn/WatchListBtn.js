'use client'
import { ZustandStore } from '@/app/store/store'
import { Button } from '@nextui-org/react'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { useShallow } from 'zustand/react/shallow'


const WatchListBtn = ({ DataObj }) => {

	try {
		const { StoreWatchlistCoins, AddCoinToWatchlist, RemoveCoinFromWatchlist } = ZustandStore(useShallow((state) => state))

		return (
			<div>
				{
					StoreWatchlistCoins.find(f => f.id === DataObj.id)
						?
						<Button
							isIconOnly={true}
							size='md'
							radius='sm'
							color='warning'
							title={`Remove ${DataObj.name} from WatchList`}
							aria-label={`Remove ${DataObj.name} from WatchList`}
							ref={(ref) => {
								if (!ref) return;
								ref.onclick = (e) => {
									RemoveCoinFromWatchlist(DataObj.id)
									e.stopPropagation();
								};
							}}

							className='flex gap-2 items-center'
							variant='light'
						>
							<BsStarFill className='text-warning' size={16} />
						</Button>
						:

						<Button
							isIconOnly={true}
							size='md'
							radius='sm'
							color='warning'
							title={`Add ${DataObj.name} to WatchList`}
							aria-label={`Add ${DataObj.name} to WatchList`}

							ref={(ref) => {
								if (!ref) return;
								ref.onclick = (e) => {
									AddCoinToWatchlist({
										'id': DataObj.id,
										'name': DataObj.name,
										'symbol': DataObj.symbol,
										'thumb': DataObj.thumb,
										'small': DataObj.small,
										'large': DataObj.large,
										'image': DataObj.image,
										"market_cap_rank": DataObj.market_cap_rank,
									})
									e.stopPropagation();
								};
							}}
							variant='light'
							className='flex gap-2 items-center'

						>
							<BsStar className='text-warning' size={16} />
						</Button>
				}
			</div>
		)

	} catch (e) {
		return <Button
			isIconOnly={true}
			size='sm'
			radius='sm'
			color='danger'
			isDisabled={true}
			variant='light'
		>
			<BsStarFill size={16} />
		</Button>
	}

}

export default WatchListBtn