const emptyFieldsCheck = (passedData) => {
  return Object.values(passedData).some((field) => field === '')
}

export default emptyFieldsCheck
