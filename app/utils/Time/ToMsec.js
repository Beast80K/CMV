import moment from "moment"

function ToMsec(Duration) {
	try {

		if (Duration.includes('0')) {
			return 0
		}
		else {

			if (Duration.includes('sec')) {

				return moment.duration(Number(Duration), 's').asMilliseconds()
			}

			else if (Duration.includes('min')) {
				return moment.duration(Number(Duration), 'm').asMilliseconds()

			}

			else {
				return moment.duration(Number(Duration), 'h').asMilliseconds()
			}
		}



	} catch (e) {
		return parseInt(5 * 60000)
		// IF ERROR RETURN 5 MINUTES
	}
}

export default ToMsec;