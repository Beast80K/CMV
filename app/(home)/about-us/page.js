import dynamic from "next/dynamic"
const TransitionDiv = dynamic(() => import("@/app/components/TransitionDiv/TransitionDiv"))


const AboutPage = () => {


	return (
		<TransitionDiv>
			<div className='grid grid-cols-12 mb-4 gap-8 text-small p-8 text-foreground'>
				<div className=' col-span-12 '>
					<div className='flex flex-col gap-4 mb-8 text-center'>

						<h1 className='text-4xl md:text-8xl text-primary font-Noto font-bold' >
							About Us
						</h1>

						<div className='font-medium text-sm md:text-md flex flex-col gap-2'>
							<div>We provide detailed analysis of the crypto market. </div>
						</div>
					</div>

					<div className=' flex flex-col gap-8 items-center justify-center mb-8'>

						<div className="col-span-12">
							<div className="flex justify-center">
								<img src='/images/Team.svg' alt='Team image' className="h-96 w-96" />
							</div>
						</div>

						<div className='w-full lg:w-8/12'>
							<div className='flex flex-col md:flex-row  gap-8 md:items-center justify-center'>
								<div className='flex flex-col gap-2 items-center'>

									<div className='text-primary font-bold text-3xl'>
										10,000+
									</div>
									<div className='text-md'>
										No. of Visitors/Day.
									</div>
								</div>



								<div className='flex flex-col gap-2 items-center'>
									<div className='text-primary font-bold text-3xl'>
										{`< 1%`}
									</div>
									<div className='text-md'>
										Downtime
									</div>
								</div>


								<div className='flex flex-col gap-2 items-center'>
									<div className='text-primary font-bold text-3xl'>
										{`< 50`}/Yr.
									</div>
									<div className='text-md'>
										Complaints
									</div>
								</div>

								<div className='flex flex-col gap-2 items-center'>
									<div className='text-primary font-bold text-3xl'>
										+99/Hr.
									</div>
									<div className='text-md'>
										Queries resolved
									</div>
								</div>




							</div>

						</div>

					</div>

					<div className='mb-4' >
						CryptoMarketVision (CMV) is an non-commercial, personal project.
						CryptoMarketVision (CMV)
						is an not company, organization, it just doesn't exists, its imaginary name used for this project.
						We offer user-friendly platform for cryptocurrency enthusiasts and investors. We provide the most detailed data
						about Cryptocurrency, Market Cap, Trending Cryptocurrencies, Trending NFTs, Market Dominance, Trading Volume etc.

						Today, more than 10,000 people visit CryptoMarketVision (CMV) to get latest data about cryptocurrencies.
						We are known among cryptocurrency enthusiasts for our uniqueness of showing detailed data, & its ease-of-use.

					</div>

					<div className='mb-4'>
						<h3 className='text-xl font-bold mb-2'>
							Our Story

						</h3>
						<p>
							CryptoMarketVision (CMV) is an non-commercial, personal project.
							This is made with an intention to show ability of developer to work with various web technologies.
							We aim to give crypto data in a professional way.
							We help visitors in getting crypto details, in various forms.
						</p>

					</div>

					<div className='mb-4'>
						<h3 className='text-xl font-bold mb-2'>
							Our Team
						</h3>
						<p className=' '>CryptoMarketVision (CMV) is an non-commercial, personal project.
							Its made by only one member.</p>



					</div>

					<div className='mb-4'>
						<h3 className='text-xl font-bold mb-2'>
							Our Values
						</h3>

						<div className='grid grid-cols-12 gap-8'>

							<div className=' col-span-12 md:col-span-4'>
								<div className='font-bold'>Credibility</div>
								<div>All data shown is as is, rounded-off wherever required for ease.</div>
							</div>

							<div className=' col-span-12 md:col-span-4'>
								<div className='font-bold'>Security</div>
								<div>We ensure your security & privacy on our website.</div>
							</div>

							<div className=' col-span-12 md:col-span-4'>
								<div className='font-bold'>Integrity</div>
								<div>We are committed to being honest, ethical, and respectful in all aspects.</div>
							</div>

							<div className=' col-span-12 md:col-span-4'>
								<div className='font-bold'>Reliability</div>
								<div>We strive to provide a reliable platform that our visitors can trust,
									with almost zero downtime, maximum efficiency & accuracy.</div>
							</div>

							<div className=' col-span-12 md:col-span-4'>
								<div className='font-bold'>User-Focused</div>
								<div>Our users are everything to us, we take their problems as very seriously.
									We improve user-experience by queries submitted to us.</div>
							</div>

							<div className=' col-span-12 md:col-span-4'>
								<div className='font-bold'>Support</div>
								<div>We resolve queries blazing fast, with accuracy & field experts on various crypto-topics.</div>
							</div>

						</div>
					</div>







				</div>

			</div>
		</TransitionDiv>
	)
}

export default AboutPage

export const metadata = {

	title: 'About Us - Who we are ? Goal ? Team Members ?',

	description: `CryptoMarketVision (CMV) is an non-commercial, personal project read more about us, Who we are ? Goal ? Team Members etc. its made by only one person.`,

	alternates: {
		canonical: '/about-us',
	},
	openGraph: {
		title: 'About Us - Who we are ? Goal ? Team Members ?',
		description: `CryptoMarketVision (CMV) is an non-commercial, personal project read more about us, Who we are ? Goal ? Team Members etc. its made by only one person.`,
		siteName: 'CryptoMarketVision',
		images: [
			{
				url: `/images/Logo.png`,
				width: 600,
				height: 600,
			},
			{
				url: `/images/Logo.png`,
				width: 1600,
				height: 1600,
				alt: 'CryptoMarketVision (CMV)',
			},
		],
		locale: 'en_US',
		type: 'website',
	},

	twitter: {
		card: 'summary_large_image',
		title: 'About Us - Who we are ? Goal ? Team Members ?',
		description: `CryptoMarketVision (CMV) is an non-commercial, personal project read more about us, Who we are ? Goal ? Team Members etc. its made by only one person.`,
		creator: 'CryptoMarketVision',
		images: [`/images/Logo.png`,],
	},
	keywords: ['crypto', 'coin', 'coins', 'crypto coins', 'exchange', 'crypto exchange', 'defi', 'defi crypto', 'cryptocurrency', 'crypto currencies', 'crypto market', 'blockchain', 'nft', 'nfts', 'market cap', 'crypto market cap', 'cryptocurrency price', 'crypto price', 'cryptocurrencies', 'trading volume', 'gainers', 'losers', 'gainers and losers', 'exchanges', 'nft collection', 'blockchains', 'fdv', 'CryptoMarketVision', 'CryptoMarketVision (CMV)', 'cmv'],

	applicationName: "CryptoMarketVision (CMV)",
	authors: [{ name: "CryptoMarketVision (CMV)" }],
	generator: 'CryptoMarketVision (CMV)',
	creator: 'CryptoMarketVision (CMV)',
	publisher: 'CryptoMarketVision (CMV)',
	category: 'technology',

	robots: {
		index: true,
		follow: false,
		nocache: false,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},

}