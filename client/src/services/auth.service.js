import { axiosService } from "./axios.service";

// authenticate user by jwt token stored in browser local storage if it exists
export const isAuthenticated = async () =>
	axiosService({
		url: "/auth/is-authenticated",
		method: "GET",
		headers: {
			token: localStorage.getItem("token"),
		},
	});

// register new user and store jwt token in browser local storage
export const register = async (payload) => {
	const response = await axiosService({
		url: "/auth/register",
		method: "POST",
		data: payload
	});
	// store jwt token to browser local storage
	localStorage.setItem("token", response.data.jwtToken);
}

// login user and store jwt token in browser local storage
export const login = async (payload) => {
	const response = await axiosService({
		url: "/auth/login",
		method: "POST",
		data: payload
	});
	// store jwt token to browser local storage
	localStorage.setItem("token", response.data.jwtToken);
}

export const logout = () => {
	// remove jwt token from browser local storage
	localStorage.removeItem('token');
}
