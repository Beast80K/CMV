'use client'
import { Skeleton } from '@nextui-org/react'

const TabsSkeleton = ({ children }) => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex gap-4'>
				<Skeleton className="h-8 w-1/12 rounded-md bg-primary " />
				<Skeleton className="h-8 w-1/12 rounded-md" />
				<Skeleton className="h-8 w-1/12 rounded-md" />
				<Skeleton className="h-8 w-1/12 rounded-md" />
			</div>



			<div className='flex  flex-col gap-4 text-center'>
				<Skeleton className="h-8 w-12/12 rounded-md  " />
				<Skeleton className="h-8 w-9/12 rounded-md  " />
				<Skeleton className="h-8 w-6/12 rounded-md  " />
				<Skeleton className="h-8 w-4/12 rounded-md  " />
				<Skeleton className="h-8 w-10/12 rounded-md  " />
				{
					children
				}

				<Skeleton className="h-8 w-8/12 rounded-md  " />
				<Skeleton className="h-8 w-7/12 rounded-md  " />
				<Skeleton className="h-8 w-5/12 rounded-md  " />
				<Skeleton className="h-8 w-4/12 rounded-md  " />
				<Skeleton className="h-8 w-3/12 rounded-md  " />
				<Skeleton className="h-8 w-9/12 rounded-md  " />
				<Skeleton className="h-8 w-11/12 rounded-md  " />
				<Skeleton className="h-8 w-7/12 rounded-md  " />

			</div>




		</div>
	)
}

export default TabsSkeleton