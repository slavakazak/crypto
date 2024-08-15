import { RightArrowIcon } from "./Icons"
import { useNavigate } from 'react-router-dom'

export default function Back() {
	const navigate = useNavigate()

	return (
		<div className="back" onClick={() => navigate(-1)}>
			<RightArrowIcon />
		</div>
	)
}