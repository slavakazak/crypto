import { useState } from "react"
import axios from "axios"
import { PlusIcon } from './Icons'
import showMessage from '../utils/showMessage'
import { useTranslation } from 'react-i18next'
const adminUsername = process.env.REACT_APP_WP_ADMIN_USERNAME
const adminPassword = process.env.REACT_APP_WP_ADMIN_PASSWORD
const url = process.env.REACT_APP_SITE_URL

export default function AddAvatar({ tg, setData }) {
	const { t } = useTranslation()
	const [load, setLoad] = useState(false)
	const MAX_FILE_SIZE = 4 * 1024 * 1024
	const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/x-icon', 'image/bmp', 'image/tiff']

	async function fileChangeHandler(event) {
		const file = event.target.files[0]
		if (file) {
			if (file.size > MAX_FILE_SIZE) {
				showMessage(tg, t('addAvatar.messages.size'))
				return
			}
			if (!ALLOWED_FILE_TYPES.includes(file.type)) {
				showMessage(tg, t('addAvatar.messages.format'))
				return
			}
			setLoad(true)
			const formData = new FormData()
			formData.append('file', file)
			try {
				const tokenResponse = await axios.post(`${url}/wp-json/jwt-auth/v1/token`, { username: adminUsername, password: adminPassword })
				const token = tokenResponse.data.token
				const response = await axios.post(`${url}/wp-json/wp/v2/media`,
					formData,
					{
						headers: {
							'Content-Disposition': `attachment; filename="${file.name}"`,
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				const uploadedImageUrl = response.data.source_url
				await setData({ myAvatar: uploadedImageUrl })
				setLoad(false)
			} catch (error) {
				console.error('Error uploading image:', error)
			}
		}
	}

	return (
		<>
			{load ?
				<div className='add-avatar'>{t('addAvatar.loading')}</div>
				:
				<div className='add-avatar' onClick={() => document.getElementById('file-input').click()}>
					<PlusIcon />
					<div className="comment">{t('addAvatar.size')}</div>
					<input type="file" id="file-input" style={{ display: 'none' }} onChange={fileChangeHandler} />
				</div>
			}
		</>
	)
}
