import createOrder from '../utils/createOrder'
import createInvoice from '../utils/createInvoice'

export default function Workshop({ profileData, wpId }) {
	// Данные заказа
	const orderData = {
		customer_id: wpId,
		payment_method: "nowpayments_gateway",
		payment_method_title: "NOWPayments",
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

	async function buyClickHandler() {
		const order = await createOrder(orderData)
		const invoice = await createInvoice({
			price_amount: order.total,
			price_currency: order.currency,
			order_id: order.id,
			order_description: order.line_items.map(item => item.name).join(', '),
			ipn_callback_url: 'https://k2-bot.com/ipn-handler.php',
			success_url: 'https://k2-bot.store/thank-you/',
			cancel_url: 'https://k2-bot.store/thank-you/',
		})
		window.location.assign(invoice.invoice_url)
	}

	return (
		<div id="workshop">
			<div>Workshop</div>
			<div className='buy' onClick={buyClickHandler}>Купить</div>
		</div>
	)
}