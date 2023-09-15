import './App.css'
import List from './List'
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<List />} />
      </Routes>
    </>
  )
}

export default App
