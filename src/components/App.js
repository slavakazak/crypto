import { useEffect, useState, useContext } from "react"
import { Routes, Route } from "react-router-dom"
import Menu from "./Menu"
import Workshop from "../pages/Workshop"
import Task from "../pages/Task"
import Home from "../pages/Home"
import Invite from "../pages/Invite"
import Rating from "../pages/Rating"
import Profile from "../pages/Profile"
import Settings from "../pages/Settings"
import { useTranslation } from 'react-i18next'
import Balance from "../pages/Balance"
import Bonuses from "../pages/Bonuses"
import Career from "../pages/Career"
import Mail from "../pages/Mail"
import FAQ from "../pages/FAQ"
import Start from "../pages/Start"
import FAQRating from "../pages/FAQRating"
import FAQInvite from "../pages/FAQInvite"
import { DataContext } from "../context/DataProvider"
import { HeightContext } from "../context/HeightProvider"

export default function App() {
	const { i18n } = useTranslation()
	const { profileData, wpId } = useContext(DataContext)
	const { height, maxHeight } = useContext(HeightContext)

	//Set language
	useEffect(() => {
		i18n.changeLanguage(profileData.language.tag)
	}, [profileData.language.tag, i18n])

	//Loading
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		if (wpId) setLoading(false)
	}, [wpId])

	return (
		<>
			<div className={'main-preloader' + (loading ? ' active' : '')}><div className="loader" /></div>
			<div className="App" style={{
				backgroundImage: 'url(/img/bg.png)',
				height: maxHeight ? maxHeight + 'px' : '100vh',
				paddingBottom: maxHeight - height < 150 ? '85px' : (maxHeight - height) + 'px'
			}}>
				<Routes>
					<Route path="/workshop" element={<Workshop />} />
					<Route path="/task" element={<Task />} />
					<Route path="/" element={<Home />} />
					<Route path="/invite" element={<Invite />} />
					<Route path="/rating" element={<Rating />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/balance" element={<Balance />} />
					<Route path="/bonuses" element={<Bonuses />} />
					<Route path="/career" element={<Career />} />
					<Route path="/mail" element={<Mail />} />
					<Route path="/faq" element={<FAQ />} />
					<Route path="/start" element={<Start />} />
					<Route path="/faq-rating" element={<FAQRating />} />
					<Route path="/faq-invite" element={<FAQInvite />} />
				</Routes>
			</div>
			<Menu style={{ display: maxHeight - height < 150 ? 'flex' : 'none' }} />
		</>
	)
}