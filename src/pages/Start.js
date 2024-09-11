import Back from "../components/Back"
import { useTranslation } from 'react-i18next'
import Accordion from "../components/Accordion"

export default function Start() {
	const { t } = useTranslation()

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
			<div className="question">{t('faq.write')}</div>
		</div>
	)
}