'use client'

import { Button } from "@nextui-org/react"
import TransitionDiv from "./components/TransitionDiv/TransitionDiv"
import { BsArrowClockwise } from "react-icons/bs"
import { Noto_Sans } from "next/font/google"

const NotoFont = Noto_Sans({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["cyrillic", "cyrillic-ext", "devanagari", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
	variable: '--font-Noto',
	display: "swap"
})
export default function GlobalError({ error, reset }) {



	return (
		<html lang="en" suppressHydrationWarning >
			<body className={`${NotoFont.variable} bg-background text-foreground font-Noto selection: selection:bg-primary`}>
				<TransitionDiv>
					<div className='flex flex-col gap-4 justify-center h-screen items-center  text-foreground'>

						<div className='flex flex-col gap-2'>



							<h1
								className='text-4xl md:text-8xl text-danger font-Noto font-bold'
							>
								Error
							</h1>
							<p className='font-medium'>While loading this page, an error occured ! </p>
						</div>



						<img src="/images/Error.svg" alt="Error" className="h-96 w-96" />
						<Button
							title="Retry"
							aria-label="Retry Button"
							color='success'
							variant='flat'
							className='font-bold text-success'
							onClick={reset}
							endContent={<BsArrowClockwise />}
						>Retry</Button>

						<div className='font-bold text-danger'>{error.toString()}</div>

						<div className='font-bold text-sm text-center text-primary'>
							<div>CryptoMarketVision (CMV)</div>
						</div>
					</div>
				</TransitionDiv>
			</body>
		</html>
	)
}

