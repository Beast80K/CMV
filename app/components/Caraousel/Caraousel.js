'use client'

import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Button, Card, CardBody } from '@nextui-org/react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill, } from 'react-icons/bs';

const Caraousel = ({ Items }) => {
	const swiperRef = useRef();

	const [CurrentIndex, SetCurrentIndex] = useState(0)

	return (

		<div >

			<Swiper
				slidesPerView={1}
				spaceBetween={25}
				loop={false}
				keyboard={{
					enabled: true,
				}}


				modules={[Keyboard, Navigation, Pagination]}

				onBeforeInit={(swiper) => {
					swiperRef.current = swiper;
				}}
				onSlideChange={(swiper) => {
					SetCurrentIndex(swiper.realIndex);
				}}
				centeredSlides={true}
				speed={500}

			>
				{
					Items.map((v, i) => (

						<SwiperSlide className='mb-4' key={i}>
							<Card radius='md' shadow='md' className='text-tiny border border-secondary' >
								<CardBody >
									{v}
								</CardBody>
							</Card>
						</SwiperSlide>
					))
				}

			</Swiper>

			<div className='flex gap-4 items-center justify-center font-Noto'>

				<Button
					isDisabled={CurrentIndex === 0}
					title="Previous"
					aria-label="Previous Button"
					variant='light'
					color='primary'
					size='sm'
					isIconOnly={true}
					radius='full'
					onClick={() => swiperRef.current?.slidePrev()}><BsArrowLeftCircleFill size={18} /></Button>

				<div className='text-foreground'>

					{
						CurrentIndex + 1 + " / " + Items.length
					}
				</div>

				<Button variant='light' color='primary'
					title="Next"
					aria-label="Next Button"
					isDisabled={CurrentIndex + 1 === Items.length}
					size='sm' isIconOnly={true} radius='full' onClick={() => swiperRef.current?.slideNext()}>
					<BsArrowRightCircleFill size={18} /> </Button>
			</div>

		</div >






	)
}

export default Caraousel