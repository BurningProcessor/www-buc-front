export interface IUser {
	id: number
	email: string
	// token: string
}

export interface IUserData {
	email: string
	password: string
}

export interface IResponceUser {
	id: number
	email: string
}

export interface IResponceLoginData {
	user: IResponceUser
	token: string
}

export interface ICategory {
	title: string
	id: number
	createdAt: string
	updatedAt: string
	transactions?: []
}

export interface ITransaction {
	title: string
	id: number
	type: string
	category: ICategory
	amount: number
	createAt: string
	updateAt: string
}

export interface IResponseTransactionLoader {
	categories: ICategory[]
	// transactions: ITransaction[]
	totalIncome: number
	totalExpense: number
	totalTransactions: number
}