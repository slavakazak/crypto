import { createContext, useState, useEffect } from "react"
import getToken from "../utils/getToken"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
	const [token, setToken] = useState(null)

	async function updateToken() {
		const newToken = await getToken()
		setToken(newToken)
	}

	useEffect(() => {
		async function init() {
			await updateToken()
		}
		init()
	}, [])

	return (
		<AuthContext.Provider value={{ token, updateToken }}>
			{children}
		</AuthContext.Provider>
	)
}
