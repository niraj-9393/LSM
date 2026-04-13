

import NavBar from "./components/NavBar"
import AuthPage from "./pages/AuthPage"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>

  )
}

export default App