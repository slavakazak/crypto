import { useTranslation } from 'react-i18next'

export default function SaveRow({ onCancel, onSave, active, saveText }) {
	const { t } = useTranslation()
	return (
		<div className="save-row">
			<div className="cancel" onClick={onCancel}>{t('saveRow.cancel')}</div>
			<div className={'save' + (active ? ' active' : '')} onClick={onSave}>{saveText || t('saveRow.save')}</div>
		</div>
	)
}