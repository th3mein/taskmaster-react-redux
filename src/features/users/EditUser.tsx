import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectUserById } from "./usersApiSlice";
// import { RootState } from "../../app/store";
import { useGetUsersQuery } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";
import Loading from "@/components/Loading";

const EditUser = () => {
  const { id } = useParams();

  // const user = useSelector((state: RootState) =>
  //   selectUserById(state, id as string)
  // );

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id!],
    }),
  });

  if (!user) return <Loading />;

  const content = <EditUserForm user={user} />;
  return content;
};
export default EditUser;
