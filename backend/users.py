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

@user_ns.route("/<int:id>")
class Users(Resource):
    @jwt_required()
    @user_ns.marshal_with(user_model)
    def get(self, id):
        current_user = get_jwt_identity()

        details = User.query.filter_by(username=current_user).first()

        if details.id != id:
            return make_response(jsonify({
                "msg": "Hey, you are not supposed to do that! Check your permissions."
            }) ,403)
        
        return details, 200
    

