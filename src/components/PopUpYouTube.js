import { useEffect, useState } from "react"
import { CrossIcon, TokenIcon, YouTubeIcon } from "./Icons"
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { HeightContext } from "../context/HeightProvider"

export default function PopUpYouTube({ active, onClose, title, description, link, bonus }) {
	const { t } = useTranslation()
	const { height, maxHeight } = useContext(HeightContext)
	const [animation, setAnimation] = useState(false)

	useEffect(() => {
		if (active) setAnimation(true)
	}, [active])

	return (
		<div
			className={"pop-up-wrapper pop-up-youtube" + (active ? ' active' : '') + (animation || active ? ' animate' : '')}
			onClick={onClose}
			style={{ height: maxHeight ? maxHeight + 'px' : '100vh' }}
		>
			<div
				className='pop-up'
				onClick={e => e.stopPropagation()}
				style={{ backgroundImage: 'url(/img/pop-up-bg.png)', paddingBottom: maxHeight - height < 150 ? '78px' : (maxHeight - height + 78) + 'px' }}
			>
				<div className="cross" onClick={onClose}><CrossIcon /></div>
				<div className="icon"><YouTubeIcon size={138} /></div>
				<h2>{title}</h2>
				<p className="description">{description}</p>
				<div className="see-video">{t('task.see')}</div>
				<div className="bonus"><span className="text">{t('task.reward')}:</span><TokenIcon size={33} /><span className="value">+{bonus}</span></div>
				<div className="check">{t('task.check')}</div>
			</div>
		</div>
	)
}