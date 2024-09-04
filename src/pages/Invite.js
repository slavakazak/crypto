import { useEffect, useState } from "react"
import { BonusIcon, CopyIcon, FAQIcon, MetricsIcon, PresentIcon, RefreshIcon, TokenIcon } from "../components/Icons"
import getPartners from "../utils/getPartners"
const botName = process.env.REACT_APP_BOT_NAME

export default function Invite({ profileData, wpId, tg }) {
	const [page, setPage] = useState('invited')
	const [partners, setPartners] = useState([])
	const [loading, setLoading] = useState(true)
	const inviteText = "Начни со мной зарабатывать на торговых роботах🔥"

	useEffect(() => {
		async function init() {
			const newPartners = await getPartners(wpId)
			setPartners(newPartners)
			setLoading(false)
		}
		init()
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
	return (
		<div id="invite">
			<h1>ПриглаСИТЕ ДРУЗЕЙ!</h1>
			<p className="description">Вы и ваш друг получите бонусы!</p>
			<div className="buttons-row">
				<div className="big-button">
					<div className="icon"><BonusIcon /></div>
					<span>Бонусы</span>
				</div>
				<div className="big-button">
					<div className="icon"><MetricsIcon /></div>
					<span>Метрики</span>
				</div>
				<div className="big-button">
					<div className="icon"><FAQIcon /></div>
					<span>FAQ</span>
				</div>
			</div>
			<div className="invite">
				<PresentIcon />
				<div className="col">
					<h2>Пригласите друга!</h2>
					<div className="text"><TokenIcon /><span>+1000</span><p>получите вы и ваш друг!</p></div>
					<div className="invite-row">
						<div className="invite-button" onClick={inviteClickHandler}>ПРИГЛАСИТЬ ДРУГА</div>
						<div className="copy-button" onClick={copyHandler}><CopyIcon size={19} /></div>
					</div>
				</div>
			</div>
			<div className="tab-menu">
				<div className={'link' + (page === 'invited' ? ' active' : '')} onClick={() => setPage('invited')}><span>Лично приглашённые</span></div>
				<div className={'link' + (page === 'command' ? ' active' : '')} onClick={() => setPage('command')}><span>Команда</span></div>
				<div className="icon"><RefreshIcon /></div>
			</div>
			{page === 'invited' && <div className="tab">
				{loading ? 'Загрузка...' : partners.length === 0 ? 'Нет пользователей' : <div className="list">
					{[...partners].reverse().map((partner, i) => {
						const date = new Date(partner.registered_date.replace(' ', 'T') + 'Z')
						const dateFormat = new Intl.DateTimeFormat(profileData.language.tag, { year: "numeric", month: "numeric", day: "numeric" })
						return (
							<div key={i} className="item">
								<div className="number">{i + 1}</div>
								<div className="col">
									<p>{partner.username}</p>
									<p><span>lvl:</span> K{partner.level || 1}</p>
									<p><span>Дата:</span> {dateFormat.format(date)}</p>
								</div>
							</div>
						)
					})}
				</div>}
			</div>}
			{page === 'command' && <div className="tab">Команда</div>}
		</div>
	)
}