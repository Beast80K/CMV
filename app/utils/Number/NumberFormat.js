export default function NumberFormat(locale, value) {
    try {
        return new Intl.NumberFormat(locale, { maximumFractionDigits: 20, minimumFractionDigits: 0 }).format(
            value,
        )
    } catch (e) {
        return value
    }
}