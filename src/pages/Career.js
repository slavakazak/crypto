import { useTranslation } from 'react-i18next'
import Back from "../components/Back"
import { InfoIcon, LockIcon, OkIcon, TrophyIcon } from '../components/Icons'
import Circle from '../components/Circle'
import PopUpCareer from '../components/PopUpCareer'
import { useState } from 'react'

export default function Career() {
	const { t } = useTranslation()

	const [popUp, setPopUp] = useState(false)
	const [content, setContent] = useState()

	const progressCurrent = 1
	const progressTotal = 2
	const progress = Math.round(progressCurrent / progressTotal * 100)

	function openPopUp(level) {
		let content = ''
		if (level === 1) {
			content = (
				<>
					<div className='progress'>
						<p className='title'>{t('bonuses.progress')}</p>
						<div className='row'>
							<div className='text'>
								<span>Переход на уровень K3 </span>
								<div className='info'><InfoIcon /></div>
							</div>
							<span className='sum'>{progressCurrent}<span>/{progressTotal}</span></span>
						</div>
						<div className='progress-bar'><div className='line' style={{ width: progress > 100 ? '100%' : progress + '%' }} /></div>
						<div className='number-row'>
							<span className='start' style={{ display: progress < 8 ? 'none' : 'block' }}>0%</span>
							<span className='current' style={{ left: progress < 2 ? '2%' : progress > 97 ? '96%' : progress + '%' }}>{progress}%</span>
							<span className='end' style={{ display: progress > 87 ? 'none' : 'block' }}>100%</span>
						</div>
					</div>
					<h4 className='task-title'>{t('bonuses.tasks')}</h4>
					<div className='task text-only'>
						<div className='number'>1</div>
						<div className='content'>
							<p className='text'>Сдать <span>тест</span> на амбассадора</p>
						</div>
						<div className='check'><OkIcon size={11} /></div>
					</div>
					<div className='task text-only inactive'>
						<div className='overlay' />
						<div className='number'>2</div>
						<div className='content'>
							<p className='text'>Подключить 1 инвестора с уровнем K2</p>
						</div>
						<div className='check active'><OkIcon size={11} /></div>
					</div>
					<h4 className='task-title'>Достижения</h4>
					<div className='achievement'>Открытие возможности заработка с 3-ёх линий в глубину</div>
					<div className='achievement'>Открытие Start Bonus, Travel Bonus</div>
				</>
			)
		}
		return () => {
			setPopUp(true)
			setContent(content)
		}
	}

	return (
		<>

			<div id="career">
				<svg className='broken-line'>
					<line x1="0" y1="0" x2="0" y2="1480" strokeWidth="3" stroke-dasharray="8 2" />
				</svg>
				<div className="top-menu">
					<Back />
					<h1>Карьерная лестница</h1>
				</div>
				<div className='league active current'>
					<div className='left-side'>
						<TrophyIcon />
						<span className='name'>Бумажная лига</span>
						<span className='levels'>(K1 Ур)</span>
						<div className='info'><InfoIcon /></div>
					</div>
					<OkIcon />
				</div>
				<div className='current-row'>
					<div className='level'>
						<span>K1</span>
						<Circle total={4} filled={1} />
					</div>
					<div className='level-card'>
						<div className='notice'>Текущий уровень</div>
						<p>Заработано: <span>250$</span></p>
						<p>Рефералов: <span>25</span></p>
						<p>Достиг: <span>25.08.2024</span></p>
						<div className='see-button' onClick={openPopUp(1)}>
							ПОСМОТРЕТЬ ЗАДАНИЯ
							<div className='progress-info'>1/4</div>
						</div>
					</div>
				</div>
				<div className='league'>
					<div className='left-side'>
						<TrophyIcon />
						<span className='name'>Деревянная лига</span>
						<span className='levels'> (K2,K3 Ур)</span>
						<div className='info'><InfoIcon /></div>
					</div>
					<LockIcon />
				</div>
				<div className='row'>
					<div className='level lock'>
						<span>K2</span>
						<div className='lock-circle' />
						<div className='lock-icon'><LockIcon size={10} /></div>
					</div>
					<div className='condition'>Инвесторы с роботом K2</div>
				</div>
				<div className='row'>
					<div className='level lock'>
						<span>K3</span>
						<div className='lock-circle' />
						<div className='lock-icon'><LockIcon size={10} /></div>
					</div>
					<div className='condition inactive'>Инвесторы с роботом K2</div>
				</div>
				<div className='league'>
					<div className='left-side'>
						<TrophyIcon />
						<span className='name'>Каменная лига</span>
						<span className='levels'> (K4,K5 Ур)</span>
						<div className='info'><InfoIcon /></div>
					</div>
					<LockIcon />
				</div>
				<div className='row'>
					<div className='level lock'>
						<span>K4</span>
						<div className='lock-circle' />
						<div className='lock-icon'><LockIcon size={10} /></div>
					</div>
					<div className='condition inactive'>Инвесторы с роботом K2</div>
				</div>
				<div className='row'>
					<div className='level lock'>
						<span>K5</span>
						<div className='lock-circle' />
						<div className='lock-icon'><LockIcon size={10} /></div>
					</div>
					<div className='condition inactive'>Инвесторы с роботом K2</div>
				</div>
				<div className='league'>
					<div className='left-side'>
						<TrophyIcon />
						<span className='name'>Серебряная лига</span>
						<span className='levels'> (K6,K7 Ур)</span>
						<div className='info'><InfoIcon /></div>
					</div>
					<LockIcon />
				</div>
				<div className='row'>
					<div className='level lock'>
						<span>K6</span>
						<div className='lock-circle' />
						<div className='lock-icon'><LockIcon size={10} /></div>
					</div>
					<div className='condition inactive'>Инвесторы с роботом K2</div>
				</div>
				<div className='row'>
					<div className='level lock'>
						<span>K7</span>
						<div className='lock-circle' />
						<div className='lock-icon'><LockIcon size={10} /></div>
					</div>
					<div className='condition inactive'>Инвесторы с роботом K2</div>
				</div>
				<div className='league'>
					<div className='left-side'>
						<TrophyIcon />
						<span className='name'>Золотая лига</span>
						<span className='levels'> (K8,K9 Ур)</span>
						<div className='info'><InfoIcon /></div>
					</div>
					<LockIcon />
				</div>
				<div className='row'>
					<div className='level lock'>
						<span>K8</span>
						<div className='lock-circle' />
						<div className='lock-icon'><LockIcon size={10} /></div>
					</div>
					<div className='condition inactive'>Инвесторы с роботом K2</div>
				</div>
				<div className='row'>
					<div className='level lock'>
						<span>K9</span>
						<div className='lock-circle' />
						<div className='lock-icon'><LockIcon size={10} /></div>
					</div>
					<div className='condition inactive'>Инвесторы с роботом K2</div>
				</div>
				<div className='league'>
					<div className='left-side'>
						<TrophyIcon />
						<span className='name'>Платиновая лига</span>
						<span className='levels'> (K10 Ур)</span>
						<div className='info'><InfoIcon /></div>
					</div>
					<LockIcon />
				</div>
			</div>

			<PopUpCareer active={popUp} onClose={() => setPopUp(false)}>{content}</PopUpCareer>
		</>

	)
}