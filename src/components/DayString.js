import { useContext } from "react"
import { DataContext } from "../context/DataProvider"
import { useTranslation } from 'react-i18next'

export default function DayString({ number }) {
	const { t } = useTranslation()
	const { profileData } = useContext(DataContext)
	let day
	if (profileData.language.tag === 'en') {
		day = t('day2')
		if (number === 1) {
			day = t('day1')
		}
	} else {
		day = t('day3')
		if (number % 10 === 1 && number % 100 !== 11) {
			day = t('day1')
		} else if ((number % 10 === 2 && number % 100 !== 12) || (number % 10 === 3 && number % 100 !== 13) || (number % 10 === 4 && number % 100 !== 14)) {
			day = t('day2')
		}
	}
	return <span>{day}</span>
}