import React from 'react'
import {Routes, Route} from 'react-router-dom'

import Home from "./pages/Home.jsx"
import CreateBook from './pages/createBook.jsx'
import ShowBook from './pages/showBook.jsx'
import EditBook from './pages/editBook.jsx'
import DeleteBook from './pages/deleteBook.jsx'

const App = () => {
  console.log("Entered app")
  return (
    <Routes>
      <Route path='/' element={ <Home/> }></Route>
      <Route path='/books/create' element={ <CreateBook/> }></Route>
      <Route path='/books/details/:id' element={ <ShowBook/> }></Route>
      <Route path='/books/edit/:id' element={ <EditBook/> } ></Route>
      <Route path='/books/delete/:id' element={ <DeleteBook/> }></Route>
    </Routes>
  )
}

export default App
