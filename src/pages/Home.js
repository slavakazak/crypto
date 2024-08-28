
import logo from '../img/logo.png'
import { CoinCryptoIcon, CoinDollarIcon, MessagesIcon, QuestionIcon, RightArrowIcon, RotateArrowsIcon, ShareIcon, WalletIcon } from '../components/Icons'
import Slider from "react-slick"
import { Link } from 'react-router-dom'
import { avatars, languages } from '../utils/constants'
import PopUp from '../components/PopUp'
import { useState, useEffect } from 'react'
import Option from '../components/Option'
import { useTranslation } from 'react-i18next'

export default function Home({ profileData, setData, wpId }) {
	const { t, i18n } = useTranslation()
	const [popUpLanguage, setPopUpLanguage] = useState(false)
	const [language, setLanguage] = useState(profileData.language)

	useEffect(() => {
		setLanguage(profileData.language)
	}, [wpId])

	function languageCancelClickHandler() {
		setLanguage(profileData.language)
		setPopUpLanguage(false)
	}

	function languageSaveClickHandler() {
		if (language.tag === profileData.language.tag) return
		setData({ language })
		i18n.changeLanguage(language.tag)
		setPopUpLanguage(false)
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
		appendDots: dots => <ul>{dots}</ul>
	}

	return (
		<>
			<div id="home">
				<div className="top-menu">
					<Link to='/profile' className="profile">
						<img src={logo} alt="K2" />
						<span>{profileData.username}</span>
						<RightArrowIcon />
					</Link>
					<Link to='/balance' className="button">
						<WalletIcon />
					</Link>
					<div className="button">
						<QuestionIcon size={18} />
					</div>
					<div className="button" onClick={() => setPopUpLanguage(true)}>
						{profileData.language.icon}
					</div>
				</div>
				<div className='card'>
					<div className='card-header'>
						<div className='card-header-content'>
							<div className='balance'>
								<div className='title'>
									<span>{t('home.balance')}</span>
									<RotateArrowsIcon />
								</div>
								<div className='value'>
									<span>542</span>
									<CoinCryptoIcon />
								</div>
							</div>
							<div className='level'>
								<div className='title'>{t('home.level')}</div>
								<div className='value'>K-2</div>
							</div>
							<div className='career'>
								<span>{t('home.career')}</span>
								<RightArrowIcon />
							</div>
						</div>
					</div>
					<div className='card-content'>
						<div className='messages'>
							<div className='count'>1</div>
							<MessagesIcon />
						</div>
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
								<span>1245</span>
								<CoinDollarIcon />
							</div>
						</div>
						<div className='income month'>
							<div className='title'>{t('home.incomeMonth')}</div>
							<div className='value'>
								<span>355</span>
								<CoinDollarIcon />
							</div>
						</div>
					</div>
				</div>
				<div className='slider-container'>
					<div className='slider'>
						<Slider {...settingsBannerSlider}>
							<div className='slide'>
								<h2>{t('home.slide1.title')}</h2>
								<p>{t('home.slide1.text')}</p>
							</div>
							<div className='slide'>
								<h2>{t('home.slide2.title')}</h2>
								<p>{t('home.slide2.text')}</p>
							</div>
						</Slider>
						<div className='read'>{t('home.read')}</div>
					</div>
				</div>
			</div>

			<PopUp
				active={popUpLanguage}
				setActive={setPopUpLanguage}
				title={t('home.popUpLanguage.title')}
				description={t('home.popUpLanguage.description')}
				onCancel={languageCancelClickHandler}
				onSave={languageSaveClickHandler}
				saveActive={language.tag !== profileData.language.tag}
				full={true}
			>
				<div className="select">
					{languages.map((item, i) => (
						<Option key={i} item={item} selected={language} langPath={'constants.languages'} setSelected={setLanguage} />
					))}
				</div>
			</PopUp>
		</>
	)
}