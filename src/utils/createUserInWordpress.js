import axios from "axios"
import generateSecurePassword from './generateSecurePassword'
const adminUsername = process.env.REACT_APP_WP_ADMIN_USERNAME
const adminPassword = process.env.REACT_APP_WP_ADMIN_PASSWORD

export default async function createUserInWordpress(user, setProfileData, setWpId) {
	const nickname = user.username || user.first_name
	const username = 'user' + user.id
	const email = user.id + '@noemail.com'
	const password = generateSecurePassword(12)

	try {
		//создание пользователя
		const tokenResponse = await axios.post('https://k2-bot.com/wp-json/jwt-auth/v1/token', {
			username: adminUsername,
			password: adminPassword
		})
		const token = tokenResponse.data.token
		const response = await axios.post('https://k2-bot.com/wp-json/wp/v2/users',
			{
				username: username,
				email: email,
				password: password
			},
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		const userId = response.data.id
		//обновление мета поля
		await axios.post(`https://k2-bot.com/wp-json/wp/v2/users/${userId}`,
			{
				meta: {
					t_nickname: nickname
				}
			},
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		setProfileData(previous => ({ ...previous, nickname, password, username: nickname }))
		setWpId(userId)
	} catch (error) {
		console.error('Error creating user:', error.response?.data || error.message)
	}

}