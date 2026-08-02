import { useState } from 'react'
import GiovannisRoom from './assets/GiovannisRoom.jpeg'
import BookCard from './components/BookCard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BookCard title="El nombre del viento" authors="Patrick Rothfuss" imageUrl={GiovannisRoom}></BookCard>
      <BookCard title="El nombre del viento" authors="Patrick Rothfuss" imageUrl={GiovannisRoom}></BookCard>

    </>
  )
}

export default App
