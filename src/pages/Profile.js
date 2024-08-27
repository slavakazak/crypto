import Back from "../components/Back"
import { TelegramIcon, EditIcon, EyeActiveIcon, EyeInactiveIcon, HistoryIcon, RightArrowIcon, BookIcon, QuestionIcon, SupportIcon, CrossIcon } from "../components/Icons"
import { Link } from 'react-router-dom'
import PopUp from '../components/PopUp'
import { useState, useEffect } from 'react'
import { avatars } from '../utils/constants'
import AddAvatar from '../components/AddAvatar'

export default function Profile({ profileData, setData, tg, wpId }) {
	const [popUpAvatar, setPopUpAvatar] = useState(false)
	const [avatar, setAvatar] = useState(profileData.avatar)

	useEffect(() => {
		setAvatar(profileData.avatar)
	}, [wpId])

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
					<div className={'item' + (profileData.gender ? ' active' : '')}>{profileData.gender.value || 'Пол'}</div>
					<div className={'item' + (profileData.age ? ' active' : '')}>{profileData.age || 'Возраст'}</div>
					<div className='item item-center active'>
						{profileData.country.icon}
						{/* <span>{profileData.country.value}</span> */}
					</div>
				</Link>
				<div className='info'>
					<div className='item'>
						<HistoryIcon />
						<span>История транзакций</span>
						<RightArrowIcon />
					</div>
					<div className='item'>
						<BookIcon />
						<span>История транзакций</span>
						<RightArrowIcon />
					</div>
					<div className='item'>
						<QuestionIcon size={23} />
						<span>История транзакций</span>
						<RightArrowIcon />
					</div>
					<div className='item'>
						<SupportIcon />
						<span>История транзакций</span>
						<RightArrowIcon />
					</div>
				</div>
				<div className='exit-row'>
					<div className='remove'>Удалить аккаунт</div>
					<div className='exit'>Выйти</div>
				</div>
			</div>

			<PopUp
				active={popUpAvatar}
				setActive={setPopUpAvatar}
				title='Смена аватара'
				description='Выберите аватар, отражающий ваш внутренний мир'
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
						<AddAvatar tg={tg} setData={setData} />
					}
				</div>
			</PopUp>
		</>
	)
}