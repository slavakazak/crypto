export default function Switch({ second, setSecond, firstText, secondText }) {
	return (
		<div className='switch'>
			<div className={'slider' + (second ? ' second' : '')} />
			<div className='options'>
				<div className='option' onClick={() => setSecond(false)}>{firstText}</div>
				<div className='option' onClick={() => setSecond(true)}>{secondText}</div>
			</div>
		</div>
	)
}