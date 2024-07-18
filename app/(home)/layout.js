import NavBar from "../components/NavBar/NavBar";
import Container from "../components/Container/Container";
import Overview from "../components/Overview/Overview";
import GoToTop from "../components/GoToTop/GoToTop";
import PrivacyPolicyPopup from "../components/PrivacyPolicyPopup/PrivacyPolicyPopup";
import Footer from "../components/Footer/Footer";


export default function HomeLayout({ children }) {

	return (
		<div >
			<NavBar />
			<Container>
				<Overview />
				{children}
				<GoToTop />
				<PrivacyPolicyPopup />
			</Container>
			<Footer />
		</div>
	);
}

