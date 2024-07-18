'use client'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaArrowUpLong } from 'react-icons/fa6'

const GoToTop = () => {
	const [ShowBtn, SetShowBtn] = useState(false);


	const scrollToTop = () => window.scrollTo({ top: 0 });

	useEffect(() => {
		window.addEventListener('scroll', () => SetShowBtn(window.scrollY > 800));
	}, []);


	return (

		<Button
			variant='solid'
			color='primary'
			size='md'
			className={`${ShowBtn ? 'visible animate-bounce' : 'hidden'} z-50 transition-transform duration-500 fixed right-5 bottom-5 shadow-lg text-white print:hidden`}

			radius='full'
			isIconOnly={true}
			onClick={scrollToTop}
		>
			<FaArrowUpLong className='' size={16} />
		</Button>


	)
}

export default GoToTop