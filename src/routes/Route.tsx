import { Route, Routes } from "react-router-dom";
import { Page404 } from "../pages/404";
import { Dashboard } from "@/pages/Dashboard";
import Clients from "@/pages/Clients";
import Trainers from "@/pages/Trainers";

export const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" Component={Dashboard} />
      <Route path="*" Component={Page404} />
      <Route path="/Clients" Component={Clients} />
      <Route path="/Trainers" Component={Trainers} />
    </Routes>
  );
};
