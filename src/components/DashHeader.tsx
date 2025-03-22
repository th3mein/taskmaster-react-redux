import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";

import { CgLogOut } from "react-icons/cg";

import useAuth from "../hooks/useAuth";
import { HiMiniUser, HiMiniUserPlus } from "react-icons/hi2";
import { MdNote, MdNoteAdd } from "react-icons/md";

// const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onNewNoteClicked = () => navigate("/dash/notes/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onNotesClicked = () => navigate("/dash/notes");
  const onUsersClicked = () => navigate("/dash/users");

  // let dashClass = null;
  // if (
  //   !DASH_REGEX.test(pathname) &&
  //   !NOTES_REGEX.test(pathname) &&
  //   !USERS_REGEX.test(pathname)
  // ) {
  //   dashClass = "dash-header__container--small";
  // }

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className="mr-4 flex cursor-pointer"
        title="New Ticket"
        onClick={onNewNoteClicked}
      >
        <MdNoteAdd className="text-2xl mr-1" />
        New Ticket
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="flex mr-4 cursor-pointer"
        title="New User"
        onClick={onNewUserClicked}
      >
        <HiMiniUserPlus className="text-2xl mr-1" />
        Add User
      </button>
    );
  }

  let userButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userButton = (
        <button
          className="flex mr-4 cursor-pointer"
          title="Users"
          onClick={onUsersClicked}
        >
          <HiMiniUser className="text-2xl" /> Users
        </button>
      );
    }
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    notesButton = (
      <button
        className="flex mr-4 cursor-pointer"
        title="Notes"
        onClick={onNotesClicked}
      >
        <MdNote className="mr-1 text-2xl" /> Tickets
      </button>
    );
  }

  const logoutButton = (
    <button
      className="icon-button11 cursor-pointer bg-foreground text-background rounded-full p-1"
      title="Logout"
      onClick={sendLogout}
    >
      <CgLogOut className="" />
    </button>
  );

  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>;
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </>
    );
  }

  const content = (
    <>
      {isError && (
        <p className={errClass}>
          Error:{" "}
          {"data" in error ? `Error: ${error.data}` : "An error occurred"}
        </p>
      )}
      {/* <p className={errClass}>{error?.data?.message}</p> */}

      <header>
        <nav className="text-right p-4 flex flex-row justify-end cursor-pointer mr-4">
          {buttonContent}
        </nav>
      </header>
    </>
  );

  return content;
};
export default DashHeader;

// import { useEffect } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";

// import { useSendLogoutMutation } from "../features/auth/authApiSlice";

// const DASH_REGEX = /^\/dash(\/)?$/;
// const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
// const USERS_REGEX = /^\/dash\/users(\/)?$/;

// const DashHeader = () => {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   const [sendLogout, { isLoading, isSuccess, isError, error }] =
//     useSendLogoutMutation();

//   useEffect(() => {
//     if (isSuccess) navigate("/");
//   }, [isSuccess, navigate]);

//   if (isLoading) return <p>Logging Out...</p>;

//   // if (isError) return <p>Error: {error.data?.message}</p>;
//   if (isError)
//     return (
//       <p>
//         Error: {"data" in error ? `Error: ${error.data}` : "An error occurred"}
//       </p>
//     );

//   let dashClass = null;
//   if (
//     !DASH_REGEX.test(pathname) &&
//     !NOTES_REGEX.test(pathname) &&
//     !USERS_REGEX.test(pathname)
//   ) {
//     dashClass = "dash-header__container--small";
//   }

//   const logoutButton = (
//     <button className="icon-button" title="Logout" onClick={sendLogout}>
//       Logout
//     </button>
//   );

//   const content = (
//     <header className="dash-header">
//       <div className={`dash-header__container ${dashClass}`}>
//         <Link to="/dash">
//           <h1 className="dash-header__title">techNotes</h1>
//         </Link>
//         <nav className="dash-header__nav">
//           {/* add more buttons later */}
//           {logoutButton}
//         </nav>
//       </div>
//     </header>
//   );

//   return content;
// };
// export default DashHeader;
