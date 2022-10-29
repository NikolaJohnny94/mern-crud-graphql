import GppBadIcon from '@mui/icons-material/GppBad'
import ReportIcon from '@mui/icons-material/Report'
import PropTypes from 'prop-types'
import '../styles/error.scss'

const ErrorMessage = ({ type }) => {
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
            Error Occured{' '}
            <GppBadIcon color='error' className='loading-error-icon' />
          </>
        ) : (
          type === 'not-found' && (
            <>
              404 | Not Found <ReportIcon className='not-found-page-icon' />
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
