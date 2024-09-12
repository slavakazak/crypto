import generatePassword from './generatePassword'
import regWpUser from "./regWpUser"
import getWpUserId from './getWpUserId'

export default async function setWpUser(initData) {
	// Загрузка существующего пользователя
	const user = initData.user
	const username = `user${user.id}`
	let wpId = await getWpUserId(username)
	if (wpId) return wpId
	// Регистрация нового пользователя
	const nickname = user.username || user.first_name
	const email = user.id + '@noemail.com'
	const password = generatePassword(12)
	const startParam = initData.start_param
	wpId = await regWpUser(username, email, password, nickname, startParam, user.language_code)
	return wpId
}