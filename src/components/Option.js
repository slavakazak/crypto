import { OkIcon } from "./Icons"

export default function Option({ item, selected, setSelected }) {
	return (
		<div className={"option" + (selected.value === item.value ? ' active' : '')} onClick={() => setSelected(item)}>
			{item.icon}
			<span>{item.value}</span>
			<OkIcon />
		</div>
	)
}