import { Outlet } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";

function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet/>
      <footer></footer>
    </div>
  );
}

export default AppLayout;