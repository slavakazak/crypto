import axios from 'axios'
const url = process.env.REACT_APP_SITE_URL
const consumerKey = process.env.REACT_APP_CONSUMER_KEY
const consumerSecret = process.env.REACT_APP_CONSUMER_SECRET

export default async function createOrder(orderData) {
	try {
		const response = await axios.post(`${url}/wp-json/wc/v3/orders`, orderData, {
			auth: { username: consumerKey, password: consumerSecret },
			headers: { 'Content-Type': 'application/json' }
		})
		console.log('Order created:', response.data)
		return response.data
	} catch (error) {
		console.error('Error creating order:', error.response ? error.response.data : error.message)
	}
}