import { InfoIcon } from "../components/Icons"
import Modal from "../components/Modal"
import { useState } from "react";

export default function Balance() {
	const [modal, setModal] = useState(false)
	const [modalTitle, setModalTitle] = useState('')
	const [modalText, setModalText] = useState('')
	const [modalType, setModalType] = useState('')

	function openModal(title, text, type = '') {
		setModalTitle(title)
		setModalText(text)
		setModalType(type)
		setModal(true)
	}

	return (
		<>
			<div id="balance">
				<div className="head">
					<h1>Баланс</h1>
					<div className="info" onClick={() => openModal('Заголовок', 'текст', 'error')} ><InfoIcon /></div>
				</div>
			</div>
			<Modal active={modal} onClose={() => setModal(false)} title={modalTitle} text={modalText} type={modalType} />
		</>
	)
}