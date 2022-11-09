import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useModalContext } from '../context/modal/ModalContext'
import { useDialogContext } from '../context/dialog/DialogContext'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'
import '../styles/table-row.scss'

const DataTableRow = ({ user, index }) => {
  const { openDialog } = useDialogContext()
  const { populateEditForm } = useModalContext()

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
              onClick={() => populateEditForm(user)}
            />
          </Tooltip>
        </TableCell>
        <TableCell align='center'>
          <Tooltip title='Delete User' placement='top' arrow>
            <DeleteIcon
              className='table-row-icons table-row-delete-icon'
              onClick={() => openDialog(user)}
            />
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  )
}

DataTableRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    occupation: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
}

export default DataTableRow
