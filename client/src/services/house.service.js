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

export const deleteHouse = async (id) => {
	const response = await axiosService({
		url: `/house/${id}`,
		method: "DELETE",
		headers: {
			token: localStorage.getItem("token"),
		},
	});
	console.log("🚀 ~ file: house.service.js:36 ~ deleteHouse ~ response:", response)
}

// get list of houses for user
export const getRoomsOfHouse = async (houseId) => { // TODO: pass houseId as param
	const rooms = await axiosService({
		url: `/house/${houseId}/room`,
		method: "GET",
		headers: {
			token: localStorage.getItem("token"),
		},
	});
    return rooms.data;
}

// create new room
export const createRoom = async (payload) => {
	const response = await axiosService({
		url: "/house/room",
		method: "POST",
		headers: {
			token: localStorage.getItem("token"),
		},
		data: payload
	});
	console.log("🚀 ~ file: house.service.js:38 ~ createRoom ~ response:", response)
}

export const deleteRoom = async (id) => {
	const response = await axiosService({
		url: "/house/room",
		method: "DELETE",
		headers: {
			token: localStorage.getItem("token"),
		},
		data: {roomId: id}
	});
	console.log("🚀 ~ file: house.service.js:54 ~ deleteRoom ~ response:", response)
}
