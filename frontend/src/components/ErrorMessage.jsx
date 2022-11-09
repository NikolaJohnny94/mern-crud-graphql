import GppBadIcon from '@mui/icons-material/GppBad'
import ReportIcon from '@mui/icons-material/Report'
import PropTypes from 'prop-types'
import '../styles/error.scss'

const ErrorMessage = ({ type }) => {
  const messages = [
    {
      text: 'Error Occured',
      icon: <GppBadIcon color='error' className='loading-error-icon' />,
    },
    {
      text: '404 | Not Found',
      icon: <ReportIcon className='not-found-page-icon' />,
    },
  ]

  return (
    <div
      className={
        type === 'loading-error'
          ? 'loading-error-container'
          : type === 'not-found' && 'not-found-page'
      }
    >
      <h1>
        {type === 'loading-error' ? (
          <>
            {messages[0].text} {messages[0].icon}
          </>
        ) : (
          type === 'not-found' && (
            <>
              {messages[1].text} {messages[1].icon}
            </>
          )
        )}
      </h1>
    </div>
  )
}

ErrorMessage.propTypes = {
  type: PropTypes.string.isRequired,
}

export default ErrorMessage
