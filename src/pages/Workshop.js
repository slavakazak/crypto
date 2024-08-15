import { useEffect, useState } from 'react'
import axios from "axios"

export default function Workshop({ tg }) {
	const [posts, setPosts] = useState([]);

	const fetchPosts = () => {
		axios
			.get("https://k2-bot.com/wp-json/wp/v2/posts")
			.then((res) => {
				setPosts(res.data);
			});
	}

	useEffect(() => {
		fetchPosts()
	}, [])


	return (
		<div id="workshop">
			<div>Workshop</div>
			{tg && tg.initDataUnsafe && tg.initDataUnsafe.user ? tg.initDataUnsafe.user.username : 'пользователь не найден'}
			{posts.map((post, i) => (
				<div key={i}>{post.title.rendered}</div>
			))}
		</div>
	)
}