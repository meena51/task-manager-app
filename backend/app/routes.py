from flask import Blueprint, request, jsonify
from .models import Task
from .models import TeamMember
from . import db
from datetime import datetime
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

main = Blueprint('main', __name__)

# Test route
@main.route("/", methods=["GET"])
def home():
    return "Flask is running successfully!"

# Create Task
@main.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    new_task = Task(
        created_date=datetime.utcnow(),
        entity_name=data["entity_name"],
        task_type=data["task_type"],
        task_time=data["task_time"],
        contact_person=data["contact_person"],
        note=data.get("note", ""),
        status="open"
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task created successfully!"}), 201

# Get All Tasks
@main.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    task_list = []
    for task in tasks:
        task_list.append({
            "id": task.id,
            "created_date": task.created_date.strftime("%Y-%m-%d"),
            "entity_name": task.entity_name,
            "task_type": task.task_type,
            "task_time": task.task_time,
            "contact_person": task.contact_person,
            "note": task.note,
            "status": task.status
        })
    return jsonify(task_list)

#getSingle Task
@main.route("/tasks/<int:task_id>", methods=["GET"])
def get_task(task_id):
    task = Task.query.get_or_404(task_id)
    return jsonify({
        "id": task.id,
        "created_date": task.created_date.strftime("%Y-%m-%d"),
        "entity_name": task.entity_name,
        "task_type": task.task_type,
        "task_time": task.task_time,
        "contact_person": task.contact_person,
        "note": task.note,
        "status": task.status
    })



# Update Task
@main.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.get_json()

    task.entity_name = data.get("entity_name", task.entity_name)
    task.task_type = data.get("task_type", task.task_type)
    task.task_time = data.get("task_time", task.task_time)
    task.contact_person = data.get("contact_person", task.contact_person)
    task.note = data.get("note", task.note)
    task.status = data.get("status", task.status)

    db.session.commit()
    return jsonify({"message": "Task updated successfully!"})

# Delete Task
@main.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully!"})

#Update STtaus
@main.route("/tasks/<int:task_id>/status", methods=["PATCH"])
def update_task_status(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.get_json()
    
    new_status = data.get("status")
    if new_status not in ["open", "closed"]:
        return jsonify({"error": "Invalid status value"}), 400

    task.status = new_status
    db.session.commit()
    return jsonify({"message": "Status updated successfully"})

@main.route("/team-members", methods=["GET"])
def get_team_members():
    members = TeamMember.query.all()
    return jsonify([{"id": m.id, "name": m.name} for m in members])


