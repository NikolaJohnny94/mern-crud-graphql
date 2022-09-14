export const emptyFieldsCheck = (passedData) => {
  return Object.values(passedData).some((field) => field === '')
}
