import { genders, countries, languages } from './constants'
import getWpUser from './getWpUser'

export default async function getWpFields(wpId) {
	const wpUser = await getWpUser(wpId)
	if (!wpUser) return {}
	const meta = wpUser.meta || {}
	return {
		nickname: meta.t_nickname,
		fullName: meta.t_full_name,
		username: meta.t_username,
		email: wpUser.email,
		gender: genders.find(gender => gender.tag === meta.t_gender),
		age: parseInt(meta.t_age, 10),
		country: countries.find(country => country.tag === meta.t_country),
		login: meta.t_login,
		password: meta.t_password,
		passwordChanged: Boolean(meta.t_password_changed),
		pin: meta.t_pin,
		wallet: meta.t_wallet,
		avatars: meta.t_avatars?.split(','),
		myAvatar: meta.t_my_avatar,
		avatar: meta.t_avatar,
		language: languages.find(language => language.tag === meta.t_language),
		level: parseInt(meta.t_level, 10),
		token: +meta.t_token,
		coin: +meta.t_coin,
		usdt: +meta.t_usdt,
		ref: meta.t_ref || wpUser.id,
		link: meta.t_link
	}
}
