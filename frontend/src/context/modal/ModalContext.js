import { createContext, useContext } from 'react'
import initialState from './ModalState'

const ModalContext = createContext(initialState)

export const useModalContext = () => {
  return useContext(ModalContext)
}

export default ModalContext
