from exts import db
from datetime import datetime

# The User model, plus its save, delete, update functions(CRUD)
class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    tasks = db.relalationship("Tasks", backref='author', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

    # This functions save, update or delete a user's details to/from the db
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, username, email):
        self.username = username
        self.email = email

        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

# The Tasks model to hold our task properties and its CRUD operations like saving tasks
class Tasks(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    task = db.Column(db.String(), nullable=False)
    due_time = db.Column(db.DateTime, nullable=False, default=datetime.now)
    user_id = db.Column(db.Integer(), db.ForeignKey("user.id"), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'
    
     # This functions save, update or delete a task's details to/from the db

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self, task, due_time):
        self.task = task
        self.due_time = due_time

        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    