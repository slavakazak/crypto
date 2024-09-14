import { useTranslation } from 'react-i18next'
import Back from "../components/Back"
import { LockIcon } from '../components/Icons'
import Circle from '../components/Circle'
import PopUpCareer from '../components/PopUpCareer'
import { useState, useContext } from 'react'
import { DataContext } from '../context/DataProvider'
import Progress from '../components/Progress'
import Tack from '../components/Task'
import League from '../components/League'

export default function Career() {
	const { t } = useTranslation()
	const { profileData } = useContext(DataContext)

	const leagues = [
		{
			levels: [{
				value: 1,
				time: '25.08.2024',
				reference: '',
				tasks: [{ completed: false }]
			}]
		},
		{
			levels: [
				{
					value: 2,
					time: '25.08.2024',
					reference: '',
					tasks: [
						{ completed: false },
						{ completed: false }
					],
					achievements: [0, 1]
				},
				{
					value: 3,
					time: '25.08.2024',
					reference: '',
					tasks: [
						{ completed: false, current: 0, total: 2 },
						{ reference: '', completed: true, current: 0, total: 5 }
					],
					achievements: [0]
				}
			]
		},
		{
			levels: [
				{
					value: 4,
					time: '25.08.2024',
					reference: '',
					tasks: [
						{ completed: false, current: 0, total: 5 },
						{ reference: '', completed: false, current: 0, total: 25 }
					],
					achievements: [0]
				},
				{
					value: 5,
					time: '25.08.2024',
					reference: '',
					tasks: [
						{ completed: false, current: 0, total: 10 },
						{ reference: '', completed: false, current: 0, total: 125 },
						{ reference: '', completed: false, current: 0, total: 2 }
					],
					achievements: [0, 1, 2]
				}
			]
		},
		{
			levels: [
				{
					value: 6,
					time: '25.08.2024',
					reference: '',
					tasks: [
						{ completed: false, current: 0, total: 20 },
						{ reference: '', completed: false, current: 0, total: 500 },
						{ reference: '', completed: false, current: 0, total: 2 },
						{ completed: false, current: 0, total: 1 }
					],
					achievements: [0, 1, 2]
				},
				{
					value: 7,
					time: '25.08.2024',
					reference: '',
					tasks: [
						{ completed: false, current: 0, total: 25 },
						{ reference: '', completed: false, current: 0, total: 1500 },
						{ reference: '', completed: false, current: 0, total: 2 },
						{ completed: false, current: 0, total: 1 },
						{ completed: false, current: 0, total: 1 }
					],
					achievements: [0, 1, 2]
				}
			]
		},
		{
			levels: [
				{
					value: 8,
					time: '25.08.2024',
					reference: '',
					tasks: [
						{ completed: false, current: 0, total: 30 },
						{ reference: '', completed: false, current: 0, total: 4000 },
						{ reference: '', completed: false, current: 0, total: 2 },
						{ completed: false, current: 0, total: 1 },
						{ completed: false, current: 0, total: 1 },
						{ completed: false, current: 0, total: 1 }
					],
					achievements: [0, 1, 2]
				},
				{
					value: 9,
					time: '25.08.2024',
					reference: '',
					tasks: [
						{ completed: false, current: 0, total: 40 },
						{ reference: '', completed: false, current: 0, total: 10000 },
						{ reference: '', completed: false, current: 0, total: 2 },
						{ completed: false, current: 0, total: 1 },
						{ completed: false, current: 0, total: 1 },
						{ completed: false, current: 0, total: 1 },
						{ completed: false, current: 0, total: 1 }
					],
					achievements: [0, 1, 2]
				}
			]
		},
		{ levels: [{ value: 10, time: '25.08.2024' }] }
	]

	const [popUp, setPopUp] = useState(false)
	const [content, setContent] = useState()

	function openPopUp(content) {
		return () => {
			setPopUp(true)
			setContent(content)
		}
	}

	return (
		<>
			<div id="career">
				<svg className='broken-line' data-level={profileData.level}>
					<line x1="0" y1="0" x2="0" y2="2400" strokeWidth="3" strokeDasharray="8 2" />
				</svg>
				<div className="top-menu">
					<Back />
					<h1>{t('career.title')}</h1>
				</div>
				{leagues.map((league, i) => <>
					<League key={i} number={i} level={profileData.level} league={league} />
					{league.levels.map((level, j) => {
						if (level.value <= profileData.level) {
							const progressTotal = level.tasks ? level.tasks.length : 1
							const progressCurrent = level.value < profileData.level ? progressTotal : level.tasks ? level.tasks.filter(tasks => tasks.completed).length : 1
							return (
								<div key={j} className='current-row'>
									<div className={'level' + (level.value < profileData.level ? ' passed' : '')}>
										<span>K{level.value}</span>
										<Circle total={progressTotal} filled={progressCurrent} fill={level.value < profileData.level ? '#8B6EFF' : '#5A35EE'} />
										{level.tasks && <div className='progress-info'>{progressCurrent}/<span>{progressTotal}</span></div>}
									</div>
									<div className={'level-card' + (level.value < profileData.level ? ' passed' : '')}>
										<div className='notice'>{level.value < profileData.level ? t('career.passed') : t('career.current')}</div>
										<p>{t('career.earned')}: <span>250$</span></p>
										<p>{t('career.referrals')}: <span>25</span></p>
										<p>{t('career.reached')}: <span>{level.time}</span></p>
										{level.tasks && <div className='see-button' onClick={openPopUp(<>
											<Progress current={progressCurrent} total={progressTotal} text={`${t('career.goToLevel')} K${level.value + 1}`} />
											<h4 className='task-title'>{t('bonuses.tasks')}</h4>
											{level.tasks.map((task, k) => <Tack
												key={k}
												number={k + 1}
												current={level.value < profileData.level ? task.total : task.current}
												total={task.total}
												text={level.value === 2 && k === 0 ? <>{t('career.levels.2.tasks.0.0')} <span>{t('career.levels.2.tasks.0.1')}</span> {t('career.levels.2.tasks.0.2')}</> : t(`career.levels.${level.value}.tasks.${k}`)}
												reference={task.reference}
												completed={level.value < profileData.level ? true : task.completed}
											/>)}
											{level.achievements && <h4 className='task-title'>{t('career.achievements')}</h4>}
											{level.achievements && level.achievements.map(a => <div key={a} className='achievement'>{t(`career.levels.${level.value}.achievements.${a}`)}</div>)}
										</>)}>
											{level.value < profileData.level ? <>
												{t('career.tasksTitle')} {progressCurrent}/{level.tasks.length}
											</> : <>
												{t('career.seeTasks')}
												<div className='progress-info'>{progressCurrent}/{level.tasks.length}</div>
											</>}
										</div>}
									</div>
								</div>
							)
						}
						return (
							<div key={j} className='row'>
								<div className='level lock'>
									<span>K{level.value}</span>
									<div className='lock-circle' />
									<div className='lock-icon'><LockIcon size={10} /></div>
								</div>
								<div className={'condition' + (profileData.level >= level.value - 1 ? '' : ' inactive')}>{t(`career.levels.${level.value}.inactive`)}</div>
							</div>
						)
					})}
				</>)}
			</div>

			<PopUpCareer active={popUp} onClose={() => setPopUp(false)}>{content}</PopUpCareer>
		</>

	)
}