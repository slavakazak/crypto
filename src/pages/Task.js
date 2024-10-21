import { useState, useContext } from "react"
import { CalendarIcon, RightArrowIcon, SuccessIcon, TokenIcon, YouTubeIcon, CirclesIcon } from "../components/Icons"
import PopUpYouTube from "../components/PopUpYouTube"
import PopUpDaily from "../components/PopUpDaily"
import { useTranslation } from 'react-i18next'
import { DataContext } from "../context/DataProvider"

export default function Task() {
	const { t } = useTranslation()
	const { profileData } = useContext(DataContext)

	const [youTube, setYouTube] = useState(false)
	const [youTubeTitle, setYouTubeTitle] = useState('')
	const [youTubeDescription, setYouTubeDescription] = useState('')
	const [youTubeBonus, setYouTubeBonus] = useState()

	function openYoyTube(title, description, bonus) {
		setYouTube(true)
		setYouTubeTitle(title)
		setYouTubeDescription(description)
		setYouTubeBonus(bonus)
	}

	const [daily, setDaily] = useState(false)

	return (
		<>

			<div id="task">
				<div className="circles animate__animated animate__zoomIn"><CirclesIcon /></div>
				<h1 className="animate__animated animate__zoomIn">{t('task.title')}</h1>
				<h2>{t('task.youTube')}</h2>
				<div className={'task-block' + (profileData.video ? ' active' : '')} onClick={() => openYoyTube(t('task.task1Title'), t('task.task1Description'), 5000)}>
					<div className="left-side">
						<YouTubeIcon />
						<div>
							<div className="text">{t('task.task1Title')}</div>
							<div className="bonus"><TokenIcon /><span>+5000</span></div>
						</div>
					</div>
					{profileData.video ? <SuccessIcon size={33} /> : <RightArrowIcon />}
				</div>
				{/* <div className="task-block active">
					<div className="left-side">
						<YouTubeIcon />
						<div>
							<div className="text">{t('task.task2Title')}</div>
							<div className="bonus"><TokenIcon /><span>+10000</span></div>
						</div>
					</div>
					<SuccessIcon size={33} />
				</div> */}
				<h2 className="animate__animated animate__zoomIn">{t('task.daily')}</h2>
				<div className="task-block animate__animated animate__zoomIn" onClick={() => setDaily(true)}>
					<div className="left-side">
						<CalendarIcon />
						<div>
							<div className="text">{t('task.dailyText')}</div>
							<div className="bonus"><TokenIcon /><span>+10000</span></div>
						</div>
					</div>
					<RightArrowIcon />
				</div>
			</div>

			<PopUpYouTube active={youTube} onClose={() => setYouTube(false)} title={youTubeTitle} description={youTubeDescription} bonus={youTubeBonus} />

			<PopUpDaily active={daily} onClose={() => setDaily(false)} />
		</>
	)
}