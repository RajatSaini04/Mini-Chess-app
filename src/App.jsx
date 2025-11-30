import { useState } from 'react'
import { Analytics } from "@vercel/analytics/react"

import './App.css'
import ChessGame from './ChessGame'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChessGame />
      <Analytics />
    </>
  )
}

export default App