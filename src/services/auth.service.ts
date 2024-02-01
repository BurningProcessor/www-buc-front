import { instance } from "../api/axios.api";
import { IResponceUserData, IUser, IUserData } from "../types/types";

export const AuthService = {
	async registration(userData: IUserData): Promise<IResponceUserData | undefined> {
		const { data } = await instance.post<IResponceUserData>('user', userData)
		return data
	},
	async login(userData: IUserData): Promise<IResponceUserData | undefined> {
		const { data } = await instance.post<IResponceUserData>('auth/login', userData)
		return data
	},
	async getProfile(): Promise<IUser | undefined> {
		const { data } = await instance.get<IUser>('auth/profile')
		if (data) return data
	},
}