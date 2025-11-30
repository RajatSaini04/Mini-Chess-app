import { useState } from 'react'
import { Analytics } from "@vercel/analytics/next"

import './App.css'
import ChessGame from './ChessGame'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChessGame />
    </>
  )
}

export default App