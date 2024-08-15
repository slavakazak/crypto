
import logo from '../img/logo.png'
import avatar from '../img/robot.png'
import { CoinCryptoIcon, CoinDollarIcon, FlagRusIcon, MessagesIcon, QuestionIcon, RightArrowIcon, RotateArrowsIcon, ShareIcon, WalletIcon } from '../components/Icons'
import Slider from "react-slick"
import { Link } from 'react-router-dom'

export default function Home({ tg }) {
	const settingsCharacterSlider = {
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
		<div id="home">
			<div className="top-menu">
				<Link to={'/profile'} className="profile">
					<img src={logo} alt="K2" />
					<span>trofi2222</span>
					<RightArrowIcon />
				</Link>
				<div className="button">
					<WalletIcon />
				</div>
				<div className="button">
					<QuestionIcon size={18} />
				</div>
				<div className="button">
					<FlagRusIcon />
				</div>
			</div>
			<div className='card'>
				<div className='card-header'>
					<div className='card-header-content'>
						<div className='balance'>
							<div className='title'>
								<span>Баланс</span>
								<RotateArrowsIcon />
							</div>
							<div className='value'>
								<span>542</span>
								<CoinCryptoIcon />
							</div>
						</div>
						<div className='level'>
							<div className='title'>Уровень</div>
							<div className='value'>K-2</div>
						</div>
						<div className='career'>
							<span>Карьера</span>
							<RightArrowIcon />
						</div>
					</div>
				</div>
				<div className='card-content'>
					<div className='messages'>
						<div className='count'>1</div>
						<MessagesIcon />
					</div>
					<div className='character'>
						<Slider {...settingsCharacterSlider}>
							<img src={avatar} alt="trofi2222" />
							<img src={avatar} alt="trofi2222" />
						</Slider>
					</div>
					<div className='share'>
						<ShareIcon />
					</div>
				</div>
				<div className='card-footer'>
					<div className='income all-time'>
						<div className='title'>Доход за всё время</div>
						<div className='value'>
							<span>1245</span>
							<CoinDollarIcon />
						</div>
					</div>
					<div className='income month'>
						<div className='title'>Доход за месяц</div>
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
							<h2>Мы запустилиcь на Telegram mini app!</h2>
							<p>Спасибо за вашу поддержку, это очень ценно. С каждым днём мы растём и улучшаемся для вашего комфорта на платформе K-2!</p>
						</div>
						<div className='slide'>
							<h2>Мы запустилиcь!</h2>
							<p>Спасибо за вашу поддержку, это очень ценно.</p>
						</div>
					</Slider>
					<div className='read'>Читать..</div>
				</div>
			</div>
		</div>
	)
}