import { Link } from "react-router-dom";

export default function navigation() {
  return(
    <nav className='absolute bottom-0 w-full'>
      <ul className='flex justify-between p-4'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/tasks'>Tasks</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
      </ul>
    </nav>
  )
}