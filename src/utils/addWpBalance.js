import axios from "axios"
import addTransaction from "./addTransaction"
import getUTCTime from "./getUTCTime"

const adminUsername = process.env.REACT_APP_WP_ADMIN_USERNAME
const adminPassword = process.env.REACT_APP_WP_ADMIN_PASSWORD
const url = process.env.REACT_APP_SITE_URL

export default async function addWpBalance(wpId, value = 0, currency = 'token', comment = '') {
	try {
		// Получение токена авторизации
		const tokenResponse = await axios.post(`${url}/wp-json/jwt-auth/v1/token`, { username: adminUsername, password: adminPassword })
		const token = tokenResponse.data.token
		// Получение текущих мета полей пользователя
		const response = await axios.get(`${url}/wp-json/wp/v2/users/${wpId}`, { headers: { Authorization: `Bearer ${token}` } })
		const meta = response.data.meta || {}
		// Убедимся, что мета поле существует, если нет, присвоим 0
		const current = meta['t_' + currency] || 0
		// Обновление мета поля пользователя
		await axios.put(`${url}/wp-json/wp/v2/users/${wpId}`,
			{ meta: { ['t_' + currency]: current + value } },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		// Создание транзакции
		await addTransaction({
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
