import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";

const TaskForm = () => {
  const [entityName, setEntityName] = useState("");
  const [taskType, setTaskType] = useState("");
  const [time, setTime] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [note, setNote] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [showForm, setShowForm] = useState(false); // ✅ Form toggle

  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch("https://task-list-backend-mon6.onrender.com/team-members")
      .then((res) => res.json())
      .then((data) => setTeamMembers(data))
      .catch((err) => console.error("Error fetching team members:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      entity_name: entityName,
      task_type: taskType,
      task_time: time,
      contact_person: contactPerson,
      note: note,
      status: "open",
    };

    try {
      const response = await fetch("https://task-list-backend-mon6.onrender.com/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        alert("Task created successfully!");
        setEntityName("");
        setTaskType("");
        setTime("");
        setContactPerson("");
        setNote("");
        setRefreshFlag((prev) => !prev);
        setShowForm(false); // ✅ Hide form after submit
      } else {
        alert("Failed to create task");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <button
          className="btn btn-success"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Hide Task Form" : "Create Task"}
        </button>
      </div>

      {showForm && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="card-title mb-4 text-center">Create Task</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Entity Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={entityName}
                      onChange={(e) => setEntityName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Task Type</label>
                    <select
                      className="form-select"
                      value={taskType}
                      onChange={(e) => setTaskType(e.target.value)}
                      required
                    >
                      <option value="">-- Select Task Type --</option>
                      <option value="Call">Call</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Video Call">Video Call</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contact Person</label>
                    <select
                      className="form-select"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      required
                    >
                      <option value="">-- Select Team Member --</option>
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.name}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Note (optional)</label>
                    <textarea
                      className="form-control"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Create Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <TaskList refreshFlag={refreshFlag} />
    </div>
  );
};

export default TaskForm;