import axios from "axios"
import getIdFromRef from "./getIdFromRef"
import addWpBalance from "./addWpBalance"
const adminUsername = process.env.REACT_APP_WP_ADMIN_USERNAME
const adminPassword = process.env.REACT_APP_WP_ADMIN_PASSWORD
const url = process.env.REACT_APP_SITE_URL

export default async function regWpUser(username, email, password, nickname, startParam, language) {
	try {
		//создание пользователя
		const tokenResponse = await axios.post(`${url}/wp-json/jwt-auth/v1/token`, { username: adminUsername, password: adminPassword })
		const token = tokenResponse.data.token
		const response = await axios.post(`${url}/wp-json/wp/v2/users`,
			{ username, email, password },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		const wpId = response.data.id
		//получение реферальной ссылки и добавление бонусов за приглашение
		let link = '1'
		if (wpId && startParam?.startsWith('r_')) {
			const refId = await getIdFromRef(startParam.slice(2))
			if (refId && +refId !== wpId) {
				const bonus = 1000
				await addWpBalance(wpId, bonus, 'token', `Этот пользователь зарегистрировался по реф ссылке пользователя ${refId}`)
				await addWpBalance(+refId, bonus, 'token', `Пользователь ${wpId} зарегистрировался по реф ссылке этого пользователя`)
				link = refId
			}
		}
		//обновление мета полей
		await axios.post(`${url}/wp-json/wp/v2/users/${wpId}`,
			{ meta: { t_nickname: nickname, t_username: nickname, t_password: password, t_ref: wpId + '', t_link: link, t_language: language } },
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		return wpId
	} catch (error) {
		console.error('Error creating user:', error.response?.data || error.message)
	}
}