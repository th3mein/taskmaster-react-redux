import { useNavigate } from "react-router-dom";
import { memo } from "react";
// import { RootState } from "../../app/store";

// import { useSelector } from "react-redux";
// import { selectNoteById } from "./notesApiSlice";
import { useGetNotesQuery } from "./notesApiSlice";
import { FaRegEdit } from "react-icons/fa";

const Note = ({ noteId }: { noteId: string }) => {
  // const note = useSelector((state: RootState) => selectNoteById(state, noteId));

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });
  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(note.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
        <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
          {note.title}
        </td>
        <td className="p-2 align-middle  [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] hidden lg:table-cell">
          {note.text}
        </td>
        <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
          {note.username}
        </td>

        <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
          {updated}
        </td>
        <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
          {created}
        </td>

        <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>

        <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
          <button
            className="icon-button table__button cursor-pointer flex"
            onClick={handleEdit}
          >
            <FaRegEdit className="mr-2 mt-0.5" /> Edit
          </button>
        </td>
      </tr>
    );
  } else {
    return null;
  }
};

export default memo(Note);
