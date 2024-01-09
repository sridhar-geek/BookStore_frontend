import  {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSnackbar } from "notistack";

// Imports from another files
import BackButton from '../Components/backButton'
import Spinner from '../Components/Spinner'

const ShowBook = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false)
  const {id} = useParams()
      const { enqueueSnackbar } = useSnackbar();

  useEffect(()=> {
    async function showBook(){
      try {
        setLoading(true)
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/books/${id}`
        );
        setBook(response.data)
        setLoading(false)
      } catch (error) {
        enqueueSnackbar("Error in retrieviewing book", { variant: "error" });
        setLoading(false)
      }
    }
    showBook()
  },[] )
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Book Details</h1>
      {loading ? (
        <Spinner />
      ): (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id:</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title:</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author:</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year:</span>
            <span>{book.PublishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Created Time:</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time:</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook