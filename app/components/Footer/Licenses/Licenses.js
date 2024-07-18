'use client'

import { Link } from "@nextui-org/react"
import dynamic from 'next/dynamic'
const TransitionDiv = dynamic(() => import('../../TransitionDiv/TransitionDiv'))
const Licenses = () => {

	const LicenseList = [

		{
			Name: "CoinGecko",
			Github: "https://github.com/coingecko",
			HomePg: "https://www.coingecko.com",
			LicenseType: "Public API",
			LicenseText: `You can use our free API for your commercial website/application. All we ask is for a link back to our site mentioning that the data is "Powered by CoinGecko API", we’d appreciate that.`,
			LicenseLink: "https://www.coingecko.com/en/faq#:~:text=Do%20You%20Provide%20Any%20API%3F",
		},

		{
			Name: "Pixels Market",
			Github: "",
			HomePg: "https://pixels.market",
			LicenseType: "Pixels Market License",
			LicenseText: `All images, assets and vectors published on Pixels Market can be used for free. You can use them for noncommercial and commercial purposes. You do not need to ask permission from or provide credit to the creator or Pixels Market. More precisely, Pixels Market grants you an nonexclusive, worldwide copyright license to download, copy, modify, distribute, perform, and use the assets provided from Pixels Market for free, including for commercial purposes, without permission from or attributing the creator or Pixels Market. This license does not include the right to compile assets, vectors or images from Pixels Market to replicate a similar or competing service, in any form or distribute the assets in packs or otherwise. This extends to automated and non-automated ways to link, embed.`,
			LicenseLink: "https://pixels.market",

		},
		{
			Name: "Noto Sans",
			Github: "https://github.com/notofonts",
			HomePg: "https://fonts.google.com/noto",
			LicenseType: "Open Font License",
			LicenseText: `These fonts are licensed under the Open Font License. You can use them in your products & projects – print or digital, commercial or otherwise.`,
			LicenseLink: "https://openfontlicense.org/",

		},
		{
			Name: "Font Awesome Free Icons",
			Github: "https://github.com/FortAwesome/Font-Awesome",
			HomePg: "https://fontawesome.com/",
			LicenseType: "Font Awesome Free Icons License",
			LicenseText: `Font Awesome Free Icons is free, open source, and GPL friendly. You can use it for
            commercial projects, open source projects, or really almost whatever you want.`,
			LicenseLink: "https://fontawesome.com/license/free",
		},

		{
			Name: "Bootstrap Icons",
			Github: "https://github.com/twbs/icons",
			HomePg: "https://icons.getbootstrap.com/",
			LicenseType: "MIT License (MIT)",
			LicenseText: `Copyright (c) 2019-2024 The Bootstrap Authors
            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:
            
            The above copyright notice and this permission notice shall be included in
            all copies or substantial portions of the Software.
            
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
            THE SOFTWARE.`,
			LicenseLink: "https://github.com/twbs/bootstrap/blob/main/LICENSE",
		},
		{
			Name: "Material Design Icons",
			Github: "https://github.com/google/material-design-icons",
			HomePg: "https://developers.google.com/fonts/docs/material_icons",
			LicenseType: "Apache License Version 2.0.",
			LicenseText: `We have made these icons available for you to incorporate them into your products under the Apache License Version 2.0. Feel free to remix and re-share these icons and documentation in your products. We'd love attribution in your app's about screen, but it's not required.`,
			LicenseLink: "https://developers.google.com/fonts/docs/material_icons#licensing",
		},

	]
	return (
		<TransitionDiv>
			<div className='grid grid-cols-12 gap-8 mb-8 text-foreground p-8'>
				<div className=' col-span-12 '>
					<div >
						<div className='flex flex-col gap-4 text-center'>



							<h1
								className='text-4xl md:text-8xl text-primary font-Noto font-bold'
							>
								Licenses
							</h1>
							<div className='font-medium text-sm md:text-md flex flex-col gap-2'>

								<div>These are the licenses of resources used form various sources. </div>

							</div>
						</div>
					</div>
				</div>

				<div className="col-span-12">
					<div className="flex justify-center">
						<img src='/images/License.svg' className="h-96 w-96" alt='License image' />
					</div>
				</div>


				{
					LicenseList.map((v, i) => (
						<div key={i} className='col-span-12  mb-4 ' >


							<Link
								className="text-lg font-bold mb-2"
								href={v.HomePg}
								isExternal={true}
								showAnchorIcon={true}
							>{v.Name}</Link>

							<div className="flex gap-4 flex-col text-small">
								{v.LicenseText}

								<div className="flex gap-4 items-center">

									<Link

										className="text-small font-bold max-w-fit"
										isExternal={true}
										showAnchorIcon={true}
										href={v.LicenseLink}
									>{v.LicenseType || "Read More"}</Link>

									{
										!v.Github
											?
											<Link

												className="text-small font-bold max-w-fit"
												isExternal={true}
												showAnchorIcon={true}
												href={v.Github}

											>Github</Link>
											: null
									}
								</div>

							</div>
						</div>
					))
				}

			</div>

		</TransitionDiv>
	)
}

export default Licenses