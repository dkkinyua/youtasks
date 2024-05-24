# This Python file will hold our application's settings.
from flask import Flask
from flask_restx import Api
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from exts import db
from models import User, Tasks
from tasks import tasks_namespace
from auth import auth_ns
from users import user_ns

# This create_app function is exported to run.py to run our Flask application, for better organization of our modules.

def create_app(config):
    app = Flask(__name__) 
    app.config.from_object(config)
    db.init_app(app)

    migrate = Migrate(app, db)
    JWTManager(app)

    api = Api(app, doc='/docs')

    api.add_namespace(tasks_namespace)
    api.add_namespace(auth_ns)
    api.add_namespace(user_ns)
        

    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "User": User,
            "Tasks": Tasks
        }

    return app