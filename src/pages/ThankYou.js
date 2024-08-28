import { useEffect, useState } from "react"
import getPaymentStatus from "../utils/getPaymentStatus"
import getWpPaymentId from "../utils/getWpPaymentId"
import updateOrderStatus from "../utils/updateOrderStatus"
import { useTranslation } from 'react-i18next'

export default function ThankYou({ wpId }) {
	const { t } = useTranslation()
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
					<div>{t('thankYou.error')}</div>
					:
					<>
						<div>{t('thankYou.thankYou')}</div>
						<div>{t('thankYou.product')}: {paymentStatus.order_description}</div>
						<div>{t('thankYou.number')}: {paymentStatus.order_id}</div>
						<div>{t('thankYou.price')}: {paymentStatus.price_amount} {paymentStatus.price_currency}</div>
						<div>{t('thankYou.pay')}: {paymentStatus.pay_amount} {paymentStatus.pay_currency}</div>
						<div>{t('thankYou.outcome')}: {paymentStatus.outcome_amount} {paymentStatus.outcome_currency}</div>
						<div>{t('thankYou.created')}: {paymentStatus.created_at}</div>
						<div>{t('thankYou.updated')}: {paymentStatus.updated_at}</div>
						<div>{t('thankYou.type')}: {paymentStatus.type}</div>
					</>
			)}
		</div>
	)
}