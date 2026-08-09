import { useState } from 'react'
import GiovannisRoom from './assets/GiovannisRoom.jpeg'
import BookCard from './components/BookCard'
import './App.css'
import BookSideBar from './components/BookSideBar'
import Header from './components/Layout'
import BookShelf from './components/BookShelf'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <BookShelf></BookShelf>

      <BookShelf></BookShelf>

      <BookShelf></BookShelf>

    </>
  )
}

export default App
