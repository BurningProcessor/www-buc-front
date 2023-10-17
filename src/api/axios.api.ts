import axios from "axios";
import { getToketFromLocalStorage } from "../helpers/localstorage.helper";

export const instance = axios.create({
	baseURL: 'http://192.168.0.2:3000/api',
	headers: {
		Authorization: 'Bearer ' + getToketFromLocalStorage()
	}
})