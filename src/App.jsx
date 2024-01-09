import { Route, Routes } from 'react-router-dom'

// Imports from another files
import {CreateBook, UpdateBook, Home, ShowBook, DeleteBook} from './pages'

const App = () => {
  return (
    <Routes>
      <Route path='/' element= { <Home /> } />
      <Route path='/books/create' element= { <CreateBook /> } />
      <Route path='/books/details/:id' element= { <ShowBook /> } />
      <Route path='/books/edit/:id' element= { <UpdateBook /> } />
      <Route path='books/delete/:id' element= { <DeleteBook /> } />
    </Routes>
  )
}

export default App