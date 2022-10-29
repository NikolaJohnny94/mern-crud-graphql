import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useModalContext } from '../context/modal/modelContext'
import { useDarkModeContext } from '../context/dark-mode/darkModeContext'
import { CLOSE_MODAL, CLOSE_EDIT_FORM } from '../context/types'
import { ADD_USER, UPDATE_USER } from '../mutations/userMutations'
import { GET_USERS } from '../queries/UserQueries'
import emptyFieldsCheck from '../helpers/emptyFieldsCheck'
import validateEmail from '../helpers/validateEmail'
import { toast } from 'react-toastify'
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
    dispatch: modalDispatch,
    editForm,
    editUser,
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
    if (editForm) {
      setData(editUser)
    }
  }, [editForm, editUser])

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
      id: editUser?.id,
      firstName,
      lastName,
      email,
      occupation,
      phoneNumber,
    },
    update(cache) {
      const { users } = cache.readQuery({
        query: GET_USERS,
      })
      cache.writeQuery({
        query: GET_USERS,
        data: {
          users: users,
        },
      })
    },
  })

  const onChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async () => {
    setErrorInput(true)
    if (!emptyFieldsCheck(data)) {
      if (!validateEmail(email)) {
        toast.error('Please enter an valid email')
        setEmailError(true)
        return
      }
      try {
        setEmailError(false)
        await addUser(firstName, lastName, email, occupation, phoneNumber)
        modalDispatch({ type: CLOSE_MODAL })
        setData({
          firstName: '',
          lastName: '',
          email: '',
          occupation: '',
          phoneNumber: '',
        })
        setErrorInput(false)
        toast.success('New user added!')
      } catch (e) {
        toast.error(e.message)
      }
    }
  }

  const onUpdate = async () => {
    try {
      if (!validateEmail(email)) {
        toast.error('Please enter an valid email')
        setEmailError(true)
        return
      }
      setEmailError(false)
      await updateUser()
      modalDispatch({ type: CLOSE_EDIT_FORM })
      setData({
        firstName: '',
        lastName: '',
        email: '',
        occupation: '',
        phoneNumber: '',
      })
      toast.info('User Updated!')
    } catch (e) {
      toast.error(e.message)
    }
  }

  const onClose = () => {
    if (editForm) {
      modalDispatch({ type: CLOSE_EDIT_FORM })
    } else {
      modalDispatch({ type: CLOSE_MODAL })
    }
    setErrorInput(false)
    setData({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      occupation: '',
      phoneNumber: '',
    })
  }

  return (
    <>
      <Modal
        open={open}
        onClose={() => modalDispatch({ type: CLOSE_MODAL })}
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
          {editForm ? (
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
