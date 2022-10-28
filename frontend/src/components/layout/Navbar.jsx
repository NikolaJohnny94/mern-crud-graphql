import { Link } from 'react-router-dom'
import { useDarkModeContext } from '../../context/dark-mode/darkModeContext'
import { DARK_MODE } from '../../context/types'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import Tooltip from '@mui/material/Tooltip'
import '../../styles/navbar.scss'

const Navbar = ({ title, img }) => {
  const { darkMode, dispatch } = useDarkModeContext()

  return (
    <Box className='navbar-container'>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' className='navbar-logo'>
            <Link to='/'>
              <img src={img.url} alt={img.alt} />
            </Link>
            <span className='navbar-title'>{title}</span>
          </Typography>
          <Button color='inherit' onClick={() => dispatch({ type: DARK_MODE })}>
            <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'} arrow>
              {darkMode ? <WbSunnyIcon /> : <DarkModeIcon />}
            </Tooltip>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.object.isRequired,
}

export default Navbar
