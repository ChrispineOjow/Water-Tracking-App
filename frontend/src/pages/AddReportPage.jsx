import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";


function AddReport(){
    const [isAvailable, setIsAvailable] = useState("available")
    const [isClean, setIsClean] = useState("clean")

    return(
        <>

            <div className="flex justify-center bg-gray-300 p-12">
                <div className="text-center w-[50%] bg-white rounded-4xl p-5">
                    <div>

                        <h2 className="m-2 font-semibold text-2xl">Location</h2>
                        <Input placeholder="Latitude" className="my-5 w-[60%]"/>
                        <Input placeholder="Longitude" className="mb-4 w-[60%]"/>

                    </div>

                    <div className="m-4 py-5 ">

                        <h2 className="m-2 font-semibold text-xl">Water Status</h2>
                        <RadioGroup 
                            defaultValue={isAvailable}
                            onValueChange={setIsAvailable}
                            className="flex space-x-4 justify-center"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="available" id="waterAvailable" />
                                <Label htmlFor="waterAvailable">Water is Available</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="unavailable" id="waterUnAvailable" />
                                <Label htmlFor="waterUnAvailable">Water is not Available</Label>
                            </div>
                        </RadioGroup>
                        
                    </div>


                    <div className="m-4 py-3">

                        <h2 className="m-2 font-semibold text-xl">Water Cleanliness</h2>
                        <RadioGroup 
                            defaultValue={isClean}
                            onValueChange={setIsClean}
                            className="flex space-x-4 justify-center"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="clean" id="waterIsClean" />
                                <Label htmlFor="waterIsClean">Water is Clean</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="notClean" id="waterIsNotClean" />
                                <Label htmlFor="waterIsNotClean">Water is not Clean</Label>
                            </div>
                        </RadioGroup>
                        
                    </div>

                    <div className="m-4 p-5 ">

                        <Label className="text-center mb-5 flex justify-center text-2xl">Description (Optional)</Label>
                        <Textarea />
                    </div>

                    <div>
                        <Button variant="outline" className="p-4 m-5 text-gray-700 border-gray-300 hover:cursor-pointer hover:bg-gray-100">Cancel</Button>
                        <Button className="p-4 m-5 bg-green-600 text-white hover:bg-green-700 hover:cursor-pointer">Submit Report</Button>
                    </div>
                </div>
            </div>
        
        </>
    )
}


export default AddReport;