import { BsCloudMoon, BsMoonStars, BsSun } from 'react-icons/bs'

const ProjectDetailsPg = () => {
	const DevPhases = [
		{
			name: "MOTIVATION",
			details: `Build website using NextJS along with other frameworks.`
		},
		{
			name: "RESEARCH",
			details: `Discovered various tools, langauges, resources & libraries.`
		},
		{
			name: "DESIGN",
			details: `Experimented with various fonts, colors.`
		},
		{
			name: "DEVELOPMENT",
			details: `Started building prototypes, by making small components.`
		},
		{
			name: "TESTING",
			details: `Performed various tests with tools like Lighthouse, to simulate different devices & conditions. Report generated from Lighhouse was used to improve performance.`
		},
		{
			name: "DEPLOYMENT",
			details: `Server deployment on service provider, & other features were considered with respect to number of users & cost.`
		},
		{
			name: "MAINTENANCE",
			details: `Possible upgrades & new features will be prototyped, & deployed after through testing.`
		},
	]


	const PgContent = [
		{
			Heading: "Motivation",
			Content: [`Get exposure to various web technologies in both the back-end and front-end and utilize them to implement a website that shows highly detailed statistical data that can be manipulated by the user for ease of consumption. Use of design tools to make a website that has a professional and formal feel.`,
				`Superior focus on implementing new libraries and working with them, understanding hidden flaws that come with trending technologies, and overcoming them to deliver a good project, thus developing a problem-solving skill.`
			],
			Img: "/images/project_details/Motivation.svg"
		},
		{
			Heading: "SDLC",
			Content: [
				'Before starting the project, I planned how to break it down into smaller chunks. After that, I decided to perform each task as a sprint. Every day before starting any task, I reviewed previous tasks and considered new tasks to be done. ',
				'Scrum SDLC fit my situation, as it made it easy to breakdown various requirements into smaller tasks.',
				'Every task, like research, planning, designing, prototyping, development, and deployment (satisfied with the outcome), was further subdivided into sub-sprints to breakdown complex tasks into small deliverables.'
			],
			Img: "/images/project_details/SDLC.svg"
		},
		{
			Heading: "Research",
			Content: [
				"NextJS has server-side rendering, and I decided that's something I should definitely learn. I started searching for free public APIs and came across CoinGecko's free public API. I went through its detailed documentation, understood its limitations, and finalized it as a data source. ",
				"Now that it's time for the UI Library, this choice was very important, as it will directly affect the UI/UX. Instead of sticking with common UI libraries, I chose NextUI."
			],
			Img: "/images/project_details/Research.svg"
		},
		{
			Heading: "Requirements",
			Content: [
				'The website should be professional and formal, with cryptocurrency data displayed in tables. It should be concise, customizable, and have light and dark modes, language, and currency switching. ',
				'The data should be clear, with date and time formats, and automatically refresh without user input. Indicators represent good or bad values, and tickers show important data moving right to left.'
			],
			Img: "/images/project_details/Requirements.svg"
		},
		{
			Heading: "Planning",
			Content: [
				'Now I started considering what components are to be made, what functionality is essential, and what additions can be made. How can functionality be implemented, and what libraries can be used to increase efficiency? Which APIs endpoints will serve data on what page, in which component. ',
				'Limitations of libraries are also considered, as is error handling. Breakdown of a page into smaller components; what tools can be used to improve bug hunting. UI/UX & functionality was focused heavily. Time considerations with respect to page size & contents.'
			],
			Img: "/images/project_details/Planning.svg"
		},
		{
			Heading: "Design",
			Content: [
				`The design process involved selecting and testing Colour Pallete in various light-dark modes, choosing a no-tofu font called Noto Sans for its compatibility with numerous languages, and considering the unique logo design, illustrations, spacing, and rounded edges of some components.`
			],
			Img: "/images/project_details/Design.svg",
			SubContent: <div className="flex flex-col gap-8">
				<div className="text-2xl text-primary font-bold">Color Palette</div>
				<div className="flex flex-col gap-2">
					<div className="flex gap-1 items-center">
						<BsSun size={18} /> Light Mode
					</div>
				</div>
				<div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 justify-items-stretch">
						<div className={`h-24 text-white text-center bg-[#0C41E2] p-4 flex flex-col gap-2`} >
							Primary
							<div className="font-bold text-xl">#0C41E2</div>
						</div>
						<div className={`h-24 text-black text-center bg-[#EDF1FE] p-4 flex flex-col gap-2`} >
							Secondary
							<div className="font-bold text-xl">#EDF1FE</div>
						</div>
						<div className={`h-24 text-black text-center bg-[#FFFFFF] p-4 flex flex-col gap-2`} >
							Background
							<div className="font-bold text-xl">#FFFFFF</div>
						</div>
						<div className={`h-24 text-white text-center bg-[#000000]  p-4 flex flex-col gap-2`} >
							Foreground
							<div className="font-bold text-xl">#000000</div>
						</div>

					</div>
				</div>

				<div className="flex flex-col gap-2">
					<div className="flex gap-1 items-center">
						<BsCloudMoon size={18} /> Dark Mode
					</div>
				</div>
				<div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 justify-items-stretch">
						<div className={`h-24 text-black text-center bg-[#6A90FF] p-4 flex flex-col gap-2`} >
							Primary
							<div className="font-bold text-xl">#6A90FF</div>
						</div>
						<div className={`h-24 text-white text-center bg-[#1C1C1C] p-4 flex flex-col gap-2`} >
							Secondary
							<div className="font-bold text-xl">#1C1C1C</div>
						</div>
						<div className={`h-24 text-white text-center bg-[#282828] p-4 flex flex-col gap-2`} >
							Background
							<div className="font-bold text-xl">#282828</div>
						</div>
						<div className={`h-24 text-black text-center bg-[#FFFFFF]  p-4 flex flex-col gap-2`} >
							Foreground
							<div className="font-bold text-xl">#FFFFFF</div>
						</div>

					</div>
				</div>

				<div className="flex flex-col gap-2">
					<div className="flex gap-1 items-center">
						<BsMoonStars size={18} /> Amoled Mode
					</div>
				</div>
				<div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 justify-items-stretch">
						<div className={`h-24 text-center text-black bg-[#6A90FF] p-4 flex flex-col gap-2`} >
							Primary
							<div className="font-bold text-xl">#6A90FF</div>
						</div>
						<div className={`h-24 text-white text-center bg-[#1C1C1C] p-4 flex flex-col gap-2`} >
							Secondary
							<div className="font-bold text-xl">#1C1C1C</div>
						</div>
						<div className={`h-24 text-white text-center bg-[#000000] p-4 flex flex-col gap-2`} >
							Background
							<div className="font-bold text-xl">#000000</div>
						</div>
						<div className={`h-24 text-black text-center bg-[#FFFFFF]  p-4 flex flex-col gap-2`} >
							Foreground
							<div className="font-bold text-xl">#FFFFFF</div>
						</div>

					</div>
				</div>

				<div className="text-2xl text-primary font-bold">Typography</div>
				<div className="grid grid-cols-12 gap-8 items-center">
					<div className="col-span-12 xl:col-span-5">
						<div className="text-8xl font-bold mb-4">
							Noto Sans
						</div>
						<div>
							Noto is a global font collection for writing in modern and ancient languages, featuring Noto Sans, an unmodulated design for Latin, Cyrillic,
							and Greek scripts. It offers italic styles, multiple weights, widths, and 3,741 glyphs. The name translates to "no tofu," a project aiming to eliminate blank rectangles when no font is available.
							These fonts are licensed under the Open Font License.
						</div>
					</div>

					<div className="col-span-12 xl:col-span-7 lg:text-2xl">
						<div className="font-thin">The quick brown fox jumps over the lazy dog 0123456789 ~!@#$%^&*()_+ </div>
						<div className="font-extralight">The quick brown fox jumps over the lazy dog 0123456789 ~!@#$%^&*()_+ </div>
						<div className="font-light">The quick brown fox jumps over the lazy dog 0123456789 ~!@#$%^&*()_+ </div>
						<div className="font-normal">The quick brown fox jumps over the lazy dog 0123456789 ~!@#$%^&*()_+ </div>
						<div className="font-medium">The quick brown fox jumps over the lazy dog 0123456789 ~!@#$%^&*()_+ </div>
						<div className="font-semibold">The quick brown fox jumps over the lazy dog 0123456789 ~!@#$%^&*()_+ </div>
						<div className="font-bold">The quick brown fox jumps over the lazy dog 0123456789 ~!@#$%^&*()_+ </div>
						<div className="font-extrabold">The quick brown fox jumps over the lazy dog 0123456789 ~!@#$%^&*()_+ </div>
						<div className="font-black">The quick brown fox jumps over the lazy dog 0123456789 ~!@#$%^&*()_+ </div>
						<div className="font-mono">The quick brown fox jumps over the lazy dog 0123456789 ~!@#$%^&*()_+ </div>
					</div>

				</div>
				<div className="text-2xl text-primary font-bold">Logo</div>
				<div className="grid grid-cols-12 gap-8 items-center">

					<div className="col-span-12 xl:col-span-5">
						<img src="/images/project_details/LogoBreakdown.svg" alt="Logo Design" />
					</div>
					<div className="col-span-12 xl:col-span-7 ">
						Diamond shape is used to represent uniqueness, importance, value.
						This is icon is made using triangles, and color gradient from color palette.
					</div>
				</div>

				<div className="text-2xl text-primary font-bold">Spacing</div>
				{/* MB-2 */}
				<div className='flex flex-col gap-2'>
					<div>8px, 0.5rem</div>
					<div className='flex gap-2 items-center mb-2'>
						<div className={`h-24 w-full text-center text-xl text-black bg-[#EDF1FE] border border-primary p-4`} >
							1
						</div>
						<div className={`h-24 w-full text-center text-xl text-black bg-[#EDF1FE] border border-primary p-4`} >
							2
						</div>
					</div>
					<div className='flex gap-2 items-center'>
						<div className={`h-24 w-full text-center text-xl text-black bg-[#EDF1FE] border border-primary p-4`} >
							3
						</div>
						<div className={`h-24 w-full text-center text-xl text-black bg-[#EDF1FE] border border-primary p-4`} >
							4
						</div>
					</div>
				</div>
				{/* MB-4 */}
				<div className='flex flex-col gap-4 '>
					<div>16px, 1rem</div>
					<div className='flex gap-4 items-center mb-4'>
						<div className={`h-24 w-full text-center text-xl text-black bg-[#EDF1FE] border border-primary p-4`} >
							1
						</div>
						<div className={`h-24 w-full text-center text-xl text-black bg-[#EDF1FE] border border-primary p-4`} >
							2
						</div>
					</div>
					<div className='flex gap-4 items-center'>
						<div className={`h-24 w-full text-center text-xl text-black bg-[#EDF1FE] border border-primary p-4`} >
							3
						</div>
						<div className={`h-24 w-full text-center text-xl text-black bg-[#EDF1FE] border border-primary p-4`} >
							4
						</div>
					</div>
				</div >

				{/* MB-8 */}
				< div className='flex flex-col gap-2' >
					<div>32px, 8rem</div>
					<div className='flex gap-8 items-center mb-8'>
						<div className={`h-24 w-full text-center text-xl text-black bg-[#EDF1FE]  border border-primary p-4`} >
							1
						</div>
						<div className={`h-24 w-full text-center text-xl text-black bg-[#EDF1FE]  border border-primary p-4`} >
							2
						</div>
					</div>
					<div className='flex gap-8 items-center'>
						<div className={`h-24 w-full text-center text-xl text-black bg-[#EDF1FE]  border border-primary p-4`} >
							3
						</div>
						<div className={`h-24 w-full text-center text-xl text-black bg-[#EDF1FE]  border border-primary p-4`} >
							4
						</div>
					</div>
				</ div>

				<div className='grid grid-cols-12 gap-8'>

					<div className=' col-span-6'>

						<div className="text-2xl text-primary font-bold">Border Radius</div>
						<div className='flex flex-col gap-2'>
							<div>sm</div>
							<div className='flex gap-2 items-center mb-2'>
								<div className={`h-24 w-full rounded-sm text-center text-xl text-black bg-[#EDF1FE]  border border-primary p-4`} >
									1
								</div>
								<div className={`h-24 w-full rounded-sm text-center text-xl text-black bg-[#EDF1FE]  border border-primary p-4`} >
									2
								</div>
							</div>
							<div>md</div>
							<div className='flex gap-2 items-center mb-2'>
								<div className={`h-24 w-full rounded-md text-center text-xl text-black bg-[#EDF1FE]  border border-primary  p-4`} >
									1
								</div>
								<div className={`h-24 w-full rounded-md text-center text-xl text-black bg-[#EDF1FE]  border border-primary  p-4`} >
									2
								</div>
							</div>

							<div>lg</div>
							<div className='flex gap-2 items-center mb-2'>
								<div className={`h-24 w-full rounded-lg text-center text-xl text-black bg-[#EDF1FE]   border border-primary  p-4`} >
									1
								</div>
								<div className={`h-24 w-full rounded-lg text-center text-xl text-black bg-[#EDF1FE]   border border-primary  p-4`} >
									2
								</div>
							</div>
						</div>
					</div>

					<div className=' col-span-6'>

						<div className="text-2xl text-primary font-bold">Shadow</div>
						<div className='flex flex-col gap-2'>
							<div>sm</div>
							<div className='flex gap-2 items-center mb-2'>
								<div className={`h-24 w-full shadow-sm text-center text-xl text-black bg-[#EDF1FE]  border border-primary  p-4`} >
									1
								</div>
								<div className={`h-24 w-full shadow-sm text-center text-xl text-black bg-[#EDF1FE]  border border-primary  p-4`} >
									2
								</div>
							</div>
							<div>md</div>
							<div className='flex gap-2 items-center mb-2'>
								<div className={`h-24 w-full shadow-md text-center text-xl text-black bg-[#EDF1FE]  border border-primary  p-4`} >
									1
								</div>
								<div className={`h-24 w-full shadow-md text-center text-xl text-black bg-[#EDF1FE]  border border-primary  p-4`} >
									2
								</div>
							</div>

							<div>lg</div>
							<div className='flex gap-2 items-center mb-2'>
								<div className={`h-24 w-full shadow-lg text-center text-xl text-black bg-[#EDF1FE]  border border-primary  p-4`} >
									1
								</div>
								<div className={`h-24 w-full shadow-lg text-center text-xl text-black bg-[#EDF1FE]  border border-primary  p-4`} >
									2
								</div>
							</div>
						</div>
					</div>
				</div>
			</div >
		},
		{
			Heading: "Prototyping",
			Content: [`The prototyping stage was crucial in understanding the interaction of colors, fonts, spacing, and libraries, identifying limitations, possibilities, and efficient implementation methods, and providing foresight into unexpected performance and functionality issues.`],
			Img: "/images/project_details/Prototyping.svg"
		},
		{
			Heading: "Development",
			Content: [`The development stage shifted to creating components after prototyping, identifying limitations and reducing time. Efforts included functionality, micro-interactions, error messages, font style, font weight and color usage. I utilized coding principles like DRY, KISS, YAGNI, SRP, Avoid Premature Optimization and Refactor.`],
			Img: "/images/project_details/Development.svg"
		},
		{
			Heading: "Integeration",
			Content: [`The integration stage consists of passing data to components, handling conditions, and deciding what will happen now and then. After integerating multiple components, each having its own responsibility and functionality, a complete webpage was generated.`],
			Img: "/images/project_details/Integeration.svg"
		},
		{
			Heading: "Testing",
			Content: [`The testing stage analyzed component behavior across different display sizes and inputs, focusing on performance and improvement. It also identified additional needs like a confirmation modal for external links, leading to improved performance, robust components and elimination of errors.`],
			Img: "/images/project_details/Testing.svg"
		},
		{
			Heading: "Deployment",
			Content: [`The deployment stage considers platforms where the backend and frontend the backend and frontend should be deployed, keeping it cost-effective. Other factors like security, overage costs, and downtime also played an important role. `],
			Img: "/images/project_details/Deployment.svg"
		},
	]
	return (

		<div className="flex flex-col gap-16 p-8">

			{
				PgContent.map((c, i) => (
					<div key={c.Heading} className="flex flex-col gap-4">
						<div className={`grid grid-cols-12 gap-4 md:gap-12 items-center`}>
							<div className={`col-span-12 md:col-span-6 lg:col-span-4 ${i % 2 === 0 ? 'md:order-last' : ''}`}>
								<img src={c.Img} alt={c.Heading} className="h-96 w-96" />
							</div>
							<div className=" col-span-12 md:col-span-6 lg:col-span-8">
								<div className="flex flex-col gap-4">
									<div className="text-primary font-bold text-5xl">
										{c.Heading}
									</div>
									<div className="flex flex-col gap-4">
										{c.Content.map((v, i) => (
											<div key={i}>{v}</div>
										))}
									</div>
								</div>
							</div>

							{c.SubContent
								?
								<div className="col-span-12">
									{c.SubContent}
								</div>
								: null
							}
						</div>




					</div>
				))
			}
		</div>

	)
}

export default ProjectDetailsPg

export const metadata = {

	title: 'Project Details',
	icons: [
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: '/favicons/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			url: '/favicons/favicon-16x16.png',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			url: '/favicons/apple-touch-icon.png',
		},
	],
	description: 'How CryptoMarketVision (CMV) project was made, the whole project development cycle, issues faced etc.',
	alternates: {
		canonical: '/project-details',
	},
	keywords: ['project development', 'project', 'development'],
	applicationName: "CryptoMarketVision (CMV)",
	authors: [{ name: "CryptoMarketVision (CMV)" }],
	generator: 'CryptoMarketVision (CMV)',
	creator: 'CryptoMarketVision (CMV)',
	publisher: 'CryptoMarketVision (CMV)',
	category: 'technology',
	openGraph: {
		title: 'Project Details - SDLC',
		description: 'How CryptoMarketVision (CMV) project was made, the whole project development cycle, issues faced etc.',

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
		title: 'Project Details - SDLC',
		description: 'How CryptoMarketVision (CMV) project was made, the whole project development cycle, issues faced etc.',
		creator: 'CryptoMarketVision',
		images: [`/images/Logo.png`,],
	},

	robots: {
		index: false,
		follow: false,
		nocache: true,
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