import axios from "axios";

const adminUsername = process.env.REACT_APP_WP_ADMIN_USERNAME;
const adminPassword = process.env.REACT_APP_WP_ADMIN_PASSWORD;
const url = process.env.REACT_APP_SITE_URL;

export default async function addWpBalance(wpId, token = 0, coin = 0, usdt = 0) {
	try {
		// Получение токена авторизации
		const tokenResponse = await axios.post(`${url}/wp-json/jwt-auth/v1/token`, {
			username: adminUsername,
			password: adminPassword,
		});
		const authToken = tokenResponse.data.token;

		// Получение текущих мета полей пользователя
		const response = await axios.get(`${url}/wp-json/wp/v2/users/${wpId}`, {
			headers: { Authorization: `Bearer ${authToken}` },
		});
		const meta = response.data.meta || {};

		// Убедимся, что мета поля существуют, если нет, присвоим им 0
		const currentToken = meta.t_token || 0;
		const currentCoin = meta.t_coin || 0;
		const currentUsdt = meta.t_usdt || 0;

		// Обновление мета полей пользователя
		await axios.put(
			`${url}/wp-json/wp/v2/users/${wpId}`,
			{
				meta: {
					t_token: currentToken + token,
					t_coin: currentCoin + coin,
					t_usdt: currentUsdt + usdt,
				},
			},
			{ headers: { Authorization: `Bearer ${authToken}` } }
		);
	} catch (error) {
		console.error('Error adding balance:', error.response?.data || error.message);
	}
}
