'use client'
import { Skeleton } from '@nextui-org/react'

const TableSkeleton = ({ children }) => {
	return (
		<div className='flex flex-col gap-4 mb-4'>
			<div className='flex gap-2 items-center justify-between'>
				<Skeleton className="h-8 w-3/12 rounded-md" />
				<Skeleton className="h-8 w-3/12 rounded-md bg-primary" />
			</div>

			<Skeleton className="w-full rounded-md ">
				<div className="h-8 w-full rounded-md "></div>
			</Skeleton>
			{
				children
			}


			{
				[...Array(10).keys()].map((v, i) => (
					<Skeleton key={i} className="w-full rounded-md ">
						<div className="h-8 w-full rounded-md "></div>
					</Skeleton>
				))
			}

			<div className='flex justify-center items-center gap-2'>
				{
					[...Array(8).keys()].map((v, i) => (
						<Skeleton key={i} className=" w-12 h-8 rounded-md" />
					))
				}
			</div>

		</div>
	)
}

export default TableSkeleton