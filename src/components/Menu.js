import { Link } from 'react-router-dom'

export default function Menu() {
	return (
		<div className="menu">
			<Link className="menu-item" to="/workshop">
				<div className="icon"></div>
				<div className="label">Мастерская</div>
			</Link>
			<Link className="menu-item" to="/task">
				<div className="icon"></div>
				<div className="label">Задания</div>
			</Link>
			<Link className="menu-item" to="/">
				<div className="icon"></div>
				<div className="label">Дом</div>
			</Link>
			<Link className="menu-item" to="/invite">
				<div className="icon"></div>
				<div className="label">Пригласить</div>
			</Link>
			<Link className="menu-item" to="/rating">
				<div className="icon"></div>
				<div className="label">Рейтинг</div>
			</Link>
		</div>
	)
}