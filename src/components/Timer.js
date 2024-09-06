import { ClockIcon } from "./Icons"

export default function Timer({ time }) {
	return (
		<div className='timer'>
			<p>{time}</p>
			<div className='time-icon'><ClockIcon /></div>
		</div>
	)
}