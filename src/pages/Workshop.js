import logo from '../img/logo.png'
import { useTranslation } from 'react-i18next'
import TopMenu from '../components/TopMenu'
import { useState, useEffect } from 'react'
import Switch from '../components/Switch'
import { InfoIcon, OkIcon } from '../components/Icons'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom'
import PopUpProduct from '../components/PopUpProduct'
import getRobots from '../utils/getRobots'
import { products } from '../utils/constants'
import { useContext } from 'react'
import { DataContext } from '../context/DataProvider'
import { AuthContext } from '../context/AuthProvider'

export default function Workshop() {
	const { t } = useTranslation()
	const { wpId } = useContext(DataContext)
	const { auth } = useContext(AuthContext)

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


	function closeModal() {
		setModal(false)
		setModalContent('')
	}

	const [currentProduct, setCurrentProduct] = useState(null)
	const [orderStage, setOrderStage] = useState('purchase')
	const [availableRobots, setAvailableRobots] = useState([])
	const [availableProducts, setAvailableProducts] = useState([])
	const [loading, setLoading] = useState(true)

	async function updateProducts() {
		if (!auth) return
		setLoading(true)
		const robots = await getRobots(auth, wpId)
		setAvailableRobots(products.filter(product => robots.includes(String(product.id))))
		setAvailableProducts(products.filter(product => !robots.includes(String(product.id))))
		setLoading(false)
	}

	function copyHandler() {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(t('workshop.messageTemplate')).then(() => {
				document.querySelector('.ok-icon').classList.add('active')
			}, err => {
				console.error('An error occurred while copying text: ', err)
			})
		} else {
			console.error('Clipboard API not available')
		}
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

	function openInventoryModal() {
		openModal({
			title: t('modal.reference'),
			content: <>
				<p>{t('workshop.inventoryModal.text1')}</p>
				<p>1. {t('workshop.inventoryModal.text2')} <Link className="link" to={'/'}>Ссылка</Link></p>
				<p>3. {t('workshop.inventoryModal.text3')}</p>
				<p>3. {t('workshop.inventoryModal.text4')}</p>
				<p>4. {t('workshop.inventoryModal.text5')} <Link className="link" to={'https://t.me/helper_kk'}>t.me/helper_kk</Link> {t('workshop.inventoryModal.text6')}</p>
				<br />
				<p>”{t('workshop.messageTemplate')}”</p>
				<br />
				<p>{t('workshop.inventoryModal.text7')}</p>
				<br />
				<div className='copy-template' onClick={copyHandler}><span>{t('workshop.copyMessage')}</span> <span className='ok-icon'><OkIcon /></span></div>
				<br />
				<p>{t('workshop.inventoryModal.text8')}</p>
				<p>{t('workshop.inventoryModal.text9')}</p>
			</>
		})
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
		if (!wpId) return
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
				{loading ? <div className='preloader'><div className='loader' /></div> : inventory ? <>
					{availableRobots.length !== 0 && <>
						<h2>{t('workshop.robots')}</h2>
						<div className='robots'>
							{availableRobots.map((item, i) => (
								<div key={i} className='robot'>
									<div className='image'><img src={item.img} alt={item.name} /></div>
									<div className='title'>
										<h3>{item.name}</h3>
										<div className='info' onClick={openInventoryModal}><InfoIcon /></div>
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

			<Modal active={modal} onClose={closeModal} title={modalTitle} text={modalText} content={modalContent} type={modalType} />

		</>
	)
}