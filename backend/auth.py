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
    @auth_ns.expect(user_model)
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