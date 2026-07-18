const API_URL = import.meta.env.VITE_API_URL;

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks`);
  return response.json();
};

export const createTask = async (text: string): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

export const updateTask = async (id: number, completed: boolean): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  return response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
};
