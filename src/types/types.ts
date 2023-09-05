export interface IUser {
	id: number
	email: string
	token: string
}

export interface IUserData {
	email: string
	password: string
}

export interface IResponceUser extends IUserData {
	id: number
	createdAt: string
	updatedAt: string
}

export interface IResponceUserData {
	token: string
	user: IResponceUser

}