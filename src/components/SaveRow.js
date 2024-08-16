export default function SaveRow({ onCancel, onSave, active, saveText = 'Сохранить' }) {
	return (
		<div className="save-row">
			<div className="cancel" onClick={onCancel}>Отменить</div>
			<div className={'save' + (active ? ' active' : '')} onClick={onSave}>{saveText}</div>
		</div>
	)
}