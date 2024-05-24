from flask import jsonify, make_response, request
from flask_restx import Namespace, fields, Resource
from flask_jwt_extended import get_jwt_identity, jwt_required
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
        current_user = get_jwt_identity()

        details = User.query.filter_by(username=current_user).first()

        if details.id != user_id:
            return jsonify({
                "msg": "Hey, you are not supposed to do that! Check your permissions."
            }) ,403
        
        return details, 200
    
    @jwt_required()
    @user_ns.expect(user_model)
    @user_ns.marshal_with(user_model)
    def put(self, user_id):
        current_user = get_jwt_identity()
        data = request.get_json()

        details = User.query.filter_by(username=current_user).first()

        if details.id != user_id:
            return jsonify({
                "msg": "Unauthorized entry."
            }), 403
        
        details.update(
            username = data.get("username"),
            email = data.get("email")
        )

        return details, 200
    
    # Function to delete the user from the db
    @jwt_required()
    @user_ns.marshal_with(user_model)
    def delete(self, user_id):
        current_user = get_jwt_identity()
        
        details = User.query.filter_by(username=current_user).first()

        if details.id != user_id:
            return jsonify({
                "msg": "Unauthorized entry."
            }), 403

        details.delete()

        return jsonify({
            "msg": "User deleted"
        }), 200





    

