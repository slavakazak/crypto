import axios from "axios"
const url = process.env.REACT_APP_SITE_URL

export default async function getWpUserId(auth, username) {
	try {
		const response = await axios.get(`${url}/wp-json/wp/v2/users`, { params: { search: username }, headers: auth })
		const users = response.data
		if (users.length > 0) return users[0].id
		return null
	} catch (error) {
		console.error('Error getting user id:', error)
	}
}