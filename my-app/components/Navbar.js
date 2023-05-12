import Link from "next/link";
import { useAuthContext } from "../config/Context";
import { BsArrowLeftShort } from "react-icons/bs";
import { WiCloudUp } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import {RiDashboardFill } from "react-icons/ri";
import {BsWater} from "react-icons/bs";
import {MdDirtyLens, MdOpacity} from "react-icons/md";
import {AiOutlineLogout} from "react-icons/ai";
import { useMemo, useState } from "react";
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
    const [isCollapsible, setIsCollapsible] = useState(true);

    const menuItems = [
      {id: 1, label: "Temperature", icon: <FaTemperatureHigh />, link: "/temperature"},
      {id: 2, label: "Water Flow", icon: <BsWater />, link: "/flow"},
      {id: 3, label: "Turbidity", icon: <MdDirtyLens />, link: "/turbidity"},
      {id: 4, label: "pH", icon: <MdOpacity />, link: "/ph"},
      {id: 5, label: "Setup", icon: <MdOpacity />, link: "/setup"},
    ]

    const activeMenu = useMemo(() => menuItems.find(menu => menu.link === router.pathname), [router.pathname])

    const handleClick = () => {
      setOpen(!open);
    }

    const handleClick2 = (data) => {
      router.push(data)
    }

    const handleLogOut = async() => {
      try{
        await logOut();
        router.push("/");
      }catch(error){
        console.log(error.message);
      }
    }

    const wrapperClasses = classNames(
      "h-screen px-4 pt-8 pb-4 bg-dark-brown h-screen flex justify-between flex-col duration-100", 
      {
        ["w-80"]: open,
        ["w-20"]: !open,

      })

    const arrowClasses = classNames(
      "bg-white text-dark-brown text-3xl rounded-full absolute -right-3 top-9 border border-dark-brown duration-100",
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

    const getNavItemClasses = (menu) => {
      return classNames("flex items-center cursor-pointer hover:bg-light-brown rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-amber"]: activeMenu.id === menu.id
      })
    }

    return(
      <div className={wrapperClasses}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between relative">
            <div className="inline-flex items-center pl-1 gap-4">
              <WiCloudUp className={cloudClasses}/>
              <h1 className={wqmsClasses}>{user.email}</h1>
            </div>
            {isCollapsible && (
              <button className={arrowClasses} onClick={handleClick}>
                <BsArrowLeftShort />
              </button>
            )}
          </div>

          <div className="flex flex-col items-start mt-24">
            {menuItems.map(({icon, ...menu }) => {
              const classes = getNavItemClasses(menu);
              return(
                <div className={classes}>
                  <Link legacyBehavior href={menu.link}>
                    <a className="flex py-4 px-3 items-center w-full h-full">
                      {open && (
                        <span className={classNames('text-md font-medium text-white ')}>
                          {menu.label}
                        </span>
                      )}
                    </a>
                  </Link> 
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-gray-300 text-sm flex item-center gap-x-4 cursor-pointer p-2 hover:bg-amber rounded-md mt-2 absolute bottom-0 left-0">
          <div className="text-2xl block float-left">
            <AiOutlineLogout />
          </div>
          <a onClick={handleLogOut} className={menuClasses}>Sign Out</a>
        </div>
      </div>
    )
}

export default Navbar;