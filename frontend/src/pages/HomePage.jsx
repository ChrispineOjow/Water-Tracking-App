import { Button } from "@/components/ui/button";
import StatisticCard from "../components/StatisticCard";
import { useNavigate } from "react-router-dom";


function HomePage(){

    //This is to navigate to the reports page
    const navigate = useNavigate();

    const handleViewReports = () =>  {
        
        navigate("/reports");
    }

    const handleAddReport = () =>{
        navigate("/addReport");
    }

    return(
        <>

          
            <div className="p-10 text-center h-screen w-full bg-gray-200 bg-center bg-cover bg-no-repeat [background-image:url('/images/HomeBackground.jpg')]">
                <h1 className=" font-bold text-4xl">Community Water Tracking</h1>
                <h2 className="mt-15 font-semibold text-2xl">Track water availability and quality in your area</h2>

                <div className="mt-10">
                    <Button className="bg-black text-white m-5 hover:cursor-pointer h-10" onClick={handleAddReport}>Add Water Report</Button>
                    <Button className="bg-black text-white m-5 hover:cursor-pointer h-10" onClick={handleViewReports}>View Reports</Button>
                </div>
            </div>


            <div className="py-12">
                <h1 className="text-center mt-5 font-bold text-2xl">Recent Statistics</h1>
                <div className="flex justify-center">

                    <StatisticCard>
                        <h3 className=" text-center font-semibold text-xl ">Total Reports</h3>
                        {/* remember to add api to call statistics */}
                    </StatisticCard>

                    <StatisticCard>
                        <h3 className="text-center font-semibold text-xl">Water Available</h3>
                        {/* remember to add api to call statistics */}
                    </StatisticCard>

                    <StatisticCard>
                        <h3 className="text-center font-semibold text-xl">Clean Water</h3>
                        {/* remember to add api to call statistics */}
                    </StatisticCard>
                </div>

            </div> 


            <div className="py-12 ">
                <h1 className="text-center font-bold text-2xl ">Recent Reports from Your Area</h1>
                <div className="flex items-center justify-center">
                    <StatisticCard className="w-[70%] flex ">
                        <h2 className="font-semibold text-center text-lg">Water Available and Clean</h2>
                        {/*Remember to add data here*/ }
                    </StatisticCard>

                    <StatisticCard className="w-[70%] flex ">
                        <h2 className="font-semibold text-center text-lg">Water Available but Not Clean</h2>
                        {/*Remember to add data here*/ }
                    </StatisticCard>
                </div>

            
            </div>   
        
        
        </>
    )
}

export default HomePage;