import PropTypes from 'prop-types'
import Navbar from './Navbar'
import Footer from './Footer'
import '../../styles/layout.scss'

const Layout = ({ children, showFooter }) => {
  return (
    <>
      <Navbar
        title='MERN + GraphQL + MUI CRUD WEB APP'
        img={{
          url: 'https://i.imgur.com/fZ2zTHA.gif',
          alt: 'MERNQL Logo',
        }}
      />
      <div className='children-component-container'>{children}</div>
      {showFooter && <Footer />}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  showFooter: PropTypes.bool.isRequired,
}

export default Layout
