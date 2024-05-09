import { Button } from "@/components/ui/button";
import { Link } from "@/components/Link";
import { DumbbellIcon } from "lucide-react";

const HeaderComponent = () =>{
    return(
         <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link
          className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
          href="#"
        >
          <DumbbellIcon className="w-6 h-6" />
          <span className="sr-only">Gym Management</span>
        </Link>
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
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
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button className="rounded-full ml-auto" size="icon" variant="ghost">
            <img
              alt="Avatar"
              className="rounded-full border"
              height="32"
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
    )
}

export default HeaderComponent