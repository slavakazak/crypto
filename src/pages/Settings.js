import Back from "../components/Back"
import { useState } from "react"
import { EyeCrossedIcon, MenIcon, SettingsIcon, WomenIcon } from "../components/Icons"
import showMessage from "../utils/showMessage"
import SaveRow from "../components/SaveRow"
import PopUp from "../components/PopUp"
import Option from "../components/Option"

export default function Settings({ profileData, setProfileData, setUsername, countries, tg }) {
	const genders = [
		{
			value: 'Мужчина',
			icon: <MenIcon />
		},
		{
			value: 'Женщина',
			icon: <WomenIcon />
		}
	]

	const [formChanged, setFormChanged] = useState(false)
	const [nickname, setNickname] = useState(profileData.nickname)
	const [fullName, setFullName] = useState(profileData.fullName)
	const [mail, setMail] = useState(profileData.mail)

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

	//обработчики ввода полей
	function handler(setter, number = false) {
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
		setProfileData(previous => ({ ...previous, gender }))
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
		setProfileData(previous => ({ ...previous, country }))
		setPopUpCountry(false)
	}

	//всплывающее окно просмотра пароля
	function seePasswordClickHandler() {
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
		setProfileData(previous => ({ ...previous, password: newPassword }))
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
		setProfileData(previous => ({ ...previous, pin: newPin }))
	}

	//отменить изменения
	function cancelClickHandler(e) {
		setNickname(profileData.nickname)
		setFullName(profileData.fullName)
		setMail(profileData.mail)
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
			showMessage(tg, 'Поле "nickname" не должно быть пустым!')
			return
		}
		const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
		if (mail.trim() && !EMAIL_REGEXP.test(mail.trim())) {
			showMessage(tg, 'Неверный email!')
			return
		}
		if (age !== '' && (age < 10 || age > 99)) {
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

		setProfileData(previous => ({
			...previous,
			nickname: nickname.trim(),
			fullName: fullName.trim(),
			mail: mail.trim(),
			age,
			login: login.trim(),
			password,
			pin,
			wallet
		}))

		if (!fullName.trim()) {
			setUsername(nickname.trim())
		}

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
					<input placeholder="Ваша почта" type='email' className="input" value={mail} onChange={handler(setMail)} />
					<div className='profile-data'>
						<div className={'item' + (profileData.gender ? ' active' : '')} onClick={genderClickHandler}>{profileData.gender.value || 'Пол'}</div>
						<input className='item' placeholder="Возраст" value={age} onChange={ageChangeHandler} />
						<div className='item item-center active' onClick={countryClickHandler}>
							{profileData.country.icon}
							{/* <span>{profileData.country.value}</span> */}
						</div>
					</div>
				</div>
				<div className="form-section">
					<div className="label">Данные входа</div>
					<input placeholder="Логин" className="input" value={login} onChange={handler(setLogin)} />
					<div className="input-container">
						<input placeholder="Пароль" className={'input' + (profileData.password ? ' password' : '')} readOnly={profileData.password !== ''} type={seePassword ? 'text' : 'password'} value={password} onChange={handler(setPassword)} />
						{profileData.password && <>
							<div className={'eye' + (seePassword ? ' active' : '')} onClick={seePasswordClickHandler}><EyeCrossedIcon /></div>
							<div className="settings" onClick={changePasswordClickHandler}><SettingsIcon /></div>
						</>}
					</div>
					<div className="input-container">
						<input placeholder="Pin (требуется для проверки операций)" className={'input' + (profileData.pin ? ' pin' : '')} readOnly={profileData.pin !== ''} type="password" value={pin} onChange={handler(setPin)} />
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
				{genders.map((item, i) => (
					<Option key={i} item={item} selected={gender} setSelected={setGender} />
				))}
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
				{countries.filter(item => item.value.toLowerCase().includes(countrySearch.trim().toLowerCase())).map((item, i) => (
					<Option key={i} item={item} selected={country} setSelected={setCountry} />
				))}
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
				<input placeholder="PIN" type="password" value={pinToSeePassword} onChange={e => setPinToSeePassword(e.target.value)} />
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
				<input placeholder="Текущий пароль" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
				<input placeholder="Новый пароль" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
				<input placeholder="PIN" type="password" value={pinToChangePassword} onChange={e => setPinToChangePassword(e.target.value)} />
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
				<input placeholder="Текущий PIN" type="password" value={currentPin} onChange={e => setCurrentPin(e.target.value)} />
				<input placeholder="Новый PIN" type="password" value={newPin} onChange={e => setNewPin(e.target.value)} />
			</PopUp>

		</>
	)
}