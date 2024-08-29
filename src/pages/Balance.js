import { CoinIcon, CrossIcon, DollarIcon, FilterIcon, InfoIcon, SearchIcon, TokenIcon } from "../components/Icons"
import Modal from "../components/Modal"
import { useRef, useState } from "react";

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

	const [searchActive, setSearchActive] = useState(false)
	const [search, setSearch] = useState('')
	const searchRef = useRef(null)

	function openSearch() {
		setSearchActive(true)
		searchRef.current.focus()
	}

	function closeSearch() {
		setSearchActive(false)
		searchRef.current.blur()
	}

	return (
		<>
			<div id="balance">
				<div className="head">
					<h1>Баланс</h1>
					<div className="info"><InfoIcon /></div>
				</div>
				<div className="sub-title">
					<span>Кошельки</span>
					<div className="info"><InfoIcon size={10} /></div>
				</div>
				<div className="wallets">
					<div className="wallet">
						<div className="currency">
							<div className="icon"><TokenIcon /></div>
							<span>Token:</span>
						</div>
						<div className="value">18895</div>
					</div>
					<div className="wallet">
						<div className="currency">
							<div className="icon"><CoinIcon /></div>
							<span>Coin:</span>
						</div>
						<div className="value">500</div>
					</div>
					<div className="wallet">
						<div className="currency">
							<div className="icon"><DollarIcon /></div>
							<span>USDT:</span>
						</div>
						<div className="value">10</div>
					</div>
				</div>
				<div className="withdrawal">ВЫВОД</div>
				<div className="search-row">
					<h2 className={searchActive ? 'hidden' : ''}>Транзакции</h2>
					<div className={'search-wrapper' + (searchActive ? ' active' : '')}>
						<input ref={searchRef} type="text" className="search" placeholder="Введите тип, дату или сумму" onChange={e => setSearch(e.target.value)} value={search} />
						<div className="search-button" onClick={openSearch}><SearchIcon /></div>
						<div className="cross-button" onClick={closeSearch}><CrossIcon /></div>
					</div>
					<div className="filter-button"><FilterIcon /></div>
				</div>
			</div>
			<Modal active={modal} onClose={() => setModal(false)} title={modalTitle} text={modalText} type={modalType} />
		</>
	)
}