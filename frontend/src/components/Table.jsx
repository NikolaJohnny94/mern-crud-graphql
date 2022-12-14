import { useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/UserQueries'
import { useModalContext } from '../context/modal/ModalContext'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import FormModal from './Modal'
import DataTableRow from './TableRow'
import ErrorMessage from './ErrorMessage'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'
import TablePagination from '@mui/material/TablePagination'
import Tooltip from '@mui/material/Tooltip'
import '../styles/table.scss'

const DataTable = () => {
  const { openModal } = useModalContext()
  const { data, loading, error } = useQuery(GET_USERS)

  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 0)
  const [rowsPerPage, setRowsPerPage] = useLocalStorage('rowsPerPage', 5)

  const tableCells = [
    'No: ',
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Occupation',
    'Edit',
    'Delete',
  ]

  useEffect(() => {
    if (currentPage >= Math.ceil(data?.users.length / rowsPerPage)) {
      if (currentPage > 0) {
        setCurrentPage((previousState) => previousState - 1)
      }
    }
  }, [data?.users.length])

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setCurrentPage(0)
  }

  const tableRowsPerPage = () => {
    return data.users
      .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
      .map((user, index) => (
        <DataTableRow
          className='table-row'
          key={user.id}
          user={user}
          index={currentPage === 0 ? index : index + currentPage * rowsPerPage}
        />
      ))
  }

  if (loading) {
    return (
      <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={10}>
        <LinearProgress color='primary' />
      </Stack>
    )
  }

  if (error) {
    return <ErrorMessage type='loading-error' />
  }

  return (
    <>
      <FormModal />
      <Box className='table-container'>
        <Box className='add-user-button-container'>
          <Tooltip title='Add New User' placement='left' arrow>
            <Button
              className='add-user-button'
              variant='contained'
              color='primary'
              onClick={openModal}
            >
              Add User
              <PersonAddIcon className='add-user-icon' />
            </Button>
          </Tooltip>
        </Box>
        <TableContainer component={Paper}>
          <Table className='users-table' aria-label='simple table'>
            <TableHead>
              <TableRow className='table-row'>
                {tableCells.map((tableCell, index) => (
                  <TableCell key={index} align='center'>
                    {tableCell}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{tableRowsPerPage()}</TableBody>
          </Table>
          <TablePagination
            className='table-pagination'
            rowsPerPageOptions={[1, 3, 5, 10, 15, 25, 100]}
            component='div'
            count={
              currentPage === 0
                ? data.users.length
                : currentPage >= Math.ceil(data.users.length / rowsPerPage)
                ? data.users.length + 1
                : data.users.length
            }
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </>
  )
}

export default DataTable
