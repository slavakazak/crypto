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
import { FlagRusIcon } from "./Icons"
import afghanistan from '../img/afghanistan.png'
import albania from '../img/albania.png'
import createUserInWordpress from "../utils/createUserInWordpress"
import axios from "axios"
const adminUsername = process.env.REACT_APP_WP_ADMIN_USERNAME
const adminPassword = process.env.REACT_APP_WP_ADMIN_PASSWORD

export default function App() {
	const countries = [
		{
			value: 'Россия',
			icon: <FlagRusIcon />
		},
		{
			value: 'Afghanistan',
			icon: <img src={afghanistan} alt="Afghanistan" />
		},
		{
			value: 'Albania',
			icon: <img src={albania} alt="Albania" />
		},
		{
			value: 'Algeria',
			icon: <FlagRusIcon />
		},
	]

	const [profileData, setProfileData] = useState({
		nickname: '',
		fullName: '',
		username: '',
		mail: '',
		gender: '',
		age: '',
		country: countries[0],
		login: '',
		password: '',
		passwordChanged: false,
		pin: '',
		wallet: ''
	})
	const [tg, setTg] = useState()
	const [wpId, setWpId] = useState()

	useEffect(() => {
		function initTg() {
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
					createUserInWordpress(user, setProfileData, setWpId)
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
		try {
			const tokenResponse = await axios.post('https://k2-bot.com/wp-json/jwt-auth/v1/token', {
				username: adminUsername,
				password: adminPassword
			})
			const token = tokenResponse.data.token
			//обновление мета полей
			await axios.post(`https://k2-bot.com/wp-json/wp/v2/users/${wpId}`,
				{
					meta: {
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
					}
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			//изменение email
			await axios.post(`https://k2-bot.com/wp-json/wp/v2/users/${wpId}`,
				{
					email: data.mail || profileData.mail,
					password: data.password || profileData.password
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
		} catch (error) {
			console.error('Error creating user:', error.response?.data || error.message)
		}
	}

	return (
		<div className="App">
			<div className="content" style={{ backgroundImage: 'url(/img/background.png)' }}>
				<Routes>
					<Route path="/workshop" element={<Workshop tg={tg} />} />
					<Route path="/task" element={<Task />} />
					<Route path="/" element={<Home profileData={profileData} />} />
					<Route path="/invite" element={<Invite />} />
					<Route path="/rating" element={<Rating />} />
					<Route path="/profile" element={<Profile profileData={profileData} setData={setData} />} />
					<Route path="/settings" element={<Settings profileData={profileData} setData={setData} countries={countries} tg={tg} />} />
				</Routes>
			</div>
			<Menu />
		</div>
	)
}