import SaveRow from "./SaveRow"
import { useEffect, useState } from "react"
import { CrossIcon } from "./Icons"
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { HeightContext } from "../context/HeightProvider"

export default function PopUp({ active, onClose, title, description, children, onCancel, onSave, saveActive = true, full = false, saveText, search, setSearch }) {
	const { t } = useTranslation()
	const { height, maxHeight } = useContext(HeightContext)
	const [animation, setAnimation] = useState(false)

	useEffect(() => {
		if (active) setAnimation(true)
	}, [active])

	return (
		<div
			className={"pop-up-wrapper" + (active ? ' active' : '') + (animation || active ? ' animate' : '')}
			onClick={onClose}
			style={{ height: maxHeight ? maxHeight + 'px' : '100vh' }}
		>
			<div
				className={'pop-up' + (full ? ' pop-up-full' : '')}
				onClick={e => e.stopPropagation()}
				style={{ backgroundImage: 'url(/img/pop-up-bg.png)', paddingBottom: maxHeight - height < 150 ? '42px' : (maxHeight - height + 42) + 'px' }}
			>
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