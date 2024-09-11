import { QuestionIcon, TrophyIcon } from "../components/Icons"
import { useTranslation } from 'react-i18next'
import { useState } from "react"
import photo from '../img/photo.png'
import RatingTab from "../components/RatingTab"
import TabMenu from "../components/TabMenu"
import Slider from "react-slick"
import DayString from "../components/DayString"
import { Link } from "react-router-dom"

export default function Rating() {
	const { t } = useTranslation()

	const pages = [
		{ value: 'god', text: t('rating.god') },
		{ value: 'income', text: t('rating.income') },
		{ value: 'invitations', text: t('rating.invitations') },
		{ value: 'travel', text: t('rating.travel') },
		{ value: 'records', text: t('rating.records') }
	]
	const myPages = [
		{ value: 'my', text: t('rating.my') },
		{ value: 'command', text: t('rating.command') }
	]
	const [page, setPage] = useState('god')
	const [myRating, setMyRating] = useState(false)
	const [myPage, setMyPage] = useState('my')

	const gods = [
		{ username: 'Иванов Иван', level: 3, result: 12 },
		{ username: 'Иванов Иван', level: 3, result: 10 },
		{ username: 'Иванов Иван', level: 3, result: 8 },
		{ username: 'Иванов Иван', level: 3, result: 3 },
		{ username: 'Иванов Иван', level: 3, result: 3 }
	]

	const income = [
		{ username: 'Иванов Иван', level: 3 },
		{ username: 'Иванов Иван', level: 3 },
		{ username: 'Иванов Иван', level: 3 },
		{ username: 'Иванов Иван', level: 3 },
		{ username: 'Иванов Иван', level: 3 }
	]

	const invitations = [
		{ username: 'Иванов Иван', level: 3, result: 12 },
		{ username: 'Иванов Иван', level: 3, result: 10 },
		{ username: 'Иванов Иван', level: 3, result: 8 },
		{ username: 'Иванов Иван', level: 3, result: 3 },
		{ username: 'Иванов Иван', level: 3, result: 3 }
	]

	const travel = [
		{ username: 'Иванов Иван', level: 3, result: 40, days: true },
		{ username: 'Иванов Иван', level: 3, result: 42, days: true },
		{ username: 'Иванов Иван', level: 3, result: 45, days: true },
		{ username: 'Иванов Иван', level: 3, result: 48, days: true },
		{ username: 'Иванов Иван', level: 3, result: 55, days: true }
	]

	const records = [
		{ username: 'Гарелов Дмитрий', nomination: t('rating.god'), date: '08.2024', level: 3, result: 12, number: 0 },
		{ username: 'Гарелов Дмитрий', nomination: t('rating.travel'), date: '08.2024', level: 3, result: 38, days: true, number: 1 },
	]

	const my = [
		{ username: 'Гарелов Дмитрий', nomination: t('rating.god'), date: '08.2024', level: 3, result: 12, number: 0 },
		{ username: 'Гарелов Дмитрий', nomination: t('rating.travel'), date: '08.2024', level: 3, result: 38, days: true, number: 1 },
	]

	const command = [
		{ username: 'Гарелов Дмитрий', nomination: t('rating.god'), date: '08.2024', level: 3, result: 12, number: 0 },
		{ username: 'Гарелов Дмитрий', nomination: t('rating.travel'), date: '08.2024', level: 3, result: 38, days: true, number: 1 },
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
		{ username: "Иванов Иван", nomination: t('rating.god'), photo, result: 12 },
		{ username: "Иванов Иван", nomination: t('rating.income'), photo, result: 12 },
		{ username: "Иванов Иван", nomination: t('rating.invitations'), photo, result: 12 },
		{ username: "Иванов Иван", nomination: t('rating.travel'), photo, result: 12, days: true }
	]

	return (
		<div id="rating">
			<div className="head">
				<h1>{t('rating.title')}</h1>
				<div className="right-side">
					<div className={'button' + (myRating ? ' active' : '')} onClick={() => setMyRating(previous => !previous)}><TrophyIcon size={24} /></div>
					<Link to={'/faq-rating'} className="button"><QuestionIcon size={22} /></Link>
				</div>
			</div>
			<Slider {...settingsSlider} className="slider">
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
			{!myRating && <>
				<TabMenu pages={pages} page={page} setPage={setPage} />
				{page === 'god' && <RatingTab items={gods} />}
				{page === 'income' && <RatingTab items={income} />}
				{page === 'invitations' && <RatingTab items={invitations} />}
				{page === 'travel' && <RatingTab items={travel} />}
				{page === 'records' && <RatingTab items={records} />}
			</>}
			{myRating && <>
				<TabMenu pages={myPages} page={myPage} setPage={setMyPage} />
				{myPage === 'my' && <RatingTab items={my} />}
				{myPage === 'command' && <RatingTab items={command} />}
			</>}
		</div>
	)
}