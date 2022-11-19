import { createContext, useContext } from 'react'

const DarkModeContext = createContext()

export const useDarkModeContext = () => {
  return useContext(DarkModeContext)
}

export default DarkModeContext
