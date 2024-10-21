import Back from "../components/Back"
import { useTranslation } from 'react-i18next'
import PopUpMail from "../components/PopUpMail"
import { useEffect, useState, useContext } from "react"
import getMessages from "../utils/getMessages"
import { AuthContext } from "../context/AuthProvider"
import { DataContext } from "../context/DataProvider"
import markMessageAsRead from "../utils/markMessageAsRead"

export default function Mail() {
	const { t } = useTranslation()
	const { auth } = useContext(AuthContext)
	const { wpId, profileData } = useContext(DataContext)

	const [messages, setMessages] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!auth || !wpId) return
		async function init() {
			setLoading(true)
			const newMessages = await getMessages(auth, wpId)
			setMessages(newMessages)
			setLoading(false)
		}
		init()
	}, [auth, wpId])

	const [popUp, setPopUp] = useState(false)
	const [popUpTitle, setPopUpTitle] = useState('')
	const [popUpContent, setPopUpContent] = useState('')

	function openPopUp(title, content) {
		setPopUp(true)
		setPopUpTitle(title)
		setPopUpContent(content)
	}

	function messageClickHandler(message) {
		return async () => {
			let content = profileData.language === 'en' && message.content_en ? message.content_en : message.content
			content = content.replace('http://', 'https://').replace('" width="560" height="315"', `&fs=0&hl=${profileData.language}&rel=0" width="100%" height="200"`)
			openPopUp(
				profileData.language === 'en' && message.title_en ? message.title_en : message.title,
				<div dangerouslySetInnerHTML={{ __html: content }} />
			)
			setMessages(previous => {
				const newMessages = [...previous]
				return newMessages.map(newMessage => newMessage.id === message.id ? { ...newMessage, is_read: true } : newMessage)
			})
			await markMessageAsRead(auth, wpId, message.id)
		}
	}

	return (
		<>

			<div id="mail">
				<div className="top-menu">
					<Back />
					<h1>{t('mail.title')}</h1>
				</div>
				{loading ? <div className='preloader'><div className='loader' /></div> : messages.length === 0 ? <>Нет сообщений</> : messages.map((message, i) => {
					const dateTime = new Date(message.date)
					const dateTimeFormat = new Intl.DateTimeFormat(profileData.language, { month: "short", day: "numeric" })
					return (<div key={i} className={'message' + (message.is_read ? '' : ' active')} onClick={messageClickHandler(message)}>
						<div className="left-side">
							<div className="dot" />
							<span className="title">{profileData.language === 'en' && message.title_en ? message.title_en : message.title}</span>
						</div>
						<span className="date">{dateTimeFormat.format(dateTime)}</span>
					</div>)
				})}
			</div>

			<PopUpMail active={popUp} onClose={() => setPopUp(false)} title={popUpTitle}>{popUpContent}</PopUpMail>

		</>
	)
}