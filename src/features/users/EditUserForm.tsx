import { useState, useEffect } from "react";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  User,
} from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeleteIcon, SaveIcon, ShieldAlert } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Spinner from "@/components/Spinner";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }: { user: User }) => {
  const [
    updateUser,
    {
      isLoading: isUpdating,
      isSuccess,
      isError,
      error,
      reset: resetUpdateUser,
    },
  ] = useUpdateUserMutation();

  const [
    deleteUser,
    {
      isLoading: isDeleting,
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delerror,
      reset: resetDeleteUser,
    },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onRolesChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async () => {
    resetDeleteUser();
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    resetUpdateUser();
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) &&
      !isUpdating;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isUpdating;
  }

  // const errClass = isError || isDelError ? "errmsg" : "offscreen";

  // const validUserClass = !validUsername ? "form__input--incomplete" : "";
  // const validPwdClass =
  //   password && !validPassword ? "form__input--incomplete" : "";
  // const validRolesClass = !roles.length ? "form__input--incomplete" : "";

  const validUserClass = !validUsername ? "ring-red-700 border-red-700" : "";
  const validRolesClass = !roles.length ? "ring-red-700 border-red-700" : "";
  const validPwdClass =
    password && !validPassword ? "ring-red-700 border-red-700" : "";

  // let errContent = (error?.data?.message || delerror?.data?.message) ?? "";
  let errContent;
  if (error) {
    errContent =
      "data" in error
        ? `Error: ${(error.data as { message: string }).message}`
        : "An error occurred";
  } else if (delerror) {
    errContent =
      "data" in delerror
        ? `Error: ${(delerror.data as { message: string }).message}`
        : "An error occurred";
  } else {
    errContent = "";
  }

  return (
    <>
      <Card className="md:mx-auto md:w-3xl mt-20 mx-4">
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
          <CardDescription>
            {(isError || isDelError) && (
              <p className={`mt-4 text-red-600 flex`} aria-live="assertive">
                <ShieldAlert className="mr-1" width={18} height={18} />
                {errContent}
              </p>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">
                  Username <span className="">[3-20 letters]</span>
                </Label>
                <Input
                  id="username"
                  name="username"
                  autoComplete="off"
                  value={username}
                  onChange={onUsernameChanged}
                  className={validUserClass}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">
                  Password{" "}
                  <span className="text-nowrap">[empty = no change]</span>
                  <span className="text-nowrap">
                    [4-12 characters incl. !@#$%]
                  </span>
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onPasswordChanged}
                  className={validPwdClass}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="roles">Assigned Roles</Label>
                <select
                  id="roles"
                  name="roles"
                  className={`w-[100%] ${validRolesClass} border-1 overflow-hidden leading-3 rounded-md`}
                  multiple={true}
                  size={3}
                  value={roles}
                  onChange={onRolesChanged}
                >
                  {options}
                </select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status" className="mr-2">
                  Status: {active ? "active" : "inactive"}
                </Label>
                <Switch
                  id="status"
                  name="status"
                  className="border-1 border-foreground"
                  checked={active}
                  onCheckedChange={onActiveChanged}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={onSaveUserClicked}
            disabled={!canSave}
          >
            {isUpdating ? (
              <div className="mt-1">
                <Spinner text="Saving updates" />
              </div>
            ) : (
              <>
                <SaveIcon />
                Save
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={onDeleteUserClicked}
            className="bg-red-700"
          >
            {isDeleting ? (
              <div className="mt-1">
                <Spinner text="Deleting User" />
              </div>
            ) : (
              <>
                <DeleteIcon />
                Delete User
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* {content} */}
    </>
  );
};
export default EditUserForm;
