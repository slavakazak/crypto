import generatePassword from './generatePassword'
import regWpUser from "./regWpUser"
import updateWpFields from './updateWpFields'

export default async function setWpUser(user, setProfileData, setWpId) {
	const isUpdate = updateWpFields(user, setProfileData, setWpId)
	if (isUpdate) return true
	const username = 'user' + user.id
	const nickname = user.username || user.first_name
	const email = user.id + '@noemail.com'
	const password = generatePassword(12)
	const wpId = await regWpUser(username, email, password, nickname)
	if (wpId) {
		setProfileData(previous => ({ ...previous, nickname, password, username: nickname, ref: wpId }))
		setWpId(wpId)
		return true
	}
	return false
}