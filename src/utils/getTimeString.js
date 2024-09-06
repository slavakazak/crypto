export default function getTimeString(expiration) {
	const expirationTime = Math.round((new Date(expiration)).getTime() / 1000)
	const currentTime = Math.round((new Date()).getTime() / 1000)
	const time = expirationTime - currentTime
	if (time < 0) return '00:00'
	const hours = String(Math.floor(time / 3600))
	const minutes = String(Math.floor((time - hours * 3600) / 60)).padStart(2, '0')
	const seconds = String(time % 60).padStart(2, '0')
	if (hours > 0) return hours + ':' + minutes + ':' + seconds
	return minutes + ':' + seconds
}