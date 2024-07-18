'use client'
import { Link } from '@nextui-org/react'

import dynamic from "next/dynamic"
const TransitionDiv = dynamic(() => import("@/app/components/TransitionDiv/TransitionDiv"))


const Attributions = () => {
	const AttributionsList = [

		{
			Name: "CoinGecko Public API",
			HomePg: "https://www.coingecko.com/api/documentation",
			Text: `CoinGecko has provided Public API, through which all cryptocurrency data is fetched in this website.`,

		},

		{
			Name: "Pixels Market",
			HomePg: "https://pixels.market/",
			Text: "Illustrations from Pixels Market were used in this website by making minor modifications.",

		},
		{
			Name: "Noto Sans",
			HomePg: "https://fonts.google.com/noto",
			Text: "Noto Sans Font is used in this website.",
		},
		{
			Name: "Font Awesome Free Icons",
			HomePg: "https://fontawesome.com/",
			Text: "Few Font Awesome icons are used in this website.",


		},

		{
			Name: "Bootstrap Icons",
			HomePg: "https://icons.getbootstrap.com/",
			Text: "Few Bootstrap icons are used in this website.",


		},
		{
			Name: "Material Design Icons",
			HomePg: "https://developers.google.com/fonts/docs/material_icons",
			Text: "Few Material Design icons are used in this website.",


		},

	]
	return (
		<TransitionDiv >

			<div className='grid grid-cols-12 gap-8 mb-8 text-foreground p-8'>
				<div className=' col-span-12'>
					<div className='mb-8'>
						<div className='flex flex-col gap-4 text-center'>

							<h1
								className='text-4xl md:text-8xl text-primary font-Noto font-bold'
							>
								Attributions
							</h1>

							<div className='font-medium text-sm md:text-md flex flex-col gap-2'>
								<div>We are deeply appreciative, thankful & grateful of your act of providing for all these resources free of charge, your generosity, goodwill & kindness, has made this project possible.</div>

							</div>

						</div>
					</div>

				</div>
				<div className="col-span-12 mb-4">
					<div className="flex justify-center">
						<img src='/images/Attribution.svg' className="h-96 w-96" alt='Attribution image' />
					</div>
				</div>








				{
					AttributionsList.map((v, i) => (
						<div key={i} className='col-span-12 md:col-span-4'>


							<Link
								className="text-lg font-bold mb-2"
								href={v.HomePg}
								isExternal={true}
								showAnchorIcon={true}
							>{v.Name}</Link>

							<div className="flex gap-4 flex-col text-small">
								{v.Text}
							</div>
						</div>
					))
				}

			</div>
		</TransitionDiv>
	)
}

export default Attributions