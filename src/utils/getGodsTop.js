import axios from 'axios'
const url = process.env.REACT_APP_SITE_URL

export default async function getGodsTop(auth) {
	try {
		const response = await axios.get(`${url}/wp-json/custom/v1/top-partners`, { headers: auth })
		return response.data
	} catch (error) {
		console.error('Error fetching gods top:', error)
		return []
	}
}
