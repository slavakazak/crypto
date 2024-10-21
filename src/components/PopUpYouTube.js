import { useEffect, useState, useRef, useContext } from "react"
import { CrossIcon, TokenIcon, YouTubeIcon } from "./Icons"
import { useTranslation } from 'react-i18next'
import { HeightContext } from "../context/HeightProvider"
import { DataContext } from "../context/DataProvider"
import { AuthContext } from "../context/AuthProvider"
import addWpBalance from "../utils/addWpBalance"

export default function PopUpYouTube({ active, onClose, title, description, bonus }) {
	const { t } = useTranslation()
	const { height, maxHeight } = useContext(HeightContext)
	const { auth } = useContext(AuthContext)
	const { setData, profileData, wpId } = useContext(DataContext)
	const [animation, setAnimation] = useState(false)

	useEffect(() => {
		if (active) setAnimation(true)
	}, [active])

	const [viewedTime, setViewedTime] = useState(0) // Хранит время просмотра
	const [lastUpdateTime, setLastUpdateTime] = useState(0) // Хранит последнее время обновления
	const [previousTime, setPreviousTime] = useState(0) // Хранит предыдущее время для сравнения
	const videoRef = useRef(null)

	const [take, setTake] = useState(false)

	// Обработчик обновления времени
	const handleTimeUpdate = () => {
		const video = videoRef.current;
		if (video) {
			const currentTime = video.currentTime
			// Если время идёт плавно (без перемотки вперёд)
			if (currentTime > previousTime && currentTime - previousTime <= 1) {
				const elapsedTime = currentTime - lastUpdateTime
				setViewedTime((prev) => prev + elapsedTime) // Добавляем только реальное время просмотра
			}
			// Обновляем последнее известное время
			setLastUpdateTime(currentTime)
			setPreviousTime(currentTime)

			if (viewedTime > 360 && !profileData.video) {
				setTake(true)
			}
		}
	}

	// Запуск обработки при начале воспроизведения
	const handlePlay = () => {
		setLastUpdateTime(videoRef.current.currentTime)
		setPreviousTime(videoRef.current.currentTime)
	}

	// Прерывание воспроизведения
	const handlePause = () => {
		handleTimeUpdate() // Убедиться, что время обновлено до паузы
	}

	// При завершении видео
	const handleEnded = () => {
		handleTimeUpdate() // Обновить время просмотра до конца
	}

	async function takeClickHandler() {
		if (take && !profileData.video) {
			setTake(false)
			setViewedTime(0)
			await setData({ video: true })
			await addWpBalance(auth, wpId, bonus, 'token', 'Просмотр видео')
		}
	}

	return (
		<div
			className={"pop-up-wrapper pop-up-youtube" + (active ? ' active' : '') + (animation || active ? ' animate' : '')}
			onClick={onClose}
			style={{ height: maxHeight ? maxHeight + 'px' : '100vh' }}
		>
			<div
				className='pop-up'
				onClick={e => e.stopPropagation()}
				style={{ backgroundImage: 'url(/img/pop-up-bg.png)', paddingBottom: maxHeight - height < 150 ? '78px' : (maxHeight - height + 78) + 'px' }}
			>
				<div className="cross" onClick={onClose}><CrossIcon /></div>
				<div className="icon"><YouTubeIcon size={138} /></div>
				<h2>{title}</h2>
				<p className="description">{description}</p>
				{/* <div className="see-video">{t('task.see')}</div> */}
				<video
					ref={videoRef}
					src="/video/what_is_robot.mov"
					width="100%"
					controls
					onTimeUpdate={handleTimeUpdate} // Обновляем время при каждом изменении
					onPlay={handlePlay}             // Фиксируем начало воспроизведения
					onPause={handlePause}           // Фиксируем приостановку
					onEnded={handleEnded}           // Обрабатываем завершение видео
					controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
					disableRemotePlayback
				/>
				{/* <p>Просмотрено времени: {Math.round(viewedTime)} секунд</p> */}
				<div className="bonus"><span className="text">{t('task.reward')}:</span><TokenIcon size={33} /><span className="value">+{bonus}</span></div>
				{/* <div className="check">{t('task.check')}</div> */}
				<div className={'take' + (take && !profileData.video ? '' : ' inactive')} onClick={takeClickHandler}>{t('task.take')}</div>
			</div>
		</div>
	)
}