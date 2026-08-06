import { useState } from 'react'
import GiovannisRoom from './assets/GiovannisRoom.jpeg'
import BookCard from './components/BookCard'
import './App.css'
import BookSideBar from './components/BookSideBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BookSideBar></BookSideBar>
    </>
  )
}

export default App
