from flask import jsonify, make_response, request
from flask_restx import Namespace, Resource, fields
from models import Tasks, User
from flask_jwt_extended import get_jwt_identity, jwt_required
from datetime import datetime

tasks_namespace = Namespace("tasks", description='Namespaces for tasks')

# This serializes the data received into JSON format 
task_model = tasks_namespace.model(
    "Tasks", {
        "id": fields.Integer(),
        "task": fields.String(),
        "due_date": fields.DateTime(),
        "task_done": fields.Boolean(),
    }
)

# This API endpoint acts as a test to our application
@tasks_namespace.route("/hello")
class Hello(Resource):
    def get(self):
        message = {
            "msg": "Hello World!"
        }

        return message, 200
    
# This endpoint gets all tasks from the db.
@tasks_namespace.route("/get-tasks")
class TasksResource(Resource):
    @jwt_required()
    @tasks_namespace.marshal_list_with(task_model)
    def get(self):
        current_user = get_jwt_identity()

        user = User.query.filter_by(username=current_user).first()

        if not user:
            return jsonify({
                "msg": "Unauthorized"
            }), 403
        
        get_all_tasks = Tasks.query.filter_by(user_id=user.id).all()

        return get_all_tasks
    
# This endpoint posts a new task to the db.
@tasks_namespace.route("/post")
class PostTask(Resource):
    @jwt_required()
    @tasks_namespace.expect(task_model)
    @tasks_namespace.marshal_with(task_model)
    def post(self):
        data = request.get_json()
        
        task = data.get("task")
        due_date_str = data.get("due_date")
        task_done = data.get("task_done", False)

        if task is None or due_date_str is None:
            return make_response(jsonify({
                "msg": "Task and due date are required."
            }), 400)

        try:
            due_date = datetime.now().date()
            due_time = datetime.strptime(due_date_str, "%I:%M %p").time()
            due_datetime = datetime.combine(due_date, due_time)

        except ValueError:
            return make_response(jsonify({
                "msg": "Invalid date format. Use '9:00 AM' format."
            }), 400)

        new_task = Tasks(
            task=task,
            due_time=due_datetime,
            task_done=task_done,
        )

        new_task.save()

        tasks = {
            "id": new_task.id,
            "task": new_task.task,
            "due_time": new_task.format_due_time,
            "task_done": new_task.task_done
        }

        return tasks, 201




    
