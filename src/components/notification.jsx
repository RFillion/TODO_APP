import { useState } from 'react'
import {motion as m} from 'framer-motion'
import { SafeArea } from 'capacitor-plugin-safe-area'
import {AiOutlineCloseCircle, AiOutlineCheckCircle} from 'react-icons/ai'

export default function Notification({body, variant}) {
  const [safeArea, SetSafeArea] = useState(0)
  SafeArea.getStatusBarHeight().then(({statusBarHeight}) => SetSafeArea(statusBarHeight))
  return(
    <m.div
      initial={{y: '-10px', x: '-50%', opacity: 0}}
      animate={{y: `${safeArea + 30}px`, x: '-50%', opacity: 1}}
      className={`absolute top-0 left-1/2 grid items-center gap-2 max-w-[80vw] w-max text-sm text-slate-900 bg-slate-400 px-5 py-3 pl-3 rounded-lg`}
      style={{gridTemplateColumns: 'auto 1fr'}}>
      {variant == 'error' ? <AiOutlineCloseCircle style={{width: '20px', height: '20px'}} /> : <AiOutlineCheckCircle style={{width: '20px', height: '20px'}} />}
      {body}
    </m.div>
  )
}