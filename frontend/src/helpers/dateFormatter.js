import moment from 'moment'

const dateFormatter = (date) => {
  return moment(date).format('MMMM Do YYYY, hh:mm:ss a')
}

export default dateFormatter
