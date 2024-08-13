import { Routes, Route } from "react-router-dom"
import Menu from "./Menu"
import Workshop from "./Workshop"
import Task from "./Task"
import Home from "./Home"
import Invite from "./Invite"
import Rating from "./Rating"

export default function App() {
	return (
		<div className="App">
			<div className="content">
				<Routes>
					<Route path="/workshop" element={<Workshop />} />
					<Route path="/task" element={<Task />} />
					<Route path="/" element={<Home />} />
					<Route path="/invite" element={<Invite />} />
					<Route path="/rating" element={<Rating />} />
				</Routes>
			</div>
			<Menu />
		</div>
	)
}