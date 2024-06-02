import Tasks from './components/Tasks'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <main className="main bg-black bg-auto min-h-screen" >
        <Navbar />
        <Tasks />
      </main>
    </>
  )
}

export default App