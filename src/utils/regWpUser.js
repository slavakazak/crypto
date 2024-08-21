import axios from "axios"
const adminUsername = process.env.REACT_APP_WP_ADMIN_USERNAME
const adminPassword = process.env.REACT_APP_WP_ADMIN_PASSWORD
const url = process.env.REACT_APP_SITE_URL

export default async function regWpUser(username, email, password, nickname) {
	try {
		//создание пользователя
		const tokenResponse = await axios.post(`${url}/wp-json/jwt-auth/v1/token`, { username: adminUsername, password: adminPassword })
		const token = tokenResponse.data.token
		const response = await axios.post(`${url}/wp-json/wp/v2/users`,
			{ username, email, password },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		const wpId = response.data.id
		//обновление мета полей
		await axios.post(`${url}/wp-json/wp/v2/users/${wpId}`,
			{ meta: { t_nickname: nickname, t_username: nickname } },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		return wpId
	} catch (error) {
		console.error('Error creating user:', error.response?.data || error.message)
	}

}