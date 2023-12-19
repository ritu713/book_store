import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'

const showBook = () => {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)

  var { id } = useParams()
  id = id.substring(1)

  useEffect(() => {
    setLoading(true)

    axios
    .get(`http://localhost:5005/books/${id}`)
    .then((res) => {
      console.log(res.data.reqbook)
      setBook(res.data.reqbook)
      setLoading(false)
    })
    .catch((e) => {
      console.log(e)
      setLoading(false)
    })
  }, [])

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'> Show Book</h1>

      {
        loading? (<Spinner />) : (
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>ID</span>
              <span> {book._id} </span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Title</span>
              <span> {book.title} </span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Author</span>
              <span> {book.author} </span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
              <span> {book.publishYear} </span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Create Time</span>
              <span> {new Date(book.createdAt).toString()} </span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
              <span> {new Date(book.updatedAt).toString()} </span>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default showBook
