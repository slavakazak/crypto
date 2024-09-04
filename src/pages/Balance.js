import { AccrualIcon, CoinIcon, CrossIcon, DollarIcon, FilterIcon, InfoIcon, PurchaseIcon, RightArrowIcon, SearchIcon, SwaplIcon, TokenIcon, WithdrawalIcon } from "../components/Icons"
import Modal from "../components/Modal"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from 'react-i18next'
import addTransaction from "../utils/addTransaction"
import getUTCTime from "../utils/getUTCTime"
import getTransactions from "../utils/getTransactions"
import { products } from '../utils/constants'

export default function Balance({ profileData, wpId }) {
	const { t } = useTranslation()
	const [modal, setModal] = useState(false)
	const [modalTitle, setModalTitle] = useState('')
	const [modalText, setModalText] = useState('')
	const [modalType, setModalType] = useState('')

	const token = 0
	const coin = 0
	const usdt = 0

	const [transactionsDates, setTransactionsDates] = useState(null)

	useEffect(() => {
		// const transactionData = {
		// 	user_id: 44,
		// 	transaction_type: 'purchase', //accrual, swap, withdrawal, purchase
		// 	transaction_status: 'success', //success, processing, error
		// 	price: 99.99,
		// 	currency: 'USDT', //USDT, coin, token
		// 	product_id: 12345, //для purchase
		// 	original_price: 999.9, //для swap
		// 	original_currency: 'coin', //для swap
		// 	comment: 'Первый заказ пользователя',
		// 	transaction_time: getUTCTime() //YYYY-MM-DD HH:MM:SS по UTS+0
		// }
		setTransactionsDates(null)
		async function init() {
			const transactions = await getTransactions(wpId)
			const groupedTransactions = {}
			await transactions.forEach(async transaction => {
				const date = transaction.transaction_time.split(' ')[0]
				if (!groupedTransactions[date]) {
					groupedTransactions[date] = []
				}
				groupedTransactions[date].push(transaction)
			})
			setTransactionsDates(groupedTransactions)
		}
		init()
	}, [wpId])

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

	function getTypeIcon(type) {
		if (type === 'accrual') return <AccrualIcon />
		if (type === 'swap') return <SwaplIcon />
		if (type === 'withdrawal') return <WithdrawalIcon />
		if (type === 'purchase') return <PurchaseIcon />
		return ''
	}

	function getType(type, productId) {
		if (type === 'accrual') return t('balance.type.accrual')
		if (type === 'swap') return t('balance.type.swap')
		if (type === 'withdrawal') return t('balance.type.withdrawal')
		if (type === 'purchase') {
			const product = products.find(item => item?.id === +productId)
			return `${t('balance.type.purchase')} ${product?.name}`
		}
		return ''
	}

	function getStatus(status) {
		if (status === 'success') return <span className="success">{t('balance.status.success')}</span>
		if (status === 'error') return <span className="error">{t('balance.status.error')}</span>
		if (status === 'processing') return <span className="processing">{t('balance.status.processing')}</span>
		return ''
	}

	function getIcon(currency) {
		if (currency === 'USDT') return <DollarIcon />
		if (currency === 'coin') return <CoinIcon />
		if (currency === 'token') return <TokenIcon />
		return ''
	}

	return (
		<>
			<div id="balance">
				<div className="head">
					<h1>{t('balance.balance')}</h1>
					<div className="info"><InfoIcon size={18} /></div>
				</div>
				<div className="sub-title">
					<span>{t('balance.wallets')}</span>
					<div className="info"><InfoIcon size={10} /></div>
				</div>
				<div className="wallets">
					<div className="wallet">
						<div className="currency">
							<div className="icon token"><TokenIcon /></div>
							<span>{t('balance.token')}:</span>
						</div>
						<div className="value">{profileData.token}</div>
					</div>
					<div className="wallet">
						<div className="currency">
							<div className="icon"><CoinIcon /></div>
							<span>{t('balance.coin')}:</span>
						</div>
						<div className="value">{profileData.coin}</div>
					</div>
					<div className="wallet">
						<div className="currency">
							<div className="icon"><DollarIcon /></div>
							<span>{t('balance.usdt')}:</span>
						</div>
						<div className="value">{profileData.usdt}</div>
					</div>
				</div>
				<div className={'withdrawal' + (usdt > 0 ? ' active' : '')}>{t('balance.withdrawal')}</div>
				<div className="search-row">
					<h2 className={searchActive ? 'hidden' : ''}>{t('balance.transactions')}</h2>
					<div className={'search-wrapper' + (searchActive ? ' active' : '')}>
						<input ref={searchRef} type="text" className="search" placeholder={t('balance.search')} onChange={e => setSearch(e.target.value)} value={search} />
						<div className="search-button" onClick={openSearch}><SearchIcon /></div>
						<div className="cross-button" onClick={closeSearch}><CrossIcon /></div>
					</div>
					<div className="filter-button"><FilterIcon /></div>
				</div>
				<div className="transactions">
					{!transactionsDates ? t('addAvatar.loading') :
						Object.keys(transactionsDates).map((item, i) => {
							const date = new Date(item + 'T00:00:00Z')
							const dateFormat = new Intl.DateTimeFormat(profileData.language.tag, { month: "long", day: "numeric" })
							return (
								<div key={i}>
									<div className="date">{dateFormat.format(date)}</div>
									<div className="transactions-block">
										{transactionsDates[item].map((transaction, i) => {
											const dateTime = new Date(transaction.transaction_time.replace(' ', 'T') + 'Z')
											const dateTimeFormat = new Intl.DateTimeFormat(profileData.language.tag, { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })
											return (
												<div key={i} className="transaction">
													<div className="right-side">
														<div className="icon">{getTypeIcon(transaction.transaction_type)}</div>
														<div className="info-block">
															<div className="type">{getType(transaction.transaction_type, transaction.product_id)}</div>
															<div className="time">{dateTimeFormat.format(dateTime)}</div>
															<div className="status">{t('balance.status.text')}: {getStatus(transaction.transaction_status)}</div>
														</div>
													</div>
													<div className="left-side">
														{transaction.original_price && <>
															<div className="price">
																<span>{Math.round(transaction.original_price)}</span>
																<div className="icon">{getIcon(transaction.original_currency)}</div>
															</div>
															<div className="arrow"><RightArrowIcon /></div>
														</>}
														<div className="price">
															<span>{Math.round(transaction.price)}</span>
															<div className="icon">{getIcon(transaction.currency)}</div>
														</div>
													</div>
												</div>
											)
										})}
									</div>
								</div>
							)
						})}
				</div>
			</div>
			<Modal active={modal} onClose={() => setModal(false)} title={modalTitle} text={modalText} type={modalType} />
		</>
	)
}