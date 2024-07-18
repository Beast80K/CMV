'use client'
import { memo, useState } from 'react'
import { BsSearch, BsXCircleFill } from 'react-icons/bs'
import { Button, Card, CardBody, Input, Spinner, Tab, Tabs, User } from '@nextui-org/react'
import useSWRMutation from 'swr/mutation'
import { Fetcher } from '@/app/utils/Swr/Fetcher'

import dynamic from "next/dynamic";
const ComponentLevelError = dynamic(() => import('../ComponentLevelError/ComponentLevelError'));

const WatchListBtn = dynamic(() => import('../WatchList/WatchListBtn/WatchListBtn'));
const MyTable = dynamic(() => import('../MyTable/MyTable'));
const SnippetRenderer = dynamic(() => import('../MyTable/Renderers/SnippetRenderer'));
const WatchListHeader = dynamic(() => import('../MyTable/Headers/WatchListHeader'));


import SectionHeader from '../SectionHeader/SectionHeader'
import TransitionDiv from '../TransitionDiv/TransitionDiv'
import TabsSkeleton from '../Skeletons/TabsSkeleton'

const Search = () => {
	try {
		const [SearchTerm, SetSearchTerm] = useState("")

		const SearchCall = useSWRMutation('/api/search?query=' + SearchTerm, Fetcher)

		return (
			<TransitionDiv>

				<Card>
					<CardBody>
						<SectionHeader
							SectionID={"Search"}
							SectionName={"Search"}
							InfoContentTitle={"Search"}
							InfoContent={<ul className='list-disc'>
								<li className='ml-4'>Can't remember exact cryptocurrency name ? Search for it from hundreds of Coins, NFTs, Exchanges & Categories.</li>
								<li className='ml-4'>Please enter search keyword more than 2 letters.</li>
							</ul>}
						/>


						<div className='flex justify-center gap-2 items-center mb-8'>


							<Input
								autoFocus={true}
								fullWidth={false}
								placeholder='Search'
								aria-label='Search for Coins, Exchanges, NFTs & Categories'
								size='md'
								radius='sm'
								label=""
								labelPlacement='outside'
								className='max-w-lg text-foreground transition ease-in-out duration-500 shadow-lg'
								variant='flat'
								isClearable
								onClear={() => {
									SetSearchTerm('')
									SearchCall.reset()
								}}
								onKeyDown={(e) => {
									e.key === "Enter" && SearchTerm.trim().length > 2 ? SearchCall.trigger() : null
								}}
								type="text"
								startContent={<BsSearch />}
								endContent={<BsXCircleFill aria-label='Click to Clear' size={16} className='text-danger' />}
								onChange={(e) => {
									SetSearchTerm(e.target.value);
								}}
								value={SearchTerm}
								isDisabled={SearchCall.isMutating}

							/>


							<Button
								size='md'
								variant='solid'
								color='primary'
								radius='sm'
								className='text-white'
								onClick={() => {
									SearchCall.trigger()
								}}
								isDisabled={SearchCall.isMutating || !SearchTerm || SearchTerm.trim().length < 2}
							>
								<BsSearch />
							</Button>

						</div>


						{

							SearchCall.isMutating
								?
								<TabsSkeleton>
									<Spinner label={`Getting Coin for ${SearchTerm}`} color="primary" labelColor="primary" />
								</TabsSkeleton>
								:
								SearchCall.error
									?
									<ComponentLevelError ErrorObj={SearchCall.error} Msg={SearchCall.error?.response?.data || "Error Occured while getting Search Results"} Mutate={SearchCall.reset} />
									:
									SearchCall.data
										?
										<div className='flex flex-col gap-4'>



											<div className='text-tiny'>
												Found {SearchCall.data.coins.length} Coins, {SearchCall.data.nfts.length} NFTs, {SearchCall.data.exchanges.length} Exchanges & {SearchCall.data.categories.length} Categories for <b>"{SearchTerm}"</b>.
											</div>

											<Tabs

												radius='sm'
												variant='solid'
												color='primary' classNames={{
													tabList: "bg-secondary",
													tabContent: "group-data-[selected=true]:text-secondary group-data-[selected=true]:font-bold"
												}} aria-label="Tab">

												<Tab key="coins"
													title={"Coins"}
												>

													<MyTable

														GoToLink={'/coins'}
														Data={SearchCall.data.coins}

														ColumnsList={[
															{
																headerName: "Sr. No.",
																field: "sr_no",
																pinned: 'left',
																resizable: 'false',
																maxWidth: 80,

															},
															{
																headerName: 'Watchlist',
																headerComponent: WatchListHeader,
																field: 'watchlist', hide: false, sortable: false,
																cellRenderer: memo(function ({ data }) {
																	return <WatchListBtn DataObj={data} />
																}),
																pinned: 'left',

															},
															{
																headerName: 'Name', field: 'name', hide: false,
																cellRenderer: memo(({ data }) => <User
																	name={data.name}
																	description={data.symbol.toUpperCase()}
																	avatarProps={{
																		src: data.large || data.small || data.thumb || data.image
																	}}
																/>),
																pinned: 'left',
															},
															{ headerName: 'ID', field: 'id', hide: false, cellRenderer: memo(SnippetRenderer), },

														]}


													/>

												</Tab>

												<Tab key="nfts"
													title={"NFTs"}
												>

													<MyTable

														GoToLink={'/nfts'}
														Data={SearchCall.data.nfts}

														ColumnsList={[
															{
																headerName: "Sr. No.",
																field: "sr_no",
																pinned: 'left',
																maxWidth: 120,
															},
															{
																headerName: 'Name', field: 'name', hide: false,
																cellRenderer: ({ data }) => <User
																	name={data.name}
																	description={data.symbol.toUpperCase()}
																	avatarProps={{
																		src: data.large || data.small || data.thumb || data.image
																	}}
																/>
															},
															{ headerName: 'ID', field: 'id', hide: false, cellRenderer: memo(SnippetRenderer), },
														]}
													/>

												</Tab>

												<Tab key="exchanges"
													title={"Exchanges"}
												>

													<MyTable

														GoToLink={'/exchanges'}
														Data={SearchCall.data.exchanges}

														ColumnsList={[
															{
																headerName: "Sr. No.",
																field: "sr_no",
																pinned: 'left',
																maxWidth: 120,
															},
															{
																headerName: 'Name', field: 'name', hide: false,
																cellRenderer: memo(({ data }) => <User
																	name={data.name}
																	description={null}
																	avatarProps={{
																		src: data.large || data.small || data.thumb || data.image
																	}}
																/>)
															},
															{ headerName: 'ID', field: 'id', hide: false, cellRenderer: memo(SnippetRenderer), },
															{ headerName: 'Market Type', field: 'market_type', hide: false, },
														]}
													/>


												</Tab>
												<Tab key="categories"
													title={"Categories"}
												>




													<MyTable

														Data={SearchCall.data.categories}

														ColumnsList={[
															{
																headerName: "Sr. No.",
																field: "sr_no",
																maxWidth: 120,
															},
															{
																headerName: 'Name', field: 'name', hide: false,
															},
														]}
													/>

												</Tab>

											</Tabs>


										</div>
										:
										<div className="flex flex-col items-center gap-4 text-center">
											<img src='/images/Searching2.svg'
												alt="Searching Image"
												className="h-96 w-96" />
											<div className='text-sm font-bold mb-8'>
												Search for Coins, Exchanges, NFTs & Categories !
											</div>
										</div>
						}
					</CardBody>
				</Card>
			</TransitionDiv>

		)
	} catch (e) {
		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While loading Search section, an error occured !"}
		/>
	}
}

export default Search