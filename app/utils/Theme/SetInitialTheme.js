export default function SetInitialTheme() {
	let Hours = new Date().getHours()
	const IsMorning = Hours > 6 && Hours < 18;
	try {
		let localTheme = localStorage.getItem('theme')
		// MORNING 6 O CLOCK & EVENING 6 O CLOCK
		if (localTheme) {
			// if localTheme === 'dark' || 'amoled'

			if (localTheme === "dark" || localTheme === "amoled") {

				return !IsMorning
					?
					localTheme
					:
					'light'
			}
			// if localTheme === 'light'

			else if (localTheme === "light") {
				return IsMorning
					?
					localTheme
					:
					'dark'
			}
			// if localTheme === 'system'

			else {
				return localTheme
			}
		}
		else {
			return !IsMorning
				?
				'dark'
				:
				'light'
		}
	} catch (e) {
		return !IsMorning
			?
			'dark'
			:
			'light'
	}
}
