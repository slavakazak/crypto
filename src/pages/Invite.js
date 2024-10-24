import { useEffect, useState } from "react"
import { BonusIcon, CopyIcon, MetricsIcon, OkIcon, PresentIcon, QuestionIcon, TokenIcon } from "../components/Icons"
import getPartners from "../utils/getPartners"
import { useTranslation } from 'react-i18next'
import Modal from "../components/Modal"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { DataContext } from "../context/DataProvider"
import { AuthContext } from "../context/AuthProvider"
import InviteTab from "../components/InviteTab"
import TabMenu from "../components/TabMenu"
const botName = process.env.REACT_APP_BOT_NAME

export default function Invite() {
	const { t } = useTranslation()
	const { profileData, wpId, tg } = useContext(DataContext)
	const { auth } = useContext(AuthContext)
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
		if (!arr || arr.length === 0) return []
		arr.forEach(item => {
			if (line > 1) res.push({ ...item, line })
			getCommand(item.partners, res, line + 1)
		})
		return res
	}

	async function updatePartners() {
		if (!auth) return
		setLoading(true)
		const newPartners = await getPartners(auth, wpId)
		setPartners(newPartners)
		const newCommand = getCommand(newPartners)
		setCommand(newCommand)
		setLoading(false)
	}

	useEffect(() => {
		if (wpId) updatePartners()
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
				<h1 className="animate__animated animate__zoomIn">{t('invite.title')}</h1>
				<p className="description animate__animated animate__zoomIn">{t('invite.description')}</p>
				<div className="buttons-row">
					<div className="big-button animate__animated animate__bounceInLeft" onClick={bonusClickHandler}>
						<div className="icon"><BonusIcon /></div>
						<span>{t('invite.bonuses')}</span>
					</div>
					<div className="big-button grey animate__animated animate__bounceInLeft">
						<div className="icon"><MetricsIcon /></div>
						<span>{t('invite.metrics')}</span>
					</div>
					<Link to={'/faq-invite'} className="big-button animate__animated animate__bounceInLeft">
						<div className="icon"><QuestionIcon size={41} /></div>
						<span>{t('invite.faq')}</span>
					</Link>
				</div>
				<div className="invite animate__animated animate__bounceInRight">
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
				<div className="animate__animated animate__zoomIn">
					<TabMenu pages={pages} page={page} setPage={setPage} onReload={updatePartners} amount={(page === 'invited' ? partners?.length : command?.length) || 0} />
					{page === 'invited' && <InviteTab items={partners} loading={loading} />}
					{page === 'command' && <InviteTab items={command} loading={loading} />}
				</div>
			</div>
			<Modal active={modal} onClose={() => setModal(false)} title={modalTitle} text={modalText} type={modalType} />
		</>
	)
}