import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Menu from "./Menu"
import Workshop from "../pages/Workshop"
import Task from "../pages/Task"
import Home from "../pages/Home"
import Invite from "../pages/Invite"
import Rating from "../pages/Rating"
import Profile from "../pages/Profile"
import Settings from "../pages/Settings"
import setWpUser from "../utils/setWpUser"
import setWpFields from "../utils/setWpFields"
import { countries, languages } from "../utils/constants"
import { useTranslation } from 'react-i18next'
import Balance from "../pages/Balance"
import getIdFromRef from "../utils/getIdFromRef"
import updateWpFields from "../utils/updateWpFields"
import addTransaction from "../utils/addTransaction"
import getUTCTime from "../utils/getUTCTime"
import addWpBalance from "../utils/addWpBalance"

export default function App() {
	const { i18n } = useTranslation()

	//Default Profile Data
	const [profileData, setProfileData] = useState({
		nickname: '',
		fullName: '',
		username: '',
		email: '',
		gender: '',
		age: 0,
		country: countries[0],
		login: '',
		password: '',
		passwordChanged: false,
		pin: '',
		wallet: '',
		avatars: ['robot', 'robot2'],
		myAvatar: '',
		avatar: 'robot',
		language: languages[0],
		level: 1,
		token: 0,
		coin: 0,
		usdt: 0,
		ref: '',
		link: ''
	})

	//Init Telegram & Wordpress
	const [wpId, setWpId] = useState()
	const [tg, setTg] = useState()
	const [startParam, setStartParam] = useState()
	useEffect(() => {
		async function init() {
			if (window && window.Telegram && window.Telegram.WebApp) {
				const tgData = window.Telegram.WebApp
				setTg(tgData)
				tgData.setHeaderColor('#111')
				tgData.setBackgroundColor('#111')
				tgData.disableVerticalSwipes()
				tgData.expand()
				if (tgData && tgData.initDataUnsafe && tgData.initDataUnsafe.user) {
					const user = tgData.initDataUnsafe.user
					const isWpSet = await setWpUser(user, setProfileData, setWpId)
					setStartParam(tgData.initDataUnsafe.start_param)
					if (!isWpSet) console.log('WordPress login error!')
				} else {
					console.log('Telegram is not running!')
				}
			} else {
				console.log('Telegram WebApp is undefined, retrying…')
				setTimeout(init, 500)
			}
		}
		init()
	}, [])

	//Set language
	useEffect(() => {
		i18n.changeLanguage(profileData.language.tag)
	}, [profileData.language.tag])

	//Set Data and Send Data to server
	async function setData(data) {
		if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
			await updateWpFields(tg.initDataUnsafe.user, setProfileData, setWpId)
		}
		setProfileData(previous => ({ ...previous, ...data }))
		if (!wpId) return
		await setWpFields(wpId, {
			t_nickname: data.nickname || profileData.nickname,
			t_full_name: data.fullName || profileData.fullName,
			t_username: data.username || profileData.username,
			t_gender: data.gender?.tag || profileData.gender?.tag,
			t_age: +data.age || +profileData.age,
			t_country: data.country?.tag || profileData.country?.tag,
			t_login: data.login || profileData.login,
			t_password: data.password || profileData.password,
			t_password_changed: data.passwordChanged || profileData.passwordChanged,
			t_pin: data.pin || profileData.pin,
			t_wallet: data.wallet || profileData.wallet,
			t_avatars: data.avatars?.join(',') || profileData.avatars?.join(','),
			t_my_avatar: data.myAvatar || profileData.myAvatar,
			t_avatar: data.avatar || profileData.avatar,
			t_language: data.language?.tag || profileData.language?.tag,
			t_level: +data.level || +profileData.level,
			t_token: +data.token || +profileData.token,
			t_coin: +data.coin || +profileData.coin,
			t_usdt: +data.usdt || +profileData.usdt,
			t_ref: data.ref || profileData.ref,
			t_link: data.link || profileData.link,
		},
			data.email || profileData.email,
			data.password || profileData.password,
		)
	}

	//Add ref link and bonus
	useEffect(() => {
		async function init() {
			if (!profileData.link && startParam && startParam.slice(0, 2) === 'r_') {
				const link = await getIdFromRef(startParam.slice(2))
				const bonus = 1000
				await addWpBalance(wpId, bonus)
				await addWpBalance(+link, bonus)
				await setData({ link })
				await addTransaction({
					user_id: wpId,
					transaction_type: 'accrual',
					transaction_status: 'success',
					price: bonus,
					currency: 'token',
					comment: `Регистрация по реф ссылке пользователя ${link}`,
					transaction_time: getUTCTime()
				})
				await addTransaction({
					user_id: +link,
					transaction_type: 'accrual',
					transaction_status: 'success',
					price: bonus,
					currency: 'token',
					comment: `Пользователь ${wpId} зарегистрировался по реф ссылке`,
					transaction_time: getUTCTime()
				})
			}
		}
		init()
	}, [startParam && wpId])

	return (
		<div className="App">
			<div className="content" style={{ backgroundImage: 'url(/img/bg.png)' }}>
				<Routes>
					<Route path="/workshop" element={<Workshop profileData={profileData} wpId={wpId} setData={setData} />} />
					<Route path="/task" element={<Task />} />
					<Route path="/" element={<Home profileData={profileData} setData={setData} wpId={wpId} />} />
					<Route path="/invite" element={<Invite profileData={profileData} wpId={wpId} tg={tg} />} />
					<Route path="/rating" element={<Rating />} />
					<Route path="/profile" element={<Profile profileData={profileData} setData={setData} wpId={wpId} />} />
					<Route path="/settings" element={<Settings profileData={profileData} setData={setData} wpId={wpId} />} />
					<Route path="/balance" element={<Balance profileData={profileData} wpId={wpId} />} />
				</Routes>
			</div>
			<Menu />
		</div>
	)
}