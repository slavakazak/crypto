import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { ProfileContext } from '../utils/contexts'

export default function RatingTab({ items }) {
	const { t } = useTranslation()
	const profileData = useContext(ProfileContext)

	return (
		<div className="tab">
			<div className="tab-list">
				{items.map((item, i) => {
					let day
					if (profileData.language.tag === 'en') {
						day = t('rating.day2')
						if (item.result === 1) {
							day = t('rating.day1')
						}
					} else {
						day = t('rating.day3')
						if (item.result % 10 === 1 && item.result % 100 !== 11) {
							day = t('rating.day1')
						} else if ((item.result % 10 === 2 && item.result % 100 !== 12) || (item.result % 10 === 3 && item.result % 100 !== 13) || (item.result % 10 === 4 && item.result % 100 !== 14)) {
							day = t('rating.day2')
						}
					}

					return (
						<div key={i} className="item">
							<div className="left-side">
								<div className='number' data-number={item.number || i}>{i + 1}</div>
								<div className="col">
									<p>{item.username}</p>
									{item.nomination && <p><span>{t('rating.nomination')}:</span> {item.nomination}</p>}
									{item.date && <p><span>{t('rating.date')}:</span> {item.date}</p>}
									<p><span>{t('invite.lvl')}:</span> K{item.level || 1}</p>
								</div>
							</div>
							{item.result && <div className="right-side">
								<span className="title">{t('rating.result')}:</span>
								<span className="value">{item.result}{item.days && <span>{day}</span>}</span>
							</div>}
						</div>
					)
				})}
			</div>
		</div>
	)
}