export default function getDateTimeString(expiration) {
	const expirationTime = Math.round((new Date(expiration)).getTime() / 1000)
	const currentTime = Math.round((new Date()).getTime() / 1000)
	const time = expirationTime - currentTime
	if (time < 0) return '00:00'
	const days = String(Math.floor(time / (60 * 60 * 24)))
	const hours = String(Math.floor((time - days * 60 * 60 * 24) / (60 * 60))).padStart(2, '0')
	const minutes = String(Math.floor((time - days * 60 * 60 * 24 - hours * 60 * 60) / 60)).padStart(2, '0')
	if (days > 0) return days + ':' + hours + ':' + minutes
	return hours + ':' + minutes
}