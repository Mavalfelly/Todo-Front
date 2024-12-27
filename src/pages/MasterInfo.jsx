import { useState, useEffect } from "react";
import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    markTodoComplete,
    getMasterLists,
} from "../services/masterListService";
import { useParams } from "react-router-dom";

const MasterListInfo = () => {
    const { id } = useParams();
    const [list, setList] = useState(null);
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [editTodoId, setEditTodoId] = useState(null);
    const [editTodoTitle, setEditTodoTitle] = useState("");
    const [editTodoDescription, setEditTodoDescription] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const masterLists = await getMasterLists();
                const listData = masterLists.find((list) => list.id === parseInt(id));
                setList(listData);

                if (listData) {
                    const todos = await getTodos(listData.id);
                    setTodos(todos);
                    setFilteredTodos(todos);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, [id]);

    const handleCreateTodo = async () => {
        try {
            const newTodoItem = await createTodo(id, {
                title: newTodo,
                description: newDescription,
                completed: false,
            });
            setTodos([...todos, newTodoItem]);
            setFilteredTodos([...todos, newTodoItem]);
            setNewTodo("");
            setNewDescription("");
        } catch (err) {
            console.error("Error creating todo:", err);
        }
    };

    const handleUpdateTodo = async () => {
        try {
            if (!editTodoId) return;

            const updatedTodo = await updateTodo(id, editTodoId, {
                title: editTodoTitle,
                description: editTodoDescription,
            });
            setTodos(
                todos.map((todo) =>
                    todo.id === editTodoId ? updatedTodo : todo
                )
            );
            setFilteredTodos(
                todos.map((todo) =>
                    todo.id === editTodoId ? updatedTodo : todo
                )
            );

            setEditTodoId(null);
            setEditTodoTitle("");
            setEditTodoDescription("");
        } catch (err) {
            console.error("Error updating todo:", err);
        }
    };

    const handleDeleteTodo = async (todoId) => {
        try {
            await deleteTodo(id, todoId);
            const updatedTodos = todos.filter((todo) => todo.id !== todoId);
            setTodos(updatedTodos);
            setFilteredTodos(updatedTodos);
        } catch (err) {
            console.error("Error deleting todo:", err);
        }
    };

    const handleMarkComplete = async (todoId, isCompleted) => {
        try {
            const updatedTodo = await markTodoComplete(id, todoId, isCompleted);
            setTodos(
                todos.map((todo) =>
                    todo.id === todoId ? updatedTodo : todo
                )
            );
            setFilteredTodos(
                todos.map((todo) =>
                    todo.id === todoId ? updatedTodo : todo
                )
            );
        } catch (err) {
            console.error("Error marking todo complete:", err);
        }
    };

    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);

        if (selectedFilter === "all") {
            setFilteredTodos(todos);
        } else {
            const sortedTodos = [...todos].sort((a, b) =>
                selectedFilter === "oldest"
                    ? new Date(a.created_at) - new Date(b.created_at)
                    : new Date(b.created_at) - new Date(a.created_at)
            );
            setFilteredTodos(sortedTodos);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 animate-fade-in-down">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        {list ? list.title || list.name || "Unnamed List" : "Loading..."}
                    </h1>
                    <p className="text-gray-600">Manage your tasks and track progress</p>
                </div>

                <div className="flex justify-between items-center mb-8">
                    <div className="relative">
                        <select
                            id="filter"
                            value={filter}
                            onChange={handleFilterChange}
                            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 leading-tight focus:outline-none focus:border-purple-500 transition-colors duration-200"
                        >
                            <option value="all">All Tasks</option>
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fade-in-down">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Task</h2>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Task Name"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                        />
                        <button
                            onClick={handleCreateTodo}
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transform hover:scale-105 transition-all duration-200"
                        >
                            Add Task
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredTodos.map((todo) => (
                        <div
                            key={todo.id}
                            className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-102 transition-all duration-200"
                        >
                            {editTodoId === todo.id ? (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={editTodoTitle}
                                        onChange={(e) => setEditTodoTitle(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                                    />
                                    <input
                                        type="text"
                                        value={editTodoDescription}
                                        onChange={(e) => setEditTodoDescription(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleUpdateTodo}
                                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditTodoId(null);
                                                setEditTodoTitle("");
                                                setEditTodoDescription("");
                                            }}
                                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className={`text-xl font-bold ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                                            {todo.title}
                                        </h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditTodoId(todo.id);
                                                    setEditTodoTitle(todo.title);
                                                    setEditTodoDescription(todo.description);
                                                }}
                                                className="px-3 py-1 bg-purple-100 text-purple-600 rounded-md hover:bg-purple-200 transition-colors duration-200"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleMarkComplete(todo.id, !todo.completed)}
                                                className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                                                    todo.completed 
                                                        ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                                                        : "bg-green-100 text-green-600 hover:bg-green-200"
                                                }`}
                                            >
                                                {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTodo(todo.id)}
                                                className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors duration-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-2">
                                        {todo.description || "No description provided"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Created: {new Date(todo.created_at).toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MasterListInfo;
