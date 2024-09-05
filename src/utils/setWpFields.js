import axios from "axios"
const adminUsername = process.env.REACT_APP_WP_ADMIN_USERNAME
const adminPassword = process.env.REACT_APP_WP_ADMIN_PASSWORD
const url = process.env.REACT_APP_SITE_URL

export default async function setWpFields(wpId, meta, email, password) {
	try {
		const tokenResponse = await axios.post(`${url}/wp-json/jwt-auth/v1/token`, { username: adminUsername, password: adminPassword })
		const token = tokenResponse.data.token
		//обновление мета полей
		await axios.post(`${url}/wp-json/wp/v2/users/${wpId}`,
			{ meta },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		//изменение email и password
		if (email && password) {
			await axios.post(`${url}/wp-json/wp/v2/users/${wpId}`,
				{ email, password },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
		}
	} catch (error) {
		console.error('Error creating user:', error.response?.data || error.message)
	}
}