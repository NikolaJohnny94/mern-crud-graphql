import { Link } from 'react-router-dom'
import { useModalContext } from '../context/modal/modelContext'
import { useDialogContext } from '../context/dialog/dialogContext'
import { OPEN_EDIT_FORM, OPEN_DIALOG } from '../context/types'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'
import '../styles/table-row.scss'

const DataTableRow = ({ user, index }) => {
  const { dispatch: dispatchDialogAction } = useDialogContext()
  const { dispatch: dispatchModalAction } = useModalContext()

  const confirmDeleteDialog = () => {
    dispatchDialogAction({ type: OPEN_DIALOG, payload: user.id })
  }

  return (
    <>
      <TableRow className='table-row'>
        <TableCell component='th' align='center' scope='row'>
          {index + 1}
        </TableCell>
        <TableCell align='center'>
          <Tooltip
            title={`View ${user.firstName} ${user.lastName}'s page`}
            placement='top'
            arrow
          >
            <Link to={`/user/${user.slug}`}>{user.firstName} </Link>
          </Tooltip>
        </TableCell>
        <TableCell align='center'>{user.lastName}</TableCell>
        <TableCell align='center'>{user.email}</TableCell>
        <TableCell align='center'>{user.phoneNumber}</TableCell>
        <TableCell align='center'>{user.occupation}</TableCell>
        <TableCell align='center'>
          <Tooltip title='Edit User' placement='top' arrow>
            <EditIcon
              className='table-row-icons  table-row-edit-icon'
              onClick={() =>
                dispatchModalAction({
                  type: OPEN_EDIT_FORM,
                  payload: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    occupation: user.occupation,
                    phoneNumber: user.phoneNumber,
                  },
                })
              }
            />
          </Tooltip>
        </TableCell>
        <TableCell align='center'>
          <Tooltip title='Delete User' placement='top' arrow>
            <DeleteIcon
              className='table-row-icons table-row-delete-icon'
              onClick={confirmDeleteDialog}
            />
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  )
}

export default DataTableRow
