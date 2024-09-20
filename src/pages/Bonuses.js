import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import Back from '../components/Back'
import { CoinIcon, InfoIcon, OkIcon, RefreshIcon } from '../components/Icons'
import Timer from '../components/Timer'
import getDateTimeString from '../utils/getDateTimeString'
import promo from '../img/month-promo.png'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { DataContext } from '../context/DataProvider'
import { LevelsContext } from '../context/LevelsProvider'
import { bonuses } from '../utils/constants'
import getPartners from '../utils/getPartners'
const botName = process.env.REACT_APP_BOT_NAME

export default function Bonuses() {
	const { t } = useTranslation()
	const { auth } = useContext(AuthContext)
	const { profileData, tg, wpId } = useContext(DataContext)
	const { levels } = useContext(LevelsContext)

	const [current, setCurrent] = useState(0)
	const [progressTotal, setProgressTotal] = useState(66)
	const [progress, setProgress] = useState(0)

	const progressTack1Total = 22
	const [progressTack1, setProgressTack1] = useState(0)

	const progressTack2Total = 37
	const [progressTack2, setProgressTack2] = useState(0)



	//получить количество партнёров второго уровня или выше
	function getCountPartners(arr) {
		if (!arr || arr.length === 0) return 0
		let res = 0
		arr.forEach(item => {
			if (item.level >= 2) res++
		})
		return res
	}

	const inviteText = t('invite.text')
	function inviteClickHandler() {
		const encodedText = encodeURIComponent(inviteText)
		tg.openTelegramLink(`https://t.me/share/url?url=https://t.me/${botName}?startapp=r_${profileData.ref}&text=${encodedText}`)
	}

	const [modal, setModal] = useState(false)
	const [modalTitle, setModalTitle] = useState('')
	const [modalContent, setModalContent] = useState('')
	const [modalType, setModalType] = useState('')

	function openModal(title, content, type = '') {
		setModalTitle(title)
		setModalContent(content)
		setModalType(type)
		setModal(true)
	}

	function startModalHandler() {
		openModal(t('modal.reference'), <>
			<p><span className='link'>Start Bonus</span> {t('bonuses.startModal.text1')}</p>
			<br />
			<p>{t('bonuses.startModal.text2')}</p>
			<br />
			<p>{t('bonuses.startModal.text3')}</p>
			<br />
			<p>{t('bonuses.startModal.text4')}</p>
			<br />
			<p>{t('bonuses.startModal.text5')}</p>
			<div className='invite'><div className='invite-button' onClick={inviteClickHandler}>{t('bonuses.invite')}</div></div>
		</>)
	}

	const [page, setPage] = useState('month')

	const [monthTime, setMonthTime] = useState('00:00')
	const [startTime, setStartTime] = useState('00:00')
	const [travelTime, setTravelTime] = useState('00:00')

	useEffect(() => {
		if (!auth || !wpId) return
		async function init() {
			const partners = await getPartners(auth, wpId)
			const newCurrent = getCountPartners(partners)
			setCurrent(newCurrent)
			const newProgressTotal = newCurrent >= 22 ? 111 : 66
			setProgressTotal(newProgressTotal)
			setProgress(Math.round(newCurrent * 3 / newProgressTotal * 100))
			setProgressTack1(newCurrent / progressTack1Total * 100)
			setProgressTack2(newCurrent / progressTack2Total * 100)
		}
		init()
		if (!levels || !levels[1]?.time) return
		const interval = setInterval(() => {
			const today = new Date()
			const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
			const offsetMoscow = 3 * 60
			const localOffset = endOfMonth.getTimezoneOffset()
			endOfMonth.setMinutes(endOfMonth.getMinutes() + localOffset + offsetMoscow)
			setMonthTime(getDateTimeString(endOfMonth))

			const utcStartDate = new Date(levels[1].time.replace(' ', 'T') + 'Z')
			utcStartDate.setDate(utcStartDate.getDate() + 60)
			setStartTime(getDateTimeString(utcStartDate))

			const travelDate = new Date('2024-12-31T21:00:00Z')
			setTravelTime(getDateTimeString(travelDate))
		}, 1000)
		return () => {
			if (interval) clearInterval(interval)
		}
	}, [auth, wpId, levels])

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
						<Timer time={startTime} />
					</div>
					<div className={'link' + (page === 'travel' ? ' active' : '')} onClick={() => setPage('travel')}>
						<span>{t('bonuses.travel')}</span>
						<Timer time={travelTime} />
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
						<div className='info' onClick={startModalHandler}><InfoIcon size={22} /></div>
					</div>
					<p className="description">{t('bonuses.startDescription')}</p>
					<div className='start-row'>
						{bonuses.map((bonus, i) => (
							<div key={i} className={'block' + (i < profileData.start ? ' active' : '')}>
								<div className='number'>{i + 1}</div>
								<div className='bonus'>
									<CoinIcon />
									<span>{bonus}</span>
								</div>
							</div>
						))}
					</div>
					<div className={'earned' + (profileData.start === 12 ? ' active' : '')}>
						<p>{t('bonuses.earned')}:</p>
						<span>{bonuses.reduce((a, c, i) => i < profileData.start ? a + c : a, 0)}/{bonuses.reduce((a, c) => a + c, 0)}</span>
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
					</div>
					<p className="grey-description">{t('bonuses.termsDescription')}</p>
					<div className='progress'>
						<div className='note'>K2 = 3 {t('bonuses.points')}</div>
						<p className='title'>{t('bonuses.progress')}</p>
						<div className='row'>
							<div className='text'>{t('bonuses.progressDescription')}</div>
							<span className='sum'>{current * 3 > 111 ? 111 : current * 3}<span>/{progressTotal}</span> {t('bonuses.points2')}</span>
						</div>
						<div className='progress-bar'><div className='line' style={{ width: progress > 100 ? '100%' : progress + '%' }} /></div>
						<div className='number-row'>
							<span className='start' style={{ display: progress < 8 ? 'none' : 'block' }}>0%</span>
							<span className='current' style={{ left: progress < 2 ? '2%' : progress > 97 ? '96%' : progress + '%' }}>{progress > 100 ? 100 : progress}%</span>
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
								<span className='current' style={{ left: progressTack1 < 1 ? '1%' : progressTack1 > 98 ? '98%' : progressTack1 + '%' }}>{current > 22 ? 22 : current}</span>
								<span className='end' style={{ display: progressTack1 > 91 ? 'none' : 'block' }}>{progressTack1Total}</span>
							</div>
						</div>
						<div className={'check' + (progressTack1 >= 100 ? ' active' : '')}><OkIcon size={11} /></div>
					</div>
					<div className={'task' + (progressTack1 < 100 ? ' inactive' : '')}>
						<div className='overlay' />
						<div className='number'>2</div>
						<div className='content'>
							<p className='text'>{t('bonuses.task2')}</p>
							<div className='progress-bar'><div className='line' style={{ width: progressTack2 > 100 ? '100%' : progressTack2 + '%' }} /></div>
							<div className='number-row'>
								<span className='start' style={{ display: progressTack2 < 5 ? 'none' : 'block' }}>0</span>
								<span className='current' style={{ left: progressTack2 < 1 ? '1%' : progressTack2 > 98 ? '98%' : progressTack2 + '%' }}>{current > 37 ? 37 : current}</span>
								<span className='end' style={{ display: progressTack2 > 91 ? 'none' : 'block' }}>{progressTack2Total}</span>
							</div>
						</div>
						<div className={'check' + (progressTack2 >= 100 ? ' active' : '')}><OkIcon size={11} /></div>
					</div>
				</div>}
			</div>
			<Modal active={modal} onClose={() => setModal(false)} title={modalTitle} content={modalContent} type={modalType} />
		</>
	)
}