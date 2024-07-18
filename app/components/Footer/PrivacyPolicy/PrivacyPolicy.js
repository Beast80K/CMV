'use client'

import dynamic from 'next/dynamic'
const HrWithText = dynamic(() => import('../../HrWithText/HrWithText'))
const TransitionDiv = dynamic(() => import('../../TransitionDiv/TransitionDiv'))
const PrintToPDFBtn = dynamic(() => import('../../PrintToPDFBtn/PrintToPDFBtn'))


import Link from 'next/link'

const PrivacyPolicy = () => {
	return (
		<TransitionDiv>
			<PrintToPDFBtn PageName={'privacy-policy'} />


			<div className='text-tiny text-foreground flex flex-col gap-4 print:text-black print:bg-white p-8'>


				<div className='grid grid-cols-12 gap-8'>
					<div className='col-span-12'>
						<div >
							<div className='flex flex-col gap-4 text-center'>


								<h1 className='text-4xl md:text-8xl text-primary font-Noto font-bold '>
									Privacy Policy
								</h1>

								<div className='font-medium text-sm md:text-md'>

									<div>CryptoMarketVision (CMV) respects your privacy. </div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-12">
						<div className="flex justify-center">
							<img src='/images/Privacy.svg' className="h-96 w-96" alt='Privacy image' />
						</div>
					</div>
				</div>
				<div className='flex flex-col md:flex-row md:justify-between gap-2 text-tiny '>
					<div><b>Created  On :</b>  Monday, 1st January 2024, 00:00:00 AM</div>
					<div><b>Last Updated :</b>  Monday, 1st January 2024, 00:00:00 AM</div>
				</div>

				<div >
					<div className='font-bold'>
						Welcome to CryptoMarketVision (CMV),
					</div>
					<div>
						This Privacy Policy, covers What Data is collected, generated, & used for. You may use CryptoMarketVision (CMV) only if you agree this Privacy Policy, Cookie Policy, Disclaimer, Terms Of Service, and Terms of Use.
						If you have still have any questions, please contact us through <Link className='text-primary' href='/contact-us#contactform'>Contact Form</Link> given on Contact Us page.
					</div>
				</div>

				{/* Information we collect */}
				<div>

					<div className='flex flex-col gap-4 mb-4'>
						<div >
							<HrWithText Text={"Information We Collect Indirectly From You"} />
						</div>
						<div>
							Usage Data :  Usage Data is collected automatically when using the Service. IP Address, geographic location etc. gets collected as it is used to provide services.
						</div>
						<div>
							Functionality Cookies & Necessary / Essential Cookies : No, but we store data in Local Storage of browser, it gets cleared when user clears history along with website data & site settings. This data used to remember choices made by you when use this website, such as remembering your language preference, currency preference, theme preference. This helps us in providing more personal experience.
						</div>


						<div >
							<HrWithText Text={"Information We Collect Directly From You"} />
						</div>
						<div>
							Use of Your Personal Data : Not used. This website doesn't provides any such functionality, which requires user's personal data. None, As we do not collect, store, gather user's personal data here.
						</div>

						<div>
							Retention of Your Personal Data : None, As we do not collect, store, gather user's personal data here.
						</div>

						<div>
							Transfer of Your Personal Data :  None, As we do not collect, store, gather user's personal data here.
						</div>
						<div>
							Disclosure of Your Personal Data :  None, As we do not collect, store, gather user's personal data here.
						</div>
						<div>
							Security of Your Personal Data :  None, As we do not collect, store, gather user's personal data here.
						</div>

						<div>
							Links to Third Party Sites :  None, As we do not collect, store, gather user's personal data here.
						</div>
						<div >
							<HrWithText Text={"Policy Applies to"} />
						</div>
						<div>
							Visitors : Visitors/End Users to our Site.
						</div>
					</div>


				</div>



			</div>
		</TransitionDiv>

	)
}

export default PrivacyPolicy