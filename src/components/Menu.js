import { NavLink } from 'react-router-dom'
import { HomeIcon, InviteIcon, WorkshopIcon, TaskIcon, RatingIcon } from '../components/Icons'

export default function Menu() {
	return (
		<div id="menu">
			<NavLink className="menu-item menu-workshop" to="/workshop" activeClassName="active">
				<div className='icon-container'>
					<WorkshopIcon />
				</div>
				<div className="label">Мастерская</div>
			</NavLink>
			<NavLink className="menu-item menu-task" to="/task" activeClassName="active">
				<div className='icon-container'>
					<TaskIcon />
				</div>
				<div className="label">Задания</div>
			</NavLink>
			<NavLink className="menu-item menu-home" to="/" activeClassName="active">
				<div className='icon-container'>
					<HomeIcon />
				</div>
				<div className="label">Дом</div>
			</NavLink>
			<NavLink className="menu-item menu-invite" to="/invite" activeClassName="active">
				<div className='icon-container'>
					<InviteIcon />
				</div>
				<div className="label">Пригласить</div>
			</NavLink>
			<NavLink className="menu-item menu-rating" to="/rating" activeClassName="active">
				<div className='icon-container'>
					<RatingIcon />
				</div>
				<div className="label">Рейтинг</div>
			</NavLink>
		</div>
	)
}