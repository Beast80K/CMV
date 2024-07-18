'use client'
import { Skeleton } from '@nextui-org/react'

const PieChartSkeleton = ({ children }) => {
	return (
		<div className='flex flex-col items-center gap-4'>
			<div className="w-full flex  justify-between gap-2">
				<Skeleton className="h-8 w-1/4 rounded-md" />
				<Skeleton className="h-8 w-1/4 rounded-md bg-primary/25" />

			</div>

			<div className="w-full flex justify-between gap-4">
				<Skeleton className="h-8 w-1/4 rounded-md " />
				<Skeleton className="h-8 w-1/4 rounded-md bg-primary/25" />
			</div>

			{children}
			<Skeleton className="flex rounded-full w-80 h-80 bg-primary/25 " />


			<div className="w-full flex flex-col gap-4">
				<Skeleton className="h-8 w-4/4 rounded-md" />
				<Skeleton className="h-8 w-4/4 rounded-md" />
				<Skeleton className="h-8 w-4/4 rounded-md " />
			</div>
		</div>
	)
}

export default PieChartSkeleton