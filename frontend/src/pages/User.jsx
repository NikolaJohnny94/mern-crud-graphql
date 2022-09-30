import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../queries/UserQueries'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import WorkIcon from '@mui/icons-material/Work'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import moment from 'moment'
import '../styles/user-page.scss'

const User = () => {
  const params = useParams()
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { slug: params.slug },
  })

  if (loading) {
    return (
      <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={10}>
        <LinearProgress color='primary' />
      </Stack>
    )
  }
  return (
    <>
      <div className='user-page-container'>
        <Card className='user-page-card'>
          <CardContent className='user-page-card-content'>
            <Typography gutterBottom variant='h4' component='div'>
              {data.userBySlug.firstName} {data.userBySlug.lastName}
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              className='user-page-card-info'
            >
              <WorkIcon />
              <Tooltip title='Occupation' placement='right' arrow>
                <span> {data.userBySlug.occupation}</span>
              </Tooltip>
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              className='user-page-card-info'
            >
              <EmailIcon />
              <Tooltip title='Email' placement='right' arrow>
                <span>{data.userBySlug.email}</span>
              </Tooltip>
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              className='user-page-card-info'
            >
              <LocalPhoneIcon />
              <Tooltip title='Phone Number' placement='right' arrow>
                <span>{data.userBySlug.phoneNumber}</span>
              </Tooltip>
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              className='user-page-card-info'
            >
              <CalendarMonthIcon />{' '}
              <Tooltip title='Created At' placement='right' arrow>
                <span>
                  {moment(data.userBySlug.createdAt).format(
                    'MMMM Do YYYY, h:mm:ss a'
                  )}
                </span>
              </Tooltip>
            </Typography>
            {data.userBySlug.createdAt !== data.userBySlug.updatedAt && (
              <Typography
                variant='body2'
                color='text.secondary'
                className='user-page-card-info'
              >
                <ModeEditIcon />{' '}
                <Tooltip title='Updated At' placement='right' arrow>
                  <span>
                    {moment(data.userBySlug.updatedAt).format(
                      'MMMM Do YYYY, h:mm:ss a'
                    )}
                  </span>
                </Tooltip>
              </Typography>
            )}
          </CardContent>
        </Card>
        <Box className='go-back-home-button-container '>
          <Tooltip title='Go Back' placement='right' arrow>
            <ArrowCircleLeftIcon
              className='go-back-home-button'
              onClick={() => navigate('/')}
            />
          </Tooltip>
        </Box>
      </div>
    </>
  )
}

export default User
