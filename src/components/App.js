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
import updateWpFields from "../utils/getWpFields"
import addTransaction from "../utils/addTransaction"
import getUTCTime from "../utils/getUTCTime"
import addWpBalance from "../utils/addWpBalance"
import getWpFields from "../utils/getWpFields"

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
			if (window?.Telegram?.WebApp) {
				const tgData = window.Telegram.WebApp
				setTg(tgData)
				tgData.setHeaderColor('#111')
				tgData.setBackgroundColor('#111')
				tgData.disableVerticalSwipes()
				tgData.expand()
				if (tgData.initDataUnsafe?.user) {
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
		if (!wpId) return
		console.log(data)
		const fields = await getWpFields(wpId)
		console.log(fields)
		console.log({ ...profileData, ...fields, ...data })
		await setWpFields(wpId, { ...profileData, ...fields, ...data })
		setProfileData(previous => ({ ...previous, ...fields, ...data }))
	}

	//Add ref link and bonus
	useEffect(() => {
		async function handleReferral() {
			if (wpId && startParam?.startsWith('r_') && !profileData.link) {
				const refId = await getIdFromRef(startParam.slice(2))
				const bonus = 1000
				await addWpBalance(wpId, bonus)
				await addWpBalance(+refId, bonus)
				await setData({ link: refId })
				const transactionData = {
					transaction_type: 'accrual',
					transaction_status: 'success',
					price: bonus,
					currency: 'token',
					transaction_time: getUTCTime(),
				}
				await addTransaction({
					...transactionData,
					user_id: wpId,
					comment: `Регистрация по реф ссылке пользователя ${refId}`
				})
				await addTransaction({
					...transactionData,
					user_id: +refId,
					comment: `Пользователь ${wpId} зарегистрировался по реф ссылке`
				})
			}
		}
		handleReferral()
	}, [startParam, wpId])

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
					<Route path="/balance" element={<Balance profileData={profileData} wpId={wpId} setData={setData} />} />
				</Routes>
			</div>
			<Menu />
		</div>
	)
}