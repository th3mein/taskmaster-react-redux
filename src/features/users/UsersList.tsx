import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import Loading from "@/components/Loading";
import useTitle from "@/hooks/useTitle";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("UsersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useTitle("React Redux RTK Query - Ticket management system - Users");

  let content;

  if (isLoading) content = <Loading />;

  if (isError) {
    content = (
      <p className="errmsg">
        {/* {error?.data?.message} */}
        {"data" in error ? `Error: ${error.data}` : "An error occurred"}
      </p>
    );
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);

    content = (
      <div className="container mx-auto py-10">
        <div className="rounded-md border">
          <div className="relative w-full overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                  <th
                    scope="col"
                    className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                  >
                    Username
                  </th>

                  <th
                    scope="col"
                    className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                  >
                    Roles
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {tableContent}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      // <table className="table table--users">
      //   <thead className="table__thead">
      //     <tr>
      //       <th scope="col" className="table__th user__username">
      //         Username
      //       </th>
      //       <th scope="col" className="table__th user__roles">
      //         Roles
      //       </th>
      //       <th scope="col" className="table__th user__edit">
      //         Edit
      //       </th>
      //     </tr>
      //   </thead>
      //   <tbody>{tableContent}</tbody>
      // </table>
    );
  }

  return content;
};
export default UsersList;
