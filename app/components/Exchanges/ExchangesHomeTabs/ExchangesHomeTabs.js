'use client'
import { ZustandStore } from '@/app/store/store'
import { memo } from 'react'
import FetchingOptions from '@/app/utils/Swr/FetchingOptions';
import { useShallow } from 'zustand/react/shallow'

import { Card, CardBody, Link, Spinner, User } from '@nextui-org/react'
import useSWR from 'swr';
import { Fetcher } from '@/app/utils/Swr/Fetcher';
import Capitalized from '@/app/utils/Text/Capitalized';
import CurrencyFormatter from '@/app/utils/Currency/CurrencyFormatter';

import dynamic from 'next/dynamic'
const MyTable = dynamic(() => import("../../MyTable/MyTable"))
const ComponentLevelError = dynamic(() => import("../../ComponentLevelError/ComponentLevelError"))

import TableSkeleton from '../../Skeletons/TableSkeleton';
import TransitionDiv from '../../TransitionDiv/TransitionDiv';
import SectionHeader from '../../SectionHeader/SectionHeader';


const ExchangesHomeTabs = () => {
	try {
		const { StoreLocale } = ZustandStore(useShallow((state) => state))
		const { data, error, isLoading, mutate } = useSWR('/api/exchanges', Fetcher, { ...FetchingOptions('60sec') })



		return (
			<TransitionDiv>



				<Card radius='sm' shadow='sm' className='mb-4'>
					<CardBody>
						<SectionHeader
							SectionID={"Exchanges"}
							SectionName={"Exchanges"}
							InfoContentTitle={"Exchanges"}
							InfoContent={<ul className='list-disc'>
								<li className='ml-4'>Shows all available Exchanges.</li>
								<li className='ml-4'>Auto Updates in every 1 minute.</li>
							</ul>}
						/>
						{
							isLoading
								?
								<TableSkeleton>
									<Spinner label={"Getting Exchanges data ..."} color="primary" labelColor="primary" />
								</TableSkeleton>
								:
								error
									?
									<ComponentLevelError
										Msg={error.response?.data + " While loading Exchanges section, an error occured !" || "While loading Exchanges section, an error occured !"}
										ErrorObj={error}
										Mutate={mutate} />
									:




									<MyTable

										GoToLink={"/exchanges"}
										ColumnsList={
											[
												{
													headerName: "Sr. No.",
													field: "sr_no",
													maxWidth: 120,
													pinned: 'left'
												},

												{
													headerName: 'Name', field: 'name', hide: false,
													cellRenderer: memo(({ data }) => <User
														name={data.name}
														avatarProps={{
															src: data.image
														}}
													/>),
													pinned: 'left'
												},


												{
													headerName: "Year Est.",
													field: "year_established",
													"hide": true,
													pinned: false,
													valueFormatter: ({ value }) => {
														return value || "-"
													}

												},
												{
													headerName: "Country",
													field: "country",
													"hide": true,
													pinned: false,
													valueFormatter: ({ value }) => {
														return value || "-"
													}
												},
												{
													headerName: "URL",
													field: "url",
													hide: false,
													pinned: false,
													cellRenderer: memo(function ({ data }) {
														let value = data.url
														return value ?
															<Link
																isExternal
																href={value}
																showAnchorIcon
																className='text-tiny'
															>
																{new URL(value).hostname || new URL(value).host}
															</Link>
															:
															"-"
													})

												},
												{
													headerName: "Has Trading Incentive",
													field: "has_trading_incentive",
													hide: false,
													pinned: false,
													cellRenderer: memo(({ data }) => {
														return typeof (data.has_trading_incentive) === 'boolean' ? Capitalized(data.has_trading_incentive) : "-"
													}),
												},
												{
													headerName: "Trust Score",
													field: "trust_score",
													hide: false,
													pinned: false
												},
												{
													headerName: "Trust Score Rank",
													field: "trust_score_rank",
													hide: false,
													pinned: false
												},
												{
													headerName: "Trade Vol. 24Hr. BTC",
													field: "trade_volume_24h_btc",
													hide: false,
													pinned: false,
													headerTooltip: "Trade Volume 24Hr. BTC",
													valueFormatter: ({ value }) => {
														return value ? CurrencyFormatter(StoreLocale, 'btc', Number(value)) : "-"
													}

												},

												{
													headerName: "Trade Vol. 24Hr. BTC Normalized",
													field: "trade_volume_24h_btc_normalized",
													hide: false,
													pinned: false,
													headerTooltip: "Trade Volume 24Hr. BTC",
													valueFormatter: ({ value }) => {
														return value ? CurrencyFormatter(StoreLocale, 'btc', Number(value)) : "-"
													}

												},


											]
										}
										Data={data}


									/>
						}


					</CardBody>
				</Card>
			</TransitionDiv>
		)



	} catch (e) {
		return <ComponentLevelError
			Msg={"While loading Exchanges section, an error occured !"}
			ErrorObj={{ message: e.toString() }}
		/>
	}
}

export default ExchangesHomeTabs