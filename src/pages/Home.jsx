import {auth} from '../firebase-config'
import {onAuthStateChanged, signOut} from 'firebase/auth'
import { useState } from 'react'
import Button from '../components/button'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  const logout = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <section className='container px-4 pt-4'>
      Hello {user.displayName}
      <Button onClick={logout}>Log out</Button> 
    </section>
  )
}