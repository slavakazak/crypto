import { FlagEnIcon, FlagRusIcon, MenIcon, WomenIcon } from "../components/Icons"
import afghanistan from '../img/afghanistan.png'
import albania from '../img/albania.png'
import robot from '../img/robot.png'
import k1avatar from '../img/k1-svg.svg'
import k2avatar from '../img/k2-svg.svg'
import k3avatar from '../img/k3-svg.svg'
import k4avatar from '../img/k4-svg.svg'
import k5avatar from '../img/k5-svg.svg'
import k6avatar from '../img/k6-svg.svg'
import k7avatar from '../img/k7-svg.svg'
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
export const avatars = { k1avatar, k2avatar, k3avatar, k4avatar, k5avatar, k6avatar, k7avatar }
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
	}
]

export const defaultProfileData = {
	nickname: '',
	fullName: '',
	username: '',
	email: '',
	gender: '',
	age: 0,
	country: countries[0],
	// login: '',
	// password: '',
	// passwordChanged: false,
	pin: '',
	wallet: '',
	exchange: '',
	avatars: ['k1avatar'],
	myAvatar: '',
	avatar: 'k1avatar',
	language: languages[0],
	level: 1,
	token: 0,
	coin: 0,
	usdt: 0,
	ref: '',
	link: ''
}

export const defaultLevels = [
	{
		tasks: [{ completed: false }]
	},
	{
		tasks: [
			{ completed: false },
			{ completed: false }
		],
		achievements: [0, 1]
	},
	{
		tasks: [
			{ completed: false, current: 0, total: 2 },
			{ reference: '', completed: false, current: 0, total: 5 }
		],
		achievements: [0]
	},
	{
		tasks: [
			{ completed: false, current: 0, total: 5 },
			{ reference: '', completed: false, current: 0, total: 25 }
		],
		achievements: [0]
	},
	{
		tasks: [
			{ completed: false, current: 0, total: 10 },
			{ reference: '', completed: false, current: 0, total: 125 },
			{ reference: '', completed: false, current: 0, total: 2 }
		],
		achievements: [0, 1, 2]
	},
	{
		tasks: [
			{ completed: false, current: 0, total: 20 },
			{ reference: '', completed: false, current: 0, total: 500 },
			{ reference: '', completed: false, current: 0, total: 2 },
			{ completed: false, current: 0, total: 1 }
		],
		achievements: [0, 1, 2]
	},
	{
		tasks: [
			{ completed: false, current: 0, total: 25 },
			{ reference: '', completed: false, current: 0, total: 1500 },
			{ reference: '', completed: false, current: 0, total: 2 },
			{ completed: false, current: 0, total: 1 },
			{ completed: false, current: 0, total: 1 }
		],
		achievements: [0, 1, 2]
	},
	{
		tasks: [
			{ completed: false, current: 0, total: 30 },
			{ reference: '', completed: false, current: 0, total: 4000 },
			{ reference: '', completed: false, current: 0, total: 2 },
			{ completed: false, current: 0, total: 1 },
			{ completed: false, current: 0, total: 1 },
			{ completed: false, current: 0, total: 1 }
		],
		achievements: [0, 1, 2]
	},
	{
		tasks: [
			{ completed: false, current: 0, total: 40 },
			{ reference: '', completed: false, current: 0, total: 10000 },
			{ reference: '', completed: false, current: 0, total: 2 },
			{ completed: false, current: 0, total: 1 },
			{ completed: false, current: 0, total: 1 },
			{ completed: false, current: 0, total: 1 },
			{ completed: false, current: 0, total: 1 }
		],
		achievements: [0, 1, 2]
	},
	{}
]