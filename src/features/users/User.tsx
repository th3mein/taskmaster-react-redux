import { useNavigate } from "react-router-dom";
import { memo } from "react";
// import { useSelector } from "react-redux";
// import { selectUserById } from "./usersApiSlice";
// import { RootState } from "../../app/store";
import { useGetUsersQuery } from "./usersApiSlice";
import { FaRegEdit } from "react-icons/fa";

const User = ({ userId }: { userId: string }) => {
  // const user = useSelector((state: RootState) => selectUserById(state, userId));

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "" : "opacity-30";

    return (
      <tr
        className={`hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors ${cellStatus}`}
      >
        <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
          {user.username}
        </td>
        <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
          {userRolesString}
        </td>

        <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ">
          <button
            className="icon-button table__button cursor-pointer flex"
            onClick={handleEdit}
          >
            <FaRegEdit className="mr-2 mt-0.5" /> Edit
          </button>
        </td>
      </tr>
    );
  } else return null;
};

export default memo(User);
