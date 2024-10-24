import { CrossIcon, RightArrowIcon, InfoIcon, OkIcon, ClockIcon, CopyIcon } from "./Icons"
import { useEffect, useState } from "react"
import usdtbsc from '../img/usdtbsc.png'
import usdttrx from '../img/usdttrx.png'
import createPayment from "../utils/createPayment"
import addTransaction from "../utils/addTransaction"
import getUTCTime from "../utils/getUTCTime"
import getTimeString from "../utils/getTimeString"
import getPaymentStatus from "../utils/getPaymentStatus"
import { useTranslation } from 'react-i18next'
import { QRCodeSVG } from 'qrcode.react'
import { useContext } from 'react'
import { HeightContext } from "../context/HeightProvider"
import { DataContext } from "../context/DataProvider"
import { AuthContext } from "../context/AuthProvider"
import { LevelsContext } from "../context/LevelsProvider"
import addWpBonus from "../utils/addWpBonus"
import getIdFromRef from "../utils/getIdFromRef"
import { avatars } from "../utils/constants"
import { Link } from "react-router-dom"

export default function PopUpProduct({ currentProduct, orderStage, setOrderStage, openSuccessModal, openModal }) {
	const { t } = useTranslation()
	const { height, maxHeight } = useContext(HeightContext)
	const { wpId, profileData } = useContext(DataContext)
	const { auth } = useContext(AuthContext)
	const { checkLevel } = useContext(LevelsContext)

	const currencies = {
		"USDTBSC": {
			firstName: 'USDT',
			lastName: 'BSC',
			img: usdtbsc
		},
		"USDTTRC20": {
			firstName: 'USDT',
			lastName: 'TRX',
			img: usdttrx
		}
	}

	const coupons = [
		{
			code: 'admin',
			percent: 100,
			fix: 0
		},
		{
			code: 'coupon',
			percent: 80,
			fix: 0
		}
	]

	const [currencyActive, setCurrencyActive] = useState(false)
	const [currency, setCurrency] = useState('USDTBSC')
	const [coupon, setCoupon] = useState('')
	const [currentCoupon, setCurrentCoupon] = useState(null)
	const [offer, setOffer] = useState(false)
	const [placing, setPlacing] = useState(true)
	const [amount, setAmount] = useState(null)
	const [address, setAddress] = useState('')
	const [time, setTime] = useState('')
	const [timerInterval, setTimerInterval] = useState(null)
	const [statusInterval, setStatusInterval] = useState(null)
	const [priceCopied, setPriceCopied] = useState(false)
	const [addressCopied, setAddressCopied] = useState(false)

	useEffect(() => {
		setCurrencyActive(false)
		setCoupon('')
		setOffer(false)
		setPlacing(true)
		setAmount(null)
		setAddress('')
		setPriceCopied(false)
		setAddressCopied(false)
		setCurrentCoupon(null)
	}, [orderStage === 'purchase'])

	useEffect(() => {
		if (timerInterval) clearInterval(timerInterval)
		if (statusInterval) clearInterval(statusInterval)
	}, [orderStage === ''])

	function buyClickHandler() {
		setOrderStage('placing')
	}

	function applyClickHandler() {
		const newCoupon = coupons.find(item => item.code === coupon.trim())
		if (!newCoupon) {
			openModal({
				title: t('modal.error'),
				text: t('workshop.noCoupon'),
				type: 'error'
			})
			setCurrentCoupon(null)
			return
		}
		setCurrentCoupon(newCoupon)
	}

	function getPrice() {
		if (!currentCoupon) return currentProduct.price
		const newPrice = currentProduct.price - currentProduct.price * currentCoupon.percent / 100 - currentCoupon.fix
		if (newPrice <= 0) return 0
		if (newPrice <= 10) return 10
		return Math.round(newPrice * 100) / 100
	}

	async function placingClickHandler() {
		if (!offer || !placing) return
		setPlacing(false)
		if (getPrice() === 0) {
			await addTransaction(auth, {
				user_id: wpId,
				transaction_type: 'purchase',
				transaction_status: 'success',
				price: 0,
				currency: 'USDT',
				product_id: currentProduct.id,
				comment: currentCoupon ? 'Coupon: ' + currentCoupon.code : '',
				transaction_time: getUTCTime()
			})
			await checkLevel()
			const refId = await getIdFromRef(auth, profileData.link)
			if (refId) await addWpBonus(auth, +refId, profileData.link)
			openSuccessModal()
			return
		}
		const transaction = await addTransaction(auth, {
			user_id: wpId,
			transaction_type: 'purchase',
			transaction_status: 'processing',
			price: getPrice(),
			currency: 'USDT',
			product_id: currentProduct.id,
			comment: currentCoupon ? 'Coupon: ' + currentCoupon.code : '',
			transaction_time: getUTCTime()
		})
		const payment = await createPayment({
			price_amount: getPrice(),
			price_currency: 'usd',
			pay_currency: currency,
			ipn_callback_url: "https://k2-bot.com/ipn-handler.php",
			order_id: transaction.id,
			order_description: currentProduct.name + (currentCoupon ? ' Coupon: ' + currentCoupon.code : ''),
			is_fixed_rate: true,
			is_fee_paid_by_user: true,
			//case: 'failed'
		})
		setAmount(payment.pay_amount)
		setAddress(payment.pay_address)
		setOrderStage('confirm')
		setTimerInterval(setInterval(() => setTime(getTimeString(payment.expiration_estimate_date)), 1000))
		const newStatusInterval = setInterval(async () => {
			const paymentStatus = await getPaymentStatus(payment.payment_id)
			if (paymentStatus.payment_status === 'finished') {
				clearInterval(newStatusInterval)
				await checkLevel()
				//const refId = await getIdFromRef(auth, profileData.link)
				//if (refId) await addWpBonus(auth, +refId)
				openSuccessModal()
			}
		}, 5000)
		setStatusInterval(newStatusInterval)
	}

	function copyClickHandler(string, setCopied) {
		return () => {
			if (navigator.clipboard) {
				navigator.clipboard.writeText(string).then(() => {
					setCopied(true)
				}, err => {
					console.error('An error occurred while copying text: ', err)
				})
			} else {
				console.error('Clipboard API not available')
			}
		}
	}

	function confirmClickHandler() {
		openSuccessModal()
	}

	function offerClickHandler(e) {
		e.stopPropagation()
	}

	return (
		<div
			className={"pop-up-wrapper pop-up-product animate" + (orderStage ? ' active' : '')}
			onClick={() => setOrderStage('')}
			style={{ height: maxHeight ? (maxHeight - 71) + 'px' : 'calc(100vh - 71px)' }}
		>
			<div
				className='pop-up pop-up-full'
				onClick={e => e.stopPropagation()}
				style={{ backgroundImage: 'url(/img/pop-up-bg.png)', paddingBottom: maxHeight - height < 150 ? '30px' : (maxHeight - height + 30) + 'px' }}
			>
				<div className="cross" onClick={() => setOrderStage('')}><CrossIcon /></div>
				{orderStage === 'purchase' && <>
					<div className='row'>
						<div className='image'>
							{currentProduct.img && <img src={currentProduct.img} alt={currentProduct.name} />}
							{!currentProduct.img && <img src={profileData.avatar === 'my' ? profileData.myAvatar : avatars[profileData.avatar]} alt={profileData.username} />}
						</div>
						<div className='col'>
							{currentProduct.name ? <h3>{currentProduct.name}</h3> : <h5>{t('workshop.strokeShort')}</h5>}
							<div className='price'>{t('workshop.price')}:<b>{currentProduct.price}$</b></div>
							<p className='product-info'>{t('workshop.term')}: <b>{t(`products.${currentProduct.id}.term`)}</b></p>
							{currentProduct.profit && <p className='product-info'>{t('workshop.profitability')}: <b>{currentProduct.profit}</b></p>}
						</div>
					</div>
					<h4>{t('workshop.description')}:</h4>
					<p className='text'>{t(`products.${currentProduct.id}.description`)}</p>
					{t(`products.${currentProduct.id}.description2`) && <p className='text'>{t(`products.${currentProduct.id}.description2`)}</p>}
					{currentProduct.indicators && <>
						<h4>{t('workshop.indicators')}:</h4>
						<ul>
							{currentProduct.indicators?.map((indicator, i) => (
								<li key={i}><span>{t(`products.${currentProduct.id}.indicators.${i}`)}</span><b>{indicator}</b></li>
							))}
						</ul>
						<p className='notice'>{t('workshop.notice')}</p>
					</>}
					<div className='buy active' onClick={buyClickHandler}>{t('workshop.buy')}</div>
				</>}
				{orderStage === 'placing' && <>
					<h2>{t('workshop.placingTitle')}</h2>
					<p className="description">{t('workshop.placingDescription')}</p>
					<div className={'currency' + (currencyActive ? ' active' : '')} onClick={() => setCurrencyActive(previous => !previous)}>
						<RightArrowIcon />
						<div className='option'>
							<img src={currencies[currency].img} alt={currency} />
							<p>{currencies[currency].firstName}<span>({currencies[currency].lastName})</span></p>
						</div>
						{Object.keys(currencies).map((name, i) => {
							if (name === currency) return false
							return (
								<div key={i} className='option' onClick={() => setCurrency(name)}>
									<img src={currencies[name].img} alt={name} />
									<p>{currencies[name].firstName}<span>({currencies[name].lastName})</span></p>
								</div>
							)
						})}
					</div>
					<div className='coupon-row'>
						<input className='coupon' placeholder={t('workshop.coupon')} value={coupon} onChange={e => setCoupon(e.target.value)} />
						<div className='apply' onClick={applyClickHandler}>{t('workshop.apply')}</div>
					</div>
					<div className='basket'>
						<div className='left-side'>
							{currentProduct.icon && <img className='product-icon' src={currentProduct.icon} alt={currentProduct.name} />}
							{!currentProduct.icon && <img className='product-icon' src={profileData.avatar === 'my' ? profileData.myAvatar : avatars[profileData.avatar]} alt={profileData.username} />}
							<span className='name'>{currentProduct.name}</span>
							<div className='info'><InfoIcon /></div>
						</div>
						<div className='right-side'>
							<span className='result'>{t('workshop.result')}:</span>
							<span className='sum'>{getPrice() > 0 ? '~' : ''}{getPrice()}</span>
							<img className='currency-icon' src={currencies[currency].img} alt={currency} />
						</div>
					</div>
					<div className='agreement offer' onClick={() => setOffer(previous => !previous)}>
						<div className={'checkbox' + (offer ? ' active' : '')}><OkIcon /></div>
						<input type='checkbox' checked={offer} onChange={() => setOffer(previous => !previous)} />
						<p>{t('workshop.agree')} <a href={'/docs/offer.pdf'} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>{t('workshop.offer')}</a></p>
					</div>
					<div className={'buy' + (offer && placing ? ' active' : '')} onClick={placingClickHandler}>ОФОРМИТЬ ЗАКАЗ</div>
				</>}
				{orderStage === 'confirm' && <>
					<h2>{t('workshop.confirmTitle')}</h2>
					<p className="description">{t('workshop.confirmDescription')}</p>
					<div className='block'>
						<div className='left-side'>
							<img src={currencies[currency].img} alt={currency} />
							<p>{currencies[currency].firstName}<span>({currencies[currency].lastName})</span></p>
						</div>
						<div className='right-side'>
							<span className='time'>{time}</span>
							<div className='icon'><ClockIcon /></div>
						</div>
					</div>
					<div className='block'>
						<p>{amount}</p>
						<div className='icon copy' onClick={copyClickHandler(amount, setPriceCopied)}>{priceCopied ? <OkIcon /> : <CopyIcon />}</div>
					</div>
					<div className='block'>
						<p>{address}</p>
						<div className='icon copy' onClick={copyClickHandler(address, setAddressCopied)}>{addressCopied ? <OkIcon /> : <CopyIcon />}</div>
					</div>
					<div className='qr'>
						<QRCodeSVG
							value={address + '?amount=' + amount}
							size={152}
							bgColor="transparent"
							fgColor="#FCFCFC"
						//imageSettings={{ src: currencies[currency].img, height: 20, width: 20, excavate: true }}
						/>
					</div>
					<div className='basket active'>
						<div className='left-side'>
							{currentProduct.icon && <img className='product-icon' src={currentProduct.icon} alt={currentProduct.name} />}
							{!currentProduct.icon && <img className='product-icon' src={profileData.avatar === 'my' ? profileData.myAvatar : avatars[profileData.avatar]} alt={profileData.username} />}
							<span className='name'>{currentProduct.name}</span>
							<div className='info'><InfoIcon /></div>
						</div>
						<div className='right-side'>
							<span className='result'>{t('workshop.result')}:</span>
							<span className='sum'>{amount}</span>
							<img className='currency-icon' src={currencies[currency].img} alt={currency} />
						</div>
					</div>
					<p className='confirm-notice'>{t('workshop.notice')}</p>
					<div className='buy active' onClick={confirmClickHandler}>{t('workshop.confirm')}</div>
				</>}
			</div>
		</div>
	)
}