import axios from "axios"
import addTransaction from "./addTransaction"
import getUTCTime from "./getUTCTime"
import getDateTimeString from "./getDateTimeString"
import { bonuses } from "./constants"
const url = process.env.REACT_APP_SITE_URL

export default async function addWpBonus(auth, wpId) {
	try {
		// Получение текущих мета полей пользователя
		const response = await axios.get(`${url}/wp-json/wp/v2/users/${wpId}`, { headers: auth })
		const meta = response.data.meta || {}
		// Убедимся, что мета поля существуют, если нет, присвоим 0
		const start = meta.t_start || 0
		const levels = JSON.parse(meta.t_levels)
		const coin = meta.t_coin || 0
		console.log(start, levels, coin)
		if (!levels || !levels[1]?.time) return
		const utcStartDate = new Date(levels[1].time.replace(' ', 'T') + 'Z')
		utcStartDate.setDate(utcStartDate.getDate() + 60)
		const startTime = getDateTimeString(utcStartDate)
		if (startTime !== '00:00' && start < 12) {
			// Обновление мета полей пользователя
			await axios.put(`${url}/wp-json/wp/v2/users/${wpId}`, {
				meta: {
					t_start: start + 1,
					t_coin: coin + bonuses[start]
				}
			}, { headers: auth })
		}
		// Создание транзакции
		await addTransaction(auth, {
			transaction_type: 'accrual',
			transaction_status: 'success',
			price: bonuses[start],
			currency: 'coin',
			transaction_time: getUTCTime(),
			user_id: wpId,
			comment: 'start bonus ' + (start + 1)
		})
	} catch (error) {
		console.error('Error adding bonus:', error.response?.data || error.message);
	}
}
