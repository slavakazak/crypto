import Back from "../components/Back"
import { useTranslation } from 'react-i18next'
import Accordion from "../components/Accordion"
import { Link } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthProvider"
import { DataContext } from "../context/DataProvider"
import getFAQ from "../utils/getFAQ"

export default function FAQRating() {
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
				<h1>{t('faq.faqTitle')} {t('faq.rating')}</h1>
			</div>
			{faq.filter(item => item.page === 'option3').reverse().map((item, i) => (
				<Accordion key={i} number={i + 1} title={profileData.language === 'en' && item.title_en ? item.title_en : item.title}>
					<div dangerouslySetInnerHTML={{ __html: profileData.language === 'en' && item.content_en ? item.content_en : item.content }} />
				</Accordion>
			))}
			<Link className="question" to={'https://t.me/k2_support_bot'}>{t('faq.question')}</Link>
		</div>
	)
}