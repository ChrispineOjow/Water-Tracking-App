import HomePage from "./pages/HomePage";
import Report from "../src/pages/ReportPage";
import {Routes, Route} from "react-router-dom"
import Navbar from "../src/components/Navbar"



function App() {
 

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/reports" element={<Report/>}/>
      </Routes>
        
    </>
  )
}

export default App
