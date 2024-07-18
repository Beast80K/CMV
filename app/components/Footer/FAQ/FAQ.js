'use client'
import { Accordion, AccordionItem } from '@nextui-org/react'


import dynamic from 'next/dynamic'
const TransitionDiv = dynamic(() => import("@/app/components/TransitionDiv/TransitionDiv"))


import Link from 'next/link'

const FAQ = () => {
	return (
		<TransitionDiv >
			<div className='flex flex-col gap-8 p-8'>

				<div className='grid grid-cols-12 gap-8 text-foreground '>
					<div className=' col-span-12'>
						<div >
							<div className='flex flex-col gap-4 text-center'>


								<h1 className='text-4xl md:text-8xl text-primary font-Noto font-bold '>
									FAQs
								</h1>
								<div className='font-medium text-sm md:text-md flex flex-col gap-2'>
									<div>Frequently Asked Questions, most commmonly asked questions.</div>
								</div>

							</div>
						</div>
					</div>
					<div className="col-span-12">
						<div className="flex justify-center">
							<img src='/images/FAQ.svg' className="h-96 w-96" alt='FAQ image' />
						</div>
					</div>

				</div>
				<div className=' flex flex-col gap-8 items-center justify-center'>


					<div className='w-full lg:w-8/12'>
						<div className='flex flex-col md:flex-row  gap-8 md:items-center justify-center'>
							<div className='flex flex-col gap-2 items-center'>

								<div className='text-primary font-bold text-3xl'>
									100+
								</div>
								<div className='text-md'>
									Queries Solved/ Hr.
								</div>
							</div>



							<div className='flex flex-col gap-2 items-center'>
								<div className='text-primary font-bold text-3xl'>
									1,000 +
								</div>
								<div className='text-md'>
									Experts to answer
								</div>
							</div>



						</div>

					</div>

				</div>

				<div className='grid grid-cols-12 gap-4 text-foreground'>
					<div className=' col-span-12 md:col-span-6'>
						<Accordion variant="splitted">
							<AccordionItem
								classNames={{ "title": "font-bold text-small", "content": "text-small" }}
								aria-label="Can't click on row ?" title="Can't click on row ?">
								Some table rows when clicked won't take you to details page, its normal behaviour & the clicked row will not change color.
							</AccordionItem>

							<AccordionItem
								classNames={{ "title": "font-bold text-small", "content": "text-small" }}
								aria-label="Details page not opening after clicking ?" title="Details page not opening after clicking ?">
								Double click to go on details page & the clicked row will change color a dialog box will ask for confirmation.
								Some table rows when clicked won't take you to details page, its normal behaviour & the clicked row will not change color.
							</AccordionItem>


							<AccordionItem
								classNames={{ "title": "font-bold text-small", "content": "text-small" }}
								aria-label="How accurate data is ?" title="How accurate data is ?">
								Data is as is provided by CoinGecko Public API. There might minor accuracy issues because of decimal rounding off from our side (this helps in showing % as 98.00% instead of 98.003421231136745%).

							</AccordionItem>

							<AccordionItem
								classNames={{ "title": "font-bold text-small", "content": "text-small" }}
								aria-label="How often data is updated ?"
								title="How often data is updated ?">

								Data is updated after certain interval depending on which data, update frequency is mentioned in the icon next to heading of respective sections.

							</AccordionItem>


							<AccordionItem
								classNames={{ "title": "font-bold text-small", "content": "text-small" }}
								aria-label="Are External links safe ?"
								title="Are External links safe ?">
								External links are not checked, monitored, validated. You may go on them on your risk.
								Before opening links you can hover mouse on them & see its destination.
								For more details, Please read our Terms of Use, Terms of Service, Disclaimer.

							</AccordionItem>

							<AccordionItem
								classNames={{ "title": "font-bold text-small", "content": "text-small" }}

								aria-label="How to contact CryptoMarketVision (CMV) ?"
								title="How to contact CryptoMarketVision (CMV) ?">
								You may contact us through Contact Us Page, it contains multiple Email Addresses, Phone Numbers & also a Contact form you may use any one option of these.

							</AccordionItem>

						</Accordion>
					</div>

					<div className=' col-span-12 md:col-span-6'>
						<Accordion variant="splitted" >

							<AccordionItem
								classNames={{ "title": "font-bold text-small", "content": "text-small" }}
								aria-label="What user data is collected ?" title="What user data is collected ?">
								We don't collect any kind of personal identifyable data,
								we only collect bare minimum data(IP Address, Geographic location, Time etc.) for providing  accurate services, protection of services etc.
							</AccordionItem>

							<AccordionItem
								classNames={{ "title": "font-bold text-small", "content": "text-small" }}

								aria-label="What is AMOLED option under themes settings ?"
								title="What is AMOLED option under themes settings ?">
								AMOLED option is for devices which have AMOLED display, this displays help in saving battery life when black color is present by turning off indivdual pixels.
							</AccordionItem>

							<AccordionItem
								classNames={{ "title": "font-bold text-small", "content": "text-small" }}

								aria-label="Does CryptoMarketVision (CMV) use Cookies?"
								title="Does CryptoMarketVision (CMV) use Cookies?">
								We don't use cookies but store data in local storage, and Visitors are identified by hash generated from incoming request. Generated hash is valid for a single day, it automatically gets reset.
							</AccordionItem>

							<AccordionItem
								classNames={{ "title": "font-bold text-small", "content": "text-small" }}

								aria-label="Does CryptoMarketVision (CMV) directly identifies every user ?"
								title="Does CryptoMarketVision (CMV) directly identifies every user ?">
								No.
							</AccordionItem>

							<AccordionItem
								classNames={{ "title": "font-bold text-small", "content": "text-small" }}

								aria-label="Does CryptoMarketVision (CMV) tracks user across websites ?"
								title="Does CryptoMarketVision (CMV) tracks user across websites ?">
								No.
							</AccordionItem>

							<AccordionItem
								classNames={{ "title": "font-bold text-small", "content": "text-small" }}

								aria-label="Does CryptoMarketVision (CMV) takes any liability ?"
								title="Does CryptoMarketVision (CMV) takes any liability ?">
								No.
							</AccordionItem>
						</Accordion>
					</div>


				</div>

				<div className='flex flex-col gap-2 text-foreground'>
					<div className='text-xl font-Noto font-bold mb-4'>

						Still doubts ?

					</div>
					<div className=' text-sm'>Please contact us through <Link className='text-primary' href='/contact-us#contactform'>Contact Form</Link> given in Contact Us page.</div>
					<div className=' text-sm'>
						You may also read Disclaimer, Privacy Policy, Terms Of Use, Terms Of Service, and Cookie Policy.
					</div>

				</div>
			</div>



		</TransitionDiv>
	)
}

export default FAQ