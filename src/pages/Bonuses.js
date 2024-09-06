import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import Back from '../components/Back'
import { RefreshIcon } from '../components/Icons'
import Timer from '../components/Timer'
import getTimeString from '../utils/getTimeString'

export default function Bonuses() {
	const { t } = useTranslation()

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
			setMonthTime(getTimeString(endOfMonth))
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
					<h1>Забери бонус!</h1>
				</div>
				<p className="description">Здесь вы можете отслеживать статус достижения ваших бонусов!</p>
				<div className="tab-menu">
					<div className={'link' + (page === 'month' ? ' active' : '')} onClick={() => setPage('month')}>
						<span>Ежемесячное промо</span>
						<Timer time={monthTime} />
					</div>
					<div className={'link' + (page === 'start' ? ' active' : '')} onClick={() => setPage('start')}>
						<span>Start Bonus</span>
						<Timer time={'28:12:35'} />
					</div>
					<div className={'link' + (page === 'travel' ? ' active' : '')} onClick={() => setPage('travel')}>
						<span>Travel	Bonus</span>
						<Timer time={'28:12:35'} />
					</div>
					<div className="icon" onClick={updateBonuses}><RefreshIcon /></div>
				</div>
				{page === 'month' && <div className="tab">Ежемесячное промо</div>}
				{page === 'start' && <div className="tab">Start Bonus</div>}
				{page === 'travel' && <div className="tab">Travel	Bonus</div>}
			</div>
			<Modal active={modal} onClose={() => setModal(false)} title={modalTitle} text={modalText} type={modalType} />
		</>
	)
}