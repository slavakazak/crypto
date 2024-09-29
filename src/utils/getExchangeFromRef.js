import axios from 'axios'
const url = process.env.REACT_APP_SITE_URL

export default async function getExchangeFromRef(auth, ref) {
	try {
		const response = await axios.get(`${url}/wp-json/custom/v1/exchange_from_ref/${ref}`, { headers: auth })
		return response.data
	} catch (error) {
		console.error('Error getExchangeFromRef:', error)
		return []
	}
}
