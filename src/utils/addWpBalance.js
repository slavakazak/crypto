import axios from "axios"
import addTransaction from "./addTransaction"
import getUTCTime from "./getUTCTime"
const url = process.env.REACT_APP_SITE_URL

export default async function addWpBalance(auth, wpId, value = 0, currency = 'token', comment = '') {
	try {
		// Получение текущих мета полей пользователя
		const response = await axios.get(`${url}/wp-json/wp/v2/users/${wpId}`, { headers: auth })
		const meta = response.data.meta || {}
		// Убедимся, что мета поле существует, если нет, присвоим 0
		const current = meta['t_' + currency] || 0
		// Обновление мета поля пользователя
		await axios.put(`${url}/wp-json/wp/v2/users/${wpId}`, { meta: { ['t_' + currency]: current + value } }, { headers: auth })
		// Создание транзакции
		await addTransaction(auth, {
			transaction_type: 'accrual',
			transaction_status: 'success',
			price: value,
			currency,
			transaction_time: getUTCTime(),
			user_id: wpId,
			comment
		})
	} catch (error) {
		console.error('Error adding balance:', error.response?.data || error.message);
	}
}
