import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ApolloProvider } from '@apollo/client'
import client from './apollo-client/ApolloClient'
import { ModalContextProvider } from './context/modal/modelContext'
import { DialogContextProvider } from './context/dialog/dialogContext'
import { DarkModeProvider } from './context/dark-mode/darkModeContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <DarkModeProvider>
        <ModalContextProvider>
          <DialogContextProvider>
            <App />
          </DialogContextProvider>
        </ModalContextProvider>
      </DarkModeProvider>
    </ApolloProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()