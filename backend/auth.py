from flask import jsonify, request, make_response
from flask_restx import fields, Namespace, Resource
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from models import User

auth_ns = Namespace("auth", description="Authorization and Authentication namespace")

user_model = auth_ns.model(
    "User", {
        "id": fields.Integer(),
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String()
    }
)
 
# This endpoint enables a user to sign up to the site
@auth_ns.route("/signup", methods=["POST"])
class Signup(Resource):
    @auth_ns.expect(user_model) # Tells the function to expect the user model serializer
    def post(self):
        try:
            data = request.get_json()
            username = data.get("username")
            email = data.get("email")

            # This is to check if the username or email exists in the database 
            db_user = User.query.filter_by(username=username).first()
            db_email = User.query.filter_by(email=email).first()

            if db_user:
                return jsonify({
                    "msg": f"A user with the username {username} exists, try another username"
                })
            
            if db_email:
                return jsonify({
                    "msg": f"A user with the email {email} exists, try another email"
                })
            
            new_user = User(
                username = data.get("username"),
                email = data.get("email"),
                password = generate_password_hash(data.get("password"))
            )

            new_user.save()

            return make_response(jsonify({
                "msg": f"User {username} created."
            }), 201)


        except Exception as e:
            return jsonify({
                "msg": f"Error {str(e)}"
            }), 500
        
# This endpoint enables the user to login into the site
@auth_ns.route("/login", methods=["POST"])
class Login(Resource):
    @auth_ns.expect(user_model) # Tells the function to expect the user model serializer
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        user = User.query.filter_by(username=username).first()

        # If the user doesn't exist in the database, return the message
        if not user:
            return make_response(jsonify({
                "msg": "User not found, try signing up first or check username"
            }), 404)

        # Checks if the user exists in the database and if the password entered matches the hashed pwd in the database, if they do,
        # creates an access_token and a refresh_token in the identity of the user's username and returns them for a successful login.
        if user and check_password_hash(user.password, password):
            access_token = create_access_token(identity=user.username)
            refresh_token = create_refresh_token(identity=user.username)

            return make_response(jsonify(
                {
                "access_token": access_token,
                "refresh_token": refresh_token
            }), 200)
        
        # Returns the message if the password entered by the user matches the one in the db, if not, return a 'wrong pwd' prompt

        if not check_password_hash(password, user.password):
            return jsonify({
                "msg": "Wrong Password, try again."
            })
        
# This endpoint refreshes the tokens everytime a user reloads the page
@auth_ns.route("/refresh", methods=["POST"])
class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()

        access_token = create_access_token(identity=current_user)

        return make_response(jsonify(
            {
                "access_token": access_token
            }
        ), 200)
