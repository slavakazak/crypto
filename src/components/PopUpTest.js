import { useEffect, useState, useContext } from "react"
import { LevelsContext } from '../context/LevelsProvider'
import { CrossIcon, OkIcon } from "./Icons"
import { useTranslation } from 'react-i18next'
import { HeightContext } from "../context/HeightProvider"

export default function PopUpTest({ active, onClose }) {
	const { t } = useTranslation()
	const { height, maxHeight } = useContext(HeightContext)
	const { setTasks, checkLevel } = useContext(LevelsContext)
	const [animation, setAnimation] = useState(false)

	useEffect(() => {
		if (active) setAnimation(true)
	}, [active])

	const [questions, setQuestions] = useState([
		{ number: 1, right: false, ans: 1 },
		{ number: 2, right: false, ans: 1 },
		{ number: 3, right: false, ans: 1 },
		{ number: 4, right: false, ans: 1 },
		{ number: 5, right: false, ans: 1 },
		{ number: 6, right: false, ans: 1 },
		{ number: 7, right: false, ans: 0 },
		{ number: 8, right: false, ans: 1 },
		{ number: 9, right: false, ans: 1 },
		{ number: 10, right: false, ans: 1 },
		{ number: 11, right: false, ans: 1 },
		{ number: 12, right: false, ans: 1 },
		{ number: 13, right: false, ans: 1 },
		{ number: 14, right: false, ans: 1 },
		{ number: 15, right: false, ans: 1 },
		{ number: 16, right: false, ans: 1 },
		{ number: 17, right: false, ans: 1 },
		{ number: 18, right: false, ans: 1 },
		{ number: 19, right: false, ans: 2 },
		{ number: 20, right: false, ans: 1 },
		{ number: 21, right: false, ans: 1 },
		{ number: 22, right: false, ans: 1 },
		{ number: 23, right: false, ans: 1 },
		{ number: 24, right: false, ans: 1 },
		{ number: 25, right: false, ans: 1 },
		{ number: 26, right: false, ans: 1 },
		{ number: 27, right: false, ans: 1 },
		{ number: 28, right: false, ans: 0 },
		{ number: 29, right: false, ans: 1 },
		{ number: 30, right: false, ans: 1 },
		{ number: 31, right: false, ans: 1 },
		{ number: 32, right: false, ans: 1 },
		{ number: 33, right: false, ans: 1 },
		{ number: 34, right: false, ans: 1 },
		{ number: 35, right: false, ans: 1 },
		{ number: 36, right: false, ans: 1 },
		{ number: 37, right: false, ans: 1 },
		{ number: 38, right: false, ans: 2 },
		{ number: 39, right: false, ans: 2 },
		{ number: 40, right: false, ans: 2 },
		{ number: 41, right: false, ans: 2 },
		{ number: 42, right: false, ans: 0 },
		{ number: 43, right: false, ans: 3 },
	])
	const [current, setCurrent] = useState(1)
	const [currentAnswer, setCurrentAnswer] = useState(null)

	function nextClickHandler() {
		setQuestions(previous => previous.map(item => {
			if (item.number === current) {
				return { ...item, right: item.ans === currentAnswer }
			}
			return item
		}))
		setCurrent(previous => previous + 1)
		setCurrentAnswer(null)
	}

	useEffect(() => {
		async function init() {
			if (questions.filter(item => item.right).length / 43 >= 0.9) {
				await setTasks(2, 0)
				await checkLevel()
			}
		}
		init()
	}, [questions])

	return (
		<div
			className={"pop-up-wrapper pop-up-test" + (active ? ' active' : '') + (animation || active ? ' animate' : '')}
			onClick={onClose}
			style={{ height: maxHeight ? maxHeight + 'px' : '100vh' }}
		>
			<div
				className={'pop-up pop-up-full'}
				onClick={e => e.stopPropagation()}
				style={{ backgroundImage: 'url(/img/pop-up-bg.png)', paddingBottom: maxHeight - height < 150 ? '42px' : (maxHeight - height + 42) + 'px' }}
			>
				<div className="cross" onClick={() => { onClose(); setCurrent(1) }}><CrossIcon /></div>
				<h2>{t('test.title')}</h2>
				<p className="description">{t('test.description')}</p>
				{current <= 43 && <p className="text">{t('test.question')} {current}/43</p>}
				{current <= 43 &&
					questions.map(item => (
						<div key={item.number} className={'question-block' + (item.number === current ? ' active' : '')}>
							<div className="question">{item.number}. {t(`test.questions.${item.number}.text`)}</div>
							<p className="text">{t('test.variants')}</p>
							<div className="variants">
								<div className={'variant' + (currentAnswer === 0 ? ' active' : '')} onClick={() => setCurrentAnswer(0)}>
									<span>{'A)'} {t(`test.questions.${item.number}.a`)}</span>
									{currentAnswer === 0 && <OkIcon />}
								</div>
								<div className={'variant' + (currentAnswer === 1 ? ' active' : '')} onClick={() => setCurrentAnswer(1)}>
									<span>{'B)'} {t(`test.questions.${item.number}.b`)}</span>
									{currentAnswer === 1 && <OkIcon />}
								</div>
								<div className={'variant' + (currentAnswer === 2 ? ' active' : '')} onClick={() => setCurrentAnswer(2)}>
									<span>{'C)'} {t(`test.questions.${item.number}.c`)}</span>
									{currentAnswer === 2 && <OkIcon />}
								</div>
								<div className={'variant' + (currentAnswer === 3 ? ' active' : '')} onClick={() => setCurrentAnswer(3)}>
									<span>{'D)'} {t(`test.questions.${item.number}.d`)}</span>
									{currentAnswer === 3 && <OkIcon />}
								</div>
							</div>
							<div className="button-wrapper">
								<div className="test-button" onClick={nextClickHandler}>{t('test.next')}</div>
							</div>
						</div>
					))
				}
				{current === 44 && (questions.filter(item => item.right).length / 43 >= 0.9 ? <>
					<h3>{t('test.congratulations')}</h3>
					<h3>{t('test.passed')}</h3>
					<div className="result"><span>{t('test.result')}:</span><span>{Math.floor(questions.filter(item => item.right).length / 43 * 100)}%</span></div>
					<div className="button-wrapper">
						<div className="test-button" onClick={() => { onClose(); setCurrent(1) }}>{t('test.thankYou')}</div>
					</div>
				</> : <>
					<h3>{t('test.failed')}</h3>
					<div className="result"><span>{t('test.result')}:</span><span>{Math.floor(questions.filter(item => item.right).length / 43 * 100)}%</span></div>
					<div className="errors">{t('test.errors')}: {questions.filter(item => !item.right).map(item => item.number).join(', ')}</div>
					<div className="button-wrapper">
						<div className="test-button" onClick={() => setCurrent(1)}>{t('test.again')}</div>
					</div>
				</>)}
			</div>
		</div>
	)
}