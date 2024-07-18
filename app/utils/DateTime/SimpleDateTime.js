import moment from "moment";

const SimpleDateTime = (TimeStamp) => {
  try {

    // 
    return moment(TimeStamp).format('ddd, Do MMM YYYY, HH:mm:ss A')
  } catch (e) {
    return "-"
  }
}

export default SimpleDateTime