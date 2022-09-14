import { OPEN_DIALOG, CLOSE_DIALOG } from '../types'

const dialogReducer = (state, action) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        open: true,
        userID: action.payload,
      }
    case CLOSE_DIALOG:
      return {
        open: false,
        userID: null,
      }
    default:
      return state
  }
}

export default dialogReducer
