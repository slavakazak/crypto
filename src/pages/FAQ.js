import Back from "../components/Back"
import { useTranslation } from 'react-i18next'
import Accordion from "../components/Accordion"
import { Link } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthProvider"
import { DataContext } from "../context/DataProvider"
import getFAQ from "../utils/getFAQ"

export default function FAQ() {
	const { t } = useTranslation()
	const { auth } = useContext(AuthContext)
	const { profileData } = useContext(DataContext)

	const [faq, setFaq] = useState([])

	useEffect(() => {
		if (!auth) return
		async function init() {
			const newFaq = await getFAQ(auth)
			setFaq(newFaq)
			console.log(newFaq)
		}
		init()
	}, [auth])

	return (
		<div id="faq">
			<div className="top-menu">
				<Back />
				<h1>{t('faq.faqTitle')}</h1>
			</div>
			{faq.filter(item => item.page === 'option1').reverse().map((item, i) => (
				<Accordion key={i} number={i + 1} title={profileData.language.tag === 'en' && item.title_en ? item.title_en : item.title}>
					<div dangerouslySetInnerHTML={{ __html: profileData.language.tag === 'en' && item.content_en ? item.content_en : item.content }} />
				</Accordion>
			))}
			<Link className="question" to={'https://t.me/helper_kk'}>{t('faq.question')}</Link>
		</div>
	)
}