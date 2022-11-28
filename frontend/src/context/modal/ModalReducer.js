import {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_EDIT_FORM,
  CLOSE_EDIT_FORM,
} from '../types'

const ModalReducer = (state, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        open: true,
      }
    case CLOSE_MODAL: {
      return {
        open: false,
      }
    }
    case OPEN_EDIT_FORM: {
      return {
        open: true,
        editMode: true,
        currentUser: action.payload,
      }
    }
    case CLOSE_EDIT_FORM: {
      return {
        open: false,
        editMode: false,
        currentUser: {},
      }
    }
    default:
      return state
  }
}

export default ModalReducer
