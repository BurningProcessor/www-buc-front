function getCookie(name: string) { return document.cookie
	.split('; ')
	.find((row) => row.startsWith(name + '='))
	?.split('=')[1]
}

const tokenName = 'token'

export function getTokenFromLocalStorage(): string | undefined {
	// const data = localStorage.getItem(tokenName)
	// const token: string = data ? JSON.parse(data) : ''

	const token = getCookie(tokenName)

	return token
}

export function setTokenToLocalStorage(token: string) {
	// localStorage.setItem(tokenName, JSON.stringify(token))

	document.cookie = `${tokenName}=${token};max-age=${60 * 60 * 24 * 30}`
}

export function removeTokenFromLocalStorage() {
	// localStorage.removeItem(tokenName)

	document.cookie = `token=${tokenName};max-age=0`
}
