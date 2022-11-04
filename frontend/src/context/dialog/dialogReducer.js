import { OPEN_DIALOG, CLOSE_DIALOG } from '../types'

const DialogReducer = (state, action) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        open: true,
        userId: action.payload,
      }
    case CLOSE_DIALOG:
      return {
        open: false,
        userId: null,
      }
    default:
      return state
  }
}

export default DialogReducer
