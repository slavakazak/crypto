import { useEffect, useState } from "react"
import { CrossIcon, TokenBigIcon } from "./Icons"
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { HeightContext } from "../utils/contexts"
import robot from '../img/robot.png'

export default function PopUpDaily({ active, onClose }) {
	const { t } = useTranslation()
	const { height, maxHeight } = useContext(HeightContext)
	const [animation, setAnimation] = useState(false)

	useEffect(() => {
		if (active) setAnimation(true)
	}, [active])

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
					<div className="week active"><span className="number">1</span><span className="text">{t('task.week')}</span></div>
					<div className="week"><span className="number">2</span><span className="text">{t('task.week')}</span></div>
					<div className="week"><span className="number">3</span><span className="text">{t('task.week')}</span></div>
				</div>
				<div className="day-row">
					<div className="day active"><span className="text">{t('task.day')} 1</span><TokenBigIcon /><span className="text">1000</span></div>
					<div className="day"><span className="text">{t('task.day')} 2</span><TokenBigIcon /><span className="text">1000</span></div>
					<div className="day"><span className="text">{t('task.day')} 3</span><TokenBigIcon /><span className="text">1000</span></div>
					<div className="day"><span className="text">{t('task.day')} 4</span><TokenBigIcon /><span className="text">1000</span></div>
					<div className="day"><span className="text">{t('task.day')} 5</span><TokenBigIcon /><span className="text">1000</span></div>
					<div className="day"><span className="text">{t('task.day')} 6</span><TokenBigIcon /><span className="text">1000</span></div>
					<div className="day day7"><span className="text">Де{t('task.day')}нь 7</span><TokenBigIcon /><span className="text">3000</span></div>
				</div>
				<div className="take">{t('task.take')}</div>
			</div>
		</div>
	)
}