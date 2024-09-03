export default function generatePassword(length) {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
	let password = ""
	const cryptoArray = new Uint32Array(length)
	window.crypto.getRandomValues(cryptoArray)

	for (let i = 0; i < length; i++) {
		password += charset[cryptoArray[i] % charset.length]
	}
	return password
}