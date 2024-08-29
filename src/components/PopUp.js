import SaveRow from "./SaveRow"
import { useEffect, useState } from "react"
import { CrossIcon } from "./Icons"
import { useTranslation } from 'react-i18next'

export default function PopUp({ active, onClose, title, description, children, onCancel, onSave, saveActive, full = false, saveText, search, setSearch }) {
	const { t } = useTranslation()
	const [animation, setAnimation] = useState(false)

	useEffect(() => {
		if (active) setAnimation(true)
	}, [active])

	return (
		<div className={"pop-up-wrapper" + (active ? ' active' : '') + (animation || active ? ' animate' : '')} onClick={onClose}>
			<div className={'pop-up' + (full ? ' pop-up-full' : '')} onClick={e => e.stopPropagation()}>
				{full && <div className="cross" onClick={onClose}><CrossIcon /></div>}
				<h2>{title}</h2>
				<p className="description">{description}</p>
				{setSearch && search !== undefined && <input placeholder={t('popUp.search')} className="search" value={search} onChange={e => setSearch(e.target.value)} />}
				{children}
				<SaveRow onCancel={onCancel} onSave={onSave} active={saveActive} saveText={saveText} />
			</div>
		</div>
	)
}