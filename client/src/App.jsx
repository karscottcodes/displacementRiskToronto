import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from "./components/About";
import Resources from "./components/Resources";


function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/resources" element={<Resources />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
