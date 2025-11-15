import {Button} from "./ui/button";
import {Card, CardContent} from "./ui/card";
import {cn} from "@/lib/utils";

function ReportCard({children, className}){
    return(

        <>
        
            <Card className={cn ("relative min-h-32 w-[80%] ms-15 mb-10", className)}>
                <CardContent className="h-full p-6 ">
                    {children}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                        <Button className=" bg-blue-500 text-white">Edit</Button>
                        <Button className=" bg-red-500 text-white">Delete</Button>
                    </div>
                </CardContent>

            </Card>
        
        </>

    )
}

export default ReportCard;