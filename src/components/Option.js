import { OkIcon } from "./Icons"
import { useTranslation } from 'react-i18next'

export default function Option({ item, selected, setSelected, langPath }) {
	const { t } = useTranslation()
	return (
		<div className={"option" + (((selected?.tag && selected?.tag === item?.tag) || selected === item) ? ' active' : '')} onClick={() => setSelected(item)}>
			<div className="icon-wrap">{item.icon || item.toUpperCase()}</div>
			<span>{t([`${langPath}.${item?.tag || item}`, `${langPath}.default`])}</span>
			<OkIcon />
		</div>
	)
}