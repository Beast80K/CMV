'use client'
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { v4 as uuidv4 } from 'uuid';
import { useTheme } from 'next-themes';


import { useMemo, useState } from 'react'
import SimpleDateTime from "@/app/utils/DateTime/SimpleDateTime";
import CurrencyFormatter from "@/app/utils/Currency/CurrencyFormatter";
import { ZustandStore } from "@/app/store/store";
import { useShallow } from "zustand/react/shallow";

const CandleStickGraph = ({ Data, ChartName }) => {

	const { StoreCurrency, StoreLocale } = ZustandStore(useShallow((state) => state))

	const { resolvedTheme } = useTheme()

	const [OHLCOptions, SetOHLCOptions] = useState({
		chart: {
			id: uuidv4(),
			type: 'candlestick',
			height: 350,
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
				autoScaleYaxis: false
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
						filename: `${ChartName} ${SimpleDateTime(Data[0][0])} - ${SimpleDateTime(Data[Data.length - 1][0])}`,
					},
					png: {
						filename: `${ChartName} ${SimpleDateTime(Data[0][0])} - ${SimpleDateTime(Data[Data.length - 1][0])}`,

					}
				},

			},
			fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
			background: 'transparent',
			foreColor: resolvedTheme === "light" ? "#242424" : "#EDF1FE"
		},
		xaxis: {
			type: 'datetime',
			tooltip: {
				enabled: true,
			},
			title: {
				text: ["Date & Time", `${SimpleDateTime(Data[0][0])} - ${SimpleDateTime(Data[Data.length - 1][0])}`],
				rotate: -90,
				offsetX: 0,
				offsetY: 0,
				style: {
					fontSize: '12px',
					fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
					fontWeight: 600,
					cssClass: 'apexcharts-xaxis-title',
				},
			},

		},
		yaxis: {
			tooltip: {
				enabled: true,
			},
			title: {
				text: "Prices",
				rotate: -90,
				offsetX: 0,
				offsetY: 0,
				style: {
					fontSize: '12px',
					fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
					fontWeight: 600,
					cssClass: 'apexcharts-xaxis-title',
				},
			},
			labels: {
				formatter: function (value) {
					return CurrencyFormatter(StoreLocale, StoreCurrency, value);
				}
			},
		},
		candlestick: {
			wick: {
				useFillColor: true,
			},
			colors: {
				upward: '#29AB87',
				downward: '#f03c3c'
			}
		},
		theme: {
			mode: resolvedTheme === 'amoled' ? 'dark' : resolvedTheme
		},
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


	})

	useMemo(() => {
		SetOHLCOptions({
			chart: {
				id: uuidv4(),
				type: 'candlestick',
				height: 350,
				zoom: {
					autoScaleYaxis: false
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
							filename: `${ChartName} ${SimpleDateTime(Data[0][0])} - ${SimpleDateTime(Data[Data.length - 1][0])}`,
						},
						png: {
							filename: `${ChartName} ${SimpleDateTime(Data[0][0])} - ${SimpleDateTime(Data[Data.length - 1][0])}`,

						}
					},

				},
				fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
				background: 'transparent',
				foreColor: resolvedTheme === "light" ? "#242424" : "#EDF1FE"
			},
			xaxis: {
				type: 'datetime',
				tooltip: {
					enabled: true,
				},
				title: {
					text: ["Date & Time", `${SimpleDateTime(Data[0][0])} - ${SimpleDateTime(Data[Data.length - 1][0])}`],
					rotate: -90,
					offsetX: 0,
					offsetY: 0,
					style: {
						fontSize: '12px',
						fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
						fontWeight: 600,
						cssClass: 'apexcharts-xaxis-title',
					},
				},

			},
			yaxis: {
				tooltip: {
					enabled: true,
				},
				title: {
					text: "Prices",
					rotate: -90,
					offsetX: 0,
					offsetY: 0,
					style: {
						fontSize: '12px',
						fontFamily: 'Noto Sans, Helvetica, Arial, sans-serif',
						fontWeight: 600,
						cssClass: 'apexcharts-xaxis-title',
					},
				},
				labels: {
					formatter: function (value) {
						return CurrencyFormatter(StoreLocale, StoreCurrency, value);
					}
				},
			},
			candlestick: {
				wick: {
					useFillColor: true,
				},
				colors: {
					upward: '#29AB87',
					downward: '#f03c3c'
				}
			},
			theme: {
				mode: resolvedTheme === 'amoled' ? 'dark' : resolvedTheme
			},
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


		})
	}, [resolvedTheme, Data])

	return (

		<ReactApexChart
			type='candlestick'
			options={OHLCOptions}
			series={[{
				name: "OHLC",
				data: Data
			},
			]}
			width={"100%"}
			height={500} />
	)
}

export default CandleStickGraph
