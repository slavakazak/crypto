import { createContext, useState, useEffect, useContext } from "react"
import { defaultProfileData } from "../utils/constants"
import setWpUser from "../utils/setWpUser"
import getWpFields from "../utils/getWpFields"
import setWpFields from "../utils/setWpFields"
import { AuthContext } from "./AuthProvider"

const test = false
export const DataContext = createContext()

export function DataProvider({ children }) {
	//TODO
	const { token } = useContext(AuthContext)
	//Init Telegram & Wordpress
	const [profileData, setProfileData] = useState(defaultProfileData)
	const [wpId, setWpId] = useState()
	const [tg, setTg] = useState()

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
					const testId = 1
					const fields = await getWpFields(testId)
					setProfileData(previous => ({ ...previous, ...fields }))
					setWpId(testId)
				} else if (tgData.initDataUnsafe?.user) {
					const newWpId = await setWpUser(tgData.initDataUnsafe)
					const fields = await getWpFields(newWpId)
					setProfileData(previous => ({ ...previous, ...fields }))
					setWpId(newWpId)
					if (!newWpId) console.log('WordPress login error!')
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

	//Set Data and Send Data to server
	async function setData(data) {
		if (!wpId) return
		const fields = await getWpFields(wpId)
		await setWpFields(wpId, { ...profileData, ...fields, ...data })
		setProfileData(previous => ({ ...previous, ...fields, ...data }))
	}

	return (
		<DataContext.Provider value={{ profileData, wpId, tg, setData }}>
			{children}
		</DataContext.Provider>
	)
}
