<!-- ABOUT THE PROJECT -->

## Customer Tickets Management

A small ticketing app built with Vite, Typescript, React 19, Redux, RTK query.

- Users management CRUD
- Ticket management CRUD
- Authentication and Authorization. Role based access.
  - Only admin and managers can manage users
  - Employee can view update tickets
  - Only admin and managers can delete ticket
- Github workflows - auto deploy to github pages

### Built With

[![Vite][Vite.dev]][Vite-url]

[![Typescript][Typescriptlang.org]][Typescript-url]

[![React][React.dev]][React-url]

[![Redux][Redux.js.org]][Redux-url]

[![Tailwind][Tailwind]][Tailwind-url]

### Backend

```
  https://github.com/th3mein/taskmaster-node
```

### Test setup

[![Vitest][Vitest.dev]][Vitest-url]

[![RTL][TL.org]][RTL-url]

[![Cypress][Cypress.io]][RTL-url]

<!-- GETTING STARTED -->

## See it in action

Live at [Github pages](https://th3mein.github.io/taskmaster-react-redux/)

- _Backend server running free on Render.com. It can take up to a minute to wake up the backend server when logging in the first time, beause it is almost certainly asleep._
- _Because HashRouter used because Brower router apparntly is not compatible with GH Pages, so it might look/beahave stupidly._
- _Login with username: admin password: adMin@GG12_

[Typescriptlang.org]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square
[Typescript-url]: https://www.typescriptlang.org/
[React.dev]: https://shields.io/badge/react-black?logo=react&style=for-the-badge
[React-url]: https://react.dev/
[Vite.dev]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white
[Vite-url]: https://vite.dev/
[Redux.js.org]: https://img.shields.io/badge/-Redux-black?style=flat-square&logo=redux
[Redux-url]: https://redux.js.org/
[Tailwind]: https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss
[Tailwind-url]: https://tailwindcss.com/
[Vitest.dev]: https://img.shields.io/badge/vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white
[Vitest-url]: https://vitest.dev/
[TL.org]: https://img.shields.io/badge/-Testing%20Library-%23E33332?&style=for-the-badge&logo=testing-library&logoColor=white
[RTL-url]: https://testing-library.com/
[Cypress.io]: https://img.shields.io/badge/-cypress-%23E5E5E5?logo=cypress&logoColor=058a5e
[RTL-url]: https://www.cypress.io/
