import axios from "axios"
const url = process.env.REACT_APP_SITE_URL

export default async function getWpUser(auth, wpId) {
	try {
		const response = await axios.get(`${url}/wp-json/wp/v2/users/${wpId}`, { headers: auth })
		return response.data
	} catch (error) {
		console.error('Error getting user id:', error)
	}
}