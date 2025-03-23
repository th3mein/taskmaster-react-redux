import React, { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";

/* UI */
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { SaveIcon, ShieldAlert } from "lucide-react";
import Spinner from "@/components/Spinner";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);
  const [validUserClass, setValidUserClass] = useState("");
  const [validRolesClass, setValidRolesClass] = useState("");
  const [validPwdClass, setValidPwdClass] = useState("");

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setValidUserClass(e.target.value ? "" : "ring-red-700 border-red-700");
  };
  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setValidPwdClass(
      PWD_REGEX.test(e.target.value) ? "" : "ring-red-700 border-red-700"
    );
  };

  const onRolesChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setRoles(values);
    setValidRolesClass(
      values.length > 0 ? "" : "ring-red-700 border-red-700 focus:ring-red-700"
    );
  };

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  return (
    <Card className="md:mx-auto md:w-3xl mt-20 mx-4">
      <CardHeader>
        <CardTitle>Create a New User</CardTitle>
        <CardDescription>
          {isError && (
            <p
              className={`mt-4 text-red-600 flex align-middle`}
              aria-live="assertive"
            >
              <ShieldAlert className="mr-2" width={18} height={18} />
              {"data" in error
                ? `Error: ${(error.data as { message: string }).message}`
                : "An error occurred"}
            </p>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSaveUserClicked}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">
                Username *<span className="nowrap">[3-20 letters]</span>
              </Label>
              <Input
                id="username"
                name="username"
                autoComplete="off"
                value={username}
                onChange={onUsernameChanged}
                placeholder="User name"
                className={validUserClass}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">
                Password *
                <span className="nowrap">[4-12 chars incl. !@#$%]</span>
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
              <Label htmlFor="roles">Roles *</Label>
              <select
                id="roles"
                name="roles"
                className={`w-[100%] ${validRolesClass} border-1 overflow-hidden leading-3 rounded-md`}
                multiple
                size={3}
                value={roles}
                onChange={onRolesChanged}
              >
                {options}
              </select>
            </div>

            <div className="space-y-1.5">
              <Button variant="outline" disabled={!canSave}>
                {isLoading ? (
                  <div className="mt-1">
                    <Spinner text="Saving new User" />
                  </div>
                ) : (
                  <>
                    <SaveIcon />
                    Save
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default NewUserForm;
