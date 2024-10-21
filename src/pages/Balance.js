import { AccrualIcon, CoinIcon, CrossIcon, DollarIcon, FilterIcon, InfoIcon, PurchaseIcon, RightArrowIcon, SearchIcon, SwaplIcon, TokenIcon, WithdrawalIcon, RefreshIcon } from "../components/Icons"
import Modal from "../components/Modal"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from 'react-i18next'
import addTransaction from "../utils/addTransaction"
import getUTCTime from "../utils/getUTCTime"
import getTransactions from "../utils/getTransactions"
import { products } from '../utils/constants'
import { useContext } from "react"
import { DataContext } from "../context/DataProvider"
import { AuthContext } from "../context/AuthProvider"
import Back from "../components/Back"
import PopUp from "../components/PopUp"

export default function Balance() {
	const { t } = useTranslation()
	const { profileData, wpId, setData } = useContext(DataContext)
	const { auth } = useContext(AuthContext)

	const [modal, setModal] = useState(false)
	const [modalTitle, setModalTitle] = useState('')
	const [modalContent, setModalContent] = useState('')
	const [modalType, setModalType] = useState('')

	function openModal(title, content, type = '') {
		setModalTitle(title)
		setModalContent(content)
		setModalType(type)
		setModal(true)
	}

	function balanceInfoHandler() {
		openModal(t('modal.reference'), <>
			<p>{t('balance.balanceModal.text1')}</p>
			<br />
			<p>{t('balance.balanceModal.text2')} <CoinIcon size={10} /> {t('balance.balanceModal.text3')}</p>
			<br />
			<p>{t('balance.balanceModal.text4')} 00.00 <CoinIcon size={10} /> {t('balance.balanceModal.text5')} <DollarIcon size={12} /> Usdt.</p>
			<br />
			<p>{t('balance.balanceModal.text6')}: 10:1.</p>
			<br />
			<p>{t('balance.balanceModal.text7')}</p>
			<br />
			<p>{t('balance.balanceModal.text8')}</p>
		</>)
	}

	function walletsInfoHandler() {
		openModal(t('modal.reference'), <>
			<p>{t('balance.walletsModal.text1')}</p>
			<br />
			<p>1. <TokenIcon size={11} /> TOKEN - {t('balance.walletsModal.text2')}</p>
			<br />
			<p>2. <CoinIcon size={10} /> COIN - {t('balance.walletsModal.text3')}</p>
			<br />
			<p>3. <DollarIcon size={12} /> USDT - {t('balance.walletsModal.text4')}</p>
			<br />
			<p>{t('balance.walletsModal.text5')} COIN -&gt; USDT - 10:1.</p>
		</>)
	}

	const [transactionsDates, setTransactionsDates] = useState(null)

	async function updateTransactions() {
		if (!auth) return
		setTransactionsDates(null)
		const transactions = await getTransactions(auth, wpId)
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

	useEffect(() => {
		if (!wpId) return
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
		async function init() {
			await updateTransactions()
		}
		init()
	}, [wpId])

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

	function getType(type, productId, partnerName, comment) {
		if (type === 'accrual') {
			if (partnerName) return t('balance.type.accrual') + ' ' + t('balance.type.from') + ' ' + partnerName
			if (comment && comment.includes('Ежедневная активность')) return t('balance.type.accrual') + ' ' + t('balance.type.daily')
			if (comment && comment.includes('Просмотр видео')) return t('balance.type.accrual') + ' ' + t('balance.type.video')
			return t('balance.type.accrual')
		}
		if (type === 'swap') return t('balance.type.swap')
		if (type === 'withdrawal') return t('balance.type.withdrawal')
		if (type === 'purchase') {
			const product = products.find(item => item?.id === +productId)
			return `${t('balance.type.purchase')} ${product?.name || t('workshop.strokeShort')}`
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

	async function refresh() {
		await updateTransactions()
		await setData({})
	}


	const [popUpWithdrawal, setPopUpWithdrawal] = useState(false)
	const [wallet, setWallet] = useState(profileData.wallet)
	const [pin, setPin] = useState()

	function openWithdrawal() {
		if (profileData.usdt < 50) return
		setPopUpWithdrawal(true)
	}

	async function withdrawalClickHandler() {
		if (profileData.usdt < 50) return
		if (!wallet || !/^0x[a-fA-F0-9]{40}$/.test(wallet.trim())) {
			openModal(t('modal.error'), t('settings.messages.invalidWallet'), 'error')
			return
		}
		if (pin !== profileData.pin) {
			openModal(t('modal.error'), t('settings.messages.invalidPIN'), 'error')
			return
		}

		const transactionData = {
			user_id: wpId,
			transaction_type: 'withdrawal',
			transaction_status: 'processing',
			price: profileData.usdt,
			currency: 'USDT',
			comment: profileData.wallet,
			transaction_time: getUTCTime()
		}
		await addTransaction(auth, transactionData)
		await setData({ usdt: 0 })

		openModal(t('modal.reference'), () => <div>{t('balance.successModalText')} <span onClick={() => setModal(false)}>{t('balance.transactions')}</span>.</div>, 'success')

		setPopUpWithdrawal(false)
	}

	useEffect(() => {
		setWallet(profileData.wallet)
	}, [profileData])

	return (
		<>
			<div id="balance">
				<div className="top-menu animate__animated animate__zoomIn">
					<Back />
					<div className="head">
						<h1>{t('balance.balance')}</h1>
						<div className="info" onClick={balanceInfoHandler}><InfoIcon size={18} /></div>
					</div>
				</div>
				<div className="sub-title animate__animated animate__zoomIn">
					<div className="col">
						<span>{t('balance.wallets')}</span>
						<div className="info" onClick={walletsInfoHandler}><InfoIcon size={10} /></div>
					</div>
					<div className="icon" onClick={refresh}><RefreshIcon /></div>
				</div>
				<div className="wallets animate__animated animate__zoomIn">
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
				<div className={'withdrawal animate__animated animate__zoomIn' + (profileData.usdt >= 50 ? ' active' : '')} onClick={openWithdrawal}>{t('balance.withdrawal')}</div>
				<div className="search-row animate__animated animate__zoomIn">
					<h2 className={searchActive ? 'hidden' : ''}>{t('balance.transactions')}</h2>
					<div className={'search-wrapper' + (searchActive ? ' active' : '')}>
						<input ref={searchRef} type="text" className="search" placeholder={t('balance.search')} onChange={e => setSearch(e.target.value)} value={search} />
						{/* <div className="search-button" onClick={openSearch}><SearchIcon /></div>
						<div className="cross-button" onClick={closeSearch}><CrossIcon /></div> */}
					</div>
					{/* <div className="filter-button"><FilterIcon /></div> */}
				</div>
				<div className="transactions animate__animated animate__zoomIn">
					{!transactionsDates ? <div className='preloader'><div className='loader' /></div> :
						Object.keys(transactionsDates).map((item, i) => {
							const date = new Date(item + 'T00:00:00Z')
							const dateFormat = new Intl.DateTimeFormat(profileData.language, { month: "long", day: "numeric" })
							return (
								<div key={i}>
									<div className="date">{dateFormat.format(date)}</div>
									<div className="transactions-block">
										{transactionsDates[item].map((transaction, i) => {
											const dateTime = new Date(transaction.transaction_time.replace(' ', 'T') + 'Z')
											const dateTimeFormat = new Intl.DateTimeFormat(profileData.language, { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })
											return (
												<div key={i} className="transaction">
													<div className="right-side">
														<div className="icon">{getTypeIcon(transaction.transaction_type)}</div>
														<div className="info-block">
															<div className="type">{getType(transaction.transaction_type, transaction.product_id, transaction.partner_name, transaction.comment)}</div>
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

			<PopUp
				active={popUpWithdrawal}
				onClose={() => setPopUpWithdrawal(false)}
				title={t('balance.popUpTitle')}
				description={t('balance.popUpDescription')}
				onCancel={() => setPopUpWithdrawal(false)}
				onSave={withdrawalClickHandler}
				saveText={t('balance.withdrawal')}
				saveActive={profileData.usdt >= 50}
			>
				<div className="select">
					<input placeholder={t('settings.popUpChangePin.placeholder.wallet')} value={wallet} onChange={e => setWallet(e.target.value)} />
					<input placeholder={t('settings.popUpChangePin.placeholder.pin')} type="password" value={pin} onChange={e => setPin(e.target.value)} />
				</div>
			</PopUp>

			<Modal active={modal} onClose={() => setModal(false)} title={modalTitle} content={modalContent} type={modalType} />
		</>
	)
}