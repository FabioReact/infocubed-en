import { useState } from 'react'
import classes from './App.module.css'
import Heroes from './pages/Heroes'

function App() {
  const [visible, setVisible] = useState(true)
  return (
    <>
      <h1 className={classes.red}>Vite + React + Typescript</h1>
      <button onClick={() => setVisible(b => !b)}>Toggle Heroes Page</button>
      {visible ? <Heroes /> : null}
    </>
  )
}

export default App
