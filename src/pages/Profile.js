import Back from "../components/Back"
import { TelegramIcon, EditIcon, EyeActiveIcon, EyeInactiveIcon, HistoryIcon, RightArrowIcon, BookIcon, QuestionIcon, SupportIcon, CrossIcon } from "../components/Icons"
import { Link } from 'react-router-dom'
import PopUp from '../components/PopUp'
import { useState, useEffect } from 'react'
import { avatars } from '../utils/constants'
import AddAvatar from '../components/AddAvatar'
import { useTranslation } from 'react-i18next'
import { useContext } from "react"
import { DataContext } from "../context/DataProvider"
import { AuthContext } from "../context/AuthProvider"
import getNicknameFromRef from "../utils/getNicknameFromRef"
import { CircleFlag } from 'react-circle-flags'
import Modal from "../components/Modal"
import deleteUser from "../utils/deleteUser"

export default function Profile() {
	const { t } = useTranslation()
	const { auth } = useContext(AuthContext)
	const { profileData, setData, wpId, tg } = useContext(DataContext)
	const [popUpAvatar, setPopUpAvatar] = useState(false)
	const [avatar, setAvatar] = useState(profileData.avatar)

	const [refNickname, setRefNickname] = useState(null)

	useEffect(() => {
		if (!auth || !profileData.link) return
		async function init() {
			let newRefNickname = await getNicknameFromRef(auth, profileData.link)
			const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
			if (!regex.test(newRefNickname) || newRefNickname === "admin") {
				newRefNickname = null
			}
			setRefNickname(newRefNickname)
		}
		init()
	}, [auth, profileData.link])

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

	const [modal, setModal] = useState(false)
	const [modalText, setModalText] = useState('')

	function openModal(text) {
		setModalText(text)
		setModal(true)
	}

	const [popUpDelete, setPopUpDelete] = useState(false)
	const [pin, setPin] = useState('')

	async function deleteSaveClickHandler() {
		if (pin !== profileData.pin) {
			openModal(t('settings.messages.invalidPIN'))
			return
		}
		if (wpId === 1) return
		await deleteUser(auth, wpId)
		tg.close()
	}

	return (
		<>
			<div id="profile">
				<div className="top-menu">
					<Back />
					<Link to={'https://t.me/K2_invest'} className="button">
						<TelegramIcon />
						<span>{t('profile.channel')}</span>
					</Link>
					{refNickname && <Link to={'https://t.me/' + refNickname} className="button">
						<TelegramIcon />
						<span>{t('profile.senior')}</span>
					</Link>}
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
					<div className={'item' + (profileData.country ? ' item-center active' : '')}>{profileData.country ? <CircleFlag countryCode={profileData.country.code} height="24" /> : t('constants.country')}</div>
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
					<Link to={'https://t.me/k2_support_bot'} className='item'>
						<SupportIcon />
						<span>{t('profile.support')}</span>
						<RightArrowIcon />
					</Link>
				</div>
				<div className='exit-row'>
					<div className='remove' onClick={() => setPopUpDelete(true)}>{t('profile.delete')}</div>
					{/* <div className='exit'>{t('profile.logOut')}</div> */}
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

			<PopUp
				active={popUpDelete}
				onClose={() => setPopUpDelete(false)}
				title={t('profile.popUpDelete.title')}
				description={t('profile.popUpDelete.description')}
				onCancel={() => setPopUpDelete(false)}
				onSave={deleteSaveClickHandler}
				saveText={t('profile.popUpDelete.confirm')}
				saveActive={pin}
			>
				<div className="select">
					<input placeholder={'PIN'} type="password" value={pin} onChange={e => setPin(e.target.value)} />
				</div>
			</PopUp>

			<Modal active={modal} onClose={() => setModal(false)} title={t('modal.error')} text={modalText} type='error' />
		</>
	)
}