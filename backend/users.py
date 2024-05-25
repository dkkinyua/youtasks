from flask import jsonify, make_response, request
from flask_restx import Namespace, fields, Resource
from flask_jwt_extended import get_jwt_identity, jwt_required, current_user
from models import User


user_ns = Namespace("users", description="A namespace holding endpoint for user actions")

user_model = user_ns.model(
    "User", {
        "id": fields.Integer(),
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String()
    }
)

@user_ns.route("/<int:user_id>")
class Users(Resource):
    # Gets all the details of a user, protected route
    @jwt_required()
    @user_ns.marshal_with(user_model)
    def get(self, user_id):
        if user_id != current_user.id:
            return jsonify({
                "msg": "Unauthorized Request"
            }), 403
        
        user = {
            "id": current_user.id,
            "username": current_user.username,
            "email": current_user.email
        } # The password will return null, for security

        return user, 200

    # Updates user. After updating, redirect user to login page to log in again using the updated credentials
    @jwt_required()
    @user_ns.expect(user_model)
    @user_ns.marshal_with(user_model)
    def put(self, user_id):
        data = request.get_json()
        username = data.get("username")

        details = User.query.filter_by(username=current_user.username).first()

        if user_id != current_user.id:
            return jsonify({
                "msg": "Unauthorized entry."
            }), 403
        
        if User.query.filter_by(username=username).first():
            return jsonify(
                {"msg": f"{username} has already been taken, choose another username."}
            )
        
        
        details.update(
            username = data.get("username"),
            email = data.get("email")
        )

        return details, 200
    
    # Function to delete the user from the db, redirect user to signup page after deleting info
    @jwt_required()
    @user_ns.marshal_with(user_model)
    def delete(self, user_id):

        details = User.query.filter_by(username=current_user.username).first()

        if details.id != user_id:
            return jsonify({
                "msg": "Unauthorized entry."
            }), 403

        details.delete()

        return jsonify({
            "msg": "User deleted"
        }), 200





    

