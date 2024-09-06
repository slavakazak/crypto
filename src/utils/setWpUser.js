import generatePassword from './generatePassword'
import regWpUser from "./regWpUser"
import getWpFields from './getWpFields'
import getWpUserId from './getWpUserId'
import { languages } from './constants'

export default async function setWpUser(user, setProfileData, setWpId, test = false) {
	let username, wpUserId
	if (test) {
		username = 'user123'
		wpUserId = 1
	} else {
		username = `user${user.id}`
		wpUserId = await getWpUserId(username)
	}
	if (wpUserId) {
		const fields = await getWpFields(wpUserId)
		setProfileData(previous => ({
			...previous,
			...fields,
			language: fields.language || languages.find(language => language.tag === user.language_code) || previous.language
		}))
		setWpId(wpUserId)
		return true
	}
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