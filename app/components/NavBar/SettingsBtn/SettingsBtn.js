'use client'
import { ZustandStore } from '@/app/store/store'
import { Button, Card, CardBody, CardHeader, Chip, Input, Modal, ModalBody, ModalContent, ModalHeader, Radio, RadioGroup, Spinner, Tab, Tabs, useDisclosure } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { memo, useEffect, useMemo, useState } from 'react'
import { BsCloudMoon, BsDisplay, BsGearFill, BsGlobe, BsMoonStars, BsSearch, BsSun, BsXCircleFill } from 'react-icons/bs'
import Capitalized from '@/app/utils/Text/Capitalized'
import { FaMoneyBillWave } from 'react-icons/fa6'
import useSWR from 'swr'
import FetchingOptions from '@/app/utils/Swr/FetchingOptions'
import { Fetcher } from '@/app/utils/Swr/Fetcher'
import { StaticCurrencies as DefaultCurrencies } from '@/app/constants/StaticCurrencies'
import { find, sortBy } from 'lodash'
import { Languages } from '@/app/constants/Languages';
import { useShallow } from 'zustand/react/shallow'

const SettingsBtn = () => {
	const { StoreTheme, SetStoreTheme, StoreCurrency, SetStoreCurrency, StoreLocale, SetStoreLocale, } = ZustandStore(useShallow((state) => state))
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [mounted, setMounted] = useState(false)


	const ThemesList = [
		{
			Name: 'Light',
			Key: 'light',
			Description: "Use during daytime",
			Icon: <BsSun size={18} />
		},
		{
			Name: 'Dark',
			Key: 'dark',
			Description: "Use during night time",
			Icon: <BsCloudMoon size={18} />
		},
		{
			Name: 'System',
			Key: 'system',
			Description: "Use system theme",
			Icon: <BsDisplay size={18} />
		},
		{
			Name: 'Amoled',
			Key: 'amoled',
			Description: "For AMOLED display devices",
			Icon: <BsMoonStars size={18} />
		},
	]

	const { setTheme } = useTheme()
	useEffect(() => {
		setMounted(true)
		setTheme(StoreTheme)
	}, [])

	const CurrencyCall = useSWR('/api/exchange_rates', Fetcher, { ...FetchingOptions('0sec') })
	const StaticCurrencies = useMemo(() => DefaultCurrencies, [])
	const [CurSearchTerm, SetCurSearchTerm] = useState("")


	let DataRates = useMemo(() =>
		CurrencyCall.data || StaticCurrencies
		, [CurrencyCall])



	const LanguageList = useMemo(() => Languages, [])
	const [LangSearchTerm, SetLangSearchTerm] = useState("")

	const CurSearchResults = useMemo(() => DataRates.filter(f => f.Name.toLowerCase().includes(CurSearchTerm.toLowerCase()) || f.Symbol.toLowerCase().includes(CurSearchTerm.toLowerCase()) ||
		f.Unit.toLowerCase().includes(CurSearchTerm.toLowerCase()) || f.Type.toLowerCase().includes(CurSearchTerm.toLowerCase()))

		, [CurSearchTerm])

	const LangSearchResults = useMemo(() => LanguageList.filter(v => v.label.includes(LangSearchTerm.toLowerCase().trim()) ||
		v.value.includes(LangSearchTerm.toLowerCase().trim()))
		, [LangSearchTerm])



	return (

		<div>
			<Button size='sm' radius='sm' color='primary' variant='light' onClick={onOpen}
				isIconOnly={true}
				title={`Theme : ${Capitalized(StoreTheme) || null}, Currency : ${StoreCurrency.toUpperCase() || null} & Language : ${StoreLocale.toUpperCase() || null}`}
			><BsGearFill className='hover:animate-spin' size={14} /></Button>
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
				size='5xl'

			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-row justify-between items-center'>
								<div className='flex flex-row gap-2 justify-between items-center mb-2'>
									<BsGearFill size={16} /> Settings
								</div>
								<Button
									onClick={() => {
										SetCurSearchTerm('')
										SetLangSearchTerm('')
										onClose()
									}}
									size='sm'
									radius='lg'
									color='background'
									isIconOnly

								>
									<BsXCircleFill aria-label='Click to Clear' size={18} className='cursor-pointer text-danger' />
								</Button>
							</ModalHeader>
							<ModalBody >
								<Tabs
									radius="sm"
									variant="solid"
									color="primary"
									classNames={{
										tabList: "bg-secondary",
										tabContent:
											"group-data-[selected=true]:text-secondary group-data-[selected=true]:font-bold",
									}}
									aria-label="Settings"

								>
									<Tab key="Theme"
										disabled={!mounted}
										title={
											<div className="flex items-center space-x-2">
												{ThemesList.find(f => f.Key === StoreTheme)['Icon']}
												<span>Theme</span>
											</div>
										}>
										<Card radius='sm' shadow='sm'>
											<CardBody >
												<RadioGroup
													color="primary"
													size='sm'
													value={StoreTheme}
													onValueChange={(theme) => {
														setTheme(theme)
														SetStoreTheme(theme)
													}}
													className='mb-4'
												>

													<div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 scroll-smooth`}>

														{
															ThemesList.map(({ Key, Description, Icon, Name }) => (

																<Radio value={Key} key={Key}>
																	<div className={`ml-2 flex flex-row gap-2 p-4 items-center ${StoreTheme === Key ? 'font-bold text-primary' : ''}`}>
																		<div>
																			{Icon}
																		</div>
																		<div>
																			<div className='flex flex-col'>
																				<div>{Name}</div>
																				<div>{Description}</div>
																			</div>
																		</div>

																	</div>
																</Radio>


															))
														}
													</div>
												</RadioGroup>
											</CardBody>
										</Card>
									</Tab>
									<Tab key="Currency" title={
										<div className="flex items-center space-x-2">
											<FaMoneyBillWave />
											<span>Currency</span>
										</div>
									}
									>
										<Card radius='sm' shadow='sm'>

											<CardHeader className='flex flex-col gap-4 items-start md:flex-row md:justify-between md:items-center'>

												<Input
													aria-label={`Search for a currency by typing its name like USD, INR etc.`}
													placeholder='Search currencies'
													size='sm'
													radius='sm'
													color='background'
													className='text-foreground transition ease-in-out duration-500 max-w-xs'
													variant='flat'
													label=""
													labelPlacement="outside"
													isClearable

													onClear={() => SetCurSearchTerm('')}
													type="text" value={CurSearchTerm || ''}
													startContent={<BsSearch size={14} />}
													endContent={<BsXCircleFill aria-label='Click to Clear' size={14} className='text-danger' />}
													onChange={(e) => { SetCurSearchTerm(e.target.value) }}
												/>



												<div className='text-tiny flex flex-wrap justify-between gap-2'>


													{
														CurSearchTerm.trim().length > 0

															?

															<div >Found : <span className='text-primary font-bold'>{CurSearchResults.length}</span>
															</div>
															:

															<div >Total : <span className='text-primary font-bold'>{CurrencyCall.data.length}</span>
															</div>
													}

													<div >Selected : <span className='text-primary font-bold'>{
														find(DataRates, { Symbol: StoreCurrency.toUpperCase() })['Name']
													} {find(DataRates, { Symbol: StoreCurrency.toUpperCase() })['Symbol']} </span></div>

												</div>



											</CardHeader>
											<CardBody >
												<div className='overflow-y-visible h-96 '>
													<RadioGroup
														color='primary'
														defaultValue={StoreCurrency}
														orientation="horizontal"
														className='text-tiny text-primary'
													>
														{
															CurrencyCall.isLoading
																?
																<Spinner size='md' title='Getting Currencies ...' color="primary" />
																:

																<RadioGroup
																	color='primary'
																	defaultValue={StoreCurrency}
																	orientation="horizontal"
																	className='text-tiny text-primary'
																>
																	<div className='grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 scroll-smooth'>
																		{
																			[...CurSearchTerm.trim().length > 0 ? CurSearchResults : DataRates].map(({ Name, Symbol, Type, Unit }) => (
																				<Radio
																					key={Symbol.toLowerCase()}
																					value={Symbol.toLowerCase()}
																					variant='flat'
																					className={`flex gap-2`}
																					onClick={() => {
																						SetStoreCurrency(Symbol.toLowerCase())
																						SetCurSearchTerm('')
																					}}
																				>



																					<div className={`text-small ${StoreCurrency === Symbol ? "font-bold text-primary" : ''} `}>{Name} ({Unit})</div>

																					<div className={`text-small ${StoreCurrency === Symbol ? "font-bold text-primary" : ''} `}>{Symbol}</div>

																					<Chip size='sm' radius='sm' variant='flat' className='text-tiny' color="primary">{Type}</Chip>



																				</Radio>
																			))
																		}
																	</div>
																</RadioGroup>

														}
													</RadioGroup>
												</div>

											</CardBody>
										</Card>
									</Tab>
									<Tab key="Language" title={
										<div className="flex items-center space-x-2">
											<BsGlobe />
											<span>Language</span>
										</div>
									}>
										<Card radius='sm' shadow='sm'>
											<CardHeader className='flex flex-col gap-4 items-start md:flex-row md:justify-between md:items-center'>

												<Input
													placeholder='Search languages'
													size='sm'
													radius='sm'
													color='background'
													className='text-foreground transition ease-in-out duration-500 max-w-xs'
													variant='flat'
													isClearable
													aria-label="Search for Languages"
													label=""
													labelPlacement="outside"
													onClear={() => SetLangSearchTerm('')}
													type="text" value={LangSearchTerm || ''}
													startContent={<BsSearch size={14} />}
													endContent={<BsXCircleFill aria-label='Click to Clear' size={14} className='text-danger' />}
													onChange={e => SetLangSearchTerm(e.target.value)}
												/>
												<div className='text-tiny flex flex-wrap justify-between  items-center gap-2'>


													{
														LangSearchTerm.trim().length > 0

															?

															<div >Found : <span className='text-primary font-bold'>{LangSearchResults.length}</span>
															</div>
															:
															<div >Total : <span className='text-primary font-bold'>{LanguageList.length}</span>
															</div>

													}
													<div className='flex items-center gap-1'>
														<div >
															Selected :
														</div>
														<div className='text-primary font-bold'>
															{LanguageList.find(l => l.value === StoreLocale).label}
														</div>
														<Chip radius='sm' color='secondary' className='text-tiny'
															size='sm'>{LanguageList.find(l => l.value === StoreLocale).value.toUpperCase()}</Chip>
													</div>
												</div>

											</CardHeader>
											<CardBody>
												<div className='overflow-y-visible h-96 '>
													<RadioGroup
														color='primary'
														defaultValue={StoreLocale}
														className='text-tiny text-primary'
													>
														<div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:gap-8 scroll-smooth'>


															{
																[...LangSearchTerm.trim().length > 0 ? LangSearchResults : LanguageList].map((c, i) => {
																	return (

																		<Radio
																			key={c.value}
																			value={c.value}
																			variant='flat'
																			className={`${StoreLocale === c.value ? "font-bold text-primary" : ''}`}
																			onClick={() => {
																				SetStoreLocale(c.value)
																				SetLangSearchTerm('')
																			}}
																		>
																			<div className='flex flex-col gap-2 text-small'>
																				<div className={`${StoreLocale === c.value ? "font-bold text-primary" : ''}`}>{c.label}</div>
																				<Chip radius='sm' className={`${StoreLocale === c.value ? "font-bold text-primary" : ''}`} size='sm' color='secondary'>{c.value.toUpperCase()}</Chip>
																			</div>


																		</Radio>


																	)
																})
															}
														</div>

													</RadioGroup>
												</div>
											</CardBody>
										</Card>
									</Tab>
								</Tabs>

							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
}

export default memo(SettingsBtn)