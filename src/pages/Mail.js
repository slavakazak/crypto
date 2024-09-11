import Back from "../components/Back"
import { useTranslation } from 'react-i18next'
import PopUpMail from "../components/PopUpMail"
import { useState } from "react"

export default function Mail() {
	const { t } = useTranslation()

	const [popUp, setPopUp] = useState(false)
	const [popUpTitle, setPopUpTitle] = useState('')
	const [popUpContent, setPopUpContent] = useState('')

	function openPopUp(title, content) {
		setPopUp(true)
		setPopUpTitle(title)
		setPopUpContent(content)
	}

	function messageClickHandler() {
		openPopUp('Поздравляем с достижением нового карьерного уровня!', <>
			<p>Таким образом начало повседневной работы по формированию позиции способствует подготовки и реализации соответствующий условий активизации. Не следует, однако забывать, что постоянное информационно-пропагандистское обеспечение нашей деятельности требуют определения и уточнения новых предложений.</p>
			<br />
			<p>Идейные соображения высшего порядка, а также начало повседневной работы по формированию позиции в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач.</p>
			<br />
			<p>С другой стороны постоянный количественный рост и сфера нашей активности позволяет выполнять важные задания по разработке соответствующий условий активизации.</p>
		</>)
	}

	const content = <>
		<p>Таким образом начало повседневной работы по формированию позиции способствует подготовки и реализации соответствующий условий активизации. Не следует, однако забывать, что постоянное информационно-пропагандистское обеспечение нашей деятельности требуют определения и уточнения новых предложений.</p>
		<br />
		<p>Идейные соображения высшего порядка, а также начало повседневной работы по формированию позиции в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач.</p>
		<br />
		<p>С другой стороны постоянный количественный рост и сфера нашей активности позволяет выполнять важные задания по разработке соответствующий условий активизации.</p>
	</>

	return (
		<>

			<div id="mail">
				<div className="top-menu">
					<Back />
					<h1>{t('mail.title')}</h1>
				</div>
				<div className="message active" onClick={() => openPopUp('Поздравляю с достижением нового карьерного уровня!', content)}>
					<div className="left-side">
						<div className="dot" />
						<span className="title">Поздравляю с достижением нового карьерного уровня!</span>
					</div>
					<span className="date">15 авг</span>
				</div>
				<div className="message active" onClick={() => openPopUp('Поздравляю с достижением!', content)}>
					<div className="left-side">
						<div className="dot" />
						<span className="title">Поздравляю с достижением!</span>
					</div>
					<span className="date">15 авг</span>
				</div>
				<div className="message" onClick={() => openPopUp('Поздравляю с достижением нового', content)}>
					<div className="left-side">
						<span className="title">Поздравляю с достижением нового</span>
					</div>
					<span className="date">15 авг</span>
				</div>
			</div>

			<PopUpMail active={popUp} onClose={() => setPopUp(false)} title={popUpTitle}>{popUpContent}</PopUpMail>

		</>
	)
}