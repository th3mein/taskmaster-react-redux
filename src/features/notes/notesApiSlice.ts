import {
  createSelector,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { RootState } from "../../app/store";

// export interface Note {
//   id: string;
//   notename: string;
//   email: string;
//   roles: string[];
//   active: boolean;
// }

export interface Note {
  user: string;
  title: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  ticket: number;
  id: string;
  username: string;
}

const notesAdapter = createEntityAdapter<Note>({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState: EntityState<Note, string> = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: "/notes",
        // Example: we have a backend API always returns a 200,
        // but sets an `isError` property when there is an error.
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      // keepUnusedDataFor: 5,
      transformResponse: (responseData: Note[]) => {
        return notesAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Note", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Note" as const, id })),
            ]
          : [{ type: "Note", id: "LIST" }],
    }),
    addNewNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "POST",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    updateNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: `/notes`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;

// returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select(null);

// creates memoized selector
const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
  // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors(
  (state: RootState) => selectNotesData(state) ?? initialState
);
