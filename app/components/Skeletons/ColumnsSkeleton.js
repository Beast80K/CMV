'use client'
import { Skeleton } from '@nextui-org/react'


const ColumnsSkeleton = ({ children }) => {
	return (

		<div className='flex flex-col gap-8 '>
			{children}

			<div className='grid grid-cols-12 gap-4'>

				{
					[...Array(4).keys()].map((v, i) => (
						<div className=' col-span-12 lg:col-span-3 '>

							<div className='flex flex-col gap-4'>

								<div className='flex gap-2 justify-between items-center'>
									<Skeleton className="h-8 w-1/4 rounded-md  " />
									<Skeleton className="h-8 w-4/4 rounded-md  " />

									<Skeleton className="h-8 w-3/4 rounded-md  " />
									<Skeleton className="h-8 w-1/4 rounded-md  " />

								</div>

								<div className='flex gap-2 justify-between items-center'>
									<Skeleton className="h-8 w-3/4 rounded-md  " />
									<Skeleton className="h-8 w-4/4 rounded-md  " />


								</div>
								<div className='flex gap-2 justify-between items-center'>
									<Skeleton className="h-8 w-4/4 rounded-md  " />
								</div>

								<div className='flex gap-2 justify-between items-center'>
									<Skeleton className="h-8 w-1/4 rounded-md  " />
									<Skeleton className="h-8 w-4/4 rounded-md  " />

								</div>

								<div className='flex gap-2 justify-between items-center'>
									<Skeleton className="h-8 w-2/4 rounded-md  " />
									<Skeleton className="h-8 w-4/4 rounded-md  " />
								</div>

								<div className='flex gap-2 justify-between items-center'>

									<Skeleton className="h-8 w-3/4 rounded-md  " />
									<Skeleton className="h-8 w-4/4 rounded-md  " />

								</div>




							</div>
						</div>

					))
				}
			</div>
		</div>
	)
}

export default ColumnsSkeleton