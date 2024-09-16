import { defaultLevels } from './constants'
import getWpUser from './getWpUser'

export default async function getWpLevels(auth, wpId) {
	const wpUser = await getWpUser(auth, wpId)
	if (!wpUser) return {}
	const meta = wpUser.meta || {}
	defaultLevels[0].time = wpUser.user_registered
	return meta.t_levels ? JSON.parse(meta.t_levels) : defaultLevels
}