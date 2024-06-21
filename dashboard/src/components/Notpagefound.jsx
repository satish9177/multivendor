import {Link} from 'react-router-dom'
const Nopagefound = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center font-medium text-3xl ">
      <h1>404 </h1>
      <div className=" ">page not found</div>
      <Link to='/' className='text-xl text-blue-400'>Go back</Link>
      </div>
  )
}

export default Nopagefound