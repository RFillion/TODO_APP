
export default function Input({type, id, name, placeholder, value, onChange}) {
  return(
    <input 
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete='off'
      className='text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500' />
  )
}