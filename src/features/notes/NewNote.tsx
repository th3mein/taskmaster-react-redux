// import { useSelector } from "react-redux";
// import { selectAllUsers } from "../users/usersApiSlice";
import Loading from "@/components/Loading";
import { useGetUsersQuery } from "../users/usersApiSlice";

import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
  // const users = useSelector(selectAllUsers);

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  // if (!users.length) return <p>Not currently available!</p>;

  // const content = <NewNoteForm users={users} />;
  if (!users?.length) return <Loading />;

  const content = <NewNoteForm users={users} />;

  return content;
};
export default NewNote;
