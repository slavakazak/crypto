import axios from "axios"
import generateSecurePassword from './generateSecurePassword'
const adminUsername = process.env.REACT_APP_WP_ADMIN_USERNAME
const adminPassword = process.env.REACT_APP_WP_ADMIN_PASSWORD

export default async function createUserInWordpress(user, setProfileData, setUsername) {
	const nickname = user.username || user.first_name
	setUsername(nickname)

	const username = 'user' + user.id
	const email = user.id + '@noemail.com'
	const password = generateSecurePassword(12)

	setProfileData(previous => ({ ...previous, nickname, password }))

	try {
		const tokenResponse = await axios.post('https://k2-bot.com/wp-json/jwt-auth/v1/token', {
			username: adminUsername,
			password: adminPassword
		})
		const token = tokenResponse.data.token;
		const response = await axios.post('https://k2-bot.com/wp-json/wp/v2/users',
			{
				username: username,
				email: email,
				password: password
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)
		console.log('User created:', response.data);
	} catch (error) {
		console.error('Error creating user:', error.response.data);
	}

}