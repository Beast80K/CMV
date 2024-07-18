'use client'
import { memo, useState } from 'react'
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Sparkline = ({ Data, Width, Height }) => {

	const [ChartOpt, SetChartOpt] = useState({
		series: [{
			data: Data,
		}],
		options: {
			dataLabels: {
				enabled: false
			},
		},
		chart: {
			type: "area",
			sparkline: { enabled: true },
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
		},
		tooltip: { enabled: false },
		stroke: { width: 1 },
		colors: [Data[0] < Data[Data.length - 1] ? "#29AB87" : "#f03c3c"]
	})



	return (
		<ReactApexChart options={ChartOpt} series={ChartOpt.series} type="area" height={Height || "25%"} width={Width || "100%"} />
	)
}

export default memo(Sparkline)