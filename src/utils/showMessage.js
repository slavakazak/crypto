export default function showMessage(tg, message) {
	try {
		tg.showAlert(message)
	} catch {
		console.log(message)
	}
}