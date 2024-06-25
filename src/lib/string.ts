export const getRandomString = (len: number) => {
	const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	let str = ""
	for (let i = 0; i <= len; i++) {
		const n = Math.floor(Math.random() * chars.length)
		str += chars[n]
	}
	return str
}
