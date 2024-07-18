'use client'

import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


import {
	Input, Dropdown, DropdownTrigger,
	DropdownMenu,
	DropdownItem, Button,
	Spinner, Modal, ModalContent, ModalBody,
	Popover, PopoverTrigger, PopoverContent,
	Divider, Chip,

	Pagination,
	User
} from "@nextui-org/react";

import dynamic from 'next/dynamic';
import { BsArrows, BsCheckCircleFill, BsChevronDown, BsExclamationCircleFill, BsEyeFill, BsEyeSlashFill, BsFillPinAngleFill, BsGearFill, BsPin, BsPinAngleFill, BsSearch, BsXCircleFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';

const DataNotThere = dynamic(() => import("../DataNotThere/DataNotThere"))

import { useRouter } from 'next/navigation'


import './MyTable.css'
import { FaListOl } from 'react-icons/fa6';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { ZustandStore } from '@/app/store/store';



const MyTable = ({ ColumnsList, Data, isBasic, GoToLink, LinkKey, DisableLimit, DisableColSettings }) => {



	const gridRef = useRef();
	const [GridApi, setGridApi] = useState(null)
	const { resolvedTheme } = useTheme()

	const { StoreRowDblClickMsg, SetStoreRowDblClickMsg } = ZustandStore(useShallow((state) => state));

	const MyRouter = useRouter()
	const BasicTable = useMemo(() => isBasic !== undefined ? isBasic : Data.length > 10 ? false : true, [])

	// IF isBasic is not passed, then check length of data Data.length > 10 then table is not basic, else its basic
	// if isBasic is passed then set it

	const Link_Key = useMemo(() => LinkKey ? LinkKey : "id")

	const Disable_Limit = useMemo(() => DisableLimit ? DisableLimit : false)
	const Disable_ColSettings = useMemo(() => DisableColSettings ? DisableColSettings : false)


	const data = useMemo(() => [...Data.map((v, i) => ({
		sr_no: i + 1,
		...v
	}))], [Data])

	const [columnDefs, SetcolumnDefs] = useState(ColumnsList);

	const AllColumnsField = useMemo(() => ColumnsList.map(({ field }) => field), [ColumnsList])
	const [SelectedRows, SetSelectedRows] = useState();
	const LimitResults = ["10", "20", "30", "40"]
	const [PageSize, SetPageSize] = useState(new Set(["10"]))
	const [PaginationMsg, SetPaginationMsg] = useState(null)
	const [FilterText, SetFilterText] = useState("");
	const defaultColDef = useMemo(() => ({
		sortable: true,
		flex: 1,
		minWidth: 80,
		maxWidth: 500,
		pinned: false,

		hide: false,
		cellStyle: { fontSize: '12px' },
		resizable: true,
		lockPinned: true,
		enableCellChangeFlash: true,


	}), [])

	function HideColumns({ ID, ShowAll = false } = {}) {
		try {
			//  IF ALL IS SELECTED THEN CHANGE KEY hide to TRUE

			if (ShowAll) {
				let tmp = columnDefs.map(c => {

					c.hide = false
					return c
				}
				)
				SetcolumnDefs([...tmp])
			}

			else {
				let index = [...columnDefs].findIndex(f => f.field === ID)
				let tmp = [...columnDefs]
				tmp[index]['hide'] = !tmp[index]['hide']
				SetcolumnDefs([...tmp])

			}
		} catch (e) {

		}

	}

	function PinColumn({ ID = null, Direction = 'left', Reset = false } = {}) {

		try {
			if (Reset) {
				let tmp = columnDefs.map(c => {
					delete c.pinned
					return c
				}
				)
				SetcolumnDefs([...tmp])
			}
			else {
				if (!Direction) {
					let index = [...columnDefs].findIndex(f => f.field === ID)
					let tmp = [...columnDefs]
					delete tmp[index]['pinned']

					SetcolumnDefs([...tmp])

				}
				else {
					let index = [...columnDefs].findIndex(f => f.field === ID)
					let tmp = [...columnDefs]
					tmp[index]['pinned'] = Direction

					SetcolumnDefs([...tmp])

				}


			}
		} catch (e) {

		}
	}

	const onSelectionChanged = () => {
		const selectedRows = gridRef.current.api.getSelectedRows();
		if (selectedRows.length > 0) {
			SetSelectedRows(selectedRows)
		}
	}

	const GetSelected = useMemo(() => SelectedRows?.length > 0 ? SelectedRows[0] : "", [SelectedRows])
	const onGridReady = (params) => {
		setGridApi(params.api);
	}

	const Paginator = () => {
		if (GridApi) {
			const curPg = GridApi.paginationGetCurrentPage();
			const totalPgs = GridApi.paginationGetTotalPages();
			const totalResults = GridApi.paginationGetRowCount();
			const pageSize = GridApi.paginationGetPageSize();
			const from = curPg * pageSize + 1;
			const till = Math.min(from + pageSize, totalResults);
			let visibleRows = till - from + 1
			FilterText
				?
				SetPaginationMsg(visibleRows === 0 ? `Found 0 Results` : `Results ${from} - ${till} of ${visibleRows}`)
				:
				SetPaginationMsg(`Results ${from} - ${till} of ${totalResults} `)
		}
	}
	function AutoSizeAll() {
		if (GridApi) {
			GridApi.sizeColumnsToFit();
		}
	}



	useMemo(() => {
		Paginator()
	}, [GridApi])





	return (
		<div className='mb-4 text-foreground'>

			{
				Data.length > 0 && Data
					?
					<div className='flex flex-col gap-2'>

						<div className='flex gap-4 flex-wrap flex-row justify-between items-center'>


							<div>
								<Input
									variant='flat'
									isClearable={true}
									size='sm'
									radius='sm'
									fullWidth={false}
									value={FilterText}
									// label="Search"
									labelPlacement='outside'
									className='text-foreground max-w-sm transition ease-in-out duration-300 rounded-lg'
									onClear={() => { SetFilterText("") }}
									onChange={(e) => { SetFilterText(e.target.value) }}
									startContent={<BsSearch />}
									endContent={<BsXCircleFill aria-label='Click to Clear' size={16} className='text-danger' />}
									placeholder='Search in table'
								/>
							</div>


							<div className='text-tiny'>
								{PaginationMsg}
							</div>
						</div>
						<div className='flex gap-4 flex-row justify-between items-center'>
							<div>
								<div className='flex items-center gap-2'>
									{
										Disable_ColSettings
											?
											null
											:
											<Popover placement="top" showArrow={true}>
												<PopoverTrigger>
													<Button
														variant="light"
														color='primary'
														size='sm'
														startContent={<BsGearFill className='hover:animate-spin' />}
														endContent={<div className='flex gap-1 items-center'>
															<Chip size="sm" color='primary' variant='light' classNames={{
																content: 'font-bold flex gap-2 items-center'
															}}><BsPinAngleFill /> {columnDefs.filter(f => f.pinned === 'left').length} </Chip>

															<Chip size="sm" color='primary' variant='light' classNames={{
																content: 'font-bold flex gap-2 items-center'
															}}><BsFillPinAngleFill className='-scale-y-100 -rotate-180' /> {columnDefs.filter(f => f.pinned === 'right').length} </Chip>

															<Chip size="sm" color='danger' variant='light' classNames={{
																content: 'font-bold flex gap-2 items-center'
															}}><BsEyeFill /> {columnDefs.filter(f => f.hide).length} </Chip>

															<BsChevronDown />
														</div>}

													>
														Columns

													</Button>

												</PopoverTrigger>


												<PopoverContent className='rounded-sm flex flex-col gap-2 p-4'>

													<div className='text-tiny'>Toggle Column Visibility & Pinning</div>



													<div className='overflow-y-auto max-h-52 w-full'>
														{
															columnDefs.map((c, i) => (
																<div key={c.field}
																	className='flex flex-wrap gap-4 mr-2 p-1 rounded-md items-center text-tiny justify-between'>

																	<div
																		className={`${c.pinned ? 'text-primary font-bold' : c.hide ? 'text-danger font-bold' : 'text-foreground'}`}
																	>{c.headerName}</div>
																	<div>

																		<div className='flex gap-2'>

																			<Button
																				isIconOnly={true}
																				size='sm'
																				radius='sm'
																				color='primary'
																				variant='light'
																				isDisabled={c.hide}

																				onClick={() => {
																					PinColumn({ ID: c.field, Direction: c.pinned ? c.pinned === 'left' ? 'right' : false : 'left' })
																					// CHECK IF pinned YES THEN IF LEFT SET RIGHT
																					// IF PINNED RIGHT THEN UNPIN
																					// IF UNPINNED THEN PIN LEFT
																				}}
																			>

																				{c.pinned
																					?


																					c.pinned === 'left'
																						?
																						<BsFillPinAngleFill />
																						:
																						<BsFillPinAngleFill className='-scale-y-100 -rotate-180' />
																					:
																					<BsPin />

																				}
																			</Button>


																			<Button
																				isIconOnly={true}
																				size='sm'
																				radius='sm'
																				color={c.hide ? 'danger' : 'primary'}
																				variant='light'
																				isDisabled={Boolean(c.pinned)}
																				onClick={() => {
																					HideColumns({ ID: c.field })
																				}}
																			>{c.hide ? <BsEyeSlashFill /> : <BsEyeFill />}</Button>
																		</div>
																	</div>


																</div>

															))
														}

													</div>

													<Divider />

													<div className='flex flex-wrap gap-2'>

														<Button

															size='sm'
															radius='sm'
															color='primary'
															variant='light'
															startContent={<BsPin />}
															isDisabled={columnDefs.filter(f => f.pinned).length === 0}
															// DISABLED IF NOTHING PINNED

															onClick={() => {
																PinColumn({ Reset: true })
															}}
														>Unpin All</Button>

														<Button

															size='sm'
															radius='sm'
															color='primary'
															variant='light'
															onClick={() => {
																HideColumns({ ShowAll: true })
															}}
															isDisabled={columnDefs.filter(f => f.hide).length === 0}
															startContent={<BsEyeFill />}
														>Unhide All </Button>

														<Button
															onClick={AutoSizeAll}
															size='sm'
															radius='sm'
															color='primary'
															variant='light'
															isDisabled={!GridApi}
															startContent={<BsArrows />}
														>
															Resize all
														</Button>

													</div>


												</PopoverContent>
											</Popover>
									}
								</div>
							</div>


							<div>

								{
									Disable_Limit ?
										null :
										<Dropdown>
											<DropdownTrigger>
												<Button
													variant="light"
													color='primary'
													className="w-auto bg-transparent text-primary"
													size='sm'
													startContent={<FaListOl />}
													endContent={<BsChevronDown />}
												>
													Limit {Array.from(PageSize)[0]}
												</Button>
											</DropdownTrigger>

											<DropdownMenu
												color='primary'
												aria-label="Results Limit"
												selectionMode="single"
												variant="flat"
												disallowEmptySelection
												selectedKeys={PageSize}
												onSelectionChange={SetPageSize}
											>

												{
													LimitResults.map((v, i) => (
														<DropdownItem
															className={`transition ease-in-out duration-300 ${PageSize.has(v) ? ' font-bold text-primary ' : ' text-foreground'}`}
															description={`Show ${v} results per page`}
															key={v}>
															<div className='text-tiny'>
																{PageSize.has(v) ? <b>{v}</b> : v}
															</div>

														</DropdownItem>
													))
												}


											</DropdownMenu>
										</Dropdown>
								}
							</div>

						</div>



						{/* TABLE */}
						<div
							className={` w-full h-full ${resolvedTheme === "light" ? "ag-theme-alpine" : "ag-theme-alpine-dark"}`} >
							<AgGridReact
								className='mb-2 font-Noto'
								ref={gridRef}
								rowData={data} columnDefs={columnDefs}
								rowSelection={"single"}
								onRowClicked={({ data }) => {
									StoreRowDblClickMsg ?
										toast(
											<div className="text-tiny flex flex-col gap-4 font-Noto p-4  print:hidden">
												<div className='font-bold'>
													Go to {data.name} details page ?
												</div>
												<div>
													<User
														name={data.name}
														description={data?.symbol?.toUpperCase() || data?.market?.identifier || null}
														avatarProps={{
															src: data?.image || data?.large ||
																data?.small || data?.thumb || data?.market?.logo || null
														}}
													/>
												</div>
												<ul className="list-disc ">
													<li className="ml-4 mb-2">Double clicking on a row it will open up the details page of that row item.</li>
													<li className="ml-4 mb-2">When row is clickable, it is highlighted in light-blue color & when single-clicked it changes color to light-blue indicating it is selected.</li>
												</ul>
												<div>
													<Button size='sm'
														fullWidth={true}
														radius='sm' variant='solid' color='primary'
														className='text-white'
														startContent={<BsCheckCircleFill size={14} />}
														onClick={() => {
															SetStoreRowDblClickMsg(false)
															toast.dismiss();
														}}>Got it, don't show again</Button>
												</div>
											</div>,
											{
												id: "DblClkMsg",
												position: "bottom-center",
												duration: 3000,
												theme: resolvedTheme,
												classNames: {
													toast: "bg-secondary rounded-lg shadow-lg  print:hidden",
												},
												unstyled: true,
											}

										)
										: null
								}}
								onRowDoubleClicked={onSelectionChanged}
								onGridReady={onGridReady}
								rowHeight={58}
								suppressRowClickSelection={!GoToLink}
								suppressRowHoverHighlight={!GoToLink}
								cellFlashDuration={2000}
								cellFadeDuration={500}
								valueCache={true}
								defaultColDef={defaultColDef}
								animateRows={true}
								pagination={true}
								suppressPaginationPanel={true}
								suppressDragLeaveHidesColumns={true}
								// PREVENTS  HIDING COLUMN BY DRAGGING OUT OF TABLE
								paginationPageSizeSelector={false}
								onPaginationChanged={Paginator}
								paginationPageSize={parseInt(Array.from(PageSize)[0])}
								domLayout={"autoHeight"}
								quickFilterText={FilterText}
								suppressCellFocus={true}
							/>
						</div>


						{/* PAGINATION */}
						<div className='flex justify-center'>

							{
								BasicTable
									?


									null
									:
									<Pagination
										size='sm'
										radius='sm'
										isCompact
										isDisabled={GridApi?.paginationGetRowCount() === 0}
										showControls
										total={GridApi?.paginationGetTotalPages()}
										initialPage={1}
										page={GridApi?.paginationGetCurrentPage() + 1}
										onChange={(pgNo) => GridApi?.paginationGoToPage(pgNo - 1)}
										variant='flat'
										color='primary'
										className='text-white'
									/>

							}

						</div>

					</div>
					:
					<DataNotThere Text={"No data available"} />
			}

			{/* DETAILS CARD */}
			<Modal
				isDismissable={false}
				isOpen={SelectedRows?.length > 0}
				backdrop='blur'
				radius='md' shadow='md'
				size='xl'
				isKeyboardDismissDisabled={true}
				hideCloseButton={true}
				placement='center'
			>
				<ModalContent>

					<div>
						<ModalBody className='p-4'>
							<div className='flex gap-2 items-center'>
								<BsExclamationCircleFill size={18} className='text-danger' />
								<div className='font-bold text-md '>Go to details page ?</div>
							</div>

							<div className='flex flex-col gap-4 items-center'>

								{
									GetSelected.image || GetSelected.large || GetSelected.small || GetSelected.thumb || GetSelected.market?.logo
										?

										<img
											alt="Coin/Exchange/NFT Name"
											className="object-cover rounded-xl"
											src={GetSelected.image || GetSelected.large || GetSelected.small || GetSelected.thumb || GetSelected.market?.logo || ""}
											width={120}
										/>
										:
										null
								}
								<div className='font-bold'>{GetSelected.name || GetSelected.market?.name} {GetSelected?.symbol ? `(${GetSelected?.symbol?.toUpperCase()})` : ""} {GetSelected.market?.identifier || ""}</div>

								<div className='text-small'>
									See all details like Markets, Market charts, Price, Volume, Notice, Status Updates & many more.
								</div>

							</div>







							<div className='flex flex-row gap-4 justify-center'>
								<Button size='md' radius='md' className='font-bold' color="danger" variant="light" onPress={() => {
									gridRef.current.api.deselectAll()
									SetSelectedRows([])
								}}>
									No
								</Button>
								<Button size='md' radius='md' className='font-bold' color="success" variant="light" onPress={() => {
									GoToLink ? MyRouter.push(GoToLink + "/" + GetSelected[Link_Key]) : null

								}}>
									{"Yes"}
								</Button>
							</div>
						</ModalBody>
					</div>
				</ModalContent>
			</Modal>

		</div >


	)
}

export default memo(MyTable)