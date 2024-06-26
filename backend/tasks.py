from flask import jsonify, make_response, request
from flask_restx import Namespace, Resource, fields
from models import Tasks, User
from flask_jwt_extended import current_user, jwt_required
from datetime import datetime

tasks_namespace = Namespace("tasks", description='Namespaces for tasks')

# This serializes the data received into JSON format 
task_model = tasks_namespace.model(
    "Tasks", {
        "id": fields.Integer(),
        "task": fields.String(),
        "due_date": fields.DateTime(),
        "task_done": fields.Boolean(),
        "user_id": fields.Integer()
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
class GetTasks(Resource):
    @jwt_required()
    @tasks_namespace.marshal_list_with(task_model)
    def get(self):
        get_all_tasks = Tasks.query.filter_by(user_id=current_user.id).all()

        return get_all_tasks, 200
    
# This endpoint posts a new task to the db.
@tasks_namespace.route("/post")
class PostTask(Resource):
    @jwt_required()
    @tasks_namespace.expect(task_model)
    @tasks_namespace.marshal_with(task_model)
    def post(self):
        data = request.get_json()

        new_task = Tasks(
            task = data.get("task"),
            due_time = data.get("due_time"),
            task_done = data.get("task_done"),
            user_id = current_user.id
        )

        new_task.save()

        return new_task, 201

# This endpoint is for updating or deleting a task.
@tasks_namespace.route("/<int:id>")
class TasksResource(Resource):
    # For updating a task by id.
    @jwt_required()
    @tasks_namespace.expect(task_model)
    @tasks_namespace.marshal_with(task_model)
    def put(self, id):
        update_task = Tasks.query.get_or_404(id)

        data = request.get_json()

        task = data.get("task")
        due_date_str = data.get("due_date")
        task_done = data.get("task_done", update_task.task_done)

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

        update_task.task = task
        update_task.due_time = due_datetime
        update_task.task_done = task_done

        if update_task.task_done:
            update_task.delete_task(
                task_done = data.get("task_done")
            )
            return jsonify({
                "msg": "Task deleted"
            }), 200

        return update_task, 200
    
    # Deleting a task
    @jwt_required()
    @tasks_namespace.marshal_with(task_model)
    def delete(self, id):
        delete_task = Tasks.query.get_or_404(id)
        delete_task.delete()

        return jsonify({
            "msg": "Task deleted"
        }), 200




    
