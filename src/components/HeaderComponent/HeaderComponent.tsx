

import { Link } from "@/components/Link";
import { DumbbellIcon, Menu } from "lucide-react";

const HeaderComponent = () => {
  
  

  return (
    <header className="flex items-center justify-between h-16 px-4 border-b md:px-6">
      <div className="flex items-center">
        <Link
          className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
          href="/"
        >
          <DumbbellIcon className="w-6 h-6" />
          <span className="sr-only">Gym Management</span>
        </Link>
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6 ">
          <Link className="font-bold" href="/">
            Dashboard
          </Link>
          <Link className="text-black dark:text-gray-400" href="/Clients">
            Clients
          </Link>
          <Link className="text-black dark:text-gray-400" href="#">
            Trainers
          </Link>
          <Link className="text-black dark:text-gray-400" href="#">
            Classes
          </Link>
          <Link className="text-black dark:text-gray-400" href="#">
            Payments
          </Link>
        </nav>
      </div>
      <div className="flex items-center">
        
        <details className="dropdown">
          <summary
            tabIndex={0}
            role="button"
            className="btn rounded-full  md:hidden bg-white   "
            
          >
          
          <Menu />
          
            <span className="sr-only ">Toggle user menu</span>
          </summary>
            <ul className="dropdown-content z-10 right-0 p-2  bg-white text-black rounded-box w-52">
              <li>
                <Link className="menu-title text-black" href="/Clients">
                  Clients
                </Link>
              </li>
              <li>
                <Link className="menu-title text-black" href="#">
                  Trainers
                </Link>
              </li>
              <li>
                <Link className="menu-title text-black" href="#">
                  Classes
                </Link>
              </li>
              <li>
                <Link className="menu-title text-black" href="#">
                  Payments
                </Link>
              </li>
            </ul>
          
        </details>
      </div>
    </header>
  );
};

export default HeaderComponent;
