export default function Switch({ second, setSecond }) {
	return (
		<div className='switch'>
			<div className={'slider' + (second ? ' second' : '')} />
			<div className='options'>
				<div className='option' onClick={() => setSecond(false)}>Мастерская</div>
				<div className='option' onClick={() => setSecond(true)}>Инвентарь</div>
			</div>
		</div>
	)
}