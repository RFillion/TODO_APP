import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { auth } from '../../firebase-config';
import {motion as m} from 'framer-motion'
import Notification from '../../components/notification'
import Input from '../../components/input';
import Button from '../../components/button';

export default function Signup() {
  const [email, SetEmail] = useState('')
  const [name, SetName] = useState('')
  const [password, SetPassword] = useState('')
  const [error, SetError] = useState('')

  const navigate = useNavigate()

  const notification = (message) => {
    SetError(message)
  }

  const register = async (e) => {
    if (name !== '') {
      try {
        const {user} = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(user, { displayName: name })
        navigate('/home')
      } catch(err) {
        if (err.code == 'auth/invalid-email') {notification('Please enter a valid Email')}
        else if (err.code == 'auth/email-already-in-use') {notification('Email is already in use')}
        else if (err.code == 'auth/weak-password') {notification('Please enter a password with at least 6 characters')}
        else {notification('Error. Please try again')}
      }
    } else {
      notification('Please enter a Username')
    }
  }

  return(
    <>
      {
        error !== '' && <Notification body={error} variant='error' />
      }
      <m.section
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className="container flex flex-col justify-center items-center h-full mx-auto">
        <h1 className="font-rossanova-bk mb-10 text-5xl">Sign Up</h1>
        <div className="w-[80vw]">
          <div className='flex flex-col gap-5'>
            <Input 
              type='text'
              placeholder='Username'
              value={name}
              onChange={(e) => SetName(e.target.value)} />
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => SetEmail(e.target.value)} />
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => SetPassword(e.target.value)} />
            <Button onClick={register}>Sign Up</Button>
          </div>
          <p className='mt-5 text-xs text-center text-slate-600'>
            Already have an account ? <Link to='/' className='text-slate-400'>Return to login</Link>
          </p>
        </div> 
      </m.section>
    </>
  )
}