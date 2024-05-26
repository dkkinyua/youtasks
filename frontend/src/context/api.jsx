import axios from "axios";

const createApi = () => {
	const api = axios.create({
		baseURL: "http://127.0.0.1:5000",
		timeout: 1000,
		headers: { "Content-Type": "application/json" },
	});

	// Request interceptor to add access token to headers
	api.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem("access_token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// Response interceptor to handle token expiration and refresh token
	api.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			const originalRequest = error.config;
			if (error.response && error.response.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
				const refreshToken = localStorage.getItem("refresh_token");
				try {
					const response = await api.post("/refresh", { token: refreshToken });
					if (response.status === 200) {
						const newAccessToken = response.data.token;
						localStorage.setItem("access_token", newAccessToken);
						api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
						originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
						return api(originalRequest);
					}
				} catch (err) {
					localStorage.removeItem("access_token");
					localStorage.removeItem("refresh_token");
					console.log(err);
					window.location.href = "/";
					return Promise.reject(err);
				}
			}
			return Promise.reject(error);
		}
	);
	return api;
};

export default createApi;
