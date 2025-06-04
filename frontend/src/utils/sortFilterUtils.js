export const applyFilters = (tasks, filters) => {
  return tasks.filter((task) => {
    return (
      (!filters.task_type || task.task_type.toLowerCase().includes(filters.task_type.toLowerCase())) &&
      (!filters.status || task.status.toLowerCase().includes(filters.status.toLowerCase())) &&
      (!filters.contact_person || task.contact_person.toLowerCase().includes(filters.contact_person.toLowerCase())) &&
      (!filters.entity_name || task.entity_name.toLowerCase().includes(filters.entity_name.toLowerCase())) &&
      (!filters.task_time || task.task_time.startsWith(filters.task_time))
    );
  });
};

export const applySort = (tasks, sortField, sortOrder) => {
  if (!sortField) return tasks;
  return [...tasks].sort((a, b) => {
    const aVal = a[sortField]?.toString().toLowerCase() || "";
    const bVal = b[sortField]?.toString().toLowerCase() || "";
    return sortOrder === "asc"
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });
};