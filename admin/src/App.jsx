import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './button'

function App() {
  const [result, setResult] = useState('')
  const onResult = (result) => {
    setResult(result)
  }
  return (
    <div className="App">

      <h1>Admin</h1>
      <div className="card">
        <Button onResult={onResult} />
        <p>
          This is the Admin project. It is a React app that uses the Vite build tool.
        </p>
      </div>
      <p className="read-the-docs">
        {result}
      </p>
    </div>
  )
}

export default App
