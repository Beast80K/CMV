export default function ShortCurrency(locale, currency, number) {
    try {
        return new Intl.NumberFormat(locale, { style: 'currency', currency: currency, notation: "compact" }).format(
            parseFloat(number),
        )
    } catch (e) {
        return number
    }
}