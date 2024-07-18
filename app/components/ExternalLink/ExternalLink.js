'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Snippet } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from 'react'
import { BsBoxArrowUpRight, BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa6";

const ExternalLink = ({ ExternalLink, ExternalLinkName }) => {

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const router = useRouter()
	return (
		<div>
			<Button
				ref={(ref) => {
					if (!ref) return;
					ref.onclick = (e) => {
						onOpen()
						e.stopPropagation();
					};
				}}
				size="sm"
				color="primary"
				variant='light'
				title={ExternalLink}
				aria-label={ExternalLinkName || new URL(ExternalLink).hostname || new URL(ExternalLink).host || ExternalLink}
			>
				{
					ExternalLinkName ?
						ExternalLinkName
						:
						new URL(ExternalLink).hostname || new URL(ExternalLink).host || ExternalLink}
				<BsBoxArrowUpRight />
			</Button>
			<Modal
				isDismissable={false}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				backdrop='blur'
				radius='md' shadow='md'
				isKeyboardDismissDisabled={true}
				hideCloseButton={true}
				placement='center'
				scrollBehavior='inside'
				size='4xl'

			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-row justify-between items-center'>
								<div className='flex flex-row gap-2 justify-between items-center mb-2 text-danger'>
									<BsBoxArrowUpRight size={22} />	Go to external website ?
								</div>
								<Button
									onClick={onClose}
									size='sm'
									radius='lg'
									color='background'
									isIconOnly

								>
									<BsXCircleFill aria-label='Click to Clear' size={18} className='cursor-pointer text-danger' />
								</Button>
							</ModalHeader>
							<ModalBody>
								<div className="text-sm">
									If you are sure about the external link, then only you may proceed to go on it.
									We don't take any warranty or guarantee that this external link is safe.
								</div>

								<Snippet
									hideSymbol={true}
									radius="sm"
									size="sm"
									fullWidth={false}

									variant="flat"
									color="secondary"
									copyIcon={
										<FaRegCopy />
									}
									checkIcon={
										<BsFillCheckCircleFill />
									}
									className="text-tiny bg-secondary text-primary max-w-max"
									codeString={ExternalLink}
									tooltipProps={{
										showArrow: true,
										size: "sm",
										content: "Copy External ExternalLink ",
										color: "secondary",
										className: "text-foreground shadow-md",
									}}
								>
									{ExternalLink}
								</Snippet>

							</ModalBody>
							<ModalFooter className="flex justify-center items-center ">
								<Button color="danger" variant="light" onPress={onClose}>
									No
								</Button>
								<Button color="success" variant="light" onPress={() => {
									router.push(ExternalLink)
									onClose()
								}}>
									Yes
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
}

export default ExternalLink