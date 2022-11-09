import { useMutation } from '@apollo/client'
import { useDialogContext } from '../context/dialog/DialogContext'
import { useDarkModeContext } from '../context/dark-mode/DarkModeContext'
import { GET_USERS } from '../queries/UserQueries'
import { DELETE_USER } from '../mutations/userMutations'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import '../styles/dialog.scss'

const DeleteUserDialog = () => {
  const { darkMode } = useDarkModeContext()
  const { open, userId, removeUser, closeDialog } = useDialogContext()

  const dialogText = {
    title: 'Delete User ?',
    content: 'Are you sure that you want to proceed with this action ?',
  }

  const [deleteUser] = useMutation(DELETE_USER, {
    variables: { id: userId },
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

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby='responsive-dialog-title'
      className={`delete-user-dialog ${darkMode && 'dark-mode'}`}
    >
      <DialogTitle id='responsive-dialog-title'>{dialogText.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogText.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => removeUser(deleteUser)}
          autoFocus
          variant='contained'
          color='error'
        >
          Yes
        </Button>
        <Button
          autoFocus
          onClick={closeDialog}
          variant='contained'
          color='info'
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteUserDialog
