import  {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from "notistack";
import axios from 'axios'

import Spinner from '../Components/Spinner'
import BackButton from '../Components/backButton'

const UpdateBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [PublishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const {id} = useParams()
  const { enqueueSnackbar } = useSnackbar();

  useEffect(()=> {
    const showBook =async()=> {
      try {
        setLoading(true)
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/books/${id}`
        );
        setTitle(response.data.title)
        setAuthor(response.data.author)
        setPublishYear(response.data.PublishYear)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        enqueueSnackbar("Error occured in retrieving", { variant: "error" });
      }
    }
    showBook()
  },[] )

  const handleEdit =() => {
    const data = {
      title,
      author,
      PublishYear
    }
    async function updateBook(){
      try {
        setLoading(true)
         await axios.put(
           `${import.meta.env.VITE_SERVER_URL}/books/${id}`,
           data
         );
        setLoading(false)
        enqueueSnackbar("Book updated Successfully", { variant: "success" });
        navigate('/')
      } catch (error) {
        setLoading(false)
        enqueueSnackbar("Updation failed", { variant: "error" });
      }
    }
    updateBook(); 

  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
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
        <button className='p-3 bg-sky-300 m-8' onClick={handleEdit}>Edit Book</button>
      </div>
    </div>
  )
}

export default UpdateBook