import { useReducer } from 'react'
import initialState from './DialogState'
import DialogReducer from './DialogReducer'
import DialogContext from './DialogContext'
import { toast } from 'react-toastify'
import { OPEN_DIALOG, CLOSE_DIALOG } from '../types'

const DialogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DialogReducer, initialState)

  // Open Dialog
  const openDialog = (user) => {
    dispatch({ type: OPEN_DIALOG, payload: user.id })
  }

  //CLose Dialog
  const closeDialog = () => {
    dispatch({ type: CLOSE_DIALOG })
  }

  //Remove User
  const removeUser = (deleteUser) => {
    deleteUser()
    dispatch({ type: CLOSE_DIALOG })
    toast.error('User deleted!', {
      theme: 'colored',
    })
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
