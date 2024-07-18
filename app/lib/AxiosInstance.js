import axios from 'axios';
const AxiosInstance = axios.create({
	baseURL: process.env.API_BASE_URL,
	timeout: 120000,
});


AxiosInstance.interceptors.request.use(async function (request) {
	return request;
}, function (error) {
	return Promise.reject(error);
});


AxiosInstance.interceptors.response.use(function (response) {

	// REMOVE EXTRA HEADERS 
	response.headers.delete('content-length')
	response.headers.delete('server')
	response.headers.delete('rndr-id')
	response.headers.delete('x-render-origin-server')
	return response;
}, function (error) {
	return Promise.reject(error);
});


export default AxiosInstance;