import { MenIcon, WomenIcon } from "../components/Icons"
import robot from '../img/robot.png'
import k1avatar from '../img/k1avatar.png'
import k2avatar from '../img/k2avatar.png'
import k3avatar from '../img/k3avatar.png'
import k4avatar from '../img/k4avatar.png'
import k5avatar from '../img/k5avatar.png'
import k6avatar from '../img/k6avatar.png'
import k7avatar from '../img/k7avatar.png'
import k2 from '../img/K2.png'

export const genders = [
	{ tag: 'man', icon: <MenIcon /> },
	{ tag: 'woman', icon: <WomenIcon /> }
]

const countriesNoId = [
	{ code: 'AF', name: 'Afghanistan' },
	{ code: 'AX', name: 'Aland Islands' },
	{ code: 'AL', name: 'Albania' },
	{ code: 'DZ', name: 'Algeria' },
	{ code: 'AS', name: 'American Samoa' },
	{ code: 'AD', name: 'Andorra' },
	{ code: 'AO', name: 'Angola' },
	{ code: 'AI', name: 'Anguilla' },
	{ code: 'AQ', name: 'Antarctica' },
	{ code: 'AG', name: 'Antigua And Barbuda' },
	{ code: 'AR', name: 'Argentina' },
	{ code: 'AM', name: 'Armenia' },
	{ code: 'AW', name: 'Aruba' },
	{ code: 'AU', name: 'Australia' },
	{ code: 'AT', name: 'Austria' },
	{ code: 'AZ', name: 'Azerbaijan' },
	{ code: 'BS', name: 'Bahamas' },
	{ code: 'BH', name: 'Bahrain' },
	{ code: 'BD', name: 'Bangladesh' },
	{ code: 'BB', name: 'Barbados' },
	{ code: 'BY', name: 'Belarus' },
	{ code: 'BE', name: 'Belgium' },
	{ code: 'BZ', name: 'Belize' },
	{ code: 'BJ', name: 'Benin' },
	{ code: 'BM', name: 'Bermuda' },
	{ code: 'BT', name: 'Bhutan' },
	{ code: 'BO', name: 'Bolivia' },
	{ code: 'BA', name: 'Bosnia And Herzegovina' },
	{ code: 'BW', name: 'Botswana' },
	{ code: 'BV', name: 'Bouvet Island' },
	{ code: 'BR', name: 'Brazil' },
	{ code: 'IO', name: 'British Indian Ocean Territory' },
	{ code: 'BN', name: 'Brunei Darussalam' },
	{ code: 'BG', name: 'Bulgaria' },
	{ code: 'BF', name: 'Burkina Faso' },
	{ code: 'BI', name: 'Burundi' },
	{ code: 'KH', name: 'Cambodia' },
	{ code: 'CM', name: 'Cameroon' },
	{ code: 'CA', name: 'Canada' },
	{ code: 'CV', name: 'Cape Verde' },
	{ code: 'KY', name: 'Cayman Islands' },
	{ code: 'CF', name: 'Central African Republic' },
	{ code: 'TD', name: 'Chad' },
	{ code: 'CL', name: 'Chile' },
	{ code: 'CN', name: 'China' },
	{ code: 'CX', name: 'Christmas Island' },
	{ code: 'CC', name: 'Cocos (Keeling) Islands' },
	{ code: 'CO', name: 'Colombia' },
	{ code: 'KM', name: 'Comoros' },
	{ code: 'CG', name: 'Congo' },
	{ code: 'CD', name: 'Congo}, Democratic Republic' },
	{ code: 'CK', name: 'Cook Islands' },
	{ code: 'CR', name: 'Costa Rica' },
	{ code: 'CI', name: "Cote D'Ivoire" },
	{ code: 'HR', name: 'Croatia' },
	{ code: 'CU', name: 'Cuba' },
	{ code: 'CY', name: 'Cyprus' },
	{ code: 'CZ', name: 'Czech Republic' },
	{ code: 'DK', name: 'Denmark' },
	{ code: 'DJ', name: 'Djibouti' },
	{ code: 'DM', name: 'Dominica' },
	{ code: 'DO', name: 'Dominican Republic' },
	{ code: 'EC', name: 'Ecuador' },
	{ code: 'EG', name: 'Egypt' },
	{ code: 'SV', name: 'El Salvador' },
	{ code: 'GQ', name: 'Equatorial Guinea' },
	{ code: 'ER', name: 'Eritrea' },
	{ code: 'EE', name: 'Estonia' },
	{ code: 'ET', name: 'Ethiopia' },
	{ code: 'FK', name: 'Falkland Islands (Malvinas)' },
	{ code: 'FO', name: 'Faroe Islands' },
	{ code: 'FJ', name: 'Fiji' },
	{ code: 'FI', name: 'Finland' },
	{ code: 'FR', name: 'France' },
	{ code: 'GF', name: 'French Guiana' },
	{ code: 'PF', name: 'French Polynesia' },
	{ code: 'TF', name: 'French Southern Territories' },
	{ code: 'GA', name: 'Gabon' },
	{ code: 'GM', name: 'Gambia' },
	{ code: 'GE', name: 'Georgia' },
	{ code: 'DE', name: 'Germany' },
	{ code: 'GH', name: 'Ghana' },
	{ code: 'GI', name: 'Gibraltar' },
	{ code: 'GR', name: 'Greece' },
	{ code: 'GL', name: 'Greenland' },
	{ code: 'GD', name: 'Grenada' },
	{ code: 'GP', name: 'Guadeloupe' },
	{ code: 'GU', name: 'Guam' },
	{ code: 'GT', name: 'Guatemala' },
	{ code: 'GG', name: 'Guernsey' },
	{ code: 'GN', name: 'Guinea' },
	{ code: 'GW', name: 'Guinea-Bissau' },
	{ code: 'GY', name: 'Guyana' },
	{ code: 'HT', name: 'Haiti' },
	{ code: 'HM', name: 'Heard Island & Mcdonald Islands' },
	{ code: 'VA', name: 'Holy See (Vatican City State)' },
	{ code: 'HN', name: 'Honduras' },
	{ code: 'HK', name: 'Hong Kong' },
	{ code: 'HU', name: 'Hungary' },
	{ code: 'IS', name: 'Iceland' },
	{ code: 'IN', name: 'India' },
	{ code: 'ID', name: 'Indonesia' },
	{ code: 'IR', name: 'Iran}, Islamic Republic Of' },
	{ code: 'IQ', name: 'Iraq' },
	{ code: 'IE', name: 'Ireland' },
	{ code: 'IM', name: 'Isle Of Man' },
	{ code: 'IL', name: 'Israel' },
	{ code: 'IT', name: 'Italy' },
	{ code: 'JM', name: 'Jamaica' },
	{ code: 'JP', name: 'Japan' },
	{ code: 'JE', name: 'Jersey' },
	{ code: 'JO', name: 'Jordan' },
	{ code: 'KZ', name: 'Kazakhstan' },
	{ code: 'KE', name: 'Kenya' },
	{ code: 'KI', name: 'Kiribati' },
	{ code: 'KR', name: 'Korea' },
	{ code: 'KW', name: 'Kuwait' },
	{ code: 'KG', name: 'Kyrgyzstan' },
	{ code: 'LA', name: "Lao People's Democratic Republic" },
	{ code: 'LV', name: 'Latvia' },
	{ code: 'LB', name: 'Lebanon' },
	{ code: 'LS', name: 'Lesotho' },
	{ code: 'LR', name: 'Liberia' },
	{ code: 'LY', name: 'Libyan Arab Jamahiriya' },
	{ code: 'LI', name: 'Liechtenstein' },
	{ code: 'LT', name: 'Lithuania' },
	{ code: 'LU', name: 'Luxembourg' },
	{ code: 'MO', name: 'Macao' },
	{ code: 'MK', name: 'Macedonia' },
	{ code: 'MG', name: 'Madagascar' },
	{ code: 'MW', name: 'Malawi' },
	{ code: 'MY', name: 'Malaysia' },
	{ code: 'MV', name: 'Maldives' },
	{ code: 'ML', name: 'Mali' },
	{ code: 'MT', name: 'Malta' },
	{ code: 'MH', name: 'Marshall Islands' },
	{ code: 'MQ', name: 'Martinique' },
	{ code: 'MR', name: 'Mauritania' },
	{ code: 'MU', name: 'Mauritius' },
	{ code: 'YT', name: 'Mayotte' },
	{ code: 'MX', name: 'Mexico' },
	{ code: 'FM', name: 'Micronesia}, Federated States Of' },
	{ code: 'MD', name: 'Moldova' },
	{ code: 'MC', name: 'Monaco' },
	{ code: 'MN', name: 'Mongolia' },
	{ code: 'ME', name: 'Montenegro' },
	{ code: 'MS', name: 'Montserrat' },
	{ code: 'MA', name: 'Morocco' },
	{ code: 'MZ', name: 'Mozambique' },
	{ code: 'MM', name: 'Myanmar' },
	{ code: 'NA', name: 'Namibia' },
	{ code: 'NR', name: 'Nauru' },
	{ code: 'NP', name: 'Nepal' },
	{ code: 'NL', name: 'Netherlands' },
	{ code: 'AN', name: 'Netherlands Antilles' },
	{ code: 'NC', name: 'New Caledonia' },
	{ code: 'NZ', name: 'New Zealand' },
	{ code: 'NI', name: 'Nicaragua' },
	{ code: 'NE', name: 'Niger' },
	{ code: 'NG', name: 'Nigeria' },
	{ code: 'NU', name: 'Niue' },
	{ code: 'NF', name: 'Norfolk Island' },
	{ code: 'MP', name: 'Northern Mariana Islands' },
	{ code: 'NO', name: 'Norway' },
	{ code: 'OM', name: 'Oman' },
	{ code: 'PK', name: 'Pakistan' },
	{ code: 'PW', name: 'Palau' },
	{ code: 'PS', name: 'Palestinian Territory}, Occupied' },
	{ code: 'PA', name: 'Panama' },
	{ code: 'PG', name: 'Papua New Guinea' },
	{ code: 'PY', name: 'Paraguay' },
	{ code: 'PE', name: 'Peru' },
	{ code: 'PH', name: 'Philippines' },
	{ code: 'PN', name: 'Pitcairn' },
	{ code: 'PL', name: 'Poland' },
	{ code: 'PT', name: 'Portugal' },
	{ code: 'PR', name: 'Puerto Rico' },
	{ code: 'QA', name: 'Qatar' },
	{ code: 'RE', name: 'Reunion' },
	{ code: 'RO', name: 'Romania' },
	{ code: 'RU', name: 'Russian Federation' },
	{ code: 'RW', name: 'Rwanda' },
	{ code: 'BL', name: 'Saint Barthelemy' },
	{ code: 'SH', name: 'Saint Helena' },
	{ code: 'KN', name: 'Saint Kitts And Nevis' },
	{ code: 'LC', name: 'Saint Lucia' },
	{ code: 'MF', name: 'Saint Martin' },
	{ code: 'PM', name: 'Saint Pierre And Miquelon' },
	{ code: 'VC', name: 'Saint Vincent And Grenadines' },
	{ code: 'WS', name: 'Samoa' },
	{ code: 'SM', name: 'San Marino' },
	{ code: 'ST', name: 'Sao Tome And Principe' },
	{ code: 'SA', name: 'Saudi Arabia' },
	{ code: 'SN', name: 'Senegal' },
	{ code: 'RS', name: 'Serbia' },
	{ code: 'SC', name: 'Seychelles' },
	{ code: 'SL', name: 'Sierra Leone' },
	{ code: 'SG', name: 'Singapore' },
	{ code: 'SK', name: 'Slovakia' },
	{ code: 'SI', name: 'Slovenia' },
	{ code: 'SB', name: 'Solomon Islands' },
	{ code: 'SO', name: 'Somalia' },
	{ code: 'ZA', name: 'South Africa' },
	{ code: 'GS', name: 'South Georgia And Sandwich Isl.' },
	{ code: 'ES', name: 'Spain' },
	{ code: 'LK', name: 'Sri Lanka' },
	{ code: 'SD', name: 'Sudan' },
	{ code: 'SR', name: 'Suriname' },
	{ code: 'SJ', name: 'Svalbard And Jan Mayen' },
	{ code: 'SZ', name: 'Swaziland' },
	{ code: 'SE', name: 'Sweden' },
	{ code: 'CH', name: 'Switzerland' },
	{ code: 'SY', name: 'Syrian Arab Republic' },
	{ code: 'TW', name: 'Taiwan' },
	{ code: 'TJ', name: 'Tajikistan' },
	{ code: 'TZ', name: 'Tanzania' },
	{ code: 'TH', name: 'Thailand' },
	{ code: 'TL', name: 'Timor-Leste' },
	{ code: 'TG', name: 'Togo' },
	{ code: 'TK', name: 'Tokelau' },
	{ code: 'TO', name: 'Tonga' },
	{ code: 'TT', name: 'Trinidad And Tobago' },
	{ code: 'TN', name: 'Tunisia' },
	{ code: 'TR', name: 'Turkey' },
	{ code: 'TM', name: 'Turkmenistan' },
	{ code: 'TC', name: 'Turks And Caicos Islands' },
	{ code: 'TV', name: 'Tuvalu' },
	{ code: 'UG', name: 'Uganda' },
	{ code: 'UA', name: 'Ukraine' },
	{ code: 'AE', name: 'United Arab Emirates' },
	{ code: 'GB', name: 'United Kingdom' },
	{ code: 'US', name: 'United States' },
	{ code: 'UM', name: 'United States Outlying Islands' },
	{ code: 'UY', name: 'Uruguay' },
	{ code: 'UZ', name: 'Uzbekistan' },
	{ code: 'VU', name: 'Vanuatu' },
	{ code: 'VE', name: 'Venezuela' },
	{ code: 'VN', name: 'Vietnam' },
	{ code: 'VG', name: 'Virgin Islands}, British' },
	{ code: 'VI', name: 'Virgin Islands}, U.S.' },
	{ code: 'WF', name: 'Wallis And Futuna' },
	{ code: 'EH', name: 'Western Sahara' },
	{ code: 'YE', name: 'Yemen' },
	{ code: 'ZM', name: 'Zambia' },
	{ code: 'ZW', name: 'Zimbabwe' }
]

export const countries = countriesNoId.map((country, id) => ({ ...country, code: country.code.toLowerCase(), id }))

export const avatars = { k1avatar, k2avatar, k3avatar, k4avatar, k5avatar, k6avatar, k7avatar }

export const languages = ['ru', 'en']

export const products = [
	{
		name: 'K-2',
		id: 16,
		img: robot,
		inactive: false,
		price: 555,
		profit: '7,51%',
		indicators: ['67,62%', '7,51%', '77,7%', '58,08%', '-16%', '-3,18%', '45,1%', '20-50%'],
		icon: k2,
	},
	{
		name: 'K-X',
		img: robot,
		inactive: true
	}
]

export const improvements = [
	{
		id: 20,
		price: 88
	}
]

export const defaultProfileData = {
	nickname: '',
	fullName: '',
	username: '',
	email: '',
	gender: '',
	age: 0,
	country: '',
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
	link: '',
	start: 0,
	daily: 0,
	dailyTime: '',
	video: false
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
			{ completed: false, current: 0, total: 3 },
			{ completed: false, current: 0, total: 5 }
		],
		achievements: [0]
	},
	{
		tasks: [
			{ completed: false, current: 0, total: 5 },
			{ completed: false, current: 0, total: 25 }
		],
		achievements: [0]
	},
	{
		tasks: [
			{ completed: false, current: 0, total: 10 },
			{ completed: false, current: 0, total: 125 },
			{ completed: false, current: 0, total: 2 }
		],
		achievements: [0, 1, 2]
	},
	{
		tasks: [
			{ completed: false, current: 0, total: 20 },
			{ completed: false, current: 0, total: 500 },
			{ completed: false, current: 0, total: 2 },
			{ completed: false, current: 0, total: 1 }
		],
		achievements: [0, 1, 2]
	},
	{
		tasks: [
			{ completed: false, current: 0, total: 25 },
			{ completed: false, current: 0, total: 1500 },
			{ completed: false, current: 0, total: 2 },
			{ completed: false, current: 0, total: 1 },
			{ completed: false, current: 0, total: 1 }
		],
		achievements: [0, 1, 2]
	},
	{
		tasks: [
			{ completed: false, current: 0, total: 30 },
			{ completed: false, current: 0, total: 4000 },
			{ completed: false, current: 0, total: 2 },
			{ completed: false, current: 0, total: 1 },
			{ completed: false, current: 0, total: 1 },
			{ completed: false, current: 0, total: 1 }
		],
		achievements: [0, 1, 2]
	},
	{
		tasks: [
			{ completed: false, current: 0, total: 40 },
			{ completed: false, current: 0, total: 10000 },
			{ completed: false, current: 0, total: 2 },
			{ completed: false, current: 0, total: 1 },
			{ completed: false, current: 0, total: 1 },
			{ completed: false, current: 0, total: 1 },
			{ completed: false, current: 0, total: 1 }
		],
		achievements: [0, 1, 2]
	},
	{}
]

export const bonuses = [1000, 850, 1500, 850, 850, 2500, 850, 850, 5555, 850, 5555, 5555]