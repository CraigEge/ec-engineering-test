# Setting up project
- Prefer to use pnpm for the library caching feature, causes less setup time as generally I find there is alot of project overlap
- Use IntelliJ IDEA Ultimate as my IDE of choice as it handles everything including database all in one (including code helpers between database and code for example)

# Task 1 - Database
- Personally would use autoincremental integers for IDs compared to UUIDs
  - More readable IDs
  - UUID occupies 16 bytes over 8 bytes for an auto increment integer
  - UUIDs although have a low chance of collision, still have a chance of collision (especially in distributed systems)
    - Due to this, when generating a UUID, you have to check if there was a collision and regenerate it if there was
  - UUIDs do reduce minor data leakage though, as incremental IDs could potentially expose how many records there are in a table
- Currently everything is a varchar without a specified max length, would be better to specify a max length for each column
  - No point reserving this max amount of space for every record if it is not needed

## Bookings table
- Currently, does not use foreign keys, would be better to use foreign keys to ensure data integrity and to associate bookings to users/parcs
- Would also add a `created_at` and `updated_at` column to track when the record was created and updated (a booking date could change for example)
- Would also add a `deleted_at` column to track when the record was deleted (soft delete)
  - This would allow us to restore the record if it was deleted by accident
  - Also allows us to track when the record was deleted
- `booking_date` is currently a varchar, would be better to use a date type instead
  - This would allow us to use date functions on the column and have the database do some more of the work with dates when searching etc.
- `comments` could be its own table with a `one-to-many` relationship so multiple users can comment on a booking instead of it being a single string

# Task 2 - Latest practices
- Working currently on projects both internally and user facing, mostly in React
  - Internal projects currently use [Material UI](https://mui.com/) as a design system
    - Quick turnaround times
    - In-keeping with Google Drive, Google Docs etc. which we also use for user familiarity
    - Easy to theme and modify globally
  - External facing projects use a variety of systems depending on use case
    - Some single page marketing sites use SvelteKit (e.g. [Precinct](https://www.theprecinctgame.com/), [Die by the Blade](https://www.dbtbgame.com/) and [Wildmender](https://wildmender.com/))
      - Simple logic
      - Lighter weight than React generally when compiling using SSG (Static Site Generation)
  - Use storybooks to develop components in isolation
    - This allows us to easily develop reusable components
    - Easy onboarding for new developers as they can see all the components in one place and how to use them
    - Allows us to easily test components in isolation
    - Allows us to easily document components
    - Storybook is in separate repository to the main project
      - Allows us to develop components cross project
        - Reduces repeat code
        - Allows us to easily update components across projects
      - Even if you directly don't work with a team member on a project, you can still share components
  - Make use of [Redux Toolkit](https://redux-toolkit.js.org/) and [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) currently
    - Removes alot of boilerplate code
    - Allows us to easily create slices and reducers
    - Allows us to easily create and implement API calls using the same logic as slices
    - Comes out of the box with client side caching and cache busting to keep data up to date
    - Allows us to easily create and implement middleware
  - Use Typescript
    - Allows us to catch errors at compile time
    - Allows us to easily see what data is being passed around
    - Once again, useful for onboarding as I am a strong believer in "self documenting code"
  - Use [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
    - Allows us to easily format code in a consistent way
    - Uses [Husky](https://typicode.github.io/husky/#/) in combination with [lint-staged](https://github.com/okonet/lint-staged) to run linting and formatting on commit
      - This ensures that code is always formatted correctly and linted
      - This also ensures that code is always formatted and linted the same way

# Senior - Frontend
- Located in `frontend-task` directory
- Uses Vite, React, Redux Toolkit, RTK Query, Typescript, Material UI, Prettier
- Using npm over pnpm for this project as you have used npm in the main project
- Not using husky and lint-staged as I want it to run only on the projects subfolder and do not want to modify the main project
- API endpoints are handled in the `services` directory
- Did not have time to set up unit tests, but would use Jest and React Testing Library
- I only put moment objects in the redux store for efficiency in this case (I can just interact with date objects and they turn in to strings at data transmission), if rehydration and similar was taking place I would not do this

## Setup
- Run `npm install` to install dependencies
- Run `npm run start` to start the development server
  - Frontend is accessible from http://localhost:5173/

## If I had more time
- Set up unit tests
- Write code alot more structured by using more sub components/reusable components
- Add more comments
- Potentially use storybook to document things better
- A lot more UI/UX on how errors etc. display

Thank you for taking the time to look at my test
