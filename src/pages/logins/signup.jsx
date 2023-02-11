import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import Input from '../../components/input';
import Button from '../../components/button';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          user.displayName = username
          navigate("/", { replace: true })
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
      });
  }

  return(
    <>
      <section className="container flex flex-col justify-center items-center h-full">
        <h1 className="font-rossanova-bk mb-10 text-5xl">Sign Up</h1>
        <div className="w-[80vw]">
          <form className='flex flex-col gap-5'>
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            <Input 
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required />
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
            <Button type='submit' onclick={onSubmit}>Sign Up</Button>
          </form>
          <p className='mt-5 text-sm text-center text-slate-600'>
            Already have an account ? <Link to='/' className='text-slate-400'>Return to login</Link>
          </p>
        </div> 
      </section>
    </>
  )
}