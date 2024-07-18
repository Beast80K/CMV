import axios from "axios";
export const Fetcher = url => axios.get(url).then((resp) => {
	return resp.data
})
