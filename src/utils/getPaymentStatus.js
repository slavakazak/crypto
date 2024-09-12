import axios from "axios"
const apiKey = process.env.REACT_APP_NOWPAYMENTS_API_KEY

export default async function getPaymentStatus(paymentId) {
	try {
		const response = await axios.get(`https://api-sandbox.nowpayments.io/v1/payment/${paymentId}`, { headers: { 'x-api-key': apiKey } })
		const paymentStatus = response.data
		return paymentStatus
	} catch (error) {
		console.error('Error fetching payment status:', error.response ? error.response.data : error.message)
	}
}