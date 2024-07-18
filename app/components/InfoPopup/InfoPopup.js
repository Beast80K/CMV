'use client'
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { useState } from "react";
import { BsInfoCircle } from 'react-icons/bs';


const InfoPopup = ({ ContentTitle, Icon, IconSize, Content }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (

		<Popover
			size='sm'
			shadow='lg'
			radius='sm'
			isOpen={isOpen}
			onOpenChange={(open) => setIsOpen(open)}
			className='rounded-sm shadow-sm transition ease-in-out duration-500'
			placement="bottom"
			aria-label='Info Button'
		>
			<PopoverTrigger
				className='cursor-pointer'
				aria-label='Info Trigger'
			>
				<Button
					className='bg-transparent flex flex-row gap-2 items-center text-primary text-small'
					isIconOnly={true}
					size="sm"
					radius="full"
					variant="flat"
					color="primary"
					aria-label='Click to read info'
				>
					{Icon || <BsInfoCircle size={IconSize || 14} />}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='bg-secondary text-foreground p-4' >
				<div >
					{
						ContentTitle ?
							<div className="text-tiny font-bold mb-2">{ContentTitle}</div>
							:
							null
					}
					{
						Content ?
							<div className="text-tiny">
								{Content}
							</div>
							:
							null
					}
				</div>
			</PopoverContent>
		</Popover >
	)
}

export default InfoPopup