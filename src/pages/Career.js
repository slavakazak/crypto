import { useTranslation } from 'react-i18next'
import Back from "../components/Back"
import { LockIcon } from '../components/Icons'
import Circle from '../components/Circle'
import PopUpCareer from '../components/PopUpCareer'
import { useState, useContext } from 'react'
import { DataContext } from '../context/DataProvider'
import { LevelsContext } from '../context/LevelsProvider'
import Progress from '../components/Progress'
import Tack from '../components/Task'
import League from '../components/League'

export default function Career() {
	const { t } = useTranslation()
	const { profileData } = useContext(DataContext)
	const { levels, setTasks, checkLevel } = useContext(LevelsContext)

	const leagues = [[1], [2, 3], [4, 5], [6, 7], [8, 9], [10]]

	const [popUp, setPopUp] = useState(false)
	const [content, setContent] = useState()

	function openPopUp(content) {
		return () => {
			setPopUp(true)
			setContent(content)
		}
	}

	async function testClickHandler() {
		await setTasks(2, 0)
		setPopUp(false)
		await checkLevel()
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
					{league.map(level => {
						if (level <= profileData.level) {
							const tasks = levels[level - 1]?.tasks || []
							const total = tasks.length
							const current = level < profileData.level ? total : tasks.filter(task => task.completed).length
							const progressCurrent = level < profileData.level ? total : tasks.reduce((a, c) => a + (c.completed ? 1 : c.current ? c.current / c.total : 0), 0)
							const date = levels[level - 1]?.time ? new Date(levels[level - 1]?.time.replace(' ', 'T') + 'Z') : new Date()
							const dateFormat = new Intl.DateTimeFormat(profileData.language.tag, { year: "numeric", month: "numeric", day: "numeric" })
							return (
								<div key={level} className='current-row'>
									<div className={'level' + (level < profileData.level ? ' passed' : '')}>
										<span>K{level}</span>
										<Circle total={total} filled={current} fill={level < profileData.level ? '#8B6EFF' : '#5A35EE'} />
										{tasks.length > 0 && <div className='progress-info'>{current}/<span>{total}</span></div>}
									</div>
									<div className={'level-card' + (level < profileData.level ? ' passed' : '')}>
										<div className='notice'>{level < profileData.level ? t('career.passed') : t('career.current')}</div>
										<p>{t('career.earned')}: <span>{levels[level - 1]?.earned || 0}$</span></p>
										<p>{t('career.referrals')}: <span>{levels[level - 1]?.referrals || 0}</span></p>
										<p>{t('career.reached')}: <span>{dateFormat.format(date)}</span></p>
										{tasks.length > 0 && <div className='see-button' onClick={openPopUp(<>
											<Progress current={current} progressCurrent={progressCurrent} total={total} text={`${t('career.goToLevel')} K${level + 1}`} />
											<h4 className='task-title'>{t('bonuses.tasks')}</h4>
											{tasks.map((task, k) => <Tack
												key={k}
												number={k + 1}
												current={level < profileData.level ? task.total : task.current}
												total={task.total}
												text={level === 2 && k === 0 ? <>{t('career.levels.2.tasks.0.0')} <span onClick={testClickHandler}>{t('career.levels.2.tasks.0.1')}</span> {t('career.levels.2.tasks.0.2')}</> : t(`career.levels.${level}.tasks.${k}`)}
												reference={task.reference}
												completed={level < profileData.level ? true : task.completed}
											/>)}
											{levels[level - 1]?.achievements && <h4 className='task-title'>{t('career.achievements')}</h4>}
											{levels[level - 1]?.achievements && levels[level - 1].achievements.map(a => <div key={a} className='achievement'>{t(`career.levels.${level}.achievements.${a}`)}</div>)}
										</>)}>
											{level < profileData.level ? <>
												{t('career.tasksTitle')} {current}/{total}
											</> : <>
												{t('career.seeTasks')}
												<div className='progress-info'>{current}/{total}</div>
											</>}
										</div>}
									</div>
								</div>
							)
						}
						return (
							<div key={level} className='row'>
								<div className='level lock'>
									<span>K{level}</span>
									<div className='lock-circle' />
									<div className='lock-icon'><LockIcon size={10} /></div>
								</div>
								<div className={'condition' + (profileData.level >= level - 1 ? '' : ' inactive')}>{t(`career.levels.${level}.inactive`)}</div>
							</div>
						)
					})}
				</>)}
			</div>

			<PopUpCareer active={popUp} onClose={() => setPopUp(false)}>{content}</PopUpCareer>
		</>

	)
}