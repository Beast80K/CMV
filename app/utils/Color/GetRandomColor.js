import { shuffle, uniq } from "lodash"
import randomColor from "randomcolor"


export function GetRandomColor({ luminosity = 'light', count = 5 }) {

	try {
		return shuffle(uniq(randomColor({ hue: 'random', luminosity, count: count * 2 })))

	} catch (e) {
		return shuffle([
			"#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0",
			"#3F51B5", "#03A9F4", "#4CAF50", "#F9CE1D", "#FF9800",
			"#33B2DF", "#546E7A", "#D4526E", "#13D8AA", "#A5978B",
			"#4ECDC4", "#C7F464", "#81D4FA", "#546E7A", "#FD6A6A",
			"#2B908F", "#F9A3A4", "#90EE7E", "#FA4443", "#69D2E7",
			"#449DD1", "#F86624", "#EA3546", "#662E9B", "#C5D86D",
			"#D7263D", "#1B998B", "#2E294E", "#F46036", "#E2C044",
			"#662E9B", "#F86624", "#F9C80E", "#EA3546", "#43BCCD",
			"#5C4742", "#A5978B", "#8D5B4C", "#5A2A27", "#C4BBAF",
			"#A300D6", "#7D02EB", "#5653FE", "#2983FF", "#00B1F2",
		])
	}
}