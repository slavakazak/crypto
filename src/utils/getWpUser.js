import axios from "axios"
const adminUsername = process.env.REACT_APP_WP_ADMIN_USERNAME
const adminPassword = process.env.REACT_APP_WP_ADMIN_PASSWORD
const url = process.env.REACT_APP_SITE_URL

export default async function getWpUser(username) {
	try {
		const tokenResponse = await axios.post(`${url}/wp-json/jwt-auth/v1/token`, { username: adminUsername, password: adminPassword })
		const token = tokenResponse.data.token
		const response = await axios.get(`${url}/wp-json/wp/v2/users`, {
			params: { search: username },
			headers: { Authorization: `Bearer ${token}` }
		})
		const users = response.data
		if (users.length > 0) {
			return users[0]
		} else {
			return null
		}
	} catch (error) {
		console.error('Error getting user:', error)
	}
}