import { createContext, useContext } from 'react'
import initialState from './DarkModeState'

const DarkModeContext = createContext(initialState)

export const useDarkModeContext = () => {
  return useContext(DarkModeContext)
}

export default DarkModeContext
