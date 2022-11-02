import { useState, useEffect } from 'react'

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() =>
    localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : defaultValue
  )

  useEffect(() => {
    localStorage.setItem(
      key,
      JSON.stringify(value instanceof Function ? value() : value)
    )
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
