import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

const DashLayout = () => {
  return (
    <div className="flex flex-col min-h-dvh">
      <DashHeader />
      <div className="flex-1">
        <Outlet />
      </div>
      <DashFooter className="sticky bottom-0" />
    </div>
  );
};
export default DashLayout;
