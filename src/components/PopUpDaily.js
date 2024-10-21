import { useEffect, useState } from "react"
import { CrossIcon, TokenBigIcon } from "./Icons"
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { HeightContext } from "../context/HeightProvider"
import { DataContext } from "../context/DataProvider"
import { AuthContext } from "../context/AuthProvider"
import robot from '../img/robot.png'
import getUTCTime from "../utils/getUTCTime"
import addWpBalance from "../utils/addWpBalance"

export default function PopUpDaily({ active, onClose }) {
	const { t } = useTranslation()
	const { height, maxHeight } = useContext(HeightContext)
	const { auth } = useContext(AuthContext)
	const { setData, profileData, wpId } = useContext(DataContext)
	const [animation, setAnimation] = useState(false)

	const [take, setTake] = useState(false)

	useEffect(() => {
		if (!wpId) return
		async function init() {
			if (!profileData.dailyTime) {
				setTake(true)
				return
			}
			const date = new Date(profileData.dailyTime.replace(' ', 'T') + 'Z')
			const today = new Date()
			const yesterday = new Date()
			yesterday.setDate(today.getDate() - 1);
			today.setHours(0, 0, 0, 0);
			yesterday.setHours(0, 0, 0, 0);
			date.setHours(0, 0, 0, 0);
			if (date.getTime() === yesterday.getTime()) {
				setTake(true)
				return
			}
			if (date.getTime() < yesterday.getTime()) {
				setTake(true)
				await setData({ daily: 0 })
			}
		}
		init()
	}, [wpId])

	useEffect(() => {
		if (active) setAnimation(true)
	}, [active])

	async function takeClickHandler() {
		if (!take) return
		setTake(false)
		await setData({ daily: profileData.daily + 1, dailyTime: getUTCTime() })
		await addWpBalance(auth, wpId, profileData.daily % 7 === 6 ? 3000 : 1000, 'token', 'Ежедневная активность ' + (profileData.daily + 1))
	}

	return (
		<div
			className={"pop-up-wrapper pop-up-daily" + (active ? ' active' : '') + (animation || active ? ' animate' : '')}
			onClick={onClose}
			style={{ height: maxHeight ? maxHeight + 'px' : '100vh' }}
		>
			<div className="cross" onClick={onClose}><CrossIcon /></div>
			<img src={robot} alt="robot" />
			<div className="content">
				<h2>{t('task.dailyTitle')}</h2>
				<p className="description">{t('task.dailyDescription1')}<br />{t('task.dailyDescription2')}<br />{t('task.dailyDescription3')}</p>
			</div>
			<div
				className='pop-up'
				onClick={e => e.stopPropagation()}
				style={{ backgroundImage: 'url(/img/pop-up-bg.png)', paddingBottom: maxHeight - height < 150 ? '39px' : (maxHeight - height + 39) + 'px' }}
			>
				<div className="week-row">
					<div className="line" />
					<div className={'week' + (profileData.daily % 21 >= 0 ? ' active' : '')}><span className="number">1</span><span className="text">{t('task.week')}</span></div>
					<div className={'week' + (profileData.daily % 21 >= 7 ? ' active' : '')}><span className="number">2</span><span className="text">{t('task.week')}</span></div>
					<div className={'week' + (profileData.daily % 21 >= 14 ? ' active' : '')}><span className="number">3</span><span className="text">{t('task.week')}</span></div>
				</div>
				<div className="day-row">
					<div className={'day' + (profileData.daily % 7 >= 0 ? ' active' : '')}><span className="text">{t('task.day')} 1</span><TokenBigIcon /><span className="text">1000</span></div>
					<div className={'day' + (profileData.daily % 7 >= 1 ? ' active' : '')}><span className="text">{t('task.day')} 2</span><TokenBigIcon /><span className="text">1000</span></div>
					<div className={'day' + (profileData.daily % 7 >= 2 ? ' active' : '')}><span className="text">{t('task.day')} 3</span><TokenBigIcon /><span className="text">1000</span></div>
					<div className={'day' + (profileData.daily % 7 >= 3 ? ' active' : '')}><span className="text">{t('task.day')} 4</span><TokenBigIcon /><span className="text">1000</span></div>
					<div className={'day' + (profileData.daily % 7 >= 4 ? ' active' : '')}><span className="text">{t('task.day')} 5</span><TokenBigIcon /><span className="text">1000</span></div>
					<div className={'day' + (profileData.daily % 7 >= 5 ? ' active' : '')}><span className="text">{t('task.day')} 6</span><TokenBigIcon /><span className="text">1000</span></div>
					<div className={'day day7' + (profileData.daily % 7 >= 6 ? ' active' : '')}><span className="text">{t('task.day')} 7</span><TokenBigIcon /><span className="text">3000</span></div>
				</div>
				<div className={'take' + (take ? '' : ' inactive')} onClick={takeClickHandler}>{t('task.take')}</div>
			</div>
		</div>
	)
}