"use client";
import dynamic from 'next/dynamic'
const HrWithText = dynamic(() => import('../../HrWithText/HrWithText'))

const PrintToPDFBtn = dynamic(() => import('../../PrintToPDFBtn/PrintToPDFBtn'))

import Link from "next/link";
const TransitionDiv = dynamic(() => import("@/app/components/TransitionDiv/TransitionDiv"))

const Disclaimer = () => {
	return (
		<TransitionDiv>
			<PrintToPDFBtn PageName={"disclaimer"} />

			<div className="text-tiny p-8 flex flex-col gap-4 print:text-black print:bg-white text-foreground">
				<div className="grid grid-cols-12 gap-4 ">
					<div className=" col-span-12 ">
						<div className="">
							<div className="flex flex-col text-center gap-2 mb-8">
								<h1 className="text-4xl md:text-8xl text-primary font-Noto font-bold ">
									Disclaimer
								</h1>

								<div className="font-medium text-sm md:text-md">
									You are responsible for the use of service.
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-12">
						<div className="flex justify-center">
							<img
								src="/images/Disclaimers.svg"
								className="h-96 w-96"
								alt="Disclaimers image"
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col md:flex-row md:justify-between gap-2 text-tiny">
					<div>
						<b>Created On :</b> Monday, 1st January 2024, 00:00:00
						AM
					</div>
					<div>
						<b>Last Updated :</b> Monday, 1st January 2024, 00:00:00
						AM
					</div>
				</div>

				<div>
					<div className="font-bold">
						Welcome to CryptoMarketVision (CMV),
					</div>
					<div>
						This Disclaimer, covers use of CryptoMarketVision (CMV)
						by visiting this website, you agree to these terms
						legally. We recommend that you read this Disclaimer
						carefully. You may use CryptoMarketVision (CMV) only if
						you agree this Disclaimer, Privacy Policy,Terms Of Use,
						Terms Of Service, and Cookie Policy. The information
						provided by CryptoMarketVision (CMV) shall not be used
						for real-world apllications. CryptoMarketVision (CMV)
						don't provide warranty or guarantee for anything present
						on this site. CryptoMarketVision (CMV) shall not be hold
						responsible for anything.You are responsible for the use
						of Service. If you have still have any questions, please
						contact us through{" "}
						<Link
							className="text-primary"
							href="/contact-us#contactform"
						>
							Contact Form
						</Link>{" "}
						given on Contact Us page.
					</div>
				</div>

				<div>
					<div className="flex flex-col gap-4 mb-4">
						<div>
							<HrWithText Text={"Warranty Disclaimer"} />
						</div>
						<div>
							We don't provide warranty or guarantee for anything
							present on this site. CryptoMarketVision (CMV) shall
							not be hold responsible for anything.
							CryptoMarketVision (CMV)'s use or reliance on any
							information is completely at your own risk.
						</div>
						<div>
							<HrWithText Text={"Accuracy Disclaimer"} />
						</div>

						<div>
							We don't provide warranty or guarantee accuracy,
							validity, reliabaility, completeness, free of errors
							or interruptions or availability of data.
						</div>

						<div>
							<HrWithText Text={"External Links Disclaimer"} />
						</div>

						<div>
							By clicking any external link CryptoMarketVision
							(CMV) will not be liable, We don't provide warranty
							or guarantee accuracy, validity, reliabaility,
							completeness, liability, free of errors or
							interruptions or availability of data. External
							Links are not Investigated or verified by us.
							CryptoMarketVision (CMV) will not be liable, shall
							not be hold responsible for anything.
						</div>

						<div>
							<HrWithText Text={"Copyright Disclaimer"} />
						</div>

						<div>
							Various text, logos, images, graphs/charts, UI-UX
							design, etc are subject to copyright protection.
							CoinGecko logo used in CryptoMarketVision (CMV) is
							for attribution purpose only, & it belongs to
							CoinGecko. You may not mis-use, infringe, or share
							it as yours.
						</div>

						<div>
							<HrWithText Text={"Trademark Disclaimer"} />
						</div>
						<div>
							CoinGecko logo used in CryptoMarketVision (CMV) is
							for attribution purpose only, & it belongs to
							CoinGecko. CryptoMarketVision (CMV) is not
							partnered/affiliated to them.
						</div>
						<div>
							<HrWithText Text={"Investment Disclaimer"} />
						</div>
						<div>
							We don't provide warranty or guarantee accuracy,
							validity, reliabaility, completeness, free of errors
							or interruptions or availability of data.
							CryptoMarketVision (CMV)'s use or reliance on any
							information is completely at your own risk.
							CryptoMarketVision (CMV) will not be liable, shall
							not be hold responsible for anything.
						</div>
					</div>
				</div>
			</div>
		</TransitionDiv>
	);
};

export default Disclaimer;
