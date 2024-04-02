import axios from "axios";

const config = {
	baseURL: `${process.env.REACT_APP_API_SERVER}`,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
};
const ServerAPI = axios.create(config);
const authInterceptor = (config) => {
	const token = localStorage.getItem("accessToken");
	if(!!token) config.headers.Authorization = token;
	return config;
};
ServerAPI.interceptors.request.use(authInterceptor);
ServerAPI.interceptors.response.use((response) => {
	return response;
}, (error) => { // Anything except 2XX goes to here
	const status = error.response?.status || 500;
	console.log('status', status);
	if (status === 401) {
		localStorage.clear();
		window.location = window.location.protocol + "//" + window.location.host + "/login"
	}else if( status === 405){
		return Promise.reject(error); // Delegate error to calling side
	}else {
		return Promise.reject(error); // Delegate error to calling side
	}
});

export default ServerAPI; 