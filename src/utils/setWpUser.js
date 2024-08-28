import generatePassword from './generatePassword'
import getWpUser from './getWpUser'
import regWpUser from "./regWpUser"
import { genders, countries, languages } from './constants'

export default async function setWpUser(user, setProfileData, setWpId) {
	const username = 'user' + user.id
	const wpUser = await getWpUser(username)
	if (wpUser) {
		const meta = wpUser.meta
		setProfileData(previous => ({
			nickname: meta.t_nickname || previous.nickname,
			fullName: meta.t_full_name || previous.fullName,
			username: meta.t_username || previous.username,
			email: wpUser.email || previous.email,
			gender: genders.find(gender => gender.tag === meta.t_gender) || previous.gender,
			age: meta.t_age || previous.age,
			country: countries.find(country => country.tag === meta.t_country) || previous.country,
			login: meta.t_login || previous.login,
			password: meta.t_password || previous.password,
			passwordChanged: meta.t_password_changed || previous.passwordChanged,
			pin: meta.t_pin || previous.pin,
			wallet: meta.t_wallet || previous.wallet,
			avatars: meta.t_avatars ? meta.t_avatars.split(',') : previous.avatars,
			myAvatar: meta.t_my_avatar || previous.myAvatar,
			avatar: meta.t_avatar || previous.avatar,
			language: languages.find(language => language.tag === meta.t_language) || languages.find(language => language.tag === user.language_code) || previous.language,
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