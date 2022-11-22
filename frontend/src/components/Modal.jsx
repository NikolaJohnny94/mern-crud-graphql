import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useModalContext } from '../context/modal/ModalContext'
import { useDarkModeContext } from '../context/dark-mode/DarkModeContext'
import { ADD_USER, UPDATE_USER } from '../mutations/userMutations'
import { GET_USER, GET_USERS } from '../queries/UserQueries'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import Modal from '@mui/material/Modal'
import '../styles/modal.scss'

const FormModal = () => {
  const { darkMode } = useDarkModeContext()

  const {
    open,
    editMode,
    currentUser,
    addNewUser,
    updateExistingUser,
    closeModal,
  } = useModalContext()

  const [errorInput, setErrorInput] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
    phoneNumber: '',
  })

  useEffect(() => {
    if (editMode) {
      setData(currentUser)
    }
  }, [editMode, currentUser])

  const { firstName, lastName, email, occupation, phoneNumber } = data

  const [addUser] = useMutation(ADD_USER, {
    variables: { firstName, lastName, email, occupation, phoneNumber },
    update(cache, { data: { addUser } }) {
      const { users } = cache.readQuery({
        query: GET_USERS,
      })
      cache.writeQuery({
        query: GET_USERS,
        data: {
          users: [...users, addUser],
        },
      })
    },
  })

  const [updateUser] = useMutation(UPDATE_USER, {
    variables: {
      id: currentUser?.id,
      firstName,
      lastName,
      email,
      occupation,
      phoneNumber,
    },
    refetchQueries: [
      { query: GET_USER, variables: { slug: currentUser?.slug } },
    ],
  })

  const onChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = () => {
    addNewUser(data, setErrorInput, setEmailError, addUser, setData)
  }

  const onUpdate = () => {
    updateExistingUser(email, setEmailError, updateUser, setData)
  }

  const onClose = () => {
    closeModal(editMode, setErrorInput, setData)
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          className={
            darkMode ? 'modal-box-container dark-mode' : 'modal-box-container'
          }
        >
          <Box className='modal-icon-and-title-container'>
            <CloseIcon className='modal-close-icon' onClick={onClose} />
            <Typography
              className='modal-title'
              id='modal-modal-title'
              variant='h5'
              component='h2'
            >
              Create new user
            </Typography>
          </Box>
          <TextField
            className='modal-inputs'
            id='outlined-basic'
            label='First Name'
            variant='outlined'
            name='firstName'
            type='text'
            value={firstName}
            onChange={onChange}
            required
            error={errorInput && firstName === ''}
          />
          <TextField
            className='modal-inputs'
            id='outlined-basic'
            label='Last Name'
            variant='outlined'
            name='lastName'
            type='text'
            value={lastName}
            onChange={onChange}
            required
            error={errorInput && lastName === ''}
          />
          <TextField
            className='modal-inputs'
            id='outlined-basic'
            label='Email'
            variant='outlined'
            name='email'
            type='email'
            value={email}
            onChange={onChange}
            required
            error={(errorInput && email === '') || emailError}
            autoComplete='email'
          />
          <TextField
            className='modal-inputs'
            id='outlined-basic'
            label='Occupation'
            variant='outlined'
            name='occupation'
            type='text'
            value={occupation}
            onChange={onChange}
            required
            error={errorInput && occupation === ''}
          />
          <TextField
            className='modal-inputs'
            id='outlined-basic'
            label='Phone'
            variant='outlined'
            name='phoneNumber'
            type='text'
            value={phoneNumber}
            onChange={onChange}
            required
            error={errorInput && phoneNumber === ''}
          />
          {editMode ? (
            <Button
              className='modal-update-button'
              variant='contained'
              color='success'
              onClick={onUpdate}
            >
              Update
            </Button>
          ) : (
            <Button
              className='modal-submit-button'
              variant='contained'
              color='primary'
              onClick={onSubmit}
            >
              Submit
            </Button>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default FormModal
