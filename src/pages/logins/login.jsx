import {useState} from 'react';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase-config';
import { Link, useNavigate } from 'react-router-dom'
import {motion as m, AnimatePresence} from 'framer-motion'
import Notification from '../../components/notification';
import Input from '../../components/input';
import Button from '../../components/button';
/* import { Browser } from '@capacitor/browser';
import {AiOutlineGoogle} from 'react-icons/ai' */

export default function Login() {
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [error, SetError] = useState('')

  const [isVisible, SetIsVisible] = useState(false)

  const navigate = useNavigate()

  const notification = (message) => {
    SetError(message)
    setTimeout(() => SetIsVisible(false), 3000)
  }

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/home')
    } catch(err) {
      console.log(err.code)
      if (err.code == 'auth/user-not-found') {notification('Email not found'); SetIsVisible(true)}
      else if (err.code == 'auth/wrong-password') {notification('Wrong password'); SetIsVisible(true)}
      else if (err.code == 'auth/too-many-requests') {notification('Too many failed attempts. Please reset your password, or try again later.'); SetIsVisible(true)}
      else if (err.code == 'auth/invalid-email') {notification('Please enter a valid email'); SetIsVisible(true)}
      else {notification('Error. Please try again.'); SetIsVisible(true)}
    }
  }
  
  return (
    <>
      <AnimatePresence>
        {
          isVisible &&
          <Notification body={error} variant='error' />
        }
      </AnimatePresence>
      <m.section
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className='container flex flex-col justify-center items-center h-full mx-auto'>
        <h1 className='font-rossanova-bk mb-10 text-5xl text-slate-400'>Listo</h1>
        <div className='w-[80vw]'>
          <div className='flex flex-col gap-5'>
            <Input 
              type='email' 
              id='email' 
              name='email' 
              placeholder='Email'
              required
              onChange={(e) => SetEmail(e.target.value)} />
            <Input 
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              required
              onChange={(e) => SetPassword(e.target.value)} />
            <Button onClick={login}>Log in</Button>
          </div>
          <p className='mt-3 text-sm text-center text-slate-400'>
            <Link to='/forgotpassword'>Forgot password ?</Link>
          </p>
          <p className='mt-3 text-xs text-center text-slate-600'>
            You are new ?&nbsp;<Link to='/signup' className='text-slate-400'>Go to Sign up</Link> 
          </p>
          {/* Sign in function to be added later down the line */}
          {/* <p 
            className="grid gap-5 items-center text-sm text-center text-slate-700 my-5 relative"
            style={{gridTemplateColumns: '1fr auto 1fr'}}>
            <span className='w-full h-[2px] bg-slate-700'></span>
            Or
            <span className='w-full h-[2px] bg-slate-700'></span>
          </p>
          <Button onClick={SignInWithApple}>
            <div className='flex items-center justify-center gap-3'>
              <AiOutlineGoogle style={{width: '1.25rem', height: '1.25rem'}} /> Log in with Apple
            </div>
          </Button> */}
          {/* Sign in function to be added later down the line */}
        </div>
      </m.section>
    </>
  )
}