import { useState, useEffect } from "react";
import { getMasterLists, createMasterList, deleteMasterList } from "../services/masterListService";
import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
    const [masterLists, setMasterLists] = useState([]);
    const [filteredMasterLists, setFilteredMasterLists] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newMasterList, setNewMasterList] = useState({ name: "", description: "" });
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchMasterLists = async () => {
            try {
                const lists = await getMasterLists();
                setMasterLists(lists);
                setFilteredMasterLists(lists);
            } catch (err) {
                console.error("Error fetching master lists:", err);
            }
        };

        fetchMasterLists();
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get("create") === "true") {
            setIsCreating(true);
        }
    }, [location.search]);

    const handleToggleCreateForm = () => {
        setIsCreating(!isCreating);
        setNewMasterList({ name: "", description: "" });
    };

    const handleCreateMasterList = async () => {
        try {
            const createdList = await createMasterList(newMasterList);
            setMasterLists([...masterLists, createdList]);
            setFilteredMasterLists([...masterLists, createdList]);
            setIsCreating(false);
        } catch (err) {
            console.error("Error creating master list:", err);
        }
    };

    const handleOpenMasterList = (id) => {
        navigate(`/masterlist/${id}`);
    };

    const handleDeleteMasterList = async (id) => {
        try {
            await deleteMasterList(id);
            setMasterLists(masterLists.filter((list) => list.id !== id));
            setFilteredMasterLists(filteredMasterLists.filter((list) => list.id !== id));
        } catch (err) {
            console.error("Error deleting master list:", err);
        }
    };

    const handleFilterChange = (e) => {
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);

        if (selectedFilter === "all") {
            setFilteredMasterLists(masterLists);
        } else {
            const sortedLists = [...masterLists].sort((a, b) => {
                return selectedFilter === "oldest"
                    ? new Date(a.created_at) - new Date(b.created_at)
                    : new Date(b.created_at) - new Date(a.created_at);
            });
            setFilteredMasterLists(sortedLists);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 animate-fade-in-down">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">My Lists</h1>
                    <p className="text-gray-600">Organize and manage your task collections</p>
                </div>

                <div className="flex justify-between items-center mb-8">
                    <div className="relative">
                        <select
                            id="filter"
                            value={filter}
                            onChange={handleFilterChange}
                            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 leading-tight focus:outline-none focus:border-purple-500 transition-colors duration-200"
                        >
                            <option value="all">All Lists</option>
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>

                    <button
                        onClick={handleToggleCreateForm}
                        className={`px-6 py-2 rounded-lg font-medium transform hover:scale-105 transition-all duration-200 ${
                            isCreating
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                    >
                        {isCreating ? "Cancel" : "Create New List"}
                    </button>
                </div>

                {isCreating && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fade-in-down">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New List</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="List Name"
                                value={newMasterList.name}
                                onChange={(e) =>
                                    setNewMasterList({ ...newMasterList, name: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                            />
                            <textarea
                                placeholder="Description"
                                value={newMasterList.description}
                                onChange={(e) =>
                                    setNewMasterList({ ...newMasterList, description: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                                rows="3"
                            />
                            <button
                                onClick={handleCreateMasterList}
                                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200"
                            >
                                Create List
                            </button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMasterLists.map((list) => (
                        <div
                            key={list.id}
                            className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-200"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-800">{list.name}</h3>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleOpenMasterList(list.id)}
                                        className="px-3 py-1 bg-purple-100 text-purple-600 rounded-md hover:bg-purple-200 transition-colors duration-200"
                                    >
                                        Open
                                    </button>
                                    <button
                                        onClick={() => handleDeleteMasterList(list.id)}
                                        className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">{list.description}</p>
                            <div className="text-sm text-gray-500">
                                Created: {new Date(list.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
