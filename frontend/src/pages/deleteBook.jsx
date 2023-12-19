import React, { useState } from 'react'
import Spinner from '../components/Spinner.jsx'
import BackButton from '../components/BackButton.jsx'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const deleteBook = () => {
  const [loading, setLoading] = useState(false)
  var { id } = useParams()
  id = id.substring(1)
  console.log(id)
  const navigate = useNavigate()

  const handleDeleteBook = () => {
    setLoading(true)
    axios.delete(`http://localhost:5005/books/${id}`)
    .then(() => {
      setLoading(false)
      navigate('/')
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
      alert("An error occured, please check console for more details")
    })

  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      { loading ? (<Spinner /> ) : ""}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'> Are you sure you want to delete this book? </h3>

        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>Yes, delete the book</button>
      </div>
    </div>
  )
}

export default deleteBook
