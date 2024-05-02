import { useState } from 'react'
import './App.css'
import Content from './components/Content/Content'

function App() {
const [count, setCount] = useState()

  return (
   <div className="app">
<Content/>

   </div>
  )
}

export default App
