import axios from "axios"
const adminUsername = process.env.REACT_APP_WP_ADMIN_USERNAME
const adminPassword = process.env.REACT_APP_WP_ADMIN_PASSWORD
const url = process.env.REACT_APP_SITE_URL

export default async function getToken() {
	try {
		const tokenResponse = await axios.post(`${url}/wp-json/jwt-auth/v1/token`, { username: adminUsername, password: adminPassword })
		return tokenResponse.data.token
	} catch (error) {
		console.error('Error getting user id:', error)
	}
}