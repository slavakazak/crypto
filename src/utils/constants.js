import { FlagEnIcon, FlagRusIcon, MenIcon, WomenIcon } from "../components/Icons"
import afghanistan from '../img/afghanistan.png'
import albania from '../img/albania.png'
import robot from '../img/robot.png'

export const genders = [
	{ tag: 'man', icon: <MenIcon /> },
	{ tag: 'woman', icon: <WomenIcon /> }
]
export const countries = [
	{ tag: 'Россия', icon: <FlagRusIcon /> },
	{ tag: 'Afghanistan', icon: <img src={afghanistan} alt="Afghanistan" /> },
	{ tag: 'Albania', icon: <img src={albania} alt="Albania" /> },
	{ tag: 'Algeria', icon: <FlagRusIcon /> },
]
export const avatars = {
	robot: robot,
	robot2: robot,
}
export const languages = [
	{ tag: 'ru', icon: <FlagRusIcon /> },
	{ tag: 'en', icon: <FlagEnIcon /> },
]