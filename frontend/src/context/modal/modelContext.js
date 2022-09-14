import { createContext, useReducer, useContext } from 'react'
import { initialState } from './ModalState'
import modalReducer from './modalReducer'

export const ModalContext = createContext(initialState)

export const useModalContext = () => {
  return useContext(ModalContext)
}

export const ModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState)

  return (
    <ModalContext.Provider
      value={{
        open: state.open,
        editForm: state.editForm,
        editUser: state.editUser,
        dispatch,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
