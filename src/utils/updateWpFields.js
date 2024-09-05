import { genders, countries, languages } from './constants'
import getWpUser from './getWpUser'

export default async function updateWpFields(user, setProfileData, setWpId) {
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
			level: meta.t_level || previous.level,
			token: meta.t_token || previous.token,
			coin: meta.t_coin || previous.coin,
			usdt: meta.t_usdt || previous.usdt,
			ref: meta.t_ref || wpUser.id || previous.ref,
			link: meta.t_link || previous.link
		}))
		setWpId(wpUser.id)
		return true
	}
	return false
}
