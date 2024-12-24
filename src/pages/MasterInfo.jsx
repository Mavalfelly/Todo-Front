import { useState, useEffect } from "react";
import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    markTodoComplete,
} from "../services/masterListService";
import { useParams } from "react-router-dom";

const MasterListInfo = () => {
    const { id } = useParams();
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [editTodoId, setEditTodoId] = useState(null);
    const [editTodoTitle, setEditTodoTitle] = useState("");

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const todos = await getTodos(id);
                setTodos(todos);
            } catch (err) {
                console.error("Error fetching todos:", err);
            }
        };

        fetchTodos();
    }, [id]);

    const handleCreateTodo = async () => {
        try {
            const newTodoItem = await createTodo(id, { title: newTodo, completed: false });
            setTodos([...todos, newTodoItem]);
            setNewTodo("");
        } catch (err) {
            console.error("Error creating todo:", err);
        }
    };

    const handleUpdateTodo = async () => {
        try {
            if (!editTodoId) return;

            const updatedTodo = await updateTodo(id, editTodoId, { title: editTodoTitle });
            setTodos(todos.map((todo) => (todo.id === editTodoId ? updatedTodo : todo)));

            setEditTodoId(null);
            setEditTodoTitle("");
        } catch (err) {
            console.error("Error updating todo:", err);
        }
    };

    const handleMarkComplete = async (todoId, isCompleted) => {
        try {
            const updatedTodo = await markTodoComplete(id, todoId, isCompleted);
            setTodos(todos.map((todo) => (todo.id === todoId ? updatedTodo : todo)));
        } catch (err) {
            console.error("Error updating todo:", err);
        }
    };

    const handleDeleteTodo = async (todoId) => {
        try {
            await deleteTodo(id, todoId);
            setTodos(todos.filter((todo) => todo.id !== todoId));
        } catch (err) {
            console.error("Error deleting todo:", err);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Master List Details</h1>
            <input
                type="text"
                placeholder="New Todo Task"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="border p-2 mr-2"
            />
            <button
                onClick={handleCreateTodo}
                className="bg-blue-500 text-white px-4 py-2"
            >
                Create Todo
            </button>

            <ul className="mt-4">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex justify-between items-center border p-2 mb-2"
                    >
                        {editTodoId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editTodoTitle}
                                    onChange={(e) => setEditTodoTitle(e.target.value)}
                                    className="border p-2 mr-2"
                                />
                                <button
                                    onClick={handleUpdateTodo}
                                    className="bg-green-500 text-white px-2 py-1 mr-2"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setEditTodoId(null);
                                        setEditTodoTitle("");
                                    }}
                                    className="bg-gray-500 text-white px-2 py-1"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <span
                                    className={todo.completed ? "line-through" : ""}
                                >
                                    {todo.title}
                                </span>
                                <div>
                                    <button
                                        onClick={() => {
                                            setEditTodoId(todo.id);
                                            setEditTodoTitle(todo.title);
                                        }}
                                        className="bg-yellow-500 text-white px-2 py-1 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleMarkComplete(todo.id, !todo.completed)}
                                        className={`px-2 py-1 mr-2 ${
                                            todo.completed ? "bg-yellow-500" : "bg-green-500"
                                        } text-white`}
                                    >
                                        {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTodo(todo.id)}
                                        className="bg-red-500 text-white px-2 py-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MasterListInfo;
