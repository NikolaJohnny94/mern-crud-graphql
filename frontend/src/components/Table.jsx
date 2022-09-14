import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/UserQueries'
import { OPEN_MODAL } from '../context/types'
import { useModalContext } from '../context/modal/modelContext'
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
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'
import TablePagination from '@mui/material/TablePagination'
import Tooltip from '@mui/material/Tooltip'
import '../styles/table.scss'

const DataTable = () => {
  const { data, loading, error } = useQuery(GET_USERS)
  const { dispatch } = useModalContext()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  if (loading) {
    return (
      <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={10}>
        <LinearProgress color='primary' />
      </Stack>
    )
  }

  if (error) {
    return <h1>Error Occured</h1>
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
              onClick={() => dispatch({ type: OPEN_MODAL })}
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
            <TableBody>
              {data.users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <DataTableRow
                    className='table-row'
                    key={user.id}
                    user={user}
                    index={page === 0 ? index : index + page * rowsPerPage}
                  />
                ))}
            </TableBody>
          </Table>
          <TablePagination
            className='table-pagination'
            rowsPerPageOptions={[1, 3, 5, 10, 15, 25, 100]}
            component='div'
            count={data.users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </>
  )
}

export default DataTable
