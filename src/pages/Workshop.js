import robot from '../img/robot.png'
import logo from '../img/logo.png'
import k2 from '../img/K2.png'
import { useTranslation } from 'react-i18next'
import TopMenu from '../components/TopMenu'
import { useState, useEffect } from 'react'
import Switch from '../components/Switch'
import { InfoIcon } from '../components/Icons'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom'
import PopUpProduct from '../components/PopUpProduct'
import getRobots from '../utils/getRobots'

export default function Workshop({ profileData, wpId, setData }) {
	const { t, i18n } = useTranslation()

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

	async function openSuccessModal() {
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

	async function updateProducts() {
		const products = [
			{
				name: 'K-2',
				text: t('workshop.products.k2.text'),
				id: 16,
				img: robot,
				inactive: false,
				price: 499,
				term: t('workshop.products.terms.unlimited'),
				profit: '7,68%',
				description: t('workshop.products.k2.description'),
				indicators: <ul>
					<li><span>{t('workshop.products.k2.indicator1')}</span><b>53,8%</b></li>
					<li><span>{t('workshop.products.k2.indicator2')}</span><b>7,68%</b></li>
					<li><span>{t('workshop.products.k2.indicator3')}</span><b>71,4%</b></li>
					<li><span>{t('workshop.products.k2.indicator4')}</span><b>56,7%</b></li>
					<li><span>{t('workshop.products.k2.indicator5')}</span><b>-5,9%</b></li>
					<li><span>{t('workshop.products.k2.indicator6')}</span><b>-3,18%</b></li>
					<li><span>{t('workshop.products.k2.indicator7')}</span><b>45,1%</b></li>
					<li><span>{t('workshop.products.k2.indicator8')}</span><b>20-50%</b></li>
				</ul>,
				icon: k2,
				reference: <>
					<p>{t('workshop.products.k2.reference.title')}</p>
					<p>1.</p>
					<p>2.</p>
				</>
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
		setAvailableRobots([])
		setAvailableProducts([])
		const robots = await getRobots(wpId)
		setAvailableRobots(products.filter(product => robots.includes(String(product.id))))
		setAvailableProducts(products.filter(product => !robots.includes(String(product.id))))
	}

	useEffect(() => {
		document.addEventListener('click', setOrderStage(''))
		updateProducts()
	}, [wpId, i18n.language])

	function openInventory() {
		setOrderStage('')
		setModal(false)
		setInventory(true)
	}

	return (
		<>

			<div id="workshop">
				<TopMenu profileData={profileData} setData={setData} wpId={wpId} />
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
										<div className='info' onClick={() => openModal({ title: t('modal.reference'), content: item.reference })}><InfoIcon /></div>
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
										<p className='text'>{product.inactive ? t('workshop.development') : product.text}</p>
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
				wpId={wpId}
				openSuccessModal={openSuccessModal}
				openModal={openModal}
			/>}

			<Modal active={modal} onClose={() => setModal(false)} title={modalTitle} text={modalText} content={modalContent} type={modalType} />

		</>
	)
}