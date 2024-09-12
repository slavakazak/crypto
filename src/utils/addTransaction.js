import axios from 'axios'
const url = process.env.REACT_APP_SITE_URL

export default async function addTransaction(auth, transactionData) {
	try {
		const response = await axios.post(`${url}/wp-json/custom/v1/transactions`, transactionData, { headers: auth })
		return response.data
	} catch (error) {
		console.error('Error adding transaction:', error)
		return null
	}
}