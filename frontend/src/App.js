import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDarkModeContext } from './context/dark-mode/darkModeContext'
import { ToastContainer } from 'react-toastify'
import Layout from './components/layout'
import Home from './pages/Home'
import User from './pages/User'
import 'react-toastify/dist/ReactToastify.css'
import './styles/dark-mode.scss'

const App = () => {
  const { darkMode } = useDarkModeContext()
  const [showFooter, setShowFooter] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowFooter(true)
    }, 100)
  }, [])

  return (
    <div className={`app ${darkMode && 'dark-mode'}`}>
      <Router>
        <Layout showFooter={showFooter}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user/:slug' element={<User />} />
          </Routes>
          <ToastContainer
            position='top-center'
            autoClose={2000}
            theme='colored'
          />
        </Layout>
      </Router>
    </div>
  )
}

export default App
