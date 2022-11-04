import { useReducer } from 'react'
import initialState from './DialogState'
import DialogReducer from './DialogReducer'
import DialogContext from './DialogContext'
import { toast } from 'react-toastify'
import { OPEN_DIALOG, CLOSE_DIALOG } from '../types'

const DialogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DialogReducer, initialState)

  const removeUser = (deleteUser) => {
    deleteUser()
    dispatch({ type: CLOSE_DIALOG })
    toast.error('User deleted!', {
      theme: 'colored',
    })
  }

  const openDialog = (user) => {
    dispatch({ type: OPEN_DIALOG, payload: user.id })
  }

  const closeDialog = () => {
    dispatch({ type: CLOSE_DIALOG })
  }

  return (
    <DialogContext.Provider
      value={{
        open: state.open,
        userId: state.userId,
        dispatch,
        removeUser,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export default DialogProvider
