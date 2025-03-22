import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "./ui/checkbox";
import { ShieldAlert } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth//authApiSlice";
import { isFetchBaseQueryError } from "../app/lib/utils";
import usePersist from "../hooks/usePersist";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [persist, setPersist] = usePersist();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current?.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleToggle = () => setPersist(!persist);
  const errClass = errMsg ? "errmsg" : "offscreen";

  // if (isLoading) return <p>Loading...</p>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMsg("");
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err: unknown) {
      if (isFetchBaseQueryError(err)) {
        // Handle API errors
        if (err.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.status === 401) {
          setErrMsg((err.data as { message: string }).message);
        } else if (
          typeof err.data === "object" &&
          err.data !== null &&
          "message" in err.data
        ) {
          // Safely access `message` if it exists
          setErrMsg((err.data as { message: string }).message);
        } else {
          setErrMsg("An unknown error occurred");
        }
      } else {
        // Handle other errors (network issues, unexpected errors, etc.)
        setErrMsg("No Server Response");
      }

      errRef.current?.focus();
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email username and password to login to your account
            {/* {isLoading && (
              <p className="mt-4">
                <Spinner text="logging in" />
              </p>
            )} */}
            {errMsg && (
              <p
                ref={errRef}
                className={`${errClass} mt-4 text-red-600 flex`}
                aria-live="assertive"
              >
                <ShieldAlert className="mr-1" width={18} height={18} />
                {errMsg}
              </p>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">User name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="username"
                  required
                  autoComplete="off"
                  onChange={handleUserInput}
                  ref={userRef}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={handlePwdInput}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="persist">Remember me</Label>

                  <Checkbox
                    name="persist"
                    id="persist"
                    className="ml-2"
                    checked={persist}
                    onClick={handleToggle}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isLoading ? (
                    <div className="mt-1">
                      <Spinner text="Logging In" />
                    </div>
                  ) : (
                    <>Login</>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
