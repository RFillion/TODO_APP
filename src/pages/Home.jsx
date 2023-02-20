import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { motion as m } from 'framer-motion'
import moment from 'moment';
import {FiSettings} from 'react-icons/fi'
import Settings from './settings/setting';
import Sheets from '../components/sheets';
import Button from '../components/button';

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isShown, setIsShown] = useState(false);

  const ref = useRef();
  const snapTo = (i) => ref.current?.snapTo(i);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <m.section
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="container px-4 pt-10">
      <div className='flex justify-between items-center'>
        <h3 className='text-slate-600 text-base'>{moment().format('dddd')} {moment().format('MMM Do')}</h3>
        <div onClick={() => setIsShown(true)}><FiSettings className='stroke-slate-600 w-[23px] h-[23px]' /></div>
      </div>

      <h1 className='text-slate-400 text-5xl mt-10 font-rossanova-bk'>List</h1>
      
      <Sheets
        ref={ref}
        open={isShown}
        close={() => setIsShown(false)}
        snapPoint={500}>
        <Settings {...user} />
      </Sheets>
    </m.section>
  );
}
