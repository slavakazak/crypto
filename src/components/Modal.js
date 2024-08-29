import { ErrorIcon, SuccessIcon, CrossIcon } from "./Icons"
import { useEffect, useState } from "react"

export default function Modal({ active, onClose, title, text, type }) {
	const [animation, setAnimation] = useState(false)

	useEffect(() => {
		if (active) setAnimation(true)
	}, [active])

	return (
		<div className={'modal-wrapper' + (active ? ' active' : '') + (animation || active ? ' animate' : '')} onClick={onClose}>
			<div className="modal" onClick={e => e.stopPropagation()}>
				<div className="cross" onClick={onClose}><CrossIcon /></div>
				<div className="title">
					<h2>{title}</h2>
					{type && <div className="icon">
						{type === 'success' && <SuccessIcon />}
						{type === 'error' && <ErrorIcon />}
					</div>}
				</div>
				<div className="text"><p>{text}</p></div>
			</div>
		</div>
	)
}