import axios from 'axios'
const url = process.env.REACT_APP_SITE_URL

export default async function deleteUser(auth, wpId) {
	try {
		// Выполняем DELETE-запрос на ваш кастомный API
		const response = await axios.post(`${url}/wp-json/custom/v1/delete-user/${wpId}`, {}, { headers: auth })

		if (response.status === 200) {
			console.log('User deleted successfully:', response.data);
			// Вы можете обновить состояние приложения или уведомить пользователя об успешном удалении
		} else {
			console.log('Failed to delete user:', response);
		}
	} catch (error) {
		console.error('Error deleting user:', error.response ? error.response.data : error.message);
		// Обрабатываем ошибки, если запрос не удался
	}
}