import Back from "../components/Back"
import { useTranslation } from 'react-i18next'
import Accordion from "../components/Accordion"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/DataProvider"
import { AuthContext } from "../context/AuthProvider"
import getNicknameFromRef from "../utils/getNicknameFromRef"

export default function Start() {
	const { t } = useTranslation()
	const { auth } = useContext(AuthContext)
	const { profileData } = useContext(DataContext)

	const [refNickname, setRefNickname] = useState(null)

	useEffect(() => {
		if (!auth || !profileData.link) return
		async function init() {
			let newRefNickname = await getNicknameFromRef(auth, profileData.link)
			const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
			if (!regex.test(newRefNickname) || newRefNickname === "admin") {
				newRefNickname = null
			}
			setRefNickname(newRefNickname)
		}
		init()
	}, [auth, profileData.link])

	return (
		<div id="faq">
			<div className="top-menu">
				<Back />
				<h1>{t('faq.startTitle')}</h1>
			</div>
			<h2>{t('faq.investors')}</h2>
			<Accordion number={1} title={t('faq.startTitle1')}>
				<p>{t('faq.faqText')}</p>
				<br />
				<p>{t('faq.faqText')}</p>
			</Accordion>
			<Accordion number={2} title={t('faq.startTitle2')}>
				<p>{t('faq.faqText')}</p>
				<br />
				<p>{t('faq.faqText')}</p>
			</Accordion>
			<Accordion number={3} title={t('faq.startTitle3')}>
				<p>{t('faq.faqText')}</p>
				<br />
				<p>{t('faq.faqText')}</p>
			</Accordion>
			<h2>{t('faq.business')}</h2>
			<Accordion number={1} title={t('faq.startTitle4')}>
				<p>{t('faq.faqText')}</p>
				<br />
				<p>{t('faq.faqText')}</p>
			</Accordion>
			{refNickname && <Link to={'https://t.me/' + refNickname} className="question">{t('faq.write')}</Link>}
		</div>
	)
}