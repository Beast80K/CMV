'use client'
import TabsSkeleton from './TabsSkeleton'
import { Skeleton } from '@nextui-org/react'

const DetailsCardSkeleton = ({ children }) => {
	return (
		<div className='grid grid-cols-12 gap-4 text-tiny'>
			<div className='col-span-12 lg:col-span-4 xl:col-span-3'>

				<div className='flex flex-col gap-4'>
					<div className='flex gap-2 items-center justify-between'>
						<Skeleton className="w-2/4 rounded-md bg-primary">
							<div className="h-8 w-1/4 rounded-md "></div>
						</Skeleton>
					</div>

					<div className="max-w-[300px] w-full flex items-center gap-3">
						<div>
							<Skeleton className="flex rounded-full w-12 h-12" />
						</div>
						<div className="w-full flex flex-col gap-2">
							<Skeleton className="h-4 w-3/4 rounded-md" />
							<Skeleton className="h-4 w-2/4 rounded-md" />
						</div>
					</div>

					<div
						className='mb-4 text-center'>
						{
							children
						}
					</div>

					<Skeleton className="w-3/4 rounded-md ">
						<div className="h-8 w-3/4 rounded-md "></div>
					</Skeleton>

					<Skeleton className="w-2/4 rounded-md ">
						<div className="h-8 w-2/4 rounded-md "></div>
					</Skeleton>

					<div className='flex  flex-col gap-4'>
						<Skeleton className="h-8 w-1/4 rounded-md  " />
						<Skeleton className="h-8 w-2/4 rounded-md  " />
						<Skeleton className="h-8 w-3/4 rounded-md  " />
						<Skeleton className="h-8 w-4/4 rounded-md  " />

						<Skeleton className="h-8 w-1/4 rounded-md  " />
						<Skeleton className="h-8 w-4/4 rounded-md  " />
						<Skeleton className="h-8 w-2/4 rounded-md  " />
						<Skeleton className="h-8 w-3/4 rounded-md  " />

					</div>






				</div>



			</div>
			<div className='col-span-12 lg:col-span-8 xl:col-span-9'>

				<TabsSkeleton />


			</div>
		</div>
	)
}

export default DetailsCardSkeleton