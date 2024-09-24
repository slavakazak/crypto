import axios from 'axios'
const url = process.env.REACT_APP_SITE_URL

export default async function getNicknameFromRef(auth, ref) {
	try {
		const response = await axios.get(`${url}/wp-json/custom/v1/nickname_from_ref/${ref}`, { headers: auth })
		return response.data
	} catch (error) {
		console.error('Error getNicknameFromRef:', error)
		return []
	}
}
