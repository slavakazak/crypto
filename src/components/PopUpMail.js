import { useEffect, useState } from "react"
import { CrossIcon } from "./Icons"
import { useContext } from 'react'
import { HeightContext } from "../utils/contexts"

export default function PopUpMail({ active, onClose, title, children }) {
	const { height, maxHeight } = useContext(HeightContext)
	const [animation, setAnimation] = useState(false)

	useEffect(() => {
		if (active) setAnimation(true)
	}, [active])

	return (
		<div
			className={"pop-up-wrapper pop-up-mail" + (active ? ' active' : '') + (animation || active ? ' animate' : '')}
			onClick={onClose}
			style={{ height: maxHeight ? maxHeight + 'px' : '100vh' }}
		>
			<div
				className='pop-up pop-up-full'
				onClick={e => e.stopPropagation()}
				style={{ paddingBottom: maxHeight - height < 150 ? '24px' : (maxHeight - height + 24) + 'px' }}
			>
				<div className="cross" onClick={onClose}><CrossIcon /></div>
				<h2>{title}</h2>
				<div className="content">{children}</div>
			</div>
		</div>
	)
}