import Home from './pages/Home'
import Navbar from './components/Navbar'
import InfiniteHero from './components/InfiniteHero'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {  

  return (
      <>
        <Navbar />
        <Login />
        <Signup />
		    <InfiniteHero />
        <Home />
      </>
  )
}

export default App