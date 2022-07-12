import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import DetailedItem from './Pages/DetailedItem/DetailedItem'
import ErrorNotFound from './Pages/ErrorNotFound/ErrorNotFound'
import Home from './Pages/Home/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/detailed_item" element={<DetailedItem />}>
        </Route>
        <Route path="*" element={<ErrorNotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
