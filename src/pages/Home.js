export default function Home({ tg }) {
	return (
		<div className="home">
			{tg.user ? tg.user.username : 'пользователь не найден'}
		</div>
	)
}