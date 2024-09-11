import logo from '../img/logo.png'
import { Link } from "react-router-dom"
import { RightArrowIcon, WalletIcon, QuestionIcon, DollarIcon, CoinIcon, TokenIcon } from '../components/Icons'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PopUp from './PopUp'
import Option from './Option'
import { languages } from '../utils/constants'
import { useContext } from 'react'
import { ProfileContext, SetDataContext } from '../utils/contexts'

export default function TopMenu() {
	const { t, i18n } = useTranslation()
	const profileData = useContext(ProfileContext)
	const setData = useContext(SetDataContext)

	const [popUpLanguage, setPopUpLanguage] = useState(false)
	const [language, setLanguage] = useState(profileData.language)

	useEffect(() => {
		setLanguage(profileData.language)
	}, [profileData])

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

	return (
		<>

			<div className="top-menu main-top-menu">
				<Link to='/profile' className="profile">
					<div className='left-side'>
						<img src={logo} alt="K2" />
						<span className='username'>{profileData.username}</span>
					</div>
					<div className='right-side'>
						<div className='balance green'>
							<div className='icon'><DollarIcon size={9} /></div>
							<span>{profileData.usdt}</span>
						</div>
						<div className='balance cold'>
							<div className='icon'><CoinIcon size={8} /></div>
							<span>{profileData.coin}</span>
						</div>
						<div className='balance'>
							<div className='icon'><TokenIcon size={10} /></div>
							<span>{profileData.token}</span>
						</div>
					</div>
				</Link>
				<Link to='/balance' className="button">
					<WalletIcon />
				</Link>
				<Link to={'/faq'} className="button">
					<QuestionIcon size={18} />
				</Link>
				<div className="button" onClick={() => setPopUpLanguage(true)}>
					{profileData.language.icon}
				</div>
			</div>

			<PopUp
				active={popUpLanguage}
				onClose={() => setPopUpLanguage(false)}
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