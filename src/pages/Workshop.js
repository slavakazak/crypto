import axios from 'axios'
import showMessage from '../utils/showMessage'
const url = process.env.REACT_APP_SITE_URL
const consumerKey = process.env.REACT_APP_CONSUMER_KEY
const consumerSecret = process.env.REACT_APP_CONSUMER_SECRET

export default function Workshop({ profileData, wpId, tg }) {
	// Данные заказа
	const orderData = {
		customer_id: wpId,
		payment_method: "bacs",
		payment_method_title: "Direct Bank Transfer",
		set_paid: true,
		billing: {
			first_name: profileData.fullName,
			email: profileData.email
		},
		line_items: [
			{
				product_id: 16,
				quantity: 1
			}
		]
	}

	// Функция для создания заказа
	async function createOrder(orderData) {
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

	// Данные для обновления статуса заказа
	const updateData = { status: 'completed' }

	// Функция для обновления статуса заказа
	async function updateOrderStatus(orderId, updateData) {
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

	async function buyClickHandler() {
		const order = await createOrder(orderData)
		await updateOrderStatus(order.id, updateData)
		showMessage(tg, 'Заказ создан!')
	}

	return (
		<div id="workshop">
			<div>Workshop</div>
			<div className='buy' onClick={buyClickHandler}>Создать заказ</div>
		</div>
	)
}