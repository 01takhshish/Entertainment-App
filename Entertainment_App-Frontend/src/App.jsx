import { Outlet } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <article className="flex flex-col overflow-x-hidden md:mt-6 lg:flex-row lg:items-baseline lg:gap-6">
      <Outlet />
    </article>
  );
}

export default App;
