import { FlagRusIcon, MenIcon, WomenIcon } from "../components/Icons"
import afghanistan from '../img/afghanistan.png'
import albania from '../img/albania.png'

export const genders = [
	{ value: 'Мужчина', icon: <MenIcon /> },
	{ value: 'Женщина', icon: <WomenIcon /> }
]
export const countries = [
	{ value: 'Россия', icon: <FlagRusIcon /> },
	{ value: 'Afghanistan', icon: <img src={afghanistan} alt="Afghanistan" /> },
	{ value: 'Albania', icon: <img src={albania} alt="Albania" /> },
	{ value: 'Algeria', icon: <FlagRusIcon /> },
]