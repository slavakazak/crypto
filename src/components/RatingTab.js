import { useTranslation } from 'react-i18next'
import DayString from './DayString'

export default function RatingTab({ items }) {
	const { t } = useTranslation()

	return (
		<div className="tab">
			<div className="tab-list">
				{items.map((item, i) => (
					<div key={i} className="item" data-number={item.number || i}>
						<div className="left-side">
							<div className='number'>{i + 1}</div>
							<div className="col">
								<p>{item.username}</p>
								{item.nomination && <p><span>{t('rating.nomination')}:</span> {item.nomination}</p>}
								{item.date && <p><span>{t('rating.date')}:</span> {item.date}</p>}
								<p><span>{t('invite.lvl')}:</span> K{item.level || 1}</p>
							</div>
						</div>
						{item.result && <div className="right-side">
							<span className="title">{t('rating.result')}:</span>
							<span className="value">{item.result}{item.days && <DayString number={item.result} />}</span>
						</div>}
					</div>
				))}
			</div>
		</div>
	)
}