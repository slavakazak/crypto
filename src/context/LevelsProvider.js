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

	//получить количество людей в команде 2 уровня или выше (не больше 40% с ветки)
	function getCountCommand(arr, line = 1, max = 0) {
		if (!arr || arr.length === 0) return 0
		let res = 0
		if (line === 1) {
			arr.forEach(item => {
				const sum = getCountCommand(item.partners, line + 1)
				res += sum > max * 0.4 ? max * 0.4 : sum
			})
		} else {
			arr.forEach(item => {
				if (item.level >= 2) res++
				res += getCountCommand(item.partners, line + 1)
			})
		}
		return res
	}

	//получить количество людей в структуре данного уровня или выше (1 с ветки)
	function getCountInvestors(arr, level, line = 1) {
		if (!arr || arr.length === 0) return 0
		let res = 0
		if (line === 1) {
			arr.forEach(item => {
				if (item.level >= level) {
					res++
				} else {
					res += getCountInvestors(item.partners, level, line + 1)
				}
			})
		} else {
			arr.forEach(item => {
				if (item.level >= level) {
					res++
					return
				}
				res += getCountInvestors(item.partners, level, line + 1)
			})
		}
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

	function setTestInvestors(newLevels, level, task, count, max) {
		if (count >= max) {
			newLevels[level - 1].tasks[task].completed = true
			newLevels[level - 1].tasks[task].current = max
			return max
		} else {
			newLevels[level - 1].tasks[task].completed = false
			newLevels[level - 1].tasks[task].current = count
			return count
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
		if (!newLevels[l - 1].tasks[1].completed) { //подключить 1 инвестора с уровнем K2
			if (k2Partners >= 1) {
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
		if (!newLevels[l - 1].tasks[0].completed) { //подключить 3 инвестора с уровнем K2 в первую линию
			setTestCurrent(newLevels, l, 0, k2Partners, 3)
		}
		if (!newLevels[l - 1].tasks[1].completed) { //подключить 5 инвесторов с уровнем K2 в вашу команду
			setTestCurrent(newLevels, l, 1, getCountCommand(partners, 1, 5), 5)
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
			setTestCurrent(newLevels, l, 1, getCountCommand(partners, 1, 25), 25)
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
		const k4 = getCountInvestors(partners, 4)
		if (!newLevels[l - 1].tasks[0].completed) { //подключить 10 инвесторов с уровнем K2 в первую линию
			setTestCurrent(newLevels, l, 0, k2Partners, 10)
		}
		if (!newLevels[l - 1].tasks[1].completed) { //подключить 125 инвесторов с уровнем K2 в вашу команду
			setTestCurrent(newLevels, l, 1, getCountCommand(partners, 1, 125), 125)
		}
		setTestInvestors(newLevels, l, 2, k4, 2) //помочь 2 инвесторам дойти до уровня K4 в вашей структуре
		if (isCompleted(newLevels, l)) {
			level = level < l + 1 ? l + 1 : level
			setLevelData(newLevels, avatars, level)
		} else if (level < l + 1) {
			await setNewLevel(newLevels, avatars, level)
			return
		}
		//проверка шестого уровня
		l = 6
		const k5 = getCountInvestors(partners, 5)
		if (!newLevels[l - 1].tasks[0].completed) { //подключить 20 инвесторов с уровнем K2 в первую линию
			setTestCurrent(newLevels, l, 0, k2Partners, 20)
		}
		if (!newLevels[l - 1].tasks[1].completed) { //подключить 500 инвесторов с уровнем K2 в вашу команду
			setTestCurrent(newLevels, l, 1, getCountCommand(partners, 1, 500), 500)
		}
		let taken = 0
		taken += setTestInvestors(newLevels, l, 2, k5, 2) //помочь 2 инвесторам дойти до уровня K5 в вашей структуре
		setTestInvestors(newLevels, l, 3, k4 - taken, 1) //помочь 1 инвестору дойти до уровня K4 в вашей структуре
		if (isCompleted(newLevels, l)) {
			level = level < l + 1 ? l + 1 : level
			setLevelData(newLevels, avatars, level)
		} else if (level < l + 1) {
			await setNewLevel(newLevels, avatars, level)
			return
		}
		//проверка седьмого уровня
		l = 7
		const k6 = getCountInvestors(partners, 6)
		if (!newLevels[l - 1].tasks[0].completed) { //подключить 25 инвесторов с уровнем K2 в первую линию
			setTestCurrent(newLevels, l, 0, k2Partners, 25)
		}
		if (!newLevels[l - 1].tasks[1].completed) { //подключить 1500 инвесторов с уровнем K2 в вашу команду
			setTestCurrent(newLevels, l, 1, getCountCommand(partners, 1, 1500), 1500)
		}
		taken = 0
		taken += setTestInvestors(newLevels, l, 2, k6, 2) //помочь 2 инвесторам дойти до уровня K6 в вашей структуре
		taken += setTestInvestors(newLevels, l, 3, k5 - taken, 1) //помочь 1 инвестору дойти до уровня K5 в вашей структуре
		setTestInvestors(newLevels, l, 4, k4 - taken, 1) //помочь 1 инвестору дойти до уровня K4 в вашей структуре
		if (isCompleted(newLevels, l)) {
			level = level < l + 1 ? l + 1 : level
			setLevelData(newLevels, avatars, level)
		} else if (level < l + 1) {
			await setNewLevel(newLevels, avatars, level)
			return
		}
		//проверка восьмого уровня
		l = 8
		const k7 = getCountInvestors(partners, 7)
		if (!newLevels[l - 1].tasks[0].completed) { //подключить 30 инвесторов с уровнем K2 в первую линию
			setTestCurrent(newLevels, l, 0, k2Partners, 30)
		}
		if (!newLevels[l - 1].tasks[1].completed) { //подключить 4000 инвесторов с уровнем K2 в вашу команду
			setTestCurrent(newLevels, l, 1, getCountCommand(partners, 1, 4000), 4000)
		}
		taken = 0
		taken += setTestInvestors(newLevels, l, 2, k7, 2) //помочь 2 инвесторам дойти до уровня K7 в вашей структуре
		taken += setTestInvestors(newLevels, l, 3, k6 - taken, 1) //помочь 1 инвестору дойти до уровня K6 в вашей структуре
		taken += setTestInvestors(newLevels, l, 4, k5 - taken, 1) //помочь 1 инвестору дойти до уровня K5 в вашей структуре
		setTestInvestors(newLevels, l, 5, k4 - taken, 1) //помочь 1 инвестору дойти до уровня K4 в вашей структуре
		if (isCompleted(newLevels, l)) {
			level = level < l + 1 ? l + 1 : level
			setLevelData(newLevels, avatars, level)
		} else if (level < l + 1) {
			await setNewLevel(newLevels, avatars, level)
			return
		}
		//проверка девятого уровня
		l = 9
		const k8 = getCountInvestors(partners, 8)
		if (!newLevels[l - 1].tasks[0].completed) { //подключить 40 инвесторов с уровнем K2 в первую линию
			setTestCurrent(newLevels, l, 0, k2Partners, 40)
		}
		if (!newLevels[l - 1].tasks[1].completed) { //подключить 10000 инвесторов с уровнем K2 в вашу команду
			setTestCurrent(newLevels, l, 1, getCountCommand(partners, 1, 10000), 10000)
		}
		taken = 0
		taken += setTestInvestors(newLevels, l, 2, k8, 2) //помочь 2 инвесторам дойти до уровня K8 в вашей структуре
		taken += setTestInvestors(newLevels, l, 3, k7 - taken, 1) //помочь 1 инвестору дойти до уровня K7 в вашей структуре 
		taken += setTestInvestors(newLevels, l, 4, k6 - taken, 1) //помочь 1 инвестору дойти до уровня K6 в вашей структуре
		taken += setTestInvestors(newLevels, l, 5, k5 - taken, 1) //помочь 1 инвестору дойти до уровня K5 в вашей структуре
		taken += setTestInvestors(newLevels, l, 6, k4 - taken, 1) //помочь 1 инвестору дойти до уровня K4 в вашей структуре
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
