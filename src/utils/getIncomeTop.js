import axios from 'axios'
const url = process.env.REACT_APP_SITE_URL

export default async function getIncomeTop(auth) {
	try {
		const response = await axios.get(`${url}/wp-json/custom/v1/top-income`, { headers: auth })
		return response.data
	} catch (error) {
		console.error('Error fetching income top:', error)
		return []
	}
}