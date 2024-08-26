# PathFinder

## Introduction

Welcome to PathFinder! Start your journey towrad achieving your goals today. Whether you're setting new aspirations or tracking progress on your existing path, PathFinder is here to guide you every step of the way. Let's find your path to success together!

---

## Features
PathFinder users are greated with an AI-generated motivational message on the homescreen. Users can create a profile with authentication, create new paths, view, update, and delete existing paths, and view path counts by status. 

_Sign Up:_ Create a user profile on the sign up page by entering a username and creating and confirming a password.

_Login:_ Login with the username and password created during signup.

_Logout:_ Logout any time from any page via the 'Logout' button.

_Home:_ View an AI-generated motivational quote and the PathFinder mission statement.

_Paths:_ View existing paths and create new paths on the Paths page. Click the "see details" link to view more details about a given path.

_Path Details:_ View path details and update path status or delete the path entirely.

_Profile:_ View user profile details and path counts, and update your password, if desired.

_Leave:_ Leave PathFinder any time using the leave button.

## Demo
![Demo GIF](src/images/pathfinder_gif.gif)

## Screenshots
![Sign Up](client/public/SignUp.png)
![Login](client/public/Login.png)
![Paths](client/public/Paths.png)
![Path Detail](client/public/PathDetail.png)
![Profile](client/public/Profile.png)

## Development Instructions

1. Clone the repository to your local machine. From the top-level of the directory:
2. Install frontend dependencies using _npm install --prefix client_
3. Run the frontend development server using _npm start --prefix client_
4. Access the website through your browser at _http://localhost:3000_
4. Run the backend virtual environment using _pipenv shell_
5. Install backend dependencies using _pipenv install --prefix server_
6. Run the backend development server using _python server/app.py_
7. Access the backend API via proxy through your browser at _http://localhost:5555/api_
8. Install PostgreSQL locally (if you don't have it already) to use development database _https://www.w3schools.com/postgresql/postgresql_install.php_
9. Create a .env file in _server_ with a DATABASE_URI=postgresql://postgres:postgres@localhost:5433/postgres environment variable
10. While in _server_, run the following:
  mkdir data
  pg_ctl -D data start
11. Seed mock user data using _python server/seed.py_

-- Integrate Claude --
1. Procure Claude (Antrhopic) API key and add ANTHROPIC_API_KEY=your_key_here to your .env file


## Resources - PathFinder Website API
The PathFinder frontend is connected to the backend via API, resources for which are defined in _server/app.py_. Resources (routes) and supported methods include:

_signup_:
  * post()

_check_session_:
  * get()

_login_:
  * post()

_logout_:
  * delete()

_users_:
  * patch()
  * delete()

_goals_:
  * get()
  * post()
  * patch()
  * delete()

## Programs Used
Frontend:
- Javascript
- HTTP client for making API requests
- React: Frontend framework for building interactive user interfaces
  - React Router: Library for handling navigation within a React application
  - Formik, yup: Library for handling and validating form submissions

Backend:
- Python
- Flask: Micro web framework used for developing web applications using python, implemented on Wekzeug and Jinja2.
  - SQLAlchemy: Python SQL toolkit and ORM (Object Relational Mapper) used for accessing the local database
  - Flask-restful: Flask extension used for building REST APIs
  - Flask-migrate: Flask extension used for handling SQLAlchemy database migrations for Flask applications using Alembic
  - Flask-cors: Flask extension used for enabling Corss Origin Resource Sharing on all routes
