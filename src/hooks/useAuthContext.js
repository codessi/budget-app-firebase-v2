import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw Error("useAuthContext must be inside in AuthContextProvider")
  }
// this return object{...state, user:null}
  return context
}
