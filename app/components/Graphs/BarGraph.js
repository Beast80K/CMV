'use client'
import React, { memo, useMemo, useState } from 'react'
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useTheme } from 'next-themes';


const BarGraph = ({ Data, Width, Height, ChartName, XTitle, YTitle }) => {

	const { resolvedTheme } = useTheme()


	const [ChartOpt, SetChartOpt] = useState({
		series: [{
			data: Data,
		},
		],
		title: {
			text: ChartName,
			align: 'left',
			margin: 10,
			offsetX: 0,
			offsetY: 0,
			floating: false,
			style: {
				fontSize: '14px',
				fontWeight: 'bold',
				fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
			},
		},
		chart: {
			BarGraph: { enabled: true },
			animations: { enabled: true },
			fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
			background: 'transparent',
			foreColor: resolvedTheme === "light" ? "#242424" : "#EDF1FE",
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
						filename: ChartName,
					},
					png: {
						filename: ChartName,
					}
				},

			},
		},
		xaxis: {
			title: {
				text: XTitle,
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
			categories: [...Array(Data.length)].map((v, i) => i + 1),
		},

		yaxis: {
			title: {
				text: YTitle,
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
		},
		tooltip: { enabled: false },
		stroke: { width: 1, },
		colors: ["#29AB87"],
		dataLabels: {
			enabled: true,
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
		theme: {
			mode: resolvedTheme === 'amoled' ? 'dark' : resolvedTheme
		},

	})


	useMemo(() => {
		SetChartOpt({
			series: [{
				data: Data,
			},
			],
			title: {
				text: ChartName,
				align: 'left',
				margin: 10,
				offsetX: 0,
				offsetY: 0,
				floating: false,
				style: {
					fontSize: '14px',
					fontWeight: 'bold',
					fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
				},
			},
			chart: {
				BarGraph: { enabled: true },
				animations: { enabled: true },
				fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
				background: 'transparent',
				foreColor: resolvedTheme === "light" ? "#242424" : "#EDF1FE",
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
							filename: ChartName,
						},
						png: {
							filename: ChartName,
						}
					},

				},
			},
			xaxis: {
				title: {
					text: XTitle,
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
				categories: [...Array(Data.length)].map((v, i) => i + 1),
			},

			yaxis: {
				title: {
					text: YTitle,
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
			},
			tooltip: { enabled: false },
			stroke: { width: 1, },
			colors: ["#29AB87"],
			dataLabels: {
				enabled: true,
				style: {
					fontSize: '12px',
					fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
					fontWeight: 'bold',
					colors: [resolvedTheme === "light" ? "#242424" : "#EDF1FE"]
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
			theme: {
				mode: resolvedTheme === 'amoled' ? 'dark' : resolvedTheme
			},

		})
	}, [resolvedTheme, Data])


	return (


		<ReactApexChart options={ChartOpt} series={ChartOpt.series} type="bar" height={Height || "25%"} width={Width || "100%"} />


	)
}

export default memo(BarGraph)