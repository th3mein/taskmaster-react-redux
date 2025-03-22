import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { User } from "../users/usersApiSlice";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SaveIcon, ShieldAlert } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "@/components/Spinner";

const NewNoteForm = ({ users }: { users: User[] }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0].id);
  const [validTitleClass, setValidTitleClass] = useState("");
  const [validTextClass, setValidTextClass] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setValidTitleClass(e.target.value ? "" : "ring-red-700 border-red-700");
  };
  const onTextChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setValidTextClass(e.target.value ? "" : "ring-red-700 border-red-700");
  };
  const onUserIdChanged = (userId: string) => setUserId(userId);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e: React.FormEvent) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote({ user: userId, title, text });
    }
  };

  const usrs = users.map((user) => {
    return (
      <SelectItem key={user.id} value={user.id}>
        {user.username}
      </SelectItem>
    );
  });
  return (
    <Card className="md:mx-auto md:w-3xl mt-20 mx-4">
      <CardHeader>
        <CardTitle>Create a New Ticket</CardTitle>
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
        <form onSubmit={onSaveNoteClicked}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="note-title">Title *</Label>
              <Input
                id="note-title"
                name="title"
                autoComplete="off"
                value={title}
                onChange={onTitleChanged}
                placeholder="Ticket Title"
                className={validTitleClass}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="note-text">Text *</Label>
              <Textarea
                id="note-text"
                name="text"
                autoComplete="off"
                value={text}
                onChange={onTextChanged}
                className={validTextClass}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="users">Assignee:</Label>
              <Select
                autoComplete="off"
                name="username"
                defaultValue={userId}
                onValueChange={onUserIdChanged}
              >
                <SelectTrigger id="users" className="w-40">
                  <SelectValue placeholder="Select User" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="bg-white text-black"
                >
                  {usrs}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          onClick={onSaveNoteClicked}
          disabled={!canSave}
        >
          {isLoading ? (
            <div className="mt-1">
              <Spinner text="Saving new Ticket" />
            </div>
          ) : (
            <>
              <SaveIcon />
              Save
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewNoteForm;
