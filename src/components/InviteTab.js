import { useTranslation } from 'react-i18next'
import { useContext } from "react"
import { ProfileContext } from "../utils/contexts"

export default function InviteTab({ items, loading }) {
	const { t } = useTranslation()
	const profileData = useContext(ProfileContext)

	return (
		<div className="tab">
			{loading ? <div className='preloader'><div className='loader' /></div> : items?.length === 0 ? t('invite.noUsers') : <div className="tab-list">
				{items.map((partner, i) => {
					const date = new Date(partner.registered_date.replace(' ', 'T') + 'Z')
					const dateFormat = new Intl.DateTimeFormat(profileData.language.tag, { year: "numeric", month: "numeric", day: "numeric" })
					return (
						<div key={i} className="item">
							<div className="left-side">
								<div className="number">{i + 1}</div>
								<div className="col">
									<p>{partner.username}</p>
									<p><span>{t('invite.lvl')}:</span> K{partner.level || 1}</p>
									<p><span>{t('invite.date')}:</span> {dateFormat.format(date)}</p>
								</div>
							</div>
							{partner.line && <div className="right-side">
								<span className="title">{t('invite.line')}:</span>
								<span className="value">{partner.line}</span>
							</div>}
						</div>
					)
				})}
			</div>}
		</div>
	)
}