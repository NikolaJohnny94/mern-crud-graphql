import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Tooltip from '@mui/material/Tooltip'
import '../../styles/footer.scss'

const Footer = () => {
  return (
    <BottomNavigation showLabels className='footer-container'>
      <Tooltip title='Check mu GitHub account' placement='top' arrow>
        <BottomNavigationAction
          className='footer-navigation-action'
          label='GitHub'
          icon={<GitHubIcon className='footer-icon footer-github-icon' />}
        />
      </Tooltip>
      <BottomNavigationAction
        className='footer-navigation-action footer-text'
        label='Developed by Nikola'
      />
      <Tooltip title="Let 's connect on LinkediIn" placement='top' arrow>
        <BottomNavigationAction
          className='footer-navigation-action'
          label='LinkedIn'
          icon={<LinkedInIcon className='footer-icon footer-linkedin-icon' />}
        />
      </Tooltip>
    </BottomNavigation>
  )
}

export default Footer
