import { useDarkModeContext } from '../../context/dark-mode/darkModeContext'
import Navbar from './Navbar'
import Footer from './Footer'
import '../../styles/layout.scss'

const Layout = ({ children, showFooter }) => {
  const { darkMode } = useDarkModeContext()

  return (
    <>
      <Navbar />
      <div className='children-component-container'>{children}</div>
      {showFooter && <Footer />}
    </>
  )
}

export default Layout
