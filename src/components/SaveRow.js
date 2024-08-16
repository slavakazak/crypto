export default function SaveRow({ onCancel, onSave, isActive }) {
	return (
		<div className="save-row">
			<div className="cancel" onClick={onCancel}>Отменить</div>
			<div className={'save' + (isActive ? ' active' : '')} onClick={onSave}>Сохранить</div>
		</div>
	)
}