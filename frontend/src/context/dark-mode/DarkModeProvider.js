import useLocalStorage from '../../hooks/useLocalStorage'
import DarkModeContext from './DarkModeContext'

const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkModeValue] = useLocalStorage('darkMode', false)

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        setDarkModeValue,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  )
}

export default DarkModeProvider
