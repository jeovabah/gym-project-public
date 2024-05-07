import { useEffect, useState } from "react";
import Logo from "../../assets/logo.jpeg";
import { TabNavigations } from "../../routes/navRoutes";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Inicio");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const pathname = location.pathname;
    const tab = TabNavigations.find((tab) => tab.href === pathname);
    if (tab) {
      setActiveTab(tab.title);
    }
  }, [location.pathname]);
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 lg:flex justify-between items-center">
            <div className="flex-1 lg:flex items-center">
              <a className="btn btn-ghost text-xl">
                <img src={Logo} alt="logo" className="w-12 rounded-lg" />
              </a>
              <div className="flex-none hidden lg:block">
                <ul className="menu menu-horizontal gap-5">
                  {TabNavigations.map((tab, index) => (
                    <li
                      key={index}
                      className={`${
                        activeTab === tab.title
                          ? `border-b-2 border-yellow-600`
                          : ""
                      }`}
                    >
                      <button
                        onClick={() => {
                          navigate(tab.href);
                          handleTabClick(tab.title);
                        }}
                        className={`${
                          activeTab === tab.title
                            ? "border-b-2 border-yellow-600"
                            : ""
                        }`}
                      >
                        {tab.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center gap-5 mr-5">
                <a href="#" className="btn btn-outline">
                  Registrar
                </a>
                <a href="#" className="btn btn-outline">
                  Entrar
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Tab Bar for mobile */}
        <div className="fixed inset-x-0 bottom-0 lg:hidden bg-base-200 shadow-lg z-10">
          <ul className="flex justify-between items-center p-2">
            {TabNavigations.map((tab, index) => (
              <li
                key={index}
                className={`flex-1 text-center ${
                  activeTab === tab.title ? "bg-primary text-white" : ""
                }`}
              >
                <div className="flex flex-col items-center justify-center">
                  {tab?.icon}
                  <a
                    href={tab.href}
                    onClick={() => handleTabClick(tab.title)}
                    className="block p-2"
                  >
                    {tab.title}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {TabNavigations.map((tab, index) => (
            <li key={index}>
              <a href={tab.href} onClick={() => handleTabClick(tab.title)}>
                {tab.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
