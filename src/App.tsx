import classes from './App.module.css'
import ChildComponent from './ChildComponent'
// import { Counter as MyCounter } from './pages/Counter'
import Counter from './pages/Counter'

function App() {
  return (
    <>
      <h1 className={classes.red}>Vite + React + Typescript</h1>
      <h2 style={{
        color: 'red',
        textAlign: 'center',
      }}>With Fabio</h2>
      <ChildComponent />
      <Counter />
    </>
  )
}

export default App
