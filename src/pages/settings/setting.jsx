import { useState } from 'react';
import { auth } from '../../firebase-config';
import {signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import {motion as m} from 'framer-motion'
import { Capacitor } from '@capacitor/core';
import {App} from '@capacitor/app'
import Button from '../../components/button'

export default function Settings({photoURL, displayName, email}) {
  const navigate = useNavigate()
  const [appVersion, setAppVersion] = useState('')

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  if (Capacitor.isNativePlatform()) {
    App.getInfo()
    .then(info => setAppVersion(info.version))
  }

  return(
    <m.section
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className='container px-4 pt-4 relative h-full'>
      <h1 className='text-3xl text-slate-400 font-rossanova-bk'>Settings</h1>

      <div
        className={`absolute bottom-[20px] left-1/2 -translate-x-1/2 w-full px-4`}
        style={{paddingBottom: 'env(safe-area-inset-bottom)'}}>
        <Button onClick={() => logout()}>Log out</Button>
        <p className="text-slate-700 text-center">{appVersion}</p>
      </div>
    </m.section>
  )
}