import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../queries/UserQueries'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import WorkIcon from '@mui/icons-material/Work'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'
import '../styles/user-page.scss'

const User = () => {
  const params = useParams()
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
              <span> {data.userBySlug.occupation}</span>
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              className='user-page-card-info'
            >
              <EmailIcon /> <span>{data.userBySlug.email}</span>
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              className='user-page-card-info'
            >
              <LocalPhoneIcon /> <span>{data.userBySlug.phoneNumber}</span>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default User
