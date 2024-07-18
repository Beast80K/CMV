"use client";

import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";

import {
	Document,
	Image,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";
import { BsPrinterFill } from "react-icons/bs";
import moment from "moment";

const PDFDownloadLink = dynamic(
	() => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
	{
		ssr: false,
	}
);



const PrintToPDFBtn = ({ PageName }) => {
	const styles = StyleSheet.create({
		body: {
			paddingTop: 30,
			paddingBottom: 30,
			paddingHorizontal: 30,
		},
		createdOn: {
			fontSize: 10,
			textAlign: "left",
			paddingTop: 30,
			paddingBottom: 30,
		},
		updatedOn: {
			fontSize: 10,
			textAlign: "right",
			paddingTop: 30,
			paddingBottom: 30,
		},
		title: {
			fontSize: 30,
			textAlign: "center",
			paddingBottom: 10,
			fontWeight: "bold",
		},
		subTitle: {
			fontSize: 10,
			textAlign: "center",
			paddingBottom: 30,
			fontWeight: "bold",
		},
		date: {
			fontSize: 10,
			paddingBottom: 20,
			fontWeight: "bold",
			flexDirection: "row",
			justifyContent: "space-between",
		},
		heading: {
			textAlign: "left",
			fontWeight: "bold",
			fontSize: 10,
		},
		para: {
			textAlign: "justify",
			fontWeight: "bold",
			fontSize: 10,
			paddingTop: 10,
			paddingBottom: 20,
		},
		header: {
			fontSize: 8,
			fontWeight: "bold",
			marginBottom: 20,
			flexDirection: "row",
			justifyContent: "space-between",
			color: "grey",
		},
		pageNumber: {
			position: "absolute",
			fontSize: 8,
			bottom: 30,
			left: 0,
			right: 0,
			textAlign: "center",
			color: "grey",
		},
		footerLeft: {
			position: "absolute",
			fontSize: 8,
			bottom: 30,
			left: 30,
			textAlign: "center",
			color: "grey",
		},
		footerRight: {
			position: "absolute",
			fontSize: 8,
			bottom: 30,
			right: 30,
			textAlign: "center",
			color: "grey",
		},
	});

	const PagesData = {
		"cookies-policy": {
			name: "cookies-policy",
			header: "Cookies Policy",
			subHeader:
				"CryptoMarketVision (CMV) shall not be hold responsible for anything.",
			createdOn: "Monday, 1st January 2024, 00:00:00 AM",
			updatedOn: "Monday, 1st January 2024, 00:00:00 AM",
			welcomeHeader: "Welcome to CryptoMarketVision (CMV)",
			welcomeMsg:
				"This Cookie Policy, covers use of CryptoMarketVision (CMV) by visiting this website, you agree to these terms legally. We recommend that you read this Cookie Policy carefully. You may use CryptoMarketVision (CMV) only if you agree this Cookie Policy, Privacy Policy, Disclaimer, Terms Of Service, and Terms of Use. If you have still have any questions, please contact us through Contact Form given in Contact Us page.",
			content: [
				{
					title: "Cookies We Use",
					subTitle: `We don't use cookies but store data in local storage, and Visitors are identified by hash generated from incoming request. Generated hash is valid for a single day, it automatically gets reset.`,
				},
				{
					title: `Functionality Cookies & Necessary / Essential Cookies`,
					subTitle: `None, but we store data in Local Storage of browser, it gets cleared when user clears history along with website data & site settings. This data used to remember choices made by you when use this website, such as remembering your language preference, currency preference, theme preference. This helps us in providing more personal experience.`,
				},
				{
					title: `Notice Acceptance Cookies`,
					subTitle: `None, but we store data in Local Storage of browser, it gets cleared when user clears history along with website data & site settings. This data used to remember choices made by you when use this website, such as remembering your language preference, currency preference, theme preference. This helps us in providing more personal experience. Next time when a Visitor arrives Notice will be shown automatically`,
				},
			],
		},
		"privacy-policy": {
			name: "privacy-policy",
			header: "Privacy Policy",
			subHeader: "CryptoMarketVision (CMV) respects your privacy.",
			createdOn: "Monday, 1st January 2024, 00:00:00 AM",
			updatedOn: "Monday, 1st January 2024, 00:00:00 AM",
			welcomeHeader: "Welcome to CryptoMarketVision (CMV)",
			welcomeMsg:
				"This Privacy Policy, covers What Data is collected, generated, & used for. You may use CryptoMarketVision (CMV) only if you agree this Privacy Policy, Cookie Policy, Disclaimer, Terms Of Service, and Terms of Use. If you have still have any questions, please contact us through Contact Form given in Contact Us page.",
			content: [
				{
					title: "Information We Collect Indirectly From You",
					subTitle: `Usage Data :  Usage Data is collected automatically when using the Service. IP Address, geographic location etc. gets collected as it is used to provide services.`,
				},
				{
					title: `Functionality Cookies & Necessary / Essential Cookies`,
					subTitle: `None, but we store data in Local Storage of browser, it gets cleared when user clears history along with website data & site settings. This data used to remember choices made by you when use this website, such as remembering your language preference, currency preference, theme preference. This helps us in providing more personal experience.`,
				},
				{
					title: `Use of Your Personal Data`,
					subTitle: `Not used.`,
				},
				{
					title: `Retention of Your Personal Data`,
					subTitle: `None, As we do not collect, store, gather user's personal data here.`,
				},
				{
					title: `Transfer of Your Personal Data`,
					subTitle: `None, As we do not collect, store, gather user's personal data here.`,
				},
				{
					title: `Disclosure of Your Personal Data`,
					subTitle: `None, As we do not collect, store, gather user's personal data here.`,
				},
				{
					title: `Security of Your Personal Data`,
					subTitle: `None, As we do not collect, store, gather user's personal data here.`,
				},
				{
					title: `Links to Third Party Sites`,
					subTitle: `None, As we do not collect, store, gather user's personal data here.`,
				},

				{
					title: `Policy Applies to`,
					subTitle: `Visitors : Visitors/End Users to our Site.`,
				},
			],
		},
		disclaimer: {
			name: "disclaimer",
			header: "Disclaimers",
			subHeader: "You are responsible for the use of service.",
			createdOn: "Monday, 1st January 2024, 00:00:00 AM",
			updatedOn: "Monday, 1st January 2024, 00:00:00 AM",
			welcomeHeader: "Welcome to CryptoMarketVision (CMV)",
			welcomeMsg: `This Disclaimer, covers use of CryptoMarketVision (CMV) by visiting this website, you agree to these terms legally. We recommend that you read this Disclaimer carefully. You may use CryptoMarketVision (CMV) only if you agree this Disclaimer, Privacy Policy,Terms Of Use, Terms Of Service, and Cookie Policy. The information provided by CryptoMarketVision (CMV) shall not be used for real-world apllications. CryptoMarketVision (CMV) don't provide warranty or guarantee for anything present on this site. CryptoMarketVision (CMV) shall not be hold responsible for anything.You are responsible for the use of Service. If you have still have any questions, please contact us through Contact Form given in Contact Us page.`,
			content: [
				{
					title: "Warranty Disclaimer",
					subTitle: `We don't provide warranty or guarantee for anything present on this site. CryptoMarketVision (CMV) shall not be hold responsible for anything. CryptoMarketVision (CMV)'s use or reliance on any information is completely at your own risk.`,
				},
				{
					title: `Accuracy Disclaimer`,
					subTitle: `We don't provide warranty or guarantee accuracy, validity, reliabaility, completeness, free of errors or interruptions or availability of data.`,
				},
				{
					title: `External Links Disclaimer`,
					subTitle: `By clicking any external link CryptoMarketVision (CMV) will not be liable, We don't provide warranty or guarantee accuracy, validity, reliabaility, completeness, liability, free of errors or interruptions or availability of data. External Links are not Investigated or verified by us. CryptoMarketVision (CMV) will not be liable, shall not be hold responsible for anything.`,
				},
				{
					title: `Copyright Disclaimer`,
					subTitle: `Various text, logos, images, graphs/charts, UI-UX design, etc are subject to copyright protection. CoinGecko logo used in CryptoMarketVision (CMV) is for attribution purpose only, & it belongs to CoinGecko. You may not mis-use, infringe, or share it as yours.`,
				},
				{
					title: `Trademark Disclaimer`,
					subTitle: `CoinGecko logo used in CryptoMarketVision (CMV) is for attribution purpose only, & it belongs to CoinGecko. CryptoMarketVision (CMV) is not partnered/affiliated to them.`,
				},
				{
					title: `Investment Disclaimer`,
					subTitle: `We don't provide warranty or guarantee accuracy, validity, reliabaility, completeness, free of errors or interruptions or availability of data. CryptoMarketVision (CMV)'s use or reliance on any information is completely at your own risk. CryptoMarketVision (CMV) will not be liable, shall not be hold responsible for anything.`,
				},
			],
		},
		// terms-of-service
		"terms-of-service": {
			name: "terms-of-service",
			header: "Terms Of Service",
			subHeader: "Thank you for using our services.",
			createdOn: "Monday, 1st January 2024, 00:00:00 AM",
			updatedOn: "Monday, 1st January 2024, 00:00:00 AM",
			welcomeHeader: "Welcome to CryptoMarketVision (CMV)",
			welcomeMsg: `This Terms of Services, covers terms of service provided by CryptoMarketVision (CMV) by visiting this website, you agree to these terms legally. We recommend that you read this Terms of Service carefully. You may use CryptoMarketVision (CMV) only if you agree this Terms of Use, Privacy Policy, Disclaimer, and Cookie Policy. If you have still have any questions, please contact us through Contact Form given in Contact Us page. Do not use are services if you don't agree with various Terms & Conditions etc.`,
			content: [
				{
					title: "Use Of Service",
					subTitle: `We don't provide warranty or guarantee for anything present on this site. CryptoMarketVision (CMV) shall not be hold responsible for anything. CryptoMarketVision (CMV)'s use or reliance on any information is completely at your own risk.`,
				},
				{
					title: `Age`,
					subTitle: `People below age group 18 may not access or use the Service unless their use is directly authorized by their parent/guardian who agrees to these Terms.`,
				},
				{
					title: `Service`,
					subTitle: `You are granted a permission for personal use to only view this website. You are not allowed to reverse-engineer, bypass, perform data-mining, misuse,lease, sell, distribute, offer, create copy, decompile, attempt to obtain the source code, modify, to transmit malicious code, spamming, etc. these service. CryptoMarketVision (CMV) is an personal, non-commercial project made as an education project, hence this website shall not be used for real-world applications. You are responsible for the use of Service.`,
				},
				{
					title: `Copyright Policy`,
					subTitle: `CryptoMarketVision (CMV) doesn't allows you to reverse-engineer, bypass, perform data-mining, misuse,lease, sell, distribute, offer, create copy, decompile, attempt to obtain the source code, modify, to transmit malicious code, spamming, etc.`,
				},
				{
					title: `Limitation of Liability`,
					subTitle: `CryptoMarketVision (CMV) is an personal, non-commercial project made as an education project, hence this website shall not be used for real-world applications. You are responsible for the use of Service. CryptoMarketVision (CMV) will not be liable for anything. CryptoMarketVision (CMV) don't provide warranty or guarantee accuracy, validity, reliabaility, completeness, free of errors or interruptions or availability of data.CryptoMarketVision (CMV) can modify terms, anytime, we'll not notify users. Users should regularly review terms & stay updated. CryptoMarketVision (CMV) don't provide warranty or guarantee for anything present on this site. CryptoMarketVision (CMV) shall not be hold responsible for anything.`,
				},
				{
					title: `External Links`,
					subTitle: `By clicking any external link CryptoMarketVision (CMV) will not be liable, We don't provide warranty or guarantee accuracy, validity, reliabaility, completeness, liability, free of errors or interruptions or availability of data. External Links are not Investigated or verified by us.`,
				},
				{
					title: `Termination of Services`,
					subTitle: `CryptoMarketVision (CMV) will terminate services, without prior notice or liability, for any reason whatsoever.`,
				},
				{
					title: `Services are "AS IS" and "AS AVAILABLE"`,
					subTitle: `CryptoMarketVision (CMV) don't provide warranty or guarantee for anything present on this site. CryptoMarketVision (CMV) shall not be hold responsible for anything. CryptoMarketVision (CMV) don't provide warranty or guarantee accuracy, validity, reliabaility, completeness, free of errors or interruptions or availability of data. You are responsible for the use of Service.`,
				},
				{
					title: `Warranty Disclaimer`,
					subTitle: `CryptoMarketVision (CMV) don't provide warranty or guarantee for anything present on this site. CryptoMarketVision (CMV) shall not be hold responsible for anything.`,
				},
				{
					title: `Accuracy Disclaimer`,
					subTitle: `CryptoMarketVision (CMV) don't provide warranty or guarantee accuracy, validity, reliabaility, completeness, free of errors or interruptions or availability of data.`,
				},
				{
					title: `Changes to Terms of Services`,
					subTitle: `CryptoMarketVision (CMV) can modify Terms of Services, anytime, we'll not notify users. Users should regularly review terms & stay updated.`,
				},
			],
		},
		"terms-of-use": {
			name: "terms-of-use",
			header: "Terms Of Use",
			subHeader: `CryptoMarketVision(CMV) shall be used only for what it's made for.`,
			createdOn: "Monday, 1st January 2024, 00:00:00 AM",
			updatedOn: "Monday, 1st January 2024, 00:00:00 AM",
			welcomeHeader: "Welcome to CryptoMarketVision (CMV)",
			welcomeMsg:
				"This Terms of Use, covers use of CryptoMarketVision (CMV) by visiting this website, you agree to these terms legally. We recommend that you read this Terms of Use carefully. You may use CryptoMarketVision (CMV) only if you agree this Terms of Use, Privacy Policy, Disclaimer, Terms Of Service, and Cookie Policy. If you have still have any questions regarding, please contact us through Contact Form given in Contact Us page.",
			content: [
				{
					title: "Use Of Service",
					subTitle: `We don't provide warranty or guarantee for anything present on this site. CryptoMarketVision (CMV) shall not be hold responsible for anything. CryptoMarketVision (CMV)'s use or reliance on any information is completely at your own risk.`,
				},
				{
					title: `Age`,
					subTitle: `People below age group 18 may not access or use the Service unless their use is directly authorized by their parent/guardian who agrees to these Terms.`,
				},

				{
					title: `Warranty Disclaimer`,
					subTitle: `CryptoMarketVision (CMV) don't provide warranty or guarantee for anything present on this site. CryptoMarketVision (CMV) shall not be hold responsible for anything.`,
				},
				{
					title: `Accuracy Disclaimer`,
					subTitle: `CryptoMarketVision (CMV) don't provide warranty or guarantee accuracy, validity, reliabaility, completeness, free of errors or interruptions or availability of data.`,
				},

				{
					title: `Changes to the Terms`,
					subTitle: `CryptoMarketVision (CMV) can modify terms, anytime, we'll not notify users. Users should regularly review terms & stay updated.`,
				},
				{
					title: `Limitation of Liability`,
					subTitle: `CryptoMarketVision (CMV) is an personal, non-commercial project made as an education project, hence this website shall not be used for real-world applications. You are responsible for the use of Service. CryptoMarketVision (CMV) will not be liable for anything. CryptoMarketVision (CMV) don't provide warranty or guarantee accuracy, validity, reliabaility, completeness, free of errors or interruptions or availability of data.CryptoMarketVision (CMV) can modify terms, anytime, we'll not notify users. Users should regularly review terms & stay updated. CryptoMarketVision (CMV) don't provide warranty or guarantee for anything present on this site. CryptoMarketVision (CMV) shall not be hold responsible for anything.`,
				},
			],
		},
	};

	const PDFDOC = () => (
		<Document
			title={PagesData[PageName].header}
			author="CryptoMarketVision(CMV)"
			subject={PagesData[PageName].header}
			creator="CryptoMarketVision(CMV)"
		>
			<Page style={styles.body}>
				<View style={styles.header}>
					<Text>CryptoMarketVision (CMV)</Text>

					<Text>{PagesData[PageName].header}</Text>
				</View>

				<Text style={styles.title}>{PagesData[PageName].header}</Text>
				<Text style={styles.subTitle}>
					{PagesData[PageName].subHeader}
				</Text>

				<View style={styles.date}>
					<Text>{PagesData[PageName].createdOn}</Text>
					<Text>{PagesData[PageName].updatedOn}</Text>
				</View>

				<Text style={styles.para}>
					{PagesData[PageName].welcomeMsg}
				</Text>
				{PagesData[PageName]["content"].map((v, i) => (
					<View>
						<Text style={styles.heading}>{v.title + "\n"}</Text>
						<Text style={styles.para}>{v.subTitle}</Text>
					</View>
				))}

				<Text
					style={styles.footerLeft}
					render={({ pageNumber, totalPages }) =>
						`${PagesData[PageName].header} | CryptoMarketVision (CMV)`
					}
					fixed
				/>

				<Text
					style={styles.footerRight}
					render={({ pageNumber, totalPages }) =>
						`Printed On : ${moment().format(
							"dddd, Do MMMM YYYY, HH:mm:ss A"
						)}`
					}
					fixed
				/>

				<Text
					style={styles.pageNumber}
					render={({ pageNumber, totalPages }) =>
						`${pageNumber} / ${totalPages}`
					}
					fixed
				/>

				<Image
					style={{
						width: 50,
						alignSelf: "center",
						margin: 10,
					}}
					src="/images/Logo.png"
				/>
			</Page>
		</Document>
	);

	return (
		<PDFDownloadLink
			document={<PDFDOC />}
			fileName={`${PagesData[PageName].header}`}
		>
			{({ loading }) => (
				<div className="flex justify-end">
					<Button
						color="primary"
						variant="flat"
						radius="sm"
						size="sm"
						isLoading={loading}
						endContent={<BsPrinterFill size={16} />}
					>
						{loading ? "Loading ..." : "Print"}
					</Button>
				</div>
			)}
		</PDFDownloadLink>
	);
};

export default PrintToPDFBtn;
