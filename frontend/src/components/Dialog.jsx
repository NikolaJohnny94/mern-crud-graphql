import { useContext } from 'react'
import { useMutation } from '@apollo/client'
import { DialogContext } from '../context/dialog/dialogContext'
import { useDarkModeContext } from '../context/dark-mode/darkModeContext'
import { GET_USERS } from '../queries/UserQueries'
import { DELETE_USER } from '../mutations/userMutations'
import { CLOSE_DIALOG } from '../context/types'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import '../styles/dialog.scss'

const DeleteUserDialog = () => {
  const { darkMode } = useDarkModeContext()
  const { open, dispatch, userID } = useContext(DialogContext)

  const [deleteUser] = useMutation(DELETE_USER, {
    variables: { id: userID },
    update(cache, { data: { deleteUser } }) {
      const { users } = cache.readQuery({
        query: GET_USERS,
      })
      cache.writeQuery({
        query: GET_USERS,
        data: {
          users: users.filter((user) => user.id !== deleteUser.id),
        },
      })
    },
  })

  const removeUser = () => {
    deleteUser()
    dispatch({ type: CLOSE_DIALOG })
    toast.error('User deleted!', {
      theme: 'colored',
    })
  }

  const onClose = () => {
    dispatch({ type: CLOSE_DIALOG })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='responsive-dialog-title'
      className={`delete-user-dialog ${darkMode && 'dark-mode'}`}
    >
      <DialogTitle id='responsive-dialog-title'>{'Delete User ?'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure that you want to proceed with this action ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={removeUser}
          autoFocus
          variant='contained'
          color='error'
        >
          Yes
        </Button>
        <Button autoFocus onClick={onClose} variant='contained' color='info'>
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteUserDialog
