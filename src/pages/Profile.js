
import robot from '../img/robot.png'
import Back from "../components/Back"
import { TelegramIcon, EditIcon, EyeActiveIcon, EyeInactiveIcon, FlagRusIcon, HistoryIcon, RightArrowIcon, BookIcon, QuestionIcon, SupportIcon } from "../components/Icons"

export default function Profile({ tg }) {
	return (
		<div id="profile">
			<div className="top-menu">
				<Back />
				<div className="button">
					<TelegramIcon />
				</div>
				<div className="button">
					<EditIcon />
				</div>
			</div>
			<div className="profile-card">
				<div className="avatar">
					<img src={robot} alt='trofi2222' />
				</div>
				<div className='name-container'>
					<div className='row nickname'>
						<span>trofi2222</span>
						<EyeActiveIcon />
					</div>
					<div className='row full-name'>
						<span>ФИО, если есть в настройках</span>
						<EyeInactiveIcon />
					</div>
				</div>
			</div>
			<div className='profile-data'>
				<div className='item'>Пол</div>
				<div className='item'>Возраст</div>
				<div className='item active'>
					<FlagRusIcon />
					<span>Россия</span>
				</div>
			</div>
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