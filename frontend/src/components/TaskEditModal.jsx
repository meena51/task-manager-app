import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const TaskEditModal = ({ show, handleClose, task, onUpdate }) => {
  const [formData, setFormData] = useState({ ...task });
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    setFormData({ ...task }); // Load task data into form
  }, [task]);

  useEffect(() => {
    fetch("https://task-list-backend-mon6.onrender.com/team-members")
      .then((res) => res.json())
      .then((data) => setTeamMembers(data))
      .catch((err) => console.error("Error fetching team members:", err));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://task-list-backend-mon6.onrender.com/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onUpdate(); // Refresh task list
        handleClose(); // Close modal
      } else {
        alert("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task #{task.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="entityName">
            <Form.Label>Entity Name</Form.Label>
            <Form.Control
              type="text"
              name="entity_name"
              value={formData.entity_name || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="taskType" className="mt-2">
            <Form.Label>Task Type</Form.Label>
            <Form.Control
              type="text"
              name="task_type"
              value={formData.task_type || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="taskTime" className="mt-2">
            <Form.Label>Task Time</Form.Label>
            <Form.Control
              type="text"
              name="task_time"
              value={formData.task_time || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="note" className="mt-2">
            <Form.Label>Note</Form.Label>
            <Form.Control
              as="textarea"
              name="note"
              rows={2}
              value={formData.note || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="contactPerson" className="mt-2">
            <Form.Label>Contact Person</Form.Label>
            <Form.Select
              name="contact_person"
              value={formData.contact_person || ""}
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.name}>
                  {member.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskEditModal;
