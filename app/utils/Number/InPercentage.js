
const InPercentage = ({ Value = 0, Precision = 2 }) => {
	try {
		return `${Number(Value).toFixed(Precision)}%`

	} catch (e) {
		return `${Number(0).toFixed(Precision)}%`

	}
}

export default InPercentage