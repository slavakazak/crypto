import Back from "../components/Back"
import { TelegramIcon, EditIcon, EyeActiveIcon, EyeInactiveIcon, HistoryIcon, RightArrowIcon, BookIcon, QuestionIcon, SupportIcon, CrossIcon } from "../components/Icons"
import { Link } from 'react-router-dom'
import PopUp from '../components/PopUp'
import { useState, useEffect } from 'react'
import { avatars } from '../utils/constants'
import AddAvatar from '../components/AddAvatar'
import { useTranslation } from 'react-i18next'
import { useContext } from "react"
import { ProfileContext, SetDataContext } from "../utils/contexts"

export default function Profile() {
	const { t } = useTranslation()
	const profileData = useContext(ProfileContext)
	const setData = useContext(SetDataContext)
	const [popUpAvatar, setPopUpAvatar] = useState(false)
	const [avatar, setAvatar] = useState(profileData.avatar)

	useEffect(() => {
		setAvatar(profileData.avatar)
	}, [profileData])

	function nameClickHandler() {
		if (profileData.fullName && profileData.username === profileData.nickname) {
			setData({ username: profileData.fullName })
		} else {
			setData({ username: profileData.nickname })
		}
	}

	function changeAvatarCancelClickHandler() {
		setAvatar(profileData.avatar)
		setPopUpAvatar(false)
	}

	function changeAvatarSaveClickHandler() {
		if (avatar === profileData.avatar) return
		setData({ avatar })
		setPopUpAvatar(false)
	}

	function avatarCrossClickHandler(event) {
		event.stopPropagation()
		setData({ myAvatar: '', avatar: profileData.avatars[0] })
		setAvatar(profileData.avatars[0])
	}

	return (
		<>
			<div id="profile">
				<div className="top-menu">
					<Back />
					<div className="button">
						<TelegramIcon />
					</div>
					<Link to={'/settings'} className="button">
						<EditIcon />
					</Link>
				</div>
				<div className="profile-card">
					<div className="avatar" onClick={() => setPopUpAvatar(true)}>
						<img src={profileData.avatar === 'my' ? profileData.myAvatar : avatars[profileData.avatar]} alt={profileData.username} />
					</div>
					<div className='name-container' onClick={nameClickHandler}>
						<div className='row nickname'>
							<span>{profileData.username}</span>
							{profileData.fullName && <EyeActiveIcon />}
						</div>
						{profileData.fullName &&
							<div className='row full-name'>
								<span>{profileData.username === profileData.nickname ? profileData.fullName : profileData.nickname}</span>
								<EyeInactiveIcon />
							</div>
						}
					</div>
				</div>
				<Link to='/settings' className='profile-data'>
					<div className={'item' + (profileData.gender ? ' active' : '')}>{t([`constants.genders.${profileData.gender?.tag}`, 'constants.genders.default'])}</div>
					<div className={'item' + (profileData.age ? ' active' : '')}>{profileData.age || t('profile.age')}</div>
					<div className='item item-center active'>
						{profileData.country.icon}
						{/* <span>{profileData.country.value}</span> */}
					</div>
				</Link>
				<div className='info'>
					<Link to='/balance' className='item'>
						<HistoryIcon />
						<span>{t('profile.history')}</span>
						<RightArrowIcon />
					</Link>
					<Link to={'/start'} className='item'>
						<BookIcon />
						<span>{t('profile.start')}</span>
						<RightArrowIcon />
					</Link>
					<Link to={'/faq'} className='item'>
						<QuestionIcon size={23} />
						<span>{t('profile.faq')}</span>
						<RightArrowIcon />
					</Link>
					<div className='item'>
						<SupportIcon />
						<span>{t('profile.support')}</span>
						<RightArrowIcon />
					</div>
				</div>
				<div className='exit-row'>
					<div className='remove'>{t('profile.delete')}</div>
					<div className='exit'>{t('profile.logOut')}</div>
				</div>
			</div>

			<PopUp
				active={popUpAvatar}
				onClose={() => setPopUpAvatar(false)}
				title={t('profile.popUpAvatar.title')}
				description={t('profile.popUpAvatar.description')}
				onCancel={changeAvatarCancelClickHandler}
				onSave={changeAvatarSaveClickHandler}
				saveActive={profileData.avatar !== avatar}
				full={profileData.avatars.length > 3}
			>
				<div className="avatar-select">
					{profileData.avatars.map((item, i) => (
						<div key={i} className={'avatar-card' + (item === avatar ? ' active' : '')} onClick={() => setAvatar(item)}>
							<img src={avatars[item]} alt={item} />
						</div>
					))}
					{profileData.myAvatar ?
						<div className={'avatar-card' + ('my' === avatar ? ' active' : '')} onClick={() => setAvatar('my')}>
							<div className="cross" onClick={avatarCrossClickHandler}><CrossIcon /></div>
							<img src={profileData.myAvatar} alt={profileData.username} />
						</div>
						:
						<AddAvatar />
					}
				</div>
			</PopUp>
		</>
	)
}