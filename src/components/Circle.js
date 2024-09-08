export default function Circle({ total, filled, fill = '#5A35EE', size = 58 }) {
	const radius = (size - 5) / 2
	const center = size / 2
	const circuit = 2 * Math.PI * radius
	const sector = circuit / total - 5

	return (
		<svg className="circle" width={size} height={size} viewBox={`0 0 ${size} ${size}`} >
			{Array.from({ length: total }).map((_, i) => (
				<circle
					key={i}
					className="donut-segment"
					cx={center}
					cy={center}
					r={radius}
					fill="transparent"
					stroke={i < filled ? fill : '#CECECE'}
					strokeWidth="5"
					strokeDasharray={total === 1 ? '' : `${sector} ${circuit - sector}`}
					strokeDashoffset={circuit / 4 + sector / 2 - (sector + 5) * i}
				/>
			))}
		</svg>
	)
}