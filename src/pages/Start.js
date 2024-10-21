import Back from "../components/Back"
import { useTranslation } from 'react-i18next'
import Accordion from "../components/Accordion"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/DataProvider"
import { AuthContext } from "../context/AuthProvider"
import getNicknameFromRef from "../utils/getNicknameFromRef"
import getFAQ from "../utils/getFAQ"

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

	const [faq, setFaq] = useState([])

	useEffect(() => {
		if (!auth) return
		async function init() {
			const newFaq = await getFAQ(auth)
			setFaq(newFaq)
		}
		init()
	}, [auth])

	return (
		<div id="faq">
			<div className="top-menu">
				<Back />
				<h1>{t('faq.startTitle')}</h1>
			</div>
			{faq.filter(item => item.page === 'option4').reverse().map((item, i) => (
				<Accordion key={i} number={i + 1} title={profileData.language === 'en' && item.title_en ? item.title_en : item.title}>
					<div dangerouslySetInnerHTML={{ __html: profileData.language === 'en' && item.content_en ? item.content_en : item.content }} />
				</Accordion>
			))}
			{refNickname && <Link to={'https://t.me/' + refNickname} className="question">{t('faq.write')}</Link>}
		</div>
	)
}