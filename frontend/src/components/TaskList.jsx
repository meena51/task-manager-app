import React, { useEffect, useState } from "react";
import TaskEditModal from "./TaskEditModal";
import { Button } from "react-bootstrap";
import { applyFilters, applySort } from "../utils/sortFilterUtils";


const TaskList = ({ refreshFlag }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [refreshFlag]);

  useEffect(() => {
    let updated = applyFilters(tasks, filters);
    updated = applySort(updated, sortField, sortOrder);
    setFilteredTasks(updated);
  }, [tasks, filters, sortField, sortOrder]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("https://task-list-backend-mon6.onrender.com/tasks");
      const data = await response.json();
      const sorted = data.sort((a, b) => b.id - a.id);
      setTasks(sorted);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updateStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`https://task-list-backend-mon6.onrender.com/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
      } else alert("Failed to update status");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const response = await fetch(`https://task-list-backend-mon6.onrender.com/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== taskId));
      } else alert("Failed to delete task");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSort = (field) => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return <i className="fa fa-sort text-light ms-1" />;
    return sortOrder === "asc" ? (
      <i className="fa fa-sort-up text-light ms-1" />
    ) : (
      <i className="fa fa-sort-down text-light ms-1" />
    );
  };

  return (
    <div className="container mt-4">
      <h3>Task List</h3>
      <table className="table table-bordered table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th onClick={() => handleSort("id")}>ID {renderSortIcon("id")}</th>
            <th onClick={() => handleSort("created_date")}>Created Date {renderSortIcon("created_date")}</th>
            <th>
              <div onClick={() => handleSort("entity_name")}>
                Entity Name {renderSortIcon("entity_name")}
              </div>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Filter"
                onChange={(e) => handleFilterChange("entity_name", e.target.value)}
              />
            </th>
            <th>
              <div onClick={() => handleSort("task_type")}>
                Task Type {renderSortIcon("task_type")}
              </div>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Filter"
                onChange={(e) => handleFilterChange("task_type", e.target.value)}
              />
            </th>
            <th>
              <div onClick={() => handleSort("task_time")}>
                Time {renderSortIcon("task_time")}
              </div>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="YYYY-MM-DD"
                onChange={(e) => handleFilterChange("task_time", e.target.value)}
              />
            </th>
            <th>
              <div onClick={() => handleSort("contact_person")}>
                Contact Person {renderSortIcon("contact_person")}
              </div>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Filter"
                onChange={(e) => handleFilterChange("contact_person", e.target.value)}
              />
            </th>
            <th>Note</th>
            <th>
              <div onClick={() => handleSort("status")}>
                Status {renderSortIcon("status")}
              </div>
              <select
                className="form-select form-select-sm"
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">All</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.created_date}</td>
                <td>{task.entity_name}</td>
                <td>{task.task_type}</td>
                <td>{task.task_time}</td>
                <td>{task.contact_person}</td>
                <td>{task.note}</td>
                <td
                  onMouseEnter={() => setHoveredTaskId(task.id)}
                  onMouseLeave={() => setHoveredTaskId(null)}
                >
                  {hoveredTaskId === task.id ? (
                    <select
                      className="form-select form-select-sm"
                      value={task.status}
                      onChange={(e) => updateStatus(task.id, e.target.value)}
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  ) : (
                    <span>{task.status}</span>
                  )}
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>
                    <i className="fa fa-trash" />
                  </button>
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setSelectedTask(task);
                      setShowEditModal(true);
                    }}
                  >
                    <i className="fa fa-pencil" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedTask && (
        <TaskEditModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          task={selectedTask}
          onUpdate={fetchTasks}
        />
      )}
    </div>
  );
};

export default TaskList;
