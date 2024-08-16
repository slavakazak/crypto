import Back from "../components/Back"
import { useState } from "react"
import { CrossIcon, MenIcon, OkIcon, WomenIcon } from "../components/Icons"
import showMessage from "../utils/showMessage"
import SaveRow from "../components/SaveRow"

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

	const [popUpGender, setPopUpGender] = useState(false)
	const [genderAnimation, setGenderAnimation] = useState(false)
	const [gender, setGender] = useState(profileData.gender)

	const [age, setAge] = useState(profileData.age)

	const [popUpCountry, setPopUpCountry] = useState(false)
	const [countryAnimation, setCountryAnimation] = useState(false)
	const [country, setCountry] = useState(profileData.country)
	const [countrySearch, setCountrySearch] = useState('')

	const [login, setLogin] = useState(profileData.login)

	const [password, setPassword] = useState(profileData.password)
	const [pin, setPin] = useState(profileData.pin)

	const [wallet, setWallet] = useState(profileData.wallet)

	function nickChangeHandler(e) {
		setNickname(e.target.value)
		setFormChanged(true)
	}
	function fullNameChangeHandler(e) {
		setFullName(e.target.value)
		setFormChanged(true)
	}
	function mailChangeHandler(e) {
		setMail(e.target.value)
		setFormChanged(true)
	}
	function ageChangeHandler(e) {
		if (Number.isInteger(+e.target.value)) {
			setAge(+e.target.value)
			setFormChanged(true)
		}
	}
	function loginChangeHandler(e) {
		setLogin(e.target.value)
		setFormChanged(true)
	}
	function passwordChangeHandler(e) {
		setPassword(e.target.value)
		setFormChanged(true)
	}
	function pinChangeHandler(e) {
		setPin(e.target.value)
		setFormChanged(true)
	}
	function walletChangeHandler(e) {
		setWallet(e.target.value)
		setFormChanged(true)
	}

	function genderClickHandler() {
		setPopUpGender(true)
		setGenderAnimation(true)
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

	function countryClickHandler() {
		setPopUpCountry(true)
		setCountryAnimation(true)
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
		if (wallet.slice(0, 2) !== '0x' || wallet.includes(' ')) {
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
					<input placeholder="Nickname" className="input" value={nickname} onChange={nickChangeHandler} />
					<input placeholder="Иванов Иван Иванович" className="input" value={fullName} onChange={fullNameChangeHandler} />
					<input placeholder="Ваша почта" type='email' className="input" value={mail} onChange={mailChangeHandler} />
					<div className='profile-data'>
						<div className={'item' + (profileData.gender ? ' active' : '')} onClick={genderClickHandler}>{profileData.gender || 'Пол'}</div>
						<input className='item' placeholder="Возраст" value={age} onChange={ageChangeHandler} />
						<div className='item item-center active' onClick={countryClickHandler}>
							{profileData.country.icon}
							{/* <span>{profileData.country.value}</span> */}
						</div>
					</div>
				</div>
				<div className="form-section">
					<div className="label">Данные входа</div>
					<input placeholder="Логин" className="input" value={login} onChange={loginChangeHandler} />
					<input placeholder="Пароль" className="input" type="password" value={password} onChange={passwordChangeHandler} />
					<input placeholder="Pin (требуется для проверки операций)" type="password" className="input" value={pin} onChange={pinChangeHandler} />
				</div>
				<div className="form-section">
					<div className="label">Финансовые данные</div>
					<input placeholder="Адрес кошелька USDT в сети BEP20" className="input" value={wallet} onChange={walletChangeHandler} />
				</div>
				<SaveRow onCancel={cancelClickHandler} onSave={saveClickHandler} isActive={formChanged} />
			</div>
			<div className={"pop-up-wrapper" + (popUpGender ? ' active' : '') + (genderAnimation ? ' animate' : '')} onClick={() => setPopUpGender(false)}>
				<div className="pop-up" onClick={e => e.stopPropagation()}>
					<h2>Редактировать пол</h2>
					<p className="title">Выберите свой пол</p>
					<div className="select">
						{genders.map((item, i) => (
							<div key={i} className={"option" + (gender === item.value ? ' active' : '')} onClick={() => setGender(item.value)}>
								{item.icon}
								<span>{item.value}</span>
								<OkIcon />
							</div>
						))}
					</div>
					<SaveRow onCancel={genderCancelClickHandler} onSave={genderSaveClickHandler} isActive={gender !== profileData.gender} />
				</div>
			</div>
			<div className={"pop-up-wrapper" + (popUpCountry ? ' active' : '') + (countryAnimation ? ' animate' : '')} onClick={() => setPopUpCountry(false)}>
				<div className="pop-up pop-up-full" onClick={e => e.stopPropagation()}>
					<div className="cross" onClick={() => setPopUpCountry(false)}>
						<CrossIcon />
					</div>
					<div className="pop-up-head">
						<h2>Выберите страну</h2>
						<p className="title">Выберите свою страну</p>
					</div>
					<input placeholder="Поиск" className="search" value={countrySearch} onChange={e => setCountrySearch(e.target.value)} />
					<div className="select">
						{countries.filter(item => item.value.toLowerCase().includes(countrySearch.trim().toLowerCase())).map((item, i) => (
							<div key={i} className={"option" + (country.value === item.value ? ' active' : '')} onClick={() => setCountry(item)}>
								{item.icon}
								<span>{item.value}</span>
								<OkIcon />
							</div>
						))}
					</div>
					<SaveRow onCancel={countryCancelClickHandler} onSave={countrySaveClickHandler} isActive={country.value !== profileData.country.value} />
				</div>
			</div>
		</>
	)
}