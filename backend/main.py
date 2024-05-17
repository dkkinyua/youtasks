# This Python file will hold our application's settings.
from flask import Flask
from flask_restx import Api, Resource
from exts import db


app = Flask(__name__) 
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
    
if __name__ == "__main__":
    app.run(debug=True)