'use client'
import { useEffect, useRef } from 'react'

import dynamic from "next/dynamic";
const InfoPopup = dynamic(() => import('../InfoPopup/InfoPopup'));
const Attribution = dynamic(() => import('../Attribution/Attribution'));

import { usePathname, useRouter } from "next/navigation";

const SectionHeader = ({ SectionName, InfoContentTitle, InfoContent, SectionID, DisableAttribution }) => {

	const LinkRef = useRef()
	const router = useRouter()
	const PathName = usePathname()


	return (
		<div className='flex justify-between items-start align-top gap-2 flex-wrap mb-4' id={SectionID}>

			<div className='flex items-center'>
				<h1
					ref={LinkRef}
					onClick={() => {
						if (SectionID) {
							router.push(PathName + "#" + SectionID)
						}

					}}
					className='text-primary cursor-pointer font-bold text-lg font-Noto block'>{SectionName} </h1>
				<div>
					{
						InfoContent ? <InfoPopup
							ContentTitle={InfoContentTitle}
							Content={InfoContent}
						/>
							: null
					}
				</div>
			</div>
			<div>

				{
					DisableAttribution ? null : <Attribution />
				}
			</div>





		</div>
	)
}

export default SectionHeader