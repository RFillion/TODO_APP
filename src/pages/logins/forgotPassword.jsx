import { useState } from 'react'
import { Link } from 'react-router-dom'
import {motion as m} from 'framer-motion'
import {sendPasswordResetEmail} from 'firebase/auth'
import {auth} from '../../firebase-config'
import Input from '../../components/input'
import Button from '../../components/button'

export default function forgotPassword() {
  const [email, SetEmail] = useState('')

  const passwordReset = async () => {
    await sendPasswordResetEmail(auth, email);
    alert('Email sent')
  }

  return(
    <m.section
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="container flex flex-col justify-center items-center h-full mx-auto w-[80vw]">
      <h1 className='font-rossanova-bk mb-5 text-5xl'>Recovery</h1>
      <p className='text-sm text-center text-slate-400'>
        Forgot your password? That's okay! Please enter your email adress in the box below, and we will take care of you. 
      </p>
      <div className='flex flex-col gap-5 mt-5 w-full'>
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => SetEmail(e.target.value)} />
        <Button onClick={passwordReset}>Send verification email</Button>
      </div>
      <p className='mt-5 text-xs text-center text-slate-600'>
        Already have an account ? <Link to='/' className='text-slate-400'>Return to login</Link>
      </p>
    </m.section>
  )
}