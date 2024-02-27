import { instance } from "../api/axios.api";
import { IResponceLoginData, IUser, IUserData } from '../types/types'

export const AuthService = {
	async registration(userData: IUserData): Promise<IResponceLoginData | undefined> {
		const { data } = await instance.post<IResponceLoginData>('user', userData)
		return data
	},
	async login(userData: IUserData): Promise<IResponceLoginData | undefined> {
		const { data } = await instance.post<IResponceLoginData>('auth/login', userData)
		return data
	},
	async getProfile(): Promise<IUser | undefined> {
		const { data } = await instance.get<IUser>('auth/profile')
		if (data) return data
	},
}