'use client'
import dynamic from 'next/dynamic'
const HrWithText = dynamic(() => import('../../HrWithText/HrWithText'))
const PrintToPDFBtn = dynamic(() => import('../../PrintToPDFBtn/PrintToPDFBtn'))

const TransitionDiv = dynamic(() => import("@/app/components/TransitionDiv/TransitionDiv"))


import Link from 'next/link'

const CookiePolicy = () => {

	return (

		<TransitionDiv >

			<PrintToPDFBtn PageName={'cookies-policy'} />

			<div className='text-tiny p-8 flex flex-col gap-4 text-foreground  print:text-black print:bg-white '>


				<div className='grid grid-cols-12 gap-4'>
					<div className=' col-span-12'>
						<div >
							<div className='flex flex-col gap-4 text-center'>


								<h1 className='text-4xl md:text-8xl text-primary font-Noto font-bold '>
									Cookies Policy
								</h1>

								<div className='font-medium text-sm md:text-md'>
									<div>CryptoMarketVision (CMV) shall not be hold responsible for anything. </div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-12">
						<div className="flex justify-center">
							<img src='/images/CookiePolicy.svg' className="h-96 w-96" alt='CookiePolicy image' />
						</div>
					</div>
				</div>

				<div className='flex flex-col md:flex-row md:justify-between gap-2 text-tiny'>
					<div><b>Created  On :</b>  Monday, 1st January 2024, 00:00:00 AM</div>
					<div><b>Last Updated :</b>  Monday, 1st January 2024, 00:00:00 AM</div>
				</div>

				<div>
					<div className='font-bold'>
						Welcome to CryptoMarketVision (CMV),
					</div>
					<div>
						This Cookie Policy, covers use of CryptoMarketVision (CMV) by visiting this website,
						you agree to these terms legally. We recommend that you read this Cookie Policy carefully.
						You may use CryptoMarketVision (CMV) only if you agree this Cookie Policy, Privacy Policy, Disclaimer, Terms Of Service,
						and Terms of Use.
						If you have still have any questions, please contact us through <Link className='text-primary' href='/contact-us#contactform'>Contact Form</Link> given on Contact Us page.
					</div>
				</div>
				<div>
					<div className='flex flex-col gap-4'>
						<div >
							<HrWithText Text={"Cookies We Use"} />
						</div>
						<div>
							We don't use cookies but store data in local storage, and Visitors are identified by hash generated from incoming request. Generated hash is valid for a single day, it automatically gets reset.						</div>

						<div >
							<HrWithText Text={"Functionality Cookies & Necessary / Essential Cookies"} />
						</div>
						<div>
							None, but we store data in Local Storage of browser, it gets cleared when user clears history along with website data & site settings. This data used to remember choices made by you when use this website, such as remembering your language preference, currency preference, theme preference. This helps us in providing more personal experience.
						</div>

						<div >
							<HrWithText Text={"Notice Acceptance Cookies"} />
						</div>
						<div>None, but we store data in Local Storage of browser, it gets cleared when user clears history along with website data & site settings. This data used to remember choices made by you when use this website, such as remembering your language preference, currency preference, theme preference. This helps us in providing more personal experience. Next time when a Visitor arrives Notice will be shown automatically</div>
					</div>
				</div>

			</div>

		</TransitionDiv>



	)
}

export default CookiePolicy