'use client'
import { Navbar, NavbarBrand, Link, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Badge } from "@nextui-org/react";
import NextLink from "next/link";
import { usePathname } from 'next/navigation'
import { BsList, BsXLg } from 'react-icons/bs';

import { ZustandStore } from '@/app/store/store';
import { useShallow } from 'zustand/react/shallow';
import { useState } from "react";

import SettingsBtn from "./SettingsBtn/SettingsBtn";

const NavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { StoreWatchlistCoins } = ZustandStore(useShallow((state) => state))



	const NavItems = [
		{
			name: 'Search',
			link: "/search"
		},
		{
			name: 'Categories',
			link: "/categories"
		},
		{
			name: 'Coins',
			link: "/coins"
		},
		{
			name: 'Derivatives',
			link: "/derivatives"
		},
		{
			name: 'Exchanges',
			link: "/exchanges"
		},

		{
			name: 'NFTs',
			link: "/nfts"
		},
		{
			name: 'Watchlist',
			link: "/watchlist"
		},

	];

	function CloseMenuBar() {
		setIsMenuOpen(false)
	}



	return (


		<Navbar
			onMenuOpenChange={setIsMenuOpen} isBordered
			isMenuOpen={isMenuOpen}
			maxWidth={'full'}
			isBlurred={false}
			position='static'
			className=' print:hidden'
		>
			<NavbarContent className='gap-2' justify="end" >
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Menu is Closed" : "Menu is Opened"}
					className="xl:hidden"
					icon={isMenuOpen ? <BsXLg size={18} /> : <BsList size={18} />}

				/>
				<NavbarBrand className='gap-2'>

					<Link
						aria-label='Go to home page'
						onClick={CloseMenuBar}
						href='/' className="font-extrabold flex-row select-none flex font-Noto text-primary text-xl gap-1" as={NextLink}>
						<div><img src={'/images/Logo.svg'} aria-label='CMV' alt="CMV" width="32" height="32" /></div>
						<div>CMV</div>
					</Link>
				</NavbarBrand>



			</NavbarContent>


			<NavbarMenu className="flex gap-8 pt-4">
				{
					NavItems.map((l, ind) =>
						<NavbarMenuItem key={ind}>
							<Button
								size='lg'
								radius='lg'
								variant='light'
								color={'primary'}
								className={`w-full p-4 ${usePathname() === l.link ? "font-bold bg-primary  text-white" : "text-primary  "}`}
								href={l.link}
								onClick={CloseMenuBar}
								as={NextLink}>
								{l.name}
							</Button>
						</NavbarMenuItem>
					)
				}


			</NavbarMenu>



			{/* PC */}
			<NavbarContent className="xl:flex items-center gap-4 font-Noto" justify="end">
				{/* THESE 3 ITEMS ALWAYS VISIBLE */}


				<NavbarItem >
					<SettingsBtn />
				</NavbarItem>

				{/* THIS ARE NAVBAR LINKS VISIBLE IN PC */}

				<div className='hidden xl:flex gap-4'>



					{
						NavItems.map((l, ind) =>
							<NavbarItem key={ind}
								isActive={usePathname() === l.link}>

								{
									l.link === '/watchlist'
										?
										<Badge
											isDot={true}
											color='primary'
											size='sm'
											shape='circle'
											variant='solid'
											isInvisible={!StoreWatchlistCoins.length || usePathname() === l.link}
											content={""}
											className='animate-pulse'
										>

											<Button
												size='sm'
												radius='sm'
												variant='light'
												color={'primary'}
												className={`p-4 text-tiny ${usePathname() === l.link ? "bg-primary text-white font-bold" : " text-primary  "}`}
												href={l.link}
												as={NextLink}>
												{l.name}
											</Button>
										</Badge>

										:

										<Button
											size='sm'
											radius='sm'
											variant='light'
											color={'primary'}
											className={`p-4 text-tiny ${usePathname() === l.link ? "bg-primary text-white font-bold" : "text-primary "}`}
											href={l.link}
											as={NextLink}>
											{l.name}
										</Button>
								}
							</NavbarItem>
						)
					}
				</div>

			</NavbarContent>




		</Navbar>

	)
}

export default NavBar