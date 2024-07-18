'use client'
import { Skeleton } from '@nextui-org/react'

const ChartSkeleton = ({ children }) => {
	return (
		<div className='flex flex-col items-center gap-4'>
			<div className='flex w-full justify-between'>


				<Skeleton className="h-8 w-1/4 rounded-md" />
				<Skeleton className="h-8 w-1/4 rounded-md" />
			</div>

			<div className='flex w-full justify-between'>

				<Skeleton className="h-8 w-2/6 rounded-md" />
				<Skeleton className="h-8 w-2/6 rounded-md bg-primary/25" />

			</div>

			{children}
			<Skeleton className="flex rounded-md w-full h-96 " />

		</div>
	)
}

export default ChartSkeleton

