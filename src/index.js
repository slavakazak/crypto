import "./styles/styles.scss"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./components/App"
import { BrowserRouter } from "react-router-dom"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
	apiKey: "AIzaSyAmAI-cBx5zPljDITn96HrZXM9PP2oh3-c",
	authDomain: "crypto-58ebb.firebaseapp.com",
	projectId: "crypto-58ebb",
	storageBucket: "crypto-58ebb.appspot.com",
	messagingSenderId: "374182859359",
	appId: "1:374182859359:web:65092308887fd9a47f01ea"
}

const app = initializeApp(firebaseConfig)

const root = createRoot(document.getElementById("root"))

root.render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
)