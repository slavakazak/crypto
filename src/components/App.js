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
import { defaultProfileData } from "../utils/constants"
import { useTranslation } from 'react-i18next'
import Balance from "../pages/Balance"
import getIdFromRef from "../utils/getIdFromRef"
import addTransaction from "../utils/addTransaction"
import getUTCTime from "../utils/getUTCTime"
import addWpBalance from "../utils/addWpBalance"
import getWpFields from "../utils/getWpFields"
import Bonuses from "../pages/Bonuses"

export default function App() {
	const { i18n } = useTranslation()

	//Default Profile Data
	const [profileData, setProfileData] = useState(defaultProfileData)

	//Init Telegram & Wordpress
	const [wpId, setWpId] = useState()
	const [tg, setTg] = useState()
	const [startParam, setStartParam] = useState()
	const test = false
	useEffect(() => {
		async function init() {
			if (window?.Telegram?.WebApp) {
				const tgData = window.Telegram.WebApp
				setTg(tgData)
				tgData.setHeaderColor('#111')
				tgData.setBackgroundColor('#111')
				tgData.disableVerticalSwipes()
				tgData.expand()
				if (test) {
					await setWpUser({}, setProfileData, setWpId, test)
				} else if (tgData.initDataUnsafe?.user) {
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

	//Window height
	const [height, setHeight] = useState(0)
	const [maxHeight, setMaxHeight] = useState(0)

	function scrollHandler() {
		window.scrollTo({ top: 0, behavior: 'smooth' })
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}, 500)
	}
	function updateHeight() {
		if (tg) {
			setHeight(Math.min(tg.viewportHeight, tg.viewportStableHeight, document.documentElement.clientHeight, window.innerHeight))
		} else {
			setHeight(Math.min(document.documentElement.clientHeight, window.innerHeight))
		}
		console.log(maxHeight - Math.min(document.documentElement.clientHeight, window.innerHeight))
	}
	function focusHandler() {
		setTimeout(() => {
			let focusedElement = document.activeElement
			if (focusedElement && (focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA')) {
				const top = focusedElement.getBoundingClientRect().top + document.querySelector('.content').scrollTop
				document.querySelector('.content').scrollTo({ top: top - 200, behavior: 'smooth' })
			}
		}, 700)
	}
	useEffect(() => {
		if (tg) {
			setMaxHeight(Math.max(tg.viewportHeight, tg.viewportStableHeight, document.documentElement.clientHeight, window.innerHeight))
		} else {
			setMaxHeight(Math.max(document.documentElement.clientHeight, window.innerHeight))
		}
		updateHeight()
		tg?.onEvent('viewportChanged', updateHeight)
		window.addEventListener('resize', updateHeight)
		document.addEventListener('touchend', scrollHandler, false)
		document.addEventListener('touchcancel', scrollHandler, false)
		document.addEventListener('focus', focusHandler, true)
		return () => {
			tg?.offEvent('viewportChanged', updateHeight);
			window.removeEventListener('resize', updateHeight);
			document.removeEventListener('touchend', scrollHandler, false);
			document.removeEventListener('touchcancel', scrollHandler, false);
			document.removeEventListener('focus', focusHandler, true);
		};
	}, [tg])

	//Set language
	useEffect(() => {
		i18n.changeLanguage(profileData.language.tag)
	}, [profileData.language.tag])

	//Set Data and Send Data to server
	async function setData(data) {
		if (!wpId) return
		const fields = await getWpFields(wpId)
		await setWpFields(wpId, { ...profileData, ...fields, ...data })
		setProfileData(previous => ({ ...previous, ...fields, ...data }))
	}

	//Add ref link and bonus
	useEffect(() => {
		async function handleReferral() {
			if (wpId && startParam?.startsWith('r_') && (!profileData.link || +profileData.link === wpId)) {
				const refId = await getIdFromRef(startParam.slice(2))
				if (!refId || +refId === wpId) {
					await setData({ link: '1' })
					return
				}
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
			} else if (!profileData?.link) {
				await setData({ link: '1' })
			}
		}
		handleReferral()
	}, [startParam, wpId])

	return (
		<div className="App" style={{ height: maxHeight ? maxHeight + 'px' : '100vh' }}>
			<div className="content" style={{ backgroundImage: 'url(/img/bg.png)', height: maxHeight ? maxHeight + 'px' : '100vh', paddingBottom: maxHeight - height < 150 ? '75px' : (maxHeight - height) + 'px' }}>
				<Routes>
					<Route path="/workshop" element={<Workshop profileData={profileData} wpId={wpId} setData={setData} height={height} />} />
					<Route path="/task" element={<Task tg={tg} />} />
					<Route path="/" element={<Home profileData={profileData} setData={setData} wpId={wpId} />} height={height} />
					<Route path="/invite" element={<Invite profileData={profileData} wpId={wpId} tg={tg} />} />
					<Route path="/rating" element={<Rating />} />
					<Route path="/profile" element={<Profile profileData={profileData} setData={setData} wpId={wpId} height={height} />} />
					<Route path="/settings" element={<Settings profileData={profileData} setData={setData} wpId={wpId} height={height} />} />
					<Route path="/balance" element={<Balance profileData={profileData} wpId={wpId} setData={setData} />} />
					<Route path="/bonuses" element={<Bonuses />} />
				</Routes>
			</div>
			<Menu style={{ display: maxHeight - height < 150 ? 'flex' : 'none' }} />
		</div>
	)
}