import { useState } from "react"
import { RightArrowIcon } from "./Icons"

export default function Accordion({ number, title, children }) {
	const [active, setActive] = useState(false)
	return (
		<div className={'accordion' + (active ? ' active' : '')}>
			<div className="head" onClick={() => setActive(previous => !previous)}>
				<div className="left-side">
					<div className="number">{number}.</div>
					<div className="title">{title}</div>
				</div>
				<RightArrowIcon />
			</div>
			<div className="content">
				<div className="block">
					{children}
				</div>
			</div>
		</div>
	)
}