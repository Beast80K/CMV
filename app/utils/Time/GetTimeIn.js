import moment from "moment"

/**
 * Returns Time in specified format as number.
 * 
 * Default : Duration = 5, From = 'm', To = 'ms'
 * 
 * Formats : milliseconds	ms | seconds s | minutes m | hours h | days d  | weeks w | months M | years y 

 * @param {number} [Duration=5] Duration
 * @param  { "ms" | "s" | "m" | "h" | "d" | "w" | "M" | "y"} [From='m'] From
 * @param {"ms" | "s" | "m" | "h" | "d" | "w" | "M" | "y"} [To='ms'] To
 * @return {number} 
 */
function GetTimeIn(Duration = 5, From = 'm', To = 'ms') {
    let Time = moment.duration(Number(Duration), From)
    let ConvertedTime = {
        "ms": Time.asMilliseconds(),
        "s": Time.asSeconds(),
        "m": Time.asMinutes(),
        "h": Time.asHours(),
        "d": Time.asDays(),
        "w": Time.asWeeks(),
        "M": Time.asWeeks(),
        "y": Time.asYears(),
    }

    return ConvertedTime[To]
}
