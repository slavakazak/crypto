import axios from "axios"
const adminUsername = process.env.REACT_APP_WP_ADMIN_USERNAME
const adminPassword = process.env.REACT_APP_WP_ADMIN_PASSWORD
const url = process.env.REACT_APP_SITE_URL

export default async function setWpFields(wpId, data) {
	try {
		const tokenResponse = await axios.post(`${url}/wp-json/jwt-auth/v1/token`, { username: adminUsername, password: adminPassword })
		const token = tokenResponse.data.token

		// Подготавливаем данные для отправки
		const userData = {
			meta: {
				t_nickname: data.nickname,
				t_full_name: data.fullName,
				t_username: data.username,
				t_gender: data.gender?.tag,
				t_age: parseInt(data.age, 10),
				t_country: data.country?.tag,
				t_login: data.login,
				t_password: data.password,
				t_password_changed: data.passwordChanged,
				t_pin: data.pin,
				t_wallet: data.wallet,
				t_avatars: data.avatars?.join(','),
				t_my_avatar: data.myAvatar,
				t_avatar: data.avatar,
				t_language: data.language?.tag,
				t_level: parseInt(data.level, 10),
				t_token: +data.token,
				t_coin: +data.coin,
				t_usdt: +data.usdt,
				t_ref: data.ref,
				t_link: data.link,
			},
			password: data.password
		}

		// Добавляем email только если он не пустой
		if (data.email && data.email.trim()) {
			userData.email = data.email.trim()
		}

		// Отправляем запрос
		await axios.post(`${url}/wp-json/wp/v2/users/${wpId}`, userData, { headers: { Authorization: `Bearer ${token}` } })
	} catch (error) {
		console.error('Error setWpFields:', error.response?.data || error.message)
	}
}
