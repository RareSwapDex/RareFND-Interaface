import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";

const baseURL = process.env.REACT_APP_BASE_URL;

export default function useAxios(props) {
	const { authTokens, setUser, setAuthTokens, logOut } =
		useContext(AuthContext);

	const axiosInstance = axios.create({
		baseURL,
		headers:
			props && props.headers
				? { ...props.headers, Authorization: `Bearer ${authTokens?.access}` }
				: { Authorization: `Bearer ${authTokens?.access}` },
	});

	axiosInstance.interceptors.request.use(async (req) => {
		const user = jwt_decode(authTokens.access);
		const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

		if (!isExpired) return req;

		const response = await axios.post(`${baseURL}/api/auth/token/refresh/`, {
			refresh: authTokens.refresh,
		});

		localStorage.setItem("authTokens", JSON.stringify(response.data));

		setAuthTokens(response.data);
		setUser(jwt_decode(response.data.access));

		req.headers.Authorization = `Bearer ${response.data.access}`;
		return req;
	});

	axiosInstance.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response.status === 401) logOut();
			return "Session logged out, please login again!";
		}
	);

	return axiosInstance;
}

// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// const useAxios = axios.create({
// 	baseURL: process.env.REACT_APP_BACKEND_BASE_URL + "/api/",
// 	timeout: 5000,
// 	headers: {
// 		"Content-Type": "application/json",
// 		accept: "application/json",
// 	},
// });

// // Add a request interceptor to check for the access token and refresh it if it has expired

// let refreshing = false;

// useAxios.interceptors.request.use(
// 	async (config) => {
// 		const navigate = useNavigate();
// 		const token = localStorage.getItem("access_token");
// 		const refreshToken = localStorage.getItem("refresh_token");

// 		if (token) {
// 			// Check if the access token has expired
// 			const decodedToken = jwt_decode(token);
// 			const currentTime = Date.now() / 1000;
// 			if (decodedToken.exp < currentTime + 5) {
// 				// Access token has expired, try to get a new one with the refresh token
// 				if (refreshToken && !refreshing) {
// 					// check if refreshing flag is false
// 					try {
// 						refreshing = true; // set refreshing flag to true
// 						console.log("---------------- get_access_token 1", {
// 							refresh: refreshToken,
// 						});
// 						const response = await axios.post(
// 							process.env.REACT_APP_BACKEND_BASE_URL +
// 								"/api/auth/token/refresh/",
// 							{
// 								refresh: refreshToken,
// 							}
// 						);
// 						console.log("---------------- get_access_token 2", {
// 							response,
// 						});
// 						localStorage.setItem("access_token", response.data.access);
// 						console.log("---------------- get_access_token 3", {
// 							access_token: response.data.access,
// 						});
// 						config.headers["Authorization"] = `Bearer ${response.data.access}`;
// 					} catch (error) {
// 						// Refresh token has expired or is invalid, redirect to login page
// 						console.log(
// 							"---------------- get_access_token 8 Refresh token has expired or is invalid, redirect to login page"
// 						);
// 						window.location.href = "/loginnnnnn";
// 					} finally {
// 						refreshing = false; // set refreshing flag back to false
// 					}
// 				} else {
// 					config.headers["Authorization"] = `Bearer ${token}`; // use existing access token
// 				}
// 			} else {
// 				config.headers["Authorization"] = `Bearer ${token}`;
// 			}
// 		} else {
// 			// No access token available, redirect to login page
// 			console.log(
// 				"---------------- get_access_token 9 No access token available, redirect to login page"
// 			);

// 			navigate("/login");
// 		}
// 		console.log("---------------- get_access_token 4", {
// 			config: config,
// 		});
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

// export default useAxios;
