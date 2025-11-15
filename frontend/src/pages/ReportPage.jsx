import { Button } from "../components/ui/button";
import  ReportCard  from "../components/ReportCard";



function ReportPage(){
    return(
        <>
        
            <div>

                <div className="flex m-5 justify-between items-center">
                    <h3 className="font-bold  text-3xl space-x-2">Water Reports</h3>
                    <Button className="space-x-7 p-6 bg-black text-white hover:cursor-pointer">
                        Add New Report
                    </Button>
                </div>

                <div className="flex justify-center mb-10">
                    <h3 className="font-bold text-2xl mx-2">Filters:</h3>
                    <Button className="bg-black text-white mx-5 hover:cursor-pointer">All</Button>
                    <Button className="bg-black text-white mx-5 hover:cursor-pointer">Available</Button>
                    <Button className="bg-black text-white mx-5 hover:cursor-pointer">Unavailable</Button>
                    <Button className="bg-black text-white mx-5 hover:cursor-pointer">Clean</Button>
                    <Button className="bg-black text-white mx-5 hover:cursor-pointer">Not Clean</Button>
                    <Button className="bg-black text-white mx-5 hover:cursor-pointer">Verified Only</Button>
                </div>

            </div>


            <div className="flex justify-center">

               <ReportCard  >
                    <p>Hope this is working</p>
                    {/* Add data here from the API */}
               </ReportCard>

              
               
                
            </div>

            <div className="flex justify-center">
                <Button className="text-white bg-black me-6">Previous</Button>
                <span>Page * of *</span>
                <Button className="text-white bg-black ms-6">Next</Button>
            </div>

        </>
    )
}

export default ReportPage;