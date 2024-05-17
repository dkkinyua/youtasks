from exts import db

# The User model, plus its save, delete, update functions(CRUD)
class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    tasks = db.relalationship("Tasks", backref='author', lazy=True)

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