import generatePassword from './generatePassword'
import getWpUser from './getWpUser'
import regWpUser from "./regWpUser"
import { genders, countries } from './constants'

export default async function setWpUser(user, setProfileData, setWpId) {
	const username = 'user' + user.id
	const wpUser = await getWpUser(username)
	if (wpUser) {
		const meta = wpUser.meta
		setProfileData(previous => ({
			nickname: meta.t_nickname || previous.nickname,
			fullName: meta.t_full_name || previous.fullName,
			username: meta.t_username || previous.username,
			mail: wpUser.email || previous.email,
			gender: genders.find(gender => gender.value === meta.t_gender) || previous.gender,
			age: meta.t_age || previous.age,
			country: countries.find(country => country.value === meta.t_country) || previous.country,
			login: meta.t_login || previous.login,
			password: meta.t_password || previous.password,
			passwordChanged: meta.t_password_changed || previous.passwordChanged,
			pin: meta.t_pin || previous.pin,
			wallet: meta.t_wallet || previous.wallet
		}))
		setWpId(wpUser.id)
		return true
	}
	const nickname = user.username || user.first_name
	const email = user.id + '@noemail.com'
	const password = generatePassword(12)
	const wpId = await regWpUser(username, email, password, nickname)
	if (wpId) {
		setProfileData(previous => ({ ...previous, nickname, password, username: nickname }))
		setWpId(wpId)
		return true
	}
	return false
}