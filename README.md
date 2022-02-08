# Guitar Practice App

CRUD application for managing guitar routines. Users can sign up and create a routine with exercises and time allocations for each exercise. Then, a routine can be started with a countdown.

Users can sign up with a username and password, or use Google login to access the site and start creating routines.

Once logged in, the user can create a routine consisting of a name, description, and a set of one or more exercises with each exercise containing a name and time. Once added, the time is added up to display the total time this routine will take to perform. This is also displayed in the form of a countdown timer, to accurately keep track of the time allocation for each exercise performed. A routine can be fully edited and also deleted by the user who created it.


You can find the site live [here](https://guitar-practice-app.vercel.app)

More information on this project's development process on my [blog](https://www.tomaszgasek.com/posts/guitar-app)

### Technologies used:
- React
- Next.js
- Supabase
- React Hook Form
- SWR
- Tailwind CSS


To run this site locally, clone this repo and use:
- npm install
- npm run dev
