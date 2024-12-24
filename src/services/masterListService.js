const BACKEND_URL = import.meta.env.VITE_BACK_URL;
const TOKEN_KEY = "token"; 

const getAuthHeader = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// === MasterList Services ===

export const createMasterList = async (formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/masterlists/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader(),
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error("Failed to create master list.");

        return await res.json();
    } catch (err) {
        console.error("Error creating master list:", err);
        throw err;
    }
};

export const getMasterLists = async () => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/masterlists/`, {
            headers: getAuthHeader(),
        });

        if (!res.ok) throw new Error("Failed to fetch master lists.");

        return await res.json();
    } catch (err) {
        console.error("Error fetching master lists:", err);
        throw err;
    }
};

export const updateMasterList = async (id, formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/masterlists/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader(),
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error("Failed to update master list.");

        return await res.json();
    } catch (err) {
        console.error("Error updating master list:", err);
        throw err;
    }
};

export const deleteMasterList = async (id) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/masterlists/${id}/`, {
            method: "DELETE",
            headers: getAuthHeader(),
        });

        if (!res.ok) throw new Error("Failed to delete master list.");
    } catch (err) {
        console.error("Error deleting master list:", err);
        throw err;
    }
};

// === Todo Services ===
export const createTodo = async (masterListId, formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/masterlists/${masterListId}/todos/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader(),
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error("Failed to create todo.");

        return await res.json();
    } catch (err) {
        console.error("Error creating todo:", err);
        throw err;
    }
};

export const getTodos = async (masterListId) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/masterlists/${masterListId}/todos/`, {
            headers: getAuthHeader(),
        });

        if (!res.ok) throw new Error("Failed to fetch todos.");

        return await res.json();
    } catch (err) {
        console.error("Error fetching todos:", err);
        throw err;
    }
};

export const updateTodo = async (masterListId, todoId, formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/masterlists/${masterListId}/todos/${todoId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader(),
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error("Failed to update todo.");

        return await res.json();
    } catch (err) {
        console.error("Error updating todo:", err);
        throw err;
    }
};

export const deleteTodo = async (masterListId, todoId) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/masterlists/${masterListId}/todos/${todoId}/`, {
            method: "DELETE",
            headers: getAuthHeader(),
        });

        if (!res.ok) throw new Error("Failed to delete todo.");
    } catch (err) {
        console.error("Error deleting todo:", err);
        throw err;
    }
};

export const markTodoComplete = async (masterListId, todoId, isCompleted) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/masterlists/${masterListId}/todos/${todoId}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader(),
            },
            body: JSON.stringify({ completed: isCompleted }),
        });

        if (!res.ok) throw new Error("Failed to update todo status.");

        return await res.json();
    } catch (err) {
        console.error("Error marking todo as completed:", err);
        throw err;
    }
};
