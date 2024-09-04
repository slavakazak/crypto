import { FlagEnIcon, FlagRusIcon, MenIcon, WomenIcon } from "../components/Icons"
import afghanistan from '../img/afghanistan.png'
import albania from '../img/albania.png'
import robot from '../img/robot.png'
import k2 from '../img/K2.png'

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

export const products = [
	{
		name: 'K-2',
		id: 16,
		img: robot,
		inactive: false,
		price: 499,
		profit: '7,68%',
		indicators: ['53,8%', '7,68%', '71,4%', '56,7%', '-5,9%', '-3,18%', '45,1%', '20-50%'],
		icon: k2,
	},
	{
		name: 'K-X',
		img: robot,
		inactive: true
	},
	{
		name: 'K-X',
		img: robot,
		inactive: true
	}
]