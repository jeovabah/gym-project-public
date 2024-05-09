import { BrowserRouter } from "react-router-dom";
import { RouteComponent } from "./routes/Route";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col w-full min-h-screen bg-[#f3f3f3]">
        <HeaderComponent/>
        <RouteComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
