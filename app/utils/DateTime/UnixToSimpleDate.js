import moment from "moment";

const UnixToSimpleDate = (Timestamp) => {

    try {
        return moment.unix(Timestamp).format('dddd, Do MMMM YYYY, HH:mm:ss A')

    } catch (error) {
        return "-"
    }
}

export default UnixToSimpleDate