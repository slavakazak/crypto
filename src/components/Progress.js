import { useTranslation } from 'react-i18next'

export default function Progress({ current, total, text }) {
	const { t } = useTranslation()
	const progress = Math.round(current / total * 100)
	return (
		<div className='progress'>
			<p className='title'>{t('bonuses.progress')}</p>
			<div className='row'>
				<div className='text'>{text}</div>
				<span className='sum'>{current}<span>/{total}</span></span>
			</div>
			<div className='progress-bar'><div className='line' style={{ width: progress > 100 ? '100%' : progress + '%' }} /></div>
			<div className='number-row'>
				<span className='start' style={{ display: progress < 8 ? 'none' : 'block' }}>0%</span>
				<span className='current' style={{ left: progress < 2 ? '2%' : progress > 97 ? '96%' : progress + '%' }}>{progress}%</span>
				<span className='end' style={{ display: progress > 87 ? 'none' : 'block' }}>100%</span>
			</div>
		</div>
	)
}