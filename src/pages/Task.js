import { useState } from "react"
import { CalendarIcon, RightArrowIcon, SuccessIcon, TokenIcon, YouTubeIcon, CirclesIcon } from "../components/Icons"
import PopUpYouTube from "../components/PopUpYouTube"
import PopUpDaily from "../components/PopUpDaily"
import { useTranslation } from 'react-i18next'

export default function Task() {
	const { t } = useTranslation()

	const [youTube, setYouTube] = useState(false)
	const [youTubeText, setYouTubeText] = useState('')
	const [youTubeDescription, setYouTubeDescription] = useState('')
	const [youTubeLink, setYouTubeLink] = useState('')
	const [youTubeBonus, setYouTubeBonus] = useState()

	function openYoyTube(text, description, link, bonus) {
		setYouTube(true)
		setYouTubeText(text)
		setYouTubeDescription(description)
		setYouTubeLink(link)
		setYouTubeBonus(bonus)
	}

	const [daily, setDaily] = useState(false)

	return (
		<>

			<div id="task">
				<div className="circles"><CirclesIcon /></div>
				<h1>{t('task.title')}</h1>
				<h2>{t('task.youTube')}</h2>
				<div className="task-block" onClick={() => openYoyTube(t('task.task1Title'), t('task.task1Description'), '/', 1000)}>
					<div className="left-side">
						<YouTubeIcon />
						<div>
							<div className="text">{t('task.task1Title')}</div>
							<div className="bonus"><TokenIcon /><span>+1000</span></div>
						</div>
					</div>
					<RightArrowIcon />
				</div>
				<div className="task-block active">
					<div className="left-side">
						<YouTubeIcon />
						<div>
							<div className="text">{t('task.task2Title')}</div>
							<div className="bonus"><TokenIcon /><span>+10000</span></div>
						</div>
					</div>
					<SuccessIcon size={33} />
				</div>
				<h2>{t('task.daily')}</h2>
				<div className="task-block" onClick={() => setDaily(true)}>
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

			<PopUpYouTube active={youTube} onClose={() => setYouTube(false)} text={youTubeText} description={youTubeDescription} link={youTubeLink} bonus={youTubeBonus} />

			<PopUpDaily active={daily} onClose={() => setDaily(false)} />
		</>
	)
}