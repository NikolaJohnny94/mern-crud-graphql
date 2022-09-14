import { createContext, useReducer, useContext } from 'react'
import initialState from './DarkModeState'
import darkModeReducer from './darkModeReducer'

const DarkModeContext = createContext(initialState)

export const useDarkModeContext = () => {
  return useContext(DarkModeContext)
}

export const DarkModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(darkModeReducer, initialState)

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  )
}
