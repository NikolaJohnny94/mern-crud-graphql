import { DARK_MODE } from '../types'

const darkModeReducer = (state, action) => {
  switch (action.type) {
    case DARK_MODE:
      return {
        darkMode: !state.darkMode,
      }
    default: {
      return state
    }
  }
}

export default darkModeReducer
