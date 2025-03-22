import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { RiHome9Fill } from "react-icons/ri";

const DashFooter = ({ className }: { className: string }) => {
  const { username, status } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <p className="m-1">
        <button
          className="bg-foreground text-background p-2 cursor-pointer rounded-xs"
          title="Home"
          onClick={onGoHomeClicked}
        >
          <RiHome9Fill width={24} height={24} />
          {/* <FontAwesomeIcon icon={faHouse} /> */}
        </button>
      </p>
    );
  }

  const content = (
    <footer className={`${className} flex border-1 rounded-xs`}>
      {goHomeButton}
      <p className="p-2 border-r-foreground"> User: {username}</p>
      <p className="p-2 border-r-foreground"> Status: {status}</p>
      <p className="p-2 flex-1 text-right bg-background text-foreground">
        {today}
      </p>
    </footer>
  );
  return content;
};
export default DashFooter;
