import { NavLink } from 'react-router-dom'
import { HomeIcon, InviteIcon, WorkshopIcon, TaskIcon, RatingIcon } from '../components/Icons'
import { useTranslation } from 'react-i18next'

export default function Menu() {
	const { t } = useTranslation()
	const linkClass = ({ isActive }) => 'menu-item' + (isActive ? ' active' : '')

	return (
		<div id="menu">
			<NavLink to="/workshop" className={linkClass}>
				<div className='icon-container icon-workshop'>
					<WorkshopIcon />
				</div>
				<div className="label">{t('menu.workshop')}</div>
			</NavLink>
			<NavLink to="/task" className={linkClass}>
				<div className='icon-container'>
					<TaskIcon />
				</div>
				<div className="label">{t('menu.task')}</div>
			</NavLink>
			<NavLink to="/" className={linkClass}>
				<div className='icon-container'>
					<HomeIcon />
				</div>
				<div className="label">{t('menu.home')}</div>
			</NavLink>
			<NavLink to="/invite" className={linkClass}>
				<div className='icon-container'>
					<InviteIcon />
				</div>
				<div className="label">{t('menu.invite')}</div>
			</NavLink>
			<NavLink to="/rating" className={linkClass}>
				<div className='icon-container'>
					<RatingIcon />
				</div>
				<div className="label">{t('menu.rating')}</div>
			</NavLink>
		</div>
	)
}