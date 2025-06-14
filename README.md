# Task List Web Application

A full-stack task management web application that allows users to create, edit, delete, filter, sort, and manage tasks efficiently.

---

## 🚀 Tech Stack

- **Backend:** Flask (Python)  
- **Frontend:** React.js  
- **Hosting:**  
  - Frontend hosted on [Netlify](https://playful-truffle-bed20a.netlify.app/)  
  - Backend hosted on [Render](https://task-list-backend-mon6.onrender.com/tasks)  

---

## 🌟 Features

1. **Create Task:**  
   - Click on the **Create Task** button to open the task creation form.  
   - Form fields include:  
     - Entity Name  
     - Task Type (Call, Meeting, Video Call)  
     - Time  
     - Contact Person (assign task to a team member)  
     - Note (optional)  
   - Submit to add a new task with default status as "Open".

2. **Edit Task:**  
   - Click the **Edit** button on any task to open an edit dialog.  
   - Update fields including changing the contact person.

3. **Change Task Status:**  
   - Hover over the status column and toggle between "Open" and "Closed".

4. **Sorting & Filtering:**  
   - Sort tasks by clicking the up/down arrows beside each column header.  
   - Filter tasks by typing in the search inputs below the headers.

5. **Delete Task:**  
   - Remove tasks by clicking the **Delete** icon.

---

## 🔗 Live Links

- **Frontend:** [https://playful-truffle-bed20a.netlify.app/]
- **Backend API:** [https://task-list-backend-mon6.onrender.com/tasks]

---

## 🛠 Installation & Setup (for local development)

1. Clone the repository.  
2. Backend:  
   ```bash
   cd backend
   pip install -r requirements.txt
   flask run
