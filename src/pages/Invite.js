import { useEffect, useState } from "react"
import { BonusIcon, CopyIcon, FAQIcon, MetricsIcon, PresentIcon, RefreshIcon, TokenIcon } from "../components/Icons"
import getPartners from "../utils/getPartners"
import { useTranslation } from 'react-i18next'
import Modal from "../components/Modal"
import { useNavigate } from "react-router-dom"
const botName = process.env.REACT_APP_BOT_NAME

export default function Invite({ profileData, wpId, tg }) {
	const { t } = useTranslation()
	const navigate = useNavigate()

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

	const [page, setPage] = useState('invited')
	const [partners, setPartners] = useState([])
	const [command, setCommand] = useState([])
	const [loading, setLoading] = useState(true)
	const inviteText = t('invite.text')

	function getCommand(arr, res = [], line = 1) {
		if (arr.length === 0) return
		arr.forEach(item => {
			if (line > 1) res.push({ ...item, line })
			getCommand(item.partners, res, line + 1)
		})
		return res
	}

	async function updatePartners() {
		setLoading(true)
		const newPartners = await getPartners(wpId)
		setPartners(newPartners)
		const newCommand = getCommand(newPartners)
		setCommand(newCommand)
		setLoading(false)
	}

	useEffect(() => {
		updatePartners()
	}, [wpId])

	function inviteClickHandler() {
		const encodedText = encodeURIComponent(inviteText)
		tg.openTelegramLink(`https://t.me/share/url?url=https://t.me/${botName}?startapp=r_${profileData.ref}&text=${encodedText}`)
	}

	function copyHandler() {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(`https://t.me/${botName}?startapp=r_${profileData.ref}\n${inviteText}`).then(() => {
				console.log('copied')
			}, err => {
				console.error('An error occurred while copying text: ', err)
			})
		} else {
			console.error('Clipboard API not available')
		}
	}

	function bonusClickHandler() {
		if (profileData.level < 3) {
			openModal(t('modal.reference'), t('invite.bonusReference'))
			return
		}
		navigate("/bonuses")
	}

	return (
		<>
			<div id="invite">
				<h1>{t('invite.title')}</h1>
				<p className="description">{t('invite.description')}</p>
				<div className="buttons-row">
					<div className="big-button" onClick={bonusClickHandler}>
						<div className="icon"><BonusIcon /></div>
						<span>{t('invite.bonuses')}</span>
					</div>
					<div className="big-button">
						<div className="icon"><MetricsIcon /></div>
						<span>{t('invite.metrics')}</span>
					</div>
					<div className="big-button">
						<div className="icon"><FAQIcon /></div>
						<span>{t('invite.faq')}</span>
					</div>
				</div>
				<div className="invite">
					<PresentIcon />
					<div className="col">
						<h2>{t('invite.inviteTitle')}</h2>
						<div className="text"><TokenIcon /><span>+1000</span><p>{t('invite.inviteText')}</p></div>
						<div className="invite-row">
							<div className="invite-button" onClick={inviteClickHandler}>{t('invite.invite')}</div>
							<div className="copy-button" onClick={copyHandler}><CopyIcon size={19} /></div>
						</div>
					</div>
				</div>
				<div className="tab-menu">
					<div className={'link' + (page === 'invited' ? ' active' : '')} onClick={() => setPage('invited')}><span>{t('invite.invited')}</span></div>
					<div className={'link' + (page === 'command' ? ' active' : '')} onClick={() => setPage('command')}><span>{t('invite.command')}</span></div>
					<div className="text">{t('invite.amount')}: {partners?.length + command?.length}</div>
					<div className="icon" onClick={updatePartners}><RefreshIcon /></div>
				</div>
				{page === 'invited' && <div className="tab">
					{loading ? t('loading') : partners.length === 0 ? t('invite.noUsers') : <div className="tab-list">
						{partners.map((partner, i) => {
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
								</div>
							)
						})}
					</div>}
				</div>}
				{page === 'command' && <div className="tab">
					{loading ? t('loading') : command.length === 0 ? t('invite.noUsers') : <div className="tab-list">
						{command.map((partner, i) => {
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
									<div className="right-side">
										<span className="title">{t('invite.line')}:</span>
										<span className="value">{partner.line}</span>
									</div>
								</div>
							)
						})}
					</div>}
				</div>}
			</div>
			<Modal active={modal} onClose={() => setModal(false)} title={modalTitle} text={modalText} type={modalType} />
		</>
	)
}