import { InfoIcon, OkIcon } from "./Icons"
import Modal from "./Modal"
import { useState } from "react"
import { useTranslation } from 'react-i18next'

export default function Tack({ number, current, total, reference, text, completed }) {
	const { t } = useTranslation()

	const [modal, setModal] = useState(false)
	const [modalText, setModalText] = useState('')

	function openModal(text) {
		setModalText(text)
		setModal(true)
	}

	const progress = current / total * 100
	return (
		<>
			<div className={'task' + (total ? '' : ' text-only') + (completed ? ' inactive' : '')}>
				<div className='overlay' />
				<div className='number'>{number}</div>
				<div className='content'>
					<p className='text'>{text}{reference && <span className='info' onClick={() => openModal(reference)}><InfoIcon /></span>}</p>
					{total && <>
						<div className='progress-bar'><div className='line' style={{ width: progress > 100 ? '100%' : progress + '%' }} /></div>
						<div className='number-row'>
							<span className='start' style={{ display: progress < 5 ? 'none' : 'block' }}>0</span>
							<span className='current' style={{ left: progress < 1 ? '1%' : progress > 98 ? '98%' : progress + '%' }}>{current}</span>
							<span className='end' style={{ display: progress > 91 ? 'none' : 'block' }}>{total}</span>
						</div>
					</>}
				</div>
				<div className={'check' + (completed ? ' active' : '')}><OkIcon size={11} /></div>
			</div>

			<Modal active={modal} onClose={() => setModal(false)} title={t('modal.reference')} text={modalText} />
		</>
	)
}