import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import Spinner from '../Components/Spinner'
import BackButton from '../Components/backButton'

const CreateBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [PublishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const { enqueueSnackbar } = useSnackbar()
  const handleSave =() => {
    const data = {
      title,
      author,
      PublishYear
    }
    async function createBook(){
      try {
        setLoading(true)
         await axios.post(
           "https://book-store-backend-hm2j-pedd3kp67-sridhar-geek.vercel.app/",
           data
         );
        setLoading(false)
        enqueueSnackbar('Book created Successfully', {variant: 'success'})
        navigate('/')
      } catch (error) {
        setLoading(false)
        enqueueSnackbar("Error occured", { variant: "error" });
        // console.log(error)
      }
    }
    createBook(); 

  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} 
                  className='border-2 border-gray-500 py-2 px-4 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type="text" value={author} onChange={(e)=> setAuthor(e.target.value)} 
                  className='border-2 border-gray-500 py-2 px-4 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input type="text" value={PublishYear} onChange={(e)=> setPublishYear(e.target.value)} 
                  className='border-2 border-gray-500 py-2 px-4 w-full' />
        </div>
        <button className='p-3 bg-sky-300 m-8' onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}

export default CreateBook