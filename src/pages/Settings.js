import Back from "../components/Back"
import { useEffect, useState } from "react"
import { EyeCrossedIcon, SettingsIcon } from "../components/Icons"
import showMessage from "../utils/showMessage"
import SaveRow from "../components/SaveRow"
import PopUp from "../components/PopUp"
import Option from "../components/Option"
import { genders, countries } from "../utils/constants"

export default function Settings({ profileData, setData, tg, wpId }) {
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
		if (gender === profileData.gender) return
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
		if (country.value === profileData.country.value) return
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
			showMessage(tg, 'Введите пароль!')
			return
		}
		if (!profileData.pin) {
			showMessage(tg, 'Установите PIN!')
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
			showMessage(tg, 'Неверный PIN!')
			return
		}
		setSeePassword(true)
	}

	//всплывающее окно смены пароля
	function changePasswordClickHandler() {
		if (!profileData.password) {
			showMessage(tg, 'Установите пароль!')
			return
		}
		if (!profileData.pin) {
			showMessage(tg, 'Установите PIN!')
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
			showMessage(tg, 'Неверный пароль!')
			return
		}
		if (newPassword.includes(' ')) {
			showMessage(tg, 'Пароль не должен содержать пробелы!')
			return
		}
		if (profileData.pin !== pinToChangePassword) {
			showMessage(tg, 'Неверный PIN!')
			return
		}
		setPassword(newPassword)
		setData({ password: newPassword })
	}

	//всплывающее окно смены PIN
	function changePinClickHandler() {
		if (!profileData.pin) {
			showMessage(tg, 'Установите PIN!')
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
			showMessage(tg, 'Неверный PIN!')
			return
		}
		if (newPin.includes(' ')) {
			showMessage(tg, 'Pin не должен содержать пробелы!')
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
			showMessage(tg, 'Поле "Nickname" не должно быть пустым!')
			return
		}
		const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
		if (email.trim() && !EMAIL_REGEXP.test(email.trim())) {
			showMessage(tg, 'Неверный email!')
			return
		}
		if (age && (age < 10 || age > 99)) {
			showMessage(tg, 'Возраст должен содержать две цифры!')
			return
		}
		if (!login.trim()) {
			showMessage(tg, 'Поле "Логин" не должно быть пустым!')
			return
		}
		if (login.trim() === 'admin') {
			showMessage(tg, 'Логин занят!')
			return
		}
		if (password.trim() === '') {
			showMessage(tg, 'Пароль не должен быть пустым!')
			return
		}
		if (password.includes(' ')) {
			showMessage(tg, 'Пароль не должен содержать пробелы!')
			return
		}
		if (pin.includes(' ')) {
			showMessage(tg, 'Pin не должен содержать пробелы!')
			return
		}
		if (wallet && (wallet.slice(0, 2) !== '0x' || wallet.includes(' '))) {
			showMessage(tg, 'Неверный адрес кошелька!')
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
					<h1>Редактировать профиль</h1>
				</div>
				<div className="form-section">
					<div className="label">Личные данные</div>
					<input placeholder="Nickname" className="input" value={nickname} onChange={handler(setNickname)} />
					<input placeholder="Иванов Иван Иванович" className="input" value={fullName} onChange={handler(setFullName)} />
					<input placeholder="Ваша почта" type='email' className="input" value={email} onChange={handler(setEmail)} />
					<div className='profile-data'>
						<div className={'item' + (profileData.gender ? ' active' : '')} onClick={genderClickHandler}>{profileData.gender.value || 'Пол'}</div>
						<input className='item' placeholder="Возраст" value={age || ''} onChange={ageChangeHandler} />
						<div className='item item-center active' onClick={countryClickHandler}>
							{profileData.country.icon}
							{/* <span>{profileData.country.value}</span> */}
						</div>
					</div>
				</div>
				<div className="form-section">
					<div className="label">Данные входа</div>
					<input placeholder="Логин" className="input" value={login} onChange={handler(setLogin)} />
					<div className={'input-container' + (profileData.passwordChanged ? ' two-icon' : ' one-icon')}>
						<input placeholder="Пароль" className='input' readOnly={profileData.passwordChanged} type={seePassword ? 'text' : 'password'} value={password} onChange={handler(setPassword)} />
						<div className={'eye' + (seePassword ? ' active' : '')} onClick={seePasswordClickHandler}><EyeCrossedIcon /></div>
						{profileData.passwordChanged && <div className="settings" onClick={changePasswordClickHandler}><SettingsIcon /></div>}
					</div>
					<div className={'input-container' + (profileData.pin ? ' one-icon' : '')}>
						<input placeholder="Pin (требуется для проверки операций)" className='input' readOnly={profileData.pin !== ''} type="password" value={pin} onChange={handler(setPin)} />
						{profileData.pin && <div className="settings" onClick={changePinClickHandler}><SettingsIcon /></div>}
					</div>
				</div>
				<div className="form-section">
					<div className="label">Финансовые данные</div>
					<input placeholder="Адрес кошелька USDT в сети BEP20" className="input" value={wallet} onChange={handler(setWallet)} />
				</div>
				<SaveRow onCancel={cancelClickHandler} onSave={saveClickHandler} active={formChanged} />
			</div>

			<PopUp
				active={popUpGender}
				setActive={setPopUpGender}
				title='Редактировать пол'
				description='Выберите свой пол'
				onCancel={genderCancelClickHandler}
				onSave={genderSaveClickHandler}
				saveActive={gender !== profileData.gender}
			>
				<div className="select">
					{genders.map((item, i) => (
						<Option key={i} item={item} selected={gender} setSelected={setGender} />
					))}
				</div>
			</PopUp>

			<PopUp
				active={popUpCountry}
				setActive={setPopUpCountry}
				title='Выберите страну'
				description='Выберите свою страну'
				onCancel={countryCancelClickHandler}
				onSave={countrySaveClickHandler}
				saveActive={country.value !== profileData.country.value}
				full={true}
				search={countrySearch}
				setSearch={setCountrySearch}
			>
				<div className="select">
					{countries.filter(item => item.value.toLowerCase().includes(countrySearch.trim().toLowerCase())).map((item, i) => (
						<Option key={i} item={item} selected={country} setSelected={setCountry} />
					))}
				</div>
			</PopUp>

			<PopUp
				active={popUpSeePassword}
				setActive={setPopUpSeePassword}
				title='Введите PIN'
				description='Введите свой PIN для просмотра пароля'
				onCancel={seePasswordCancelClickHandler}
				onSave={seePasswordSaveClickHandler}
				saveActive={pinToSeePassword}
				saveText="подтвердить"
			>
				<div className="select">
					<input placeholder="PIN" type="password" value={pinToSeePassword} onChange={e => setPinToSeePassword(e.target.value)} />
				</div>
			</PopUp>

			<PopUp
				active={popUpChangePassword}
				setActive={setPopUpChangePassword}
				title='Смена пароля'
				description='Введите данные ниже для смены'
				onCancel={changePasswordCancelClickHandler}
				onSave={changePasswordSaveClickHandler}
				saveActive={currentPassword && newPassword && pinToChangePassword}
			>
				<div className="select">
					<input placeholder="Текущий пароль" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
					<input placeholder="Новый пароль" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
					<input placeholder="PIN" type="password" value={pinToChangePassword} onChange={e => setPinToChangePassword(e.target.value)} />
				</div>
			</PopUp>

			<PopUp
				active={popUpChangePin}
				setActive={setPopUpChangePin}
				title='Смена PIN'
				description='Введите данные ниже для смены'
				onCancel={changePinCancelClickHandler}
				onSave={changePinSaveClickHandler}
				saveActive={currentPin && newPin}
			>
				<div className="select">
					<input placeholder="Текущий PIN" type="password" value={currentPin} onChange={e => setCurrentPin(e.target.value)} />
					<input placeholder="Новый PIN" type="password" value={newPin} onChange={e => setNewPin(e.target.value)} />
				</div>
			</PopUp>

		</>
	)
}