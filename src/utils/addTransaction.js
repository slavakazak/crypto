import axios from 'axios'
const adminUsername = process.env.REACT_APP_WP_ADMIN_USERNAME
const adminPassword = process.env.REACT_APP_WP_ADMIN_PASSWORD
const url = process.env.REACT_APP_SITE_URL

export default async function addTransaction(transactionData) {
	try {
		const tokenResponse = await axios.post(`${url}/wp-json/jwt-auth/v1/token`, { username: adminUsername, password: adminPassword })
		const token = tokenResponse.data.token
		const response = await axios.post(`${url}/wp-json/custom/v1/transactions`, transactionData, {
			headers: { Authorization: `Bearer ${token}` }
		})
		return response.data
	} catch (error) {
		console.error('Error adding transaction:', error)
		return null
	}
}