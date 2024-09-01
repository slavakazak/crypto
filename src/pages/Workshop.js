import robot from '../img/robot.png'
import logo from '../img/logo.png'
import trx from '../img/usdttrx.png'
import bsc from '../img/usdtbsc.png'
import k2 from '../img/K2.png'
import qr from '../img/qr.png'
import createOrder from '../utils/createOrder'
import { useTranslation } from 'react-i18next'
import TopMenu from '../components/TopMenu'
import { useState, useEffect } from 'react'
import Switch from '../components/Switch'
import { InfoIcon, CrossIcon, RightArrowIcon, OkIcon, ClockIcon, CopyIcon } from '../components/Icons'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom'
import createPayment from '../utils/createPayment'
import addTransaction from '../utils/addTransaction'
import getUTCTime from '../utils/getUTCTime'
import getTimeString from '../utils/getTimeString'
import getPaymentStatus from '../utils/getPaymentStatus'

export default function Workshop({ profileData, wpId, setData }) {
	const { t } = useTranslation()

	const [inventory, setInventory] = useState(false)

	const [modal, setModal] = useState(false)
	const [modalTitle, setModalTitle] = useState('')
	const [modalText, setModalText] = useState('')
	const [modalContent, setModalContent] = useState('')
	const [modalType, setModalType] = useState('')

	function openModal({ title, text = '', content = '', type = '' }) {
		setModalTitle(title)
		setModalText(text)
		setModalContent(content)
		setModalType(type)
		setModal(true)
	}

	const currencies = {
		"USDTBSC": {
			firstName: 'USDC',
			lastName: 'BSC',
			img: bsc
		},
		"USDTTRC20": {
			firstName: 'USDC',
			lastName: 'TRX',
			img: trx
		}
	}

	const [popUp, setPopUp] = useState(false)
	const [currentProduct, setCurrentProduct] = useState(null)
	const [orderStage, setOrderStage] = useState('purchase')
	const [currencyActive, setCurrencyActive] = useState(false)
	const [currency, setCurrency] = useState('USDTBSC')
	const [coupon, setCoupon] = useState('')
	const [privacyPolicy, setPrivacyPolicy] = useState(false)
	const [disclaimer, setDisclaimer] = useState(false)
	const [placing, setPlacing] = useState(true)
	const [priceCopied, setPriceCopied] = useState(false)
	const [walletCopied, setWalletCopied] = useState(false)
	const [amount, setAmount] = useState()
	const [address, setAddress] = useState('')
	const [paymentId, setPaymentId] = useState()
	const [time, setTime] = useState('')
	const [timerInterval, setTimerInterval] = useState(null)
	const [statusInterval, setStatusInterval] = useState(null)

	function openPopUp(product) {
		return e => {
			if (product.inactive) return
			e.stopPropagation()

			setOrderStage('purchase')
			setCurrencyActive(false)
			setCoupon('')
			setPrivacyPolicy(false)
			setDisclaimer(false)
			setPriceCopied(false)
			setWalletCopied(false)
			setAmount(null)
			setAddress('')
			setPaymentId(null)
			setPlacing(true)

			setCurrentProduct(product)
			setPopUp(true)
		}
	}

	function closePopUp() {
		setPopUp(false)
		if (timerInterval) clearInterval(timerInterval)
		if (statusInterval) clearInterval(statusInterval)
	}

	useEffect(() => {
		document.addEventListener('click', closePopUp)
	}, [])

	const request = {
		"payment_id": "4537868613",
		"payment_status": "waiting",
		"pay_address": "0xa033DD48461fc722D5AA63Be58f5531B352Fcae1",
		"price_amount": 499,
		"price_currency": "usd",
		"pay_amount": 503.70307168,
		"amount_received": 497.81181802,
		"pay_currency": "usdtbsc",
		"order_id": "14",
		"order_description": "K-2",
		"payin_extra_id": null,
		"ipn_callback_url": "https://k2-bot.com/ipn-handler.php",
		"created_at": "2024-09-01T20:00:46.864Z",
		"updated_at": "2024-09-01T20:00:46.864Z",
		"purchase_id": "4520495445",
		"smart_contract": null,
		"network": "bsc",
		"network_precision": null,
		"time_limit": null,
		"burning_percent": null,
		"expiration_estimate_date": "2024-09-01T20:20:46.863Z",
		"is_fixed_rate": true,
		"is_fee_paid_by_user": true,
		"valid_until": "2024-09-08T20:00:46.863Z",
		"type": "crypto2crypto",
		"product": "api",
		"success": "success"
	}

	function buyClickHandler() {
		setOrderStage('placing')
	}

	async function placingClickHandler() {
		if (!disclaimer || !privacyPolicy || !placing) return
		setPlacing(false)
		const order = await createOrder({
			customer_id: wpId,
			//customer_id: 44,
			payment_method: "nowpayments_gateway",
			payment_method_title: "NOWPayments",
			set_paid: true,
			billing: { first_name: profileData.username, email: profileData.email },
			//billing: { first_name: 'слава', email: 'slavakazak3@gmail.com' },
			line_items: [{ product_id: currentProduct.id, quantity: 1 }]
		})
		const payment = await createPayment({
			price_amount: currentProduct.price,
			price_currency: order.currency,
			pay_currency: currency,
			ipn_callback_url: "https://k2-bot.com/ipn-handler.php",
			order_id: order.id,
			order_description: order.line_items.map(item => item.name).join(', '),
			is_fixed_rate: true,
			is_fee_paid_by_user: true,
			//case: 'failed'
		})
		await addTransaction({
			user_id: wpId,
			//user_id: 44,
			transaction_type: 'purchase',
			transaction_status: 'processing',
			price: payment.price_amount,
			currency: 'USDT',
			order_id: order.id,
			comment: payment.order_description,
			transaction_time: getUTCTime(payment.created_at)
		})
		setAmount(payment.pay_amount)
		setAddress(payment.pay_address)
		setPaymentId(payment.payment_id)
		setOrderStage('confirm')
		setTimerInterval(setInterval(() => setTime(getTimeString(payment.expiration_estimate_date)), 1000))
		const newStatusInterval = setInterval(async () => {
			const paymentStatus = await getPaymentStatus(payment.payment_id)
			if (paymentStatus.payment_status === 'finished') {
				clearInterval(newStatusInterval)
				openModal({
					title: 'Успех!',
					type: 'success',
					content: <p>
						Вы успешно подтвердили заказ, после проверки транзакции ваш заказ появится у вас в <span className='link' onClick={openInventory}>инвентаре</span>. За статусом вашего заказа вы можете наблюдать в разделе <Link className='link' to={'/balance'}>история транзакций</Link>.
					</p>
				})
			}
		}, 5000)
		setStatusInterval(newStatusInterval)
	}

	function openInventory() {
		closePopUp()
		setModal(false)
		setInventory(true)
	}

	function confirmClickHandler() {
		openModal({
			title: 'Успех!',
			type: 'success',
			content: <p>
				Вы успешно подтвердили заказ, после проверки транзакции ваш заказ появится у вас в <span className='link' onClick={openInventory}>инвентаре</span>. За статусом вашего заказа вы можете наблюдать в разделе <Link className='link' to={'/balance'}>история транзакций</Link>.
			</p>
		})
	}

	function applyClickHandler() {

	}

	function priceCopyClickHandler() {
		if (navigator.clipboard) {
			navigator.clipboard.writeText('499.982797').then(function () {
				setPriceCopied(true)
			}, function (err) {
				console.error('An error occurred while copying text: ', err)
			})
		} else {
			console.error('Clipboard API not available')
		}
	}

	function walletCopyClickHandler() {
		if (navigator.clipboard) {
			navigator.clipboard.writeText('THoTqJP7D8DUBNaiL5sBTX3C8niEX1ayzV').then(function () {
				setWalletCopied(true)
			}, function (err) {
				console.error('An error occurred while copying text: ', err)
			})
		} else {
			console.error('Clipboard API not available')
		}
	}

	const products = [
		{
			name: 'K-2',
			text: 'Секретная разработка гениальных учёных. С помощью заложенных алгоритмов делает прибыль!',
			id: 16,
			img: robot,
			inactive: false,
			price: 499,
			term: 'Не ограничено',
			profit: '7,68%',
			description: 'Описание алгоритма: K2 это трендовый алгоритм, которой состоит из 77 торговых стратегий работающих на 14 торговых парах: ETH, SOL, TRX, ADA, ALGO, DOT, EOS, ETC, FIL, FTM, GRT, LINK, LTC, MATIC. На каждой из торговых пар распределено от 2 до 7 торговых стратегий. Одна из задач K2 свести к минимуму дисперсию путем увеличения количества торговых стратегий внутри. С помощью этого K2 используя маржу до 1% от депозита даёт положительный результат при 52 и более процентах прибыльных сделок.',
			indicators: <ul>
				<li><span>Доходность 01.01.2024-31.07.2024: ----------</span><b>53,8%</b></li>
				<li><span>Среднемесячная доходность: -----------------</span><b>7,68%</b></li>
				<li><span>Прибыльных месяцев: ------------------------</span><b>71,4%</b></li>
				<li><span>Прибыльных сделок: -------------------------</span><b>56,7%</b></li>
				<li><span>Максимальная просадка: ---------------------</span><b>-5,9%</b></li>
				<li><span>Максимальный месячный убыток: --------------</span><b>-3,18%</b></li>
				<li><span>Максимально задействовано депозита в сделках в моменте: ---------------------------------</span><b>45,1%</b></li>
				<li><span>Stop-loss для каждой сделки: ---------------</span><b>20-50%</b></li>
			</ul>,
			icon: k2
		},
		{
			name: 'K-X',
			img: robot,
			inactive: true
		},
		{
			name: 'K-X',
			img: robot,
			inactive: true
		}
	]

	const robots = [
		{
			name: 'K-2',
			reference: <>
				<p>Чтобы подключиться к роботу вам надо сделать:</p>
				<p>1.</p>
				<p>2.</p>
			</>,
			img: robot,
		},
		{
			name: 'K-2',
			reference: <>
				<p>Чтобы подключиться к роботу вам надо сделать:</p>
				<p>1.</p>
				<p>2.</p>
			</>,
			img: robot,
		}
	]

	return (
		<>

			<div id="workshop">
				<TopMenu profileData={profileData} setData={setData} wpId={wpId} />
				<Switch second={inventory} setSecond={setInventory} />
				{inventory ? <>
					<h2>Роботы</h2>
					<div className='robots'>
						{robots.map((item, i) => (
							<div key={i} className='robot'>
								<div className='image'><img src={item.img} alt={item.name} /></div>
								<div className='title'>
									<h3>{item.name}</h3>
									<div className='info' onClick={() => openModal({ title: 'Справка', content: item.reference })}><InfoIcon /></div>
								</div>
							</div>
						))}
					</div>
					<h2>Улучшения</h2>
					<div className='improvement'>
						<img src={logo} alt='K2' />
						<span>Обводка аватара в лидербордах</span>
						<div className='icon'><InfoIcon /></div>
					</div>
				</> : <>
					<h2>Роботы</h2>
					<div className='shop-slider'>
						<div className='slider-track' style={{ width: (products.length * 169 + 15) + 'px' }}>
							{products.map((product, i) => (
								<div key={i} className={'product-card' + (product.inactive ? ' inactive' : '')} onClick={openPopUp(product)}>
									<div className='image'><img src={product.img} alt={product.name} /></div>
									<div className='title'>
										<h3>{product.name}</h3>
										<div className='info'><InfoIcon /></div>
									</div>
									<p className='text'>{product.inactive ? 'В разработке' : product.text}</p>
									<div className='get'>ПОЛУЧИТЬ</div>
								</div>
							))}
						</div>
					</div>
					<h2>Улучшения</h2>
					<div className='improvement'>
						<img src={logo} alt='K2' />
						<span>Обводка аватара в лидербордах</span>
						<div className='icon'><InfoIcon /></div>
					</div>
				</>}
			</div>

			{currentProduct && <div className={"pop-up-wrapper pop-up-product animate" + (popUp ? ' active' : '')} onClick={closePopUp}>
				<div className='pop-up pop-up-full' onClick={e => e.stopPropagation()} style={{ backgroundImage: 'url(/img/pop-up-bg.png)' }}>
					<div className="cross" onClick={closePopUp}><CrossIcon /></div>
					{orderStage === 'purchase' && <>
						<div className='row'>
							<div className='image'><img src={robot} alt={currentProduct.name} /></div>
							<div className='col'>
								<h3>{currentProduct.name}</h3>
								<div className='price'>Стоимость:<b>{currentProduct.price}$</b></div>
								<p className='product-info'>Срок: <b>{currentProduct.term}</b></p>
								<p className='product-info'>Среднемес. доходность: <b>{currentProduct.profit}</b></p>
							</div>
						</div>
						<h4>Описание:</h4>
						<p className='text'>{currentProduct.description}</p>
						<h4>Показатели:</h4>
						{currentProduct.indicators}
						<p className='notice'>*Доходность в прошлом не гарантируем результаты в будущем</p>
						<div className='buy active' onClick={buyClickHandler}>ПОКУПКА</div>
					</>}
					{orderStage === 'placing' && <>
						<h2>Оформление заказа</h2>
						<p className="description">Для оплаты заказа нужно чётко следовать инструкции</p>
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
							<input className='coupon' placeholder='Код купона' value={coupon} onChange={e => setCoupon(e.target.value)} />
							<div className='apply' onClick={applyClickHandler}>ПРИМЕНИТЬ</div>
						</div>
						<div className='basket'>
							<div className='left-side'>
								<img className='product-icon' src={currentProduct.icon} alt={currentProduct.name} />
								<span className='name'>{currentProduct.name}</span>
								<div className='info'><InfoIcon /></div>
							</div>
							<div className='right-side'>
								<span className='result'>Итог:</span>
								<span className='sum'>~{currentProduct.price}</span>
								<img className='currency-icon' src={currencies[currency].img} alt={currency} />
							</div>
						</div>
						<div className='agreement' onClick={() => setPrivacyPolicy(previous => !previous)}>
							<div className={'checkbox' + (privacyPolicy ? ' active' : '')}><OkIcon /></div>
							<input type='checkbox' checked={privacyPolicy} onChange={() => setPrivacyPolicy(previous => !previous)} />
							<p>Ознакомился(лась) и согласен(а) с <span onClick={e => e.stopPropagation()}>Политикой конфиденциальности</span></p>
						</div>
						<div className='agreement disclaimer' onClick={() => setDisclaimer(previous => !previous)}>
							<div className={'checkbox' + (disclaimer ? ' active' : '')}><OkIcon /></div>
							<input type='checkbox' checked={disclaimer} onChange={() => setDisclaimer(previous => !previous)} />
							<p>Ознакомился(лась) и согласен(а) с <span onClick={e => e.stopPropagation()}>Отказом от ответственности</span></p>
						</div>
						<div className={'buy' + (disclaimer && privacyPolicy && placing ? ' active' : '')} onClick={placingClickHandler}>ОФОРМИТЬ ЗАКАЗ</div>
					</>}
					{orderStage === 'confirm' && <>
						<h2>Подтверждение заказа</h2>
						<p className="description">Для подтверждения заказа вам необходимо отправить выбранный вами актив на указанный адрес ниже</p>
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
							<div className='icon copy' onClick={priceCopyClickHandler}>{priceCopied ? <OkIcon /> : <CopyIcon />}</div>
						</div>
						<div className='block'>
							<p>{address}</p>
							<div className='icon copy' onClick={walletCopyClickHandler}>{walletCopied ? <OkIcon /> : <CopyIcon />}</div>
						</div>
						<div className='qr'><img src={qr} alt={address + '?amount=11.21947215'} /></div>
						<div className='basket active'>
							<div className='left-side'>
								<img className='product-icon' src={currentProduct.icon} alt={currentProduct.name} />
								<span className='name'>{currentProduct.name}</span>
								<div className='info'><InfoIcon /></div>
							</div>
							<div className='right-side'>
								<span className='result'>Итог:</span>
								<span className='sum'>{amount}</span>
								<img className='currency-icon' src={currencies[currency].img} alt={currency} />
							</div>
						</div>
						<p className='confirm-notice'>*Доходность в прошлом не гарантируем результаты в будущем</p>
						<div className='buy active' onClick={confirmClickHandler}>ОФОРМИТЬ ЗАКАЗ</div>
					</>}
				</div>
			</div>}

			<Modal active={modal} onClose={() => setModal(false)} title={modalTitle} text={modalText} content={modalContent} type={modalType} />

		</>
	)
}