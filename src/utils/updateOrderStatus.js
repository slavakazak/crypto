import axios from 'axios'
const url = process.env.REACT_APP_SITE_URL
const consumerKey = process.env.REACT_APP_CONSUMER_KEY
const consumerSecret = process.env.REACT_APP_CONSUMER_SECRET

export default async function updateOrderStatus(orderId, updateData) {
	try {
		const response = await axios.put(`${url}/wp-json/wc/v3/orders/${orderId}`, updateData, {
			auth: { username: consumerKey, password: consumerSecret },
			headers: { 'Content-Type': 'application/json' }
		})
		console.log('Order updated:', response.data)
		return response.data
	} catch (error) {
		console.error('Error updating order status:', error.response ? error.response.data : error.message)
	}
}