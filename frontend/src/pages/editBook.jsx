import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  var {id}  = useParams();

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5005/books/${id}`)
    .then(
      (res) => {
        setTitle(res.data.title)
        setAuthor(res.data.author)
        setPublishYear(res.data.publishYear)
        setLoading(false)
      }
    )
    .catch((err) => {
      setLoading(false)
      console.log(err)
      alert("Error. Check console")
    })
  },[])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true)
    const id_ = id.substring(1)
    axios.put(`http://localhost:5005/books/${id_}`, data)
    .then(() => {
      setLoading(false)
      navigate('/')
    })
    .catch((err) => {
      alert("An error seems to have occured :( Please check console for more details")
      console.log(err)
      setLoading(false)
    })
  }


  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className="text-3xl my-4">Edit Book</h1>
      { loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='mr-4 text-xl text-gray-500'>Title</label>
          <input type='text' value={title} onChange= {(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>

        <div className='my-4'>
          <label className='mr-4 text-xl text-gray-500'>Author</label>
          <input type='text' value={author} onChange= {(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>

        <div className='my-4'>
          <label className='mr-4 text-xl text-gray-500'>Publish Year</label>
          <input type='number' value={publishYear} onChange= {(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>

      </div>
    </div>
  )
}

export default EditBook
