import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from "./components/About";
import Resources from "./components/Resources";
import Contact from "./components/Contact";


function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/resources" element={<Resources />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
