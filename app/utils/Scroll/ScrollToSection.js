
/** This function gets URL & then scrolls to section whose ID is from obtained from URL  */
const ScrollToSection = () => {
	let url = window.location.href
	let SectionID = document.getElementById((url.split('#').pop()))
	if (SectionID) {

		SectionID.scrollIntoView({
			block: 'start',
			behavior: "smooth"
		})
	}
}

export default ScrollToSection