from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

# Models go here!s
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer(), primary_key = True)
    username = db.Column(db.String(), unique = True, nullable = False)
    _password_hash = db.Column(db.String)

    # relationships
    goals = db.relationship("Goal", back_populates = "user", cascade = "all, delete")

    # serialization rules
    serialize_rules = ("-goals",)

    # authentication
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode("utf-8")
            )

    # validations
    @validates("username")
    def validate_username(self, _, username):
        if not isinstance(username, str):
            raise ValueError("Username must be a string.")
        if len(username) > 100:
            raise ValueError("Username must be 100 or fewer characters.")
        return username

    # serialization rules
    serialize_rules = ("-goals",)

    def __repr__(self):
        return f"<User {self.id}: [username] >"

class Goal(db.Model, SerializerMixin):
    __tablename__ = "goals"

    id = db.Column(db.Integer(), primary_key = True)
    title = db.Column(db.String(), nullable = False)
    description = db.Column(db.String(), nullable = False)
    status = db.Column(db.String(), nullable = False)
    topic = db.Column(db.String(), nullable = False)
    user_id = db.Column(db.Integer(), db.ForeignKey("users.id"))

    # relationships
    user = db.relationship("User", back_populates = "goals")

    # validations
    @validates("title")
    def validate_title(self, _, title):
        if not isinstance(title, str):
            raise ValueError("Title must be a string.")
        if len(title) > 100:
            raise ValueError("Goal title must be 100 characters or fewer.")
        return title
    
    @validates("description")
    def validate_description(self, _, description):
        if not isinstance(description, str):
            raise ValueError("Description must be a string.")
        if len(description) > 300:
            raise ValueError("Goal description must be 300 characters or fewer.")
        return description
        
    @validates("status")
    def validate_status(self, _, status):
        if not isinstance(status, str):
            raise ValueError("Status must be a string.")
        if status not in("In Progress", "Completed", "Not Started"):
            raise ValueError("Goal status must be either In Progress, Completed, or Not Started.")
        return status
        
    @validates("topic")
    def validate_topic(self, _, topic):
        if not isinstance(topic, str):
            raise ValueError("Topic must be a string.")
        if topic not in("Career", "Financial", "Health & Fitness", "Personal", "Hobbies & Leisure", "Spiritual", "Community", "Other"):
            raise ValueError("Topic must be one of Career, Financial, Health & Fitness, Personal, Hobbies & Leisure, Spiritual, Community, Other")
        return topic
    
    def __repr__(self):
        return f"<Goal {self.id}: [title] {self.title} [description] {self.description} [status] {self.status}> [topic] {self.topic}"
    