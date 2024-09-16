import { createContext, useState, useEffect, useContext } from "react"
import { defaultLevels } from "../utils/constants"
import { AuthContext } from "./AuthProvider"
import { DataContext } from "./DataProvider"
import getWpLevels from "../utils/getWpLevels"
import getRobots from "../utils/getRobots"
import getPartners from "../utils/getPartners"
import getIncome from "../utils/getIncome"
import setWpLevels from "../utils/setWpLevels"
import getUTCTime from "../utils/getUTCTime"

export const LevelsContext = createContext()

export function LevelsProvider({ children }) {
	const { auth } = useContext(AuthContext)
	const { wpId, profileData, setData } = useContext(DataContext)

	const [levels, setLevels] = useState(defaultLevels)
	const [levelsLoad, setLevelsLoad] = useState(false)
	const [referrals, setReferrals] = useState(0)
	const [income, setIncome] = useState(0)

	//получить количество людей в сети 
	function getCount(arr) {
		if (!arr || arr.length === 0) return 0
		let res = 0
		arr.forEach(item => {
			res += 1 + getCount(item.partners)
		})
		return res
	}

	//получить количество партнёров данного уровня или выше
	function getCountPartners(arr, level) {
		if (!arr || arr.length === 0) return 0
		let res = 0
		arr.forEach(item => {
			if (item.level >= level) res++
		})
		return res
	}

	//получить количество людей в команде данного уровня или выше
	function getCountCommand(arr, level, line = 1) {
		if (!arr || arr.length === 0) return 0
		let res = 0
		arr.forEach(item => {
			if (line > 1 && item.level >= level) res++
			res += getCountCommand(item.partners, level, line + 1)
		})
		return res
	}

	useEffect(() => {
		if (!auth || !wpId) return
		async function init() {
			const newLevels = await getWpLevels(auth, wpId)

			const newPartners = await getPartners(auth, wpId)
			setReferrals(getCount(newPartners))
			const newIncome = await getIncome(auth, wpId)
			setIncome(newIncome.total)

			newLevels[profileData.level - 1].referrals = getCount(newPartners)
			newLevels[profileData.level - 1].earned = newIncome.total

			setLevels(newLevels)
			setLevelsLoad(true)
		}
		init()
	}, [auth, wpId])

	function setLevelData(newLevels, avatars, level) {
		if (!avatars.includes(`k${level}avatar`)) avatars.push(`k${level}avatar`)
		if (newLevels[level - 1].time === undefined) newLevels[level - 1].time = getUTCTime()
		if (newLevels[level - 1].referrals === undefined) newLevels[level - 1].referrals = referrals
		if (newLevels[level - 1].earned === undefined) newLevels[level - 1].earned = income
	}

	async function setNewLevel(newLevels, avatars, level) {
		await setData({ level, avatars, avatar: profileData.avatar === 'my' ? 'my' : `k${level}avatar` })
		setLevels(newLevels)
		await setWpLevels(auth, wpId, newLevels)
	}

	function setTestCurrent(newLevels, level, task, count, max) {
		if (count >= max) {
			newLevels[level - 1].tasks[task].completed = true
			newLevels[level - 1].tasks[task].current = max
		} else {
			newLevels[level - 1].tasks[task].current = count
		}
	}

	function isCompleted(newLevels, level) {
		const tasks = newLevels[level - 1].tasks
		for (let i = 0; i < tasks.length; i++) {
			if (!tasks[i].completed) return false
		}
		return true
	}

	async function checkLevel() {
		if (!levels) return
		let level = profileData.level
		let newLevels = [...levels]
		let avatars = [...profileData.avatars]
		//проверка первого уровня
		let l = 1
		if (!newLevels[l - 1].tasks[0].completed) { //приобрести робота K2
			const robots = await getRobots(auth, wpId)
			if (robots.includes('16')) {
				newLevels[l - 1].tasks[0].completed = true
			}
		}
		if (isCompleted(newLevels, l)) {
			level = level < l + 1 ? l + 1 : level
			setLevelData(newLevels, avatars, level)
		} else if (level < l + 1) {
			return
		}
		//проверка второго уровня
		l = 2
		const partners = await getPartners(auth, wpId)
		const k2Partners = getCountPartners(partners, 2)
		const k2Command = getCountCommand(partners, 2)
		if (!newLevels[l - 1].tasks[1].completed) { //подключить 1 инвестора с уровнем K2
			if (k2Partners + k2Command >= 1) {
				newLevels[l - 1].tasks[1].completed = true
			}
		}
		if (isCompleted(newLevels, l)) {
			level = level < l + 1 ? l + 1 : level
			setLevelData(newLevels, avatars, level)
		} else if (level < l + 1) {
			await setNewLevel(newLevels, avatars, level)
			return
		}
		//проверка третьего уровня
		l = 3
		if (!newLevels[l - 1].tasks[0].completed) { //подключить 2 инвестора с уровнем K2 в первую линию
			setTestCurrent(newLevels, l, 0, k2Partners, 2)
		}
		if (!newLevels[l - 1].tasks[1].completed) { //подключить 5 инвесторов с уровнем K2 в вашу команду
			setTestCurrent(newLevels, l, 1, k2Command, 5)
		}
		if (isCompleted(newLevels, l)) {
			level = level < l + 1 ? l + 1 : level
			setLevelData(newLevels, avatars, level)
		} else if (level < l + 1) {
			await setNewLevel(newLevels, avatars, level)
			return
		}
		//проверка четвёртого уровня
		l = 4
		if (!newLevels[l - 1].tasks[0].completed) { //подключить 5 инвесторов с уровнем K2 в первую линию
			setTestCurrent(newLevels, l, 0, k2Partners, 5)
		}
		if (!newLevels[l - 1].tasks[1].completed) { //подключить 25 инвесторов с уровнем K2 в вашу команду
			setTestCurrent(newLevels, l, 1, k2Command, 25)
		}
		if (isCompleted(newLevels, l)) {
			level = level < l + 1 ? l + 1 : level
			setLevelData(newLevels, avatars, level)
		} else if (level < l + 1) {
			await setNewLevel(newLevels, avatars, level)
			return
		}
		//проверка пятого уровня
		l = 5
		const k4Partners = getCountPartners(partners, 4)
		const k4Command = getCountCommand(partners, 4)
		if (!newLevels[l - 1].tasks[0].completed) { //подключить 10 инвесторов с уровнем K2 в первую линию
			setTestCurrent(newLevels, l, 0, k2Partners, 10)
		}
		if (!newLevels[l - 1].tasks[1].completed) { //подключить 125 инвесторов с уровнем K2 в вашу команду
			setTestCurrent(newLevels, l, 1, k2Command, 125)
		}
		if (!newLevels[l - 1].tasks[2].completed) { //помочь 2 инвесторам дойти до уровня K4 в вашей структуре
			setTestCurrent(newLevels, l, 2, k4Partners + k4Command, 2)
		}
		if (isCompleted(newLevels, l)) {
			level = level < l + 1 ? l + 1 : level
			setLevelData(newLevels, avatars, level)
		} else if (level < l + 1) {
			await setNewLevel(newLevels, avatars, level)
			return
		}
		//проверка шестого уровня
		l = 6
		const k5Partners = getCountPartners(partners, 5)
		const k5Command = getCountCommand(partners, 5)
		if (!newLevels[l - 1].tasks[0].completed) { //подключить 20 инвесторов с уровнем K2 в первую линию
			setTestCurrent(newLevels, l, 0, k2Partners, 20)
		}
		if (!newLevels[l - 1].tasks[1].completed) { //подключить 500 инвесторов с уровнем K2 в вашу команду
			setTestCurrent(newLevels, l, 1, k2Command, 500)
		}
		if (!newLevels[l - 1].tasks[2].completed) { //помочь 2 инвесторам дойти до уровня K5 в вашей структуре
			setTestCurrent(newLevels, l, 2, k5Partners + k5Command, 2)
		}
		if (!newLevels[l - 1].tasks[3].completed) { //помочь 1 инвестору дойти до уровня K4 в вашей структуре
			setTestCurrent(newLevels, l, 3, k4Partners + k4Command, 1)
		}
		if (isCompleted(newLevels, l)) {
			level = level < l + 1 ? l + 1 : level
			setLevelData(newLevels, avatars, level)
		} else if (level < l + 1) {
			await setNewLevel(newLevels, avatars, level)
			return
		}
		//проверка седьмого уровня
		l = 7
		const k6Partners = getCountPartners(partners, 6)
		const k6Command = getCountCommand(partners, 6)
		if (!newLevels[l - 1].tasks[0].completed) { //подключить 25 инвесторов с уровнем K2 в первую линию
			setTestCurrent(newLevels, l, 0, k2Partners, 25)
		}
		if (!newLevels[l - 1].tasks[1].completed) { //подключить 1500 инвесторов с уровнем K2 в вашу команду
			setTestCurrent(newLevels, l, 1, k2Command, 1500)
		}
		if (!newLevels[l - 1].tasks[2].completed) { //помочь 2 инвесторам дойти до уровня K6 в вашей структуре
			setTestCurrent(newLevels, l, 2, k6Partners + k6Command, 2)
		}
		if (!newLevels[l - 1].tasks[3].completed) { //помочь 1 инвестору дойти до уровня K5 в вашей структуре
			setTestCurrent(newLevels, l, 3, k5Partners + k5Command, 1)
		}
		if (!newLevels[l - 1].tasks[4].completed) { //помочь 1 инвестору дойти до уровня K4 в вашей структуре
			setTestCurrent(newLevels, l, 4, k4Partners + k4Command, 1)
		}
		if (isCompleted(newLevels, l)) {
			level = level < l + 1 ? l + 1 : level
			setLevelData(newLevels, avatars, level)
		} else if (level < l + 1) {
			await setNewLevel(newLevels, avatars, level)
			return
		}
		//проверка восьмого уровня
		l = 8
		const k7Partners = getCountPartners(partners, 7)
		const k7Command = getCountCommand(partners, 7)
		if (!newLevels[l - 1].tasks[0].completed) { //подключить 30 инвесторов с уровнем K2 в первую линию
			setTestCurrent(newLevels, l, 0, k2Partners, 30)
		}
		if (!newLevels[l - 1].tasks[1].completed) { //подключить 4000 инвесторов с уровнем K2 в вашу команду
			setTestCurrent(newLevels, l, 1, k2Command, 4000)
		}
		if (!newLevels[l - 1].tasks[2].completed) { //помочь 2 инвесторам дойти до уровня K7 в вашей структуре
			setTestCurrent(newLevels, l, 2, k7Partners + k7Command, 2)
		}
		if (!newLevels[l - 1].tasks[3].completed) { //помочь 1 инвестору дойти до уровня K6 в вашей структуре
			setTestCurrent(newLevels, l, 3, k6Partners + k6Command, 1)
		}
		if (!newLevels[l - 1].tasks[4].completed) { //помочь 1 инвестору дойти до уровня K5 в вашей структуре
			setTestCurrent(newLevels, l, 4, k5Partners + k5Command, 1)
		}
		if (!newLevels[l - 1].tasks[5].completed) { //помочь 1 инвестору дойти до уровня K4 в вашей структуре
			setTestCurrent(newLevels, l, 5, k4Partners + k4Command, 1)
		}
		if (isCompleted(newLevels, l)) {
			level = level < l + 1 ? l + 1 : level
			setLevelData(newLevels, avatars, level)
		} else if (level < l + 1) {
			await setNewLevel(newLevels, avatars, level)
			return
		}
		//проверка девятого уровня
		l = 9
		const k8Partners = getCountPartners(partners, 8)
		const k8Command = getCountCommand(partners, 8)
		if (!newLevels[l - 1].tasks[0].completed) { //подключить 40 инвесторов с уровнем K2 в первую линию
			setTestCurrent(newLevels, l, 0, k2Partners, 40)
		}
		if (!newLevels[l - 1].tasks[1].completed) { //подключить 10000 инвесторов с уровнем K2 в вашу команду
			setTestCurrent(newLevels, l, 1, k2Command, 10000)
		}
		if (!newLevels[l - 1].tasks[2].completed) { //помочь 2 инвесторам дойти до уровня K8 в вашей структуре
			setTestCurrent(newLevels, l, 2, k8Partners + k8Command, 2)
		}
		if (!newLevels[l - 1].tasks[3].completed) { //помочь 1 инвестору дойти до уровня K7 в вашей структуре
			setTestCurrent(newLevels, l, 3, k7Partners + k7Command, 1)
		}
		if (!newLevels[l - 1].tasks[4].completed) { //помочь 1 инвестору дойти до уровня K6 в вашей структуре
			setTestCurrent(newLevels, l, 4, k6Partners + k6Command, 1)
		}
		if (!newLevels[l - 1].tasks[5].completed) { //помочь 1 инвестору дойти до уровня K5 в вашей структуре
			setTestCurrent(newLevels, l, 5, k5Partners + k5Command, 1)
		}
		if (!newLevels[l - 1].tasks[6].completed) { //помочь 1 инвестору дойти до уровня K4 в вашей структуре
			setTestCurrent(newLevels, l, 6, k4Partners + k4Command, 1)
		}
		if (isCompleted(newLevels, l)) {
			level = level < l + 1 ? l + 1 : level
			setLevelData(newLevels, avatars, level)
		} else if (level < l + 1) {
			await setNewLevel(newLevels, avatars, level)
			return
		}
		await setNewLevel(newLevels, avatars, level)
	}

	async function setTasks(level, task) {
		const newLevels = [...levels]
		newLevels[level - 1].tasks[task].completed = true
		setLevels(newLevels)
		await setWpLevels(auth, wpId, newLevels)
	}

	return (
		<LevelsContext.Provider value={{ levels, checkLevel, setTasks, levelsLoad }}>
			{children}
		</LevelsContext.Provider>
	)
}
