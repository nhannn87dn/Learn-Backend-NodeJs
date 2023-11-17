'use client'

import { useState, FormEvent } from "react"

const LoginForm = ()=>{

  const [user,setUser] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();//ngăn form re-fresh page
    console.log(user);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-1 mx-auto max-w-sm">
      <input onChange={(e)=>{
        setUser(prev => {
          return {...prev, email: e.target.value}
        })
      }} value={user.email}  placeholder="Enter your email" className="border rounded py-2 px-2" type="email" name='email' />
      <input onChange={(e)=>{
        setUser(prev => {
          return {...prev, password: e.target.value}
        })
      }} value={user.password} placeholder="Enter your password" className="border rounded py-2 px-2" type="password" name='password' />
      <button className="bg-indigo-500 text-white py-2 px-2 rounded" type="submit">Login</button>
    </form>
  )
}

export default LoginForm