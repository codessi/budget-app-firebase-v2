
import React, { useState } from 'react'
import { useSignup } from './../hooks/useSignup'

 
const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const {signup, error, isPending } = useSignup()

  const onSubmit = (e) => {
    e.preventDefault()
    signup(email, password, userName)
  }

  return (
    <div className="flex bg-gradient-to-r from-teal-500 to-cyan-500 min-h-screen justify-center items-start  ">>
      <form action="" className= "bg-white mt-20 flex flex-col w-96 p-5 rounded-xl space-y-5"  onSubmit= {onSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="">
          <h3>User Name</h3>
          <input type="Text" className="w-full bg-slate-200" id="userName" value={userName} onChange={(e) => {
            setUserName(e.target.value)
          } } />
        </label>
        <label htmlFor="">
          <h3>Email:</h3>
          <input type="email"className="w-full bg-slate-200"  id="email" value={email} onChange={(e) => {
            setEmail(e.target.value)
          } } />
        </label>
      
        <label htmlFor="">
          <h3>Password:</h3>
          <input type="password" className="w-full bg-slate-200"  value={password} id="password" onChange={e => setPassword(e.target.value)} />
        </label>
        {!isPending && <button className='outline outline-green-300 ' type='submit'>Signup</button>}
        {isPending && <button className='outline outline-green-300 '  disabled type='submit'>Loading</button>}
        {error && <p>{error}</p>}
        
         </form>
    </div>
  )
}

export default Signup
