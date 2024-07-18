export default function CurrencyFormatter(locale, currency, number) {

	try {
		return new Intl.NumberFormat(locale, { style: 'currency', currency: currency, maximumFractionDigits: 20, minimumFractionDigits: 0 }).format(
			Number(number),
		)
	} catch (e) {

		return currency.toUpperCase() + " " + new Intl.NumberFormat(locale, { maximumFractionDigits: 20, minimumFractionDigits: 0 }).format(
			Number(number),
		)
	}
}