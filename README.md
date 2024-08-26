# PathFinder

## Introduction

Welcome to PathFinder! Start your journey towrad achieving your goals today. Whether you're setting new aspirations or tracking progress on your existing path, PathFinder is here to guide you every step of the way. Let's find your path to success together!

---

## Features
PathFinder users can create a profile with authentication, create new paths, view, update, and delete existing paths, and view path counts by status. 

_Sign Up:_ Create a user profile on the sign up page by entering a username and creating and confirming a password.

_Login:_ Login with the username and password created during signup.

_Logout:_ Logout any time from any page via the 'Logout' button.

_Home:_ View the PathFinder mission statement.

_Paths:_ View existing paths and create new paths on the Paths page. Click the "see details" link to view more details about a given path.

_Path Details:_ View path details and update path status or delete the path entirely.

_Profile:_ View user profile details and path counts, and update your password, if desired.

_Leave:_ Leave alpha testing by entering the associated email and username.

## Demo
![Demo GIF](client/public/pensyv_website_gif.gif)

## Development Instructions

1. Clone the repository to your local machine. From the top-level of the directory:
2. Install frontend dependencies using _npm install --prefix client_
3. Run the frontend development server using _npm start --prefix client_
4. Access the website through your browser at _http://localhost:3000_
4. Install backend dependencies using _pipenv install --prefix client_
5. Run the backend virtual environment using _pipenv shell_
6. Run the backend development server using _python server/app.py_
7. Access the backend API via proxy through your browser at _http://localhost:5555/_
8. Seed mock user data using _python server/seed.py_

## Resources - Pensyv Website API
The Pensyv frontend is connected to the backend via API, resources for which are defined in _server/app.py_. Resources (routes) and supported methods include:

_signup_:
  * post()

_check_session_:
  * get()

_login_:
  * post()

_logout_:
  * delete()

_questions_:
  * get()

_users_:
  * patch()
  * delete()

_questionnaires_:
  * get()
  * post()

## Programs Used
Frontend:
- Javascript
- HTTP client for making API requests
- React: Frontend framework for building interactive user interfaces
  - React Router: Library for handling navigation within a React application
  - Formik, yup: Library for handling and validating form submissions
  - Recharts: Library for handling graphical data visualization

Backend:
- Python
- Flask: Micro web framework used for developing web applications using python, implemented on Wekzeug and Jinja2.
  - SQLAlchemy: Python SQL toolkit and ORM (Object Relational Mapper) used for accessing the database
  - Flask-restful: Flask extension used for building REST APIs
  - Flask-migrate: Flask extension used for handling SQLAlchemy database migrations for Flask applications using Alembic
  - Flask-cors: Flask extension used for enabling Corss Origin Resource Sharing on all routes
