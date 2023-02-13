import {motion as m} from 'framer-motion'

export default function Settings() {
  return(
    <m.section
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className='container px-4 pt-4'>
      <h1 className='text-3xl text-slate-400'>Settings</h1>
    </m.section>
  )
}