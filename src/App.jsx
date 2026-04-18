import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import InfiniteHero from './components/InfiniteHero'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Footer } from "./components/Footer"


function App() {  

  return (
      <Router>
        <Routes>
          <Route path="/" element={<InfiniteHero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
  )
}

export default App