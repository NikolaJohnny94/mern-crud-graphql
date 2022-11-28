import { useReducer } from 'react'
import initialState from './ModalState'
import ModalReducer from './ModalReducer'
import ModalContext from './ModalContext'
import emptyFieldsCheck from '../../helpers/emptyFieldsCheck'
import validateEmail from '../../helpers/validateEmail'
import { toast } from 'react-toastify'
import {
  CLOSE_MODAL,
  OPEN_MODAL,
  OPEN_EDIT_FORM,
  CLOSE_EDIT_FORM,
} from '../types'

const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ModalReducer, initialState)

  //Add New User
  const addNewUser = async (
    data,
    setErrorInput,
    setEmailError,
    addUser,
    setData
  ) => {
    const { firstName, lastName, email, occupation, phoneNumber } = data

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
        dispatch({ type: CLOSE_MODAL })
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

  //Populate Edit Form
  const populateEditForm = (user) => {
    dispatch({
      type: OPEN_EDIT_FORM,
      payload: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        occupation: user.occupation,
        phoneNumber: user.phoneNumber,
        slug: user.slug,
      },
    })
  }

  //Update User
  const updateExistingUser = async (
    email,
    setEmailError,
    updateUser,
    setData
  ) => {
    try {
      if (!validateEmail(email)) {
        toast.error('Please enter an valid email')
        setEmailError(true)
        return
      }
      setEmailError(false)
      await updateUser()
      dispatch({ type: CLOSE_EDIT_FORM })
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

  //Open Modal
  const openModal = () => {
    dispatch({ type: OPEN_MODAL })
  }

  //Close Modal
  const closeModal = (editMode, setErrorInput, setData) => {
    if (editMode) {
      dispatch({ type: CLOSE_EDIT_FORM })
    } else {
      dispatch({ type: CLOSE_MODAL })
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
    <ModalContext.Provider
      value={{
        open: state.open,
        editMode: state.editMode,
        currentUser: state.currentUser,
        dispatch,
        addNewUser,
        populateEditForm,
        updateExistingUser,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
