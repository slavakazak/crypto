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
import { countries } from "../utils/constants"
import ThankYou from "../pages/ThankYou"

export default function App() {
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
		avatar: 'robot'
	})
	const [tg, setTg] = useState()
	const [wpId, setWpId] = useState()

	const [err, setErr] = useState('')

	useEffect(() => {
		async function initTg() {
			if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
				console.log('Telegram WebApp is set')
				const tgData = window.Telegram.WebApp
				setTg(tgData)
				tgData.setHeaderColor('#111')
				tgData.setBackgroundColor('#111')
				tgData.disableVerticalSwipes()
				tgData.expand()
				if (tgData && tgData.initDataUnsafe && tgData.initDataUnsafe.user) {
					const user = tgData.initDataUnsafe.user
					const isWpSet = await setWpUser(user, setProfileData, setWpId)
					if (!isWpSet) console.log('Ошибка входа в WordPress!')
				} else {
					console.log('Телеграм не запущен!')
				}
			} else {
				console.log('Telegram WebApp is undefined, retrying…')
				setTimeout(initTg, 500)
			}
		}
		initTg()
	}, [])

	async function setData(data) {
		setProfileData(previous => ({ ...previous, ...data }))
		if (!wpId) return
		setWpFields(wpId, {
			t_nickname: data.nickname || profileData.nickname,
			t_full_name: data.fullName || profileData.fullName,
			t_username: data.username || profileData.username,
			t_gender: data.gender?.value || profileData.gender?.value,
			t_age: +data.age || +profileData.age,
			t_country: data.country?.value || profileData.country?.value,
			t_login: data.login || profileData.login,
			t_password: data.password || profileData.password,
			t_password_changed: data.passwordChanged || profileData.passwordChanged,
			t_pin: data.pin || profileData.pin,
			t_wallet: data.wallet || profileData.wallet,
			t_avatars: data.avatars?.join(',') || profileData.avatars?.join(','),
			t_my_avatar: data.myAvatar || profileData.myAvatar,
			t_avatar: data.avatar || profileData.avatar
		},
			data.email || profileData.email,
			data.password || profileData.password,
		)
	}

	return (
		<div className="App">
			{err}
			<div className="content" style={{ backgroundImage: 'url(/img/background.png)' }}>
				<Routes>
					<Route path="/workshop" element={<Workshop profileData={profileData} wpId={wpId} />} />
					<Route path="/task" element={<Task />} />
					<Route path="/" element={<Home profileData={profileData} />} />
					<Route path="/invite" element={<Invite />} />
					<Route path="/rating" element={<Rating />} />
					<Route path="/profile" element={<Profile profileData={profileData} setData={setData} tg={tg} wpId={wpId} />} />
					<Route path="/settings" element={<Settings profileData={profileData} setData={setData} tg={tg} wpId={wpId} />} />
					<Route path="/thank-you" element={<ThankYou wpId={wpId} />} />
				</Routes>
			</div>
			<Menu />
		</div>
	)
}