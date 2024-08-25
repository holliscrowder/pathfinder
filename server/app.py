#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, jsonify, make_response, render_template
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Goal

# Views go here!
@app.route('/')
def index():
    return render_template("index.html")

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

class Signup(Resource):
    def post(self):
        json = request.get_json()
        try:
            # confirm username is available
            user_test_username = User.query.filter_by(username=json.get("username")).first()
            if user_test_username:
                return make_response({"user_status": "Invalid username, please try again."}, 401)
            
            # create new user
            user = User(
                username = json.get("username")
            )
            user.password_hash = json.get("password")

            # update session info
            db.session.add(user)
            db.session.commit()
            session["user_id"] = user.id
            
            # return user info
            user_response = jsonify(user.to_dict("-goals"))
            return make_response(user_response, 201)
            
        # check for errors
        except ValueError:
            return make_response({"error": "User information value invalid"}, 422)

class CheckSession(Resource):
    def get(self):
        # check if session has user ID
        if session.get("user_id"):
            # find user
            user = User.query.filter(User.id == session["user_id"]).first()
            
            # return user info
            user_response = jsonify(user.to_dict())
            return make_response(user_response, 200)
        
        return make_response({"error": "Unauthorized"}, 401)
    
class Login(Resource):
    def post(self):
        # set session ID
        username = request.get_json().get("username")
        password = request.get_json().get("password")
        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            session["user_id"] = user.id
            user_response = jsonify(user.to_dict())
        # return user info
            response = make_response(user_response, 200)
            return response
            
        # check for errors
        else:
            return make_response({"username": "Unauthorized username and/or password"}, 401)
        
class Logout(Resource):
    def delete(self):
        # reset session ID
        if session["user_id"]:
            session["user_id"] = None

            # return empty response
            return make_response({"message": "204: No Content"}, 204)
        return make_response({"error": "User not logged in"}, 401)
    
class Users(Resource):

    # update user information
    def patch(self):
        # find user being updated
        user = User.query.filter(User.id == session["user_id"]).first()
        
        if not user:
            return make_response({"error": "User not found"}, 404)
        
        user_data = request.get_json()
        print(user_data)
        try:
            # update user info
            if user_data.get("username"):
                user.username = user_data.get("username")
            if user_data.get("currentPassword") and user_data.get("newPassword"):
                check_current_password = user_data.get("currentPassword")
                if user.authenticate(check_current_password):
                    user.password_hash = user_data.get("newPassword")

            db.session.add(user)
            db.session.commit()
            user_response = jsonify(user.to_dict())

            # return updated user info
            return make_response(user_response, 201)

        except ValueError:
            return make_response({"error": "User information value invalid"}, 422)

    # delete user and all their data
    def delete(self):
        # find user to delete
        user = User.query.filter(User.id == session["user_id"]).first()

        # check that user details submitted in the 'leave' form match the session user details
        user_data = request.get_json()
        form_username = user_data.get("username")
        form_password = user_data.get("password")

        if not user:
            return make_response({"error": "User not found"}, 404)
        
        elif not user.authenticate(form_password) or user.username != form_username:
            return make_response({"error": "User information not authenticated."}, 401)
        
        # delete user
        db.session.delete(user)
        db.session.commit()

        # reset session ID
        session["user_id"] = None

        # return empty message
        return make_response({"message": "204: No content"}, 204)
    
class Goals(Resource):
    # add new goal
    def post(self):
        if not session['user_id']:
            return make_response({"error": "Not authorized."}, 401)
        goal = request.get_json()
        try:
            new_goal = Goal(user_id = session["user_id"], title = goal["title"], description = goal["description"], status = goal["status"], topic = goal["topic"])
            db.session.add(new_goal)
            db.session.commit()

            goal_response = jsonify(new_goal.to_dict())
            return make_response(goal_response, 201)    
          
        # check for errors
        except ValueError as e:
            print(e)
            return make_response({"error": "Value error"}, 422)
    
    # view goals
    def get(self):
        if not session.get("user_id"):
            return make_response({"error": "Not authorized."}, 401)
        
        # create goals array of all available goals for the user
        user = User.query.filter(User.id == session.get("user_id")).first()
        goals = user.goals

        # format for JSON response
        if goals:
            goals_response = jsonify([goal.to_dict() for goal in goals])
            return make_response(goals_response, 200)
        else:
            return make_response({"error": "No content found for user goals"}, 401)
    
    # update goal status
    def patch(self):
        if not session.get("user_id"):
            return make_response({"error": "Not authorized"}, 401)
        
        updated_goal = request.get_json()

        # find goal
        goal = Goal.query.filter(Goal.id == updated_goal["id"]).first()

        if goal:
            if updated_goal.get_json("status"):
                goal.status = updated_goal.get_jsont("status")

            updated_goal_response = jsonify(goal.to_dict())
            return make_response(updated_goal_response, 201)
        else:
            return make_response({"error": "Goal not found"}, 404)

    # delete goal
    def delete(self):
        if not session.get("user_id"):
            return make_response({"error": "Not authorized"}, 401)
        
        delete_goal = request.get_json()
        # find goal
        goal = Goal.query.filter(Goal.id == delete_goal["id"]).first()
        if not goal:
            return make_response({"error": "Goal not found"}, 404)
        
        db.session.delete(goal)
        db.session.commit()

        return make_response({"message": "204: No content"}, 204)

api.add_resource(Signup, "/api/signup", endpoint = "signup")
api.add_resource(CheckSession, "/api/check_session", endpoint = "check_session")
api.add_resource(Login, "/api/login", endpoint = "login")
api.add_resource(Logout, "/api/logout", endpoint = "logout")
api.add_resource(Users, "/api/users", endpoint = "users")
api.add_resource(Goals, "/api/goals", endpoint = "goals")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

