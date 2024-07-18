export default function ShortNumber(locale, number) {
    try {
        return new Intl.NumberFormat(locale, { notation: "compact" }).format(
            parseFloat(number),
        )
    } catch (e) {
        return number
    }
}