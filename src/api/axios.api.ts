import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/cookie.helper";

const apiIP = import.meta.env.VITE_API_HOST
const apiPort = import.meta.env.VITE_API_PORT

export const instance = axios.create({
	baseURL: `${apiIP}:${apiPort}/api`,
	headers: {
		Authorization: 'Bearer ' + getTokenFromLocalStorage()
	},
})