
import dynamic from 'next/dynamic'
import { BsExclamationCircle } from 'react-icons/bs'
const TransitionDiv = dynamic(() => import("../TransitionDiv/TransitionDiv"))

const DataNotThere = ({ Text }) => {
	return (
		<TransitionDiv>

			<div className="flex flex-col justify-center items-center align-middle mb-4">
				<img src='/images/NoData2.svg'
					alt='No Data image'
					className='mt-8 mb-8 h-96 w-96' />
				<div className='flex gap-2 font-bold items-center p-4 text-small text-danger bg-danger/10 rounded-md '>
					<BsExclamationCircle size={16} /> {Text || "Data not available !"}
				</div>
			</div>
		</TransitionDiv>
	)
}

export default DataNotThere