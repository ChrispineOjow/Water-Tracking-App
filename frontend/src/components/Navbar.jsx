import { NavigationMenu,NavigationMenuList,NavigationMenuItem,NavigationMenuLink } from "./ui/navigation-menu";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "../components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle } from "../components/ui/drawer";
import { useState } from "react";


function Navbar(){
    const [open, setOpen] = useState(false);

    return(
        <>
            <div className=" flex sticky top-0 z-50">
                <nav className="p-3 border-b  w-full bg-black text-white text-2xl  flex  justify-between hover:bg-white-700 hover:text-black-700" >
                    <div className="flex items-center space-x-2">
                        <Link to="/" className="flex items-center">

                            {/* this is where i've placed the logo */}
                            <img src="/water-drop-svgrepo-com.svg" alt="Water Logo" className="h-7 w-auto"/>
                            <span className="text-lg font-bold ml-2">Water Tracker</span>

                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden md:flex space-x-7 me-5 ">
                        
                        <NavigationMenuList className="pe-3">

                            <NavigationMenuItem className="rounded transition me-4 duration-200  ease-in-out  hover:bg-white hover:text-black">
                                <NavigationMenuLink asChild>
                                    <Link to="/">Home</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem className="rounded transition me-4  duration-200 ease-in-out hover:bg-white hover:text-black">
                                <NavigationMenuLink asChild>
                                <Link to="/">Reports</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem className="rounded transition me-4  duration-200 ease-in-out hover:bg-white hover:text-black">
                                <NavigationMenuLink asChild>
                                    <Link to="/">Add Report</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            

                        </NavigationMenuList>

                    </NavigationMenu>

                    {/* Mobile Hamburger menu */}

                    <div className="md:hidden flex items-center">
                        <Drawer direction="right">
                            <DrawerTrigger asChild>
                                <Button onClick={() => setOpen(true)} variant="ghost" size="icon" className="text-white">

                                    <Menu className="h-6 w-6"/>

                                </Button>
                            </DrawerTrigger>

                            <DrawerContent side="top" className="w-[200px] sm:w-[250px] flex flex-col pt-12" >

                                <DrawerHeader> {/* Optional: Use SheetHeader for correct spacing */}
                                    <DrawerTitle/>
                                    
                                </DrawerHeader>

                                <Link to="/" onClick={() => useState(false)} className="py-2 text-lg font-medium hover:text-blue-600">Home</Link>
                                <Link to="/" onClick={() => useState(false)} className="py-2 text-lg font-medium hover:text-blue-600">Reports</Link>
                                <Link to="/" onClick={() => useState(false)} className="py-2 text-lg font-medium hover:text-blue-600">Add Report</Link>

                            </DrawerContent>
                        </Drawer>

                    </div>
                </nav>
            </div>

        
        </>
    )
}

export default Navbar;