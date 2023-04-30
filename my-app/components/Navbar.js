import Link from "next/link";
import { useAuthContext } from "../config/Context";
import { BsArrowLeftShort } from "react-icons/bs";
import { WiCloudUp } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import {RiDashboardFill } from "react-icons/ri";
import {BsWater} from "react-icons/bs";
import {MdDirtyLens, MdOpacity} from "react-icons/md";
import {AiOutlineLogout} from "react-icons/ai";
import { useState } from "react";
import { useRouter } from 'next/router'
import classNames from "classnames";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";

const Navbar = () => {
    const {user, logOut} = useAuthContext();
    const router = useRouter();

    const [open, setOpen] = useState(true);

    const handleClick = () => {
      setOpen(!open);
    }

    const handleClick2 = (data) => {
      router.push(data)
    }

    const handleLogOut = async() => {
      try{
        await logOut();
        router.push("/signIn");
      }catch(error){
        console.log(error.message);
      }
    }

    const wrapperClasses = classNames(
      "bg-dark-brown h-screen p-5 pt-8 duration-100 relative", 
      {
        ["w-1/6"]: open,
        ["w-20"]: !open,

      })

    const arrowClasses = classNames(
      "text-dark-brown bg-white text-3xl rounded-full absolute -right-3 top-9 border border-dark-brown cursor-pointer",
      {
        ["rotate-180"]: !open
      }
    )

    const cloudClasses = classNames(
      "bg-amber text-4xl rounded cursor-pointer block float-left mr-3 duration-300",
      {
        ["rotate-[360deg]"]: open
      }
    )

    const wqmsClasses = classNames(
      "text-white origin-left font-medium text-xl duration-100",
      {
        ["scale-0"]: !open
      }
    )

    const menuClasses = classNames(
      "text-base font-medium flex-1 duration-200",
      {
        ["hidden"]: !open
      }
    )
    


    return(
        <div className="flex">
            <div className={wrapperClasses}>
              <BsArrowLeftShort onClick={handleClick} className={arrowClasses}/>

              <div className="inline-flex">
                <WiCloudUp className={cloudClasses}/>
                <h1 className={wqmsClasses}>{user.email}</h1>
              </div>

              <ul className="pt-2">
                <li className="text-gray-300 text-sm flex item-center gap-x-4 cursor-pointer p-2 hover:bg-amber rounded-md mt-2">
                  <span className="text-2xl block float-left">
                    <RiDashboardFill />
                  </span>
                  <Link href="/home" className={menuClasses}>Home</Link>
                </li> <br></br><br></br>
                <li className="text-gray-300 text-sm flex item-center gap-x-4 cursor-pointer p-2 hover:bg-amber rounded-md mt-2">
                  <span className="text-2xl block float-left">
                    <FaTemperatureHigh />
                  </span>
                  <Link href="/temperature" className={menuClasses}>Temperature</Link>
                </li>
                <li className="text-gray-300 text-sm flex item-center gap-x-4 cursor-pointer p-2 hover:bg-amber rounded-md mt-2">
                  <span className="text-2xl block float-left">
                    <BsWater />
                  </span>
                  <Link href="/flow" className={menuClasses}>Water Flow</Link>
                </li>
                <li className="text-gray-300 text-sm flex item-center gap-x-4 cursor-pointer p-2 hover:bg-amber rounded-md mt-2">
                  <span className="text-2xl block float-left">
                    <MdDirtyLens />
                  </span>
                  <Link href="/turbidity" className={menuClasses}>Turbidity</Link>
                </li>
                <li className="text-gray-300 text-sm flex item-center gap-x-4 cursor-pointer p-2 hover:bg-amber rounded-md mt-2">
                  <span className="text-2xl block float-left">
                    <MdOpacity />
                  </span>
                  <Link href="/pH" className={menuClasses}>pH</Link>
                </li><br></br><br></br>
                <li className="text-gray-300 text-sm flex item-center gap-x-4 cursor-pointer p-2 hover:bg-amber rounded-md mt-2 absolute bottom-0 right-0">
                  <span className="text-2xl block float-left">
                    <AiOutlineLogout />
                  </span>
                  <a onClick={handleLogOut} className={menuClasses}>Sign Out</a>
                </li>
              </ul>
            </div>

        </div>
    )
}

export default Navbar;