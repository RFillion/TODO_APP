import { useState, useRef } from 'react';
import { auth } from '../../firebase-config';
import {
  signOut, 
  updateEmail, 
  updatePassword,
  updateProfile,
  reauthenticateWithCredential, 
  EmailAuthProvider
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import {motion as m} from 'framer-motion'
import { Capacitor } from '@capacitor/core';
import {App} from '@capacitor/app'
import Sheets from '../../components/sheets'
import Button from '../../components/button'
import Input from '../../components/input';
import defaultIMG from '../../assets/images/user.jpg'

import {MdEmail, MdInsertPhoto} from 'react-icons/md'
import {FaLock, FaUserEdit} from 'react-icons/fa'
import {BiLogOut} from 'react-icons/bi'
import {AiOutlineUserDelete} from 'react-icons/ai'

export default function Settings({photoURL, displayName, email}) {
  const navigate = useNavigate()
  const [appVersion, setAppVersion] = useState('')

  const [showEmail, setShowEmail] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showUsername, setShowUsername] = useState(false)
  const [showPicture, setShowPicture] = useState(false)

  const [changeEmail, setChangeEmail] = useState('')
  const [passwordChangeEmail, setPasswordChangeEmail] = useState('')

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [newUsername, setNewUsername] = useState('')

  const ref = useRef();
  const snapTo = (i) => ref.current?.snapTo(i);

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

  const updateEmailUser = async () => {
    let emailInput = document.querySelector('#changeEmail')
    let emailInputConfirmation = document.querySelector('#changeEmailConfirmation')
    let passwordChangeEmailInput = document.querySelector('#passwordChangeEmail')

    const credential = EmailAuthProvider.credential(auth.currentUser.email, passwordChangeEmail);
    
    if ((emailInput.value === emailInputConfirmation.value) && (emailInput.value !== '') && (emailInputConfirmation.value !== '') && (passwordChangeEmailInput.value !== '')) {
      try {
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updateEmail(auth.currentUser, changeEmail);
        alert("Email updated successfully")
        setShowEmail(false)
      } catch(err) {
        if (err.code == 'auth/wrong-password') {alert('Wrong password')}
        else if (err.code == 'auth/invalid-email') {alert('Email is invalid')}
        else if (err.code == 'auth/email-already-in-use') {alert('This email is already in use')}
        else {alert('Something went wrong')}
      }
    } else {
      alert('Email or password is wrong')
    }
  }

  const updatePasswordUser = async () => {
    let oldPasswordInput = document.querySelector('#oldPassword')
    let newPasswordInput = document.querySelector('#newPassword')
    let newPasswordConfirmationInput = document.querySelector('#newPasswordConfirmation')

    const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword)

    if ((newPasswordInput.value === newPasswordConfirmationInput.value) && (oldPasswordInput.value !== '') && (newPasswordInput !== '') && (newPasswordConfirmationInput.value !== '')) {
      try {
        await reauthenticateWithCredential(auth.currentUser, credential)
        await updatePassword(auth.currentUser, newPassword)
        alert("Password updated successfully")
        setShowPassword(false)
      } catch(err) {
        console.log(err.code)
        if (err.code == 'auth/wrong-password') {alert('Wrong password')}
        else if (err.code == 'auth/weak-password') {alert('Weak password. Please type at least 6 characters.')}
      }
    } else {
      alert('Password is wrong')
    }
  }
  
  const updateUsernameUser = async () => {
    let newUsernameInput = document.querySelector('#newUsername')

    if (newUsernameInput.value !== '') {
      try {
        await updateProfile(auth.currentUser, {displayName: newUsername})
        alert('Username updated successfully')
        setShowUsername(false)
      } catch(err) {
        console.log(err.code)
      }
    } else {
      alert('Something is wrong.')
    }
  }
  
  const updatePicture = () => {
    
  }

  return(
    <m.section
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className='container px-4 pt-4 relative h-full'>
      <div className='flex justify-between items-center mb-10'>
        <h1 className='text-4xl text-center text-slate-400 font-rossanova-bk'>Settings</h1>
        <img src={photoURL ? photoURL : defaultIMG} className='w-10 h-10 rounded-lg' />
      </div>
      <div className='grid gap-x-2' style={{gridTemplateColumns: '1fr 1fr'}}>
        <Button onClick={() => setShowEmail(true)}>
          <div className='flex items-center gap-2'>
            <MdEmail style={{width: '20px', height: '20px'}} /> Email
          </div>
        </Button>
        <Button onClick={() => setShowPassword(true)}>
          <div className='flex items-center gap-2'>
            <FaLock style={{width: '15px', height: '15px'}} /> Password
          </div>
        </Button>
        <Button onClick={() => setShowUsername(true)}>
          <div className='flex items-center gap-2'>
            <FaUserEdit style={{width: '18px', height: '18px'}} /> Username
          </div>
        </Button>
        <Button onClick={() => setShowPicture(true)}>
          <div className='flex items-center gap-2'>
            <MdInsertPhoto style={{width: '18px', height: '18px'}} /> Picture
          </div>
        </Button>
      </div>
      <div
        className={`absolute bottom-[20px] left-1/2 -translate-x-1/2 w-full px-4`}
        style={{paddingBottom: 'env(safe-area-inset-bottom)'}}>
        <div className='mt-5'>
          <Button>
            <div className="flex justify-center items-center gap-2">
              <AiOutlineUserDelete style={{width: '18px', height: '18px'}} /> Delete account
            </div>
          </Button>
          <Button onClick={() => logout()}>
            <div className="flex justify-center items-center gap-2">
              <BiLogOut style={{width: '18px', height: '18px'}} /> Log out
            </div>
          </Button>
        </div>
        <p className="text-slate-700 text-center">{appVersion ? appVersion : 'Version'} - {displayName}</p>
      </div>

      {/* modals */}
      <Sheets
        ref={ref}
        open={showEmail}
        close={() => setShowEmail(false)}
        snapPoint={400}>
        <div className="container px-4 pt-4 relative h-full">
          <h1 className='text-slate-400 font-rossanova-bk text-2xl text-center mb-5'>Change Email</h1>
          <div className="flex flex-col gap-3">
            <Input
              type='email' 
              id='changeEmail' 
              name='changeEmail' 
              placeholder='Email'
              required
              onChange={(e) => setChangeEmail(e.target.value)} />
            <Input 
              type='email' 
              id='changeEmailConfirmation' 
              name='changeEmailConfirmation' 
              placeholder='Confirm email'
              required />
            <Input
              type='password'
              id='passwordChangeEmail'
              name='passwordChangeEmail'
              placeholder='Password'
              onChange={(e) => setPasswordChangeEmail(e.target.value)} />
          </div>
          <div
            className={`absolute bottom-[20px] left-1/2 -translate-x-1/2 w-full px-4`}
            style={{paddingBottom: 'env(safe-area-inset-bottom)'}}>
            <Button onClick={updateEmailUser}>Update Email</Button>
          </div>
        </div>
      </Sheets>

      <Sheets
        ref={ref}
        open={showPassword}
        close={() => setShowPassword(false)}
        snapPoint={400}>
        <div className="container px-4 pt-4 relative h-full">
          <h1 className='text-slate-400 font-rossanova-bk text-2xl text-center mb-5'>Change Password</h1>
          <div className="flex flex-col gap-3">
            <Input
              type='password'
              id='oldPassword'
              name='oldPassword'
              placeholder='Current Password'
              onChange={(e) => setOldPassword(e.target.value)} />
            <Input
              type='password'
              id='newPassword'
              name='newPassword'
              placeholder='New Password'
              onChange={(e) => setNewPassword(e.target.value)} />
            <Input
              type='password'
              id='newPasswordConfirmation'
              name='newPasswordConfirmation'
              placeholder='Confirm New Password' />
          </div>
          <div
            className={`absolute bottom-[20px] left-1/2 -translate-x-1/2 w-full px-4`}
            style={{paddingBottom: 'env(safe-area-inset-bottom)'}}>
            <Button onClick={updatePasswordUser}>Update Password</Button>
          </div>
        </div>
      </Sheets>
      
      <Sheets
        ref={ref}
        open={showUsername}
        close={() => setShowUsername(false)}
        snapPoint={400}>
        <div className="container px-4 pt-4 relative h-full">
          <h1 className='text-slate-400 font-rossanova-bk text-2xl text-center mb-5'>Change Username</h1>
          <div className="flex flex-col gap-3">
            <Input 
              type='text'
              id='newUsername'
              name='newUsername'
              placeholder='New Username'
              onChange={(e) => setNewUsername(e.target.value)} />
          </div>
          <div
            className={`absolute bottom-[20px] left-1/2 -translate-x-1/2 w-full px-4`}
            style={{paddingBottom: 'env(safe-area-inset-bottom)'}}>
            <Button onClick={updateUsernameUser}>Update Username</Button>
          </div>
        </div>
      </Sheets>
      
      <Sheets
        ref={ref}
        open={showPicture}
        close={() => setShowPicture(false)}
        snapPoint={400}>
        test Picture
      </Sheets>
    </m.section>
  )
}