import { createContext, useContext } from 'react'
import initialState from './DialogState'

const DialogContext = createContext(initialState)

export const useDialogContext = () => {
  return useContext(DialogContext)
}

export default DialogContext
