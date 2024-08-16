import { NavLink } from 'react-router-dom'
import { HomeIcon, InviteIcon, WorkshopIcon, TaskIcon, RatingIcon } from '../components/Icons'

export default function Menu() {
	const linkClass = ({ isActive }) => 'menu-item' + (isActive ? ' active' : '')

	return (
		<div id="menu">
			<NavLink to="/workshop" className={linkClass}>
				<div className='icon-container icon-workshop'>
					<WorkshopIcon />
				</div>
				<div className="label">Мастерская</div>
			</NavLink>
			<NavLink to="/task" className={linkClass}>
				<div className='icon-container'>
					<TaskIcon />
				</div>
				<div className="label">Задания</div>
			</NavLink>
			<NavLink to="/" className={linkClass}>
				<div className='icon-container'>
					<HomeIcon />
				</div>
				<div className="label">Дом</div>
			</NavLink>
			<NavLink to="/invite" className={linkClass}>
				<div className='icon-container'>
					<InviteIcon />
				</div>
				<div className="label">Пригласить</div>
			</NavLink>
			<NavLink to="/rating" className={linkClass}>
				<div className='icon-container'>
					<RatingIcon />
				</div>
				<div className="label">Рейтинг</div>
			</NavLink>
		</div>
	)
}