import axios from 'axios'
const url = process.env.REACT_APP_SITE_URL

export default async function getIncome(auth, wpId) {
	try {
		const response = await axios.get(`${url}/wp-json/custom/v1/income/${wpId}`, { headers: auth })
		return response.data
	} catch (error) {
		console.error('Error fetching income:', error)
		return []
	}
}
