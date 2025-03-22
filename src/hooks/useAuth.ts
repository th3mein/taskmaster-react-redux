import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

export type JwtToken = {
  UserInfo: {
    username: string;
    roles: string[];
  };
};

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  if (token) {
    const decoded: JwtToken = jwtDecode<JwtToken>(token);
    const { username, roles } = decoded.UserInfo;

    isManager = roles.includes("manager");
    isAdmin = roles.includes("admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { username, roles, status, isManager, isAdmin };
  }

  return { username: "", roles: [], isManager, isAdmin, status };
};
export default useAuth;
