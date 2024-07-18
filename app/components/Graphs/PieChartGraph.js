'use client'
import React, { memo, useEffect, useMemo, useState } from 'react'
import dynamic from "next/dynamic";
import { FaChartPie } from 'react-icons/fa6';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { MdOutlineDonutSmall } from "react-icons/md";


import { v4 as uuidv4 } from 'uuid';
import randomColor from 'randomcolor';
import { useTheme } from 'next-themes';
import { GetRandomColor } from '@/app/utils/Color/GetRandomColor';
import { BsPaletteFill } from 'react-icons/bs';

const PieChartGraph = ({ Data, Width, Height, ChartName }) => {
	const { resolvedTheme } = useTheme()


	// CALCULATES OTHER VALUES IF % TOTAL != 100%
	const PieData = useMemo(() => {
		let sum = Object.values(Data).reduce((acc, cur) => acc += cur)

		if (sum !== 100) {
			let Others = {
				Others: parseFloat((100 - sum).toFixed(2))
			}

			let AllData = {
				...Data, ...Others
			}
			return AllData
		}
		else {
			return Data
		}


	}, [Data])



	const ChartTypesList = [
		{
			value: "donut", label: "Donut", startIcon: <MdOutlineDonutSmall />
		},
		{
			value: "pie", label: "Pie", startIcon: <FaChartPie />
		},
	]
	const [ChartType, SetChartType] = useState(new Set([ChartTypesList[0]['value']]))

	const [ChartOpt, SetChartOpt] = useState({
		series: Object.values(PieData),
		labels: Object.keys(PieData).map(v => v.toUpperCase()),
		title: {
			text: ChartName,
			align: 'left',
			margin: 10,
			offsetX: 0,
			offsetY: 0,
			floating: false,
			style: {
				fontSize: '12px',
				fontWeight: 'bold',
				fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
			},
		},
		chart: {
			id: uuidv4(),
			type: Array.from(ChartType)[0],
			toolbar: {
				show: true,
				tools: {
					download: true,
					selection: false,
					zoom: false,
					zoomin: false,
					zoomout: false,
					pan: false,
					reset: false
				},
				export: {
					// CSV IS DISABLED THOUGH CSS
					svg: {
						filename: ChartName.join(', '),
					},
					png: {
						filename: ChartName.join(', '),
					}
				},

			},
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
			background: 'transparent',
			fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',

		},
		dataLabels: {
			enabled: true,
			style: {
				fontSize: '12px',
				fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',

			},
			background: {
				enabled: true,
				foreColor: '#000000',
				borderWidth: 0,
			},
			dropShadow: {
				enabled: false,
			}
		},

		legend: {
			show: true,
			position: 'bottom',
			horizontalAlign: 'left',
			formatter: function (seriesName, opts) {
				return [seriesName, ": ", opts.w.globals.series[opts.seriesIndex].toFixed(2), "%"]
			}
		},
		theme: {
			mode: resolvedTheme === 'amoled' ? 'dark' : resolvedTheme,
		},
		colors: GetRandomColor({ luminosity: resolvedTheme === 'amoled' ? 'dark' : resolvedTheme, count: Object.keys(Data).length + 1 })

	})

	useMemo(() => {


		SetChartOpt({
			series: Object.values(PieData),
			labels: Object.keys(PieData).map(v => v.toUpperCase()),
			title: {
				text: ChartName,
				align: 'left',
				margin: 10,
				offsetX: 0,
				offsetY: 0,
				floating: false,
				style: {
					fontSize: '12px',
					fontWeight: 'bold',
					fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
				},
			},
			chart: {
				id: uuidv4(),
				type: Array.from(ChartType)[0],
				toolbar: {
					show: true,
					tools: {
						download: true,
						selection: false,
						zoom: false,
						zoomin: false,
						zoomout: false,
						pan: false,
						reset: false
					},
					export: {
						// CSV IS DISABLED THOUGH CSS
						svg: {
							filename: ChartName.join(', '),
						},
						png: {
							filename: ChartName.join(', '),
						}
					},

				},
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
				background: 'transparent',
				fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',

			},
			dataLabels: {
				enabled: true,
				style: {
					fontSize: '12px',
					fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',

				},
				background: {
					enabled: true,
					foreColor: '#000000',
					borderWidth: 0,
				},
				dropShadow: {
					enabled: false,
				}
			},

			legend: {
				show: true,
				position: 'bottom',
				horizontalAlign: 'left',
				formatter: function (seriesName, opts) {
					return [seriesName, ": ", opts.w.globals.series[opts.seriesIndex].toFixed(2), "%"]
				}
			},
			theme: {
				mode: resolvedTheme === 'amoled' ? 'dark' : resolvedTheme,
			},
			colors: GetRandomColor({ luminosity: resolvedTheme === 'amoled' ? 'dark' : resolvedTheme, count: Object.keys(Data).length + 1 })

		})

	}, [resolvedTheme, Data, ChartType, ChartName])




	return (
		<div>

			<div className='flex flex-row items-center justify-between mb-4'>

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
							color='primary'
							disallowEmptySelection
							className='max-h-52 overflow-auto'
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
				<Button
					size='sm'
					isIconOnly={true}
					radius='sm'
					variant='light'
					title='Change Colors'
					aria-label='Change Colors'
					color='primary'
					onClick={() => {
						SetChartOpt((prev) => ({
							...prev, colors: GetRandomColor({ luminosity: resolvedTheme === 'amoled' ? 'dark' : resolvedTheme, count: Object.keys(Data).length + 1 })
						}))
					}}

				>
					<BsPaletteFill />
				</Button>
			</div>



			<ReactApexChart
				options={ChartOpt}
				series={ChartOpt.series}
				type={Array.from(ChartType)[0]}
				height={Height || "75%"} width={Width || "100%"} />
		</div>
	)
}

export default memo(PieChartGraph)