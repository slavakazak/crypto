import { QuestionIcon, TrophyIcon } from "../components/Icons"
import { useTranslation } from 'react-i18next'
import { useState, useContext, useEffect } from "react"
import photo from '../img/photo1.jpeg'
import RatingTab from "../components/RatingTab"
import TabMenu from "../components/TabMenu"
import Slider from "react-slick"
import DayString from "../components/DayString"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthProvider"
import getGodsTop from "../utils/getGodsTop"
import getIncomeTop from "../utils/getIncomeTop"
import getInvitationsTop from "../utils/getInvitationsTop"


export default function Rating() {
	const { t } = useTranslation()
	const { auth } = useContext(AuthContext)

	const pages = [
		{ value: 'god', text: t('rating.god') },
		{ value: 'income', text: t('rating.income') },
		{ value: 'invitations', text: t('rating.invitations') },
		// { value: 'travel', text: t('rating.travel') },
		// { value: 'records', text: t('rating.records') }
	]
	const myPages = [
		{ value: 'my', text: t('rating.my') },
		{ value: 'command', text: t('rating.command') }
	]
	const [page, setPage] = useState('god')
	const [myRating, setMyRating] = useState(false)
	const [myPage, setMyPage] = useState('my')

	const [gods, setGods] = useState([])
	const [income, setIncome] = useState([])
	const [invitations, setInvitations] = useState([])

	useEffect(() => {
		if (!auth) return
		async function init() {
			const newGods = await getGodsTop(auth)
			setGods(newGods)
			const newIncome = await getIncomeTop(auth)
			setIncome(newIncome)
			const newInvitations = await getInvitationsTop(auth)
			setInvitations(newInvitations)
		}
		init()
	}, [auth])

	const travel = [
		{ username: 'Иванов Иван', level: 3, result: 40, days: true, photo },
		{ username: 'Иванов Иван', level: 3, result: 42, days: true, photo },
		{ username: 'Иванов Иван', level: 3, result: 45, days: true, photo },
		{ username: 'Иванов Иван', level: 3, result: 48, days: true, photo },
		{ username: 'Иванов Иван', level: 3, result: 55, days: true, photo }
	]

	const records = [
		{ username: 'Гарелов Дмитрий', nomination: t('rating.god'), date: '08.2024', level: 3, result: 12, number: 0, photo },
		{ username: 'Гарелов Дмитрий', nomination: t('rating.travel'), date: '08.2024', level: 3, result: 38, days: true, number: 1, photo },
	]

	const my = [
		{ username: 'Гарелов Дмитрий', nomination: t('rating.god'), date: '08.2024', level: 3, result: 12, number: 0, photo },
		{ username: 'Гарелов Дмитрий', nomination: t('rating.travel'), date: '08.2024', level: 3, result: 38, days: true, number: 1, photo },
	]

	const command = [
		{ username: 'Гарелов Дмитрий', nomination: t('rating.god'), date: '08.2024', level: 3, result: 12, number: 0, photo },
		{ username: 'Гарелов Дмитрий', nomination: t('rating.travel'), date: '08.2024', level: 3, result: 38, days: true, number: 1, photo },
	]

	const settingsSlider = {
		dots: false,
		infinite: true,
		speed: 200,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000
	}

	const slides = [
		{ username: "Евгений Песецкий", nomination: t('rating.god'), photo, result: 12 },
		{ username: "Евгений Песецкий", nomination: t('rating.income'), photo, result: 33800 },
		// { username: "Евгений Песецкий", nomination: t('rating.invitations'), photo, result: 12 },
		// { username: "Евгений Песецкий", nomination: t('rating.travel'), photo, result: 12, days: true }
	]

	return (
		<div id="rating">
			<div className="head animate__animated animate__zoomIn">
				<h1>{t('rating.title')}</h1>
				<div className="right-side">
					<div className={'button' + (myRating ? ' active' : '')}><TrophyIcon size={24} /></div>
					{/* <div className={'button' + (myRating ? ' active' : '')} onClick={() => setMyRating(previous => !previous)}><TrophyIcon size={24} /></div> */}
					<Link to={'/faq-rating'} className="button"><QuestionIcon size={22} /></Link>
				</div>
			</div>
			<Slider {...settingsSlider} className="slider animate__animated animate__bounceInRight">
				{slides.map((slide, i) => (
					<div key={i} className="slide">
						<div className="content">
							<div className="left-side">
								<img src={slide.photo} alt={slide.username} />
								<div>
									<p className="name">{slide.username}</p>
									<p className="title">{slide.nomination} {t('rating.august')}!</p>
								</div>
							</div>
							<div className="right-side">
								<p className="result">{t('rating.result')}:</p>
								<p className="value">{slide.result}{slide.days && <DayString number={slide.result} />}</p>
							</div>
						</div>
					</div>
				))}
			</Slider>
			<div className="animate__animated animate__zoomIn">
				{!myRating && <>
					<TabMenu pages={pages} page={page} setPage={setPage} />
					{page === 'god' && <RatingTab items={gods} />}
					{page === 'income' && <RatingTab items={income} />}
					{page === 'invitations' && <RatingTab items={invitations} />}
					{/* {page === 'travel' && <RatingTab items={travel} />}
				{page === 'records' && <RatingTab items={records} />} */}
				</>}
				{myRating && <>
					<TabMenu pages={myPages} page={myPage} setPage={setMyPage} />
					{myPage === 'my' && <RatingTab items={my} />}
					{myPage === 'command' && <RatingTab items={command} />}
				</>}
			</div>
		</div>
	)
}