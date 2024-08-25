#!/usr/bin/env python3

# Local imports
from app import app
from models import db, User, Goal
from faker import Faker

fake = Faker()

if __name__ == '__main__':
    with app.app_context():
        
        print("Deleting all records... ")
        User.query.delete()
        Goal.query.delete()
        
        print("Creating users...")
        user1 = User(username = "user1")
        user2 = User(username = "user2")
        user3 = User(username = "user3")

        user1.password_hash = user1.username + "password"
        user2.password_hash = user2.username + "password"
        user3.password_hash = user3.username + "password"

        users = [user1, user2, user3]
        db.session.add_all(users)
        db.session.commit()

        print("Creating goals...")
        goal1 = Goal(
            title = "Obtain CPA Certification",
            description = "Prepare for and pass the exam for certification as a Certified Public Accountant.",
            status = "Not Started",
            topic = "Career",
            user_id = user1.id
        )

        goal2 = Goal(
            title = "Build an Emergency Fund",
            description = "Save at least three to six months' worth of living expenses to prepare for unexpected financial situations.",
            status = "In Progress",
            topic = "Financial",
            user_id = user1.id
        )

        goal3 = Goal(
            title = "Go Vegetarian",
            description = "Commit to a vegetarian diet and incorporate more whole foods, fruits, and vegetables",
            status = "Not Started",
            topic = "Health & Fitness",
            user_id = user2.id
        )

        goal4 = Goal(
            title = "Improve Time Management Skills",
            description = "Implement a time management system to increase productivity and reduce stress over the next three months",
            status = "In Progress",
            topic = "Personal",
            user_id = user2.id
        )

        goal5 = Goal(
            title = "Learn French",
            description = "Begin learning a new language, aiming to achieve conversational fluency in the next 18 months.",
            status = "Completed",
            topic = "Hobbies & Leisure",
            user_id = user2.id
        )

        goal6 = Goal(
            title = "Daily Meditation Practice",
            description = "Commit to a daily meditation practice, starting with 5 minutes a day and gradually increasing to 20 minutes.",
            status = "In Progress",
            topic = "Spiritual",
            user_id = user2.id
        )

        goal7 = Goal(
            title = "Volunteer at the Animal Shelter",
            description = "Volunteer at the local animal shelter monthly.",
            status = "Not Started",
            topic = "Community",
            user_id = user3.id
        )

        goal8 = Goal(
            title = "Travel to South America",
            description = "Travel to a South American country for at least a week in the next 24 months.",
            status = "Not Started",
            topic = "Hobbies & Leisure",
            user_id = user3.id
        )

        goal9 = Goal(
            title = "Promotion",
            description = "Convert the SWE internship at SelfActualize.AI into a full-tine offer.",
            status = "Completed",
            topic = "Career",
            user_id = user3.id
        )

        goal10 = Goal(
            title = "Save for the Wedding",
            description = "Save $30k dollars in the next 12 months to help pay for our wedding.",
            status = "In Progress",
            topic = "Financial",
            user_id = user3.id
        )

        goals = [goal1, goal2, goal3, goal4, goal5, goal6, goal7, goal8, goal9, goal10]
        db.session.add_all(goals)
        db.session.commit()

        print("Seeding complete!")