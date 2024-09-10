import { useEffect, useState } from "react"
import { BonusIcon, CopyIcon, FAQIcon, MetricsIcon, OkIcon, PresentIcon, RefreshIcon, TokenIcon } from "../components/Icons"
import getPartners from "../utils/getPartners"
import { useTranslation } from 'react-i18next'
import Modal from "../components/Modal"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { ProfileContext, WpIdContext } from "../utils/contexts"
import InviteTab from "../components/InviteTab"
import TabMenu from "../components/TabMenu"
const botName = process.env.REACT_APP_BOT_NAME

export default function Invite({ tg }) {
	const { t } = useTranslation()
	const profileData = useContext(ProfileContext)
	const wpId = useContext(WpIdContext)
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

	const pages = [
		{ value: 'invited', text: t('invite.invited') },
		{ value: 'command', text: t('invite.command') }
	]
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

	const [copied, setCopied] = useState(false)

	function copyHandler() {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(`https://t.me/${botName}?startapp=r_${profileData.ref}\n${inviteText}`).then(() => {
				setCopied(true)
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
							<div className="copy-button" onClick={copyHandler}>{copied ? <OkIcon size={24} /> : <CopyIcon size={19} />}</div>
						</div>
					</div>
				</div>
				<TabMenu pages={pages} page={page} setPage={setPage} onReload={updatePartners} amount={partners?.length + command?.length || 0} />
				{page === 'invited' && <InviteTab items={partners} loading={loading} />}
				{page === 'command' && <InviteTab items={command} loading={loading} />}
			</div>
			<Modal active={modal} onClose={() => setModal(false)} title={modalTitle} text={modalText} type={modalType} />
		</>
	)
}