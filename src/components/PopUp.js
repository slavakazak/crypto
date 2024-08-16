import SaveRow from "./SaveRow"
import { useEffect, useState } from "react"
import { CrossIcon } from "./Icons"

export default function PopUp({ active, setActive, title, description, children, onCancel, onSave, saveActive, full = false, saveText, search, setSearch }) {
	const [animation, setAnimation] = useState(false)

	useEffect(() => {
		if (active) setAnimation(true)
	}, [active])

	return (
		<div className={"pop-up-wrapper" + (active ? ' active' : '') + (animation || active ? ' animate' : '')} onClick={() => setActive(false)}>
			<div className={'pop-up' + (full ? ' pop-up-full' : '')} onClick={e => e.stopPropagation()}>
				{full && <div className="cross" onClick={() => setActive(false)}><CrossIcon /></div>}
				<h2>{title}</h2>
				<p className="description">{description}</p>
				{setSearch && search !== undefined && <input placeholder="Поиск" className="search" value={search} onChange={e => setSearch(e.target.value)} />}
				<div className="select">{children}</div>
				<SaveRow onCancel={onCancel} onSave={onSave} active={saveActive} saveText={saveText} />
			</div>
		</div>
	)
}