import robot from '../img/robot.png'
import createOrder from '../utils/createOrder'
import createInvoice from '../utils/createInvoice'
import { useTranslation } from 'react-i18next'
import TopMenu from '../components/TopMenu'
import { useState } from 'react'
import Switch from '../components/Switch'
import { InfoIcon } from '../components/Icons'

export default function Workshop({ profileData, wpId, setData }) {
	const { t } = useTranslation()

	const [inventory, setInventory] = useState(false)

	// Данные заказа
	// const orderData = {
	// 	customer_id: wpId,
	// 	payment_method: "nowpayments_gateway",
	// 	payment_method_title: "NOWPayments",
	// 	set_paid: true,
	// 	billing: {
	// 		first_name: profileData.fullName,
	// 		email: profileData.email
	// 	},
	// 	line_items: [
	// 		{
	// 			product_id: 16,
	// 			quantity: 1
	// 		}
	// 	]
	// }

	// async function buyClickHandler() {
	// 	const order = await createOrder(orderData)
	// 	const invoice = await createInvoice({
	// 		price_amount: order.total,
	// 		price_currency: order.currency,
	// 		order_id: order.id,
	// 		order_description: order.line_items.map(item => item.name).join(', '),
	// 		ipn_callback_url: 'https://k2-bot.com/ipn-handler.php',
	// 		success_url: 'https://k2-bot.store/thank-you/',
	// 		cancel_url: 'https://k2-bot.store/thank-you/',
	// 	})
	// 	window.location.assign(invoice.invoice_url)
	// }

	return (
		<div id="workshop">
			<TopMenu profileData={profileData} setData={setData} wpId={wpId} />
			<Switch second={inventory} setSecond={setInventory} />
			{inventory ? <>
				Инвентарь
			</> : <>
				<h2>Роботы</h2>
				<div className='shop-slider'>
					<div className='slider-track'>
						<div className='product-card'>
							<div className='image'><img src={robot} alt='K2' /></div>
							<div className='title'>
								<h3>K-2</h3>
								<div className='info'><InfoIcon /></div>
							</div>
							<p className='text'>Секретная разработка гениальных учёных. С помощью заложенных алгоритмов делает прибыль!</p>
							<div className='get'>ПОЛУЧИТЬ</div>
						</div>
						<div className='product-card inactive'>
							<div className='image'><img src={robot} alt='K2' /></div>
							<div className='title'>
								<h3>K-X</h3>
								<div className='info'><InfoIcon /></div>
							</div>
							<p className='text'>В разработке</p>
							<div className='get'>ПОЛУЧИТЬ</div>
						</div>
						<div className='product-card inactive'>
							<div className='image'><img src={robot} alt='K2' /></div>
							<div className='title'>
								<h3>K-X</h3>
								<div className='info'><InfoIcon /></div>
							</div>
							<p className='text'>В разработке</p>
							<div className='get'>ПОЛУЧИТЬ</div>
						</div>
					</div>
				</div>

			</>}
		</div>
	)
}