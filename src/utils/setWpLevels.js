import axios from "axios"
const url = process.env.REACT_APP_SITE_URL

export default async function setWpLevels(auth, wpId, data) {
	try {
		// Подготавливаем данные для отправки
		const userData = {
			meta: {
				t_levels: JSON.stringify(data, null, ' '),
			}
		}
		// Отправляем запрос
		await axios.post(`${url}/wp-json/wp/v2/users/${wpId}`, userData, { headers: auth })
	} catch (error) {
		console.error('Error setWpLevels:', error.response?.data || error.message)
	}
}
