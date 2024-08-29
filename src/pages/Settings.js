import Back from "../components/Back"
import { useEffect, useState } from "react"
import { EyeCrossedIcon, SettingsIcon } from "../components/Icons"
import showMessage from "../utils/showMessage"
import SaveRow from "../components/SaveRow"
import PopUp from "../components/PopUp"
import Option from "../components/Option"
import { genders, countries } from "../utils/constants"
import { useTranslation } from 'react-i18next'
import Modal from "../components/Modal"

export default function Settings({ profileData, setData, wpId }) {
	const { t } = useTranslation()

	const [modal, setModal] = useState(false)
	const [modalText, setModalText] = useState('')

	function openModal(text) {
		setModalText(text)
		setModal(true)
	}

	const [formChanged, setFormChanged] = useState(false)
	const [nickname, setNickname] = useState(profileData.nickname)
	const [fullName, setFullName] = useState(profileData.fullName)
	const [email, setEmail] = useState(profileData.email.includes('@noemail.com') ? '' : profileData.email)

	const [gender, setGender] = useState(profileData.gender)
	const [popUpGender, setPopUpGender] = useState(false)

	const [age, setAge] = useState(profileData.age)

	const [country, setCountry] = useState(profileData.country)
	const [popUpCountry, setPopUpCountry] = useState(false)
	const [countrySearch, setCountrySearch] = useState('')

	const [login, setLogin] = useState(profileData.login)

	const [password, setPassword] = useState(profileData.password)
	const [popUpSeePassword, setPopUpSeePassword] = useState(false)
	const [pinToSeePassword, setPinToSeePassword] = useState('')
	const [seePassword, setSeePassword] = useState(false)

	const [popUpChangePassword, setPopUpChangePassword] = useState(false)
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [pinToChangePassword, setPinToChangePassword] = useState('')

	const [pin, setPin] = useState(profileData.pin)
	const [popUpChangePin, setPopUpChangePin] = useState(false)
	const [currentPin, setCurrentPin] = useState('')
	const [newPin, setNewPin] = useState('')

	const [wallet, setWallet] = useState(profileData.wallet)

	useEffect(() => {
		setNickname(profileData.nickname)
		setFullName(profileData.fullName)
		setEmail(profileData.email.includes('@noemail.com') ? '' : profileData.email)
		setGender(profileData.gender)
		setAge(profileData.age)
		setCountry(profileData.country)
		setLogin(profileData.login)
		setPassword(profileData.password)
		setPin(profileData.pin)
		setWallet(profileData.wallet)
	}, [wpId])

	//обработчики ввода полей
	function handler(setter) {
		return e => {
			setter(e.target.value)
			setFormChanged(true)
		}
	}
	function ageChangeHandler(e) {
		if (Number.isInteger(+e.target.value)) {
			setAge(+e.target.value)
			setFormChanged(true)
		}
	}

	//всплывающее окно смены пола
	function genderClickHandler() {
		setPopUpGender(true)
	}
	function genderCancelClickHandler() {
		setGender(profileData.gender)
		setPopUpGender(false)
	}
	function genderSaveClickHandler() {
		if (gender.tag === profileData.gender?.tag) return
		setData({ gender })
		setPopUpGender(false)
	}

	//всплывающее окно смены страны
	function countryClickHandler() {
		setPopUpCountry(true)
	}
	function countryCancelClickHandler() {
		setCountry(profileData.country)
		setCountrySearch('')
		setPopUpCountry(false)
	}
	function countrySaveClickHandler() {
		if (country.tag === profileData.country?.tag) return
		setData({ country })
		setPopUpCountry(false)
	}

	//всплывающее окно просмотра пароля
	function seePasswordClickHandler() {
		if (!profileData.passwordChanged) {
			setSeePassword(previous => !previous)
			return
		}
		if (seePassword) {
			setSeePassword(false)
			return
		}
		if (!password) {
			openModal(t('settings.messages.enterPassword'))
			return
		}
		if (!profileData.pin) {
			openModal(t('settings.messages.setPIN'))
			return
		}
		setPopUpSeePassword(true)
	}
	function seePasswordCancelClickHandler() {
		setPinToSeePassword('')
		setPopUpSeePassword(false)
	}
	function seePasswordSaveClickHandler() {
		setPinToSeePassword('')
		setPopUpSeePassword(false)
		if (pinToSeePassword !== profileData.pin) {
			openModal(t('settings.messages.invalidPIN'))
			return
		}
		setSeePassword(true)
	}

	//всплывающее окно смены пароля
	function changePasswordClickHandler() {
		if (!profileData.password) {
			openModal(t('settings.messages.setPassword'))
			return
		}
		if (!profileData.pin) {
			openModal(t('settings.messages.setPIN'))
			return
		}
		setPopUpChangePassword(true)
	}
	function changePasswordCancelClickHandler() {
		setCurrentPassword('')
		setNewPassword('')
		setPinToChangePassword('')
		setPopUpChangePassword(false)
	}
	function changePasswordSaveClickHandler() {
		setCurrentPassword('')
		setNewPassword('')
		setPinToChangePassword('')
		setPopUpChangePassword(false)
		if (profileData.password !== currentPassword) {
			openModal(t('settings.messages.invalidPassword'))
			return
		}
		if (newPassword.includes(' ')) {
			openModal(t('settings.messages.passwordSpaces'))
			return
		}
		if (profileData.pin !== pinToChangePassword) {
			openModal(t('settings.messages.invalidPIN'))
			return
		}
		setPassword(newPassword)
		setData({ password: newPassword })
	}

	//всплывающее окно смены PIN
	function changePinClickHandler() {
		if (!profileData.pin) {
			openModal(t('settings.messages.setPIN'))
			return
		}
		setPopUpChangePin(true)
	}
	function changePinCancelClickHandler() {
		setCurrentPin('')
		setNewPin('')
		setPopUpChangePin(false)
	}
	function changePinSaveClickHandler() {
		setCurrentPin('')
		setNewPin('')
		setPopUpChangePin(false)
		if (profileData.pin !== currentPin) {
			openModal(t('settings.messages.invalidPIN'))
			return
		}
		if (newPin.includes(' ')) {
			openModal(t('settings.messages.PINSpaces'))
			return
		}
		setPin(newPin)
		setData({ pin: newPin })
	}

	//отменить изменения
	function cancelClickHandler(e) {
		setNickname(profileData.nickname)
		setFullName(profileData.fullName)
		setEmail(profileData.email)
		setAge(profileData.age)
		setLogin(profileData.login)
		setPassword(profileData.password)
		setPin(profileData.pin)
		setWallet(profileData.wallet)
		setFormChanged(false)
	}

	//сохранить изменения
	function saveClickHandler(e) {
		if (!formChanged) return
		if (!nickname.trim()) {
			openModal(t('settings.messages.emptyNickname'))
			return
		}
		const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
		if (email.trim() && !EMAIL_REGEXP.test(email.trim())) {
			openModal(t('settings.messages.invalidEmail'))
			return
		}
		if (age && (age < 10 || age > 99)) {
			openModal(t('settings.messages.youngAge'))
			return
		}
		if (!login.trim()) {
			openModal(t('settings.messages.emptyLogin'))
			return
		}
		if (login.trim() === 'admin') {
			openModal(t('settings.messages.busyLogin'))
			return
		}
		if (password.trim() === '') {
			openModal(t('settings.messages.emptyPassword'))
			return
		}
		if (password.includes(' ')) {
			openModal(t('settings.messages.passwordSpaces'))
			return
		}
		if (pin.includes(' ')) {
			openModal(t('settings.messages.PINSpaces'))
			return
		}
		if (wallet && (wallet.slice(0, 2) !== '0x' || wallet.includes(' '))) {
			openModal(t('settings.messages.invalidWallet'))
			return
		}

		const passwordChanged = profileData.passwordChanged || profileData.password !== password

		let newUsername = nickname.trim()
		if (profileData.username === profileData.fullName && fullName.trim()) {
			newUsername = fullName.trim()
		}

		setData({
			nickname: nickname.trim(),
			fullName: fullName.trim(),
			username: newUsername,
			email: email.trim(),
			age,
			login: login.trim(),
			password,
			passwordChanged,
			pin,
			wallet
		})

		setFormChanged(false)
	}

	return (
		<>
			<div id="settings">
				<div className="top-menu">
					<Back />
					<h1>{t('settings.editProfile')}</h1>
				</div>
				<div className="form-section">
					<div className="label">{t('settings.personalData')}</div>
					<input placeholder={t('settings.placeholder.nickname')} className="input" value={nickname} onChange={handler(setNickname)} />
					<input placeholder={t('settings.placeholder.fullName')} className="input" value={fullName} onChange={handler(setFullName)} />
					<input placeholder={t('settings.placeholder.email')} type='email' className="input" value={email} onChange={handler(setEmail)} />
					<div className='profile-data'>
						<div className={'item' + (profileData.gender ? ' active' : '')} onClick={genderClickHandler}>{t([`constants.genders.${profileData.gender?.tag}`, 'constants.genders.default'])}</div>
						<input className='item' placeholder={t('settings.placeholder.age')} value={age || ''} onChange={ageChangeHandler} />
						<div className='item item-center active' onClick={countryClickHandler}>
							{profileData.country.icon}
							{/* <span>{profileData.country.value}</span> */}
						</div>
					</div>
				</div>
				<div className="form-section">
					<div className="label">{t('settings.loginData')}</div>
					<input placeholder={t('settings.placeholder.login')} className="input" value={login} onChange={handler(setLogin)} />
					<div className={'input-container' + (profileData.passwordChanged ? ' two-icon' : ' one-icon')}>
						<input placeholder={t('settings.placeholder.password')} className='input' readOnly={profileData.passwordChanged} type={seePassword ? 'text' : 'password'} value={password} onChange={handler(setPassword)} />
						<div className={'eye' + (seePassword ? ' active' : '')} onClick={seePasswordClickHandler}><EyeCrossedIcon /></div>
						{profileData.passwordChanged && <div className="settings" onClick={changePasswordClickHandler}><SettingsIcon /></div>}
					</div>
					<div className={'input-container' + (profileData.pin ? ' one-icon' : '')}>
						<input placeholder={t('settings.placeholder.pin')} className='input' readOnly={profileData.pin !== ''} type="password" value={pin} onChange={handler(setPin)} />
						{profileData.pin && <div className="settings" onClick={changePinClickHandler}><SettingsIcon /></div>}
					</div>
				</div>
				<div className="form-section">
					<div className="label">{t('settings.financialData')}</div>
					<input placeholder={t('settings.placeholder.wallet')} className="input" value={wallet} onChange={handler(setWallet)} />
				</div>
				<SaveRow onCancel={cancelClickHandler} onSave={saveClickHandler} active={formChanged} />
			</div>

			<PopUp
				active={popUpGender}
				onClose={() => setPopUpGender(false)}
				title={t('settings.popUpGender.title')}
				description={t('settings.popUpGender.description')}
				onCancel={genderCancelClickHandler}
				onSave={genderSaveClickHandler}
				saveActive={gender.tag !== profileData.gender?.tag}
			>
				<div className="select">
					{genders.map((item, i) => (
						<Option key={i} item={item} selected={gender} langPath={'constants.genders'} setSelected={setGender} />
					))}
				</div>
			</PopUp>

			<PopUp
				active={popUpCountry}
				onClose={() => setPopUpCountry(false)}
				title={t('settings.popUpCountry.title')}
				description={t('settings.popUpCountry.description')}
				onCancel={countryCancelClickHandler}
				onSave={countrySaveClickHandler}
				saveActive={country.tag !== profileData.country?.tag}
				full={true}
				search={countrySearch}
				setSearch={setCountrySearch}
			>
				<div className="select">
					{countries.filter(item => t([`constants.countries.${item.tag}`]).toLowerCase().includes(countrySearch.trim().toLowerCase())).map((item, i) => (
						<Option key={i} item={item} selected={country} langPath={'constants.countries'} setSelected={setCountry} />
					))}
				</div>
			</PopUp>

			<PopUp
				active={popUpSeePassword}
				onClose={() => setPopUpSeePassword(false)}
				title={t('settings.popUpSeePassword.title')}
				description={t('settings.popUpSeePassword.description')}
				onCancel={seePasswordCancelClickHandler}
				onSave={seePasswordSaveClickHandler}
				saveActive={pinToSeePassword}
				saveText={t('settings.popUpSeePassword.save')}
			>
				<div className="select">
					<input placeholder={t('settings.popUpSeePassword.placeholder.pin')} type="password" value={pinToSeePassword} onChange={e => setPinToSeePassword(e.target.value)} />
				</div>
			</PopUp>

			<PopUp
				active={popUpChangePassword}
				onClose={() => setPopUpChangePassword(false)}
				title={t('settings.popUpChangePassword.title')}
				description={t('settings.popUpChangePassword.description')}
				onCancel={changePasswordCancelClickHandler}
				onSave={changePasswordSaveClickHandler}
				saveActive={currentPassword && newPassword && pinToChangePassword}
			>
				<div className="select">
					<input placeholder={t('settings.popUpChangePassword.placeholder.password')} type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
					<input placeholder={t('settings.popUpChangePassword.placeholder.newPassword')} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
					<input placeholder={t('settings.popUpChangePassword.placeholder.pin')} type="password" value={pinToChangePassword} onChange={e => setPinToChangePassword(e.target.value)} />
				</div>
			</PopUp>

			<PopUp
				active={popUpChangePin}
				onClose={() => setPopUpChangePin(false)}
				title={t('settings.popUpChangePin.title')}
				description={t('settings.popUpChangePin.description')}
				onCancel={changePinCancelClickHandler}
				onSave={changePinSaveClickHandler}
				saveActive={currentPin && newPin}
			>
				<div className="select">
					<input placeholder={t('settings.popUpChangePin.placeholder.pin')} type="password" value={currentPin} onChange={e => setCurrentPin(e.target.value)} />
					<input placeholder={t('settings.popUpChangePin.placeholder.newPin')} type="password" value={newPin} onChange={e => setNewPin(e.target.value)} />
				</div>
			</PopUp>

			<Modal active={modal} onClose={() => setModal(false)} title={t('error')} text={modalText} type='error' />
		</>
	)
}