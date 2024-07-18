'use client'
import dynamic from "next/dynamic"
const TransitionDiv = dynamic(() => import("@/app/components/TransitionDiv/TransitionDiv"))


import { Input, Textarea, Select, SelectItem, Checkbox, Button } from "@nextui-org/react";
import { BsBugFill, BsChatLeftTextFill, BsChatTextFill, BsSend, BsXCircleFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaPeopleRobbery, FaQuestion, FaStarOfLife } from 'react-icons/fa6';
import SectionHeader from '../../SectionHeader/SectionHeader';
import { toast } from 'sonner';


const ContactUs = () => {

	const schema = yup.object({
		Firstname: yup.string().trim()
			.required("Firstname can't be empty !")
			.min(2, "Firstname too small !").max(25, "Firstname too big !")
			.matches(/[a-z]+$/, 'Contains Invalid characters !')
		,
		Lastname: yup.string().trim()
			.required("Lastname can't be empty !")
			.min(2, "Lastname too small !").max(25, "Lastname too big !")
			.matches(/[a-z]+$/, 'Contains Invalid characters !')
		,
		Email: yup.string().email().trim()
			.required("Email can't be empty !")
			.min(6, "Email too small !").max(50, "Email too big !"),
		Message: yup.string().trim()
			.required("Message can't be empty !")
			.min(2, "Message too small !").max(4096, "Message too big !"),
		Agree: yup.bool().oneOf([true], 'You must agree & allow us to use this information.')




	})

	const ContactForm = useForm({
		defaultValues: {
			Firstname: "",
			Lastname: "",
			Email: "",
			Message: "",
			Agree: true
		},
		resolver: yupResolver(schema),
		mode: 'onChange'
	});

	const { register, handleSubmit, formState, setValue, getValues, getFieldState, watch, reset } = ContactForm

	const { errors, dirtyFields, touchedFields, isSubmitting } = formState

	const onSubmit = (data) => {
		toast.success("Message was sent sucessfully !", 3000)
		reset()
	}



	const MsgLength = watch('Message')


	return (
		<TransitionDiv >


			<div className='p-8 flex flex-col gap-8'>

				<div className='flex flex-col gap-2 text-center'>


					<h1
						className='text-4xl md:text-8xl text-primary font-Noto font-bold'
					>
						Contact Us
					</h1>
					<div className='font-medium text-sm md:text-md'>

						<div>Any queries no matter how big or small. </div>
					</div>
				</div>




				<div className=' flex flex-col gap-8 items-center justify-center'>




					<img src='/images/ContactUs.svg' className="h-96 w-96" alt='Contact Us image' />




					<div className='w-full lg:w-8/12'>
						<div className='flex flex-col md:flex-row  gap-8 md:items-center justify-center'>
							<div className='flex flex-col gap-2 items-center'>

								<div className='text-primary font-bold text-3xl'>
									99+
								</div>
								<div className='text-md'>
									Customers Helped/Hr.
								</div>
							</div>

							<div className='flex flex-col gap-2 items-center'>
								<div className='text-primary font-bold text-3xl'>
									1.6 sec.
								</div>
								<div className='text-md'>
									Avg. Response Time
								</div>
							</div>

							<div className='flex flex-col gap-2 items-center'>
								<div className='text-primary font-bold text-3xl'>
									100%
								</div>
								<div className='text-md'>
									Accurate Response
								</div>
							</div>

							<div className='flex flex-col gap-2 items-center'>
								<div className='text-primary font-bold text-3xl'>
									1,000+
								</div>
								<div className='text-md'>
									Experts available
								</div>
							</div>


						</div>

					</div>
				</div>

				<div className='flex flex-wrap gap-8 mx-auto items-center justify-center'>



					<div className='w-full lg:w-9/12 xl:w-6/12'>

						{/* <div id='contactform' className='text-lg font-bold mb-4'>Send us your query</div>
                     */}

						<SectionHeader
							DisableAttribution={true}
							SectionID={"ContactForm"}
							SectionName={"Send us your query"}
						/>

						<form className='grid grid-cols-2 gap-4 '
							onSubmit={handleSubmit(onSubmit)}
							noValidate
							autoComplete="off"

						>





							<Input

								type="text" fullWidth={false}
								isClearable={true}
								isRequired={true}
								color="primary"
								variant={'bordered'}
								label="Firstname"
								className='col-span-2 md:col-span-1'

								placeholder="Ex. John"
								{...register('Firstname')}
								isInvalid={Boolean(errors?.Firstname?.message && errors?.Firstname)}
								errorMessage={errors?.Firstname?.message}
								onClear={() => {
									setValue("Firstname", '')

								}}
								endContent={<BsXCircleFill aria-label='Click to Clear' className="text-danger" />}

							/>


							<Input
								isRequired={true}
								type="text" fullWidth={false}
								className='col-span-2 md:col-span-1'
								isClearable={true} color="primary" variant={'bordered'} label="Lastname" placeholder="Ex. Doe"

								{...register('Lastname')}
								isInvalid={Boolean(errors?.Lastname?.message && errors?.Lastname)}
								errorMessage={errors?.Lastname?.message}
								onClear={() => {
									setValue("Lastname", '')
								}}
								endContent={<BsXCircleFill aria-label='Click to Clear' className="text-danger" />}

							/>


							<Input
								isRequired={true}
								className='col-span-2 md:col-span-1'
								type="email" fullWidth={false}
								isClearable={true} color="primary" variant={'bordered'} label="Email" placeholder="Ex. email@id.com"
								{...register('Email')}
								isInvalid={Boolean(errors?.Email?.message && errors?.Email)}
								errorMessage={errors?.Email?.message}
								onClear={() => {
									setValue("Email", '')
								}}
								endContent={<BsXCircleFill aria-label='Click to Clear' className="text-danger" />}


							/>

							<Select
								label="Subject"
								fullWidth={false}
								isClearable={true}
								color="primary" variant={'bordered'}
								labelPlacement="inside"
								defaultSelectedKeys={['Other']}
								className='col-span-2 md:col-span-1'

							>
								{[
									{
										'name': 'Bugs/Glitches',
										'desc': 'Ex. When I did, this that happened.',
										'icon': <BsBugFill size={18} />
									},
									{
										'name': 'Feedback',
										'desc': 'Ex. New UI is good.',
										'icon': < BsChatLeftTextFill size={18} />
									},
									{
										'name': 'Query/Question',
										'desc': `Ex. Can't understand Privacy Policy`,
										'icon': <FaQuestion size={18} />
									},
									{
										'name': 'Scam/Misuse',
										'desc': `Ex. Scamming using your CryptoMarketVision (CMV)' assets.`,
										'icon': <FaPeopleRobbery size={18} />
									},
									{
										'name': 'Suggestion',
										'desc': 'Ex. Add this option.',
										'icon': < BsChatTextFill size={18} />

									},
									{
										'name': 'Other',
										'desc': `Ex. Something that doesn't falls in above options.`,
										'icon': < FaStarOfLife size={18} />
									},
								].map((v) => (
									<SelectItem
										className={`transition ease-in-out duration-300`}
										description={v.desc}
										startContent={v.icon}
										key={v.name} value={v.name}>
										{v.name}
									</SelectItem>
								))}
							</Select>




							<Textarea
								isRequired={true}
								rows={6}

								label="Message"
								labelPlacement="inside"
								placeholder="Explain your query"
								color="primary" variant={'bordered'}
								className='col-span-2'
								{...register('Message')}
								isInvalid={Boolean(errors?.Message?.message && errors?.Message)}
								errorMessage={errors?.Message?.message}

								description={`${MsgLength?.length || 0}/4096`}

							/>


							<div className='col-span-2'>

								<div className='flex flex-col gap-2 '>

									<Checkbox defaultSelected
										color='primary'
										classNames={{
											label: 'text-tiny',
											base: 'text-white'
										}}
										size='md'

										{...register('Agree')}
										isInvalid={Boolean(errors?.Agree?.message && errors?.Agree)}


									>
										I agree to terms of CryptoMarketVision (CMV).
									</Checkbox>

									<div className='text-tiny'>
										CryptoMarketVision (CMV) will use this data only for contacting you & to improve services (only query & subject),
										we will not use this data for marketing purpose,
										we will not sell, disclose,store this data, we will discard all data except query & subject after contacting you.


									</div>
								</div>
							</div>
							<div >

								<Button
									type='submit'
									size='md'
									radius='sm'
									color="primary"
									variant='solid'
									className='col-span-2 text-white'
									endContent={<BsSend size={16} />}
								>
									Send
								</Button>

							</div>


						</form>


					</div>

				</div>


			</div>



		</TransitionDiv >
	)
}

export default ContactUs