import { DARK_MODE_ON, DARK_MODE_OFF } from '../types'

const DarkModeReducer = (state, action) => {
  switch (action.type) {
    case DARK_MODE_ON:
      return {
        darkMode: true,
      }
    case DARK_MODE_OFF:
      return {
        darkMode: false,
      }
    default: {
      return state
    }
  }
}

export default DarkModeReducer
