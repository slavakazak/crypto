import { OkIcon } from "./Icons"
import { useTranslation } from 'react-i18next'

export default function Option({ item, selected, setSelected, langPath }) {
	const { t } = useTranslation()
	return (
		<div className={"option" + (selected.tag === item.tag ? ' active' : '')} onClick={() => setSelected(item)}>
			<div className="icon-wrap">{item.icon}</div>
			<span>{t([`${langPath}.${item.tag}`, `${langPath}.default`])}</span>
			<OkIcon />
		</div>
	)
}