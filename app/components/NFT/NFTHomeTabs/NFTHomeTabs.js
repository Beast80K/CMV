"use client";
import {
	Button,
	Card,
	CardBody,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Snippet,
	Spinner,
	Tab,
	Tabs,
	User,
} from "@nextui-org/react";
import React, { memo, useState } from "react";
import useSWR from "swr";

import FetchingOptions from "@/app/utils/Swr/FetchingOptions";

import { BsChevronDown, BsFillCheckCircleFill } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa6";
import { Fetcher } from "@/app/utils/Swr/Fetcher";


import dynamic from 'next/dynamic'
import TransitionDiv from "../../TransitionDiv/TransitionDiv";
import SectionHeader from "../../SectionHeader/SectionHeader";
import TabsSkeleton from "../../Skeletons/TabsSkeleton";
const DataNotThere = dynamic(() => import("../../DataNotThere/DataNotThere"))
const ComponentLevelError = dynamic(() => import("../../ComponentLevelError/ComponentLevelError"))
const MyTable = dynamic(() => import("../../MyTable/MyTable"))



const NFTHomeTabs = () => {
	try {
		const AssetFiltersList = [
			{ value: "all", label: "All", desc: "Show All Asset Platforms" },
			{ value: "nft", label: "NFTs", desc: "Show NFTs Asset Platforms" },
		];

		const [AssetFilter, SetAssetFilter] = useState(
			new Set([AssetFiltersList[0]["value"]])
		);

		const NFTsData = useSWR("/api/nfts_list", Fetcher, {
			...FetchingOptions("5min"),
		});
		const AssetPlatformsData = useSWR(
			"/api/asset_platforms?filter=" + Array.from(AssetFilter)[0],
			Fetcher,
			{ ...FetchingOptions("5min") }
		);

		const NFTsColumnList = [
			{
				Header: "Sr.No.",
				accessor: "sr_no",
			},
			{
				accessor: "name",
				Header: "NFT Name",
			},
			{
				accessor: "id",
				Header: "NFT ID",
				Cell: ({ cell }) =>
					cell.row.values.id ? (
						<Snippet
							radius="sm"
							size="sm"
							color="secondary"
							variant="flat"
							copyIcon={<FaRegCopy />}
							checkIcon={<BsFillCheckCircleFill />}
							className="text-tiny bg-secondary text-primary"
							hideSymbol={true}
							codeString={cell.row.values.id}
							tooltipProps={{
								showArrow: true,
								size: "sm",
								color: "secondary",
								className: "text-foreground shadow-md",
								content:
									"Copy NFT ID for " + cell.row.values.name,
							}}
						>
							{cell.row.values.id}
						</Snippet>
					) : (
						"-"
					),
			},
			{
				accessor: "contract_address",
				Header: "Contract Address",
				Cell: ({ cell }) =>
					cell.row.values.contract_address ? (
						<Snippet
							radius="sm"
							size="sm"
							hideSymbol={true}
							color="secondary"
							variant="flat"
							copyIcon={<FaRegCopy />}
							checkIcon={<BsFillCheckCircleFill />}
							className="text-tiny bg-secondary text-primary"
							codeString={cell.row.values.contract_address}
							tooltipProps={{
								showArrow: true,
								size: "sm",
								color: "secondary",
								className: "text-foreground shadow-md",
								content:
									"Copy Contract Address for " +
									cell.row.values.name,
							}}
						>
							{cell.row.values.contract_address}
						</Snippet>
					) : (
						"-"
					),
			},

			{
				accessor: "asset_platform_id",
				Header: "Asset Platform ID",
				Cell: ({ cell }) =>
					cell.row.values.asset_platform_id ? (
						<Snippet
							radius="sm"
							size="sm"
							hideSymbol={true}
							color="secondary"
							variant="flat"
							copyIcon={<FaRegCopy />}
							checkIcon={<BsFillCheckCircleFill />}
							className="text-tiny bg-secondary text-primary"
							codeString={cell.row.values.asset_platform_id}
							tooltipProps={{
								showArrow: true,
								size: "sm",
								color: "secondary",
								className: "text-foreground shadow-md",
								content:
									"Copy Asset Platform ID for " +
									cell.row.values.name,
							}}
						>
							{cell.row.values.asset_platform_id}
						</Snippet>
					) : (
						"-"
					),
			},
			{
				accessor: "symbol",
				Header: "Symbol",
			},
		];

		const AssetPlatformsColumnList = [
			{
				Header: "Sr.No.",
				accessor: "sr_no",
			},
			{
				accessor: "name",
				Header: "Name",
			},
			{
				accessor: "id",
				Header: "Asset Platform ID",
				Cell: ({ cell }) =>
					cell.row.values.id ? (
						<Snippet
							radius="sm"
							size="sm"
							hideSymbol={true}
							color="secondary"
							variant="flat"
							copyIcon={<FaRegCopy />}
							checkIcon={<BsFillCheckCircleFill />}
							className="text-tiny bg-secondary text-primary"
							codeString={cell.row.values.id}
							tooltipProps={{
								showArrow: true,
								size: "sm",
								color: "secondary",
								className: "text-foreground shadow-md",
								content:
									"Copy Asset Platform ID for " +
									cell.row.values.name,
							}}
						>
							{cell.row.values.id}
						</Snippet>
					) : (
						"-"
					),
			},
			{
				accessor: "chain_identifier",
				Header: "Chain Identifier",
				Cell: ({ cell }) =>
					cell.row.values.chain_identifier ? (
						<Snippet
							radius="sm"
							size="sm"
							hideSymbol={true}
							color="secondary"
							variant="flat"
							copyIcon={<FaRegCopy />}
							checkIcon={<BsFillCheckCircleFill />}
							className="text-tiny bg-secondary text-primary"
							codeString={cell.row.values.chain_identifier}
							tooltipProps={{
								showArrow: true,
								size: "sm",
								color: "secondary",
								className: "text-foreground shadow-md",
								content:
									"Copy Chain Identifier for " +
									cell.row.values.name,
							}}
						>
							{cell.row.values.chain_identifier}
						</Snippet>
					) : (
						"-"
					),
			},

			{
				accessor: "shortname",
				Header: "Shortname",
				Cell: ({ cell }) =>
					cell.row.values.Shortname ? cell.row.values.Shortname : "-",
			},
			{
				accessor: "native_coin_id",
				Header: "Native Coin ID",
				Cell: ({ cell }) =>
					cell.row.values.native_coin_id ? (
						<Snippet
							radius="sm"
							size="sm"
							hideSymbol={true}
							color="secondary"
							variant="flat"
							copyIcon={<FaRegCopy />}
							checkIcon={<BsFillCheckCircleFill />}
							className="text-tiny bg-secondary text-primary"
							codeString={cell.row.values.native_coin_id}
							tooltipProps={{
								showArrow: true,
								size: "sm",
								color: "secondary",
								className: "text-foreground shadow-md",
								content:
									"Copy Native Coin ID for " +
									cell.row.values.name,
							}}
						>
							{cell.row.values.native_coin_id}
						</Snippet>
					) : (
						"-"
					),
			},
		];

		return (
			<TransitionDiv>
				<Tabs
					radius="sm"
					variant="solid"
					color="primary"
					classNames={{
						tabList: "bg-secondary",
						tabContent:
							"group-data-[selected=true]:text-secondary group-data-[selected=true]:font-bold",
					}}
				>
					<Tab title="NFTs">
						<Card>
							<CardBody>
								<SectionHeader
									SectionID={"NFTs"}
									SectionName={"NFTs"}
									InfoContentTitle={"NFTs data"}
									InfoContent={
										<ul className="list-disc">
											<li className="ml-4">
												Shows all available NFTs.
											</li>
											<li className="ml-4">
												Auto Updates in every 5 minutes.
											</li>
										</ul>
									}
								/>
								{NFTsData.isLoading ? (
									<TabsSkeleton>
										<Spinner
											label={"Getting NFTs data ..."}
											color="primary"
											labelColor="primary"
										/>
									</TabsSkeleton>
								) : NFTsData.error ? (
									<ComponentLevelError
										ErrorObj={NFTsData.error}
										Msg={
											NFTsData.error.response.data +
											" Error Occured while getting NFTs data" ||
											"Error Occured while getting NFTs data"
										}
										Mutate={NFTsData.mutate}
									/>
								) : NFTsData.data ? (
									<MyTable
										GoToLink={"/nfts"}
										Data={NFTsData.data}
										ColumnsList={[
											{
												headerName: "Sr. No.",
												field: "sr_no",
												maxWidth: 120,
												pinned: false,
											},
											{
												headerName: "Name",
												field: "name",
												hide: false,
												cellRenderer: memo(
													({ data }) => (
														<User
															name={data.name}
															description={data.symbol.toUpperCase()}
															avatarProps={{
																src: data.image,
															}}
														/>
													)
												),
												pinned: false,
											},

											{
												headerName: "Contract Address",
												field: "contract_address",
												hide: false,
												pinned: false,
												cellRenderer: memo(
													({ data }) => (
														<Snippet
															hideSymbol={true}
															radius="sm"
															ref={(ref) => {
																if (!ref)
																	return;

																ref.onclick = (
																	e
																) => {
																	e.stopPropagation();
																};
															}}
															size="sm"
															color="secondary"
															variant="flat"
															copyIcon={
																<FaRegCopy />
															}
															checkIcon={
																<BsFillCheckCircleFill />
															}
															className="text-tiny bg-secondary text-primary"
															codeString={
																data.contract_address
															}
															tooltipProps={{
																showArrow: true,
																size: "sm",
																content:
																	"Copy ID for " +
																	data.contract_address,
															}}
														>
															{
																data.contract_address
															}
														</Snippet>
													)
												),
											},

											{
												headerName: "Asset Platform Id",
												field: "asset_platform_id",
												hide: false,
												pinned: false,
												cellRenderer: memo(
													({ data }) => (
														<Snippet
															hideSymbol={true}
															radius="sm"
															ref={(ref) => {
																if (!ref)
																	return;

																ref.onclick = (
																	e
																) => {
																	e.stopPropagation();
																};
															}}
															size="sm"
															color="secondary"
															variant="flat"
															copyIcon={
																<FaRegCopy />
															}
															checkIcon={
																<BsFillCheckCircleFill />
															}
															className="text-tiny bg-secondary text-primary"
															codeString={
																data.asset_platform_id
															}
															tooltipProps={{
																showArrow: true,
																size: "sm",
																content:
																	"Copy ID for " +
																	data.asset_platform_id,
															}}
														>
															{
																data.asset_platform_id
															}
														</Snippet>
													)
												),
											},
										]}
									/>
								) : (
									<DataNotThere
										Text={
											"No NFTs data available to show !"
										}
									/>
								)}
							</CardBody>
						</Card>
					</Tab>
					<Tab title="Asset Platforms">
						<Card>
							<CardBody>
								<SectionHeader
									SectionID={"AssetPlatforms"}
									SectionName={"Asset Platforms"}
									InfoContentTitle={"Asset Platforms data"}
									InfoContent={
										<ul className="list-disc">
											<li className="ml-4">
												Shows all available Asset
												Platforms.
											</li>
											<li className="ml-4">
												Auto Updates in every 5 minutes.
											</li>
										</ul>
									}
								/>
								<div className="flex justify-end items-center text-tiny mb-2">
									<div className="flex gap-2 items-center">
										<div>Filter :</div>

										<Dropdown>
											<DropdownTrigger>
												<Button
													isDisabled={
														AssetPlatformsData.isLoading
													}
													size="sm"
													variant="light"
													aria-label="Asset Platforms Filter"
													color="primary"
													endContent={
														<BsChevronDown className="text-foreground" />
													}
												>
													{
														AssetFiltersList[
														AssetFiltersList.findIndex(
															(f) =>
																f.value ===
																Array.from(
																	AssetFilter
																)[0]
														)
														]["label"]
													}
												</Button>
											</DropdownTrigger>
											<DropdownMenu
												className="max-h-52 overflow-auto"
												variant="flat"
												color="primary"
												aria-label="Select Asset Platforms Filter"
												disallowEmptySelection
												selectionMode="single"
												selectedKeys={AssetFilter}
												onSelectionChange={
													SetAssetFilter
												}
											>
												{AssetFiltersList.map(
													(a, i) => (
														<DropdownItem
															key={a.value}
															textValue={a.label}
															value={a.value}
															description={a.desc}
														>
															{AssetFilter.has(
																a.value
															) ? (
																<b>
																	{a.label.toString()}
																</b>
															) : (
																a.label.toString()
															)}
														</DropdownItem>
													)
												)}
											</DropdownMenu>
										</Dropdown>
									</div>
								</div>

								{AssetPlatformsData.isLoading ? (
									<TabsSkeleton>
										<Spinner
											label={
												"Getting Asset Platforms data ..."
											}
											color="primary"
											labelColor="primary"
										/>
									</TabsSkeleton>
								) : AssetPlatformsData.error ? (
									<ComponentLevelError
										ErrorObj={AssetPlatformsData.error}
										Msg={
											"Error Occured while getting Asset Platforms data." +
											AssetPlatformsData.error
												.response.data ||
											"Error Occured while getting Asset Platforms data"
										}
										Mutate={AssetPlatformsData.mutate}
									/>
								) : AssetPlatformsData.data ? (
									<MyTable
										Data={AssetPlatformsData.data}
										ColumnsList={[
											{
												headerName: "Sr. No.",
												field: "sr_no",
												maxWidth: 120,
												pinned: "left",
											},
											{
												headerName: "Name",
												field: "name",
												hide: false,
												pinned: "left",
											},
											{
												headerName: "Id",
												field: "id",
												hide: false,
												pinned: false,
												cellRenderer: memo(({ data }) =>
													data.id ? (
														<Snippet
															hideSymbol={true}
															radius="sm"
															ref={(ref) => {
																if (!ref)
																	return;

																ref.onclick = (
																	e
																) => {
																	e.stopPropagation();
																};
															}}
															size="sm"
															color="secondary"
															variant="flat"
															copyIcon={
																<FaRegCopy />
															}
															checkIcon={
																<BsFillCheckCircleFill />
															}
															className="text-tiny bg-secondary text-primary"
															codeString={data.id}
															tooltipProps={{
																showArrow: true,
																size: "sm",
																content:
																	"Copy ID for " +
																	data.id,
															}}
														>
															{data.id}
														</Snippet>
													) : (
														"-"
													)
												),
											},
											{
												headerName: "Chain Identifier",
												field: "chain_identifier",
												hide: false,
												pinned: false,
												valueFormatter: ({ value }) => {
													return value || "-";
												},
											},

											{
												headerName: "Shortname",
												field: "shortname",
												hide: false,
												pinned: false,
												valueFormatter: ({ value }) => {
													return value || "-";
												},
											},
											{
												headerName: "Native Coin Id",
												field: "native_coin_id",
												hide: false,
												pinned: false,
												cellRenderer: memo(({ data }) =>
													data.native_coin_id ? (
														<Snippet
															hideSymbol={true}
															radius="sm"
															ref={(ref) => {
																if (!ref)
																	return;

																ref.onclick = (
																	e
																) => {
																	e.stopPropagation();
																};
															}}
															size="sm"
															color="secondary"
															variant="flat"
															copyIcon={
																<FaRegCopy />
															}
															checkIcon={
																<BsFillCheckCircleFill />
															}
															className="text-tiny bg-secondary text-primary"
															codeString={
																data.native_coin_id
															}
															tooltipProps={{
																showArrow: true,
																size: "sm",
																content:
																	"Copy ID for " +
																	data.native_coin_id,
															}}
														>
															{
																data.native_coin_id
															}
														</Snippet>
													) : (
														"-"
													)
												),
											},
										]}
									/>
								) : (
									<DataNotThere
										Text={
											"No Asset Platforms data available to show !"
										}
									/>
								)}
							</CardBody>
						</Card>
					</Tab>
				</Tabs>
			</TransitionDiv>
		);
	} catch (e) {
		return (
			<ComponentLevelError
				ErrorObj={{ message: e.toString() }}
				Msg={"While loading NFTs section, an error occured !"}
			/>
		);
	}
};

export default NFTHomeTabs;
