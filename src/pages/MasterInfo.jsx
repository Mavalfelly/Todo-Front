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
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">
                {list ? list.title || list.name || "Unnamed List" : "Loading..."}
            </h1>

            <div className="mb-6">
                <label className="mr-2" htmlFor="filter">
                    Filter by:
                </label>
                <select
                    id="filter"
                    value={filter}
                    onChange={handleFilterChange}
                    className="border px-2 py-1"
                >
                    <option value="all">All</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="New Todo Task"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button
                    onClick={handleCreateTodo}
                    className="bg-blue-500 text-white px-4 py-2"
                >
                    Create Todo
                </button>
            </div>

            <ul className="mt-4">
                {filteredTodos.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex flex-col border p-2 mb-2 rounded"
                    >
                        <div className="flex justify-between items-center">
                            <span
                                className={
                                    todo.completed
                                        ? "line-through font-bold"
                                        : "font-bold"
                                }
                            >
                                {todo.title}
                            </span>
                            <div>
                                {editTodoId === todo.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editTodoTitle}
                                            onChange={(e) =>
                                                setEditTodoTitle(e.target.value)
                                            }
                                            className="border px-2 py-1"
                                        />
                                        <input
                                            type="text"
                                            value={editTodoDescription}
                                            onChange={(e) =>
                                                setEditTodoDescription(
                                                    e.target.value
                                                )
                                            }
                                            className="border px-2 py-1 ml-2"
                                            placeholder="Edit Description"
                                        />
                                        <button
                                            onClick={handleUpdateTodo}
                                            className="bg-green-500 text-white px-2 py-1 ml-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditTodoId(null);
                                                setEditTodoTitle("");
                                                setEditTodoDescription("");
                                            }}
                                            className="bg-gray-500 text-white px-2 py-1 ml-2"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setEditTodoId(todo.id);
                                                setEditTodoTitle(todo.title);
                                                setEditTodoDescription(
                                                    todo.description
                                                );
                                            }}
                                            className="bg-yellow-500 text-white px-2 py-1 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleMarkComplete(
                                                    todo.id,
                                                    !todo.completed
                                                )
                                            }
                                            className={`px-2 py-1 mr-2 ${
                                                todo.completed
                                                    ? "bg-yellow-500"
                                                    : "bg-green-500"
                                            } text-white`}
                                        >
                                            {todo.completed
                                                ? "Mark Incomplete"
                                                : "Mark Complete"}
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteTodo(todo.id)
                                            }
                                            className="bg-red-500 text-white px-2 py-1"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">
                            {todo.description || "No description provided"}
                        </p>
                        <p className="text-xs text-gray-500">
                            Created At:{" "}
                            {new Date(todo.created_at).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MasterListInfo;
