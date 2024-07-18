"use client";

import Link from "next/link";
import TransitionDiv from "../TransitionDiv/TransitionDiv";


const Footer = () => {
	return (
		<TransitionDiv>
			<div className="bg-[#1c1c1c] text-white p-8 print:hidden">
				<div className="grid grid-cols-12 mx-auto mb-8 gap-8 ">
					<div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2">
						<div className="flex flex-row gap-2 items-center">
							<div>
								<img
									src="/images/Logo.svg"
									alt="CryptoMarketVision"
									className=" h-10 w-10"
								/>
							</div>
							<div>
								<div className="flex flex-col">
									<div className="text-md font-Noto font-bold">
										CryptoMarketVision (CMV)
									</div>
									<div className="text-tiny font-Noto">
										Detailed analysis of the crypto market.
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2">
						<div className="flex flex-row gap-2 items-center">
							<div>
								<img
									src="/images/CoinGeckoLogo.svg"
									alt="CoinGecko"
									className="w-10 h-10"
								/>
							</div>
							<div>
								<div className="flex flex-col">
									<div className="text-md font-Noto font-bold">
										CoinGecko
									</div>

									<Link
										size="sm"
										className=" text-tiny"
										aria-label="Coin Gecko dot com"
										target="_blank"
										rel="noopener noreferrer"
										href="https://www.coingecko.com"
									>
										Powered by CoinGecko
									</Link>
								</div>
							</div>
						</div>
					</div>

					<div className="col-span-6  sm:col-span-6 md:col-span-3 lg:col-span-4 xl:col-span-2">
						<div className="flex flex-col gap-2 ">
							<div className="font-bold font-Noto text-md">
								For Recruiters
							</div>
							<div className="text-small">
								<Link
									size="sm"
									className=""
									href="/project-details"
								>
									Project Details
								</Link>
							</div>
						</div>
					</div>

					<div className="col-span-6  sm:col-span-6 md:col-span-3 lg:col-span-4 xl:col-span-2">
						<div className="flex flex-col gap-2">
							<div className="font-bold text-md  font-Noto ">
								Legal
							</div>
							<div className="text-small">
								<Link
									size="sm"
									className=""
									href="/attributions"
								>
									Attributions
								</Link>
							</div>
							<div className="text-small">
								<Link
									size="sm"
									className=""
									href="/licenses"
								>
									Licenses
								</Link>
							</div>
							<div className="text-small">
								<Link
									size="sm"
									className=""
									href="terms-of-service"
								>
									Terms Of Service
								</Link>
							</div>
							<div className="text-small">
								<Link
									size="sm"
									className=""
									href="terms-of-use"
								>
									Terms Of Use
								</Link>
							</div>
						</div>
					</div>

					<div className="col-span-6  sm:col-span-6 md:col-span-3 lg:col-span-4 xl:col-span-2">
						<div className="flex flex-col gap-2">
							<div className="font-bold text-md  font-Noto ">
								Support
							</div>
							<div className="text-small">
								<Link
									size="sm"
									className=""
									href="/contact-us"
								>
									Contact Us
								</Link>
							</div>
							<div className="text-small">
								<Link
									size="sm"
									className=""
									href="/faqs"
								>
									FAQs
								</Link>
							</div>
						</div>
					</div>

					<div className="col-span-6  sm:col-span-6 md:col-span-3 lg:col-span-4 xl:col-span-2">
						<div className="flex flex-col gap-2 ">
							<div className="font-bold text-md  font-Noto ">
								Company
							</div>

							<div className="text-small">
								<Link
									size="sm"
									className=""
									href="/about-us"
								>
									About Us
								</Link>
							</div>
							<div className="text-small">
								<Link
									size="sm"
									className=""
									href="/disclaimer"
								>
									Disclaimer
								</Link>
							</div>

							<div className="text-small">
								<Link
									size="sm"
									className=""
									href="/privacy-policy"
								>
									Privacy Policy
								</Link>
							</div>
							<div className="text-small">
								<Link
									size="sm"
									className=""
									href="/cookies-policy"
								>
									Cookies Policy
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className="flex mx-auto justify-center text-tiny font-Noto font-bold">
					© 2023 CryptoMarketVision. All Rights Reserved.
				</div>
			</div>
		</TransitionDiv>
	);
};

export default Footer;
