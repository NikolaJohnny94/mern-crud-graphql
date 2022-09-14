import { createContext, useReducer, useContext } from 'react'
import { initialState } from './DialogState'
import dialogReducer from './dialogReducer'

export const DialogContext = createContext(initialState)

export const useDialogContext = () => {
  return useContext(DialogContext)
}

export const DialogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dialogReducer, initialState)

  return (
    <DialogContext.Provider
      value={{
        open: state.open,
        confirmDelete: state.confirmDelete,
        userID: state.userID,
        dispatch,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}
