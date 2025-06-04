from . import db

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_date = db.Column(db.DateTime, nullable=False)
    entity_name = db.Column(db.String(100), nullable=False)
    task_type = db.Column(db.String(100), nullable=False)
    task_time = db.Column(db.String(50), nullable=False)
    contact_person = db.Column(db.String(100), nullable=False)
    note = db.Column(db.Text)
    status = db.Column(db.String(10), default='open')

class TeamMember(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

