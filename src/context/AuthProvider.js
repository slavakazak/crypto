import { createContext, useState, useEffect } from "react"
import getToken from "../utils/getToken"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
	const [token, setToken] = useState(null)

	useEffect(() => {
		async function init() {
			const newToken = await getToken()
			setToken(newToken)
		}
		init()
	}, [])

	return (
		<AuthContext.Provider value={{ token, auth: token ? { Authorization: `Bearer ${token}` } : null }}>
			{children}
		</AuthContext.Provider>
	)
}
