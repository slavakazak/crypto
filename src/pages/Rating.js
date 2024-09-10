import { QuestionIcon, TrophyIcon } from "../components/Icons"
import { useTranslation } from 'react-i18next'
import { useState } from "react"
import photo from '../img/photo.png'
import RatingTab from "../components/RatingTab"
import TabMenu from "../components/TabMenu"

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

	const my = [
		{ username: 'Гарелов Дмитрий', nomination: t('rating.god'), date: '08.2024', level: 3, result: 12, number: 0 },
		{ username: 'Гарелов Дмитрий', nomination: t('rating.travel'), date: '08.2024', level: 3, result: 38, days: true, number: 1 },
	]

	return (
		<div id="rating">
			<div className="head">
				<h1>Рейтинг лидеров</h1>
				<div className="right-side">
					<div className={'button' + (myRating ? ' active' : '')} onClick={() => setMyRating(previous => !previous)}><TrophyIcon size={24} /></div>
					<div className="button"><QuestionIcon size={22} /></div>
				</div>
			</div>
			<div className="god-of-sales-block">
				<div className="left-side">
					<img src={photo} alt="name" />
					<div>
						<p className="name">Иванов Иван</p>
						<p className="title">{t('rating.god')} {t('rating.august')}!</p>
					</div>
				</div>
				<div className="right-side">
					<p className="result">{t('rating.result')}:</p>
					<p className="value">12</p>
				</div>
			</div>
			{!myRating && <>
				<TabMenu pages={pages} page={page} setPage={setPage} />
				{page === 'god' && <RatingTab items={gods} />}
				{page === 'income' && <RatingTab items={income} />}
				{page === 'invitations' && <RatingTab items={invitations} />}
				{page === 'travel' && <RatingTab items={travel} />}
				{page === 'records' && <div className="tab">{t('rating.records')}</div>}
			</>}
			{myRating && <>
				<TabMenu pages={myPages} page={myPage} setPage={setMyPage} />
				{myPage === 'my' && <RatingTab items={my} />}
				{myPage === 'command' && <div className="tab">{t('rating.command')}</div>}
			</>}
		</div>
	)
}