import { useState, useEffect } from "react";
import {
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  Note,
} from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { User } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";

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
import { MdOutlineDeleteForever } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Spinner from "@/components/Spinner";

const EditNoteForm = ({ note, users }: { note: Note; users: User[] }) => {
  const { isManager, isAdmin } = useAuth();

  const [updateNote, { isLoading: isUpdating, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    {
      isLoading: isDeleting,
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delerror,
    },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(note.user);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onTextChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);
  const onCompletedChanged = () => setCompleted((prev) => !prev);

  const onAssigneeChanged = (id: string) => {
    setUserId(id);
  };
  const canSave = [title, text, userId].every(Boolean) && !isUpdating;

  const onSaveNoteClicked = async () => {
    if (canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed });
    }
  };

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id });
  };

  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const validTitleClass = !title ? "ring-red-700 border-red-700" : "";
  const validTextClass = !text ? "ring-red-700 border-red-700" : "";

  // const errContent = (error?.data?.message || delerror?.data?.message) ?? "";
  let errContent;
  if (error) {
    errContent = "data" in error ? `Error: ${error.data}` : "An error occurred";
  } else if (delerror) {
    errContent =
      "data" in delerror ? `Error: ${delerror.data}` : "An error occurred";
  } else {
    errContent = "";
  }

  let delButton = null;
  if (isManager || isAdmin) {
    delButton = (
      <Button
        title="Delete"
        onClick={onDeleteNoteClicked}
        className="bg-red-700"
      >
        {isDeleting ? (
          <div className="mt-1">
            <Spinner text="Deleting Ticket" />
          </div>
        ) : (
          <>
            <MdOutlineDeleteForever className="text-4xl" />
            Delete
          </>
        )}
      </Button>
    );
  }

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
        <CardTitle>Ticket #{note.ticket}</CardTitle>
        <CardDescription>
          <p className="form__created">
            Created:
            {created}
          </p>
          <p className="form__updated">
            Last Updated:
            {updated}
          </p>

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
                onValueChange={onAssigneeChanged}
              >
                <SelectTrigger id="users" className="w-40">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="bg-white text-black"
                >
                  {usrs}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="note-completed" className="mr-2">
                Status: {completed ? "completed" : "open"}
              </Label>
              <Switch
                id="note-completed"
                name="note-completed"
                className="border-1 border-foreground"
                checked={completed}
                onCheckedChange={onCompletedChanged}
              />
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
        {delButton}
      </CardFooter>
    </Card>
  );
};

export default EditNoteForm;
