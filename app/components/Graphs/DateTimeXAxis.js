'use client'
import { memo, useMemo, useState } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'

import dynamic from "next/dynamic";
import { ZustandStore } from '@/app/store/store'

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

import CurrencyFormatter from '@/app/utils/Currency/CurrencyFormatter'
import { v4 as uuidv4 } from 'uuid';

import { FaChartArea, FaChartLine } from 'react-icons/fa6';
import ComponentLevelError from '../ComponentLevelError/ComponentLevelError';
import DataNotThere from '../DataNotThere/DataNotThere';
import SimpleDateTime from '@/app/utils/DateTime/SimpleDateTime';
import { useShallow } from 'zustand/react/shallow'
import { useTheme } from 'next-themes';


const DateTimeXAxis = ({ data, totalVolumes, SeriesName, Chart1Name, Chart2Name, Group, Currency1, Currency2 }) => {
	try {


		const { resolvedTheme } = useTheme()

		const { StoreLocale } = ZustandStore(useShallow((state) => state))



		const [Chart1Options, SetChart1Options] = useState({
			chart: {
				id: uuidv4(),
				group: Group || null,
				animations: {
					enabled: true,
					easing: 'easeinout',
					speed: 500,
					animateGradually: {
						enabled: true,
						delay: 300
					},
					dynamicAnimation: {
						enabled: true,
						speed: 300
					}
				},
				zoom: {
					autoScaleYaxis: true
				},
				toolbar: {
					show: true,
					tools: {
						download: true,
						selection: true,
						zoom: true,
						zoomin: true,
						zoomout: true,
						pan: true,
						reset: true
					},
					export: {
						// CSV IS DISABLED THOUGH CSS
						svg: {
							filename: `${Chart1Name || "Chart 1"} ${SeriesName} ${SimpleDateTime(data[0][0])} - ${SimpleDateTime(data[data.length - 1][0])}`,
						},
						png: {
							filename: `${Chart1Name || "Chart 1"} ${SeriesName} ${SimpleDateTime(data[0][0])} - ${SimpleDateTime(data[data.length - 1][0])}`,
						}
					},

				},
				fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
				background: 'transparent',
				foreColor: resolvedTheme === "light" ? "#242424" : "#EDF1FE"
			},
			dataLabels: {
				enabled: false
			},
			annotations: {
				points:
					[
						{
							x: data[0][0],
							y: data[0][1],
							marker: {
								size: 4,
								fillColor: data[0][1] < data[data.length - 1][1] ? "#29AB87" : "#f03c3c",
								strokeColor: data[0][1] < data[data.length - 1][1] ? "#29AB87" : "#f03c3c",
								radius: 2
							},
							label: {
								borderColor: data[0][1] < data[data.length - 1][1] ? "#29AB87" : "#f03c3c",
								style: {
									color: resolvedTheme === "light" ? "#242424" : "#EDF1FE",
									background: 'transparent',
								},

								offsetX: 160,
								text: `${SimpleDateTime(data[0][0])} - ${CurrencyFormatter(StoreLocale, Currency1, data[0][1])}`
							}
						},
						{
							x: data[data.length - 1][0],
							y: data[data.length - 1][1],
							marker: {
								size: 4,
								fillColor: data[0][1] < data[data.length - 1][1] ? "#29AB87" : "#f03c3c",
								strokeColor: data[0][1] < data[data.length - 1][1] ? "#29AB87" : "#f03c3c",
								radius: 2
							},
							label: {
								borderColor: data[0][1] < data[data.length - 1][1] ? "#29AB87" : "#f03c3c",
								style: {
									color: resolvedTheme === "light" ? "#242424" : "#EDF1FE",
									background: 'transparent',
								},

								offsetX: -160,
								text: `${SimpleDateTime(data[data.length - 1][0])} - ${CurrencyFormatter(StoreLocale, Currency1, data[data.length - 1][1])}`
							}
						}
					]
			},
			xaxis: {
				lines: {
					show: false,
				},
				title: {
					text: ["Date & Time", `${SimpleDateTime(data[0][0])} - ${SimpleDateTime(data[data.length - 1][0])}`],
					rotate: -90,
					offsetX: 0,
					offsetY: 0,
					style: {
						color: undefined,
						fontSize: '12px',
						fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
						fontWeight: 600,
						cssClass: 'apexcharts-xaxis-title',
					},
				},
				type: 'datetime',

			},
			yaxis: {
				lines: {
					show: false,
				},
				title: {
					text: SeriesName,
					rotate: -90,
					offsetX: 0,
					offsetY: 0,
					style: {
						color: undefined,
						fontSize: '12px',
						fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
						fontWeight: 600,
						cssClass: 'apexcharts-yaxis-title',
					},
				},
				labels: {
					formatter: function (value) {
						return CurrencyFormatter(StoreLocale, Currency1, value);
					}
				},
			},
			stroke: { width: 1, },
			colors: [data[0][1] < data[data.length - 1][1] ? "#29AB87" : "#f03c3c"],

			theme: {
				mode: resolvedTheme === 'amoled' ? 'dark' : resolvedTheme
			},
			title: {
				text: `${Chart1Name || "Chart 1"} ${SeriesName}`,
				align: 'left',
				margin: 0,
				offsetX: 0,
				offsetY: 0,
				floating: false,
				style: {
					fontSize: '14px',
					fontWeight: 'bold',
					fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
				},
			},

		});
		const [Chart2Options, SetChart2Options] = useState(
			totalVolumes ?
				{
					chart: {
						id: uuidv4(),
						group: Group || null,
						animations: {
							enabled: true,
							easing: 'easeinout',
							speed: 500,
							animateGradually: {
								enabled: true,
								delay: 300
							},
							dynamicAnimation: {
								enabled: true,
								speed: 300
							}
						},
						zoom: {
							autoScaleYaxis: true
						},
						toolbar: {
							show: true,
							tools: {
								download: true,
								selection: true,
								zoom: true,
								zoomin: true,
								zoomout: true,
								pan: true,
								reset: true
							},
							export: {
								svg: {
									filename: `${Chart2Name || "Chart 2"} ${SimpleDateTime(totalVolumes[0][0])} - ${SimpleDateTime(totalVolumes[totalVolumes.length - 1][0])}`,
								},
								png: {
									filename: `${Chart2Name || "Chart 2"} ${SimpleDateTime(totalVolumes[0][0])} - ${SimpleDateTime(totalVolumes[totalVolumes.length - 1][0])}`,
								}
							},

						},
						fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
						background: 'transparent',
						foreColor: resolvedTheme === "light" ? "#242424" : "#EDF1FE"
					},
					dataLabels: {
						enabled: false
					},
					xaxis: {
						title: {
							text: ["Date & Time", `${SimpleDateTime(totalVolumes[0][0])} - ${SimpleDateTime(totalVolumes[totalVolumes.length - 1][0])}`],
							rotate: -90,
							offsetX: 0,
							offsetY: 0,
							style: {
								color: undefined,
								fontSize: '12px',
								fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
								fontWeight: 600,
								cssClass: 'apexcharts-xaxis-title',
							},
						},
						type: 'datetime',
					},
					yaxis: {
						title: {
							text: "Volume",
							rotate: -90,
							offsetX: 0,
							offsetY: 0,
							style: {
								color: undefined,
								fontSize: '12px',
								fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
								fontWeight: 600,
								cssClass: 'apexcharts-yaxis-title',
							},
						},
						labels: {
							formatter: function (value) {
								return CurrencyFormatter(StoreLocale, Currency2, value);
							}
						},
					},
					stroke: { width: 1, },
					colors: [resolvedTheme === "light" ? "#0C41E2" : "#6A90FF"],

					theme: {
						mode: resolvedTheme === 'amoled' ? 'dark' : resolvedTheme
					},
					title: {
						text: Chart2Name || "Chart 2",
						align: 'left',
						margin: 0,
						offsetX: 0,
						offsetY: 0,
						floating: false,
						style: {
							fontSize: '14px',
							fontWeight: 'bold',
							fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
						},
					},
					annotations: {
						points:
							[
								{
									x: totalVolumes[0][0],
									y: totalVolumes[0][1],
									marker: {
										size: 4,
										fillColor: resolvedTheme === "light" ? "#0C41E2" : "#6A90FF",
										strokeColor: resolvedTheme === "light" ? "#0C41E2" : "#6A90FF",
										radius: 2
									},
									label: {
										borderColor: resolvedTheme === "light" ? "#0C41E2" : "#6A90FF",
										style: {
											color: resolvedTheme === "light" ? "#242424" : "#EDF1FE",

											background: 'transparent',
										},

										offsetX: 160,
										text: `${SimpleDateTime(totalVolumes[0][0])} - ${CurrencyFormatter(StoreLocale, Currency2, totalVolumes[0][1])}`
									}
								},
								{
									x: totalVolumes[totalVolumes.length - 1][0],
									y: totalVolumes[totalVolumes.length - 1][1],
									marker: {
										size: 4,
										fillColor: resolvedTheme === "light" ? "#0C41E2" : "#6A90FF",
										strokeColor: resolvedTheme === "light" ? "#0C41E2" : "#6A90FF",
										radius: 2
									},
									label: {
										borderColor: resolvedTheme === "light" ? "#0C41E2" : "#6A90FF",
										style: {
											color: resolvedTheme === "light" ? "#242424" : "#EDF1FE",
											background: 'transparent',
										},

										offsetX: -160,
										text: `${SimpleDateTime(totalVolumes[totalVolumes.length - 1][0])} - ${CurrencyFormatter(StoreLocale, Currency2, totalVolumes[totalVolumes.length - 1][1])}`
									}
								}
							]
					},

				} : null

		);

		const ChartTypesList = [
			{
				value: "area", label: "Area", startIcon: <FaChartArea />
			},
			{
				value: "line", label: "Line", startIcon: <FaChartLine />
			},
		]
		const [ChartType, SetChartType] = useState(new Set([ChartTypesList[0]['value']]))
		const [ChartType2, SetChartType2] = useState(new Set([ChartTypesList[0]['value']]))

		useMemo(() => {


			SetChart1Options({
				chart: {
					id: uuidv4(),
					group: Group || null,
					animations: {
						enabled: true,
						easing: 'easeinout',
						speed: 500,
						animateGradually: {
							enabled: true,
							delay: 300
						},
						dynamicAnimation: {
							enabled: true,
							speed: 300
						}
					},
					zoom: {
						autoScaleYaxis: true
					},
					toolbar: {
						show: true,
						tools: {
							download: true,
							selection: true,
							zoom: true,
							zoomin: true,
							zoomout: true,
							pan: true,
							reset: true
						},
						export: {
							// CSV IS DISABLED THOUGH CSS
							svg: {
								filename: `${Chart1Name || "Chart 1"} ${SeriesName} ${SimpleDateTime(data[0][0])} - ${SimpleDateTime(data[data.length - 1][0])}`,
							},
							png: {
								filename: `${Chart1Name || "Chart 1"} ${SeriesName} ${SimpleDateTime(data[0][0])} - ${SimpleDateTime(data[data.length - 1][0])}`,
							}
						},

					},
					fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
					background: 'transparent',
					foreColor: resolvedTheme === "light" ? "#242424" : "#EDF1FE"
				},
				dataLabels: {
					enabled: false
				},
				annotations: {
					points:
						[
							{
								x: data[0][0],
								y: data[0][1],
								marker: {
									size: 4,
									fillColor: data[0][1] < data[data.length - 1][1] ? "#29AB87" : "#f03c3c",
									strokeColor: data[0][1] < data[data.length - 1][1] ? "#29AB87" : "#f03c3c",
									radius: 2
								},
								label: {
									borderColor: data[0][1] < data[data.length - 1][1] ? "#29AB87" : "#f03c3c",
									style: {
										color: resolvedTheme === "light" ? "#242424" : "#EDF1FE",
										background: 'transparent',
									},

									offsetX: 160,
									text: `${SimpleDateTime(data[0][0])} - ${CurrencyFormatter(StoreLocale, Currency1, data[0][1])}`
								}
							},
							{
								x: data[data.length - 1][0],
								y: data[data.length - 1][1],
								marker: {
									size: 4,
									fillColor: data[0][1] < data[data.length - 1][1] ? "#29AB87" : "#f03c3c",
									strokeColor: data[0][1] < data[data.length - 1][1] ? "#29AB87" : "#f03c3c",
									radius: 2
								},
								label: {
									borderColor: data[0][1] < data[data.length - 1][1] ? "#29AB87" : "#f03c3c",
									style: {
										color: resolvedTheme === "light" ? "#242424" : "#EDF1FE",
										background: 'transparent',
									},

									offsetX: -160,
									text: `${SimpleDateTime(data[data.length - 1][0])} - ${CurrencyFormatter(StoreLocale, Currency1, data[data.length - 1][1])}`
								}
							}
						]
				},
				xaxis: {
					lines: {
						show: false,
					},
					title: {
						text: ["Date & Time", `${SimpleDateTime(data[0][0])} - ${SimpleDateTime(data[data.length - 1][0])}`],
						rotate: -90,
						offsetX: 0,
						offsetY: 0,
						style: {
							color: undefined,
							fontSize: '12px',
							fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
							fontWeight: 600,
							cssClass: 'apexcharts-xaxis-title',
						},
					},
					type: 'datetime',

				},
				yaxis: {
					lines: {
						show: false,
					},
					title: {
						text: SeriesName,
						rotate: -90,
						offsetX: 0,
						offsetY: 0,
						style: {
							color: undefined,
							fontSize: '12px',
							fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
							fontWeight: 600,
							cssClass: 'apexcharts-yaxis-title',
						},
					},
					labels: {
						formatter: function (value) {
							return CurrencyFormatter(StoreLocale, Currency1, value);
						}
					},
				},
				stroke: { width: 1, },
				colors: [data[0][1] < data[data.length - 1][1] ? "#29AB87" : "#f03c3c"],

				theme: {
					mode: resolvedTheme === 'amoled' ? 'dark' : resolvedTheme
				},
				title: {
					text: `${Chart1Name || "Chart 1"} ${SeriesName}`,
					align: 'left',
					margin: 0,
					offsetX: 0,
					offsetY: 0,
					floating: false,
					style: {
						fontSize: '14px',
						fontWeight: 'bold',
						fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
					},
				},

			})

			SetChart2Options(totalVolumes ? {
				chart: {
					id: uuidv4(),
					group: Group || null,
					animations: {
						enabled: true,
						easing: 'easeinout',
						speed: 500,
						animateGradually: {
							enabled: true,
							delay: 300
						},
						dynamicAnimation: {
							enabled: true,
							speed: 300
						}
					},
					zoom: {
						autoScaleYaxis: true
					},
					toolbar: {
						show: true,
						tools: {
							download: true,
							selection: true,
							zoom: true,
							zoomin: true,
							zoomout: true,
							pan: true,
							reset: true
						},
						export: {
							svg: {
								filename: `${Chart2Name || "Chart 2"} ${SimpleDateTime(totalVolumes[0][0])} - ${SimpleDateTime(totalVolumes[totalVolumes.length - 1][0])}`,
							},
							png: {
								filename: `${Chart2Name || "Chart 2"} ${SimpleDateTime(totalVolumes[0][0])} - ${SimpleDateTime(totalVolumes[totalVolumes.length - 1][0])}`,
							}
						},

					},
					fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
					background: 'transparent',
					foreColor: resolvedTheme === "light" ? "#242424" : "#EDF1FE"
				},
				dataLabels: {
					enabled: false
				},
				xaxis: {
					title: {
						text: ["Date & Time", `${SimpleDateTime(totalVolumes[0][0])} - ${SimpleDateTime(totalVolumes[totalVolumes.length - 1][0])}`],
						rotate: -90,
						offsetX: 0,
						offsetY: 0,
						style: {
							color: undefined,
							fontSize: '12px',
							fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
							fontWeight: 600,
							cssClass: 'apexcharts-xaxis-title',
						},
					},
					type: 'datetime',
				},
				yaxis: {
					title: {
						text: "Volume",
						rotate: -90,
						offsetX: 0,
						offsetY: 0,
						style: {
							color: undefined,
							fontSize: '12px',
							fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
							fontWeight: 600,
							cssClass: 'apexcharts-yaxis-title',
						},
					},
					labels: {
						formatter: function (value) {
							return CurrencyFormatter(StoreLocale, Currency2, value);
						}
					},
				},
				stroke: { width: 1, },
				colors: [resolvedTheme === "light" ? "#0C41E2" : "#6A90FF"],

				theme: {
					mode: resolvedTheme === 'amoled' ? 'dark' : resolvedTheme
				},
				title: {
					text: Chart2Name || "Chart 2",
					align: 'left',
					margin: 0,
					offsetX: 0,
					offsetY: 0,
					floating: false,
					style: {
						fontSize: '14px',
						fontWeight: 'bold',
						fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
					},
				},
				annotations: {
					points:
						[
							{
								x: totalVolumes[0][0],
								y: totalVolumes[0][1],
								marker: {
									size: 4,
									fillColor: resolvedTheme === "light" ? "#0C41E2" : "#6A90FF",
									strokeColor: resolvedTheme === "light" ? "#0C41E2" : "#6A90FF",
									radius: 2
								},
								label: {
									borderColor: resolvedTheme === "light" ? "#0C41E2" : "#6A90FF",
									style: {
										color: resolvedTheme === "light" ? "#242424" : "#EDF1FE",

										background: 'transparent',
									},

									offsetX: 160,
									text: `${SimpleDateTime(totalVolumes[0][0])} - ${CurrencyFormatter(StoreLocale, Currency2, totalVolumes[0][1])}`
								}
							},
							{
								x: totalVolumes[totalVolumes.length - 1][0],
								y: totalVolumes[totalVolumes.length - 1][1],
								marker: {
									size: 4,
									fillColor: resolvedTheme === "light" ? "#0C41E2" : "#6A90FF",
									strokeColor: resolvedTheme === "light" ? "#0C41E2" : "#6A90FF",
									radius: 2
								},
								label: {
									borderColor: resolvedTheme === "light" ? "#0C41E2" : "#6A90FF",
									style: {
										color: resolvedTheme === "light" ? "#242424" : "#EDF1FE",
										background: 'transparent',
									},

									offsetX: -160,
									text: `${SimpleDateTime(totalVolumes[totalVolumes.length - 1][0])} - ${CurrencyFormatter(StoreLocale, Currency2, totalVolumes[totalVolumes.length - 1][1])}`
								}
							}
						]
				},

			} : null)
		}, [resolvedTheme, SeriesName, data, totalVolumes,])

		if (!data) return <div className='text-center mb-8'>
			<DataNotThere
				Text={"No data was found !"}
			/>
		</div>
		else {

			return (
				<div>


					{
						data
							?
							<div className='flex flex-col gap-2'>


								<div className='flex gap-2 items-center justify-between sm:justify-between'>

									<div className='text-tiny font-bold'>
										{Chart1Name || "Chart 1"} {SeriesName}
									</div>

									<div className='flex gap-2 items-center justify-end'>

										<div className='text-tiny font-bold'>
											Graph Type :
										</div>

										<Dropdown>
											<DropdownTrigger>
												<Button
													variant="light"
													color='primary'
													size='sm'

												>
													{ChartTypesList[ChartTypesList.findIndex(f => f.value === Array.from(ChartType)[0])]['label']}
												</Button>
											</DropdownTrigger>
											<DropdownMenu
												aria-label="Select Chart Type"
												variant="flat"
												className='max-h-52 overflow-auto'
												color='primary'
												disallowEmptySelection
												selectionMode="single"
												selectedKeys={ChartType}
												onSelectionChange={SetChartType}
											>
												{ChartTypesList.map((v, i) => (
													<DropdownItem
														className={`transition ease-in-out duration-500 ${ChartType.has(v.value) ? ' text-primary font-bold ' : 'text-foreground'}`}
														textValue={v.label}
														startContent={v.startIcon}
														key={v.value}>
														{ChartType.has(v.value) ? <b>{v.label}</b> : v.label}
													</DropdownItem>

												))}

											</DropdownMenu>
										</Dropdown>
									</div>
								</div>


								<ReactApexChart
									type={Array.from(ChartType)[0]}
									key={uuidv4()}

									options={Chart1Options}
									series={[{
										data: data,
										name: SeriesName

									},
									]}
									width={"100%"}
									height={500} />

							</div>
							:
							null
					}



					{
						totalVolumes
							?
							<div className='flex flex-col gap-2'>


								<div className='flex gap-2 items-center justify-between sm:justify-between'>

									<div className='text-tiny font-bold'>
										{Chart2Name || "Chart 2"}
									</div>
									<div className='flex gap-2 items-center justify-end'>

										<div className='text-tiny font-bold'>
											Graph Type :
										</div>
										<Dropdown>
											<DropdownTrigger>
												<Button
													variant="light"
													color='primary'
													size='sm'

												>
													{ChartTypesList[ChartTypesList.findIndex(f => f.value === Array.from(ChartType2)[0])]['label']}
												</Button>
											</DropdownTrigger>
											<DropdownMenu
												aria-label="Select Chart Type"
												variant="flat"
												color='primary'
												className='max-h-52 overflow-auto'
												disallowEmptySelection
												selectionMode="single"
												selectedKeys={ChartType2}
												onSelectionChange={SetChartType2}
											>
												{ChartTypesList.map((v, i) => (
													<DropdownItem
														className={`transition ease-in-out duration-500 ${ChartType2.has(v.value) ? ' text-primary font-bold ' : 'text-foreground'}`}
														textValue={v.label}
														startContent={v.startIcon}
														key={v.value}>
														{ChartType2.has(v.value) ? <b>{v.label}</b> : v.label}
													</DropdownItem>

												))}

											</DropdownMenu>
										</Dropdown>
									</div>


								</div>

								<ReactApexChart type={Array.from(ChartType2)[0]}
									key={uuidv4()}
									options={Chart2Options}
									series={[{
										data: totalVolumes,
										name: "Total Volume"
									}]}
									width={"100%"}
									height={250} />

							</div>
							:
							null
					}



				</div>
			)
		}

	} catch (e) {

		return <ComponentLevelError
			ErrorObj={{ message: e.toString() }}
			Msg={"While loading DateTimeXAxis Chart, an error occured !"}
		/>
	}
}

export default memo(DateTimeXAxis)