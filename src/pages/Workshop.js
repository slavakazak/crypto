import logo from '../img/logo.png'
import { useTranslation } from 'react-i18next'
import TopMenu from '../components/TopMenu'
import { useState, useEffect } from 'react'
import Switch from '../components/Switch'
import { InfoIcon } from '../components/Icons'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom'
import PopUpProduct from '../components/PopUpProduct'
import getRobots from '../utils/getRobots'
import { products } from '../utils/constants'
import { useContext } from 'react'
import { WpIdContext } from '../utils/contexts'

export default function Workshop() {
	const { t } = useTranslation()
	const wpId = useContext(WpIdContext)

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

	const [currentProduct, setCurrentProduct] = useState(null)
	const [orderStage, setOrderStage] = useState('purchase')
	const [availableRobots, setAvailableRobots] = useState([])
	const [availableProducts, setAvailableProducts] = useState([])

	async function updateProducts() {
		const robots = await getRobots(wpId)
		setAvailableRobots(products.filter(product => robots.includes(String(product.id))))
		setAvailableProducts(products.filter(product => !robots.includes(String(product.id))))
	}

	function openSuccessModal() {
		openModal({
			title: t('modal.success'),
			type: 'success',
			content: <p>
				{t('workshop.successModal.text1')} <span className='link' onClick={openInventory}>{t('workshop.successModal.inventory')}</span>. {t('workshop.successModal.text2')} <Link className='link' to={'/balance'}>{t('workshop.successModal.history')}</Link>.
			</p>
		})
		updateProducts()
	}

	function openPopUp(product) {
		return e => {
			if (product.inactive) return
			e.stopPropagation()
			setOrderStage('purchase')
			setCurrentProduct(product)
		}
	}

	useEffect(() => {
		document.addEventListener('click', setOrderStage(''))
		updateProducts()
	}, [wpId])

	function openInventory() {
		setOrderStage('')
		setModal(false)
		setInventory(true)
	}

	return (
		<>

			<div id="workshop">
				<TopMenu />
				<Switch second={inventory} setSecond={setInventory} firstText={t('workshop.workshop')} secondText={t('workshop.inventory')} />
				{inventory ? <>
					{availableRobots.length !== 0 && <>
						<h2>{t('workshop.robots')}</h2>
						<div className='robots'>
							{availableRobots.map((item, i) => (
								<div key={i} className='robot'>
									<div className='image'><img src={item.img} alt={item.name} /></div>
									<div className='title'>
										<h3>{item.name}</h3>
										<div className='info' onClick={() => openModal({
											title: t('modal.reference'),
											content: <>
												<p>{t(`products.${item.id}.reference.title`)}</p>
												<p>1.</p>
												<p>2.</p>
											</>
										})}><InfoIcon /></div>
									</div>
								</div>
							))}
						</div>
					</>}
					<h2>{t('workshop.improvements')}</h2>
					<div className='improvement'>
						<img src={logo} alt='K2' />
						<span>{t('workshop.stroke')}</span>
						<div className='icon'><InfoIcon /></div>
					</div>
				</> : <>
					{availableProducts.length !== 0 && <>
						<h2>{t('workshop.robots')}</h2>
						<div className='shop-slider'>
							<div className='slider-track' style={{ width: (availableProducts.length * 169 + 15) + 'px' }}>
								{availableProducts.map((product, i) => (
									<div key={i} className={'product-card' + (product.inactive ? ' inactive' : '')} onClick={openPopUp(product)}>
										<div className='image'><img src={product.img} alt={product.name} /></div>
										<div className='title'>
											<h3>{product.name}</h3>
											<div className='info'><InfoIcon /></div>
										</div>
										<p className='text'>{product.inactive ? t('workshop.development') : t(`products.${product.id}.text`)}</p>
										<div className='get'>{t('workshop.get')}</div>
									</div>
								))}
							</div>
						</div>
					</>}
					<h2>{t('workshop.improvements')}</h2>
					<div className='improvement'>
						<img src={logo} alt='K2' />
						<span>{t('workshop.stroke')}</span>
						<div className='icon'><InfoIcon /></div>
					</div>
				</>}
			</div>

			{currentProduct && <PopUpProduct
				currentProduct={currentProduct}
				orderStage={orderStage}
				setOrderStage={setOrderStage}
				openSuccessModal={openSuccessModal}
				openModal={openModal}
			/>}

			<Modal active={modal} onClose={() => setModal(false)} title={modalTitle} text={modalText} content={modalContent} type={modalType} />

		</>
	)
}