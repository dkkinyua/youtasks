# This Python file will hold our application's settings.
from flask import Flask
from flask_restx import Api
from exts import db
from models import User, Tasks
from flask_migrate import Migrate
from tasks import tasks_namespace

# This create_app function is exported to run.py to run our Flask application, for better organization of our modules.

def create_app(config):
    app = Flask(__name__) 
    app.config.from_object(config)
    db.init_app(app)

    migrate = Migrate(app, db)

    api = Api(app, doc='/docs')

    api.add_namespace(tasks_namespace)
        

    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "User": User,
            "Tasks": Tasks
        }

    return app