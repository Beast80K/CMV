'use client'
import dynamic from 'next/dynamic'
const HrWithText = dynamic(() => import('../../HrWithText/HrWithText'))
const TransitionDiv = dynamic(() => import('../../TransitionDiv/TransitionDiv'))
const PrintToPDFBtn = dynamic(() => import('../../PrintToPDFBtn/PrintToPDFBtn'))


import Link from 'next/link'


const TermsOfService = () => {

	return (
		<TransitionDiv>

			<PrintToPDFBtn PageName={'terms-of-service'} />

			<div className='text-tiny text-foreground print:text-black print:bg-white p-8'
			>

				<div className='grid grid-cols-12 gap-4 mb-8'>
					<div className=' col-span-12 '>
						<div>
							<div className='flex flex-col gap-2 text-center '>


								<h1
									className='text-4xl md:text-8xl text-primary font-Noto font-bold'
								>
									Terms Of Service
								</h1>

								<div className='font-medium text-sm md:text-md flex flex-col gap-2'>
									<div>Thank you for using our services.</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-12">
						<div className="flex justify-center">
							<img src='/images/Service.svg' className="h-96 w-96" alt='Service image' />
						</div>
					</div>


				</div>



				<div className='flex flex-col md:flex-row md:justify-between gap-2 text-tiny mb-4'>
					<div><b>Created  On :</b>  Monday, 1st January 2024, 00:00:00 AM</div>
					<div><b>Last Updated :</b>  Monday, 1st January 2024, 00:00:00 AM</div>
				</div>
				<div className='mb-4'>
					<div className='font-bold'>
						Welcome to CryptoMarketVision (CMV),
					</div>
					<div>
						This Terms of Services, covers terms of service provided by CryptoMarketVision (CMV) by visiting this website, you agree to these terms legally. We recommend that you read this Terms of Service carefully. You may use CryptoMarketVision (CMV) only if you agree this Terms of Use, Privacy Policy, Disclaimer, and Cookie Policy.
						If you have still have any questions, please contact us through <Link className='text-primary' href='/contact-us#contactform'>Contact Form</Link> given on Contact Us page. Do not use are services if you don't agree with various Terms & Conditions etc.
					</div>
				</div>

				<div>
					<div className='flex flex-col gap-4 mb-4'>
						<div >
							<HrWithText Text={"Use Of Service"} />
						</div>
						<div>
							Age : People below age group 18 may not access or use the Service unless their use is directly authorized by their parent/guardian who agrees to these Terms.
						</div>
						<div>
							Service : You are granted a permission for personal use to only view this website. You are not allowed to reverse-engineer, bypass, perform data-mining, misuse,lease, sell, distribute, offer, create copy, decompile, attempt to obtain the source code, modify, to transmit malicious code, spamming, etc. these service. CryptoMarketVision (CMV) is an personal, non-commercial project made as an education project, hence this website shall not be used for real-world applications. You are responsible for the use of Service.
						</div>

						<div >
							<HrWithText Text={"Copyright Policy"} />
						</div>

						<div>
							CryptoMarketVision (CMV) doesn't allows you to reverse-engineer, bypass, perform data-mining, misuse,lease, sell, distribute, offer, create copy, decompile, attempt to obtain the source code, modify, to transmit malicious code, spamming, etc.
						</div>
						<div >
							<HrWithText Text={"Limitation of Liability"} />
						</div>
						<div>
							CryptoMarketVision (CMV) is an personal, non-commercial project made as an education project, hence this website shall not be used for real-world applications. You are responsible for the use of Service. CryptoMarketVision (CMV) will not be liable for anything. CryptoMarketVision (CMV) don't provide warranty or guarantee accuracy, validity, reliabaility, completeness, free of errors or interruptions or availability of data.CryptoMarketVision (CMV) can modify terms, anytime, we'll not notify users. Users should regularly review terms & stay updated. CryptoMarketVision (CMV) don't provide warranty or guarantee for anything present on this site. CryptoMarketVision (CMV) shall not be hold responsible for anything.
						</div>
						<div >
							<HrWithText Text={"External Links"} />
						</div>
						<div>
							By clicking any external link CryptoMarketVision (CMV) will not be liable, We don't provide warranty or guarantee  accuracy, validity, reliabaility, completeness, liability,  free of errors or interruptions or availability of data. External Links are not Investigated or verified by us.
						</div>

						<div >
							<HrWithText Text={"Termination of Services"} />
						</div>
						<div>
							CryptoMarketVision (CMV) will terminate services, without prior notice or liability, for any reason whatsoever.
						</div>


						<div>
							<HrWithText Text={`Services are "AS IS" and "AS AVAILABLE"`} />

						</div>
						<div>
							CryptoMarketVision (CMV) don't provide warranty or guarantee for anything present on this site. CryptoMarketVision (CMV) shall not be hold responsible for anything. CryptoMarketVision (CMV) don't provide warranty or guarantee accuracy, validity, reliabaility, completeness, free of errors or interruptions or availability of data. You are responsible for the use of Service.
						</div>


						<div >
							<HrWithText Text={"Warranty Disclaimer"} />
						</div>
						<div>
							CryptoMarketVision (CMV) don't provide warranty or guarantee for anything present on this site. CryptoMarketVision (CMV) shall not be hold responsible for anything.
						</div>
						<div >
							<HrWithText Text={"Accuracy Disclaimer"} />
						</div>
						<div>
							CryptoMarketVision (CMV) don't provide warranty or guarantee  accuracy, validity, reliabaility, completeness, free of errors or interruptions or availability of data.
						</div>


						<div >
							<HrWithText Text={"Changes to Terms of Services"} />
						</div>
						<div>
							CryptoMarketVision (CMV) can modify Terms of Services, anytime, we'll not notify users. Users should regularly review terms & stay updated.
						</div>
					</div>
				</div>


			</div>
		</TransitionDiv>

	)
}

export default TermsOfService