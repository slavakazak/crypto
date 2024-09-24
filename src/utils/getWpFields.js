import { genders, countries, languages, defaultProfileData } from './constants'
import getWpUser from './getWpUser'

export default async function getWpFields(auth, wpId) {
	const wpUser = await getWpUser(auth, wpId)
	if (!wpUser) return {}
	const meta = wpUser.meta || {}
	return {
		nickname: meta.t_nickname || defaultProfileData.nickname,
		fullName: meta.t_full_name || defaultProfileData.fullName,
		username: meta.t_username || defaultProfileData.username,
		email: wpUser.email || defaultProfileData.email,
		gender: genders.find(gender => gender.tag === meta.t_gender) || defaultProfileData.gender,
		age: parseInt(meta.t_age, 10) || defaultProfileData.age,
		country: countries.find(country => country.code === meta.t_country) || defaultProfileData.country,
		// login: meta.t_login || defaultProfileData.login,
		// password: meta.t_password || defaultProfileData.password,
		// passwordChanged: Boolean(meta.t_password_changed) || defaultProfileData.passwordChanged,
		pin: meta.t_pin || defaultProfileData.pin,
		wallet: meta.t_wallet || defaultProfileData.wallet,
		exchange: meta.t_exchange || defaultProfileData.exchange,
		avatars: meta.t_avatars ? meta.t_avatars.split(',') : defaultProfileData.avatars,
		myAvatar: meta.t_my_avatar || defaultProfileData.myAvatar,
		avatar: meta.t_avatar || defaultProfileData.avatar,
		language: languages.find(language => language.tag === meta.t_language) || defaultProfileData.language,
		level: parseInt(meta.t_level, 10) || defaultProfileData.level,
		token: +meta.t_token || defaultProfileData.token,
		coin: +meta.t_coin || defaultProfileData.coin,
		usdt: +meta.t_usdt || defaultProfileData.usdt,
		ref: meta.t_ref || wpUser.id || defaultProfileData.ref,
		link: meta.t_link || defaultProfileData.link,
		start: meta.t_start || defaultProfileData.start
	}
}
