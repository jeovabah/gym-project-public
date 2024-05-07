import { BrowserRouter } from "react-router-dom";
import { RouteComponent } from "./routes/Route";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col w-full min-h-screen bg-[#f3f3f3]">
        <RouteComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
