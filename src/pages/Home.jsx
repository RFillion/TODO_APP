import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const [user, setUser] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.displayName)
      } else {
        console.log('User logged out')
      }
    })
  }, [])

  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
      navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {
      console.log(error)
    });
  }

  SafeArea.getStatusBarHeight().then(({statusBarHeight}) => setSafeArea(statusBarHeight))

  return (
    <section className='container px-4 pt-4'>
      Hello {user}
      <button onClick={handleLogout}>Log out</button> 
    </section>
  )
}