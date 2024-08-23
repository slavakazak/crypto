import { useEffect, useState } from "react"
import getPaymentStatus from "../utils/getPaymentStatus"
import getWpPaymentId from "../utils/getWpPaymentId"
import updateOrderStatus from "../utils/updateOrderStatus"

export default function ThankYou({ wpId }) {
	const [paymentStatus, setPaymentStatus] = useState()
	useEffect(() => {
		async function initInvoice() {
			const paymentId = await getWpPaymentId(wpId)
			const newPaymentStatus = await getPaymentStatus(paymentId)
			setPaymentStatus(newPaymentStatus)
			if (newPaymentStatus.payment_status === 'finished') {
				await updateOrderStatus(newPaymentStatus.order_id, { status: 'completed' })
			}
		}
		initInvoice()
	}, [wpId])

	return (
		<div id="thank-you">
			{paymentStatus && (
				paymentStatus.payment_status !== 'finished' ?
					<div>Ошибка при оплате заказа</div>
					:
					<>
						<div>Спасибо за покупку</div>
						<div>Продукт: {paymentStatus.order_description}</div>
						<div>Номер заказа: {paymentStatus.order_id}</div>
						<div>Стоимость: {paymentStatus.price_amount} {paymentStatus.price_currency}</div>
						<div>Оплачено: {paymentStatus.pay_amount} {paymentStatus.pay_currency}</div>
						<div>Получено: {paymentStatus.outcome_amount} {paymentStatus.outcome_currency}</div>
						<div>Заказ создан: {paymentStatus.created_at}</div>
						<div>Заказ оплачен: {paymentStatus.updated_at}</div>
						<div>Тип перевода: {paymentStatus.type}</div>
					</>
			)}
		</div>
	)
}