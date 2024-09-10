import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import Back from '../components/Back'
import { CoinIcon, InfoIcon, OkIcon, RefreshIcon } from '../components/Icons'
import Timer from '../components/Timer'
import getDateTimeString from '../utils/getDateTimeString'
import promo from '../img/month-promo.png'
import { useContext } from 'react'
import { ProfileContext } from '../utils/contexts'

export default function Bonuses() {
	const { t } = useTranslation()
	const profileData = useContext(ProfileContext)

	const bonuses = [1000, 750, 1500, 750, 750, 2500, 750, 750, 5000, 750, 5000, 5000]

	const progressTotal = 66
	const progressCurrent = 11
	const progress = Math.round(progressCurrent / progressTotal * 100)

	const progressTack1Total = 22
	const progressTack1Current = 6
	const progressTack1 = progressTack1Current / progressTack1Total * 100

	const progressTack2Total = 37
	const progressTack2Current = 6
	const progressTack2 = progressTack2Current / progressTack2Total * 100

	const [modal, setModal] = useState(false)
	const [modalTitle, setModalTitle] = useState('')
	const [modalText, setModalText] = useState('')
	const [modalType, setModalType] = useState('')

	function openModal(title, text, type = '') {
		setModalTitle(title)
		setModalText(text)
		setModalType(type)
		setModal(true)
	}

	const [page, setPage] = useState('month')

	const [monthTime, setMonthTime] = useState('00:00')
	const [startTime, setStartTime] = useState('00:00')
	const [travelTime, setTravelTime] = useState('00:00')

	useEffect(() => {
		const interval = setInterval(() => {
			const today = new Date()
			const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
			const offsetMoscow = 3 * 60
			const localOffset = endOfMonth.getTimezoneOffset()
			endOfMonth.setMinutes(endOfMonth.getMinutes() + localOffset + offsetMoscow)
			setMonthTime(getDateTimeString(endOfMonth))
		}, 1000)
		return () => {
			clearInterval(interval)
		}
	}, [])

	function updateBonuses() {

	}

	return (
		<>
			<div id="bonuses">
				<div className="top-menu">
					<Back />
					<h1>{t('bonuses.title')}</h1>
				</div>
				<p className="description">{t('bonuses.description')}</p>
				<div className="tab-menu">
					<div className={'link' + (page === 'month' ? ' active' : '')} onClick={() => setPage('month')}>
						<span>{t('bonuses.month')}</span>
						<Timer time={monthTime} />
					</div>
					<div className={'link' + (page === 'start' ? ' active' : '')} onClick={() => setPage('start')}>
						<span>{t('bonuses.start')}</span>
						<Timer time={'28:12:35'} />
					</div>
					<div className={'link' + (page === 'travel' ? ' active' : '')} onClick={() => setPage('travel')}>
						<span>{t('bonuses.travel')}</span>
						<Timer time={'28:12:35'} />
					</div>
					<div className="icon" onClick={updateBonuses}><RefreshIcon /></div>
				</div>
				{page === 'month' && <div className="tab month">
					<h2>{t('bonuses.monthTitle')}</h2>
					<p className="description">{t('bonuses.monthDescription')}</p>
					<img src={promo} alt={t('bonuses.month')} />
				</div>}
				{page === 'start' && <div className="tab start">
					<div className='title'>
						<h2>{t('bonuses.start')}</h2>
						<div className='info'><InfoIcon size={22} /></div>
					</div>
					<p className="description">{t('bonuses.startDescription')}</p>
					<div className='start-row'>
						{bonuses.map((bonus, i) => (
							<div key={i} className={'block' + (i === 0 ? ' active' : '')}>
								<div className='number'>{i + 1}</div>
								<div className='bonus'>
									<CoinIcon />
									<span>{bonus}</span>
								</div>
							</div>
						))}
					</div>
					<div className='earned'>
						<p>{t('bonuses.earned')}:</p>
						<span>1000/24500</span>
						<CoinIcon size={19} />
					</div>
				</div>}
				{page === 'travel' && <div className="tab travel">
					<h2>{t('bonuses.travelTitle')}</h2>
					<p className="description"><span>{t('bonuses.travelDescription')}</span></p>
					<iframe
						width="100%"
						height="200"
						src={`https://www.youtube.com/embed/0zMLl9WbHVg?si=6Adtx-tK7540Ybhp&fs=0&hl=${profileData.language.tag}&rel=0`}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
						referrerPolicy="strict-origin-when-cross-origin"
					/>
					<div className='title'>
						<h3>{t('bonuses.terms')}</h3>
						<div className='info'><InfoIcon size={17} /></div>
					</div>
					<p className="grey-description">{t('bonuses.termsDescription')}</p>
					<div className='progress'>
						<div className='note'>K2 = 3 {t('bonuses.points')}</div>
						<p className='title'>{t('bonuses.progress')}</p>
						<div className='row'>
							<div className='text'>
								<span>{t('bonuses.progressDescription')}</span>
								<div className='info'><InfoIcon /></div>
							</div>
							<span className='sum'>{progressCurrent}<span>/{progressTotal}</span> {t('bonuses.points2')}</span>
						</div>
						<div className='progress-bar'><div className='line' style={{ width: progress > 100 ? '100%' : progress + '%' }} /></div>
						<div className='number-row'>
							<span className='start' style={{ display: progress < 8 ? 'none' : 'block' }}>0%</span>
							<span className='current' style={{ left: progress < 2 ? '2%' : progress > 97 ? '96%' : progress + '%' }}>{progress}%</span>
							<span className='end' style={{ display: progress > 87 ? 'none' : 'block' }}>100%</span>
						</div>
					</div>
					<h4 className='task-title'>{t('bonuses.tasks')}</h4>
					<div className='task'>
						<div className='number'>1</div>
						<div className='content'>
							<p className='text'>{t('bonuses.task1')}</p>
							<div className='progress-bar'><div className='line' style={{ width: progressTack1 > 100 ? '100%' : progressTack1 + '%' }} /></div>
							<div className='number-row'>
								<span className='start' style={{ display: progressTack1 < 5 ? 'none' : 'block' }}>0</span>
								<span className='current' style={{ left: progressTack1 < 1 ? '1%' : progressTack1 > 98 ? '98%' : progressTack1 + '%' }}>{progressTack1Current}</span>
								<span className='end' style={{ display: progressTack1 > 91 ? 'none' : 'block' }}>{progressTack1Total}</span>
							</div>
						</div>
						<div className='check'><OkIcon size={11} /></div>
					</div>
					<div className='task inactive'>
						<div className='overlay' />
						<div className='number'>2</div>
						<div className='content'>
							<p className='text'>{t('bonuses.task2')}</p>
							<div className='progress-bar'><div className='line' style={{ width: progressTack2 > 100 ? '100%' : progressTack2 + '%' }} /></div>
							<div className='number-row'>
								<span className='start' style={{ display: progressTack2 < 5 ? 'none' : 'block' }}>0</span>
								<span className='current' style={{ left: progressTack2 < 1 ? '1%' : progressTack2 > 98 ? '98%' : progressTack2 + '%' }}>{progressTack2Current}</span>
								<span className='end' style={{ display: progressTack2 > 91 ? 'none' : 'block' }}>{progressTack2Total}</span>
							</div>
						</div>
						<div className='check'><OkIcon size={11} /></div>
					</div>
				</div>}
			</div>
			<Modal active={modal} onClose={() => setModal(false)} title={modalTitle} text={modalText} type={modalType} />
		</>
	)
}