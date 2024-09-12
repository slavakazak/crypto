import { createContext, useState, useEffect, useContext } from "react"
import { DataContext } from "./DataProvider"

export const HeightContext = createContext()

export function HeightProvider({ children }) {
	const { tg } = useContext(DataContext)
	//Window height
	const [height, setHeight] = useState(0)
	const [maxHeight, setMaxHeight] = useState(0)

	function scrollHandler() {
		window.scrollTo({ top: 0, behavior: 'smooth' })
		setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 500)
	}
	function updateHeight() {
		if (tg) {
			setHeight(Math.min(tg.viewportHeight, tg.viewportStableHeight, document.documentElement.clientHeight, window.innerHeight))
		} else {
			setHeight(Math.min(document.documentElement.clientHeight, window.innerHeight))
		}
	}
	// function focusHandler() {
	// 	setTimeout(() => {
	// 		let focusedElement = document.activeElement
	// 		if (focusedElement && (focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA')) {
	// 			const top = focusedElement.getBoundingClientRect().top + document.querySelector('.App').scrollTop
	// 			document.querySelector('.App').scrollTo({ top: top - 200, behavior: 'smooth' })
	// 		}
	// 	}, 700)
	// }
	useEffect(() => {
		if (tg) {
			setMaxHeight(Math.max(tg.viewportHeight, tg.viewportStableHeight, document.documentElement.clientHeight, window.innerHeight))
		} else {
			setMaxHeight(Math.max(document.documentElement.clientHeight, window.innerHeight))
		}
		updateHeight()
		tg?.onEvent('viewportChanged', updateHeight)
		window.addEventListener('resize', updateHeight)
		document.addEventListener('touchend', scrollHandler, false)
		document.addEventListener('touchcancel', scrollHandler, false)
		//document.addEventListener('focus', focusHandler, true)
		return () => {
			tg?.offEvent('viewportChanged', updateHeight)
			window.removeEventListener('resize', updateHeight)
			document.removeEventListener('touchend', scrollHandler, false)
			document.removeEventListener('touchcancel', scrollHandler, false)
			//document.removeEventListener('focus', focusHandler, true)
		}
	}, [tg])

	return (
		<HeightContext.Provider value={{ height, maxHeight }}>
			{children}
		</HeightContext.Provider>
	)
}
