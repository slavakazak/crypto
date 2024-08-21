
import robot from '../img/robot.png'
import Back from "../components/Back"
import { TelegramIcon, EditIcon, EyeActiveIcon, EyeInactiveIcon, HistoryIcon, RightArrowIcon, BookIcon, QuestionIcon, SupportIcon } from "../components/Icons"
import { Link } from 'react-router-dom'

export default function Profile({ profileData, setData }) {

	function nameClickHandler() {
		if (profileData.fullName && profileData.username === profileData.nickname) {
			setData({ username: profileData.fullName })
		} else {
			setData({ username: profileData.nickname })
		}
	}

	return (
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
				<div className="avatar">
					<img src={robot} alt={profileData.username} />
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
	)
}