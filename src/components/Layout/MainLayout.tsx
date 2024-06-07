import Header from "./Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="withHeader">
      {/* Global Navigation Bar */}
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;