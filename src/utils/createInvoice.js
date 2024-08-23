import axios from "axios"
const apiKey = process.env.REACT_APP_NOWPAYMENTS_API_KEY

export default async function createInvoice(params) {
	try {
		const response = await axios.post('https://api-sandbox.nowpayments.io/v1/invoice/?case=success',
			params,
			{ headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json', }, }
		)
		return response.data
	} catch (error) {
		console.error('Error creating invoice:', error);
	}
}