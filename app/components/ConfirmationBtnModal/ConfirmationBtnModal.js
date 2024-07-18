'use client'
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'

import { BsExclamationCircleFill } from 'react-icons/bs';

const ConfirmationBtnModal = ({ ActionMsg, Title, YesAction, NoAction, YesActionName, BtnClasses, BtnText, NoActionColor, YesActionColor }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	return (
		<>
			<Button {...BtnClasses} onClick={onOpen}>{BtnText}</Button>
			<Modal
				isDismissable={false}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				backdrop='blur'

				radius='md' shadow='md'
				size='xl'
				isKeyboardDismissDisabled={true}
				hideCloseButton={true}
				placement='center'

			>
				<ModalContent>
					{(onClose) => (

						<div>

							<ModalHeader className='flex gap-2'>
								<BsExclamationCircleFill size={32} className='text-danger' />
								<div className='font-bold'>Are your sure to {Title} ?</div>
							</ModalHeader>
							<ModalBody >
								<div className='text-sm'>
									{
										ActionMsg
									}
								</div>
								<div className='flex flex-row gap-4 justify-center'>
									<Button size='md' radius='md' className='font-bold' color={YesActionColor || "success"} variant="light" onClick={() => {
										NoAction ? NoAction() : null

										onClose()

									}}>
										No
									</Button>
									<Button size='md' radius='md' className='font-bold' color={NoActionColor || "danger"} variant="light" onClick={() => {
										YesAction()
										onClose()
									}}>
										{YesActionName || "Yes"}
									</Button>
								</div>
							</ModalBody>
						</div>


					)}
				</ModalContent>
			</Modal>
		</>
	)
}

export default ConfirmationBtnModal