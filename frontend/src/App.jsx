import HomePage from "./pages/HomePage";
import Report from "../src/pages/ReportPage";
import Setting from "./pages/SettingPage";
import AddReport from "./pages/AddReportPage";
import {Routes, Route} from "react-router-dom";
import Navbar from "../src/components/Navbar";



function App() {
 

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/reports" element={<Report/>}/>
        <Route path="/addReports" element={<AddReport/>}/>
        <Route path="/settings" element={<Setting/>} />
      </Routes>
        
    </>
  )
}

export default App
