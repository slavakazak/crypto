
import { CoinIcon, DollarIcon, TokenIcon, MessagesIcon, RightArrowIcon, RotateArrowsIcon, ShareIcon } from '../components/Icons'
import Slider from "react-slick"
import { avatars } from '../utils/constants'
import { useTranslation } from 'react-i18next'
import TopMenu from '../components/TopMenu'
import { useState } from 'react'

export default function Home({ profileData, setData, wpId }) {
	const { t } = useTranslation()

	const [balance, setBalance] = useState('coin')

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
		<div id="home">
			<TopMenu profileData={profileData} setData={setData} wpId={wpId} />
			<div className='card'>
				<div className='card-header'>
					<div className='balance' onClick={changeBalance}>
						<div className='title'>
							<span>{t('home.balance')}</span>
							<RotateArrowsIcon />
						</div>
						<div className='value'>
							{balance === 'coin' ? <>
								<span className='coin'>{profileData.coin}</span>
								<div className='icon'><CoinIcon /></div>
							</> : balance === 'usdt' ? <>
								<span>{profileData.usdt}</span>
								<div className='icon'><DollarIcon /></div>
							</> : balance === 'token' ? <>
								<span>{profileData.token}</span>
								<div className='icon token'><TokenIcon /></div>
							</> : ''}
						</div>
					</div>
					<div className='level'>
						<div className='title'>{t('home.level')}</div>
						<div className='value'>K-{profileData.level}</div>
					</div>
					<div className='career'>
						<span>{t('home.career')}</span>
						<RightArrowIcon />
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
							<DollarIcon />
						</div>
					</div>
					<div className='income month'>
						<div className='title'>{t('home.incomeMonth')}</div>
						<div className='value'>
							<span>355</span>
							<DollarIcon />
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
	)
}