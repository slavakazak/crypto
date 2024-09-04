import axios from 'axios'
const adminUsername = process.env.REACT_APP_WP_ADMIN_USERNAME
const adminPassword = process.env.REACT_APP_WP_ADMIN_PASSWORD
const url = process.env.REACT_APP_SITE_URL

export default async function getIdFromRef(ref) {
	try {
		const tokenResponse = await axios.post(`${url}/wp-json/jwt-auth/v1/token`, { username: adminUsername, password: adminPassword })
		const token = tokenResponse.data.token
		const response = await axios.get(`${url}/wp-json/custom/v1/id_from_ref/${ref}`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching transactions:', error)
		return []
	}
}
