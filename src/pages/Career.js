import { useTranslation } from 'react-i18next'
import Back from "../components/Back"
import { InfoIcon, LockIcon, OkIcon, TrophyIcon } from '../components/Icons'
import Circle from '../components/Circle'
import PopUpCareer from '../components/PopUpCareer'
import { useState, useContext } from 'react'
import { ProfileContext } from '../utils/contexts'

export default function Career() {
	const { t } = useTranslation()
	const profileData = useContext(ProfileContext)

	const leagues = [
		{
			levels: [{
				value: 1,
				time: '25.08.2024',
				reference: '',
				tasks: [{ completed: true }]
			}]
		},
		{
			levels: [
				{
					value: 2,
					time: '25.08.2024',
					reference: '',
					tasks: [
						{ completed: true },
						{ completed: true }
					],
					achievements: [0, 1]
				},
				{
					value: 3,
					time: '25.08.2024',
					reference: '',
					tasks: [
						{ completed: false, current: 1, total: 2 },
						{ reference: '', completed: true, current: 5, total: 5 }
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
					<line x1="0" y1="0" x2="0" y2="2400" strokeWidth="3" stroke-dasharray="8 2" />
				</svg>
				<div className="top-menu">
					<Back />
					<h1>{t('career.title')}</h1>
				</div>
				{leagues.map((league, i) => <>
					<div key={i} className={'league' + (profileData.level === league.levels[0].value || profileData.level === league.levels[1]?.value ? ' active' : profileData.level > league.levels[0].value ? ' passed' : '')}>
						<div className='left-side'>
							<TrophyIcon />
							<span className='name'>{t(`career.leagues.${i}`)} {t('career.league')}</span>
							<span className='levels'>({league.levels.map(level => 'K' + level.value).join(',')} {t('career.level')})</span>
							<div className='info'><InfoIcon /></div>
						</div>
						{profileData.level >= league.levels[0].value ? <OkIcon /> : <LockIcon />}
					</div>
					{league.levels.map((level, i) => {
						const progressCurrent = level.tasks ? level.tasks.filter(tasks => tasks.completed).length : 1
						const progressTotal = level.tasks ? level.tasks.length : 1
						const progress = Math.round(progressCurrent / progressTotal * 100)
						if (level.value === profileData.level) {
							return (
								<div key={i} className='current-row'>
									<div className='level'>
										<span>K{level.value}</span>
										<Circle total={progressTotal} filled={progressCurrent} />
										{level.tasks && <div className='progress-info'>{progressCurrent}/<span>{level.tasks.length}</span></div>}
									</div>
									<div className='level-card'>
										<div className='notice'>{t('career.current')}</div>
										<p>{t('career.earned')}: <span>250$</span></p>
										<p>{t('career.referrals')}: <span>25</span></p>
										<p>{t('career.reached')}: <span>{level.time}</span></p>
										{level.tasks && <div className='see-button' onClick={openPopUp(<>
											<div className='progress'>
												<p className='title'>{t('bonuses.progress')}</p>
												<div className='row'>
													<div className='text'>
														<span>{t('career.goToLevel')} K{level.value + 1}</span>
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
											{level.tasks.map((task, i) => {
												const progressTaskTotal = task.total
												const progressTaskCurrent = task.current
												const progressTask = progressTaskCurrent / progressTaskTotal * 100
												return <div key={i} className={'task' + (task.total ? '' : ' text-only') + (task.completed ? ' inactive' : '')}>
													<div className='overlay' />
													<div className='number'>{i + 1}</div>
													<div className='content'>
														<p className='text'>
															{level.value === 2 && i === 0 ?
																<>{t('career.levels.2.tasks.0.0')} <span>{t('career.levels.2.tasks.0.1')}</span> {t('career.levels.2.tasks.0.2')}</>
																:
																t(`career.levels.${level.value}.tasks.${i}`)
															}
															{task.reference && <span className='info'><InfoIcon /></span>}
														</p>
														{task.total && <>
															<div className='progress-bar'><div className='line' style={{ width: progressTask > 100 ? '100%' : progressTask + '%' }} /></div>
															<div className='number-row'>
																<span className='start' style={{ display: progressTask < 5 ? 'none' : 'block' }}>0</span>
																<span className='current' style={{ left: progressTask < 1 ? '1%' : progressTask > 98 ? '98%' : progressTask + '%' }}>{progressTaskCurrent}</span>
																<span className='end' style={{ display: progressTask > 91 ? 'none' : 'block' }}>{progressTaskTotal}</span>
															</div>
														</>}
													</div>
													<div className={'check' + (task.completed ? ' active' : '')}><OkIcon size={11} /></div>
												</div>
											})}
											{level.achievements && <h4 className='task-title'>{t('career.achievements')}</h4>}
											{level.achievements && level.achievements.map(i => (
												<div key={i} className='achievement'>{t(`career.levels.${level.value}.achievements.${i}`)}</div>
											))}
										</>)}>
											{t('career.seeTasks')}
											<div className='progress-info'>{progressCurrent}/{level.tasks.length}</div>
										</div>}
									</div>
								</div>
							)
						}
						if (level.value < profileData.level) {
							return (
								<div key={i} className='current-row'>
									<div className='level passed'>
										<span>K{level.value}</span>
										<Circle total={progressTotal} filled={progressCurrent} fill="#8B6EFF" />
										<div className='progress-info'>{progressCurrent}/{level.tasks.length}</div>
									</div>
									<div className='level-card passed'>
										<div className='notice'>{t('career.passed')}</div>
										<p>{t('career.earned')}: <span>250$</span></p>
										<p>{t('career.referrals')}: <span>25</span></p>
										<p>{t('career.reached')}: <span>{level.time}</span></p>
										{level.tasks && <div className='see-button' onClick={openPopUp(<>
											<div className='progress'>
												<p className='title'>{t('bonuses.progress')}</p>
												<div className='row'>
													<div className='text'>
														<span>{t('career.goToLevel')} K{level.value + 1}</span>
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
											{level.tasks.map((task, i) => {
												const progressTaskTotal = task.total
												const progressTaskCurrent = task.current
												const progressTask = progressTaskCurrent / progressTaskTotal * 100
												return <div key={i} className={'task' + (task.total ? '' : ' text-only') + (task.completed ? ' inactive' : '')}>
													<div className='overlay' />
													<div className='number'>{i + 1}</div>
													<div className='content'>
														<p className='text'>
															{level.value === 2 && i === 0 ?
																<>{t('career.levels.2.tasks.0.0')} <span>{t('career.levels.2.tasks.0.1')}</span> {t('career.levels.2.tasks.0.2')}</>
																:
																t(`career.levels.${level.value}.tasks.${i}`)
															}
															{task.reference && <span className='info'><InfoIcon /></span>}
														</p>
														{task.total && <>
															<div className='progress-bar'><div className='line' style={{ width: progressTask > 100 ? '100%' : progressTask + '%' }} /></div>
															<div className='number-row'>
																<span className='start' style={{ display: progressTask < 5 ? 'none' : 'block' }}>0</span>
																<span className='current' style={{ left: progressTask < 1 ? '1%' : progressTask > 98 ? '98%' : progressTask + '%' }}>{progressTaskCurrent}</span>
																<span className='end' style={{ display: progressTask > 91 ? 'none' : 'block' }}>{progressTaskTotal}</span>
															</div>
														</>}
													</div>
													<div className={'check' + (task.completed ? ' active' : '')}><OkIcon size={11} /></div>
												</div>
											})}
											{level.achievements && <h4 className='task-title'>{t('career.achievements')}</h4>}
											{level.achievements && level.achievements.map(i => (
												<div key={i} className='achievement'>{t(`career.levels.${level.value}.achievements.${i}`)}</div>
											))}
										</>)}>
											{t('career.tasksTitle')} {progressCurrent}/{level.tasks.length}
										</div>}
									</div>
								</div>
							)
						}
						return (
							<div key={i} className='row'>
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