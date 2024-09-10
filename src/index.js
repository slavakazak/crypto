import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./styles/styles.scss"
import { createRoot } from "react-dom/client"
import App from "./components/App"
import { BrowserRouter } from "react-router-dom"
import { I18nextProvider, initReactI18next } from 'react-i18next'
import enTranslation from './locales/en/translation.json'
import ruTranslation from './locales/ru/translation.json'
import i18next from 'i18next'

i18next.use(initReactI18next).init({
	//debug: true,
	resources: {
		en: { translation: enTranslation },
		ru: { translation: ruTranslation },
	},
	lng: 'ru', // язык по умолчанию
	fallbackLng: 'ru', // резервный язык
	interpolation: {
		escapeValue: false, // React уже защищает от XSS
	},
})

const root = createRoot(document.getElementById("root"))

root.render(
	<I18nextProvider i18next={i18next}>
		<BrowserRouter basename="/">
			<App />
		</BrowserRouter>
	</I18nextProvider>
)