const GetCananicalURL = () => {
	return process.env.ENV === "PROD" ? process.env.URl : "http://localhost:3000"

}

export default GetCananicalURL