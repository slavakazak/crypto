import axios from 'axios'
const url = process.env.REACT_APP_SITE_URL

export default async function markMessageAsRead(auth, wpId, messageId) {
	try {
		const response = await axios.post(`${url}/wp-json/custom/v1/mark-message-read/${wpId}/${messageId}`, {}, { headers: auth })
		return response.data
	} catch (error) {
		console.error('Error marking message as read:', error)
	}
}
