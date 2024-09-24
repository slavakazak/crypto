import axios from 'axios'
const url = process.env.REACT_APP_SITE_URL

export default async function getFAQ(auth) {
	try {
		const response = await axios.get(`${url}/wp-json/custom/v1/faq`, { headers: auth });
		return response.data
	} catch (error) {
		console.error('Error fetching faq:', error)
		return []
	}
}