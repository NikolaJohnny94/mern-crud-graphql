import UserModel from '../models/User'

const countingUserDocuments = async () => {
  const totalDocuments = await UserModel.countDocuments()
  return totalDocuments
}

export default countingUserDocuments
