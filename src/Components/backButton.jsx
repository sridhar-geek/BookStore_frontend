import { Link } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'

const BackButton = () => {
  return (
    <div className='flex'>
        <Link to={'/'} 
            className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
          <MdArrowBack className='text-2xl' />
        </Link>
    </div>
  )
}

export default BackButton