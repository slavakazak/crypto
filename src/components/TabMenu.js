import { RefreshIcon } from "./Icons"
import { useTranslation } from 'react-i18next'

export default function TabMenu({ pages, page, setPage, onReload, amount }) {
	const { t } = useTranslation()

	return (
		<div div className="tab-menu">
			{pages.map((item, i) => (
				<div key={i} className={'link' + (page === item.value ? ' active' : '')} onClick={() => setPage(item.value)}>
					<span>{item.text}</span>
				</div>
			))}
			{amount && <div className="text">{t('invite.amount')}: {amount}</div>}
			{onReload && <div className="icon" onClick={onReload}><RefreshIcon /></div>}
		</div>
	)
}