import HomePage from "./pages/HomePage";
import Report from "../src/pages/ReportPage";
import AddReport from "../src/pages/AddReportPage";
import {Routes, Route} from "react-router-dom";
import Navbar from "../src/components/Navbar";



function App() {
 

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/reports" element={<Report/>}/>
        <Route path="/addReport" element={<AddReport/>} />
      </Routes>
        
    </>
  )
}

export default App
