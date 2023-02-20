
export default function Button({children, onClick}) {
  return(
    <button
      onClick={onClick}
      className='w-full text-slate-400 bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700'>
      {children}
    </button>
  )
}