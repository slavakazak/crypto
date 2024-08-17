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
		nickname: 'noname',
		fullName: '',
		mail: '',
		gender: '',
		age: '',
		country: countries[0],
		login: 'noname',
		password: '1234',
		passwordChanged: false,
		pin: '',
		wallet: ''
	})
	const [tg, setTg] = useState()
	const [username, setUsername] = useState('noname')

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
					createUserInWordpress(user, setProfileData, setUsername)
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

	return (
		<div className="App">
			<div className="content" style={{ backgroundImage: 'url(/img/background.png)' }}>
				<Routes>
					<Route path="/workshop" element={<Workshop tg={tg} />} />
					<Route path="/task" element={<Task />} />
					<Route path="/" element={<Home username={username} />} />
					<Route path="/invite" element={<Invite />} />
					<Route path="/rating" element={<Rating />} />
					<Route path="/profile" element={<Profile profileData={profileData} username={username} setUsername={setUsername} />} />
					<Route path="/settings" element={<Settings profileData={profileData} setProfileData={setProfileData} setUsername={setUsername} countries={countries} tg={tg} />} />
				</Routes>
			</div>
			<Menu />
		</div>
	)
}