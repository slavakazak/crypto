import Back from "../components/Back"
import { useTranslation } from 'react-i18next'
import Accordion from "../components/Accordion"

export default function FAQInvite() {
	const { t } = useTranslation()

	return (
		<div id="faq">
			<div className="top-menu">
				<Back />
				<h1>{t('faq.faqTitle')} Пригласить</h1>
			</div>
			<h2>{t('faq.algorithm')}</h2>
			<Accordion number={1} title={t('faq.faqTitle1')}>
				<p>{t('faq.faqText')}</p>
				<br />
				<p>{t('faq.faqText')}</p>
			</Accordion>
			<Accordion number={2} title={t('faq.faqTitle2')}>
				<p>{t('faq.faqText')}</p>
				<br />
				<p>{t('faq.faqText')}</p>
			</Accordion>
			<Accordion number={3} title={t('faq.faqTitle3')}>
				<p>{t('faq.faqText')}</p>
				<br />
				<p>{t('faq.faqText')}</p>
			</Accordion>
			<h2>{t('faq.exchange')}</h2>
			<Accordion number={1} title={t('faq.faqTitle4')}>
				<p>{t('faq.faqText')}</p>
				<br />
				<p>{t('faq.faqText')}</p>
			</Accordion>
			<div className="question">{t('faq.question')}</div>
		</div>
	)
}