const tokenKey = 'token'

export function getTokenFromLocalStorage(): string {
	const data = localStorage.getItem(tokenKey)
	const token: string = data ? JSON.parse(data) : ''

	return token
}

export function setTokenToLocalStorage(token: string) {
	localStorage.setItem(tokenKey, JSON.stringify(token))
}

export function removeTokenFromLocalStorage() {
	localStorage.removeItem(tokenKey)
}