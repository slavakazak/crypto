import { defaultProfileData } from './constants'
import { createContext } from 'react'

export const HeightContext = createContext({ height: 0, maxHeight: 0 })
export const ProfileContext = createContext(defaultProfileData)
export const WpIdContext = createContext(null)
export const SetDataContext = createContext(null)