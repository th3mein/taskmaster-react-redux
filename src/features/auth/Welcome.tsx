import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { MdNote, MdNoteAdd } from "react-icons/md";
import { HiMiniUser, HiUserPlus } from "react-icons/hi2";

const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();

  const content = (
    <section className="p-20 mt-20">
      <h1 className="text-2xl">Welcome {username}!</h1>
      <h2 className="text-4xl">
        Welcome to Ticket <br /> Master 25.!
      </h2>

      <div className="flex mt-4">
        <p>
          <Link
            to="/dash/notes"
            className="flex p-4 rounded-full bg-foreground text-background items-center mr-2 "
          >
            <MdNote className="mr-2  text-2xl" /> Tickets
          </Link>
        </p>

        <p>
          <Link
            to="/dash/notes/new"
            className="flex p-4 rounded-full bg-foreground text-background items-center mr-2 "
          >
            <MdNoteAdd className="mr-2  text-2xl" /> Add New Ticket
          </Link>
        </p>

        {(isManager || isAdmin) && (
          <p>
            <Link
              to="/dash/users"
              className="flex p-4 rounded-full bg-primary text-black items-center mr-2 "
            >
              <HiMiniUser className="mr-2 text-2xl" />
              Users
            </Link>
          </p>
        )}

        {(isManager || isAdmin) && (
          <p>
            <Link
              to="/dash/users/new"
              className="flex p-4 rounded-full bg-primary text-black items-center "
            >
              <HiUserPlus className="text-2xl" />
              Add New User
            </Link>
          </p>
        )}
      </div>
    </section>
  );

  return content;
};
export default Welcome;
