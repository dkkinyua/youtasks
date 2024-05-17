# This Python file will hold our application's settings.
from flask import Flask
from flask_restx import Api, Resource
from config import DevelopmentConfig
from exts import db
from models import User, Tasks


app = Flask(__name__) 
app.config.from_object(DevelopmentConfig)
db.init_app(app)


api = Api(app, doc='/docs')

# This API endpoint acts as a test to our application
@api.route("/hello")
class Hello(Resource):
    def get(self):
        message = {
            "msg": "Hello World!"
        }

        return message, 200
    

@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "User": User,
        "Tasks": Tasks
    }


if __name__ == "__main__":
    app.run(debug=True)