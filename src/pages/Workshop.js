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
			<hr />
			<div className='init-data'>id*: {tg.initDataUnsafe.user.id}</div>
			<hr />
			<div className='init-data'>is_bot: {tg.initDataUnsafe.user.is_bot}</div>
			<hr />
			<div className='init-data'>first_name*: {tg.initDataUnsafe.user.first_name}</div>
			<hr />
			<div className='init-data'>last_name: {tg.initDataUnsafe.user.last_name}</div>
			<hr />
			<div className='init-data'>username: {tg.initDataUnsafe.user.username}</div>
			<hr />
			<div className='init-data'>language_code: {tg.initDataUnsafe.user.language_code}</div>
			<hr />
			<div className='init-data'>is_premium: {tg.initDataUnsafe.user.is_premium}</div>
			<hr />
			<div className='init-data'>allows_write_to_pm: {tg.initDataUnsafe.user.allows_write_to_pm}</div>
			<hr />
			<div className='init-data'>photo_url: {tg.initDataUnsafe.user.photo_url}</div>
			<hr />
			{posts.map((post, i) => (
				<div key={i}>{post.title.rendered}</div>
			))}
		</div>
	)
}