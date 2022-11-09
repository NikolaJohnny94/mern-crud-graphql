import { useReducer } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import initialState from './DarkModeState'
import DarkModeReducer from './DarkModeReducer'
import DarkModeContext from './DarkModeContext'
import { DARK_MODE_ON, DARK_MODE_OFF } from '../types'

const DarkModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, initialState)
  const [darkMode, setDarkModeValue] = useLocalStorage('darkMode', false)

  //Dark Mode toggle
  const darkModeToggle = () => {
    if (darkMode) {
      dispatch({ type: DARK_MODE_OFF })
      setDarkModeValue(false)
    } else {
      dispatch({ type: DARK_MODE_ON })
      setDarkModeValue(true)
    }
  }

  return (
    <DarkModeContext.Provider
      value={{ darkMode: state.darkMode, dispatch, darkModeToggle }}
    >
      {children}
    </DarkModeContext.Provider>
  )
}

export default DarkModeProvider