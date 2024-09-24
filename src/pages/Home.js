
import { CoinIcon, DollarIcon, TokenIcon, MessagesIcon, RightArrowIcon, RotateArrowsIcon, ShareIcon } from '../components/Icons'
import Slider from "react-slick"
import { avatars } from '../utils/constants'
import { useTranslation } from 'react-i18next'
import TopMenu from '../components/TopMenu'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { DataContext } from '../context/DataProvider'
import { LevelsContext } from '../context/LevelsProvider'
import slideRobot from '../img/slide-bot.png'
import Circle from '../components/Circle'
import { Link } from 'react-router-dom'
import getIncome from '../utils/getIncome'
import getUnreadMessageCount from '../utils/getUnreadMessageCount'
import PopUpMail from '../components/PopUpMail'
import getMessages from '../utils/getMessages'
import markMessageAsRead from '../utils/markMessageAsRead'

export default function Home() {
	const { t } = useTranslation()
	const { auth } = useContext(AuthContext)
	const { profileData, wpId } = useContext(DataContext)
	const { levels, levelsLoad } = useContext(LevelsContext)

	const [balance, setBalance] = useState('coin')
	const [income, setIncome] = useState({ total: 0, monthly: 0 })

	const [messagesCount, setMessagesCount] = useState(0)
	const [messages, setMessages] = useState([])
	const [currentMessage, setCurrentMessage] = useState(0)

	const [popUp, setPopUp] = useState(false)
	const [popUpTitle, setPopUpTitle] = useState('')
	const [popUpContent, setPopUpContent] = useState('')

	function openPopUp(title, content) {
		setPopUp(true)
		setPopUpTitle(title)
		setPopUpContent(content)
	}

	async function openMessage() {
		const message = messages[currentMessage]
		let content = profileData.language.tag === 'en' && message.content_en ? message.content_en : message.content
		content = content.replace('http://', 'https://').replace('" width="560" height="315"', `&fs=0&hl=${profileData.language.tag}&rel=0" width="100%" height="200"`)
		openPopUp(
			profileData.language.tag === 'en' && message.title_en ? message.title_en : message.title,
			<div dangerouslySetInnerHTML={{ __html: content }} />
		)
		await markMessageAsRead(auth, wpId, message.id)
		const newMessagesCount = await getUnreadMessageCount(auth, wpId)
		setMessagesCount(newMessagesCount)
	}

	useEffect(() => {
		if (!auth || !wpId) return
		async function init() {
			const newIncome = await getIncome(auth, wpId)
			setIncome(newIncome)
			const newMessagesCount = await getUnreadMessageCount(auth, wpId)
			setMessagesCount(newMessagesCount)
			const newMessages = await getMessages(auth, wpId)
			setMessages(newMessages)
		}
		init()
	}, [auth, wpId])

	const [total, setTotal] = useState(1)
	const [current, setCurrent] = useState(1)

	useEffect(() => {
		if (!levelsLoad) return
		const tasks = levels[profileData.level - 1]?.tasks || []
		setTotal(tasks.length)
		setCurrent(tasks.filter(task => task.completed).length)
	}, [levels, levelsLoad, profileData.level])

	function changeBalance() {
		setBalance(previous => {
			if (previous === 'coin') return 'usdt'
			if (previous === 'usdt') return 'token'
			if (previous === 'token') return 'coin'
		})
	}

	const settingsAvatarsSlider = {
		dots: false,
		infinite: true,
		speed: 200,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false
	}

	const settingsBannerSlider = {
		dots: true,
		infinite: true,
		speed: 200,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		appendDots: dots => <ul>{dots}</ul>,
		autoplay: true,
		autoplaySpeed: 5000
	}

	return (
		<>

			<div id="home">
				<TopMenu />
				<div className='card'>
					<div className='card-header'>
						<div className='balance' onClick={changeBalance}>
							<div className='title'>
								<span>{t('home.balance')}</span>
								<RotateArrowsIcon />
							</div>
							<div className='value'>
								{balance === 'coin' ? <>
									<span className='gold'>{profileData.coin}</span>
									<div className='icon'><CoinIcon /></div>
								</> : balance === 'usdt' ? <>
									<span className='green'>{profileData.usdt}</span>
									<div className='icon'><DollarIcon /></div>
								</> : balance === 'token' ? <>
									<span>{profileData.token}</span>
									<div className='icon token'><TokenIcon /></div>
								</> : ''}
							</div>
						</div>
						<Link to={'/career'} className='level'>
							<div className='title'>{t('home.level')}</div>
							<div className='value'>K-{profileData.level}</div>
							<Circle total={total} filled={current} fill={'#8B6EFF'} size={78} />
							<div className='progress-info'>
								<p>{current}/<span>{total}</span></p>
								<RightArrowIcon />
							</div>
						</Link>
						<Link to={'/career'} className='career'>
							<span>{t('home.career')}</span>
							<RightArrowIcon />
						</Link>
					</div>
					<div className='card-content'>
						<Link to={'/mail'} className='messages'>
							{messagesCount > 0 && <div className='count'>{messagesCount}</div>}
							<MessagesIcon />
						</Link>
						<div className='avatar'>
							<Slider {...settingsAvatarsSlider}>
								<img src={profileData.avatar === 'my' ? profileData.myAvatar : avatars[profileData.avatar]} alt={profileData.avatar === 'my' ? profileData.username : profileData.avatar} />
								{profileData.avatars.filter(item => item !== profileData.avatar).map((item, i) => (
									<img key={i} src={avatars[item]} alt={item} />
								))}
								{profileData.avatar !== 'my' && profileData.myAvatar && <img src={profileData.myAvatar} alt={profileData.username} />}
							</Slider>
						</div>
						<div className='share'>
							<ShareIcon />
						</div>
					</div>
					<div className='card-footer'>
						<div className='income all-time'>
							<div className='title'>{t('home.incomeAllTime')}</div>
							<div className='value'>
								<span>{income.total}</span>
								<DollarIcon />
							</div>
						</div>
						<div className='income month'>
							<div className='title'>{t('home.incomeMonth')}</div>
							<div className='value'>
								<span>{income.monthly}</span>
								<DollarIcon />
							</div>
						</div>
					</div>
				</div>
				<div className='slider-container'>
					<div className='slider'>
						<Slider {...settingsBannerSlider} beforeChange={(_, i) => setCurrentMessage(i)}>
							{messages.map((message, i) => (
								<div key={i} className='slide'>
									<h2>{profileData.language.tag === 'en' && message.title_en ? message.title_en : message.title}</h2>
									<p>{profileData.language.tag === 'en' && message.message_excerpt_en ? message.message_excerpt_en : message.message_excerpt}</p>
								</div>
							))}
						</Slider>
						<img src={slideRobot} alt='robot' />
						<div className='read' onClick={openMessage}>{t('home.read')}</div>
					</div>
				</div>
			</div>

			<PopUpMail active={popUp} onClose={() => setPopUp(false)} title={popUpTitle}>{popUpContent}</PopUpMail>

		</>
	)
}