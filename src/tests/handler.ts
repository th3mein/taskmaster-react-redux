import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3500/users", async () => {
    return HttpResponse.json(
      [
        {
          username: "Antonette",
          roles: ["admin"],
          active: true,
          id: "67d046b6a9282b501f8d7679",
        },
        {
          username: "Karianne",
          roles: ["admin", "manager"],
          active: true,
          id: "67d04d728b4aa167fa93fc03",
        },
        {
          username: "Bret",
          roles: ["employee"],
          active: true,
          id: "67d07d8483a030cb06542975",
        },
      ],
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),
];
