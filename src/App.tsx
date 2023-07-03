import classes from './App.module.css'
import Heroes from './pages/Heroes'

function App() {
  return (
    <>
      <h1 className={classes.red}>Vite + React + Typescript</h1>
      <Heroes />
    </>
  )
}

export default App
