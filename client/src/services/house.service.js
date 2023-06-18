import { axiosService } from "./axios.service";

// get list of houses for user
export const getHouseOfUser = async () => {
	const houses = await axiosService({
		url: "/house",
		method: "GET",
		headers: {
			token: localStorage.getItem("token"),
		},
	});
    return houses.data;
}

// create new house for user
export const createHouse = async (payload) => {
	const response = await axiosService({
		url: "/house",
		method: "POST",
		headers: {
			token: localStorage.getItem("token"),
		},
		data: payload
	});
    console.log("🚀 ~ file: house.service.js:22 ~ createHouse ~ response:", response)
}
