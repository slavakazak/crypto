import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Menu from "./Menu"
import Workshop from "../pages/Workshop"
import Task from "../pages/Task"
import Home from "../pages/Home"
import Invite from "../pages/Invite"
import Rating from "../pages/Rating"
import Profile from "../pages/Profile"

export default function App() {
	const [tg, setTg] = useState()

	useEffect(() => {
		console.log('useTelegram')
		function initTg() {
			if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
				console.log('Telegram WebApp is set')
				const tgData = window.Telegram.WebApp
				setTg(tgData)

				tgData.setHeaderColor('#111')
				tgData.setBackgroundColor('#111')
				tgData.disableVerticalSwipes()
				tgData.expand()
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
					<Route path="/" element={<Home tg={tg} />} />
					<Route path="/invite" element={<Invite />} />
					<Route path="/rating" element={<Rating />} />
					<Route path="/profile" element={<Profile tg={tg} />} />
				</Routes>
			</div>
			<Menu />
		</div>
	)
}