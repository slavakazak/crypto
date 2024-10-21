import { useTranslation } from 'react-i18next'
import TopMenu from '../components/TopMenu'
import { useState, useEffect } from 'react'
import Switch from '../components/Switch'
import { InfoIcon, OkIcon } from '../components/Icons'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom'
import PopUpProduct from '../components/PopUpProduct'
import getRobots from '../utils/getRobots'
import { products, improvements, avatars } from '../utils/constants'
import { useContext } from 'react'
import { DataContext } from '../context/DataProvider'
import { AuthContext } from '../context/AuthProvider'
import getExchangeFromRef from '../utils/getExchangeFromRef'
import getImprovements from '../utils/getImprovements'

export default function Workshop() {
	const { t } = useTranslation()
	const { wpId, profileData } = useContext(DataContext)
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

	const [currentProduct, setCurrentProduct] = useState(null)
	const [orderStage, setOrderStage] = useState('purchase')
	const [robots, setRobots] = useState([])
	const [myImprovements, setMyImprovements] = useState([])
	const [allImprovements, setAllImprovements] = useState([])
	const [loading, setLoading] = useState(true)

	function closeModal() {
		setModal(false)
		setModalContent('')
		setOrderStage('')
	}

	async function updateProducts() {
		if (!auth) return
		setLoading(true)
		const newRobots = await getRobots(auth, wpId)
		setRobots(newRobots.map(robot => products.find(product => product.id === +robot)))
		const newImprovements = await getImprovements(auth, wpId)
		setMyImprovements(newImprovements.map(newImprovement => improvements.find(improvement => improvement.id === +newImprovement)))
		setAllImprovements(improvements.filter(improvement => !newImprovements.includes(String(improvement.id))))
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

	const [refExchange, setRefExchange] = useState(null)

	useEffect(() => {
		if (!auth || !profileData.link) return
		async function init() {
			let newRefExchange = await getExchangeFromRef(auth, profileData.link)
			const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
			if (!regex.test(newRefExchange) || newRefExchange === "admin") {
				newRefExchange = null
			}
			setRefExchange(newRefExchange)
		}
		init()
	}, [auth, profileData.link])

	function openInventoryModal() {
		openModal({
			title: t('modal.reference'),
			content: <>
				<p>{t('workshop.inventoryModal.text1')}</p>
				<p>1. {t('workshop.inventoryModal.text2')} <Link className="link" to={refExchange}>{refExchange}</Link></p>
				<p>3. {t('workshop.inventoryModal.text3')}</p>
				<p>3. {t('workshop.inventoryModal.text4')}</p>
				<p>4. {t('workshop.inventoryModal.text5')} <Link className="link" to={'https://t.me/k2_support_bot'}>t.me/k2_support_bot</Link> {t('workshop.inventoryModal.text6')}</p>
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
					{robots.length !== 0 && <>
						<h2 className='animate__animated animate__zoomIn'>{t('workshop.robots')}</h2>
						<div className='robots'>
							{robots.map((item, i) => (
								<div key={i} className='robot animate__animated animate__zoomIn'>
									<div className='image'><img src={item.img} alt={item.name} /></div>
									<div className='title'>
										<h3>{item.name}</h3>
										<div className='info' onClick={openInventoryModal}><InfoIcon /></div>
									</div>
								</div>
							))}
						</div>
					</>}
					{myImprovements.length !== 0 && <>
						<h2 className='animate__animated animate__zoomIn'>{t('workshop.improvements')}</h2>
						{myImprovements.map((improvement, i) => (
							<div key={i} className='improvement animate__animated animate__zoomIn'>
								<img src={profileData.avatar === 'my' ? profileData.myAvatar : avatars[profileData.avatar]} alt={profileData.username} />
								<span>{t('workshop.stroke')}</span>
							</div>
						))}
					</>}
				</> : <>
					{products.length !== 0 && <>
						<h2 className='animate__animated animate__zoomIn'>{t('workshop.robots')}</h2>
						<div className='shop-slider'>
							<div className='slider-track' style={{ width: (products.length * 169 + 15) + 'px' }}>
								{products.map((product, i) => (
									<div key={i} className={'product-card animate__animated animate__zoomIn' + (product.inactive ? ' inactive' : '')} onClick={openPopUp(product)}>
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
					{allImprovements.length !== 0 && <>
						<h2 className='animate__animated animate__zoomIn'>{t('workshop.improvements')}</h2>
						{allImprovements.map((improvement, i) => (
							<div key={i} className='improvement animate__animated animate__zoomIn' onClick={openPopUp(improvement)}>
								<img src={profileData.avatar === 'my' ? profileData.myAvatar : avatars[profileData.avatar]} alt={profileData.username} />
								<span>{t('workshop.stroke')}</span>
								<div className='icon'><InfoIcon /></div>
							</div>
						))}
					</>}
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