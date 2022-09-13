import { useEffect, useState } from "react"
// key "budget"  inialv []

export const useLocalStorage = (key, initialValue) => {

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) {
      // there is an object then setValue
     return JSON.parse(jsonValue)
    }
    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])
  

  return [value, setValue]

}