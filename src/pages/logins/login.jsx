import {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/input';
import Button from '../../components/button';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
      
  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      navigate("/home")
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }

  return (
    <>
      <section className='container flex flex-col justify-center items-center h-full'>
        <h1 className='font-rossanova-bk mb-10 text-5xl'>Listo</h1>
        <div className='w-[80vw]'>
          <form className='flex flex-col gap-5'>
            <Input 
              type='email' 
              id='email' 
              name='email' 
              placeholder='Email' 
              onChange={(e) => setEmail(e.target.value)} />
            <Input 
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={onLogin}>Log in</Button>
          </form>
          <p className='mt-5 text-sm text-center text-slate-600'>
            You are new ? <Link to='/signup' className='text-slate-400'>Go to Sign up</Link> 
          </p>
        </div>
      </section>
    </>
  )
}