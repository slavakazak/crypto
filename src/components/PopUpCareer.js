import SaveRow from "./SaveRow"
import { useEffect, useState } from "react"
import { CrossIcon } from "./Icons"
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { HeightContext } from "../utils/contexts"

export default function PopUpCareer({ active, onClose, children }) {
	const { t } = useTranslation()
	const { height, maxHeight } = useContext(HeightContext)
	const [animation, setAnimation] = useState(false)

	useEffect(() => {
		if (active) setAnimation(true)
	}, [active])

	return (
		<div
			className={"pop-up-wrapper pop-up-career" + (active ? ' active' : '') + (animation || active ? ' animate' : '')}
			onClick={onClose}
			style={{ height: maxHeight ? maxHeight + 'px' : '100vh' }}
		>
			<div
				className='pop-up'
				onClick={e => e.stopPropagation()}
				style={{ backgroundImage: 'url(/img/pop-up-bg.png)', paddingBottom: maxHeight - height < 150 ? '49px' : (maxHeight - height + 49) + 'px' }}
			>
				<div className="cross" onClick={onClose}><CrossIcon /></div>
				<h2>Задания</h2>
				<p className="description">Отслеживайте динамику выполнения заданий для перехода на следующий уровень</p>
				{children}
			</div>
		</div>
	)
}