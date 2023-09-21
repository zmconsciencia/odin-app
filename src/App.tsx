import './App.css'
import ClientView from './ClientView';
import List from './List'
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/client-view' element={<ClientView />} />
      </Routes>
    </>
  )
}

export default App
